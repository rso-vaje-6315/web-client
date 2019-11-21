import { Component, Inject, OnInit } from "@angular/core";
import { KEYCLOAK_VALUES } from "../injectables";

@Component({
    selector: "rso-index",
    templateUrl: "./index.component.html",
    styleUrls: ["./index.component.scss"]
})
export class IndexComponent implements OnInit {

    constructor(@Inject(KEYCLOAK_VALUES) private keycloakValues: string) {
    }

    ngOnInit() {
        console.log("Keycloak runtime configuration: ", this.keycloakValues);
    }

}
