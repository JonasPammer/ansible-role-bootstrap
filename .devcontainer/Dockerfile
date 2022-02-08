FROM mcr.microsoft.com/vscode/devcontainers/base:focal
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV DEBIAN_FRONTEND=noninteractive

### OWN COMMANDS ###
#RUN pip3 install --no-cache-dir ansible ansible-lint yamllint
RUN apt-get update && apt-get install gnupg2 -y