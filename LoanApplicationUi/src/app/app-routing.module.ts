import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLoanComponent } from './create-loan/create-loan.component';
import { ErrorResponseComponent } from './error-response/error-response.component';
import { HomeComponent } from './home/home.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PaymentScheduleComponent } from './payment-schedule/payment-schedule.component';
import { RouteGaurdService } from './service/routegaurd/route-gaurd.service';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path:'',redirectTo:'login',pathMatch:'full'
  },
  {
    path:'login',component:LoginPageComponent
  },
  {
    path: 'welcome', component:WelcomeComponent,canActivate:[RouteGaurdService]
  },
  {
    path:"home",component:HomeComponent,canActivate:[RouteGaurdService]
  },
  {
    path:"create",component:CreateLoanComponent,canActivate:[RouteGaurdService]
  },
  {
    path:"loanDetails",component:LoanHistoryComponent,canActivate:[RouteGaurdService]
  },
  {
    path:"paymentSchedule/:id",component:PaymentScheduleComponent,canActivate:[RouteGaurdService]
  },
  {
    path:"**",component:ErrorResponseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
