import express from 'express';
import { authMiddleware } from '../auth/index.js';
import { userController } from './index.js';

const router = express.Router();

router.route('/').post(userController.createUser);

router
  .route('/:id')
  .get(authMiddleware.isAuthenticated, userController.getUserProfile);

router
  .route('/:id/publications')
  .get(authMiddleware.isAuthenticated, userController.getAllPublicationsByUser);

export default router;
