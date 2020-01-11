import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Cart, CartProduct, Product } from "../models";
import { ProductsService } from "./products.service";
import { API_URL } from "../factories";
import { map, switchMap, tap } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class CartService {

    constructor(@Inject(API_URL) private apiUrl: string,
                private http: HttpClient,
                private productsService: ProductsService) {
    }

    public getCart(): Observable<CartProduct[]> {
        const url = `${this.apiUrl}/shopping-cart-service/v1/shopping-cart/me`;
        return this.http.get(url).pipe(
            map(res => res as Cart[]),
            switchMap((cartItems: Cart[]) => {

                const ids = cartItems.map(item => item.productId);
                const cartMap = this.buildDictionary(cartItems);

                return this.productsService.getProductsQuery(ids).pipe(
                    map(res => res as Product[]),
                    map((products: Product[]) => {
                        return products.map(product => {
                            const cart = new CartProduct();
                            cart.cart = new Cart();
                            cart.cart.id = cartMap.get(product.id).cartId;
                            cart.cart.quantity = cartMap.get(product.id).quantity;
                            cart.product = product;
                            return cart;
                        });
                    }),
                );
            })
        );
    }

    public updateCartQuantity(productId: string, quantity: number): Observable<void> {
        const url = `${this.apiUrl}/shopping-cart-service/v1/shopping-cart/me`;
        const data = JSON.stringify({
            productId,
            quantity
        });
        return this.http.put(url, data).pipe(map(() => null));
    }

    public removeCartItem(productId: string): Observable<void> {
        const url = `${this.apiUrl}/shopping-cart-service/v1/shopping-cart/me`;
        const data = JSON.stringify({
            productId
        });
        return this.http.request("delete", url, {body: data}).pipe(map(() => null));
    }

    private buildDictionary(cartItems: Cart[]): Map<string, {quantity: number, cartId: string}> {
        const dictionary = new Map<string, {quantity: number, cartId: string}>();
        cartItems.forEach(item => {
            dictionary.set(item.productId, {quantity: item.quantity, cartId: item.id});
        });
        return dictionary;
    }
}
