import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import Product from '../../product';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:Product[] = []
  
  constructor(private allProducts:ProductsService) { }

  ngOnInit(): void {
    this.allProducts.getProducts().subscribe(res=>{
      this.products = res;
    })
  }

}
