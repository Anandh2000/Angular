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
      adminName: new FormControl('', [Validators.required,Validators.pattern(
        "[a-zA-Z][a-zA-Z ]+",
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

    console.log(this.loginForm.value.adminName)
    localStorage.setItem('user',this.loginForm.value)
    //this.router.navigate(['/welcome'])
    this.authentication();
  }
  authentication(){
     this.authService.jwtAuthenticationService(this.loginForm.value.adminName,this.loginForm.value.password)
     .subscribe(
      data =>{
        console.log(data)
        this.router.navigate(['/welcome'])
        this.invalidLogin = false
      },
      error =>{
        console.log(error.error)
        alert(error.error)
        this.invalidLogin = true
      }
     )

     
  }

}
