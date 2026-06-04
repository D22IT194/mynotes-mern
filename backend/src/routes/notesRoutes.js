import express from 'express';
import { getAllNotes, getNoteById, createNotes, updateNotes, deleteNotes } from '../controller/notesController.js';
import upload from '../middleware/upload.js';
import { validate } from '../middleware/validateMiddleware.js';
import { noteSchema } from '../validations/noteValidation.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getAllNotes);

router.get('/:_id', authMiddleware, getNoteById);


router.post('/', authMiddleware, upload.single("media"),validate(noteSchema), createNotes);

router.put('/:id', authMiddleware, upload.single("media"),validate(noteSchema), updateNotes);

router.delete('/:id', authMiddleware, deleteNotes);




export default router;
