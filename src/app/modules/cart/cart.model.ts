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
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"]
    },
},
    {
        timestamps: true,
        versionKey: false
    }
);


export const Cart = model<ICart>('Cart', cartSchema)