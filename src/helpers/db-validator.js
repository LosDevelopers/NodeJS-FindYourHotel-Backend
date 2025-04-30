import User from "../user/user.model.js";
import Category from "../category/category.model.js"
import Room from "../room/room.model.js";
import Hotel from "../hotel/hotel.model.js";

export const roomExists = async (rid = ' ') => {
    const Exists = await Room.findById(rid);
    if (!Exists) {
        throw new Error("Room not found");
    }
};

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("The user does not exist")
    }
}

export const isClient = async (uid = " ") =>{
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("The client does not exist")
    }

    if(existe.role !== "CLIENT_ROLE" && existe.role !== "HOST_ROLE"){
        throw new Error("Is not a client")
    }
}

export const isAdmin = async (uid = " ") =>{
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("The admin does not exist")
    }

    if(existe.role !== "ADMIN_ROLE" ){
        throw new Error("Is not a admin")
    }
}

export const categoryExists = async(uid = " ") =>{
    const existe = await Category.findById(uid);
    if(!existe){
        throw new Error("The category with the entered id does not exist");
    }
}

export const categoryExistsByName = async(name = " ") =>{
    const existe = await Category.findOne({name});
    if(!existe){
        throw new Error("The category with the entered name does not exist");
    }
}

export const isHost = async (uid = " ") =>{
    const hotel = await Hotel.findOne({ hosts: uid }); 
    if(!hotel){
        throw new Error("The host does not exist");
    }

    const host = await User.findById(uid); 

    if(!host || host.role !== "HOST_ROLE"){
        throw new Error("Is not a host");
    }
}
