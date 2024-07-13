import { z } from "zod";


const createProductValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Product name must be a string",
            required_error: "Product name is required"
        }),
        price: z.number({
            invalid_type_error: "Product price must be a number",
            required_error: "Product price is required"
        }).positive({ message: "Price must be a positive number" }),
        quantity: z.number({
            invalid_type_error: "Product quantity must be a number",
            required_error: "Product quantity is required"
        }).int({ message: "Quantity must be an integer" }).nonnegative({ message: "Quantity cannot be negative" }),
        description: z.string({
            invalid_type_error: "Description must be a string",
            required_error: "Description is required"
        }),
        category: z.string({
            invalid_type_error: "Category must be a string",
            required_error: "Category is required"
        }),
        images: z.string({
            invalid_type_error: "Images must be a string",
            required_error: "Images are required"
        }),
    })
});



export const ProductValidation = { createProductValidationSchema }