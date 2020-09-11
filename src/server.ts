import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import uploadConfig from './config/upload';

import routes from './routes';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

const port = 3333;

app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});
