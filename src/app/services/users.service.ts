import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from '../user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  getUser(user:User):Observable<any>{
    return this.http.post("http://localhost:3000/signin",user)
  }
  createUser(user:User):Observable<any>{
    return this.http.post("http://localhost:3000/signup",user)
  }
  

}