class AppError extends Error {
    public statusCode: number;
    public data;
    constructor(statusCode: number, message: string, data?: [], stack = '') {
        super(message);
        this.statusCode = statusCode;
        this.data = data;

        // checking if stack is available
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default AppError;