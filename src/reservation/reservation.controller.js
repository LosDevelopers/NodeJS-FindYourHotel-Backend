import Reservation from "./reservation.model.js";

export const addReservation = async (req, res) => {
    try {
        const data = req.body;

        const reservation = await Reservation.create(data);

        return res.status(201).json({
            message: 'Reservation created successfully',
            reservation
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error creating reservation',
            error: err.message
        });
    }
};

export const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate("hotel", "name")
            .populate("room", "number")
            .populate("services", "name");

        return res.status(200).json({
            success: true,
            reservations
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error fetching reservations',
            error: err.message
        });
    }
};

export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const reservation = await Reservation.findByIdAndUpdate(id, data, { new: true })
            .populate("hotel", "name")
            .populate("room", "number")
            .populate("services", "name");

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }

        return res.status(200).json({
            message: 'Reservation updated successfully',
            reservation
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error updating reservation',
            error: err.message
        });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;

        const reservation = await Reservation.findByIdAndDelete(id);

        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }

        return res.status(200).json({
            message: 'Reservation deleted successfully'
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error deleting reservation',
            error: err.message
        });
    }
};