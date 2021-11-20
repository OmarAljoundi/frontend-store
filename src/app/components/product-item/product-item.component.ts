import { Component, OnInit,Input } from '@angular/core';
import Product from '../../product'
import {RouterModule,Router} from '@angular/router'
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product?:Product
 
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
