import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirInputs = path.join(__dirname, 'inputs');

if(! fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}

const generateInputFile = async (input) => {
    const jobId = uuid();
    const filename = `${jobId}.txt`;
    const filePath = path.join(dirInputs, filename);
    fs.writeFileSync(filePath, input);
    return filePath;
};
export default generateInputFile;