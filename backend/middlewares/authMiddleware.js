const admin = require("firebase-admin");

const verifyFirebaseToken = async (req, res, next) => {
    const idToken = req.headers.authorization;
    if (! idToken) {
        return res.status(401).send("ID Token is required");
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Error while verifying Firebase ID Token:", error);
        return res.status(401).send("ID Token is Invalid");
    }
};

module.exports = verifyFirebaseToken;