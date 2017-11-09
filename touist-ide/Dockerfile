FROM node:latest

ARG SERVER_HOST
env SERVER_HOST=$SERVER_HOST

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN yarn
RUN yarn build

CMD bash -c "cd dist && python -m SimpleHTTPServer 3000"
