const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema(
    {
        problemTitle: {
            type: String,
            required: true,
            unique: true,
        },
        problemId: {
            type: String,
            required: true,
            unique: true,
        },
        problemDescription: {
            type: String,
            required: true,
        },
        inputDescription: {
            type: String,
            required: true,
        },
        outputDescription: {
            type: String,
            required: true,
        },
        sampleInputs: [
            {
                type: String,
                required: true,
            },
        ],
        sampleOutputs: [
            {
                type: String,
                required: true,
            },
        ],
        difficultyLevel: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },
        tags: [
            {
                type: String,
            },
        ],
        testCases: [
            {
                input: {
                    type: String,
                    required: true,
                },
                output: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;