import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient:HttpClient) { }

  getAllBlogs():Observable<any>
  {
    return this.httpClient.get("https://scoobyfamily.onrender.com/scooby/api/Plogs/getallplogs");
  }
  createBlog(form:object):Observable<any>
  {
   
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/Plogs/createplog`,form);
  }
}
