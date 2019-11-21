import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppConfigFactory, KeycloakValuesFactory } from "./factories";
import { KEYCLOAK_VALUES } from "./injectables";
import { HttpClientModule } from "@angular/common/http";
import { IconsModule } from "./icons.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BootstrapModule } from "./bootstrap.module";
import { IndexPageComponent } from "./pages/index-page/index-page.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";

@NgModule({
    entryComponents: [
        ConfirmationDialogComponent
    ],
    declarations: [
        AppComponent,
        IndexPageComponent,
        ConfirmationDialogComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BootstrapModule,
        IconsModule,
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [
        {provide: APP_INITIALIZER, useFactory: AppConfigFactory, multi: true},
        {provide: KEYCLOAK_VALUES, useFactory: KeycloakValuesFactory, multi: false}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
