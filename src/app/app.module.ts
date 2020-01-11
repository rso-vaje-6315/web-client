import { BrowserModule } from "@angular/platform-browser";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppConfigFactory } from "./factories";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { IconsModule } from "./icons.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BootstrapModule } from "./bootstrap.module";
import { IndexPageComponent } from "./pages/index-page/index-page.component";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { AuthInterceptor } from "@mjamsek/ngx-keycloak-service";
import { GraphQLModule } from "./graphql.module";
import { ProductDetailsPageComponent } from './pages/product-details-page/product-details-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MediaInterceptor } from "./services/media.interceptor";

@NgModule({
    entryComponents: [
        ConfirmationDialogComponent
    ],
    declarations: [
        AppComponent,
        IndexPageComponent,
        ConfirmationDialogComponent,
        ProductDetailsPageComponent,
        CartPageComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BootstrapModule,
        IconsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        GraphQLModule
    ],
    providers: [
        {provide: APP_INITIALIZER, useFactory: AppConfigFactory, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: MediaInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
