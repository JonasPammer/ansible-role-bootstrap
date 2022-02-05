FROM mcr.microsoft.com/vscode/devcontainers/base:focal
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV DEBIAN_FRONTEND=noninteractive

### INSTALL THE GITHUB CLI. ###
# https://github.com/microsoft/vscode-dev-containers/blob/main/script-library/docs/github-cli.md
COPY library-scripts/github-debian.sh /tmp/library-scripts/
RUN apt-get update && bash /tmp/library-scripts/github-debian.sh


### INSTALL PYTHON, PIPX, AND COMMON PYTHON UTILITIES. ###
# https://github.com/microsoft/vscode-dev-containers/blob/main/script-library/docs/python.md
ARG PYTHON_PATH=/usr/local/python
ENV PIPX_HOME=/usr/local/py-utils \
    PIPX_BIN_DIR=/usr/local/py-utils/bin
ENV PATH=${PYTHON_PATH}/bin:${PATH}:${PIPX_BIN_DIR}
COPY library-scripts/python-debian.sh /tmp/library-scripts/
RUN apt-get update && bash /tmp/library-scripts/python-debian.sh "3.9" "${PYTHON_PATH}" "${PIPX_HOME}"