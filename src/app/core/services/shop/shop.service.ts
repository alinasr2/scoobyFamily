import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient:HttpClient) { }

  GetAllProducts(page:any):Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/product/getallproduct?page=${page}&limit=21`);
  }
  getAllProducts():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/product/getallproduct`);
  }
  GetProductsByQuery(page:any,category:string):Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/product/getallproduct?category=${category}&page=${page}&limit=21`);
  }
  GetProdutcsBySearch(search:string):Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/product/getproduct?search=${search}`);
  }
  AddToCart(productId: any): Observable<any> {
    return this.httpClient.patch(`https://scoobyfamily.onrender.com/scooby/api/cart/addproduct?productId=${productId}`, {});
  }
  AddToFavourite(productId:any):Observable<any>
  {
    return this.httpClient.patch(`https://scoobyfamily.onrender.com/scooby/api/fav/addfav?productId=${productId}`, {});
  }
  createProduct(form:FormData):Observable<any>
  {
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/product/createproduct`,form )
  }
}
