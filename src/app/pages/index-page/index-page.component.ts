import { Component, Inject, OnInit } from "@angular/core";
import { API_URL } from "../../factories";

@Component({
    selector: "rso-index-page",
    templateUrl: "./index-page.component.html",
    styleUrls: ["./index-page.component.scss"]
})
export class IndexPageComponent implements OnInit {

    constructor(@Inject(API_URL) private apiUrl: string) {
    }

    ngOnInit() {
        console.log("Calling api to: ", this.apiUrl);
    }

}
