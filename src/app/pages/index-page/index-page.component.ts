import { Component, Inject, OnInit } from "@angular/core";
import { API_URL } from "../../injectables";
import { DialogService } from "../../services/dialog.service";
import { BsModalRef } from "ngx-bootstrap";

@Component({
    selector: "rso-index-page",
    templateUrl: "./index-page.component.html",
    styleUrls: ["./index-page.component.scss"]
})
export class IndexPageComponent implements OnInit {

    constructor(@Inject(API_URL) private apiUrl: string,
                private dialogService: DialogService) {
    }

    ngOnInit() {
        console.log("Calling api to: ", this.apiUrl);
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
        }, {declineIsDestructive: true});
    }

}
