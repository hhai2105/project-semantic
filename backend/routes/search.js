import express from 'express';
const router = express.Router();
import {search} from '../controllers/search.js';

import auth from '../middleware/auth.js'

router.post('/', auth, search);

export default router;
