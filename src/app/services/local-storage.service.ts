import { Injectable } from '@angular/core';
import Cart from '../cart';
import Product from '../product';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})


export class LocalStorageService {
cartList:Cart[] = this.getCartList()
helper = new JwtHelperService();
  constructor() { }

    set(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    get(key: string){
        return localStorage.getItem(key);
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    decodeToken():any{
      const token = this.get("token")
      if(token !== "No Account Found"){
      const decodedToken = this.helper.decodeToken(token!);
      return decodedToken.user
      }
     return "No Account Found"
    }

    addToCartList(product:Product,quantity:number){
    const modifiy = this.modifiyFromCartList(product,quantity)
      if(modifiy === 0){
        this.cartList.push({
        product:product,
        quantity:quantity
      })
      const jsonData = JSON.stringify(this.cartList)
      localStorage.setItem('userCart', jsonData)
      }
    }
    getCartList(): Cart[]|[]{
      if(localStorage.getItem('userCart')){
        const data =  JSON.parse(localStorage.getItem('userCart')!)
        return data
      }
      return [];
    }
    modifiyFromCartList(product:Product,newQuantity:number):number{
      const cartList = this.getCartList()
      let counter = 0;
      cartList.map((item)=>{
        if(item.product.id === product.id){
          item.quantity = newQuantity
          this.remove("userCart")
          const jsonData = JSON.stringify(cartList)
          this.set("userCart",jsonData)
          counter++
        }
      })
      return counter
    }
    removeItemFromCartList(cart:Cart){
      let cartList = this.getCartList()
      let cartList2 = cartList.filter(item => item.product.id !== cart.product.id)
      this.remove("userCart")
      const jsonData = JSON.stringify(cartList2)
      this.set("userCart",jsonData)
    }
}