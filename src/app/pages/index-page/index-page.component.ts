import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { API_URL } from "../../factories";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { ProductsService } from "../../services/products.service";
import { Observable, Subject } from "rxjs";
import { Product } from "../../models";
import { startWith, switchMap, takeUntil, tap } from "rxjs/operators";

@Component({
    selector: "rso-index-page",
    templateUrl: "./index-page.component.html",
    styleUrls: ["./index-page.component.scss"]
})
export class IndexPageComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject<boolean>();
    private list$ = new Subject<void>();
    public products$: Observable<Product[]>;


    constructor(private productsService: ProductsService) {
    }

    ngOnInit() {
        this.products$ = this.list$.pipe(
            takeUntil(this.destroy$),
            startWith(null),
            switchMap(() => {
                return this.productsService.getProductsList();
            }),
            tap((products: Product[]) => {
                console.log(products);
            })
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

}
