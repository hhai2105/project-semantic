import express from 'express';
const router = express.Router();
import { getWorkspaces, createWorkspace, deleteWorkspace, updateWorkspace} from '../controllers/workspaces.js';

import auth from '../middleware/auth.js'

router.get('/', auth, getWorkspaces);
router.post('/add',auth, createWorkspace);
router.delete('/delete/:id', auth, deleteWorkspace);
router.post('/update', auth, updateWorkspace);

export default router;
