import { Router } from "express";
import { addInventory, deleteInventory, getInventory, updateInventory } from "../controllers/inventory.controller.js";


const router = Router();

router.route("/").get(getInventory);
router.route("/addToInventory").post(addInventory);
router.route("/update/:id").patch(updateInventory);
router.route("/delete/:id").delete(deleteInventory);


export default router;