import { model, Schema } from "mongoose";
import { ICartProducts, ICheckout } from "./checkout.interface";


const cartProductSchema = new Schema<ICartProducts>({
    product: {
        type: Schema.Types.ObjectId,
        required: [true, "Product is required!"],
        ref: "Product"
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    },
});


const checkoutSchema = new Schema<ICheckout>({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "Product is required!"],
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required!"],
    },
    deliveryAddress: {
        type: String,
        required: [true, "Delivery address is required!"],
    },
    cartProducts: {
        type: [cartProductSchema],
        required: true,
        validate: [(val: ICartProducts[]) => val.length > 0, '{PATH} must have at least one product']
    }
})


export const Checkout = model<ICheckout>('Checkout', checkoutSchema);