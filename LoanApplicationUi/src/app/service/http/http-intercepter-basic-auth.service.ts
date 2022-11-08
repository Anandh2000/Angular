import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationServiceService } from './authentication-service.service';


@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBasicAuthService implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationServiceService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler){
    let basicAuthenticationStr:any = this.authenticationService.getAuthToken();

    if(basicAuthenticationStr){
      req = req.clone({
        setHeaders:{
          Authorization:basicAuthenticationStr
        }
      })
    }
   

    return next.handle(req);
  }
  
}
