import { BsModalRef } from "ngx-bootstrap";

export namespace Toast {
    export type Type = "ok" | "error" | "warning" | "wait" | "info" | "default";

    export interface Options {
        // number of seconds to keep toast shown. Duration of -1 will never close toast. Default 3000 (3s).
        duration: number;
    }
}

export namespace ConfirmationDialog {
    export interface Events {
        // action to be called on confirmation
        onConfirmation?: (ref: BsModalRef) => void;
        // action to be called on decline
        onDecline?: (ref: BsModalRef) => void;
    }
    export interface Options {
        // if confirmed, destructive action will take place (delete)
        confirmIsDestructive?: boolean;
        // if declined, destructive action will take place (discard)
        declineIsDestructive?: boolean;
    }
}
