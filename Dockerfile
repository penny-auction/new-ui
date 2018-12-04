FROM nginx:alpine

RUN apk add curl

COPY build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/