import { Router } from "express";
import { deleteEmployee, employeeAddController, employeeUpdate, getEmployee, getSingleEmployee } from "../controllers/employeeName.controller.js";



const router = Router();

router.route("/").get(getEmployee)
router.route("/:id").get(getSingleEmployee)
router.route("/add-employee").post(employeeAddController)
router.route("/update-employee/:id").put(employeeUpdate)
router.route("/delete-employee/:id").delete(deleteEmployee)

export default router;