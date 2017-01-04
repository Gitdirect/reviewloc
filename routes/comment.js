import express from 'express';

import * as commentController from '../controllers/comment';
import * as managing from '../middlewares/managing';

const router = express.Router();

router.all('/comments/*', managing.blockedRoute);
router.all('/comments', managing.blockedRoute);


router.get('/comments/', commentController.getAll);
router.post('/comments/:id', commentController.create);
router.put('/comments/:id', commentController.update);
router.delete('/comments/:id', commentController.deleteCom);

export default router;