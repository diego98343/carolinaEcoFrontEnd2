import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/models/productClass/product';
import { CartServiceService } from 'src/app/services/cartService/cart-service.service';
import { ProductService } from 'src/app/services/productService/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


 product:Product;

 productQuantity:number=1;


  constructor(private productService: ProductService,
              private route:ActivatedRoute,
              private cartService:CartServiceService,
              private _router:Router,
              public auth: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetails();
    }) 
  }

  increaseQuantity(){
    this.productQuantity++
  }

  decreaseQuantity(){
    this.productQuantity--
  }


  handleProductDetails() {
    // get the id and convert it to a number 
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!

    this.productService.getProductById(theProductId).subscribe(
      data=>{
        this.product = data
      }
    )
  }


  addProductToCart(product:Product) {

    const cartItem = new CartItem(product);
    alert(`se ha añadido al carrito`)
   this.cartService.addToCard(cartItem);
  
  
    }
 

}
