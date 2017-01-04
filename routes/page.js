import express from 'express';

import * as pageController from '../controllers/page';
import * as managing from '../middlewares/managing';

const router = express.Router();

router.all('/pages/*', managing.blockedRoute);
router.all('/pages', managing.blockedRoute);

router.post('/pages', pageController.create);
router.get('/pages', pageController.getAll);
router.get('/pages/:login', pageController.getPagesByUserLogin);
router.put('/pages/:id', pageController.update);
router.delete('/pages/:id', pageController.deletePage);

export default router;