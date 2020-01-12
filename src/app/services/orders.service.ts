import { Inject, Injectable } from "@angular/core";
import { API_URL } from "../factories";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Order } from "../models";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class OrdersService {

    constructor(@Inject(API_URL) private apiUrl: string,
                private http: HttpClient) {
    }

    public getOrders(): Observable<Order[]> {
        const url = `${this.apiUrl}/orders-service/v1/orders/me`;
        return this.http.get(url).pipe(map(res => res as Order[]));
    }

    public getOrder(orderId: string): Observable<Order> {
        const url = `${this.apiUrl}/orders-service/v1/orders/${orderId}`;
        return this.http.get(url).pipe(map(res => res as Order));
    }

}
