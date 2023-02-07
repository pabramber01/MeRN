import express from 'express';
import { authController } from './index.js';

const router = express.Router();

router.route('/login').post(authController.loginUser);

router.route('/logout').get(authController.logoutUser);

export default router;
