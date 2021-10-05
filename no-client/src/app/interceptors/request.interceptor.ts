import { Injectable, Injector } from "@angular/core";
import {
    HttpEvent,
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
} from "@angular/common/http";
import { Observable } from 'rxjs';
import { ConfigurationAppService } from "../service/configuration-app.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private configService: ConfigurationAppService) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = req.headers;
        const cloneReq = req.clone({
            headers: headers
        });

        return next.handle(cloneReq);
    }

}
