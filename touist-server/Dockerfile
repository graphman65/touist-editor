FROM rust:latest

RUN rustup default nightly

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN cargo install
CMD touist-server
