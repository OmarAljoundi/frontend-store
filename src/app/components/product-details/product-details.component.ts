import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Product from 'src/app/product';
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
  constructor(private route: ActivatedRoute,private productServies:ProductsService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; 
    }); 
     this.productServies.getProductById(this.id!).subscribe(result =>{
       this.product = result
     })
  }
}
