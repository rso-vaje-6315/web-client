import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ApiUrlFactory, AppConfigFactory } from "./factories";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { IconsModule } from "./icons.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BootstrapModule } from "./bootstrap.module";
import { IndexPageComponent } from "./pages/index-page/index-page.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { AuthInterceptor } from "@mjamsek/ngx-keycloak-service";
import { API_URL } from "./injectables";

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
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: API_URL, useFactory: ApiUrlFactory, multi: false}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
