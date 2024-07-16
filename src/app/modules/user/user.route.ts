import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = express.Router();

// create new user
router.post(
    "/auth/signup",
    validateRequest(UserValidation.createUserValidationSchema),
    UserController.createNewUser
)

export const UserRoutes = router;