import { ConfigService } from "@mjamsek/ngx-config";
import { RsoWebClientEnv } from "../environments/env.model";
import { environment } from "../environments/environment";

export function AppConfigFactory() {
    return async () => {
        await ConfigService.initialize<RsoWebClientEnv>({path: "/config/config.json", environment});
    };
}

export function KeycloakValuesFactory() {
    return ConfigService.getConfig<RsoWebClientEnv>().keycloak;
}
