import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UsersService } from 'src/app/services/users.service';
import User from 'src/app/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  ngOnInit(): void {
  }
   user?:User
  firstName?:string
  lastName?:string
  password?:string
  constructor(private usersService:UsersService,private router:Router,private localStorages:LocalStorageService) { }

  postUser():void{
    
    this.user = {
      firstName:this.firstName!,
      lastName: this.lastName!,
      password:this.password!
    }
    this.usersService.createUser(this.user!).subscribe((res)=>{
      alert(`Welcome Aboard ${this.firstName}`)
      this.localStorages.set("token",res)
       this.router.navigateByUrl("/")
    })
      
  }

}


 


