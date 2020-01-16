import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
import { Order } from "../../models";
import { DialogService } from "../../services/dialog.service";
import { OrdersService } from "../../services/orders.service";
import { map, startWith, switchMap, takeUntil, tap } from "rxjs/operators";
import { KeycloakService } from "@mjamsek/ngx-keycloak-service";

@Component({
    selector: "rso-order-details-page",
    templateUrl: "./order-details-page.component.html",
    styleUrls: ["./order-details-page.component.scss"]
})
export class OrderDetailsPageComponent implements OnInit, OnDestroy {

    public destroy$ = new Subject<boolean>();
    public identifier$ = new Subject<Params>();
    public order$: Observable<Order>;
    public isSeller = false;
    public isCustomer = false;
    public invoiceUrl: string = null;

    constructor(private dialogService: DialogService,
                private route: ActivatedRoute,
                private auth: KeycloakService,
                private ordersService: OrdersService) {
    }

    ngOnInit() {
        this.isSeller = this.auth.hasRole("seller");
        this.isCustomer = this.auth.hasRole("customer");

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
            }),
            tap((order: Order) => {
                this.getInvoiceUrl(order.id);
            })
        );
    }

    private getInvoiceUrl(orderId: string) {
        this.ordersService.getInvoiceUrl(orderId).subscribe((url) => {
            this.invoiceUrl = url;
        });
    }

    public cancelOrder(order: Order) {
        this.ordersService.cancelOrder(order.id).subscribe(() => {
            this.dialogService.openToastNotification("Success!", "Order cancelled!", "ok");
            this.identifier$.next(this.route.snapshot.params);
        });
    }

    public closeOrder(order: Order) {
        this.ordersService.closeOrder(order.id).subscribe(() => {
            this.dialogService.openToastNotification("Success!", "Order closed!", "ok");
            this.identifier$.next(this.route.snapshot.params);
        });
    }

    public fulfillOrder(order: Order) {
        this.ordersService.fulfillOrder(order.id).subscribe(() => {
            this.dialogService.openToastNotification("Success!", "Order fulfilled!", "ok");
            this.identifier$.next(this.route.snapshot.params);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

}
