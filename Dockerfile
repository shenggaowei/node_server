FROM node:14-slim

COPY . /src

WORKDIR /src

RUN npm install && \
    groupadd -r node && useradd -r -g node node && \
    mkdir /src && \
    chown -R node:node /src

USER node

EXPOSE 7001

CMD ["npm", "start"]