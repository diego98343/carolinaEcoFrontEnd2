import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/userClass/user';

@Injectable({
  providedIn: 'root'
})
export class UserRegisService {


  baseUrl: string = "https://joyful-birthday-production.up.railway.app/api/user";
  

  constructor(private _httpCliente:HttpClient) { }

  
  addUser(user:User){

  return this._httpCliente.post<User>(this.baseUrl,user)

  }


}
