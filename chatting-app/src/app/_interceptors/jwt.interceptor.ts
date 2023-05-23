import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountService } from "../_services/account.service";
import { Observable, take } from "rxjs";
import { User } from "../_models/user";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser: User;

        this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
            currentUser = user;
        });

        if(currentUser) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        console.log(currentUser);

        return next.handle(req);
    }
}