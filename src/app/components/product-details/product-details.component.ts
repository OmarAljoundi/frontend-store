import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Product from 'src/app/product';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  id?:Number;
  private sub: any;
  product?:Product
  quantity:number = 1
  constructor(private route: ActivatedRoute,private productServies:ProductsService,private localStorages:LocalStorageService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; 
    }); 
     this.productServies.getProductById(this.id!).subscribe(result =>{
       this.product = result
     })
  }
   addToCart(): void {
  this.localStorages.addToCartList(this.product!,this.quantity)
  alert(`Product ${this.product?.name} has been added!`)
  }
}
