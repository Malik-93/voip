#Each instruction in this file creates a new layer
#Here we are getting our node as Base image
FROM node:16-alpine AS builder
#Creating a new directory for app files and setting path in the container
RUN mkdir -p /usr/src/app
#setting working directory in the container
WORKDIR /usr/src/app
#copying the package.json file(contains dependencies) from project source dir to container dir
COPY package*.json /usr/src/app
# installing the dependencies into the container
RUN yarn install
#copying the source code of Application into the container dir
COPY . /usr/src/app
#command to run within the container
RUN yarn run build




FROM node:16-alpine AS server
#Creating a new directory for app files and setting path in the container
RUN mkdir -p /usr/src/app
#copying the package.json file(contains dependencies) from project source dir to container dir
COPY package*.json /usr/src/app
# installing the dependencies into the container
RUN yarn install --production
#copying the source code of Application into the container dir
COPY --from=builder /usr/src/app/public ./public
#copying the source code of Application into the container dir
COPY --from=builder /usr/src/app/dist ./dist
#container exposed network port number
EXPOSE 8080
#command to run within the container
CMD ["yarn", "start"]