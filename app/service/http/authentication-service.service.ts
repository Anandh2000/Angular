import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loan } from 'src/app/loan-history/loan-history.component';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/app/app.constants';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(public http:HttpClient) { }

  jwtAuthenticationService(username:any,password:any){ 

 
    return this.http.post<any>(`${API_URL}/authenticate`,{username,password}).pipe(
      map(
        ( data: any) =>{
          sessionStorage.setItem('authenticaterUser',username);
          console.log(data.token)
          sessionStorage.setItem('token',`Bearer ${data.token}`);
          return data;
        }
      )
    );
  }


 

  authenticationService(username: string,password: string){ 

    let basicAuthenticationStr = 'Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization:basicAuthenticationStr
    })
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`,{headers}).pipe(
      map(
        ( data: any) =>{
          sessionStorage.setItem('authenticaterUser',username);
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
