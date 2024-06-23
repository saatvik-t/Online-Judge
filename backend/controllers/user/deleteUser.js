const User = require("../../models/User");

const deleteUser = async (req, res) => {
    const { userName } = req.user;
    try {
        const result = await User.deleteOne({ userName });
        if (result.deletedCount === 0) {
            return res.status(404).send("User not found with the given User Name");
        }
        res.status(200).send("User Deletion Successful");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = deleteUser;