import { HttpInterceptorBasicAuthService } from './http-interceptor-basic-auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SubscriptionComponent } from './subscription/subscription.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SigninComponent, SubscriptionComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorBasicAuthService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
