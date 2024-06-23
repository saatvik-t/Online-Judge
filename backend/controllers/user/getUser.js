const User = require("../../models/User");

const getUser = async (req, res) => {
    const { userName } = req.user;
    try {
        const user = await User.findOne({ userName });
        if (! user) {
            return res.status(404).send("User not found with the given User Name");
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getUser;