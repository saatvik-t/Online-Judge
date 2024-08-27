import { exec } from 'child_process';

const executePy = async (filepath, inputFilePath) => {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        exec(`python "${filepath}" < "${inputFilePath}"`,
            (error, stdout, stderr) => {
                const endTime = Date.now();
                const runtime = endTime - startTime;
                let feedback = 'Compiled Successfully';
                if (error) {
                    const cleanedError = error.message.replace(/(File\s")?(.*?\.(py|cpp|java|txt))"?/g, '$1<hidden path>.$3"');
                    const cleanedStderr = stderr.replace(/(File\s")?(.*?\.(py|cpp|java|txt))"?/g, '$1<hidden path>.$3"');

                    const em = `${error}\n\n${stderr}`;
                    const cleanedem = `${cleanedError}\n\n${cleanedStderr}`;

                    feedback = 'Compilation Error';
                    reject({ output: cleanedem, runtime, feedback });
                }
                if (stderr) {
                    const cleanedStderr = stderr.replace(/(File\s")?(.*?\.(py|cpp|java|txt))"?/g, '$1<hidden path>.$3"');
                    feedback = 'Runtime Error';
                    reject({ output: cleanedStderr, runtime, feedback });
                }
                resolve({ output: stdout, runtime, feedback });
            }
        )
    })
};

export default executePy;