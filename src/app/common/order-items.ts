import { CartItem } from "./cart-item";

export class OrderItems {

    productId:Number;
    imageUrl:String;
    unitPrice:Number;
    quantity:Number;
    size:string;
    name:string
    reference:string
   


    constructor(cartItem:CartItem){
     this.productId =cartItem.id;
     this.imageUrl = cartItem.imageUrl;
     this.quantity = cartItem.quantity;
     this.unitPrice = cartItem.unitPrice;
     this.size = cartItem.size;
     this.name= cartItem.name;
     this.reference=cartItem.reference;
   

    }
}
