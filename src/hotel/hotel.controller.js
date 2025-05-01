import Hotel from './hotel.model.js';
import Category from '../category/category.model.js';

export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({ status: true });
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels", error });
    }
};

export const getHotelById = async (req, res) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findById(id);
        if (!hotel || !hotel.status) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Error buscando los dettales de hotel", error });
    }
};

export const createHotel = async (req, res) => {
    const {usuario} = req;
    let Img = req.img;

    const data = req.body;

    data.image = Img
    data.hosts = usuario._id

    if (!data.category) {
        data.category = await Category.findOne({ name: "anything" });
    }

    try {
        const newHotel = new Hotel(data);
        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        res.status(500).json({ message: "Error creating hotel", error });
    }
};

export const updateHotel = async (req, res) => {
    const { id } = req.params;
    let Img = req.img;
    const data = req.body;

    data.image = Img

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

        if(!updatedHotel.hosts.includes(usuario._id)){
            return res.status(401).json({
                success: false,
                message: "No tienes permiso para editar este hotel",
            });
        }

        if (!updatedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.json(updatedHotel);
    } catch (error) {
        res.status(500).json({ message: "Error updating hotel", error });
    }
};

export const deleteHotel = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedHotel = await Hotel.findByIdAndUpdate(
            id,
            { status: false },
            { new: true }
        );

        if(!deletedHotel.hosts.includes(usuario._id)){
            return res.status(401).json({
                success: false,
                message: "No tienes permiso para eliminar este hotel",    
            });
        }

        if (!deletedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.json({ message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting hotel", error });
    }
};