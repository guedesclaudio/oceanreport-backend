FROM node:16.19.0

RUN npm config set cache /tmp --global

WORKDIR /usr/src

COPY package*.json .

RUN npm install

COPY . ./app

ENV PORT=4000

EXPOSE 4000
RUN npx prisma generate
CMD [ "npm", "run", "start" ]