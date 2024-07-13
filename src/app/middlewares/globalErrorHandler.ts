/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import AppError from "../error/AppError";
import handleZodError from "../error/handleZodError";
import { TErrorMessages } from "../interface/error";
import handleValidationError from "../error/handleValidationError";
import handleCastError from "../error/handleCastError";
import handleDuplicateError from "../error/handleDuplicateError";



const globalErrorHandler: ErrorRequestHandler = ((err, req, res, next) => {

    let statusCode = 500;
    let message = "Something went wrong!" 
    let errorMessages: TErrorMessages = [
        {
            path: "",
            message: "Something went wrong!"
        }
    ]


    // checking the type of error
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages
    }
    else if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
    }
    else if (err.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
    }
    else if (err.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
    }
    else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errorMessages = [{
            path: "",
            message: err?.message
        }]
    }
    else if (err instanceof Error) {
        message = err?.message;
        errorMessages = [{
            path: "",
            message: err?.message
        }]
    }



    if (!(err instanceof AppError) && !(err instanceof ZodError)) {
        return res.status(statusCode).json({
            success: false,
            message,
            errorMessages,
            stack: config.NODE_ENV === "development" ? err?.stack : null,
        })
    }
    else if (err instanceof ZodError) {
        return res.status(statusCode).json({
            success: false,
            message,
            errorMessages,
            stack: config.NODE_ENV === "development" ? err?.stack : null,
        })
    }
    else {
        return res.status(statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message,
            data: err?.data || undefined
        })
    }
})


export default globalErrorHandler;