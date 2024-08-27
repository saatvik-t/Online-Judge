import Submission from '../models/submission.js';

export const getSubmissions = async (req, res) => {
    try {
        const userId = req.user;
        const submissions = await Submission.find({ userId });
        res.status(200).json(submissions);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};