import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    const errorMessages = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        statusCode: 400,
        message: 'Cast Error',
        errorMessages,
    };
};

export default handleCastError;