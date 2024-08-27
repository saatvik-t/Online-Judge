import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const outputPath = path.join(__dirname, 'outputs');

if(! fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (filepath, inputFilePath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const output_filename = `${jobId}.out`;
    const outPath = path.join(outputPath, output_filename);

    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        exec(`g++ "${filepath}" -o "${outPath}" && cd "${outputPath}" && "./${output_filename}" < "${inputFilePath}"`,
            (error, stdout, stderr) => {
                const endTime = Date.now();
                const runtime = endTime - startTime;
                let feedback = 'Compiled Successfully';

                if(error) {
                    const cleanedError = error.message.replace(/(File\s")?(.*?\.(py|cpp|java|txt))"?/g, '$1<hidden path>.$3"');
                    const cleanedStderr = stderr.replace(/(File\s")?(.*?\.(py|cpp|java|txt))"?/g, '$1<hidden path>.$3"');

                    const em = `${error}\n\n${stderr}`;
                    const cleanedem = `${cleanedError}\n\n${cleanedStderr}`;
                    feedback = 'Compilation Error';
                    reject({ output: cleanedem, runtime, feedback });
                }
                if(stderr) {
                    const cleanedStderr = stderr.replace(/(File\s")?(.*?\.(py|cpp|java|txt))"?/g, '$1<hidden path>.$3"');
                    feedback = 'Runtime Error';
                    reject({ output: cleanedStderr, runtime, feedback });
                }
                resolve({ output: stdout, runtime, feedback });
            }
        )
    })
};

export default executeCpp;