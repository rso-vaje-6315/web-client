import { Injectable } from "@angular/core";
import { Apollo, SubscriptionResult } from "apollo-angular";
import { Observable } from "rxjs";
import gql from "graphql-tag";
import { map } from "rxjs/operators";
import { Product } from "../models";

@Injectable({
    providedIn: "root"
})
export class ProductsService {

    constructor(private apollo: Apollo) {
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

    public getProductDetails(productId: string): Observable<Product> {
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
            })
        );
    }
}
