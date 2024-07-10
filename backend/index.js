const express = require("express");
require("dotenv").config();
const { DBConnection } = require("./configs/db");
const authRoutes = require("./routes/auth");
const problemRoutes = require("./routes/problem");
const userRoutes = require("./routes/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(cookieParser());

DBConnection();

app.get("/", (req, res) => {
    res.status(200).send("Server is Running");
});

app.use("/auth", authRoutes);
app.use("/problems", problemRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is Running on Port: ${port}`);
});
