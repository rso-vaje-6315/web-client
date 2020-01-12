import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrdersService } from "../../services/orders.service";
import { Observable, Subject } from "rxjs";
import { Order } from "../../models";
import { startWith, switchMap, takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
    selector: "rso-orders-page",
    templateUrl: "./orders-page.component.html",
    styleUrls: ["./orders-page.component.scss"]
})
export class OrdersPageComponent implements OnInit, OnDestroy {

    public trigger$ = new Subject<void>();
    public destroy$ = new Subject<boolean>();
    public orders$: Observable<Order[]>;

    constructor(private ordersService: OrdersService) {
    }

    ngOnInit() {
        this.orders$ = this.trigger$.pipe(
            takeUntil(this.destroy$),
            startWith(null),
            switchMap(() => {
                return this.ordersService.getOrders();
            })
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

}
