import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class MediaInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers = req.headers;
        if (!headers.has("Content-Type")) {
            headers = headers.set("Content-Type", "application/json");
        }

        return next.handle(req.clone({
            headers
        }));
    }

}
