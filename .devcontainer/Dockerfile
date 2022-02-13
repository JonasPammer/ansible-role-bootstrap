FROM mcr.microsoft.com/vscode/devcontainers/base:focal
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV DEBIAN_FRONTEND=noninteractive

### OWN COMMANDS ###
# Note: caches are to be kept
RUN apt-get -qy update && \
    apt-get install -qy gnupg2
RUN apt-get install python3 python3-pip && \
    pip3 install ansible ansible-lint yamllint