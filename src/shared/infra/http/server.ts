import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import uploadConfig from '@config/upload';
import cors from 'cors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(`${uploadConfig.directory}/upload`));
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
