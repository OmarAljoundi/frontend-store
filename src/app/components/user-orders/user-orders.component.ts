import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'status','total price','view'];

  dataSource:any[]=[]
  constructor(private cartServices:CartService ) { }

  ngOnInit(): void {
    this.cartServices.completedOrders().subscribe(res=>{
      this.dataSource = res!
      console.log(res)
    })
  }

}
