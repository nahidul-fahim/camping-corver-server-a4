import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductControllers } from "./product.controller";
import { sendImageToCloudinary, upload } from "../../utils/sendImageToCloudinary";


const router = Router();

// create new product
router.post(
    "/",
    upload.single('file'),
    sendImageToCloudinary,
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(ProductValidation.createProductValidationSchema),
    ProductControllers.createProduct
);

// Update product
router.patch(
    "/:id",
    upload.single('file'),
    sendImageToCloudinary,
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next();
    },
    validateRequest(ProductValidation.updateProductValidationSchema),
    ProductControllers.updateProduct
);

// get all products
router.get(
    "/",
    ProductControllers.getAllProducts
)

// get single product
router.get(
    "/:id",
    ProductControllers.getSingleProduct
)

// delete product
router.delete(
    "/:id",
    ProductControllers.deleteProduct
)


export const ProductRoutes = router;