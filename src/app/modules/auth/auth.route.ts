import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();


// sign in user route
router.post(
    "/auth/signin",
    validateRequest(AuthValidation.signInValidationSchema),
    AuthController.signInUserController
)

export const AuthRoutes = router;