import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";


// create new product data
const createNewProductIntoDb = async (payload: IProduct) => {
    const result = await Product.create(payload);
    return result;
}


// get all product data
const getAllProducts = async () => {
    const result = await Product.find();
    if (result.length === 0) {
        throw new AppError(httpStatus.NOT_FOUND, "No data found!", [])
    }
    return result;
}


// get single product data
const getSingleProduct = async (id: string) => {
    const result = await Product.findById(id);
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "No data found!", [])
    }
    return result;
}




export const ProductServices = {
    createNewProductIntoDb,
    getAllProducts,
    getSingleProduct
}