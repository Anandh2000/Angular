import { Component, OnInit } from '@angular/core';
import { Chart, registerables, Tooltip, Filler,CategoryScale,Legend, LineController, LineElement, PointElement, LinearScale, Title } from 'node_modules/chart.js';




@Component({
  selector: 'app-chartsapp',
  templateUrl: './chartsapp.component.html',
  styleUrls: ['./chartsapp.component.css'],
})
export class ChartsappComponent implements OnInit {

  
  constructor() {}

  ngOnInit(): void {
    
    //Chart.register(LineController,Tooltip, Legend,Filler,LineElement, PointElement, LinearScale,CategoryScale, Title);
    Chart.register(...registerables);
    let temp = [10,5,22,43,4];
    let temp2 = [23,40,20,10];
    let date = [12,33,44,55,10];
   console.log(temp)
    
   var myChart = new Chart('myChart',{
    type: 'bubble',
    data: {
      labels: date,
  datasets: [
    {
      label: 'Dataset 1',
      data: temp,
      borderColor: 'red',
      backgroundColor: 'red',
    },
    {
      label: 'Dataset 2',
      data: temp2,
      borderColor: 'orange',
      backgroundColor:'orange',
    }
  ]
    },
    options: {
     responsive: true,
      plugins: {
        legend: {
          position: 'top',
       },
        title: {
          display: true,
          text: 'Chart.js Bubble Chart'
        }
      }
    },
   


    // type:'line',
    // data: {
    //   labels: date,
    // datasets: [
    //   {
    //   label: 'payment',
    //   data: temp,
    //   borderColor: '#3cba9f',
    //   fill:false,
    //   backgroundColor:'#3cba9f',
    //   pointBackgroundColor: 'rgb(255, 99, 132)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgb(255, 99, 132)',
    //   cubicInterpolationMode: 'monotone',
    //   tension: 0.4
    // }, {
    //   label: 'interest',
    //   data: temp2,
    //   borderColor: '#ffcc00',
    //   fill: false,
    //   backgroundColor:'#ffcc00',
    //   tension: 0.4
    // },]
    // },
    // options:{
    //   plugins: {
    //     title: {
    //         display: true,
    //         text: 'Chart Title'
    //     }
    // },
    //   scales: {
    //     x : {
    //       display:true
    //     },
    //     y: {
    //       display:true
    //     }
    //   }
    // }
    
   }) 


  }
}
