/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./product.constant";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";


// create new product data
const createNewProductIntoDb = async (file: any, payload: IProduct) => {

    // get the product name
    const imageName = `${payload?.name.split(' ').join('')}${Date.now()}`;
    // send image to cloudinary
    const image = await sendImageToCloudinary(imageName, file?.path);
    if (!image) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Please try again!")
    }
    // save image to payload
    payload.image = image?.secure_url as string;

    const result = await Product.create(payload);
    return result;
}


// get all product data
const getAllProducts = async (query: Record<string, unknown>) => {

    const productQuery = new QueryBuilder(Product.find(), query)
        .search(searchableFields)
        .filter()
        .sort()

    const result = await productQuery.modelQuery;

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


// update product data
const updateProductIntoDb = async (payload: Partial<IProduct>, id: string) => {
    // checking if the product exist
    await Product.isProductExists(id)

    const result = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });

    return result;
}


// delete a product
const deleteProductFromDb = async (id: string) => {
    // checking if the product exist
    await Product.isProductExists(id)

    const result = await Product.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true
    })

    return result;
}




export const ProductServices = {
    createNewProductIntoDb,
    getAllProducts,
    getSingleProduct,
    updateProductIntoDb,
    deleteProductFromDb
}