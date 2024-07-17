import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CheckoutService } from "./checkout.service";


const createNewCheckout = catchAsync(async (req, res) => {
    const checkoutData = req.body;
    const result = await CheckoutService.newCheckoutIntoDb(checkoutData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Checkout successful!",
        data: result,
    })
});



export const CheckoutController = { createNewCheckout };