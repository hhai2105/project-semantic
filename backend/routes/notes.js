import express from 'express';
const router = express.Router();
import { getNotes, createNote, deleteNote, updateNote} from '../controllers/notes.js';
import auth from '../middleware/auth.js'

router.get("/", auth, getNotes);
router.post('/add', auth, createNote);
router.delete('/delete/:id', auth, deleteNote);
router.post('/update/:id', auth, updateNote);

export default router;
