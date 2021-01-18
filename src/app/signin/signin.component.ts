import { Component, OnInit } from '@angular/core';
import { Manager } from '../manager';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from './../login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  msg = '';
  manager = new Manager();
  constructor(private _service: LoginService, private _route: Router) { }

  ngOnInit() {
  }
  SignInManager() {
    console.log('response sent');
    this._service.SignIn(this.manager).subscribe(
      data => {
        console.log(data);
        sessionStorage.setItem('Id', data.Id);
        this._route.navigate(['/subscription']);
      },
      error => {
        this.msg = error.error.message;
      },
    );
  }
  logIn() {
    this._route.navigate(['/']);
  }
}
