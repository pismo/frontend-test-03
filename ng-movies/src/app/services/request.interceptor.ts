import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const newRequest = request.clone({
            setParams: {
                api_key: 'c2360daab1bea84a3e9ea4b1c8d51e8c',
                language: 'pt-BR'
            }
        })
        return next.handle(newRequest)

    }

}