import { Router } from "express";
import {
    addRoom,
    getRooms,
    updateRoom,
    deleteRoom,
    updateRoomImage,
} from "./room.controller.js";
import {
    createRoomValidator,
    updateRoomValidator,
    deleteRoomValidator,
    updateRoomImageValidator,
} from "../middlewares/room-validators.js";
import { uploadRoomImage } from "../middlewares/multer-uploads.js";
import { cloudinaryUploadMultiple, cloudinaryUploadMiddleware } from "../middlewares/img-uploads.js";

const router = Router();

/**
 * @swagger
 * /FindYourHotel/v1/room/createRoom:
 *   post:
 *     summary: Create a new room
 *     tags: [Room]
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
 *               category:
 *                 type: string
 *                 description: Category ID
 *               capacity:
 *                 type: number
 *                 description: Room capacity
 *               price:
 *                 type: number
 *                 description: Room price
 *               image:
 *                 type: string
 *                 description: Room image
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of availability
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of availability
 *     responses:
 *       201:
 *         description: Room created successfully
 *       500:
 *         description: Error creating room
 */
router.post("/createRoom", uploadRoomImage.array("images", 5), cloudinaryUploadMultiple("room-img"), createRoomValidator, addRoom);

/**
 * @swagger
 * /FindYourHotel/v1/room/updateImage/{rid}:
 *   patch:
 *     summary: Update room image
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: rid
 *         schema:
 *           type: string
 *         required: true
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Room image updated successfully
 *       400:
 *         description: No file provided
 *       500:
 *         description: Error updating room image
 */
router.patch("/updateImage/:rid", uploadRoomImage.single("image"), cloudinaryUploadMiddleware("room-img"), updateRoomImageValidator, updateRoomImage);

/**
 * @swagger
 * /FindYourHotel/v1/room/updateRoom/{rid}:
 *   put:
 *     summary: Update room details
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: rid
 *         schema:
 *           type: string
 *         required: true
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Room name
 *               description:
 *                 type: string
 *                 description: Room description
 *               price:
 *                 type: number
 *                 description: Room price
 *               capacity:
 *                 type: number
 *                 description: Room capacity
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       500:
 *         description: Error updating room
 */
router.put("/updateRoom/:rid", updateRoomValidator, updateRoom);

/**
 * @swagger
 * /FindYourHotel/v1/room/getRoom/{rid}:
 *   get:
 *     summary: Get room details
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: rid
 *         schema:
 *           type: string
 *         required: true
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Room details fetched successfully
 *       404:
 *         description: Room not found
 *       500:
 *         description: Error fetching room details
 */
router.get("/getRoom/:rid", updateRoomValidator, updateRoom);

/**
 * @swagger
 * /FindYourHotel/v1/room/getRooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: Rooms fetched successfully
 *       500:
 *         description: Error fetching rooms
 */
router.get("/getRooms", getRooms);

/**
 * @swagger
 * /FindYourHotel/v1/room/deleteRoom/{rid}:
 *   delete:
 *     summary: Delete a room
 *     tags: [Room]
 *     parameters:
 *       - in: path
 *         name: rid
 *         schema:
 *           type: string
 *         required: true
 *         description: Room ID
 *     responses:
 *       200:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 *       500:
 *         description: Error deleting room
 */
router.delete("/deleteRoom/:rid", deleteRoomValidator, deleteRoom);

export default router;