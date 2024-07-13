import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";



const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price cannot be less than 0"]
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
        min: [0, "Product quantity cannot be less than 0"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        trim: true,
    },
    images: {
        type: String,
        required: [true, "Product images are required"],
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);



export const Product = model<IProduct>('Product', productSchema)