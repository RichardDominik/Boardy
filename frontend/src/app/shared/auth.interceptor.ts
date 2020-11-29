import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { TokenService } from "./token.service";
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private tokenService: TokenService,
        private router: Router
        ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(!this.tokenService.isValidToken()){
            this.router.navigate(['/sing-in']);
        }
        const accessToken = this.tokenService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + accessToken
            }
        });
        return next.handle(req).pipe(
            catchError((response: HttpErrorResponse) => {
              if (response.status === 401) {
                this.router.navigate(['/sign-in'])
              }
              return throwError(response);
            }
          ));
    }
}