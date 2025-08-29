
FROM node:18

WORKDIR /app

COPY . .

RUN yarn install
RUN chmod +x ./bin/generate-ssl-options.sh

EXPOSE 3100

CMD ["yarn", "start:dev"]
