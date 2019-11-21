import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IndexComponent } from "./index/index.component";
import { AppConfigFactory, KeycloakValuesFactory } from "./factories";
import { KEYCLOAK_VALUES } from "./injectables";

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [
        {provide: APP_INITIALIZER, useFactory: AppConfigFactory, multi: true},
        {provide: KEYCLOAK_VALUES, useFactory: KeycloakValuesFactory, multi: false}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
