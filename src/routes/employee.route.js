import { Router } from "express";
import { deleteEmployee, employeeAddController, employeeUpdate, getEmployee } from "../controllers/employeeName.controller.js";



const router = Router();

router.route("/").get(getEmployee)
router.route("/add-employee").post(employeeAddController)
router.route("/update-employee").put(employeeUpdate)
router.route("/delete-employee").delete(deleteEmployee)

export default router;