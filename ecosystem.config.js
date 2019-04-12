
const NODE_PORT =  process.env.NODE_PORT || 3000;

const app = {
  name      : 'styless',
  script    : './dist',
  watch     : false,
  // max_memory_restart: '500M',
  log_date_format: 'YYYY-MM-DD HH:mm Z',
  merge_logs: true,
  env: {
    NODE_ENV: 'development',
    NODE_PORT
  },
  env_staging: {
    NODE_ENV: 'staging',
    NODE_PORT
  },
  env_production : {
    NODE_ENV: 'production',
    NODE_PORT
  }
}

const envIndex = process.argv.findIndex(v => v === '--env') + 1
    , env = process.argv[envIndex];

if (['production'].indexOf(env) !== -1) {
  app.instances = 'max'
  app.exec_mode = 'cluster'
} else {
  app.name += `-${env}`
  app.instances = '2'
  app.exec_mode = 'cluster'
}

app.name += `-${NODE_PORT}`

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    app

    // Second application
    // {
    //   name      : 'WEB',
    //   script    : 'web.js'
    // }
  ],

};
