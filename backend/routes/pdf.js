import express from 'express';
const router = express.Router();
import { getPdfs, createPdf, deletePdf, getPdfData} from '../controllers/pdfs.js';

import auth from '../middleware/auth.js'

router.get('/', auth, getPdfs);
router.post('/get', auth, getPdfData);
router.post('/add', auth, createPdf);
router.delete('/delete/:id', auth, deletePdf);

export default router;
