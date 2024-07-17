import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CheckoutValidation } from "./checkout.validation";
import { CheckoutController } from "./checkout.controller";



const router = Router();


// create new checkout
router.post(
    "/",
    validateRequest(CheckoutValidation.checkoutValidationSchema),
    CheckoutController.createNewCheckout
)


export const CheckoutRoutes = router;