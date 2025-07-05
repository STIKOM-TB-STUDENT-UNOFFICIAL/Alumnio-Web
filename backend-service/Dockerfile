FROM node:22.14.0-alpine3.20

WORKDIR /app

COPY .env.docker /app/.env
COPY . .

RUN rm -rf dist
RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]