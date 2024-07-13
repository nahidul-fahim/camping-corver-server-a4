import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductServices } from "./product.service";



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



export const ProductControllers = {
    createProduct,
}