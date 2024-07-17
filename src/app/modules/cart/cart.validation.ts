import { z } from "zod";


const addNewCartItemValidationSchema = z.object({
    body: z.object({
        product: z.string({
            invalid_type_error: "Product ID must be a string",
            required_error: "Product ID is required"
        }),
        user: z.string({
            invalid_type_error: "User ID must be a string",
            required_error: "User ID is required"
        }),
        quantity: z.number({
            invalid_type_error: "Quantity must be a number",
            required_error: "Quantity is required"
        })
            .min(1, { message: "Quantity must be at least 1" }),
    })
})


export const CartValidation = { addNewCartItemValidationSchema }