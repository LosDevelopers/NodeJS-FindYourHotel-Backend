import { body, param } from "express-validator";
import { roomExists } from "../helpers/db-validator.js";
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
    body("price").isNumeric().withMessage("Price is required"),
    body("capacity").isInt({ min: 1 }).withMessage("Capacity must be a positive integer"),
    validateField,
    deleteFileOnError,
    handleErrors
];

export const updateRoomImageValidator = [
    validateJWT,
    hasRoles("HOST_ROLE"),
    body("image").notEmpty().withMessage("Image is required"),
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
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("description").optional().notEmpty().withMessage("Description is required"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("capacity").optional().isInt({ min: 1 }).withMessage("Capacity must be a positive integer"),
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