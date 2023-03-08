import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginData } from './../_types/loginData';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient
  ) { }

  login(loginData: LoginData): Observable<any> {
    return this.http.post('login', loginData);
  }
}
