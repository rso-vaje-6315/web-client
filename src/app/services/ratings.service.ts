import { Inject, Injectable } from "@angular/core";
import { API_URL } from "../factories";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AverageRating, Rating } from "../models";
import { map } from "rxjs/operators";
import { ProductDetails } from "../models/product.models";

@Injectable({
    providedIn: "root"
})
export class RatingsService {

    constructor(@Inject(API_URL) private apiUrl: string,
                private http: HttpClient) {
    }

    public getAverageRating(productId: string): Observable<AverageRating> {
        const url = `${this.apiUrl}/ratings-service/v1/products/${productId}/average-rating`;
        return this.http.get(url).pipe(map(res => res as AverageRating));
    }

    public getRatings(productId: string): Observable<Rating[]> {
        const url = `${this.apiUrl}/ratings-service/v1/products/${productId}/ratings`;
        return this.http.get(url).pipe(map(res => res as Rating[]));
    }

    public rateProduct(rating: number, productId: string): Observable<void> {
        const url = `${this.apiUrl}/ratings-service/v1/ratings`;
        const data = JSON.stringify({
            productId,
            ratingNumber: rating
        });
        return this.http.post(url, data).pipe(map(() => null));
    }

}
