import { Injectable } from "@angular/core";
import { ToastaService, ToastOptions } from "ngx-toasta";
import { ConfirmationDialog, Toast } from "../models";
import { BsModalService, ModalOptions } from "ngx-bootstrap";
import { ConfirmationDialogComponent } from "../components/confirmation-dialog/confirmation-dialog.component";

@Injectable({
    providedIn: "root"
})
export class DialogService {

    constructor(private toastService: ToastaService, private modalService: BsModalService) {

    }

    /**
     * Opens custom made modal. Remember to include component in entryComponents
     * @param modalComponent Component to use as modal
     * @param config ngx-bootstrap configuration
     */
    public openModal(modalComponent: any, config?: ModalOptions): void {
        this.modalService.show(modalComponent, config);
    }

    /**
     * Opens confirmation dialog
     * @param question Question for user to answer
     * @param events events object
     * @param options options object
     */
    public openConfirmationDialog(question: string, events?: ConfirmationDialog.Events, options?: ConfirmationDialog.Options): void {
        const initialState: any = {question};
        if (events.onConfirmation) {
            initialState.onConfirmation = events.onConfirmation;
        }
        if (events.onDecline) {
            initialState.onDecline = events.onDecline;
        }
        initialState.options = options;
        this.modalService.show(ConfirmationDialogComponent, {initialState});
    }

    /**
     * Display toast with given title and message
     * @param title Short title of toast
     * @param message Message content
     * @param type Color of toast
     * @param options Configuration of toast message
     */
    public openToastNotification(title: string, message: string, type?: Toast.Type, options?: Toast.Options): void {
        const toastOptions: ToastOptions = {
            title,
            msg: message,
            showClose: true,
            theme: "material"
        };
        if (options && options.duration) {
            if (options.duration === -1) {
                toastOptions.timeout = undefined;
            } else {
                toastOptions.timeout = options.duration;
            }
        } else {
            toastOptions.timeout = 3000;
        }

        if (!type) {
            type = "ok";
        }

        switch (type) {
            case "default":
                this.toastService.default(toastOptions);
                break;
            case "info":
                this.toastService.info(toastOptions);
                break;
            case "ok":
                this.toastService.success(toastOptions);
                break;
            case "wait":
                this.toastService.wait(toastOptions);
                break;
            case "error":
                this.toastService.error(toastOptions);
                break;
            case "warning":
                this.toastService.warning(toastOptions);
                break;
        }
    }

}
