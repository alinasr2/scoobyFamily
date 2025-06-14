import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  constructor(private httpClient:HttpClient) { }
  getFavourtieProduct():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/fav/getfavproduct`);
  }
  getFavourtiePet():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/fav/getfavpet`);
  }
  AddToCart(productId: any): Observable<any> {
    return this.httpClient.patch(`https://scoobyfamily.onrender.com/scooby/api/cart/addproduct?productId=${productId}`, {});
  }
  RemoveProductFromFavourite(productId:any):Observable<any>
  {
    return this.httpClient.patch(`https://scoobyfamily.onrender.com/scooby/api/fav/addfav?productId=${productId}`, {});
  }
  RemovePetFromFavourite(PetId:any):Observable<any>
  {
    return this.httpClient.patch(`https://scoobyfamily.onrender.com/scooby/api/fav/addfav?petId=${PetId}`, {});
  }
}
