import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

// Configuration
cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_secret_key
});

export const sendImageToCloudinary = async (imageName: string, path: string) => {

    // Upload an image
    const uploadedImage = await cloudinary.uploader
        .upload(
            path,
            { public_id: imageName }
        )
        .catch((error) => {
            console.log(error);
        });
    // delete the temporarily uploaded image
    fs.unlink(path, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('File is deleted.');
        }
    });
    return uploadedImage;
};


// parse file using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({ storage: storage });