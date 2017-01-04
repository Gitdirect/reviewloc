import express from 'express';

import * as categorieController from '../controllers/category';
import * as managing from '../middlewares/managing';

const router = express.Router();

router.get('/category', managing.blockedRoute, categorieController.getAll);

export default router;