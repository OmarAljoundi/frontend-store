import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-order-completed',
  templateUrl: './order-completed.component.html',
  styleUrls: ['./order-completed.component.scss']
})
export class OrderCompletedComponent implements OnInit {

  constructor(private localStorages:LocalStorageService,private active:ActivatedRoute) { }
  price?:number
  fullName?:string
  ngOnInit(): void {
    this.active.queryParams.subscribe(res=>{
     this.price = res['price']
     this.fullName = res['fullName'] 
    })
    this.localStorages.remove("userCart")
  }

}
