import { AfterViewInit,Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SearchBarModes } from 'src/app/common/search-bar-modes';
import { ProductCategory } from 'src/app/models/productCategoryClass/product-category';
import { Product } from 'src/app/models/productClass/product';
import { ProductCategoryService } from 'src/app/services/productCategoryService/product-category.service';
import { ProductService } from 'src/app/services/productService/product.service';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  
})
export class ProductsComponent implements OnInit {



  products: Product[] = [];
  productCategories: ProductCategory[] = [];
  searchMode:boolean=false;
  currentProductCategoryId:number=0;
  previousCategoryId: number;


  //retrieve the words from the search bar
 searchWord: String =""
  
 //retrieve reach mode values
 currentSearchMode:String="Buscar por"

//search values for the radio 
//dont forget to get the values of the radio with a function taking event as parameter of the fuction
 searchModes=[
  {name:'Nombre',id:'1',value:'Nombre'},
  {name:'Referencia',id:'2',value:'Referencia'},
  {name:'Precio',id:'3',value:'Precio'},
 
 ]


  //pagination properties
  thePageNumber: number =1;
  thePageSize: number= 8;
  theTotalElements: number =0;




  constructor(private _productService: ProductService,
    private _productCategoryService: ProductCategoryService,
    private route: ActivatedRoute,
    private productPagination: ProductService
  ) { }


  ngOnInit(): void {
    this.displayProducts();
    this.productCategory();
    this.displayProductByCategory();
    // this.displayProductWithPagination();
   
  }


  // displayProductWithPagination() {
  //   this._productService.getProductPagination(0,2,this.currentProductCategoryId).subscribe(
  //     data => {
  //       this.productsWithPag= data.content;
        
  //     }
  //   )
  // }


  searchProductBasedOfSelection(){
    
    if(this.currentSearchMode==="Nombre"){

      this.filterProductsByName();

    }else if
      (this.currentSearchMode==="Referencia"){

      this.serachProductByReference();

    }else if(this.currentSearchMode==="Precio"){
       
      this.searchProductByPrice();

    }else{
      //ive got to change it for one that can take multiple paramerts
      this.filterProductsByName();
    }

  
  }


  filterProductsByName(){

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId === false) {
      this._productService.getProduct().subscribe(
        data => {
          this.products = this.filderProduct(data);
          console.log("filter is active ")
        }
      )
    }
  }


  filderProduct(products: Product[]) {
    //everytime the a product enters its gonne be filter and compare with the array of products 
    return products.filter((p) => {
      return p.productName?.toLocaleLowerCase().includes(this.searchWord.toLowerCase())
    })
  }
  


  sortByField(field:String){
    this._productService.sortByField(field).subscribe(
      data=>{
        this.products=data;
      }
    )
  }


  searchProductByName(){
    this._productService.searchProductByName(this.searchWord).subscribe(
      data=>{
      this.products=data;
    })
  }

  searchProductByPrice(){

    let searchWordToANumber= +this.searchWord;

    this._productService.searchProductByPrice(searchWordToANumber).subscribe(
      data=>{
        this.products=data
      }
    )
  }


  serachProductByReference(){
    this._productService.searchProductByReference(this.searchWord).subscribe(
      data=>{
        this.products = data;
      }
    )
  }


  productCategory() {
    this._productCategoryService.getCategories().subscribe(
      data => {
        this.productCategories = data
      }
    )
  }

  displayProductByCategory(){
    //get the id from the router link
    const theProductCategoryId: number = +this.route.snapshot.paramMap.get('id')!
    //return true if the id is present 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId===true){
      this._productService.sortProductByCategory(theProductCategoryId).subscribe(
        data=>{
          this.products= data;  
      })
  
    }else{
      this.displayProducts();
    }
  }


  sortProductByCategory(CategoryId:number){
  
      this._productService.sortProductByCategory(CategoryId).subscribe(
        data=>{
          this.products= data;  
      }) 
     
  }

  
  displayProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId === false) {
      this._productService.getProduct().subscribe(
        data => {

          this.products = data;
          console.log(this.currentSearchMode)
       
        }
      )
  }

}



}



