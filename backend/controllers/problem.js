import Problem from '../models/problem.js';

export const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const getProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if(! problem) {
            console.log("Problem Not Found");
            return res.status(404).send('Problem Not Found');
        }
        res.json(problem);
    } catch (error) {
        console.error('Error while Fetching the Problem : ', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const createProblem = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newProblem = new Problem({ title, description });
        const problem = await newProblem.save();
        console.log("Added a New Problem");
        res.status(201).json(problem);
    } catch (error) {
        console.error('Error while Creating the Problem : ', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const updateProblem = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const problem = await Problem.findByIdAndUpdate(id, { title, description }, { new: true });
        console.log("Updated the Problem");
        res.json(problem);
    } catch (error) {
        console.error('Error while Updating the Problem : ', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

export const deleteProblem = async (req, res) => {
    const { id } = req.params;
    try {
        await Problem.findByIdAndDelete(id);
        console.log(res.json);
        console.log("Deleted the Problem");
        res.json({ message: 'Problem deleted' });
    } catch (error) {
        console.error('Error while Deleting the Problem : ', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};