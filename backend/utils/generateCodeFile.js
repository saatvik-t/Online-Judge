const fs = require('fs');
const path = require('path');
const {v4 : uuid} = require('uuid');

const dirCodes = path.join(__dirname, "../data/codes");

if(! fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, {recursive : true});
}

const generateCodeFile = async (format, content) => {
    const jobID = uuid();
    // const filename = String(jobID).concat(".").concat(String(format));
    const filename = `${jobID}.${format}`;
    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, content);
    return filePath;
};

module.exports = {
    generateCodeFile,
};