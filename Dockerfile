FROM node:10-alpine

# env
ENV USER=node
ENV GROUP=node

# install python for using npm
RUN apk update && apk add python build-base

# working directory
WORKDIR /app

# install gulp
RUN npm i -g gulp-cli

# copy source to image and install node_modules
COPY package*.json ./
RUN npm i
COPY src ./src
COPY config ./config
COPY locales ./locales
COPY gulpfile.js tsconfig.json ./

# convert ownership to non-root user
RUN chown $USER:$GROUP -R ./

# BUILD SOURCE
RUN ls -la && npm run build

# run with non-root user
USER $USER:$GROUP
CMD [ "npm", "start" ]