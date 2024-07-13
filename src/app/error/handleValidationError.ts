import mongoose from "mongoose";
import { TErrorMessages, TGenericErrorResponse } from "../interface/error";

// handle validation error
const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const statusCode = 400;
    const errorMessages: TErrorMessages = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,
            message: val?.message
        }
    })

    return {
        statusCode,
        message: "Validation Error",
        errorMessages,
    }
}

export default handleValidationError;