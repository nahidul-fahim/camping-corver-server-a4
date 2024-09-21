import { UploadApiResponse } from 'cloudinary';

// Extend Express Request interface
declare module 'express-serve-static-core' {
    interface Request {
        cloudinaryResult?: UploadApiResponse;
    }
}