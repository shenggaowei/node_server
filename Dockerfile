FROM node:19-alpine

USER node

COPY . /src

WORKDIR /src

RUN npm install && \
    groupadd -r node && useradd -r -g node node && \
    mkdir /src && \
    chown -R node:node /src

EXPOSE 7001

CMD ["npm", "start"]