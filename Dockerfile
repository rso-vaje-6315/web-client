FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY dist/web-client/ .

ENV RSO_API_URL=http://
ENV RSO_KEYCLOAK_REALM=rso
ENV RSO_KEYCLOAK_CLIENTID=rso-public
ENV RSO_KEYCLOAK_URL=https://keycloak.mjamsek.com/auth

EXPOSE 80

CMD ["/bin/sh", "-c", "envsubst < ./config/config-schema.json > config/config.json && exec nginx -g 'daemon off;'" ]
