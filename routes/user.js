import express from 'express';

import * as userController from '../controllers/user';
import * as managing from '../middlewares/managing';

const router = express.Router();

router.get('/current-user', managing.blockedRoute, userController.getCurrentUser);

export default router;