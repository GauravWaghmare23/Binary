import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { logger } from "./utils/logger.js";
import { connectDB } from "./lib/connect.js";

const app = express();
const port = process.env.PORT || 3000;


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://binary-frontend.onrender.com", // no trailing slash
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: "Hello from the server.",
  });
});

app.get("/data", (req, res) => {
  res.status(200).json({
    success: true,
    data: "This is some sample data from the server.",
  });
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
