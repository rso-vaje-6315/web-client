import { Inject, Injectable } from "@angular/core";
import { API_URL } from "../factories";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Order } from "../models";
import { catchError, map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class OrdersService {

    constructor(@Inject(API_URL) private apiUrl: string,
                private http: HttpClient) {
    }

    public getOrders(): Observable<Order[]> {
        const url = `${this.apiUrl}/orders-service/v1/orders`;
        return this.http.get(url).pipe(map(res => res as Order[]));
    }

    public getMyOrders(): Observable<Order[]> {
        const url = `${this.apiUrl}/orders-service/v1/orders/me`;
        return this.http.get(url).pipe(map(res => res as Order[]));
    }

    public getOrder(orderId: string): Observable<Order> {
        const url = `${this.apiUrl}/orders-service/v1/orders/${orderId}`;
        return this.http.get(url).pipe(map(res => res as Order));
    }

    public cancelOrder(orderId: string): Observable<void> {
        const url = `${this.apiUrl}/orders-service/v1/orders/cancel/${orderId}`;
        return this.http.put(url, null).pipe(map(() => null));
    }

    public closeOrder(orderId: string): Observable<void> {
        const url = `${this.apiUrl}/orders-service/v1/orders/close/${orderId}`;
        return this.http.put(url, null).pipe(map(() => null));
    }

    public createOrder(addressId: string): Observable<void> {
        const url = `${this.apiUrl}/orders-service/v1/orders`;
        const data = JSON.stringify({
            addressId
        });
        return this.http.post(url, data).pipe(map(() => null));
    }

    public fulfillOrder(orderId: string): Observable<void> {
        const url = `${this.apiUrl}/orders-service/v1/orders/${orderId}/fulfill`;
        return this.http.post(url, null).pipe(map(() => null));
    }

    public getInvoiceUrl(orderId: string): Observable<string | null> {
        const url = `${this.apiUrl}/invoice-service/v1/invoices/order/${orderId}`;
        return this.http.get(url).pipe(
            map((invoice: any) => invoice.invoiceUrl),
            catchError(() => of(null))
        );
    }
}
