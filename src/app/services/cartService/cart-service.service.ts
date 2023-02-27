import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {


  cartItems: CartItem[] =[];

  totalPrice: Subject<number> =new Subject<number>();
  totalQuantity:Subject<number>= new Subject<number>();
  totalQuantityVWithTaxes:Subject<number>= new Subject<number>();
  totalTax:Subject<number>= new Subject<number>();

  sQuantity:number=0;
 

  constructor() { }


  addToCard(cartItem:CartItem){

    //chenck if we have the item in the cart

    let alreadyExistInCart:boolean=false;
    let alreadyExistingCartItemByIdAndSize:boolean=false;

    let existingCartItem: CartItem= undefined!;
    let existingCartItemByIdAndSize: CartItem= undefined!;
    let existingCartItemByIdNotSize: CartItem= undefined!;
    let existingCartItemBySizeNotId: CartItem= undefined!;
    

    let array:CartItem[]=[];



    if(this.cartItems.length>0){
      // we are looping thr all the items in the cartItems Array 
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id ===cartItem.id)! 
      existingCartItemByIdAndSize = this.cartItems.find(tempCartItem => (tempCartItem.id === cartItem.id) && (tempCartItem.size === cartItem.size))! 
      existingCartItemByIdNotSize = this.cartItems.find(tempCartItem => (tempCartItem.id === cartItem.id) && (tempCartItem.size != cartItem.size))!
      existingCartItemBySizeNotId = this.cartItems.find(tempCartItem => (tempCartItem.id != cartItem.id) && (tempCartItem.size === cartItem.size))!
     
    
      
      //check if we found the product 
      alreadyExistInCart = (existingCartItem != undefined) ;
      alreadyExistingCartItemByIdAndSize = (existingCartItemByIdAndSize!=undefined)

    }

    let tempCartItem: CartItem;

    for(let i =0; i< this.cartItems.length; i++){

      tempCartItem = this.cartItems[i];

      
    }


    if(alreadyExistInCart ){
      // increment the quantity
      existingCartItem.quantity++; 

    } else {  
      this.cartItems.push(cartItem);  
    }




    // if(alreadyExistingCartItemByIdAndSize){

    //   existingCartItemByIdAndSize.quantity++

    // }else if(existingCartItem){
      
    //   existingCartItem.quantity++; 

    // }else if(existingCartItemByIdNotSize!=undefined){
  
    //   this.cartItems.push(cartItem);  

    // } else {  
    //   this.cartItems.push(cartItem);  
    // }


   //compute cart totral price and total quantity
    this.computeCartTotals(); 
  }



  computeQuantity(quantity:number){
    this.sQuantity += quantity;
  }


  computeCartTotals() {
   
   let totalPriceValue: number = 0;
   let totalQuantityValue: number =0;
   let totalValueWithTax: number =0;
  

   for(let currentCartItem of this.cartItems){
    
    console.log('content of the cart')

    totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice!;
    totalQuantityValue += currentCartItem.quantity;

    let totalTax = (totalPriceValue/100)*18

    totalValueWithTax += totalPriceValue + totalTax;
 
    this.totalTax.next(totalTax);
  
   }

   
   this.totalQuantityVWithTaxes.next(totalValueWithTax);
   this.totalPrice.next(totalPriceValue);
   this.totalQuantity.next(totalQuantityValue);
  
   
     //publish the new values .... all subscribers will receive the new data 
  }


  applyDiscountCode(quantity:number){
   
  }


  decrementQuantity(cartItem: CartItem){

 //decrease the quantity  
    cartItem.quantity--;

    if(cartItem.quantity===0){

    if(confirm("Seguro quieres eliminar el producto?")){

      this.remove(cartItem);
    }
    cartItem.quantity=1
    
    }else{
      this.computeCartTotals();
    }
}

remove(cartItem:CartItem){

// get the index of the item in the array
const itemIndex = this.cartItems.findIndex(tempCartItem=> tempCartItem.id ===cartItem.id)

// if the item is found remove the item from the array / we use splice to delete the element of an arra y
if(itemIndex>-1){
  this.cartItems.splice(itemIndex,1);
}



}

}


