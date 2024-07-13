// declaring type for error sources
export type TErrorMessages = {
    path: string | number;
    message: string;
}[]


// generic error response sending to the client side
export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: TErrorMessages;
}