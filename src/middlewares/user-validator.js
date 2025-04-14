import { body, param } from "express-validator";
import { emailExists } from "../helpers/db-validator.js";
import { validateField } from "./validate-field.js";
import { handleErrors } from "./handle-errors.js";

export const validatorRegister = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("It is not a valid email"),
    body("email").custom(emailExists),
    body("password").notEmpty().withMessage("El password es obligatorio"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowerCase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("The password must contain at least 8 characters"),
    validateField,
    handleErrors
]

export const validatorLogin = [
    body("email").notEmpty().withMessage("Email is mandatory"),
    body("password").notEmpty().withMessage("The password is mandatory"),
    body("password").isStrongPassword({
        minLength: 8,
        minLowerCase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("The password must contain at least 8 characters"),
    validateField
]
