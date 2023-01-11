FROM node:14-slim

RUN npm install && \
    groupadd -r node-user && useradd -r -g node-user node-user && \
    mkdir /src && \
    chown -R node-user:node-user /src

USER node-user

COPY . /src

WORKDIR /src


EXPOSE 7001

CMD ["npm", "start"]