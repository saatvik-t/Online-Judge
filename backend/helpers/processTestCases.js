import TestCase from '../models/testcase.js';
import generateInputFile from './generateInputFile.js';
import executeJava from './executeJava.js';
import executePy from './executePy.js';
import executeCpp from './executeCpp.js';


const processTestCases = async (language, codeFilePath, problemId) => {
    console.log("Inside helpers/processTestCases.js");
    const testCases = await TestCase.find({ 'problemId': problemId }).sort({ title: 1 });
    console.log("Testcases : ", testCases);
    let results = [];
    if(! testCases || testCases.length === 0) {
        return "Unable to provide a Verdict - No Test Case Found";
    }

    for (const [index, testcase] of testCases.entries()) {
        const { title, input, expectedOutput } = testcase;
        console.log(title, " ", input, " ", expectedOutput);
        let compileResult;
        try {
            const inputFilePath = await generateInputFile(input);
            console.log("Input File Path : ", inputFilePath);
            switch(language) {
                case 'java':
                    compileResult = await executeJava(codeFilePath, inputFilePath);
                    break;
                case 'py':
                    compileResult = await executePy(codeFilePath, inputFilePath);
                    break;
                case 'cpp':
                    compileResult = await executeCpp(codeFilePath, inputFilePath);
                    break;
            }
            console.log('Result of Compilation : ', compileResult);
            const isCorrect = compileResult.output.trim() === expectedOutput.trim();

            let message = '';

            if(compileResult.feedback === 'Compilation Error' && ! isCorrect) {
                message = compileResult.feedback;
            }
            else if(compileResult.feedback === 'Runtime Error' && ! isCorrect) {
                message = compileResult.feedback;
            } 
            else if(compileResult.feedback === 'Compiled Successfully' && ! isCorrect) {
                message = `Failed Test Case ${index + 1}`;
            } 
            else {
                message = 'Accepted';
            }

            results.push({
                title,
                input,
                expectedOutput,
                userOutput: compileResult.output,
                runtime: compileResult.runtime,
                description: message,
                isCorrect
            })

            if(! isCorrect) {
                break;
            }
        } 
        catch (error) {
            results.push({
                title,
                input,
                expectedOutput,
                userOutput: error.message || error.output,
                runtime: error.runtime || 0,
                description: error.feedback || 'There is an Error in your Code',
                isCorrect: false
            })
            break;
        }
    }

    const success = results.every(result => result.isCorrect);
    return { success, results };
}

export default processTestCases;