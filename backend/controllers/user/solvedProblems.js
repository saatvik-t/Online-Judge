const User = require("../../models/User");

const getSolvedProblems = async (req, res) => {
    const { userName } = req.user;
    try {
        const user = await User.findOne({ userName }).populate("solvedProblems");
        if (! user) {
            return res.status(404).send("User not found with the given User Name");
        }
        res.status(200).json(user.solvedProblems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getSolvedProblems;