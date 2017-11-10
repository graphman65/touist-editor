FROM rust:latest

RUN rustup default nightly
WORKDIR /usr/src/app

# These steps are here only in order to cache the dependencies in docker.
# See: https://stackoverflow.com/a/39662015/3808537
# Note that 'cargo install' seems to re-build everything; I run 'cargo build'
# instead.
COPY Cargo.toml dummy.rs /usr/src/app/
RUN cargo build --lib

# Now, copy and build our own code
COPY src/ /usr/src/app/src/
RUN cargo build

CMD cargo run
