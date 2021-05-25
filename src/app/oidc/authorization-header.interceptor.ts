import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {OpenIdConnectService} from "./open-id-connect.service";

@Injectable()
export class AuthorizationHeaderInterceptor implements HttpInterceptor {
  constructor(private oidc: OpenIdConnectService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.oidc.userAvailable){
      req=req.clone({
        setHeaders: {
          Authorization: `${this.oidc.currentLoginUser.token_type} ${this.oidc.currentLoginUser.access_token}`
        }
      })
    }

    return next.handle(req);
  }
}

