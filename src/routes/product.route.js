import { Router } from "express";
import { addProducts, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js";


const router = Router();


router.route("/").get(getProduct);
router.route("/add-product").post(addProducts);
router.route("/update-product/:id").put(updateProduct);
router.route("/delete-product/:id").delete(deleteProduct);



export default router;