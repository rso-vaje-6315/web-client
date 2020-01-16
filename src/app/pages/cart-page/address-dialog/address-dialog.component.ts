import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../../../services/customer.service";
import { CustomerAddress } from "../../../models";
import { OrdersService } from "../../../services/orders.service";
import { BsModalRef } from "ngx-bootstrap";
import { DialogService } from "../../../services/dialog.service";

@Component({
    selector: "rso-address-dialog",
    templateUrl: "./address-dialog.component.html",
    styleUrls: ["./address-dialog.component.scss"]
})
export class AddressDialogComponent implements OnInit {

    public addresses: CustomerAddress[] = [];
    public selectedAddress: CustomerAddress = null;

    constructor(private customerService: CustomerService,
                private modalRef: BsModalRef,
                private dialogService: DialogService,
                private ordersService: OrdersService) {
    }

    ngOnInit() {
        this.customerService.getMyAddresses().subscribe(addresses => {
            this.addresses = addresses;
        });
    }

    public choseAddress(address: CustomerAddress) {
        this.selectedAddress = address;
    }

    public createOrder() {
        this.ordersService.createOrder(this.selectedAddress.id).subscribe(() => {
            this.dialogService.openToastNotification("Success!", "Order created!", "ok");
            this.modalRef.hide();
        });
    }

}
