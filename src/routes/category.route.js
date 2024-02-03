import { Router } from "express";
import { createCategory, deleteCategory, updateCategory } from "../controllers/category.controller.js";



const router = Router();

router.route("/add").post(createCategory)
router.route("/update/:id").patch(updateCategory)
router.route("/delete/:id").delete(deleteCategory)

export default router;