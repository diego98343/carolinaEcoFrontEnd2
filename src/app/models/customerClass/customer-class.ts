import { OrderClass } from "../orderClass/order-class";

export class CustomerClass {

    constructor(
       public id: number,
       public name: string,
       public email: string,
       public orders: OrderClass[]
       
     ){}
}

