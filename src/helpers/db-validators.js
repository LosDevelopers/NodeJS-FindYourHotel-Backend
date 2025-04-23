import Room from '../room/room.model.js';
import Reservation from '../reservation/reservation.model.js';

export const reservationExists = async (rrid = ' ') => {
    const existe = await Reservation.findById(rrid);
    if (!existe) {
        throw new Error('There is no reservation with the provided ID');
    }
}