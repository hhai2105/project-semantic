import express from 'express';
const router = express.Router();
import { getBins, createBin, deleteBin, updateBin} from '../controllers/bins.js';

import auth from '../middleware/auth.js'

router.get('/', auth, getBins);
router.post('/add',auth, createBin);
router.delete('/delete/:id', auth, deleteBin);
router.post('/update', auth, updateBin);

export default router;
