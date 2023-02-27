import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CustomerClass } from 'src/app/models/customerClass/customer-class';
import { ProductFile } from 'src/app/models/productFileClass/product-file';
import { OrderService } from 'src/app/services/orderService/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

 

  userEmail: string="diegocolonia98@yahoo.com";
  storage: Storage =sessionStorage;

  customer;


  constructor(public auth: AuthService,
              public orderService: OrderService) { }

  ngOnInit(): void {
    this.getUserInfo();
  
  }


  getUserInfo(){

    this.auth.user$.subscribe(
      data=>{
      //get the user email
      const theEmail = data.email;
      console.log(theEmail)
  
      this.orderService.getCustomerByEmail('soniavera38@hotmail.com').subscribe(
        data=>{
           this.customer =data;
           console.log(this.customer);
      })
    
    
    })
  }




  


}
