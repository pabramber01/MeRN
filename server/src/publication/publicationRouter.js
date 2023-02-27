import express from 'express';
import { authMiddleware } from '../auth/index.js';
import { publicationController } from './index.js';

const router = express.Router();

router
  .route('/')
  .get(
    authMiddleware.isAuthenticated,
    publicationController.getAllPublications
  );

router
  .route('/:id')
  .get(authMiddleware.isAuthenticated, publicationController.getPublication);

export default router;
