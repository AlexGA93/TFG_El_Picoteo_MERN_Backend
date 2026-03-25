import app from "./app";
import { ensureDatabaseAndTables } from "./core/db/init";
import { mkdir } from "fs/promises";
import path from "path";

const PORT: string | number = process.env.NODE_DOCKER_PORT! || 5000;

const startServer = async (): Promise<void> => {
  try {

    const imagesDir = path.join(process.cwd(), "public", "images");

    await mkdir(imagesDir, { recursive: true });

    await ensureDatabaseAndTables();
    app.listen(PORT, () =>
      console.log(`Servidor escuchando en el puerto: ${PORT}`)
    );
  } catch (error) {
    console.error("Error inicializando la base de datos:", error);
    process.exit(1);
  }
};

startServer();
