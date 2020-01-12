import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
import { Order } from "../../models";
import { DialogService } from "../../services/dialog.service";
import { OrdersService } from "../../services/orders.service";
import { map, startWith, switchMap, takeUntil } from "rxjs/operators";

@Component({
    selector: "rso-order-details-page",
    templateUrl: "./order-details-page.component.html",
    styleUrls: ["./order-details-page.component.scss"]
})
export class OrderDetailsPageComponent implements OnInit, OnDestroy {

    public destroy$ = new Subject<boolean>();
    public identifier$ = new Subject<Params>();
    public order$: Observable<Order>;

    constructor(private dialogService: DialogService,
                private route: ActivatedRoute,
                private ordersService: OrdersService) {
    }

    ngOnInit() {
        this.order$ = this.identifier$.pipe(
            takeUntil(this.destroy$),
            startWith(this.route.snapshot.params),
            switchMap(() => {
                return this.route.params;
            }),
            map((params: Params) => {
                return params.id;
            }),
            switchMap((orderId: string) => {
                return this.ordersService.getOrder(orderId);
            })
        );
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

}
