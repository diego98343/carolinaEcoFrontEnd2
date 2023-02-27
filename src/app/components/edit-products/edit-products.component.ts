import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/models/productCategoryClass/product-category';
import { Product } from 'src/app/models/productClass/product';
import { ProductCategoryService } from 'src/app/services/productCategoryService/product-category.service';
import { ProductService } from 'src/app/services/productService/product.service';
import { EcommerceValidator } from 'src/app/validator/ecommerce-validator';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css']
})
export class EditProductsComponent implements OnInit {


  allProducts: FormGroup;

  productCategories?: ProductCategory[] = [];

  theproductId:number;

  product:Product;


  constructor(private _productCategoryService: ProductCategoryService,
    private _productService: ProductService,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.displayProductCategories();
    this.getProductById();

    this.allProducts = this._formBuilder.group({

      productInputs: this._formBuilder.group({

        product: new FormControl('', [Validators.required,
        Validators.minLength(5),
        EcommerceValidator.noOnlyWhiteSpace]),

        reference: new FormControl('', [Validators.required,
        Validators.minLength(3),
        EcommerceValidator.noOnlyWhiteSpace]),

        quantity: new FormControl('', [Validators.required,
        Validators.minLength(1),
        EcommerceValidator.noOnlyWhiteSpace]),

        price: new FormControl('', [Validators.required,
        Validators.minLength(2),
        EcommerceValidator.noOnlyWhiteSpace]),

        imageUrl: new FormControl('', [Validators.required,
        Validators.minLength(5),
        EcommerceValidator.noOnlyWhiteSpace]),

        category: new FormControl('', [Validators.required]),


        decription: new FormControl('', [Validators.required,
        Validators.minLength(10),
        EcommerceValidator.noOnlyWhiteSpace])

      }),

      // file: this._formBuilder.group({

      //  imageFile: new FormControl('',[Validators.required])

      //   })   

    }

    )
  }


  get productName() {
    return this.allProducts.get('productInputs.product');
  }

  get productReference() {
    return this.allProducts.get('productInputs.reference');
  }

  get productQuantity() {
    return this.allProducts.get('productInputs.quantity');
  }

  get productPrice() {
    return this.allProducts.get('productInputs.price');
  }

  get productImageUrl() {
    return this.allProducts.get('productInputs.imageUrl');
  }

  get productDescription() {
    return this.allProducts.get('productInputs.decription');
  }

  get productCategory() {
    return this.allProducts.get('productInputs.category');
  }


   getProductById(){

    this.theproductId = +this.route.snapshot.paramMap.get('id')!

    this._productService.getProductById(this.theproductId).subscribe(
      data=>{
       this.product =data;
       console.log(this.product);
      } 
    )
    
   }


  onSubmit() {

    if(this.allProducts.invalid){
      this.allProducts.markAllAsTouched();
      return;
    }

    let productTry = new Product();
    
    let allProducts = this.allProducts.controls['productInputs'].value

  
    productTry.productName = allProducts.product
    productTry.productReference = allProducts.reference
    productTry.unitsInStock = allProducts.quantity;
    productTry.productPrice = allProducts.price;
    productTry.imageURl = allProducts.imageUrl;
    productTry.productCategory = allProducts.category;
    productTry.description = allProducts.decription;

    

    this._productService.editProduct(this.theproductId,productTry).subscribe(
      (response:Product)=>{
         this._router.navigateByUrl("/productList") 
      }
    );
  }


  
  displayProductCategories(){

    this._productCategoryService.getCategories().subscribe(
      data=>{
        this.productCategories=data
        console.log(this.theproductId)
      } 
    )
  }


}
