import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IndexPageComponent } from "./pages/index-page/index-page.component";
import { ProductDetailsPageComponent } from "./pages/product-details-page/product-details-page.component";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";
import { AuthGuard } from "@mjamsek/ngx-keycloak-service";


const routes: Routes = [
    {path: "", component: IndexPageComponent},
    {path: "products/:id", component: ProductDetailsPageComponent},
    {path: "cart", component: CartPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
