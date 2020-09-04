import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const routes = Router();

routes.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
});

export default routes;
