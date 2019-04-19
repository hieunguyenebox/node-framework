# styless

### NODE VERSION: 10
### Getting Started

- Basic code structure includes: React and express.
- Quick and easy to create and deploy new web app :))
- Need more? write you own code(plugin) in a directory inside plugins, then start it with other plugins :))

### Installing

just clone the repo

### Usage

* For Working on your machine

1. "yarn" or "npm i"
2. copy .env.example to .env and change configuration to yours
2. NODE_PORT=3000 NODE_PORT_HOT=9000 npm run local //NODE_PORT is optional, default is 3000. NODE_PORT_HOT is optional, default 9000, is webpack devServer.
3. Goto [http://localhost:9000](http://localhost:9000), this is webpack devserver with hot reload. Please config "plugins/react/gulpfile.js" -> webpackDevServer -> proxy to allow what routes you would like to redirect to 300. Default /api/v1 will be redirect to 3000


* For run on Server
1. copy .env.example to path which you set in config/env-path.js and change configuration to yours
2. NODE_ENV={env_name} npm run build
3. NODE_PORT={port} pm2 start ecosystem.config.js --env {env_name}

- env_name: development, production, staging. Optional


* Using image, external js, fonts,...
  - Copy you files to public/
  - Please do not put your files in public/assets. This is ignored by .gitignore
