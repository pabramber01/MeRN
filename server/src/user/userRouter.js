import express from 'express';
import { authMiddleware } from '../auth/index.js';
import { userController } from './index.js';

const router = express.Router();

router
  .route('/')
  .post(userController.createUser)
  .get(
    authMiddleware.isAuthenticated,
    authMiddleware.hasPermission('admin'),
    userController.getAllUsers
  );

router
  .route('/own')
  .get(authMiddleware.isAuthenticated, userController.getUserData)
  .patch(authMiddleware.isAuthenticated, userController.updateUser)
  .delete(authMiddleware.isAuthenticated, userController.deleteUser);

router
  .route('/own/change-password')
  .patch(authMiddleware.isAuthenticated, userController.updatePassword);

router
  .route('/own/follows')
  .get(authMiddleware.isAuthenticated, userController.getAllFollows);

router
  .route('/:id')
  .get(authMiddleware.isAuthenticated, userController.getUserProfile);

router
  .route('/:id/publications')
  .get(authMiddleware.isAuthenticated, userController.getAllPublicationsByUser);

router
  .route('/:id/follow')
  .patch(authMiddleware.isAuthenticated, userController.followUser);

router
  .route('/:id/unfollow')
  .patch(authMiddleware.isAuthenticated, userController.unfollowUser);

router
  .route('/:id/ban')
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.hasPermission('admin'),
    userController.banUser
  );

router
  .route('/:id/unban')
  .patch(
    authMiddleware.isAuthenticated,
    authMiddleware.hasPermission('admin'),
    userController.unbanUser
  );

export default router;
