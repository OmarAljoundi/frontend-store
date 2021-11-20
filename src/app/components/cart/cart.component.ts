import { Component, Input, OnInit } from '@angular/core';
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
   @Input() product?:Product
   cartList:Cart[] = []
  constructor(private localStorages:LocalStorageService) { }

  ngOnInit(): void {
  }

 addToCart(): void {
  this.localStorages.addToCartList(this.product!,this.quantity)
  alert(`Product ${this.product?.name} has been added!`)
  }
}