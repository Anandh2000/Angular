import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../http/authentication-service.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGaurdService implements CanActivate{

  constructor(private route:Router,private authenticationService:AuthenticationServiceService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authenticationService.getAuthToken()){
      return true;
    }
    this.route.navigate(['/login'])
    return false;
  }
  
}
