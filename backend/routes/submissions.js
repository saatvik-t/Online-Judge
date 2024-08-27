import express from 'express';
import { getSubmissions } from '../controllers/submission.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router()

router.get('/', authMiddleware, getSubmissions);

export { router as submissionRouter };