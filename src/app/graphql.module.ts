import { NgModule } from "@angular/core";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ConfigService } from "@mjamsek/ngx-config";
import { RsoWebClientEnv } from "../environments/env.model";

export function createApollo(httpLink: HttpLink) {
    const productsUrl = ConfigService.getConfig<RsoWebClientEnv>().apiUrl + "/products-service/graphql";
    return {
        link: httpLink.create({uri: productsUrl}),
        cache: new InMemoryCache(),
    };
}

@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {
}
