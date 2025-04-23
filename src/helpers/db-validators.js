import Room from "../room/room.model.js";

export const roomExists = async (rid = ' ') => {
    const Exists = await Room.findById(rid);
    if (!Exists) {
        throw new Error("Room not found");
    }
};