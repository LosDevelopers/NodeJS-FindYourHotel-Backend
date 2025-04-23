import { Router } from "express";
import {
    addReservation,
    getReservations,
    updateReservation,
    deleteReservation
} from "./reservation.controller.js";
import {
    addReservationValidator,
    updateReservationValidator,
    deleteReservationValidator,
    getReservationValidator
} from "../middlewares/reservation-validators.js";

const router = Router();

/**
 * @swagger
 * /FindYourHotel/v1/reservation:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotel:
 *                 type: string
 *                 description: Hotel ID
 *               room:
 *                 type: string
 *                 description: Room ID
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the reservation
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the reservation
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *       500:
 *         description: Error creating reservation
 */
router.post("/", addReservationValidator, addReservation);

/**
 * @swagger
 * /FindYourHotel/v1/reservation:
 *   get:
 *     summary: Get all reservations
 *     tags: [Reservation]
 *     responses:
 *       200:
 *         description: List of reservations
 *       500:
 *         description: Error fetching reservations
 */
router.get("/", getReservations);

/**
 * @swagger
 * /FindYourHotel/v1/reservation/{id}:
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotel:
 *                 type: string
 *                 description: Hotel ID
 *               room:
 *                 type: string
 *                 description: Room ID
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the reservation
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the reservation
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Error updating reservation
 */
router.put("/:id", updateReservationValidator, updateReservation);

/**
 * @swagger
 * /FindYourHotel/v1/reservation/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Error deleting reservation
 */
router.delete("/:id", deleteReservationValidator, deleteReservation);

export default router;