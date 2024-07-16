import { z } from "zod";


const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Name must be a string",
            required_error: "Name is required"
        }),
        email: z.string({
            invalid_type_error: "Email must be a string",
            required_error: "Email is required"
        }).email(),
        password: z.string({
            invalid_type_error: "Password must be a string",
            required_error: "Password is required"
        }).min(6, { message: "Must be 6 or more characters long" }),
    })
});


export const UserValidation = { createUserValidationSchema }