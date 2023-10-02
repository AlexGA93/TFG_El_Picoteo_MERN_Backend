import app from "./app";

const PORT: string | number = process.env.NODE_DOCKER_PORT! || 5000;

app.listen(PORT, () =>
  console.log(`Servidor escuchando en el puerto: ${PORT}`)
);
