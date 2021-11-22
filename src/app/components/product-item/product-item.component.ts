import { Component, OnInit,Input } from '@angular/core';
import Product from '../../product'
import {RouterModule,Router} from '@angular/router'
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product?:Product
  @Input() quantity:number = 1
  constructor(private router:Router,private localStorages:LocalStorageService) { }

  ngOnInit(): void {
  }
   addToCart(): void {
  this.localStorages.addToCartList(this.product!,this.quantity)
  alert(`Product ${this.product?.name} has been added!`)
  }

}
