import Reservation from './reservation.model.js';
import Hotel from '../hotel/hotel.model.js';

export const addReservation = async (req, res) => {
    try{
        const data = req.body;

        const reservation = await Reservation.create(data);

        return res.status(201).json({
            succes: true,
            message: 'Reservacion creada',
            reservation
        })

    }catch (err) {
        return res.status(500).json({
            succes: false,
            message: 'Errror al añadir una reservacion',
            error: err.message
        })
    }
}

// List reservations for a specific hotel (admin)
export const getHotelReservations = async (req, res) => {
    try {
        const { usuario } = req;
        const hotel = await Hotel.findOne({ hosts: usuario._id });

        if (!hotel) {
            return res.status(401).json({
                success: false,
                message: 'No tienes permiso para ver las reservaciones de este hotel',
            });
        }

        const reservations = await Reservation.find({ hotel: hotel._id })
            .populate('room', 'number')
            .populate('user', 'name email');

        return res.status(200).json({
            success: true,
            reservations,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener las reservaciones del hotel',
            error: err.message,
        });
    }
};

// Reserve a room (user)
export const reserveRoom = async (req, res) => {
    try {
        const { usuario } = req;
        const { room, startDate, endDate } = req.body;

        // Validate room availability
        const existingReservations = await Reservation.find({
            room,
            $or: [
                { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
            ],
        });

        if (existingReservations.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'La habitación no está disponible en las fechas seleccionadas',
            });
        }

        // Create reservation
        const reservation = await Reservation.create({
            hotel: req.body.hotel,
            room,
            startDate,
            endDate,
            user: usuario._id,
        });

        // Add reservation to user's array
        usuario.reservation.push(reservation._id);
        await usuario.save();

        return res.status(201).json({
            success: true,
            message: 'Reservación creada exitosamente',
            reservation,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al crear la reservación',
            error: err.message,
        });
    }
};

// Get reservation history (user)
export const getUserReservations = async (req, res) => {
    try {
        const { usuario } = req;

        const reservations = await Reservation.find({ user: usuario._id })
            .populate('hotel', 'name')
            .populate('room', 'number');

        return res.status(200).json({
            success: true,
            reservations,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el historial de reservaciones',
            error: err.message,
        });
    }
};

export const cancelReservation = async (req, res) => {
    try {
        const { rrid } = req.params;

        // Buscar la reservación sin importar su estado
        const reservation = await Reservation.findById(rrid);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: "Reservación no encontrada",
            });
        }

        // Actualizar el estado de la reservación a false
        if (!reservation.status) {
            return res.status(400).json({
                success: false,
                message: "La reservación ya está cancelada",
            });
        }

        reservation.status = false;
        await reservation.save();

        return res.status(200).json({
            success: true,
            message: "Reservación cancelada exitosamente",
            reservation,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al cancelar la reservación",
            error: err.message,
        });
    }
};

export const updateReservation = async (req, res) => {
    try {

        const { rrid } = req.params;
        const data = req.body;

        const reservation = await Reservation.findByIdAndUpdate(rrid, data, { new: true });

        return res.status(200).json({
            success: true,
            message: "Reservación actualizada exitosamente",
            reservation,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la reservación",
            error: err.message,
        });
    }
}