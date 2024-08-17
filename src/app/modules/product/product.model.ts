import { model, Schema } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";
import httpStatus from "http-status";
import AppError from "../../error/AppError";



const productSchema = new Schema<IProduct, ProductModel>({
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
    image: {
        type: String,
        required: [true, "Product image is required"],
        trim: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    slug: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true,
        versionKey: false
    }
);


// pre middleware to exclude isDeleted products
productSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next()
})
productSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next()
})


// checking if the product exists in the db
productSchema.statics.isProductExists = async function (id: string) {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
        throw new AppError(httpStatus.NOT_FOUND, "Product doesn't exist!")
    }
    return existingProduct;
}


export const Product = model<IProduct, ProductModel>('Product', productSchema)