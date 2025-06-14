import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private httpClient:HttpClient) { }

  
  CreateReviewService(id:string,review:object):Observable<any>
  {
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/reviews/createReviewService/${id}`,review)
  }
  createReviewDoctor(id:string,review:object):Observable<any>
  {
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/reviews/createReviewDoctor/${id}`,review)
  }
  createReviewShelter(id:string,review:object):Observable<any>
  {
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/reviews/createReviewShelter/${id}`,review)
  }
  deleteRview(id:any):Observable<any>
  {
    return this.httpClient.delete(`https://scoobyfamily.onrender.com/scooby/api/reviews/deleteReview/${id}`);
  }
}
