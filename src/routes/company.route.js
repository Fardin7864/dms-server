import { Router } from "express";
import { deleteCompany, registerCompany, updateCompany } from "../controllers/company.controler.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();

router.route('/register-company').post(registerCompany)
router.route('/delete-company/:id').delete(deleteCompany)
router.route('/update-company/:id').patch(updateCompany)


export default router;