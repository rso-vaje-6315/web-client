import { Component, OnInit } from "@angular/core";
import { KeycloakService } from "@mjamsek/ngx-keycloak-service";
import { CustomerPayload } from "../../models";

@Component({
    selector: "rso-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

    public authenticated = false;

    public name = "";

    constructor(private auth: KeycloakService) {
    }

    ngOnInit() {
        this.authenticated = this.auth.isAuthenticated();
        if (this.authenticated) {
            this.name = this.auth.getTokenPayload<CustomerPayload>().name;
        }
    }

    public login() {
        this.auth.redirectToLogin();
    }

    public logout() {
        this.auth.logout();
    }

}
