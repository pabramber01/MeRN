import express from 'express';
import { userController } from './index.js';

const router = express.Router();

router.route('/').post(userController.createUser);

export default router;
