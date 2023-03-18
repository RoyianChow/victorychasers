import { Router } from "express";
import { DisplayLoginPage, 
        DisplayRegistrationPage,
        ProcessLoginPage,
        ProcessLogoutPage,
        ProcessRegisterPage} from "../controllers/auth.js";

const router = Router();

//Display Login Page
router.get('/auth/login', DisplayLoginPage);
//Process Login Page
router.post('/auth/login', ProcessLoginPage);

// Display Registration Page
router.get('/register', DisplayRegistrationPage);
// Process Register Page
router.post('/register', ProcessRegisterPage);

// Process Logout Page
router.get('/logout', ProcessLogoutPage);

export default router;
