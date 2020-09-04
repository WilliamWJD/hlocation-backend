import express from 'express';

const app = express();

const port = 333;

app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});
