import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Cart from 'src/app/cart';
import  Product  from '../../product';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  quantity:number = 1
  @Output() totalCart = new EventEmitter<number>();
  @Output() cartList= new EventEmitter<Cart[]>()
  cart:Cart[]=[]
  @Input() removedProduct:any
  total?:number
  constructor(private localStorages:LocalStorageService) { }

  ngOnInit(): void {
    this.cart = this.localStorages.getCartList()
    this.total = this.calculateTotal()
    this.cartList.emit(this.cart)
  }
  modifiyCart(product:Product,value:number): void {
    this.localStorages.modifiyFromCartList(product,value)
    this.cart = this.localStorages.getCartList()
    this.total = this.calculateTotal()
    this.cartList.emit(this.cart)
  }
  

  removeItem(cart:Cart):void{
    this.localStorages.removeItemFromCartList(cart)
    this.cart = this.localStorages.getCartList()
    this.total = this.calculateTotal()
    this.cartList.emit(this.cart)
    alert(`Item ${cart.product.name} Has Been Deleted`)
  }

  calculateTotal():number{
    let total = 0
      this.cart.forEach(element => {
          total = total + (element.product.price * element.quantity)
    });
    this.totalCart.emit(total);
    return total
  }


}