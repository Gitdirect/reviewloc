import express from 'express';
import * as AuthController from '../controllers/auth';
import * as managing from '../middlewares/managing';

const router = express.Router();

router.post('/signup', managing.blockedRoute, AuthController.signup);
router.post('/signin', managing.blockedRoute, AuthController.signin);

export default router;
