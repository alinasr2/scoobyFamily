import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }


  getCart():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/cart/getcart`);
  }
  deleteFromCart(id:any):Observable<any>
  {
    
    return this.httpClient.delete(`https://scoobyfamily.onrender.com/scooby/api/cart/removeproduct?itemId=${id}`)
  }
  deleteCart():Observable<any>
  {
    
    return this.httpClient.delete(`https://scoobyfamily.onrender.com/scooby/api/cart/deletecart`)
  }
  increaseProductQuanitity(id:any):Observable<any>
  {
    
    return this.httpClient.patch(`https://scoobyfamily.onrender.com/scooby/api/cart/plusquantity?productId=${id}`,{})
  }
  reduceProductQuanitity(id:any):Observable<any>
  {
    
    return this.httpClient.patch(`https://scoobyfamily.onrender.com/scooby/api/cart/minusquantity?productId=${id}`,{})
  }
  applyCoupon(form:object):Observable<any>
  {
    
    return this.httpClient.patch(`https://scoobyfamily.onrender.com/scooby/api/cart/applycoupon`,form)
  }
  getAllCoupons():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/coupon/getallcoupon`);
  }
  checkoutSession(id:any,form:object):Observable<any>
  {
    
    let checkoutForm = {
      'shippingAddress':form,
    }
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/order/cashorder?cartId=${id}`,checkoutForm)
  }
  getAllOrders():Observable<any>
  {
    
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/order/getallorder`);
  }
  createCoupon(form:object):Observable<any>
  {
    
    return this.httpClient.post(`https://scoobyfamily.onrender.com/scooby/api/coupon/createcoupon`,form);
  }
}
