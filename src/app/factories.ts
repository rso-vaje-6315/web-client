import { ConfigService } from "@mjamsek/ngx-config";
import { RsoWebClientEnv } from "../environments/env.model";
import { environment } from "../environments/environment";
import { KeycloakService } from "@mjamsek/ngx-keycloak-service";

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

export function ApiUrlFactory() {
    return ConfigService.getConfig<RsoWebClientEnv>().apiUrl;
}
