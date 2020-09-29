import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import UserController from '../controllers/UserController';
import UpdataUserAvatarController from '../controllers/UpdataUserAvatarController';

const userRoutes = Router();
const upload = multer(uploadConfig);

userRoutes.post('/', UserController.store);
userRoutes.patch(
  '/avatar',
  upload.single('avatar'),
  UpdataUserAvatarController.save,
);
userRoutes.put('/', UserController.update);

export default userRoutes;
