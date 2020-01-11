import { BaseType } from "./base.model";
import { Product } from "./product.models";

export class Cart extends BaseType {
    public productId: string;
    public quantity: number;
}

export class CartProduct {
    public cart: Cart;
    public product: Product;
}
