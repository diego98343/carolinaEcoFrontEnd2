import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/common/address';
import { CustomerClass } from 'src/app/models/customerClass/customer-class';
import { OrderItems } from 'src/app/models/orderitems/order-items';
import { OrderService } from 'src/app/services/orderService/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {


  orderItems:OrderItems[]=[];

  customer:CustomerClass[]=[]

  customerAdress:Address;


  constructor( public orderItemsService:OrderService,
               private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOrderItemsByOrderId()
  }


  
   getOrderItemsByOrderId(){


    const orderId = +this.route.snapshot.paramMap.get('id');

   this.orderItemsService.getAllOrderItemsByOrderId(orderId).subscribe(
    data=>{

      this.orderItems=data;
      console.log(this.orderItems);
   })


   this.orderItemsService.getCustomerById(orderId).subscribe(
    data=>{

      this.customer=data;
      

      for(let tempCustomer of this.customer){
         for( let tempOrders of tempCustomer.orders){
           this.customerAdress=  tempOrders.billingAddress
         }
      }
      console.log(this.customer);
      console.log(this.customerAdress);
   })


  
  }








}
