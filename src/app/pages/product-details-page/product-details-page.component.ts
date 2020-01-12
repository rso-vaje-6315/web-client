import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { Observable, Subject } from "rxjs";
import { Product } from "../../models";
import { map, startWith, switchMap, takeUntil } from "rxjs/operators";
import { ActivatedRoute, Params } from "@angular/router";
import { CartService } from "../../services/cart.service";
import { DialogService } from "../../services/dialog.service";
import { RatingsService } from "../../services/ratings.service";
import { ProductDetails } from "../../models/product.models";

@Component({
    selector: "rso-product-details-page",
    templateUrl: "./product-details-page.component.html",
    styleUrls: ["./product-details-page.component.scss"]
})
export class ProductDetailsPageComponent implements OnInit, OnDestroy {

    public destroy$ = new Subject<boolean>();
    public identifier$ = new Subject<Params>();
    public product$: Observable<ProductDetails>;

    constructor(private productsService: ProductsService,
                private cartService: CartService,
                private ratingsService: RatingsService,
                private dialogService: DialogService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
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
