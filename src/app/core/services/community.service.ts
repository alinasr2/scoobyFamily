import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private httpClient:HttpClient) { }


  getAllPosts():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/community/getAllPosts`);
  }
  getUserMoments(id:any):Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/community/userMoments/${id}`);
  }
  likeAndDislike(postId:any):Observable<any>
  {
    return this.httpClient.patch(`https://scoobyfamily.onrender.com/scooby/api/community/likeAndDisLike?postId=${postId}`,{});
  }

  addPost(form: FormData): Observable<any> 
  {
  return this.httpClient.post('https://scoobyfamily.onrender.com/scooby/api/community/addPost', form);
  }

}
