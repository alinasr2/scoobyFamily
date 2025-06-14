import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceProfileService {

  constructor(private httpClient:HttpClient) { }


  GetAllServiceProfile():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/serviceProfile/get-servicesProfile`);
  }
  GetServiceProfile(id:string):Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/serviceProfile/get-serviceProfile/${id}`);
  }
}
