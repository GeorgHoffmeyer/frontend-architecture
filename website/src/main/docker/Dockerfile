FROM nginx:1.15.7-alpine

RUN rm -rf /usr/share/nginx/html /etc/nginx/conf.d/default.conf

COPY html /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/



