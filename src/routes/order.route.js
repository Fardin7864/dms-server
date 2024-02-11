import { Router } from "express";
import { addOrder, deleteOrder, getOrder, updateOrder } from "../controllers/order.controller.js";


const router = Router();

router.route("/").get(getOrder);
router.route("/create-order").post(addOrder);
router.route("/update-order/:id").patch(updateOrder);
router.route("/delete-order/:id").delete(deleteOrder);

export default router;