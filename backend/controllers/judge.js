import User from '../models/user.js';
import Problem from '../models/problem.js';
import Submission from '../models/submission.js';
import generateFile from '../helpers/generateFile.js';
import processTestCases from '../helpers/processTestCases.js';

const judge = async (req, res) => {
    const { language = 'java', code, problemId } = req.body;
    const userId = req.user;

    console.log("Inside controllers/judge.js");

    if(! code || typeof code !== 'string' || code.trim() === '') {
        return res.json({ verdict: 'Verdict not availabe - Code Missing', results: [] });
    }

    try {
        const codeFilePath = await generateFile(language, code);
        console.log("Generated the Code file : ", codeFilePath);
        const { success, results } = await processTestCases(language, codeFilePath, problemId);
        console.log("Processed the Test Cases");
        console.log("Success : ", success);
        console.log("Results : ", results);
        const user = await User.findById(userId);

        const problem = await Problem.findById(problemId);

        if(! user || ! problem) {
            console.log("User or Testcase not found");
            return res.status(500).json({ success: false, results: ["User or Problem not found"] });
        }
        const problemTitle = problem.title;

        const verdict = success ? 'Accepted' : results[results.length - 1].description;

        const totalRuntime = results.reduce((sum, result) => sum + result.runtime, 0);

        const averageRuntime = totalRuntime / results.length;

        let newLanguage;
        switch (language) {
            case 'java':
                newLanguage = 'Java'
                break
            case 'py':
                newLanguage = 'Python'
                break
            case 'cpp':
                newLanguage = 'C++'
                break
        }

        const newSubmission = new Submission({
            userId,
            problemTitle,
            verdict,
            runtime: averageRuntime,
            language: newLanguage
        });

        await newSubmission.save();

        res.json({ codeFilePath, verdict, results });
    } catch (error) {
        res.status(500).json(error);
    }
};

export default judge;