import { model, Schema } from 'mongoose';

const roomSchema = Schema({
    number: {
        type: String,
        required: [true, 'Room number is required'],
        maxLength: [10, 'Room number cannot exceed 10 characters'],
        unique: false
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: [true, 'Hotel is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    capacity: {
        type: Number,
        required: [true, 'Capacity is required'],
        min: [1, 'Capacity must be at least 1']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be at least 0']
    },
    images: [{
        type: String,
        required: [true, 'Image is required']
    }],
    status: {
        type: Boolean,
        default: true
    }
},
{
    versionkey: false,
    timestamps: true
});

roomSchema.methods.toJSON = function (){
    const {__v, _id, ...rooms} = this.toObject();
    rooms.rid = _id;
    return rooms;
}

export default model('Room', roomSchema);