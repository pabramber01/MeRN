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

export default router;
