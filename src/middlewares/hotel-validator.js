import { body, param } from "express-validator";
import { validateField } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { hasRoles } from "./validate-roles.js";
import { validateJWT } from "./validate-jwt.js";
import { deleteFileOnError} from "./delete-file-on-error.js";

export const addHotelValidator = [
    validateJWT,
    body("name").not().isEmpty().withMessage("NAME IS REQUIRED"),
    body("address").not().isEmpty().withMessage("ADDRESS IS REQUIRED"),
    body("classification")
        .not().isEmpty().withMessage("CLASSIFICATION IS REQUIRED")
        .isInt({ min: 1, max: 5 }).withMessage("CLASSIFICATION MUST BE BETWEEN 1 AND 5"),
    body("img").isEmpty().withMessage("IMAGE IS REQUIRED"),
    validateField,
    deleteFileOnError,
    handleErrors
];

export const editHotelValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "HOST_ROLE"),
    body("name").optional().not().isEmpty().withMessage("NAME IS REQUIRED"),
    body("address").optional().not().isEmpty().withMessage("ADDRESS IS REQUIRED"),
    body("classification")
        .optional()
        .isInt({ min: 1, max: 5 }).withMessage("CLASSIFICATION MUST BE BETWEEN 1 AND 5"),
    body("image").optional().not().isEmpty().withMessage("IMAGE IS REQUIRED"),
    validateField,
    handleErrors
];

export const deleteHotelValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "HOST_ROLE"),
    param("id").isMongoId().withMessage("INVALID ID"),
    validateField,
    handleErrors
];

export const addHostValidator = [
    validateJWT,
    hasRoles("HOST_ROLE"),
    param("id").isMongoId().withMessage("INVALID ID"),
    body("host").isMongoId().withMessage("INVALID HOST ID"),
    body("host").not().isEmpty().withMessage("HOST ID IS REQUIRED"),
    validateField,
    handleErrors
];