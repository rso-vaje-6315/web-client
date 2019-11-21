FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY dist/web-client/ .

ENV RSO_KEYCLOAK_REALM=realm_name
ENV RSO_KEYCLOAK_CLIENTID=web-client
ENV RSO_KEYCLOAK_URL=http://

EXPOSE 80

CMD ["/bin/sh", "-c", "envsubst < ./config/config-schema.json > config/config.json && exec nginx -g 'daemon off;'" ]
