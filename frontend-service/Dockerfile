FROM node:22.13.1-alpine3.20 as build

WORKDIR /app

COPY . .

RUN npm install
RUN rm .env
RUN mv .env.docker .env.production
RUN npm run build
RUN ls

FROM nginx:stable-alpine as production

COPY --from=build /app/nginx /etc/nginx/conf.d

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]