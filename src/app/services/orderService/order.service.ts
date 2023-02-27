import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/common/order';
import { CustomerClass } from 'src/app/models/customerClass/customer-class';
import { OrderClass } from 'src/app/models/orderClass/order-class';
import { OrderItems } from 'src/app/models/orderitems/order-items';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private OrderUrl: string="https://joyful-birthday-production.up.railway.app/api/orders"

  private customerUrl: string="https://joyful-birthday-production.up.railway.app/api/customers"

  private orderItemsUrl: string="https://joyful-birthday-production.up.railway.app/api/orderItemsByProductId"

  private customerByEmailUrl: string="https://joyful-birthday-production.up.railway.app/api/customerByEmail"

  private customerByIdUrl: string="https://joyful-birthday-production.up.railway.app/api/customerById"

  constructor(private _httpClient:HttpClient) { }


  getOrder():Observable<OrderClass[]>{

  return this._httpClient.get<OrderClass[]>(this.OrderUrl).pipe(response=>response);

  }


  getCustomerById(id:number):Observable<CustomerClass[]>{
    return this._httpClient.get<CustomerClass[]>(`${this.customerByIdUrl}/${id}`);
  }


  getCustomerByEmail(email:any):Observable<CustomerClass[]>{
    return this._httpClient.get<CustomerClass[]>(`${this.customerByEmailUrl}/${email}`)
  }

  
  
  getAllCustomer():Observable<CustomerClass[]>{
    return this._httpClient.get<CustomerClass[]>(this.customerUrl).pipe(response=>response);
  }

  
  getAllOrderItemsByOrderId(orderId:number):Observable<OrderItems[]>{
    return this._httpClient.get<OrderItems[]>(`${this.orderItemsUrl}/${orderId}`)
  }
  
  
}
