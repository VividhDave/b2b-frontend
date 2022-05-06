import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaderResponse, HttpSentEvent, HttpProgressEvent, HttpUserEvent } from '@angular/common/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject, Observable } from "rxjs";
import { Router } from '@angular/router';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    // private authService: AuthService, private router: Router
    constructor(private readonly router:Router) {

    }
    reqs: any;

    addToken(req: HttpRequest<any>): HttpRequest<any> {
        return req.clone();
    }

    addTokenToNew(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addToken(req)).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                return event;
            }
        }, (error: any) => {
            this.reqs = req;
            if (error instanceof HttpErrorResponse) {
                switch ((<HttpErrorResponse>error).status) {
                    case 401: {
                             this.handle401Error(req, next);
                    }
                }
            } else {
                return Observable.throw(error);
            }
        });

    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            this.router.navigate(["home/sign-in"]);
            // this.authService.getRefreshToken().subscribe(data => {
            //     let response1 = JSON.stringify(data);
            //     let response = JSON.parse(response1);
            //     let user = this.authService.getUser();
            //     user.token = response.accessToken;
            //     user.refreshToken = response.refresh_token;
            //     this.authService.setUser(user);
            //     this.tokenSubject.next(response.token);
            //     this.isRefreshingToken = false;
            //     return next.handle(this.addTokenToNew(this.reqs, (response.token)));
            // }, error => {
            //     localStorage.removeItem('user');
            //     this.isRefreshingToken = false;
            //     this.router.navigate(['']);
            //     localStorage.clear();
            //     return null;
            // });
        } else {
            this.isRefreshingToken = false;
            this.tokenSubject.filter(token => token != null).take(1)
                .switchMap(token => {
                    return token;
            });
        }
    }
}