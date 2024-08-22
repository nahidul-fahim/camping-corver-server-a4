import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { CartService } from "./cart.service";
import sendResponse from "../../utils/sendResponse";


// create cart controller
const newCart = catchAsync(async (req, res) => {
    const newCartData = req.body;
    const result = await CartService.newCartIntoDb(newCartData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cart item added",
        data: result,
    })
})


// get cart item for user
const userCartItem = catchAsync(async (req, res) => {
    const userId = req.params.id;
    const result = await CartService.getUserCartItem(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cart items found!",
        data: result,
    })
})


// remove cart item
const deleteCartItem = catchAsync(async (req, res) => {
    const cartId = req.params.id;
    const result = await CartService.deleteCartFromDb(cartId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Cart item removed",
        data: result,
    })
})


export const CartController = {
    newCart,
    userCartItem,
    deleteCartItem
};