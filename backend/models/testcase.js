import mongoose from 'mongoose';

const TestCaseSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    input: {
        type: String,
        required: true
    },
    expectedOutput: {
        type: String,
        required: true
    }
});

const TestCase = mongoose.model('TestCase', TestCaseSchema);
export default TestCase;