import { Router } from "express";
import { addProducts, getProduct } from "../controllers/product.controller.js";


const router = Router();


router.route("/").get(getProduct);
router.route("/add-product").post(addProducts);



export default router;