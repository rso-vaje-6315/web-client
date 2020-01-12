import { Injectable } from "@angular/core";
import { Apollo, SubscriptionResult } from "apollo-angular";
import { Observable, of } from "rxjs";
import gql from "graphql-tag";
import { catchError, map, switchMap } from "rxjs/operators";
import { AverageRating, Product } from "../models";
import { RatingsService } from "./ratings.service";
import { ProductDetails } from "../models/product.models";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class ProductsService {

    constructor(private apollo: Apollo,
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
}
