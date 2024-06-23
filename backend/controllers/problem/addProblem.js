const Problem = require("../../models/Problem");
const slugify = require("slugify");

const addProblem = async (req, res) => {
    const {
        problemTitle,
        problemDescription,
        inputDescription,
        outputDescription,
        sampleInputs,
        sampleOutputs,
        difficultyLevel,
        tags,
        testCases,
    } = req.body;
    try {
        const problemId = slugify(title, { lower: true, strict: true });

        const newProblem = new Problem({
            problemTitle,
            problemId,
            problemDescription,
            inputDescription,
            outputDescription,
            sampleInputs,
            sampleOutputs,
            difficultyLevel,
            tags,
            testCases,
        });
        const savedProblem = await newProblem.save();
        res.status(201).json(savedProblem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = addProblem;