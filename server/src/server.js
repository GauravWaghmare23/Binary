import express from "express"
import { ENV } from "./lib/env.js";

const app = express();
const port = process.env.PORT;

app.get("/data", (req, res) => {
    res.status(200).json({
        success: true,
        data: "This is some sample data from the server.",
    });
});


app.listen(ENV.PORT, () => {
    console.log(`Server is running on port http://localhost:${ENV.PORT}`);
})



