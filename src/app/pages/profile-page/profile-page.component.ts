import { Component, OnInit } from "@angular/core";
import { CustomerService } from "../../services/customer.service";
import { CustomerAddress, CustomerDetails } from "../../models";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DialogService } from "../../services/dialog.service";

@Component({
    selector: "rso-profile-page",
    templateUrl: "./profile-page.component.html",
    styleUrls: ["./profile-page.component.scss"]
})
export class ProfilePageComponent implements OnInit {

    public customer: CustomerDetails;

    private formGroup: FormGroup;

    constructor(private customerService: CustomerService,
                private dialogService: DialogService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.getProfile();

        this.formGroup = this.fb.group({
            firstName: this.fb.control(""),
            lastName: this.fb.control(""),
            street: this.fb.control(""),
            streetNumber: this.fb.control(""),
            post: this.fb.control(""),
            postalCode: this.fb.control(""),
            country: this.fb.control(""),
            phoneNumber: this.fb.control(""),
            email: this.fb.control(""),
        });
    }

    public addAddress() {
        const address = Object.assign(new CustomerAddress(), this.formGroup.getRawValue());
        this.customerService.addAddress(address).subscribe(() => {
            this.getProfile();
            this.dialogService.openToastNotification("Success!", "Address added!", "ok");
            this.formGroup.reset();
        });
    }

    private getProfile() {
        this.customerService.getProfile().subscribe((customer: CustomerDetails) => {
            this.customer = customer;
        });
    }

}
