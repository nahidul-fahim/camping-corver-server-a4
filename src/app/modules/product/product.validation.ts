import { z } from "zod";

// validation schema for creating product
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
        rating: z.number({
            invalid_type_error: "Rating must be a number",
            required_error: "Rating is required"
        }),
    })
});


// validation schema for updating product
const updateProductValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Product name must be a string"
        }).optional(),
        price: z.number({
            invalid_type_error: "Product price must be a number"
        })
            .positive({ message: "Price must be a positive number" })
            .optional(),
        quantity: z.number({
            invalid_type_error: "Product quantity must be a number"
        })
            .int({ message: "Quantity must be an integer" })
            .nonnegative({ message: "Quantity cannot be negative" })
            .optional(),
        description: z.string({
            invalid_type_error: "Description must be a string"
        }).optional(),
        category: z.string({
            invalid_type_error: "Category must be a string"
        }).optional(),
        rating: z.number({
            invalid_type_error: "Rating must be a number",
            required_error: "Rating is required"
        }).optional(),
    })
});



export const ProductValidation = {
    createProductValidationSchema,
    updateProductValidationSchema
}