import dotenv from "dotenv";
dotenv.config();
import { StreamChat } from "stream-chat";
import { logger } from './../utils/logger.js';

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    logger.error("Stream API key or secret is not set in environment variables.");
    throw new Error("Stream API key or secret is missing.");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
    try {
        await chatClient.upsertUser(userData);
        logger.info({
            success: true,
            message: "Stream user upserted successfully",
            userId: userData.id,
        });
    } catch (error) {
        logger.error({
            success: false,
            message: "Stream user upsert failed",
            error: error.message
            });
        throw error;
    }
}

export const deleteStreamUser = async (userId) => {
    try {
        await chatClient.deleteUser(userId);
        logger.info({
            success: true,
            message: "Stream user deleted successfully",
            userId: userId,
        })
    } catch (error) {
        logger.error({
            success: false,
            message: "Stream user deletion failed",
            error: error.message
        });
        throw error; 
    }
}