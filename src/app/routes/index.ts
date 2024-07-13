import { Router } from "express";
import { ProductRoutes } from "../modules/product/product.route";



const router = Router();

// all routes
const moduleRoutes = [
    {
        path: "/products",
        route: ProductRoutes
    },
]



// routes
moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;