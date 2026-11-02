# Supply an immutable base reference with --build-arg BASE=node@sha256:...
ARG BASE
FROM ${BASE}
WORKDIR /work
COPY fixture/ /baseline/
# Trusted preparation only: no candidate code, no secrets, registry access here only.
RUN mkdir /cache && cp /baseline/package.json /work/ && npm install --ignore-scripts --cache /cache --no-audit --no-fund && cp package-lock.json /baseline/ && npm install --save-exact cross-spawn@7.0.5 --ignore-scripts --cache /cache --no-audit --no-fund && mkdir /reference && cp /work/package-lock.json /reference/ && rm -rf /work/* && chmod -R a+rX /cache /baseline
ENV npm_config_cache=/cache npm_config_update_notifier=false npm_config_audit=false npm_config_fund=false
USER 1000:1000
CMD ["node", "--version"]
