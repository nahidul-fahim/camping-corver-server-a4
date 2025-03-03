import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.route";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { CheckoutRoutes } from "../modules/checkout/checkout.route";



const router = Router();

// all routes
const moduleRoutes = [
    {
        path: "/products",
        route: ProductRoutes
    },
    {
        path: "",
        route: UserRoutes
    },
    {
        path: "",
        route: AuthRoutes
    },
    {
        path: "/cart",
        route: CartRoutes
    },
    {
        path: "/checkout",
        route: CheckoutRoutes
    },
]



// routes
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;