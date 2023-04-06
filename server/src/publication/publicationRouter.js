import express from 'express';
import { authMiddleware } from '../auth/index.js';
import { publicationController } from './index.js';

const router = express.Router();

router
  .route('/')
  .get(authMiddleware.isAuthenticated, publicationController.getAllPublications)
  .post(
    authMiddleware.isAuthenticated,
    publicationController.createPublication
  );

router
  .route('/:id')
  .get(authMiddleware.isAuthenticated, publicationController.getPublication)
  .patch(
    authMiddleware.isAuthenticated,
    publicationController.updatePublication
  )
  .delete(
    authMiddleware.isAuthenticated,
    publicationController.deletePublication
  );

router
  .route('/:id/comments')
  .get(
    authMiddleware.isAuthenticated,
    publicationController.getAllCommentsByPublication
  );

router
  .route('/:id/like')
  .patch(authMiddleware.isAuthenticated, publicationController.likePublication);

router
  .route('/:id/dislike')
  .patch(
    authMiddleware.isAuthenticated,
    publicationController.dislikePublication
  );

export default router;
