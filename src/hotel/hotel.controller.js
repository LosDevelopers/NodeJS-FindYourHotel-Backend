import Hotel from './hotel.model.js';

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
        res.status(500).json({ message: "Error fetching hotel details", error });
    }
};

export const createHotel = async (req, res) => {
    const { name, address, classification, image } = req.body;
    try {
        const newHotel = new Hotel({ name, address, classification, image });
        await newHotel.save();
        res.status(201).json(newHotel);
    } catch (error) {
        res.status(500).json({ message: "Error creating hotel", error });
    }
};

export const updateHotel = async (req, res) => {
    const { id } = req.params;
    const { name, address, classification, image } = req.body;
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            id,
            { name, address, classification, image },
            { new: true }
        );
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
        if (!deletedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.json({ message: "Hotel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting hotel", error });
    }
};