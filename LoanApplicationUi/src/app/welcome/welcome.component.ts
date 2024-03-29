import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('path',{static:true}) path!: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private document:Document,private route:Router) { }

  ngOnInit(): void {
    let path:any = document.querySelector('path')
    let pathLength = path.getTotalLength()

    path.style.strokeDasharray = pathLength + ' ' + pathLength;

    path.style.strokeDashoffset = pathLength;

    window.addEventListener('scroll', () => {
        var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop)/(document.documentElement.scrollHeight - document.documentElement.clientHeight);
        var drawLength = pathLength * scrollPercentage;
        path.style.strokeDashoffset = pathLength - drawLength;
    })
    

    

    // var t1 = gsap.timeline({
    //   scrollTrigger:{
    //     trigger:'container',
    //     start:"center bottom"
    //   }
    // });
    // t1.from("img",{x:200,opacity:0,duration:1.5})
    // .from(".content",{y:300,opacity:0,duration:1})
  }
  logout(){
    console.log("hiii")
    sessionStorage.removeItem('token')
    this.route.navigate(['/login'])
  }

}
