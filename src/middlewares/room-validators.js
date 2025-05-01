import { body, param } from "express-validator";
import { roomExists, categoryExists } from "../helpers/db-validator.js";
import { validateField } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { handleErrors } from "./handle-errors.js";

export const createRoomValidator = [
    validateJWT,
    hasRoles("HOST_ROLE"),
    body("hotel").isMongoId().withMessage("Invalid hotel ID"),
    body("number").notEmpty().withMessage("Room number is required"),
    body("category").isMongoId().withMessage("Invalid category ID"),
    body("category").custom(categoryExists),
    body("price").isNumeric().withMessage("Price is required"),
    body("capacity").isInt({ min: 1 }).withMessage("Capacity must be a positive integer"),
    validateField,
    deleteFileOnError,
    handleErrors
];

export const updateRoomImageValidator = [
    validateJWT,
    hasRoles("HOST_ROLE"),
    param("rid").isMongoId().withMessage("Invalid ID"),
    param("rid").custom(roomExists),
    validateField,
    deleteFileOnError,
    handleErrors
];

export const updateRoomValidator = [
    validateJWT,
    hasRoles("HOST_ROLE"),
    param("rid").isMongoId().withMessage("Invalid ID"),
    param("rid").custom(roomExists),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("capacity").optional().isInt({ min: 1 }).withMessage("Capacity must be a positive integer"),
    body("category").optional().isMongoId().withMessage("Invalid category ID"),
    body("category").optional().custom(categoryExists),
    validateField,
    handleErrors
];

export const deleteRoomValidator = [
    validateJWT,
    hasRoles("HOST_ROLE"),
    param("rid").isMongoId().withMessage("Invalid ID"),
    param("rid").custom(roomExists),
    validateField,
    handleErrors
];

export const getRoomsValidator = [
    validateJWT,
    hasRoles("HOST_ROLE"),
    validateField,
    handleErrors
];