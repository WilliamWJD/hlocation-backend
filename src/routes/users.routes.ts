import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';

import UserController from '../controllers/UserController';

const userRoutes = Router();
const upload = multer(uploadConfig);

userRoutes.post('/', UserController.store);
userRoutes.patch('/avatar', upload.single('avatar'), UserController.setAvatar);

export default userRoutes;
