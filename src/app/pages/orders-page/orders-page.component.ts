import { Component, OnDestroy, OnInit } from "@angular/core";
import { OrdersService } from "../../services/orders.service";
import { Observable, Subject } from "rxjs";
import { Order } from "../../models";
import { startWith, switchMap, takeUntil } from "rxjs/operators";
import { Router } from "@angular/router";
import { KeycloakService } from "@mjamsek/ngx-keycloak-service";

@Component({
    selector: "rso-orders-page",
    templateUrl: "./orders-page.component.html",
    styleUrls: ["./orders-page.component.scss"]
})
export class OrdersPageComponent implements OnInit, OnDestroy {

    public trigger$ = new Subject<void>();
    public destroy$ = new Subject<boolean>();
    public orders$: Observable<Order[]>;
    public isSeller = false;

    constructor(private ordersService: OrdersService,
                private auth: KeycloakService) {
    }

    ngOnInit() {
        this.isSeller = this.auth.hasRole("seller");
        this.orders$ = this.trigger$.pipe(
            takeUntil(this.destroy$),
            startWith(null),
            switchMap(() => {
                if (this.isSeller) {
                    return this.ordersService.getOrders();
                }
                return this.ordersService.getMyOrders();
            })
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

}
