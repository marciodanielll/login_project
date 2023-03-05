FROM node:16-alpine
WORKDIR /app
RUN npm install -g npm@9.6.0
EXPOSE ${PORT}