"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";   
import { dbConnection } from "./mongo.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";
import  apiLimiter from "../src/middlewares/rate-limit-validator.js";
import reservationRoutes from "../src/reservation/reservation.routes.js";
import roomRoutes from "../src/room/room.routes.js";
import authRouter from "../src/auth/auth.routes.js";
import userRouter from "../src/user/user.routes.js";
import hotelRouter from "../src/hotel/hotel.routes.js";
import categoryRouter from "../src/category/category.routes.js";
import {createAdmin, createDefaultCategory} from "./default-data.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
}

const routes = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use("/FindYourHotel/v1/rooms", roomRoutes);
    app.use("/FindYourHotel/v1/auth", authRouter);
    app.use("/FindYourHotel/v1/user", userRouter);
    app.use("/FindYourHotel/v1/category", categoryRouter);
    app.use("/FindYourHotel/v1/hotel", hotelRouter);
    app.use("/FindYourHotel/v1/reservation", reservationRoutes);
}

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        createAdmin();
        createDefaultCategory();
        const port = process.env.PORT; 
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};