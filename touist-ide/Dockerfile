FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN yarn
RUN yarn build

CMD bash -c "cd dist && python -m SimpleHTTPServer 8080"
