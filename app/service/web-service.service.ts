import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { errMessage } from '../create-loan/create-loan.component';
import { Loan } from '../loan-history/loan-history.component';


@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  constructor(public http:HttpClient) { }

  createLoan(value:any){
    return this.http.post<errMessage>(`${API_URL}/createNewLoan`,value);
  }

  loanHistory(){ 


    return this.http.get<Loan[]>(`${API_URL}/loanDetails`);
  }

  scheduleHistory(id:number){
    return this.http.get<any>(`${API_URL}/customer/${id}`);
  }

  payment(id:number){
    return this.http.get<any>(`${API_URL}/customer/payment/${id}`)
  }


  
}
