FROM node:21-bullseye-slim

WORKDIR /app

ARG PORT
ENV PORT=${PORT}

COPY . .

RUN yarn install
RUN yarn run build

EXPOSE ${PORT}

CMD ["yarn", "start"]
