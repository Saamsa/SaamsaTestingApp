FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && npm install -g ts-node
COPY . .
COPY /etc/letsencrypt /etc/letsencrypt
EXPOSE 9092
RUN chown -R node /usr/src/app
USER node
CMD ["ts-node", "eventStreamer.ts"]
