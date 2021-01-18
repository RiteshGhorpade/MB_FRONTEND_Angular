import { Manager } from './manager';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) {
  }

  public loginBackendCheck(manager: Manager): Observable<any> {
    return this._http.post<any>('http://localhost:8080/LogIn', manager, { withCredentials: true });
  }
  public SignIn(manager: Manager): Observable<any> {
    return this._http.post<any>('http://localhost:8080/SignIn', manager, { withCredentials: true });
  }
}
