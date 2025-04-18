import fs from "fs";
import { uploadImage } from "../helpers/coudinary-uploads.js";

export const cloudinaryUploadMiddleware = (folder = "default") => {
    return async (req, res, next) => {
        try {
            if (!req.file || !req.file.path) {
                return res.status(400).json({ error: "No se recibió ninguna imagen" });
            }

            const { secure_url } = await uploadImage(req.file, folder);

            fs.unlink(req.file.path, (err) => {
                if (err) console.error("Error al eliminar archivo local:", err);
            });

            req.img = secure_url;
            next();
        } catch (error) {
        
            return next(error);
        }
    };
};