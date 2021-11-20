import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Cart from 'src/app/cart';
import Product from 'src/app/product';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  cartList:Cart[] = []
  password?:string
  totalCart:number = 0
  firstName?:string
  lastName?:string 
  autoFill?:boolean
  @Input() card?:string
  @Input() address?:string
  constructor(private localStorages:LocalStorageService,private cartServices:CartService,private router:Router,private userServices:UsersService) { }

  ngOnInit(): void {
   const user = this.localStorages.decodeToken()
   this.totalCart = this.calculateTotal()
   if(user !== "No Account Found"){
    this.firstName = user.first_name
    this.lastName = user.last_name
    this.autoFill = true
   }
   else{
      this.firstName = ""
      this.lastName = ""
      this.autoFill = false
   }
  }
  
 
    async onSubmit():Promise<void> {
    if(this.autoFill){
          this.addProductsToCart()
      }
      else{
          await this.authorizedUser()
          this.addProductsToCart()
      }
}

  modifiyCart(product:Product,event:Event): void {
    const value = Number((event.target as HTMLInputElement).value)
    this.localStorages.modifiyFromCartList(product,value)
    this.totalCart = this.calculateTotal()
  }
  calculateTotal():number{
    let total = 0
    this.cartList = this.localStorages.getCartList()
      this.cartList.forEach(element => {
          total = total + (element.product.price * element.quantity)
    });
    return total
  }
  removeItem(cart:Cart):void{
    this.localStorages.removeItemFromCartList(cart)
    this.cartList = this.localStorages.getCartList()
    this.totalCart = this.calculateTotal()
    alert(`Item ${cart.product.name} Has Been Deleted`)
  }
  
  async authorizedUser():Promise<void>{
    const user = {
       firstName:this.firstName!,
        lastName:this.lastName!,
        password:this.password!
     }
    return new Promise(resolve =>{
        this.userServices.getUser(user).subscribe( res=>{
          if(res !== "No Account Found"){
            this.localStorages.set("token", res)
            resolve(res)
          }
        })
          this.userServices.createUser(user).subscribe(res=>{
          this.localStorages.set("token", res)
            resolve(res)
        })
    })
     
  }

  
  async addProductsToCart():Promise<void>{
    Promise.all(
      this.cartList.map(value => {
        return new Promise<void>((resolve) => {
      this.cartServices.setCart(value.product.id!,value.quantity).subscribe
      (response => {
          return new Promise(() => {
              console.log(response)
              resolve()
          })
        })
    })
  })
)
.then(() => {
   this.cartServices.updateCartStatus(this.totalCart).subscribe(res=>{
     console.log(res)
     this.localStorages.remove("userCart")
     this.router.navigate(['/checkout/success'],{queryParams:{fullName:this.firstName + ' ' + this.lastName,price:this.totalCart},queryParamsHandling:'merge'})
  })

  })
  

}}
