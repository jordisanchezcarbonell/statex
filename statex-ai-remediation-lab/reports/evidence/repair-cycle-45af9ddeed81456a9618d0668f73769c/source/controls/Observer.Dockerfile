ARG BASE
FROM ${BASE}
USER root
RUN apt-get update && apt-get install -y --no-install-recommends strace && rm -rf /var/lib/apt/lists/*
WORKDIR /tmp
ENTRYPOINT []
CMD ["strace", "--version"]
