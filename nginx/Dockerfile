FROM nginx:stable-alpine

COPY . /etc/nginx/conf.d

EXPOSE 4000

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]