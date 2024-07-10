const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!(firstname && lastname && email && password)) {
            return res.status(402).send("Insufficient Information !");
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(402).send("User already exists with the given email");
        }
        const hashedPassword = await bcrypt.hash(password, 15);
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });
        user.token = token;
        user.password = undefined;
        res.status(200).json({ message: 'You have successfully registered', user });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(402).send("Insufficient Information");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("User not found!");
        }
        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(404).send("Password is incorrect");
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in !",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;