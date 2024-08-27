import generateFile from "../helpers/generateFile.js";
import generateInputFile from "../helpers/generateInputFile.js";
import executeJava from "../helpers/executeJava.js";
import executePy from "../helpers/executePy.js";
import executeCpp from "../helpers/executeCpp.js";


const run = async (req, res) => {
    const { language = 'java', code, input } = req.body;

    if(! code || typeof code !== 'string' || code.trim() === '') {
        return res.json({ success: false, output: "Code is Missing" });
    }

    if(input === undefined || input === '' || typeof input !== 'string') {
        return res.json({ success: false, output: "Input is Missing" });
    }

    try {
        const filePath = await generateFile(language, code);
        const inputFilePath = await generateInputFile(input);
        let compileOutput;
        switch (language) {
            case 'java':
                compileOutput = await executeJava(filePath, inputFilePath);
                break;
            case 'py':
                compileOutput = await executePy(filePath, inputFilePath);
                break;
            case 'cpp':
                compileOutput = await executeCpp(filePath, inputFilePath);
                break;
        }
        const output = compileOutput.output;
        res.json({ filePath, inputFilePath, output });
    } catch (error) {
        console.log(error);
        res.json({ output: error.output });
    }
};

export default run;