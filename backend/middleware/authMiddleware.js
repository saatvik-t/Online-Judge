import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({ path: '../.env' });

export const authMiddleware = (req, res, next) => {
    console.log('Cookies :', req.cookies);
    const token = req.cookies.token;
    if (! token) {
        return res.status(401).json({ message: 'No Token, Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        console.log("In auth middleware file : ", req.user);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is Invalid' });
    }
}