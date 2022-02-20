FROM mcr.microsoft.com/vscode/devcontainers/base:focal
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV DEBIAN_FRONTEND=noninteractive

### OWN COMMANDS ###
# Note: caches are to be kept
# hadolint ignore=DL3015,DL3009
RUN apt-get -qy update && \
    apt-get install -qy gnupg2
# hadolint ignore=DL3015,DL3009,DL3042
RUN apt-get install -qy python3 python3-pip && \
    pip3 install ansible ansible-lint yamllint