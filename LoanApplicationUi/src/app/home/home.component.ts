import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import {gsap} from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   @ViewChild('secondSection',{static:true}) secondSection!: ElementRef<HTMLDivElement>;
   @ViewChild('thirdSection', { static: true })
  thirdSection!: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private document:Document) { }

  ngOnInit(): void {
    let content:any = document.querySelector('.third-Section')
    let path:any = document.querySelector('.paths')
    let pathLength = path.getTotalLength()
    console.log(pathLength)

    path.style.strokeDasharray = pathLength;

    path.style.strokeDashoffset = calcDashOffset(window.innerHeight* 0.9,content,pathLength);
    function calcDashOffset(scrollY:any,element:any,length:any){
      var scrollPercentage = ((scrollY)-element.offsetTop)/element.offsetHeight;
      var value = length - (length * scrollPercentage)
      return value < 0 ? 0 : value > length ? length : value
    }

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + (window.innerHeight*0.9);
        path.style.strokeDashoffset = calcDashOffset(scrollY,content,pathLength);
    })

    var c:any = this.document.getElementById("paths");
    var t1 = gsap.timeline({
      scrollTrigger:{
        trigger:this.document.querySelector('.second-Section'),
        toggleClass:'active',
        start:'20% center bottom',
        pin:'true',
        end:'top'
      }
    });
    t1.from(".loanimg",{x:200,opacity:0,duration:1.5})
    .from(".firstBody",{x:-200,opacity:0,duration:1.5},"=-1")
    
    var t2 = gsap.timeline({
      scrollTrigger:{
        trigger:this.document.querySelector('.third-Section'),
        toggleClass:'active',
        start:'20% center bottom',
        pin:'true',
        end:'top'
      }
    });
    t2.from(".secondbody",{marginLeft:'1000px', opacity:0,duration:1.5})
    .from(".historyimg",{opacity:0,duration:1.5})
    

    // gsap.to(this.secondSection.nativeElement,{
    //   scrollTrigger:{
    //     trigger:this.secondSection.nativeElement,
    //     markers:true,
    //     scrub:true,
    //     start:'110% center',
    //   }as gsap.plugins.ScrollTriggerInstanceVars,
    //   scale:1.2,
    //   duration:2,
    //   opacity:0,
    // });
    
    gsap.to(this.document.querySelector('.first'),{
      scrollTrigger:{
        trigger:this.document.querySelector('.first'),
       
        scrub:true,
        start:'50% center',
      },
      opacity:0,
      duration:2,
    });
    gsap.to(this.document.querySelector('.second'),{
      scrollTrigger:{
        trigger:this.document.querySelector('.second'),
       
        scrub:true,
        start:'50% center',
      },
      opacity:0,
      duration:2,
    });
    gsap.to(this.document.querySelector('.third'),{
      scrollTrigger:{
        trigger:this.document.querySelector('.third'),
       
        scrub:true,
        start:'50% center',
      },
      opacity:0,
      duration:2,
    });
  }

 

}
