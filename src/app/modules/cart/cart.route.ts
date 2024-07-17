import { Router } from "express";
import { CartValidation } from "./cart.validation";
import validateRequest from "../../middlewares/validateRequest";
import { CartController } from "./cart.controller";

const router = Router();

// create new cart item
router.post(
    "/",
    validateRequest(CartValidation.addNewCartItemValidationSchema),
    CartController.newCart
)


// remove cart item
router.delete(
    "/:id",
    CartController.deleteCartItem
)


export const CartRoutes = router;