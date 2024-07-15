import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";


// create product controller
const createProduct = catchAsync(async (req, res) => {
    const productData = req.body;

    const result = await ProductServices.createNewProductIntoDb(productData);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Product created successfully",
        data: result
    })
})


// get all products controller
const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProducts(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product fetched successfully",
        data: result
    })
});


// get single product
const getSingleProduct = catchAsync(async (req, res) => {
    const productId = req.params.id;
    const result = await ProductServices.getSingleProduct(productId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product fetched successfully",
        data: result
    })
});


// update product
const updateProduct = catchAsync(async (req, res) => {
    const productId = req.params.id;
    const result = await ProductServices.updateProductIntoDb(req.body, productId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product updated successfully",
        data: result
    })
})


// delete product
const deleteProduct = catchAsync(async (req, res) => {
    const productId = req.params.id;
    const result = await ProductServices.deleteProductFromDb(productId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Product deleted successfully",
        data: result
    })
})



export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
}