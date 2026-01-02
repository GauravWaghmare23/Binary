import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { logger } from "./utils/logger.js";
import { connectDB } from "./lib/connect.js";
import { clerkMiddleware } from '@clerk/express'
import {serve} from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(clerkMiddleware());
app.use(
  cors({
    origin: [
      process.env.CLIENT_PRODUCTION_URL,
      process.env.CLIENT_DEVELOPMENT_URL,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/api/inngest", serve({ client: inngest, functions }))

//health check route
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Server is healthy" });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            logger.info(`Server is running on port ${port}`);
        });
    } catch (error) {
        logger.error("Failed to start server:", error);
    }
}

startServer();
