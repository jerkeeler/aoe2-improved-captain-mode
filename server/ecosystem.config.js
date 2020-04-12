require('dotenv').config();

// PM2 process configuration
module.exports = {
  apps: [
    {
      name: 'aoe2icm-server',
      script: './bin/www',
      cwd: process.env.CWD,
      interpreter: process.env.INTERPRETER,
      env: {
        LOG_LEVEL: 'debug',
        NODE_ENV: 'development',
      },
      env_production: {
        LOG_LEVEL: 'info',
        NODE_ENV: 'production',
      },
    },
  ],
};
