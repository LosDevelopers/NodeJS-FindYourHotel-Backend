import Room from "./room.model.js";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const addRoom = async (req, res) => {
    try {
        const data = req.body;

        const room = await Room.create(data);

        return res.status(201).json({
            success: true,
            message: "Habitación creada",
            room,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al agregar la habitación",
            error: err.message,
        });
    }
};

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();

        return res.status(200).json({
            success: true,
            rooms,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las habitaciones",
            error: err.message,
        });
    }
};

export const updateRoom = async (req, res) => {
    try {
        const { rid } = req.params;
        const data = req.body;

        const room = await Room.findByIdAndUpdate(rid, data, { new: true });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Habitación no encontrada",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Habitación actualizada",
            room,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la habitación",
            error: err.message,
        });
    }
};

export const deleteRoom = async (req, res) => {
    try {
        const { rid } = req.params;

        const room = await Room.findByIdAndDelete(rid);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Habitación no encontrada",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Habitación eliminada",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la habitación",
            error: err.message,
        });
    }
};

export const updateRoomImage = async (req, res) => {
    try {
        const { rid } = req.params;
        const newRoomImage = req.file ? req.file.filename : null;

        const room = await Room.findById(rid);

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Habitación no encontrada",
            });
        }

        if (!newRoomImage) {
            return res.status(400).json({
                success: false,
                message: "No se proporcionó ningún archivo",
            });
        }

        if (room.image) {
            const oldRoomImage = join(__dirname, "../../public/uploads/room-images", room.image);
            await fs.unlink(oldRoomImage);
        }

        room.image = newRoomImage;
        await room.save();

        return res.status(200).json({
            success: true,
            message: "Imagen de la habitación actualizada",
            room,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la imagen de la habitación",
            error: err.message,
        });
    }
};