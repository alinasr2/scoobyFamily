import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private httpClient:HttpClient) { }

  signUp(group:object):Observable<any>
  {
    return this.httpClient.post("https://scoobyfamily.onrender.com/scooby/api/users/signup", group)
  }
  login(group:object):Observable<any>
  {
    return this.httpClient.post("https://scoobyfamily.onrender.com/scooby/api/users/login", group)
  }
  forgotPassword(group:object):Observable<any>
  {
    return this.httpClient.post("https://scoobyfamily.onrender.com/scooby/api/users/forgotPassword",group)
  }
  checkCode(group:object):Observable<any>
  {
    return this.httpClient.post("https://scoobyfamily.onrender.com/scooby/api/users/checkCode",group)
  }
  resetPassword(id:any,group:object):Observable<any>
  {
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/users/reset-password/${id}`,group)
  }
}
