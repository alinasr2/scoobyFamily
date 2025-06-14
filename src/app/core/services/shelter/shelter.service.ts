import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelterService {

  constructor(private httpClient:HttpClient) { }

  getAllShelters():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/shelters/allShelters`);
  }
  getShelter(id:any):Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/shelters/getShelter/${id}`);
  }
  createReview(group:object,id:any):Observable<any>
  {
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/reviews/createReviewShelter/${id}`,group)
  }
  petsInShelter(id:any):Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/shelters/petsInShelter/${id}`);
  }
}

