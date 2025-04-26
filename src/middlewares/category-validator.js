import { body, param } from "express-validator";
import {validateField} from "./validate-fields.js"
import {categoryExists} from "../helpers/db-validator.js"
import {handleErrors} from "./handle-errors.js"
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";

export const addCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").not().isEmpty().withMessage("NOMBRE ES REQUERIDO"),
    validateField,
    handleErrors
];

export const editCategoriesValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").optional().not().isEmpty().withMessage("NOMBRE ES REQUERIDO"),
    validateField,
    handleErrors
];

export const deleteCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("NO ES UN ID VALIDO"),
    param("uid").custom(categoryExists),
    validateField,
    handleErrors
]