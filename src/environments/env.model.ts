export interface RsoWebClientEnv {
    production: boolean;
    apiUrl: string;
    keycloak: {
        realm: string;
        clientId: string;
        url: string;
    };
}
