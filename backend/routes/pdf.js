import express from 'express';
const router = express.Router();
import { getPdfs, createPdf, deletePdf, updatePdf} from '../controllers/pdfs.js';

import auth from '../middleware/auth.js'

router.get('/', auth, getPdfs);
router.post('/add', createPdf);
router.delete('/delete/:id', auth, deletePdf);
router.post('/update', auth, updatePdf);

export default router;
