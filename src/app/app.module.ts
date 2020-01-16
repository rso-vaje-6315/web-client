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
import { ProductDetailsPageComponent } from "./pages/product-details-page/product-details-page.component";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";
import { HeaderComponent } from "./components/header/header.component";
import { MediaInterceptor } from "./services/media.interceptor";
import { OrdersPageComponent } from "./pages/orders-page/orders-page.component";
import { OrderDetailsPageComponent } from "./pages/order-details-page/order-details-page.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddressDialogComponent } from "./pages/cart-page/address-dialog/address-dialog.component";

@NgModule({
    entryComponents: [
        ConfirmationDialogComponent,
        AddressDialogComponent
    ],
    declarations: [
        AppComponent,
        IndexPageComponent,
        ConfirmationDialogComponent,
        ProductDetailsPageComponent,
        CartPageComponent,
        HeaderComponent,
        OrdersPageComponent,
        OrderDetailsPageComponent,
        ProfilePageComponent,
        AddressDialogComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BootstrapModule,
        IconsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        GraphQLModule,
        ReactiveFormsModule
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
