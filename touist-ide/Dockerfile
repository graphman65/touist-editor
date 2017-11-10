FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Create a cache layer for yarn dependencies and speed up docker re-builds.
# The --pure-lockfile will prevent yarn from creating the lockfile; it will
# only read from the existing lock.
# From https://github.com/yarnpkg/yarn/issues/749#issuecomment-253253608
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

# Now, actually build
COPY . .
RUN yarn build

CMD bash -c "cd dist && python -m SimpleHTTPServer 8080"
