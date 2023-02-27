import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  private purchaseUrl: string= "https://joyful-birthday-production.up.railway.app/api/purchase"

  constructor( private _httpClient: HttpClient) { }


  placeOrder(purchase: Purchase):Observable<any>{
  return this._httpClient.post<Purchase>(this.purchaseUrl,purchase);
  }



}
