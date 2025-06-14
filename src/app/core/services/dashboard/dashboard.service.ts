import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient:HttpClient) { }

  getAllOrders():Observable<any>
  {
    
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/order/getallorder`);
  }
  getAllPets():Observable<any>
  {
    
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/Pets/getallpets`);
  }
  getAllProducts():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/product/getallproduct`);
  }
}
