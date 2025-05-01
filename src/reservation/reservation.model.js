import { Schema, model } from "mongoose";

const reservationSchema = new Schema({
    hotel: {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
        required: [true, "Hotel is required"],
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "Room is required"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
    },
    endDate: {
        type: Date,
        required: [true, "End date is required"],
    },
    status: {
            type: Boolean,
            default: true
    }
},
{
    versionKey: false,
    timestamps: true
});

reservationSchema.methods.toJSON = function () {
    const { __v, _id, ...reservation } = this.toObject();
    reservation.rrid = _id;
    return reservation;
}

export default model("Reservation", reservationSchema);