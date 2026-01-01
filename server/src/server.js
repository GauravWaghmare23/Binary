import express from "express";
import { ENV } from "./lib/env.js";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://binary-frontend.onrender.com/"],
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

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port http://localhost:${ENV.PORT}`);
});
