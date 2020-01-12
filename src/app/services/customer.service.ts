import { Inject, Injectable } from "@angular/core";
import { API_URL } from "../factories";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CustomerAddress, CustomerDetails } from "../models";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class CustomerService {

    constructor(@Inject(API_URL) private apiUrl: string,
                private http: HttpClient) {
    }

    public getProfile(): Observable<CustomerDetails> {
        const url = `${this.apiUrl}/customers-service/v1/customers/me`;
        return this.http.get(url).pipe(map(res => res as CustomerDetails));
    }

    public addAddress(address: CustomerAddress): Observable<void> {
        const url = `${this.apiUrl}/customers-service/v1/customers/me/addresses`;
        const data = JSON.stringify(address);
        return this.http.post(url, data).pipe(map(() => null));
    }

}
