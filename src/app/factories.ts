import { ConfigService } from "@mjamsek/ngx-config";
import { RsoWebClientEnv } from "../environments/env.model";
import { environment } from "../environments/environment";
import { KeycloakService } from "@mjamsek/ngx-keycloak-service";
import { InjectionToken } from "@angular/core";

export function AppConfigFactory() {
    return async () => {
        await ConfigService.initialize<RsoWebClientEnv>({path: "/ui/config/config.json", environment});

        await KeycloakService.initialize({
            ...ConfigService.getConfig<RsoWebClientEnv>().keycloak,
            allowAnonymousAccess: true,
            roleClients: [],
            forbiddenPage: {
                external: false,
                url: "/403"
            }
        });
    };
}

export const API_URL = new InjectionToken<string>("API url", {
    providedIn: "root",
    factory: () => {
        return ConfigService.getConfig<RsoWebClientEnv>().apiUrl;
    }
});
