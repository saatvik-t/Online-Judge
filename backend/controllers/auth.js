import dotenv from 'dotenv';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../.env' });

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with this email' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (! user) {
            return res.status(400).json({ message: 'User Not Found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (! isMatch) {
            return res.status(400).json({ message: 'Password is Incorrect' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        //Store JWT token in an HTTP-only cookie
        const cookieOptions = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.SAME_SITE
        };

        // Storing the JWT (important)
        /* Which is the best option to store JWT ? (a) Local Storage (b) Session (c) Cookie
        A JWT needs to be stored in a safe place within the user's browser.
        (a) If JWT is stored in the local storage, then it can be accessed by any script in that page. This is a bad practice as attackers may get access to the token.
        (b) If JWT is stored in the session, then any of the 3rd party scripts that are included in the page may access the token.
        (c) To keep the token secure, it needs to be stored in a httpOnly cookie, as it is a special cookie that is sent only in the HTTP requests to the server.
            Also, it is inaccessible to the javascript code running in the browser. */
        
        res.status(200).cookie('token', token, cookieOptions).json({
            message: 'User has Logged In',
            success: true,
            user: { firstName: user.firstname, lastName: user.lastname, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
        res.status(400).json({ message: 'Missing Username or Password', error });
        res.status(401).json({ message: 'Unauthorized User', error });
    }
};

export const logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'None' });
    res.status(200).json({ message: 'Logged Out Successfully' });
};

export const checkAuth = async (req, res) => {
    try {
        console.log('Authentication Check Initiated !');
        if (! req.user) {
            console.log('Requested User Not Found !');
            return res.status(401).json({ message: 'User Not Authenticated' });
        }
        const user = await User.findById(req.user).select('-password');
        console.log('Check auth controller file : ', user);
        res.json({ user: { firstName: user.firstname, lastName: user.lastname, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};