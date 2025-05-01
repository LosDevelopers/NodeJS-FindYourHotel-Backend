import {Schema, model} from "mongoose"

const categorySchema = new Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
    type:{
        type: String,
        required: true,
        enum: ["hotel", "room"]
    },
})

categorySchema.methods.toJSON = function(){
    const {status, _id, ...category } = this.toObject();
    category.uid = _id
    return category
};


export default model("Category", categorySchema);