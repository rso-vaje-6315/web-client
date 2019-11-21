import { Component, OnInit } from "@angular/core";
import { ConfirmationDialog } from "../../models";
import { BsModalRef } from "ngx-bootstrap";

@Component({
    selector: "rso-confirmation-dialog",
    templateUrl: "./confirmation-dialog.component.html",
    styleUrls: ["./confirmation-dialog.component.scss"]
})
export class ConfirmationDialogComponent implements OnInit {

    public question: string;

    public buttonStyles = {
        confirm: "primary",
        decline: "default"
    };

    public options: ConfirmationDialog.Options;

    public onConfirmation = (ref: BsModalRef) => {
        this.modalRef.hide();
    }

    public onDecline = (ref: BsModalRef) => {
        this.modalRef.hide();
    }

    constructor(public modalRef: BsModalRef) {
    }

    ngOnInit() {
        if (this.options && this.options.confirmIsDestructive) {
            this.buttonStyles.confirm = "danger";
        }
        if (this.options && this.options.declineIsDestructive) {
            this.buttonStyles.decline = "danger";
        }
    }

    confirm() {
        this.onConfirmation(this.modalRef);
    }

    decline() {
        this.onDecline(this.modalRef);
    }

}
