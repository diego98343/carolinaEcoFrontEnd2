import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { Order } from 'src/app/common/order';
import { OrderItems } from 'src/app/common/order-items';
import { Purchase } from 'src/app/common/purchase';
import { CartServiceService } from 'src/app/services/cartService/cart-service.service';
import { CheckOutService } from 'src/app/services/check-out.service';
import { EcommerceValidator } from 'src/app/validator/ecommerce-validator';


@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {




  checkOutFormGroup!: FormGroup;
  totalPriceWithTaxes: number = 0;
  checkBox: boolean = false;
  totalQuantity: number;

  constructor(private cartService: CartServiceService,
              private formBuilder: FormBuilder,
              private checkOutService:CheckOutService,
              private router:Router
  ) { }

  ngOnInit(): void {

    this.updateTotalWithTaxes();

    this.check()

    this.checkOutFormGroup = this.formBuilder.group({
      custumer: this.formBuilder.group({
        name: new FormControl('',[ Validators.required,
                                   Validators.minLength(2),
                                   EcommerceValidator.noOnlyWhiteSpace]),
        email: new FormControl('',
                              [ Validators.required,
                                Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
        ),
      }),
      receiptAddress: this.formBuilder.group({
        address: new FormControl('',[Validators.required,
                                     Validators.minLength(5),
                                     EcommerceValidator.noOnlyWhiteSpace]
                                        ),
        city: new FormControl('',[Validators.required,
                                  Validators.minLength(2),
                                  EcommerceValidator.noOnlyWhiteSpace],),

        country: new FormControl('',[Validators.required,
                                     Validators.minLength(2),
                                     EcommerceValidator.noOnlyWhiteSpace]),

        zipCode: new FormControl('',[Validators.required,
                                     Validators.minLength(4),
                                     EcommerceValidator.noOnlyWhiteSpace]),
      }),
      shippingInfo: this.formBuilder.group({
        address: new FormControl('',[Validators.required,
                                     Validators.minLength(6),
                                     EcommerceValidator.noOnlyWhiteSpace]),

        city: new FormControl('',[Validators.required,
                                  Validators.minLength(2),
                                  EcommerceValidator.noOnlyWhiteSpace]),

        country: new FormControl('',[Validators.required,
                                     Validators.minLength(2),
                                     EcommerceValidator.noOnlyWhiteSpace]),

        zipCode: new FormControl('',[Validators.required,
                                     Validators.minLength(4),
                                     EcommerceValidator.noOnlyWhiteSpace]),
      }),
      creditCardInfo: this.formBuilder.group({
        creditCardNumber: new FormControl('',[Validators.required,
                                              Validators.minLength(16),
                                              EcommerceValidator.noOnlyWhiteSpace]),

        expirationMonth: new FormControl('',[Validators.required,
          EcommerceValidator.noOnlyWhiteSpace],),

        expirationYear: new FormControl('',[Validators.required,
                                            EcommerceValidator.noOnlyWhiteSpace]),

        securityCode: new FormControl('',[Validators.required,
                                          Validators.minLength(3),
                                          EcommerceValidator.noOnlyWhiteSpace])
      })
    })
  }

  // custumer get methods  validation 

  get name(){
    return this.checkOutFormGroup.get('custumer.name');
  }
  get email(){
    return this.checkOutFormGroup.get('custumer.email');
  }

//billing address get methods validation 

  get address(){
    return this.checkOutFormGroup.get('receiptAddress.address');
  }
  get city(){
    return this.checkOutFormGroup.get('receiptAddress.city');
  }
  get country(){
    return this.checkOutFormGroup.get('receiptAddress.country');
  }
  get zipCode(){
    return this.checkOutFormGroup.get('receiptAddress.zipCode');  
  }

  //shippping address get mothods validation 
  
  get shippingAddress(){
    return this.checkOutFormGroup.get('shippingInfo.address');
  }
  get shippingCity(){
    return this.checkOutFormGroup.get('shippingInfo.city');
  }
  get shippingCountry(){
    return this.checkOutFormGroup.get('shippingInfo.country');
  }
  get shippingZipCode(){
    return this.checkOutFormGroup.get('shippingInfo.zipCode');
  }

  //credit Cart get method validation 

  get creditCartNumber(){
    return this.checkOutFormGroup.get('creditCardInfo.creditCardNumber');
  }

  get creditCartMonth(){
    return this.checkOutFormGroup.get('creditCardInfo.expirationMonth');
  }

  get creditCartDay(){
    return this.checkOutFormGroup.get('creditCardInfo.expirationYear');
  }

  get creditSecurityCode(){
    return this.checkOutFormGroup.get('creditCardInfo.securityCode');
  }



  //display the total with taxes on the checkout form 
  updateTotalWithTaxes() {
    this.cartService.totalQuantityVWithTaxes.subscribe(data => {
      this.totalPriceWithTaxes = data;
    })

    this.cartService.computeCartTotals()
  }


  updataCartComponent(){
    this.cartService.totalQuantity.subscribe(data=>{
      this.totalQuantity=data;
    })
  }


  //copy billing address info feature
  copyShippingAddressToBillingAddress(event: any) {
    console.log(event.target.checked)


    if (event.target.checked) {
      console.log(this.checkOutFormGroup.controls['receiptAddress'].value)
      this.checkOutFormGroup.controls['receiptAddress'].setValue(this.checkOutFormGroup.controls['shippingInfo'].value);
      console.log(this.checkOutFormGroup.controls['shippingInfo'].value);
    }
    else {
      this.checkOutFormGroup.controls['receiptAddress'].reset();
    }
  }


  check(){
    const cartitems= this.cartService.cartItems;
    console.log(cartitems);
  }




  //function that runs when checkout form botton is clicked 
  onSubmit() {

    if(this.checkOutFormGroup.invalid){
      this.checkOutFormGroup.markAllAsTouched();
      return;
    }

    //set up order
    let order =new Order();

    order.totalPrice = this.totalPriceWithTaxes;
    order.totalQuantity= this.totalQuantity;
    //get cart items
    const cartitems= this.cartService.cartItems;
    //create orderItems
    let orderItems: OrderItems[]=[];

    for(let i=0; i < cartitems.length; i++){
      orderItems[i] = new OrderItems(cartitems[i]);
    }

    

    //set up purchese
    let purchase = new Purchase();
    //populate purchese -costumer
    purchase.customer = this.checkOutFormGroup.controls['custumer'].value;
    //populate purchese -shipping address
    purchase.shippingAddress = this.checkOutFormGroup.controls['shippingInfo'].value;
    //populate purchese -shipping billing address
    purchase.billingAddress = this.checkOutFormGroup.controls['receiptAddress'].value;

    
    //populate puchase -- order and order items
    purchase.order =order;
    purchase.orderItems= orderItems;

    //call REST API via chackOut Serivece

    this.checkOutService.placeOrder(purchase).subscribe({
        next: response=>{
          alert(`tu orden ha sido recibida.\nnumero de ordern:${response.orderTrackingNumber}`)
          this.reset();
        },
        error: err=>{
          alert(' se produjó un error')
        }
    }
    )
  
  }
  
  reset() {
    this.cartService.cartItems=[];
    this.cartService.totalQuantityVWithTaxes.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.totalPrice.next(0);
    this.checkOutFormGroup.reset();
    this.router.navigateByUrl('/products')
  }


}
