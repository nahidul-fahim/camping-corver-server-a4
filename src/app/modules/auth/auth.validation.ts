import { z } from "zod";


const signInValidationSchema = z.object({
    body: z.object({
        email: z.string({
            invalid_type_error: "Email must be string",
            required_error: "Email is required!"
        })
            .email(),
        password: z.string({
            invalid_type_error: "Password must be string",
            required_error: "Password is required!"
        })
    })
})


export const AuthValidation = { signInValidationSchema };