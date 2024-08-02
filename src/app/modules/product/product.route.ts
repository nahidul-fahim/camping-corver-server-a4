import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductControllers } from "./product.controller";
import { upload } from "../../utils/sendImageToCloudinary";


const router = Router();

// create new product
router.post(
    "/",
    upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = JSON.parse(req.body.data);
        next()
    },
    validateRequest(ProductValidation.createProductValidationSchema),
    ProductControllers.createProduct
)

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

// update product
router.patch(
    "/:id",
    validateRequest(ProductValidation.updateProductValidationSchema),
    ProductControllers.updateProduct
)

// delete product
router.delete(
    "/:id",
    ProductControllers.deleteProduct
)


export const ProductRoutes = router;