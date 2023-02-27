import { Product} from "../models/productClass/product";

export class CartItem {
 
id?: number =0;
name?: string ='';
imageUrl?: string ='';
unitPrice?: number =0;
reference?: string ='';



quantity: number =0;
size:string ='';


constructor(product:Product){

    this.id=product.productId;
    this.name= product.productName;
    this.imageUrl= product.imageURl;
    this.unitPrice = product.productPrice;
    this.reference = product.productReference;

    this.quantity=1;
    this.size= product.size;
}













}
