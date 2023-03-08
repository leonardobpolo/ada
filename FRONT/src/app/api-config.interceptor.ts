import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable()
export class ApiConfigInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const newRequest = request.clone({
            url: `http://localhost:5000/${ request.url }`,
            headers: request.headers.set('Authorization', `Bearer ${ localStorage.getItem('token') }`)
        });
    
        return next.handle(newRequest)
            .pipe(tap(
                () => {},
                (err: HttpErrorResponse) => {
                    if (err.status !== 401) {
                        return;
                    }

                    this.router.navigate(['login']);
                }
            ));
    }
}
