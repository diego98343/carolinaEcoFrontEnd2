import { OrderClass } from "../orderClass/order-class";

export class OrderItems {


    constructor(
       
        public id?:number,
        public imageUrl?:string,
        public  name?:string,
        public  reference?:string,
        public  unitPrice?:BigInt,
        public  quantity?:number,
        public  productId?:number,
        public  size?:string,
        public  order?:OrderClass
     
     ){}
}
