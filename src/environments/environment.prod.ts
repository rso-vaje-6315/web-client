import { RsoWebClientEnv } from "./env.model";

export const environment: RsoWebClientEnv = {
    production: true,
    keycloak: {
        clientId: "",
        realm: "",
        url: ""
    }
};
