import { Schema, model } from "mongoose";

const hotelSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name cannot exceed 50 characters"]
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        maxLength: [100, "Address cannot exceed 100 characters"]
    },
    classification: {
        type: Number,
        required: [true, "Classification is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    category: [
        {type: Schema.Types.ObjectId,
        ref: "Category"
        }
    ],
    status: {
        type: Boolean,
        default: true
    }
});

hotelSchema.methods.toJSON = function () {
    const { _id, ...hotel } = this.toObject();
    hotel.uid = _id;
    return hotel;
};

export default model("Hotel", hotelSchema);