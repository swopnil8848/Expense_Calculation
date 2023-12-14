import express from 'express'
import { getME, login, protect, signup } from '../controllers/authControllers';

const router = express.Router();

router.route('/user/signup').post(signup);
router.route('/user/login').post(login);
router.route('/user/me').get(protect,getME);

export default router;