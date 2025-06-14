import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient:HttpClient) { }
  


  addRequest(data:object):Observable<any>
  {
    
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/request/addRequest`,data)
  }
}
