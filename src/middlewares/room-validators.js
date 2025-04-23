import { body, param } from "express-validator";
import { roomExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { handleErrors } from "./handle-errors.js";

export const createRoomValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").isNumeric().withMessage("Price is required"),
    body("capacity").isInt({ min: 1 }).withMessage("Capacity must be a positive integer"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const updateRoomImageValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("rid").isMongoId().withMessage("Invalid ID"),
    param("rid").custom(roomExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const updateRoomValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("rid").isMongoId().withMessage("Invalid ID"),
    param("rid").custom(roomExists),
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("description").optional().notEmpty().withMessage("Description is required"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("capacity").optional().isInt({ min: 1 }).withMessage("Capacity must be a positive integer"),
    validarCampos,
    handleErrors
];

export const deleteRoomValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("rid").isMongoId().withMessage("Invalid ID"),
    param("rid").custom(roomExists),
    validarCampos,
    handleErrors
];