import { body, param } from "express-validator";
import {validateField} from "./validate-fields.js"
import {categoryExists} from "../helpers/db-validators.js"
import {handleErrors} from "./handle-errors.js"

export const addCategoryValidator = [
    body("name").not().isEmpty().withMessage("NOMBRE ES REQUERIDO"),
    validateField
];

export const editCategoriesValidator = [
    body("name").optional().not().isEmpty().withMessage("NOMBRE ES REQUERIDO"),
    validateField
];

export const deleteCategoryValidator = [
    param("uid").isMongoId().withMessage("NO ES UN ID VALIDO"),
    param("uid").custom(categoryExists),
    validateField,
    handleErrors
]