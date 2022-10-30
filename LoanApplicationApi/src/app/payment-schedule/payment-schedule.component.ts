
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebServiceService } from '../service/web-service.service';
import { Chart,registerables } from 'node_modules/chart.js';

export class Schedule{
  constructor(
    public paymentDate:Date,
    public principal:number,
    public projectedInterest:number,
    public paymentStatus:String,
    public paymentAmount:number
  )
  {
  }
}

@Component({
  selector: 'app-payment-schedule',
  templateUrl: './payment-schedule.component.html',
  styleUrls: ['./payment-schedule.component.css']
})
export class PaymentScheduleComponent implements OnInit {
  chart:any=[];
  id:number=0
  page:number=1;
  count:number=0;
  tableSize:number=10;
  tableSizes:any=[5,10,15,20]
  schedules:any =[]
  constructor(private service:WebServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.scheduleList()
  }
  scheduleList(){
    this.id=this.route.snapshot.params['id'];
    console.log("sdsd")
    this.service.scheduleHistory(this.id).subscribe(
      res => {
        console.log(res)
        this.schedules = res.paymentSchedules
          Chart.register(...registerables)

        let temp = Object.keys(this.schedules).map(e=>this.schedules[e].projectedInterest)
        console.log(temp)
    let temp2 = Object.keys(this.schedules).map(e=>this.schedules[e].principal)
    let date = Object.keys(this.schedules).map(e=>this.schedules[e].paymentDate)
   console.log(date)
    
   var myChart = new Chart('myChart',{
    
  
    type:'line',
    data: {
      labels: date,
      datasets:[
        {
          data: temp,
          borderColor:'#3cba9f',
          fill:false
        },
        {
          data: temp2,
          borderColor:'#ffcc00',
          fill:false
        },
      ]
    },
    options:{
      plugins: {
        title: {
            display: true,
            text: 'PaymentDetails'
        }
    },
      scales: {
        x : {
          display:true
        },
        y: {
          display:true
        }
      }
    }
    
   }) 
    }
     )
  }

  payment(){
    this.id=this.route.snapshot.params['id'];
    this.service.payment(this.id).subscribe(
      (Response) => {
        console.log(Response)
        this.schedules = Response
        let popup:any = document.getElementById("ConfirmationPopup")
        popup.classList.remove("open-popup");
        }

     )
  }
  back(){
    let popup:any = document.getElementById("ConfirmationPopup")
    popup.classList.remove("open-popup");
  }

  onConfirm(){
    let popup:any = document.getElementById("ConfirmationPopup")
    popup.classList.add("open-popup");
  }


  onTableDataChange(event:any){
    this.page=event;
    this.scheduleList();
  }

  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1;
    this.scheduleList();
  }

}
