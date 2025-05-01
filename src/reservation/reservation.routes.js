import { Router } from 'express';
import {
    getHotelReservations,
    reserveRoom,
    getUserReservations,
    cancelReservation,
    updateReservation,
} from './reservation.controller.js';
import {
    reserveRoomValidator,
    getHotelReservationsValidator,
    getUserReservationsValidator,
    cancelReservationValidator,
    updateReservationValidator,
} from '../middlewares/reservation-validators.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API for managing reservations
 */

/**
 * @swagger
 * /reservation/hotelReservations:
 *   get:
 *     summary: Get all reservations for a specific hotel
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reservations
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Server error
 */
router.get('/hotelReservations', getHotelReservationsValidator, getHotelReservations);

/**
 * @swagger
 * /reservation/reserve:
 *   post:
 *     summary: Reserve a room
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
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
 *       400:
 *         description: Validation error or room unavailable
 *       500:
 *         description: Server error
 */
router.post('/reserve', reserveRoomValidator, reserveRoom);

/**
 * @swagger
 * /reservation/userReservations:
 *   get:
 *     summary: Get reservation history for the logged-in user
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user reservations
 *       500:
 *         description: Server error
 */
router.get('/userReservations', getUserReservationsValidator, getUserReservations);

/**
 * @swagger
 * /reservation/cancel/{rrid}:
 *   delete:
 *     summary: Cancel a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rrid
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation canceled successfully
 *       400:
 *         description: Reservation already canceled
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */
router.delete('/cancel/:rrid', cancelReservationValidator, cancelReservation);

/**
 * @swagger
 * /reservation/update/{rrid}:
 *   put:
 *     summary: Update a reservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rrid
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
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: New start date
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: New end date
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */
router.put('/update/:rrid', updateReservationValidator, updateReservation);

export default router;