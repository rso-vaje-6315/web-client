// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { RsoWebClientEnv } from "./env.model";

export const environment: RsoWebClientEnv = {
    production: false,
    apiUrl: "http://34.89.139.199",
    keycloak: {
        realm: "rso",
        clientId: "rso-public",
        url: "https://keycloak.mjamsek.com/auth"
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
