import mongoose from "mongoose"
import { logger } from "../utils/logger.js";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL);
        logger.info({
            success: true,
            message: "Database connected successfully",
            host: connection.connection.host,
            name: connection.connection.name,
        });
    } catch (error) {
        logger.error({
            success: false,
            message: "Database connection failed",
            error: error.message,
        });
        throw error;
    }
}