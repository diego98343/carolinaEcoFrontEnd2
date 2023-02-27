import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CartItem } from 'src/app/common/cart-item';
import { CartServiceService } from 'src/app/services/cartService/cart-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {



 

  checkOutFormGroup!: FormGroup;

  cartItems: CartItem[]=[];
  totalPrice: number = 0;
  totalQuantity: number= 0;
  totalPriceWithTaxes: number=0;
  totalTaxes:number=0;
  productQuantityTextInput:number=0;

  

  discountPercentage: number=0;
  discountCode: string="";
  discountValidation: string="";

  discounts={
    code1:"carolina30",
    code2:"carolina20"
  }

  discounts2:string[]=["carolina30","carolina20","carolina10"]
   
    
  

  constructor( private cartService: CartServiceService,
               private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this.updateCartStatus();
    this.discountCodeInput();

  }


  applyDiscount(){

    
    for(let i=0; i< this.discounts2.length; i++){

      let codeWasFound: boolean = false;
    
       if(this.discounts2[i]===this.discountCode){
         codeWasFound = true
       }
      
       if(codeWasFound){
       break;
  
       }
    }

    if(this.discountCode === this.discounts.code1){
        this.discountPercentage = 30;
          
    }else{
     this.discountValidation ="no code found"
     }
    if (this.discountPercentage > 0){
      this.totalPriceWithTaxes = this.totalPriceWithTaxes - (this.totalPriceWithTaxes* this.discountPercentage)/100;  
     }
  }


  deleteProducto(cartItem:CartItem){
    if(confirm("Seguro quieres eliminar el producto?")){

    this.cartService.remove(cartItem)
    this.updateCartStatus();
    }
  }
  


  updateCartStatus(){

   this.cartItems = this.cartService.cartItems;
 
   console.log(this.cartItems);
    this.cartService.totalPrice.subscribe(
      data=>{
        this.totalPrice= data
      } 
     )

   this.cartService.totalQuantity.subscribe(
    data=> this.totalQuantity= data
   )

   this.cartService.totalTax.subscribe(
    data=>{
      this.totalTaxes=data;
    }
   )

   this.cartService.totalQuantityVWithTaxes.subscribe( data=>{
    this.totalPriceWithTaxes=data;
   
   })

   this.cartService.computeCartTotals();

  }


  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCard(cartItem)
    }


  decrementQuantity(cartItem: CartItem){
    this.cartService.decrementQuantity(cartItem)
  }
  

  discountCodeInput(){
   

  }



}
``