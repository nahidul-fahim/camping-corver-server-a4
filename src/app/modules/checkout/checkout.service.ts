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

    try {G
        session.startTransaction();
        console.log("Cart products =>", cartProducts)

        // TODO: NEED TO SOLVE HERE

        const updatedProduct = cartProducts?.map(async (item) => {
            const product = await Product.findById(item.product);
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

        console.log("Updated product =>", updatedProduct)

        const result = await Checkout.create([payload], { session });
        await session.commitTransaction();
        await session.endSession();
        return result;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.NOT_FOUND, "Checkout failed!")
    }
}



export const CheckoutService = { newCheckoutIntoDb }