import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Product from '../product';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  
  constructor(private http:HttpClient) { }

  setCart(productId:Number,quantity:Number):Observable<{id:Number,product_id:string,order_id:string,quantity:Number}>{
    return this.http.post<any>("http://localhost:3000/cart/add_product",{productId,quantity})
  }
  getCart():Observable<{name:String,price:Number,quantity:Number}[]>{
    return this.http.get<any>("http://localhost:3000/cart")
  }
  deleteCart():Observable<void>{
    return this.http.delete<any>("http://localhost:3000/cart");
  }
  updateCartStatus(totalPrice:number):Observable<void>{
    const status = "completed"
    return this.http.put<any>("http://localhost:3000/check_out",{status,totalPrice})
  }
  completedOrders():Observable<void>{
    return this.http.get<any>("http://localhost:3000/completed_orders")
  }
  completedOrdersById(orderId:number):Observable<any[]>{
    return this.http.get<any>(`http://localhost:3000/completed_orders/${orderId}`)
  }
 
}
