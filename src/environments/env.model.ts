export interface RsoWebClientEnv {
    production: boolean;
    keycloak: {
        realm: string;
        clientId: string;
        url: string;
    };
}
