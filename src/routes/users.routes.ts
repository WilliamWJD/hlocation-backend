import { Router } from 'express';

const routes = Router();

routes.post('/', (req, res) => {
  const { name, email, password } = req.body;
  return res.json({ name, email, password });
});

export default routes;
