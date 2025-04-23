import { body, param } from "express-validator";
import { hotelExists, roomExists, reservationExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRole } from "./validate-roles.js";

export const addReservationValidator = [
    validateJWT,
    hasRole('ADMIN'),
    body("hotel").notEmpty().withMessage("Hotel is required"),
    body("hotel").isMongoId().withMessage("Invalid hotel ID"),
    body("hotel").custom(hotelExists),
    body("room").notEmpty().withMessage("Room is required"),
    body("room").isMongoId().withMessage("Invalid room ID"),
    body("room").custom(roomExists),
    body("startDate").notEmpty().withMessage("Start date is required"),
    body("startDate").isISO8601().withMessage("Invalid start date format"),
    body("endDate").notEmpty().withMessage("End date is required"),
    body("endDate").isISO8601().withMessage("Invalid end date format"),
    validarCampos,
    handleErrors
];

export const updateReservationValidator = [
    validateJWT,
    hasRole('ADMIN'),
    param("id").isMongoId().withMessage("Invalid reservation ID"),
    param("id").custom(reservationExists),
    body("hotel").optional().isMongoId().withMessage("Invalid hotel ID"),
    body("hotel").optional().custom(hotelExists),
    body("room").optional().isMongoId().withMessage("Invalid room ID"),
    body("room").optional().custom(roomExists),
    body("startDate").optional().isISO8601().withMessage("Invalid start date format"),
    body("endDate").optional().isISO8601().withMessage("Invalid end date format"),
    validarCampos,
    handleErrors
];

export const deleteReservationValidator = [
    validateJWT,
    hasRole('ADMIN'),
    param("id").isMongoId().withMessage("Invalid reservation ID"),
    param("id").custom(reservationExists),
    validarCampos,
    handleErrors
];