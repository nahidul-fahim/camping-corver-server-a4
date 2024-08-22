import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { ICart } from "./cart.interface";
import { Cart } from "./cart.model";

// create new cart into Db
const newCartIntoDb = async (payload: ICart) => {
    const { product, user, quantity } = payload;
    // find if the product is available in cart for the same user
    const existingProduct = await Cart.findOne({ product, user });

    if (existingProduct) {
        const newQuantity = existingProduct.quantity + quantity;
        const newCart = await Cart.findOneAndUpdate(
            { product, user },
            { quantity: newQuantity },
            {
                new: true,
                runValidators: true,
            }
        ).populate("user").populate("product")
        return newCart;
    }
    else {
        const newCart = await Cart.create(payload);
        const result = await Cart.findById(newCart?._id).populate("user").populate("product");
        return result;
    }
};


// get cart item for user
const getUserCartItem = async (id: string) => {
    const result = await Cart.find({ user: id });
    return result;
}


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
    getUserCartItem,
    deleteCartFromDb
};