import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    problemTitle: {
        type: String,
        ref: 'Problem',
        required: true,
    },
    verdict: {
        type: String,
        required: true
    },
    runtime: {
        type: Number,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    submissionTime: { type: Date, default: Date.now },
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;