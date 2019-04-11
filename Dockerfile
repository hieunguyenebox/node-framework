FROM node:10
WORKDIR /src/app
COPY ./package.json /src
RUN yarn
RUN yarn global add gulp
COPY . /src/app
CMD [ "npm", "run", "local" ]