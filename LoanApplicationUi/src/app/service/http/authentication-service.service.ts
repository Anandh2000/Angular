import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loan } from 'src/app/loan-history/loan-history.component';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(public http:HttpClient) { }

 

  authenticationService(userName: string,passWord: string){ 

    let basicAuthenticationStr = 'Basic ' + window.btoa(userName + ':' + passWord);
    console.log(basicAuthenticationStr)
    let headers = new HttpHeaders({
      Authorization:basicAuthenticationStr
    })
    return this.http.get<AuthenticationBean>("http://localhost:8080/basicauth",{headers}).pipe(
      map(
        ( data: any) =>{
          sessionStorage.setItem('authenticaterUser',userName);
          sessionStorage.setItem('token',basicAuthenticationStr);
          return data;
        }
      )
    );
  }

  getauthenticaterUser(){
    return sessionStorage.getItem('authenticaterUser')
  }
  getAuthToken(){
    if(this.getauthenticaterUser()){
      return sessionStorage.getItem('token')
    }
    return false    
  }
}

export class AuthenticationBean{
  constructor(public message:string) { }
}
