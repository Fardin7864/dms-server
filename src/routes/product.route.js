import { Router } from "express";
import { addProducts, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js";


const router = Router();


router.route("/").get(getProduct);
router.route("/add").post(addProducts);
router.route("/update/:id").put(updateProduct);
router.route("/delete/:id").delete(deleteProduct);



export default router;