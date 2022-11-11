import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateLoanComponent } from './create-loan/create-loan.component';
import { LoanHistoryComponent } from './loan-history/loan-history.component';
import { PaymentScheduleComponent } from './payment-schedule/payment-schedule.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { ErrorResponseComponent } from './error-response/error-response.component';
import { SideMenuBarComponent } from './side-menu-bar/side-menu-bar.component';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import{ MatInputModule} from "@angular/material/input";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select'
import { HttpIntercepterBasicAuthService } from './service/http/http-intercepter-basic-auth.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [
    AppComponent,
    CreateLoanComponent,
    LoanHistoryComponent,
    PaymentScheduleComponent,
    WelcomeComponent,
    HomeComponent,
    ErrorResponseComponent,
    SideMenuBarComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AppRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    NgxDatatableModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass: HttpIntercepterBasicAuthService,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
