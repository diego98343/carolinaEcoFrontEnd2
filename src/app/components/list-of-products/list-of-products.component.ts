import { Component, NgZone, OnInit } from '@angular/core';
import { Product } from 'src/app/models/productClass/product';
import { ProductService } from 'src/app/services/productService/product.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from 'src/app/services/orderService/order.service';
import { OrderClass } from 'src/app/models/orderClass/order-class';
import { CustomerClass } from 'src/app/models/customerClass/customer-class';
import { EditProductsComponent } from '../edit-products/edit-products.component';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})
export class ListOfProductsComponent implements OnInit {


  products: Product[]=[];

  orders: OrderClass[]=[];

  customers:CustomerClass[]=[];

  filters= {
    keyword:''
   }
  searchWord: any;


  constructor(private _productService:ProductService,
              private _orderService:OrderService,
              private dialogRef:MatDialog,
              private zone: NgZone
             ) { }

  ngOnInit(): void {
    this.displayProducts();
    this.loadListProducts()
    
  }

  openDialog(){
   const dialogRef = this.dialogRef.open(EditProductsComponent)
  }


  displayProducts(){

      this._productService.getProduct().subscribe(data=>{
        this.products= this.filderProduct(data)
      
      })
  }


  filderProduct(products: Product[]) {
    //everytime the a product enters its gonne be filter and compare with the array of products 
    return products.filter((p) => {
      return p.productReference.toLocaleLowerCase().includes(this.filters.keyword.toLowerCase()) ||
             p.productName.toLocaleLowerCase().includes(this.filters.keyword.toLowerCase())
    })
  }


    deleteProduct(productId: number|undefined) {
      if(confirm("Seguro quieres eliminar el productos?"))
      this._productService.deleteExpense(productId).subscribe(
        data=>{
          console.log('deleted object',data)
          this.displayProducts();
        }
      )
      }

      loadListProducts(){
        this._productService.getProduct().subscribe(
          data=>{
            this.products= data
            console.log(this.products)
          }         
        )
      }

}


