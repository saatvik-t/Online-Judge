const dotenv = require("dotenv");
const express = require("express");
// const cors = require("cors");
const { DBConnection } = require("./configs/db");
const { authRouter } = require("./routes/auth.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   })
// );

DBConnection();

app.get("/", (req, res) => {
  res.status(200).send("Server is up and running!!");
});

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});