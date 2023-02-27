// import { FileHandle } from "../file-handle.models";
import { ProductCategory } from "../productCategoryClass/product-category";


export class Product {
    value(id: number, value: any) {
      throw new Error('Method not implemented.');
    }
    constructor(
        public productId?:number,
        public productName?:string, 
        public productReference?:string,
        public description?:string,
        public imageURl?:string,
        public dateCreated?:Date,
        public lastUpdated?:Date,
        public unitsInStock?:number,
        public productCategory?:ProductCategory,
        public productPrice?:number,
        public size?:string
        // public productImage?:FileHandle[]
    ){
        
    }
}
