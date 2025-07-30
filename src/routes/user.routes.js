 import { Router } from 'express';
const router = Router();

import { registerUser, loginUser,logout } from '../controller/user.controller.js';

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout);

export default router;
