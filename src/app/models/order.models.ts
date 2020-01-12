import { BaseType } from "./base.model";

export class OrderAddress {
    public name: string;
    public street: string;
    public post: string;
    public country: string;
    public phone: string;
    public email: string;
}

export class OrderProduct {
    public code: string;
    public name: string;
    public productId: string;
    public quantity: number;
    public pricePerItem: number;
}

export class Order extends BaseType {
    public price: number;
    public status: string;
    public address: OrderAddress;
    public products: OrderProduct[];
}
