import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthenticationBean, AuthenticationServiceService } from '../service/http/authentication-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup | any;
  title = 'material-login';
  invalidLogin = true;
  constructor(
    private router:Router,private authService:AuthenticationServiceService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
        '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
      ),]),
      password: new FormControl('', [Validators.required,Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
      )])
    });
   }
  ngOnInit(): void {
  }
  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }

    console.log(this.loginForm.value.email)
    localStorage.setItem('user',this.loginForm.value)
    //this.router.navigate(['/welcome'])
    this.authentication();
  }
  authentication(){
     this.authService.authenticationService(this.loginForm.value.email,this.loginForm.value.password)
     .subscribe(
      data =>{
        console.log(data)
        this.router.navigate(['/welcome'])
        this.invalidLogin = false
      },
      error =>{
        console.log(error)
        this.invalidLogin = true
      }
     )

     
  }

}
