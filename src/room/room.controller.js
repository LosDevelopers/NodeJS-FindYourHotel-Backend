import Room from "./room.model.js";
import Hotel from "../hotel/hotel.model.js";
import User from "../user/user.model.js";

export const addRoom = async (req, res) => {
    try {
        const { usuario } = req;

        let Img = req.imgs;

        const data = req.body;
        data.images = Img;

        const hotel = await Hotel.findById(data.hotel);

        if (!hotel.hosts.includes(usuario._id)) {
            return res.status(401).json({
                success: false,
                message: "No tienes permiso para agregar habitaciones a este hotel",
            });
        }

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
        const { usuario } = req;

        console.log(usuario._id);
        const hotel = await Hotel.findOne({ hosts: usuario._id });

        if (!hotel) {
            return res.status(401).json({
                success: false,
                message: "No tienes permiso para agregar habitaciones a este hotel",
            });
        }

        console.log(hotel._id);
        const rooms = await Room.find({ hotel: hotel._id }).populate("hotel", "name").populate("category", "name").
            populate("images");

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
        const { usuario } = req;

        const { rid } = req.params;
        const data = req.body;

        const room = await Room.findByIdAndUpdate(rid, data, { new: true });

        const hotel = await Hotel.findOne({ hosts: usuario._id });

        if (!hotel) {
            return res.status(401).json({
                success: false,
                message: "No tienes permiso para agregar habitaciones a este hotel",
            });
        }

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
        const { usuario } = req;
        const { rid } = req.params;

        const hotel = await Hotel.findOne({ hosts: usuario._id });

        if (!hotel) {
            return res.status(401).json({
                success: false,
                message: "No tienes permiso para agregar habitaciones a este hotel",
            });
        }


        const room = await Room.findByIdAndUpdate(rid, { status: false }, { new: true });


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
        const { usuario } = req;
        let Img = req.img;

        const { rid } = req.params;
        const data = req.body;

        const newRoomImage = Img

        const room = await Room.findById(rid);

        const hotel = await Hotel.findOne({ hosts: usuario._id });

        if (!hotel) {
            return res.status(401).json({
                success: false,
                message: "No tienes permiso para agregar habitaciones a este hotel",
            });
        }


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

        room.images.push(newRoomImage);
        room.images = room.images.filter((img) => img !== data.oldImage);

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