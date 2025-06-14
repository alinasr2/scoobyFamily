import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VetService {

  constructor(private httpClient:HttpClient) { }


  getAllDoctors():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/doctors/getdoctors`);
  }
  getAllClicnics():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/vet/getallvet`);
  }
  getDoctor(id:any):Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/doctors/get-doctor/${id}`);
  }
  getClinic(id:any):Observable<any>
  { 
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/vet/getvet/${id}`);
  }
  createDoctor(form:FormData):Observable<any>
  {
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/doctors/add-doctor`,form);
  }
  createClinic(form:FormData):Observable<any>
  {
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/vet/createvet`,form)
  }
}
