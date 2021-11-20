import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
interface orderCompleted {
  name:string,
  price:number,
  quantity:number,
  imageurl:string
}

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  id?:number;
  private sub: any;
  order:orderCompleted[] = []
  totalCart:number = 0
  constructor(private route: ActivatedRoute,private cartServices:CartService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; 
    }); 
    this.cartServices.completedOrdersById(this.id!).subscribe(res=>{
      res.forEach(element => {
        this.order?.push(element)
        this.totalCart = this.totalCart + (element.price * element.quantity)

      });
    })
  }

}
