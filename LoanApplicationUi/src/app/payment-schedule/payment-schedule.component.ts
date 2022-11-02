import { Chart,registerables } from 'node_modules/chart.js';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebServiceService } from '../service/web-service.service';

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
  donut:any=[]
  id:number=0
  page:number=1;
  count:number=0;
  tableSize:number=5;
  tableSizes:any=[5,10,15,20]
  schedules:any =[]
  principle:any=[]
  paymentAmount:any=[]
  projectedInterest:any=[]
  total:number=0
  loanAmount:number=0
  customer:any=[]
  date:any=[]
  v:any=[]
  i:number=1
  constructor(private service:WebServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.scheduleList()
  }
  scheduleList(){
    this.id=this.route.snapshot.params['id'];
    console.log("sdsd")
    this.service.scheduleHistory(this.id).subscribe(
      res => {
        console.log(res.loanAmount)
        this.loanAmount=res.loanAmount
        this.customer=res
        this.schedules = res.paymentSchedules
          Chart.register(...registerables)
          Chart.defaults.color = '#fff';

        this.projectedInterest = Object.keys(this.schedules).map(e=>this.schedules[e].projectedInterest)
        this.total = this.projectedInterest.reduce((accumulator: any, current: any) => {
          return accumulator + current;
        }, 0);
        console.log(this.total)
        this.paymentAmount = Object.keys(this.schedules).map(e=>this.schedules[e].paymentAmount)
        this.principle = Object.keys(this.schedules).map(e=>this.schedules[e].principal)
        this.date = Object.keys(this.schedules).map(e=>this.schedules[e].paymentDate)
        this.i=this.date.length
        console.log(this.paymentAmount)
        for(let n = 1; n <= this.i; n++){
          this.v.push(n)
        }
        console.log(this.v)
        this.lineChart()
        this.donutChart()
    }
     )
  }

  donutChart(){
    var donut = new Chart('donut',{
      type: 'doughnut',
      data: {
        labels: ['loan amount', 'totalInterest'],
      datasets: [
        {
          data: [this.loanAmount,this.total],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)',
            
          ],
          borderJoinStyle:'round',
          borderWidth:1,
          
        }
        ]
          },
      options: {
        responsive: true,
        color:'white',
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Payment Details',
            color:'white',
            font: {
              size: 18
            }
    
          }
        }
      },

    })
  }

  lineChart(){
    var myChart = new Chart('myChart',{
      type: 'line',
      data: {
        labels: this.v,
        
  datasets: [
    {
      label: 'Interest',
      data: this.projectedInterest,
      borderColor: 'blue',
      fill: true,
      backgroundColor: 'rgba(2, 19, 255, 0.247)',
      pointRadius: 1,
      tension: 0.4,
      borderWidth: 1
    },
    {
      label: 'Payment',
      data: this.paymentAmount,
      borderColor: 'violet',
      fill: true,
      backgroundColor: 'rgba(243, 1, 252, 0.233)',
      pointRadius: 1,
      tension: 0.4,
      borderWidth: 2,
    }]
      },
      options: {
        

        responsive: true,
        color:'white',
        plugins: {
          title: {
            display: true,
            color:'white',
            text: 'Payment and Interest Amount',
            font: {
              size: 18
            }
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            
            title: {
              display: true,
              color:'white',
              text:'Payments',
            },
          
          },
          y: {
            display: true,
            type: 'logarithmic',
            title: {
              display: true,
              text: 'Amount',
              color:'white',
            },
            min: 0,
          }
        }
      },
      
    })
  
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


// var myChart = new Chart('myChart',{
//   type: 'bar',
//   data: {
  
//     labels: this.date,
// datasets: [
// {
//   label: 'Fully Rounded',
//   data:this.paymentAmount,
//   borderColor: 'red',
//   backgroundColor: 'red',
//   borderWidth: 2,
//   borderRadius: Number.MAX_VALUE,
//   borderSkipped: false,
// },
// {
//   label: 'Small Radius',
//   data:this.projectedInterest,
//   borderColor: 'blue',
//   backgroundColor: 'blue',
//   borderWidth: 2,
//   borderRadius: 5,
//   borderSkipped: false,
// }
// ]
//   },
//   options: {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Chart.js Bar Chart'
//       },
//     },
   
//   },
  



//   // type:'line',
//   // data: {
//   //   labels: this.date,
//   //   datasets:[
//   //     {
//   //       label:"paymentAmount",
//   //       data: this.paymentAmount,
//   //       borderColor:'#3cba9f',
//   //       fill:false
//   //     },
//   //     {
//   //       label:"principle",
//   //       data: this.principle,
//   //       borderColor:'#ffcc00',
//   //       fill:false
//   //     },
//   //   ]
//   // },
//   // options:{
//   //   plugins: {
//   //     title: {
//   //         display: true,
//   //         text: 'PaymentDetails'
//   //     }
//   // },
//   //   scales: {
//   //     x : {
//   //       display:true
//   //     },
//   //     y: {
//   //       display:true
//   //     }
//   //   }
//   // }
  
//  }) 