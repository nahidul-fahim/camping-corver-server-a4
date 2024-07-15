import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductControllers } from "./product.controller";



const router = Router();


// create new product
router.post(
    "/",
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