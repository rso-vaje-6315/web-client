import { Component, Inject, OnInit } from "@angular/core";
import { KEYCLOAK_VALUES } from "../../injectables";
import { DialogService } from "../../services/dialog.service";
import { BsModalRef } from "ngx-bootstrap";

@Component({
    selector: "rso-index-page",
    templateUrl: "./index-page.component.html",
    styleUrls: ["./index-page.component.scss"]
})
export class IndexPageComponent implements OnInit {

    constructor(@Inject(KEYCLOAK_VALUES) private keycloakValues: string,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        console.log("Keycloak runtime configuration: ", this.keycloakValues);
        this.dialogService.openToastNotification("Toast test!", "Toast body!", "info");
    }

    public openModal() {
        this.dialogService.openConfirmationDialog("Are you sure you want to test confirmation?", {
            onConfirmation: (ref: BsModalRef) => {
                this.dialogService.openToastNotification("Test", "Succeeded!", "ok");
                ref.hide();
            },
            onDecline: (ref) => {
                this.dialogService.openToastNotification("Test", "Failed! :( You had one job!", "error");
            }
        }, { declineIsDestructive: true });
    }

}
