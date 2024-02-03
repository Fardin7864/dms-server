import { Router } from "express";
import { createCategory, deleteCategory, getCategoryFromDatabase, updateCategory } from "../controllers/category.controller.js";



const router = Router();

router.route("/add").post(createCategory)
router.route("/update/:id").patch(updateCategory)
router.route("/delete/:id").delete(deleteCategory)
router.route("/categorys").get(getCategoryFromDatabase)

export default router;