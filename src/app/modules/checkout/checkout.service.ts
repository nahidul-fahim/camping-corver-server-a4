import mongoose from "mongoose";
import { ICheckout } from "./checkout.interface";
import { Product } from "../product/product.model";
import { Checkout } from "./checkout.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";




// create new checkout
const newCheckoutIntoDb = async (payload: ICheckout) => {
    const { cartProducts, userId } = payload;

    // find the user
    const existingUser = await User.findById(userId);

    if (!existingUser) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const updatedProducts = cartProducts?.map(async (item) => {
            const product = await Product.findById(item.product);
            if ((product?.quantity as number) < item?.quantity) {
                throw new AppError(httpStatus.NOT_ACCEPTABLE, "Insufficient product quantity available!")
            }
            const newQuantity = (product?.quantity as number) - item?.quantity;
            await Product.findByIdAndUpdate(
                item.product,
                { quantity: newQuantity },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            );
        });

        await Promise.all(updatedProducts);

        const result = await Checkout.create([payload], { session });
        await session.commitTransaction();
        await session.endSession();
        return result;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Checkout failed!")
    }
}



export const CheckoutService = { newCheckoutIntoDb }