import express from 'express'
import { getUserData } from '../controllers/userController.js';
import userauth from '../middleware/userauth.js';

const userRouter = express.Router();

userRouter.get("/data",userauth,getUserData);

export default userRouter;