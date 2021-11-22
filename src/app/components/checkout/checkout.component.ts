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
  firstName?:string
  lastName?:string 
  autoFill?:boolean
  @Input() card?:string
  @Input() address?:string
  removedProduct:any
  receivedTotal?:number
  constructor(private localStorages:LocalStorageService,private cartServices:CartService,private router:Router,private userServices:UsersService) { }

  ngOnInit(): void {
   const user = this.localStorages.decodeToken()
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

  
  setVal(total:number){
    this.receivedTotal=total
   
  }
  setCart(cart:Cart[]){
    this.cartList = cart
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
              resolve()
          })
        })
    })
  })
)
.then(() => {
   this.cartServices.updateCartStatus(this.receivedTotal!).subscribe(res=>{
     this.localStorages.remove("userCart")
     this.router.navigate(['/checkout/success'],{queryParams:{fullName:this.firstName + ' ' + this.lastName,price:this.receivedTotal},queryParamsHandling:'merge'})
  })

  })
  

}
}
