const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Access Denied! No Token Provided!");
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send("Invalid Token");
    }
};

module.exports = verifyToken;
