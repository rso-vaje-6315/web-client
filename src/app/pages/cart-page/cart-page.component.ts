import { Component, OnDestroy, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Observable, Subject } from "rxjs";
import { CartProduct } from "../../models";
import { startWith, switchMap } from "rxjs/operators";
import { DialogService } from "../../services/dialog.service";

@Component({
    selector: "rso-cart-page",
    templateUrl: "./cart-page.component.html",
    styleUrls: ["./cart-page.component.scss"]
})
export class CartPageComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject<boolean>();
    private trigger$ = new Subject<void>();
    public cart$: Observable<CartProduct[]>;

    constructor(private cartService: CartService,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        this.cart$ = this.trigger$.pipe(
            startWith(null),
            switchMap(() => {
                return this.cartService.getCart();
            })
        );
    }

    public updateQuantity(productId: string, quantity: number, change: number) {
        const newQuantity = quantity + change;
        this.cartService.updateCartQuantity(productId, newQuantity).subscribe(
            () => {
                this.dialogService.openToastNotification("Success!", "Cart quantity updated!", "ok");
                this.trigger$.next();
            }
        );
    }

    public removeCartItem(productId: string) {
        this.cartService.removeCartItem(productId).subscribe(() => {
            this.dialogService.openToastNotification("Success!", "Cart item removed!", "ok");
            this.trigger$.next();
        });
    }

    ngOnDestroy(): void {
    }

}
