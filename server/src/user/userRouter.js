import express from 'express';
import { authMiddleware } from '../auth/index.js';
import { userController } from './index.js';

const router = express.Router();

router.route('/').post(userController.createUser);

router
  .route('/own')
  .get(authMiddleware.isAuthenticated, userController.getUserData)
  .patch(authMiddleware.isAuthenticated, userController.updateUser)
  .delete(authMiddleware.isAuthenticated, userController.deleteUser);

router
  .route('/own/change-password')
  .patch(authMiddleware.isAuthenticated, userController.updatePassword);

router
  .route('/:id')
  .get(authMiddleware.isAuthenticated, userController.getUserProfile);

router
  .route('/:id/publications')
  .get(authMiddleware.isAuthenticated, userController.getAllPublicationsByUser);

export default router;
