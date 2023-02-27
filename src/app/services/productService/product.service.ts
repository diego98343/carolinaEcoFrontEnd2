import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/productClass/product';
import { map } from 'rxjs';
import { ProductCategory } from 'src/app/models/productCategoryClass/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  
 private baseUrl: string= "https://joyful-birthday-production.up.railway.app/api/products";

 private baseUrl2: string= "https://joyful-birthday-production.up.railway.app/api/addNewProduct";

 private categoryBaseUrl: string= "https://joyful-birthday-production.up.railway.app/api/productCategories";

  constructor(private _httpClient:HttpClient) { }



  getProduct():Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.baseUrl).pipe(
      map(response=>response)
    )
  }


  searchProductByName(productName:String):Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.baseUrl}/searchByName/${productName}`)
  }


  searchProductByPrice(productPrice:number):Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.baseUrl}/searchByPrice/${productPrice}`)
  }

  sortProductByCategory(productCategory:number):Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.baseUrl}/searchByCategory/${productCategory}`)
  }


  sortByField(field:String):Observable<Product[]>{
    return this._httpClient.get<Product[]>(`${this.baseUrl}/sortBy/${field}`)
  }


  searchProductByReference(productReference:String):Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this.baseUrl}/searchByReference/${productReference}`)
  }



  getProductPagination( thePageSize: number,
                        theTotalPages:number,
                        theCategoryId:number):Observable<getResponseProducts> {

    

   return this._httpClient.get<getResponseProducts>(`${this.baseUrl}/pagination/${thePageSize}/${theTotalPages}`);
  }

  getProductWithPage():Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.baseUrl).pipe(
      map(response=>response)
    )
  }


  addProduct(product:Product){
     return this._httpClient.post<Product>(this.baseUrl,product)
  }


  editProduct(id:number,product:Product){
    
    return this._httpClient.put(`${this.baseUrl}/${id}`,product);
      
   }


  deleteExpense(id:number|undefined){
    return this._httpClient.delete(`${this.baseUrl}/${id}`,{responseType: 'text'})
  }


  getProductById(id:number):Observable<Product>{

    const productUrl=`${this.baseUrl}/${id}`

    return this._httpClient.get<Product>(productUrl);
    
  }

  getProductCategoryById(theCategoryId:Number):Observable<ProductCategory>{

    const productCategoryUrl=`${this.categoryBaseUrl}/${theCategoryId}`;

    return this._httpClient.get<ProductCategory>(productCategoryUrl);
  }





}

interface getResponseProducts{
  content:Product[];
  totalPages: number,
  totalElements: number,
  size: number,
}
