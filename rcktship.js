require('dotenv').config();
const chalk = require('chalk');
const inquirer = require('inquirer');
const rckt = require('rcktship').default;

// CHANGE THIS TO CHANGE NODE VERSION
const NODE_VERSION = '12';

rckt.target('prod', [{
  host: process.env.REMOTE_HOST,
  port: process.env.REMOTE_PORT,
  username: process.env.REMOTE_USERNAME,
  privateKey: process.env.REMOTE_KEY,
}]);


rckt.mission('default', async () => {
  await rckt.remote('hostname');
});
rckt.mission('deploy-frontend', async () => {
  const tag = await getTag();
  await checkEnvironment(tag);
  await deployFrontend(tag);
});
rckt.mission('deploy-backend', async () => {
  const tag = await getTag();
  await checkEnvironment(tag);
  await deployBackend(tag);
});
rckt.mission('deploy', async () => {
  const tag = await getTag();
  await checkEnvironment(tag);
  await deployFrontend(tag);
  await deployBackend(tag);
});

function checkEnvironment(tag) {
  return new Promise(async (resolve, reject) => {
    if (rckt.currentTarget === 'prod') {
      let answer = await inquirer.prompt([{
        type: 'input',
        name: 'answer',
        message: `Are you sure you wish to update production with ${tag}?`
      }]);
      answer = answer.answer;

      if (answer.toLowerCase() !== 'y' && answer.toLowerCase() !== 'yes') {
        console.log('ABORTING PROD UPDATE!');
        process.exit(1);
      }
    }
    resolve();
  });
}

async function getTag() {
  const answer = await inquirer.prompt([{
    type: 'input',
    name: 'tag',
    message: 'What tag would you like to release?'
  }]);
  return answer.tag;
}

async function deployFrontend(tag) {
  const { REMOTE_APP_PATH, REMOTE_HOST } = process.env;
  const tarBall = 'dist.tar.gz';

  await rckt.local(`git checkout ${tag}`);

  await rckt.with('cd ./frontend', async () => {
    console.log(chalk.magentaBright('Building react production build...'));
    await rckt.local('npm run build');
    await rckt.local(`tar czf ${tarBall} build/`);

    console.log(chalk.magentaBright('Copying tarball and unpacking...'));
    await rckt.local(`scp ${tarBall} ${REMOTE_HOST}:${REMOTE_APP_PATH}`);
    await rckt.local(`rm ${tarBall}`);
  });

  await rckt.with(`cd ${REMOTE_APP_PATH}`, async () => {
    await rckt.remote(`tar -xf ${tarBall}`);
    await rckt.remote(`rm ${tarBall}`);
  });

  console.log(chalk.magentaBright(`FRONTEND DEPLOY OF ${tag} FINISHED!`));
}

function nvmCommand(cmd) {
  return rckt.remote(`nvm exec ${NODE_VERSION} ${cmd}`);
}

async function deployBackend(tag) {
  const { REMOTE_APP_PATH, REMOTE_DEPLOY_KEY, REMOTE_HOST } = process.env;
  const tarBall = 'dist.tar.gz';
  const pubBall = 'pub_dist.tar.gz';

  await rckt.with('cd server', async () => {
    console.log(chalk.magentaBright('Compiling typescript...'));
    await rckt.local(`git checkout ${tag}`);
    await rckt.local('npm run build-ts');

    console.log(chalk.blue('Building tarball...'));
    await rckt.local(`tar czf ${tarBall} build/`);
    await rckt.local(`tar czf ${pubBall} public/`);
  });


  await rckt.with(`cd ${REMOTE_APP_PATH}server`, async () => {
    console.log(chalk.magentaBright('Fetching latest code...'));
    await rckt.remote('echo $HOME');
    await rckt.remote(`GIT_SSH_COMMAND="ssh -i ${REMOTE_DEPLOY_KEY}" git fetch --tags`);
    await rckt.remote(`GIT_SSH_COMMAND="ssh -i ${REMOTE_DEPLOY_KEY}" git checkout ${tag}`);

    console.log(chalk.magentaBright('Installing production requirements...'));
    await nvmCommand('npm install --only=production');
  });

  console.log(chalk.magentaBright('Copying tarball and unbundling...'));
  await rckt.local(`scp server/${pubBall} ${REMOTE_HOST}:${REMOTE_APP_PATH}`);
  await rckt.local(`rm server/${pubBall}`);
  await rckt.with(`cd ${REMOTE_APP_PATH}`, async () => {
    await rckt.remote(`tar -xf ${pubBall}`);
    await rckt.remote('cp -R public/* build/static/');
    await rckt.remote(`rm ${pubBall}`);
    await rckt.remote('rm -r public/');
  });

  await rckt.local(`scp server/${tarBall} ${REMOTE_HOST}:${REMOTE_APP_PATH}server`);
  await rckt.local(`rm server/${tarBall}`);
  await rckt.with(`cd ${REMOTE_APP_PATH}server`, async () => {
    await rckt.remote(`tar -xf ${tarBall}`);
    await rckt.remote(`rm ${tarBall}`);

    console.log(chalk.magentaBright('Restarting services...'));
    await nvmCommand('npm run restart');
  });


  console.log(chalk.magentaBright(`BACKEND DEPLOY OF ${tag} COMPLETE!`));
}

