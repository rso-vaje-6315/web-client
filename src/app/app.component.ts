import { Component, OnInit } from "@angular/core";
import { ToastaConfig } from "ngx-toasta";

@Component({
    selector: "rso-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor(private toastConfig: ToastaConfig) {
        this.toastConfig.theme = "material";
    }

    ngOnInit(): void {

    }

}
