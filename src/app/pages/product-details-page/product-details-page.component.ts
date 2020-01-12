import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Observable, Subject } from "rxjs";
import { Product, ProductStock } from "../../models";
import { map, startWith, switchMap, takeUntil, tap } from "rxjs/operators";
import { ActivatedRoute, Params } from "@angular/router";
import { CartService } from "../../services/cart.service";
import { DialogService } from "../../services/dialog.service";
import { RatingsService } from "../../services/ratings.service";
import { ProductDetails } from "../../models/product.models";
import { KeycloakService } from "@mjamsek/ngx-keycloak-service";

@Component({
    selector: "rso-product-details-page",
    templateUrl: "./product-details-page.component.html",
    styleUrls: ["./product-details-page.component.scss"]
})
export class ProductDetailsPageComponent implements OnInit, OnDestroy {

    public destroy$ = new Subject<boolean>();
    public identifier$ = new Subject<Params>();
    public product$: Observable<ProductDetails>;
    public authenticated = false;
    public productStock = 0;

    constructor(private productsService: ProductsService,
                private cartService: CartService,
                private ratingsService: RatingsService,
                private dialogService: DialogService,
                private auth: KeycloakService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.authenticated = this.auth.isAuthenticated();
        this.product$ = this.identifier$.pipe(
            takeUntil(this.destroy$),
            startWith(this.route.snapshot.params),
            switchMap(() => {
                return this.route.params;
            }),
            map((params: Params) => {
                return params.id;
            }),
            switchMap((productId: string) => {
                return this.productsService.getProductDetails(productId);
            }),
            tap((product: ProductDetails) => {
                this.productsService.getProductStock(product.id).subscribe((stock: ProductStock) => {
                    this.productStock = stock.quantity;
                });
            })
        );
    }

    public addToCart(product: Product) {
        this.cartService.updateCartQuantity(product.id, 1).subscribe(() => {
            this.dialogService.openToastNotification("Success!", "Item added to cart", "ok");
        });
    }

    public rateProduct(rating: number, product: ProductDetails) {
        this.ratingsService.rateProduct(rating, product.id).subscribe(() => {
            this.dialogService.openToastNotification("Success!", "Product rated!", "ok");
            this.identifier$.next(this.route.snapshot.params);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

}
