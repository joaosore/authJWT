import { app } from './app';

const port = process.env.CONTAINER_PORT;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
