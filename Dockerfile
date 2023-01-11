FROM node:14-slim

# 如果 package.json 没有变化,则使用 docker 缓存,不进行 npm install
COPY package.json package-lock.json /src/

RUN npm install 

COPY . /src

WORKDIR /src

EXPOSE 7001

CMD ["npm", "start"]