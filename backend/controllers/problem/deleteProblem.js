const Problem = require("../../models/Problem");
const User = require("../../models/User");

const deleteProblem = async (req, res) => {
    const { problemId } = req.params;
    try {
        const problem = await Problem.findOneAndDelete({ problemId });
        if (problem) {
            await User.updateMany(
            { solvedProblems: problem._id },
            { $pull: { solvedProblems: problem._id } }
        );
        res.status(200).json({ message: "Problem Deletion Successf" });
    } else {
        res.status(404).json({ message: "Problem Not Found" });
    }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = deleteProblem;