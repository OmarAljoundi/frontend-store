import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import User from 'src/app/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CartService } from 'src/app/services/cart.service';
import Cart from 'src/app/cart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user?:User
  firstName?:string
  lastName?:string
  password?:string
  cartProducts:Cart[] = this.localStorages.getCartList()

  ngOnInit(): void{
  }

  constructor(private usersService:UsersService,private router:Router,private localStorages:LocalStorageService) {}

   getUser():void{
    this.user = {
      firstName:this.firstName!,
      lastName: this.lastName!,
      password:this.password!
    }
    this.usersService.getUser(this.user!).subscribe(async (res: string)=>{
      if(res !== 'No Account Found'){
        alert(`Welcome Aboard ${this.firstName}, You Are Now Signd in`)
        this.localStorages.set("token",res)
        this.router.navigateByUrl("/")
      }
      else {
        alert('Wrong Credentials')
        this.localStorages.set("token","No Account Found")
      }
    })
  }
  
}



