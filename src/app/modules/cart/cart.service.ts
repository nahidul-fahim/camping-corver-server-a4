import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { ICart } from "./cart.interface";
import { Cart } from "./cart.model";
import mongoose from "mongoose";
import { Product } from "../product/product.model";

// create new cart into Db
const newCartIntoDb = async (payload: ICart) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { product, user, quantity } = payload;

        // find if the product is available in cart for the same user
        const existingProduct = await Cart.findOne({ product, user });

        console.log("Existing product", existingProduct)
        let cartItem;

        if (existingProduct) {
            console.log("Entered in if")
            const newQuantity = existingProduct.quantity + quantity;
            cartItem = await Cart.findOneAndUpdate(
                { product, user },
                { quantity: newQuantity },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            );
        } else {
            console.log("Entered in else")
            cartItem = await Cart.create([payload], { session });
        }

        // Update the quantity in the Product model
        const productData = await Product.findById(product).session(session);
        if (!productData) {
            throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
        }
        const newProductQuantity = productData.quantity - quantity;
        if (newProductQuantity < 0) {
            throw new AppError(httpStatus.BAD_REQUEST, "Insufficient product quantity available!");
        }
        await Product.findByIdAndUpdate(product, { quantity: newProductQuantity }, { session });

        // Populate cart item after product quantity update


        await session.commitTransaction();
        session.endSession();
        return "hi";
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};

// remove cart item
const deleteCartFromDb = async (id: string) => {
    const existingCart = await Cart.findById(id);
    if (!existingCart) {
        throw new AppError(httpStatus.NOT_FOUND, "Cart item doesn't exist!")
    }
    const result = await Cart.findByIdAndDelete(id);
    return result;
};

export const CartService = {
    newCartIntoDb,
    deleteCartFromDb
};