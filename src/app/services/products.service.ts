import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Product from '../product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  
  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:3000/products")
  }
  getProductById(id:Number):Observable<Product>{
    return this.http.get<Product>(`http://localhost:3000/products/${id}`)
  }
}
