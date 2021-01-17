import { LoginService } from './../login.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Manager } from '../manager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  manager = new Manager();
  msg = '';
  constructor(private _service: LoginService, private _route: Router) { }

  ngOnInit() {
  }

  loginManager() {
    console.log('response sent');
    this._service.loginBackendCheck(this.manager).subscribe(
      data => {
        this._route.navigate(['/subscription']);
      },
      error => {
        this.msg = 'Email Id and Password do not Match , In case of new user please Register ';
      },
    );
  }
  signIn() {
    this._route.navigate(['/SignIn']);
  }
}
