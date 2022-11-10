import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebServiceService } from '../service/web-service.service';

export class Loan{
  constructor(
    public customerId:number,
    public loanAmount:number,
    public interestRate:number,
    public loanStartDate:Date,
    public maturityDate:Date,
    public paymentTerm:string,
    public paymentSchedules:any[]
  )
  {
  }
}
@Component({
  selector: 'app-loan-history',
  templateUrl: './loan-history.component.html',
  styleUrls: ['./loan-history.component.css']
})
export class LoanHistoryComponent implements OnInit {
  options = {}
  data:any = [];
  columns: any = {};

  columnsWithFeatures:any
  optionsWithFeatures: any
  dataWithFeatures: any

  title = 'table-tutorial';
  rows:Loan[]=[]

  navBarShow ={basic:true, pinTab:true, cellTemplate:false, checkbox:false}
  



  page:number=1;
  count:number=0;
  tableSize:number=10;
  tableSizes:any=[5,10,15,20]
  loans:Loan[] =[]
  constructor(private service:WebServiceService,private router: Router) { }

  ngOnInit(): void {
    this.loanList()
    this.optionsWithFeatures = {
      rowClickEvent: true,
      rowPerPageMenu: [5, 10, 20, 30],
      rowPerPage : 5
    }
    this.navBarShow ={basic:true, pinTab:false, cellTemplate:false, checkbox:false}

  }
  loanList(){
    this.service.loanHistory().subscribe(
      (response) => {
         console.log(response)
        this.loans = response
        this.rows = response
        //let product = response['paymentSchedules'].map(response => )
      }
     )
  }
  onTableDataChange(event:any){
    this.page=event;
    this.loanList();
  }

  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.loanList();
  }

  onConfirm(id:number){
    console.log(id)
    this.router.navigate(['paymentSchedule',id])

    //this.service.scheduleHistory
  }

}
