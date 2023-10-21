import express from 'express';
import { handleUserSignUp, handleUserLogin } from '../controllers/user.js';
const userRouter = express.Router();
userRouter.post('/', handleUserSignUp);
userRouter.post('/login', handleUserLogin);

export { userRouter }
