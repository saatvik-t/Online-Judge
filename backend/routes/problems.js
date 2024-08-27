import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getProblems, getProblem, createProblem, updateProblem, deleteProblem } from '../controllers/problem.js';

const router = express.Router();

// Route to get all the problems
router.get('/', authMiddleware, getProblems);

// Route to get a problem by its ID
router.get('/:id', authMiddleware, getProblem);

// Route to create a new problem
router.post('/', authMiddleware, createProblem);

// Route to update a problem
router.put('/:id', authMiddleware, updateProblem);

// Route to delete a problem
router.delete('/:id', authMiddleware, deleteProblem);

export { router as problemRouter };