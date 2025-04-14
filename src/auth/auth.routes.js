import { Router } from "express";
import { register, login } from "./auth.controller.js";
import {validatorLogin, validatorRegister} from "../middlewares/user-validator.js";

const router = Router();

console.log ("Auth routes loaded");
router.post("/register", validatorRegister, register);


router.post("/login", validatorLogin, login);


export default router;