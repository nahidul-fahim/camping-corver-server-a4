import { IProduct } from "./product.interface";
import { Product } from "./product.model";


const createNewProductIntoDb = async (payload: IProduct) => {
    const result = await Product.create(payload);
    return result;
}




export const ProductServices = {
    createNewProductIntoDb,
}