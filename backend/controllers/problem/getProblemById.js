const Problem = require("../../models/Problem");

const getProblemById = async (req, res) => {
    const { problemId } = req.params;
    try {
        const problem = await Problem.findOne(
            { problemId: problemId },
            "-testCases"
        );
        if (! problem) {
            return res.status(404).json({ message: "Problem Not Found" });
        }
        res.status(200).json(problem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = getProblemById;