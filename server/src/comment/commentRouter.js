import express from 'express';
import { authMiddleware } from '../auth/index.js';
import { commentController } from './index.js';

const router = express.Router();

router
  .route('/')
  .post(authMiddleware.isAuthenticated, commentController.createComment);

router
  .route('/:id')
  .patch(authMiddleware.isAuthenticated, commentController.updateComment)
  .delete(authMiddleware.isAuthenticated, commentController.deleteComment);

export default router;
