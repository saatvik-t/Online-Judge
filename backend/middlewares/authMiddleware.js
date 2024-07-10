// const admin = require("firebase-admin");

// const verifyFirebaseToken = async (req, res, next) => {
//     const idToken = req.headers.authorization;
//     if (! idToken) {
//         return res.status(401).send("ID Token is required");
//     }
//     try {
//         const decodedToken = await admin.auth().verifyIdToken(idToken);
//         req.user = decodedToken;
//         next();
//     } catch (error) {
//         console.error("Error while verifying Firebase ID Token:", error);
//         return res.status(401).send("ID Token is Invalid");
//     }
// };

// module.exports = verifyFirebaseToken;

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
