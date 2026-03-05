const express = require("express")
const { authRouter } = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use("/api/auth",authRouter);

module.exports = { app };