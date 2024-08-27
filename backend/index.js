import express from 'express';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { judgeRouter } from './routes/judge.js';
import { problemRouter } from './routes/problems.js';
import { runRouter } from './routes/run.js';
import { submissionRouter } from './routes/submissions.js';
import DBConnection from './database/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const ORIGIN = process.env.ORIGIN;

const corsOptions = {
    origin: ORIGIN || 'http://localhost:5173',
    credentials: true,
}

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(cors(corsOptions))

app.use('/auth', authRouter);
app.use('/judge', judgeRouter);
app.use('/problems', problemRouter);
app.use('/run', runRouter);
app.use('/submissions', submissionRouter);

app.get('/', (req, res) => {
    res.send('Hello World !')
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
});

DBConnection().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on Port ${port} !`);
    });
}).catch((error) => {
    console.error('Failed to Connect to the Database : ', error);
});