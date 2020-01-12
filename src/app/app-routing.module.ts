import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexPageComponent } from "./pages/index-page/index-page.component";
import { ProductDetailsPageComponent } from "./pages/product-details-page/product-details-page.component";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";
import { AuthGuard } from "@mjamsek/ngx-keycloak-service";
import { OrdersPageComponent } from "./pages/orders-page/orders-page.component";
import { OrderDetailsPageComponent } from "./pages/order-details-page/order-details-page.component";
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";


const routes: Routes = [
    {path: "", component: IndexPageComponent},
    {path: "products/:id", component: ProductDetailsPageComponent},
    {path: "cart", component: CartPageComponent, canActivate: [AuthGuard]},
    {path: "orders", component: OrdersPageComponent, canActivate: [AuthGuard]},
    {path: "orders/:id", component: OrderDetailsPageComponent, canActivate: [AuthGuard]},
    {path: "profile", component: ProfilePageComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
