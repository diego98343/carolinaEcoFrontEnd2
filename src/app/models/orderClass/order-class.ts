import { Address } from "src/app/common/address";
import { Costumer } from "src/app/common/costumer";
import { OrderItems } from "src/app/common/order-items";

export class OrderClass {

    constructor(
        public id: number,
        public orderTrackingNumber:string,
        public totalQuantity:number,
        public totalPrice:number,
        public dateCreated:Date,
        public lastUpdated:Date,
        public orderitems:OrderItems[],
        public customer:Costumer,
        public shippingAddres:Address,
        public billingAddress:Address
       
     ){}
}
