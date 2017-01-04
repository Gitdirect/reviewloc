import express from 'express';

import * as blockedRouteController from '../controllers/blockedRoute';
// import * as directorate from '../controllers/directorate';

const router = express.Router();

router.post('/blocked', blockedRouteController.create);
router.get('/blocked', blockedRouteController.getAll);
router.put('/blocked/:id', blockedRouteController.update)
router.delete('/blocked/:id', blockedRouteController.deleteBlock);

export default router;