import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { X_AUTH } from '../constants';
import { UserService } from '../services/user.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(public events: Events, private utenteService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.utenteService.getUtenteToken();
        if (authToken != undefined && authToken != "") {
            console.log("adding token into header");
            // Clone the request and replace the original headers with
            // cloned headers, updated with the authorization.
            const authReq = req.clone({
                headers: req.headers.set(X_AUTH, authToken)
            });

            // send cloned request with header to the next handler.
            return next.handle(authReq).do(() => { }, (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    this.events.publish("server-error", (error as HttpErrorResponse));
                }
            });
        } else {
            return next.handle(req);
        }

    }

}