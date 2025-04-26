import { Router } from 'express';
import { getHotels, getHotelById, createHotel, updateHotel, deleteHotel } from './hotel.controller.js';
import { addHotelValidator, editHotelValidator, deleteHotelValidator } from "../middlewares/hotel-validator.js";
import { uploadHotelImage } from "../middlewares/multer-uploads.js";
import { cloudinaryUploadMiddleware } from "../middlewares/img-uploads.js";

const router = Router();

/**
 * @swagger
 * /hoteles:
 *   get:
 *     summary: List all available hotels
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of hotels
 *       500:
 *         description: Server error
 */
router.get('/hoteles', getHotels);

/**
 * @swagger
 * /hoteles/{id}:
 *   get:
 *     summary: Get specific hotel details
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hotel ID
 *     responses:
 *       200:
 *         description: Hotel details
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Server error
 */
router.get('/hoteles/:id', getHotelById);

/**
 * @swagger
 * /hoteles:
 *   post:
 *     summary: Create a new hotel
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               classification:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Hotel created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/hoteles', uploadHotelImage.single("img"), cloudinaryUploadMiddleware("hotel-img"), addHotelValidator, createHotel);

/**
 * @swagger
 * /hoteles/{id}:
 *   put:
 *     summary: Update hotel data
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hotel ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               classification:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Hotel updated successfully
 *       404:
 *         description: Hotel not found
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.put('/hoteles/:id',uploadHotelImage.single("img"), cloudinaryUploadMiddleware("hotel-img"),  editHotelValidator, updateHotel);

/**
 * @swagger
 * /hoteles/{id}:
 *   delete:
 *     summary: Delete a hotel
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hotel ID
 *     responses:
 *       200:
 *         description: Hotel deleted successfully
 *       404:
 *         description: Hotel not found
 *       500:
 *         description: Server error
 */
router.delete('/hoteles/:id', deleteHotelValidator, deleteHotel);

export default router;