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
        const apiUrl = headers.get('api-url-config') ? headers.get('api-url-config') : 'apiUrl';
        console.log(apiUrl);
        if (apiUrl !== 'local') {
            req = req.clone({ url: this.configService.getConfig().apiUrl + req.url });
        }

        const cloneReq = req.clone({
            headers: headers
        });

        return next.handle(cloneReq);
    }

}
