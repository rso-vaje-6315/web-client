import { Inject, Injectable } from "@angular/core";
import { Apollo, SubscriptionResult } from "apollo-angular";
import { Observable, of, throwError } from "rxjs";
import gql from "graphql-tag";
import { catchError, map, switchMap } from "rxjs/operators";
import { AverageRating, Product, ProductStock } from "../models";
import { RatingsService } from "./ratings.service";
import { ProductDetails } from "../models";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { API_URL } from "../factories";

@Injectable({
    providedIn: "root"
})
export class ProductsService {

    constructor(private apollo: Apollo,
                @Inject(API_URL) private apiUrl: string,
                private http: HttpClient,
                private ratingsService: RatingsService,) {
    }

    public getProductsList(): Observable<Product[]> {
        return this.apollo.watchQuery({
            query: gql`{
              allProducts {
                id
                code
                name
                price
                imagePath
              }
            }`
        }).valueChanges.pipe(
            map((res: SubscriptionResult<any>) => {
                return res.data.allProducts as Product[];
            })
        );
    }

    public getProductsQuery(ids: string[]): Observable<Product[]> {
        const query = `[${ids.join(",")}]`;
        return this.apollo.watchQuery({
            query: gql`
              query queryProducts($query: String) {
                allProducts(filters: {fields: [{op: IN, field: "id", value: $query}]}) {
                  id
                  code
                  name
                  price
                  imagePath
                }
              }`,
            variables: {
                query
            }
        }).valueChanges.pipe(
            map((res: SubscriptionResult<any>) => {
                return res.data.allProducts as Product[];
            })
        );
    }

    public getProductDetails(productId: string): Observable<ProductDetails> {
        return this.apollo.watchQuery({
            query: gql`
            query getDetails($id: String){
              product(productId: $id) {
                id
                code
                name
                price
                imagePath
                description
              }
            }`,
            variables: {
                id: productId
            }
        }).valueChanges.pipe(
            map((res: SubscriptionResult<any>) => {
                return res.data.product as Product;
            }),
            switchMap((product: Product) => {
                return this.ratingsService.getAverageRating(product.id).pipe(
                    map((avgRating: AverageRating) => {
                        const details = new ProductDetails();
                        Object.assign(details, product);
                        details.averageRatingNumber = avgRating.averageRatingNumber;
                        return details;
                    }),
                    catchError((err: HttpErrorResponse) => {
                        if (err.status) {
                            const details = new ProductDetails();
                            Object.assign(details, product);
                            return of(details);
                        }
                    })
                );
            })
        );
    }

    public getProductStock(productId: string): Observable<ProductStock> {
        const url = `${this.apiUrl}/stock-service/v1/warehouses/allstock/${productId}`;
        return this.http.get(url).pipe(
            map(res => res as ProductStock),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 404) {
                    return of({productId, quantity: 0});
                } else {
                    throwError(err);
                }
            })
        );
    }
}
