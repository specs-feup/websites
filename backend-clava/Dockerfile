FROM ubuntu:24.04

# FROM sitespeedio/node:ubuntu-24-04-nodejs-20.15.1

# Set working directory inside the container
WORKDIR /app

ARG TOOL=placeholder
ENV TOOL=${TOOL}

RUN apt-get update && \
    apt-get install -y git curl python-is-python3 openjdk-21-jdk make g++ && \
    # apt-get install -y python3 make g++ openjdk-21-jdk && \
    apt-get clean

RUN apt-get install -y bash

ENV NVM_DIR=/root/.nvm

RUN	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash && \
    . "$NVM_DIR/nvm.sh" && \
	nvm install v22.18.0 && \
	nvm use v22.18.0	

ENV PATH=$NVM_DIR/versions/node/v22.18.0/bin:$PATH

ENV JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"


# Copy package.json and package-lock.json first
COPY package*.json ./

# Install wget
#RUN apt install wget

# Install nvm
#RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Install node 20
#RUN nvm install 20.19.4
#RUN nvm use 20.19.4

# Using npm install to update weavers to last version when restarting
#RUN npm ci

# To force update
#RUN rm ./node_modules/@specs-feup -rf

#RUN npm rm package

RUN npm install && npm update

#RUN npm install -g @specs-feup/${TOOL}
#RUN npm uninstall -g @specs-feup/${TOOL}
#RUN npm install @specs-feup/${TOOL}@latest

# Copy the rest of the backend code
COPY . .

RUN npm run build

# Expose the backend port
EXPOSE 4000

ENV PORT=4000

#RUN npm start