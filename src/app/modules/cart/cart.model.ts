import { model, Schema } from "mongoose";
import { ICart } from "./cart.interface";


const cartSchema = new Schema<ICart>({
    product: {
        type: Schema.Types.ObjectId,
        required: [true, "Product is required!"],
        ref: "Product"
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "Product is required!"],
        ref: "User"
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"]
    },
    date: {
        type: String,
        required: [true, "Date is required"]
    }
});


export const Cart = model<ICart>('Cart', cartSchema)