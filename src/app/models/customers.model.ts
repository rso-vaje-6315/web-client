import { BaseType } from "./base.model";

export class CustomerPreference extends BaseType {
    public accountId: string;
    public key: string;
    public value: string;
}

export class CustomerAddress extends BaseType {
    public accountId: string;
    public firstName: string;
    public lastName: string;
    public street: string;
    public streetNumber: string;
    public postalCode: string;
    public post: string;
    public phoneNumber: string;
    public country: string;
    public email: string;
}

export class Account {
    public id: string;
    public createdTimestamp: Date;
    public username: string;
    public enabled: boolean;
    public emailVerified: boolean;
    public firstName: string;
    public lastName: string;

}

export class CustomerDetails {
    public account: Account;
    public addresses: CustomerAddress[];
    public preferences: CustomerPreference[];
}
