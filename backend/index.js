// const express = require("express");
// require("dotenv").config();
// const { DBConnection } = require("./configs/db");
// const authRoutes = require("./routes/auth");
// const problemRoutes = require("./routes/problem");
// const userRoutes = require("./routes/user");
// const admin = require("firebase-admin");
// const cors = require("cors");
// const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY_PATH;
// const serviceAccount = require(serviceAccountPath);

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

// const app = express();
// const port = process.env.PORT || 8000;

// app.use(express.json());
// app.use(
//     cors({
//         origin: process.env.CLIENT_URL,
//         credentials: true,
//     })
// );

// DBConnection();

// app.get("/", (req, res) => {
//     res.status(200).send("Server is Running");
// });

// app.use("/auth", authRoutes);
// app.use("/problems", problemRoutes);
// app.use("/user", userRoutes);

// app.listen(port, () => {
//   console.log(`Server is Running on Port: ${port}`);
// });

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
