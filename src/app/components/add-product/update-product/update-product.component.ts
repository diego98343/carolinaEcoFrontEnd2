import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/models/productCategoryClass/product-category';
import { Product } from 'src/app/models/productClass/product';
import { ProductCategoryService } from 'src/app/services/productCategoryService/product-category.service';
import { ProductService } from 'src/app/services/productService/product.service';
import { EcommerceValidator } from 'src/app/validator/ecommerce-validator';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  
  

  allProducts: FormGroup;

  product: Product;

  productCategories?: ProductCategory[]=[];

  constructor(private _productCategoryService: ProductCategoryService,
    private _productService:ProductService,
    private _routerActive:ActivatedRoute,
    private _router:Router,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.displayProductCategories();

    this.displayProductById();

    this.allProducts= this._formBuilder.group({

      productInputs: this._formBuilder.group({ 
        
      product: new FormControl('',[Validators.required,
                                   Validators.minLength(5),
                                   EcommerceValidator.noOnlyWhiteSpace]),
  
      reference: new FormControl('',[Validators.required,
                                     Validators.minLength(3),
                                     EcommerceValidator.noOnlyWhiteSpace]),
  
      quantity: new FormControl('',[Validators.required,
                                    Validators.minLength(1),
                                    EcommerceValidator.noOnlyWhiteSpace]),
        
      price: new FormControl('',[Validators.required,
                                 Validators.minLength(2),
                                 EcommerceValidator.noOnlyWhiteSpace]),
        
      imageUrl: new FormControl('',[Validators.required,
                                    Validators.minLength(5),
                                    EcommerceValidator.noOnlyWhiteSpace]),     
        
      category: new FormControl('',[Validators.required]),
  
  
      decription: new FormControl('',[Validators.required,
                                      Validators.minLength(10),
                                      EcommerceValidator.noOnlyWhiteSpace])
        
        }),
     
  
  
  // file: this._formBuilder.group({
  
  //  imageFile: new FormControl('',[Validators.required])
  
  //   })   
  
  })
  }

  //get form group validators

get productName(){
  return this.allProducts.get('productInputs.product');
}

get productReference(){
  return this.allProducts.get('productInputs.reference');
}

get productQuantity(){
  return this.allProducts.get('productInputs.quantity');
}

get productPrice(){
  return this.allProducts.get('productInputs.price');
}

get productImageUrl(){
  return this.allProducts.get('productInputs.imageUrl');
}

get productDescription(){
  return this.allProducts.get('productInputs.decription');
}

get productCategory(){
  return this.allProducts.get('productInputs.category');
}

displayProductById(){

  // const isIdPresent= this._routerActive.snapshot.paramMap.has("id");


    const id =+ this._routerActive.snapshot.paramMap.get("id")!
    console.log(id);

    this._productService.getProductById(id).subscribe(
      data=>{

        this.product = data;
        console.log(this.product);
       
      } 
    )
  
}

displayProductCategories(){

  this._productCategoryService.getCategories().subscribe(
    data=>{
      this.productCategories=data
      
    } 
  )
}



editProduct() {

  const id =+ this._routerActive.snapshot.paramMap.get("id")!

  
  this._productService.editProduct(id,this.product).subscribe(data=>{
    console.log(data);
  });

  this._router.navigateByUrl('/productList')
}









}
