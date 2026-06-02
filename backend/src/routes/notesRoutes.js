import express from 'express';
import { getAllNotes, getNoteById, createNotes, updateNotes, deleteNotes } from '../controller/notesController.js';

const router = express.Router();

router.get('/', getAllNotes);

router.get('/:_id', getNoteById);


router.post('/', createNotes);

router.put('/:id', updateNotes);

router.delete('/:id', deleteNotes);


export default router;
