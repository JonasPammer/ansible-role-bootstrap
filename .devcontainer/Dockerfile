# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.217.1/containers/ubuntu/.devcontainer/base.Dockerfile

# [Choice] Ubuntu version (use hirsuite or bionic on local arm64/Apple Silicon): hirsute, focal, bionic
ARG VARIANT="focal"
FROM mcr.microsoft.com/vscode/devcontainers/base:0-${VARIANT}

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get -qy update \
    && apt-get -qy install --no-install-recommends python3-wheel=0.* \
    && pip3 install --no-cache-dir --upgrade pip>=21 \
    && pip3 install --no-cache-dir wheel \
    && pip3 install --no-cache-dir pre-commit \
    && pre-commit install --install-hooks --overwrite \
    && pre-commit install --hook-type commit-msg \
    && apt-get clean && rm -rf /var/lib/apt/lists/*


