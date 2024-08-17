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

        let cartItem;
        if (existingProduct) {
            const newQuantity = existingProduct.quantity + quantity;

            cartItem = await Cart.findOneAndUpdate(
                { product, user },
                { quantity: newQuantity },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )
                .populate("product")
                .populate("user");
        } else {
            cartItem = await Cart.create([payload], { session });
            cartItem = await Cart.findById(cartItem[0]._id)
                .populate("product")
                .populate("user");
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

        await session.commitTransaction();
        session.endSession();
        return cartItem;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}


// remove cart item
const deleteCartFromDb = async (id: string) => {
    const existingCart = await Cart.findById(id);
    if (!existingCart) {
        throw new AppError(httpStatus.NOT_FOUND, "Cart item doesn't exist!")
    }
    const result = await Cart.findByIdAndDelete(id);
    return result;
}



export const CartService = {
    newCartIntoDb,
    deleteCartFromDb
}