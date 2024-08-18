import { z } from "zod";

const cartProductValidationSchema = z.object({
    cartId: z.string({
        invalid_type_error: "Cart ID must be a string",
        required_error: "Cart ID is required"
    }),
    product: z.string({
        invalid_type_error: "Product ID must be a string",
        required_error: "Product ID is required"
    }),
    quantity: z.number({
        invalid_type_error: "Quantity must be a number",
        required_error: "Quantity is required"
    }).min(1, { message: "Quantity must be at least 1" })
});

const checkoutValidationSchema = z.object({
    body: z.object({
        userId: z.string({
            invalid_type_error: "User ID must be a string",
            required_error: "User ID is required"
        }),
        name: z.string({
            invalid_type_error: "Name must be a string",
            required_error: "Name is required"
        }),
        email: z.string({
            invalid_type_error: "Email must be a string",
            required_error: "Email is required"
        }).email("Invalid email address"),
        phone: z.string({
            invalid_type_error: "Phone number must be a string",
            required_error: "Phone number is required"
        }),
        deliveryAddress: z.string({
            invalid_type_error: "Delivery address must be a string",
            required_error: "Delivery address is required"
        }),
        cartProducts: z.array(cartProductValidationSchema, {
            invalid_type_error: "Cart products must be an array",
            required_error: "Cart products are required"
        }).min(1, { message: "Cart must have at least one product" })
    })
});



export const CheckoutValidation = {
    checkoutValidationSchema,
};
