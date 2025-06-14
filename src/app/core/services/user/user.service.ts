import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  getMe():Observable<any>
  {
    
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/user/getuser`);
  }
  getUser(id:any):Observable<any>
  {
    
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/user/getOneUser/${id}`);
  }
  updateUser(updateForm:FormData):Observable<any>
  {
    
    return this.httpClient.patch(`https://scoobyfamily.onrender.com/scooby/api/user/updateuser`,updateForm)
  }
  getAllUser():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/user/getalluser`);
  }
}
