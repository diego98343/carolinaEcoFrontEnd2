import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/userClass/user';

@Injectable({
  providedIn: 'root'
})
export class LogINService {

   private baseUrl: string="https://joyful-birthday-production.up.railway.app/user/logIn";


  constructor( private _httpClient: HttpClient) { }

  logInUser(user:User):Observable<Object>{
    console.log(user);
    return this._httpClient.post(`${this.baseUrl}`,user)
  }
}
