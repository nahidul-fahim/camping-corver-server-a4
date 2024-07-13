import { TErrorMessages, TGenericErrorResponse } from "../interface/error";



// handle duplicate error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const match = err?.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];


    const statusCode = 400;
    const errorMessages: TErrorMessages = [{
        path: "",
        message: `${extractedMessage} is already exists!`
    }]


    return {
        statusCode,
        message: "Invalid ID",
        errorMessages
    }
}

export default handleDuplicateError;