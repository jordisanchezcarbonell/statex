ARG BASE
ARG RUNTIME
FROM ${BASE} AS compiler
USER root
RUN apt-get update && apt-get install -y --no-install-recommends gcc libc6-dev && rm -rf /var/lib/apt/lists/*
COPY controls/remediation/bootstrap.c /src/remediation-bootstrap.c
RUN mkdir /out && gcc -O2 -Wall -Wextra -Werror -o /out/remediation-bootstrap /src/remediation-bootstrap.c
FROM ${RUNTIME}
USER root
RUN apt-get update && apt-get install -y --no-install-recommends python3 strace && rm -rf /var/lib/apt/lists/*
COPY --from=compiler /out/remediation-bootstrap /tooling/bootstrap
COPY controls/remediation/*.py controls/remediation/supervisor.cjs /tooling/
RUN mkdir /denied && printf 'FICTIONAL_ACCESS_PROBE_NO_CREDENTIAL' > /denied/probe
WORKDIR /work
ENTRYPOINT []
USER 1000:1000
CMD ["/tooling/bootstrap", "handler"]
