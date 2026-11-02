ARG BASE
FROM ${BASE} AS compiler
USER root
RUN apt-get update && apt-get install -y --no-install-recommends gcc libc6-dev && rm -rf /var/lib/apt/lists/*
COPY controls/lifecycle/ /src/
RUN mkdir /out && gcc -O2 -Wall -Wextra -Werror -o /out/bootstrap /src/bootstrap.c && gcc -O2 -Wall -Wextra -Werror -fno-stack-protector -fno-builtin -nostdlib -static -Wl,--build-id=none -o /out/probe /src/probe.c
FROM ${BASE}
USER root
RUN apt-get update && apt-get install -y --no-install-recommends strace && rm -rf /var/lib/apt/lists/*
COPY --from=compiler /out/ /lab/
COPY controls/lifecycle/supervisor.cjs /lab/supervisor.cjs
RUN mkdir /fixtures && node -e "const f=require('fs');f.writeFileSync('/fixtures/allowed',Buffer.alloc(32,88),{mode:0o444});f.writeFileSync('/fixtures/denied',Buffer.alloc(32,89),{mode:0o000});f.symlinkSync('allowed','/fixtures/symlink');f.linkSync('/fixtures/allowed','/fixtures/hardlink');"
WORKDIR /tmp
ENTRYPOINT []
USER 1000:1000
CMD ["/lab/bootstrap", "none"]
