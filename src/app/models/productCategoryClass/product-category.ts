import { Product } from "../productClass/product";

export class ProductCategory {
    constructor(
        public categoryId?: number,
        public categoryName?: string,
        public product?:Product
     ){}
}
