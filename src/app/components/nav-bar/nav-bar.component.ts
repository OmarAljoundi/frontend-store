import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  token:string = this.localStorages.get("token")!
  userName?:string
  constructor(private localStorages:LocalStorageService) { }

  ngOnInit(): void {
    const user = this.localStorages.decodeToken()
    if(user !== "No Account Found"){
    this.userName = user.first_name 
   }
  }
 
  logout():void{
    this.token = "No Account Found"
    this.localStorages.set("token","No Account Found")
    alert('You are Now Loged Out, Bye')
  }

}
