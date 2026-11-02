ARG BASE
ARG OBSERVER
FROM ${BASE} AS compiler
USER root
RUN apt-get update && apt-get install -y --no-install-recommends build-essential cmake git && rm -rf /var/lib/apt/lists/*
COPY llama.cpp/ /src/llama.cpp/
COPY bootstrap.c probe.c /src/
RUN cmake -S /src/llama.cpp -B /build -DCMAKE_BUILD_TYPE=Release -DGGML_NATIVE=OFF -DGGML_OPENMP=OFF -DBUILD_SHARED_LIBS=OFF -DLLAMA_CURL=OFF -DLLAMA_BUILD_TESTS=OFF -DLLAMA_BUILD_SERVER=OFF && cmake --build /build -j4 --target llama-cli && gcc -O2 -Wall -Wextra -Werror -o /build/bootstrap /src/bootstrap.c && gcc -O2 -Wall -Wextra -Werror -o /build/probe /src/probe.c
FROM ${OBSERVER}
USER root
RUN mkdir -p /opt/llama /input /weights
COPY --from=compiler /build/bin/llama-cli /build/bootstrap /build/probe /opt/llama/
COPY supervisor.cjs /opt/llama/supervisor.cjs
RUN mkdir -p /denied && printf 'FICTIONAL_INFERENCE_ACCESS_PROBE' > /denied/probe
WORKDIR /tmp
ENTRYPOINT []
USER 1000:1000
CMD ["/opt/llama/bootstrap", "probe", "42"]
