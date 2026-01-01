import express from "express"
import path from "path"
import { ENV } from "./lib/env.js";

const app = express();
const port = process.env.PORT;

const __dirname = path.resolve();


app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy and running.",
    })
})

app.get("/data", (req, res) => {
    res.status(200).json({
        success: true,
        data: "This is some sample data from the server.",
    });
});


if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../client","dist","index.html"));
    })
}

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port http://localhost:${ENV.PORT}`);
})



