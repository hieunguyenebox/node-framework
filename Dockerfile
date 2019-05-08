FROM node:10
WORKDIR /src/app
RUN yarn global add gulp
COPY ./package.json /src
RUN yarn
COPY . /src/app
CMD [ "npm", "run", "dev" ]