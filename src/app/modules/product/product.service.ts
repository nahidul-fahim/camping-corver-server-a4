/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { IProduct } from "./product.interface";
import { Product } from "./product.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./product.constant";
// import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";


// create new product data
const createNewProductIntoDb = async (cloudinaryResult: any, payload: IProduct) => {
    if (!cloudinaryResult || !cloudinaryResult.secure_url) {
        throw new AppError(httpStatus.BAD_REQUEST, "Product image upload failed");
    }

    // checking if the product name already exists
    const existingName = await Product.findOne({ name: { $regex: new RegExp(`^${payload?.name}$`, 'i') } });
    if (existingName) {
        throw new AppError(httpStatus.CONFLICT, "Product name already exists!");
    }

    // slug for the product
    const slug = payload?.name.split(' ').join('-').toLowerCase();
    payload.slug = slug;

    // save image to payload
    payload.image = cloudinaryResult.secure_url;

    const result = await Product.create(payload);
    return result;
};


// get all product data
const getAllProducts = async (query: Record<string, unknown>) => {

    const productQuery = new QueryBuilder(Product.find(), query)
        .search(searchableFields)
        .filter()
        .sort()

    const products = await productQuery.modelQuery;

    const allCategories = (await Product.find()).map((product) => product?.category);
    const uniqueCategories = allCategories?.filter((item: string, index: number) =>
        allCategories.indexOf(item) === index);

    const result = { products, uniqueCategories }

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


// Update product data
const updateProductIntoDb = async (cloudinaryResult: any, payload: Partial<IProduct>, id: string) => {
    // Checking if the product exists
    await Product.isProductExists(id);

    if (cloudinaryResult && cloudinaryResult.secure_url) {
        // Update the payload with the new image URL
        payload.image = cloudinaryResult.secure_url;
    }

    const result = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });

    return result;
};



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