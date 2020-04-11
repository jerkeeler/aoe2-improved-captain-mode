require('dotenv').config();

// PM2 process configuration
module.exports = {
  apps: [
    {
      name: 'aoe2icm-server',
      script: './bin/www',
      cwd: process.env.REMOTE_CWD,
      exec_mode: 'cluster',
      env: {
        LOG_LEVEL: 'debug',
        PORT: process.env.REMOTE_PORT,
        NODE_ENV: 'development',
      },
      env_production: {
        LOG_LEVEL: 'info',
        PORT: process.env.REMOTE_PORT,
        NODE_ENV: 'production',
      },
    },
  ],
};
