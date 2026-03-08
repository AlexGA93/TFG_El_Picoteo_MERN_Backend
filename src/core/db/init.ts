import { config } from "dotenv";
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";

config();

export const ensureDatabaseAndTables = async (): Promise<void> => {
  const host = process.env.MYSQL_HOST;
  const password = process.env.MYSQL_ROOT_PASSWORD;
  const port = Number(process.env.MYSQL_DOCKER_PORT);
  const database = process.env.MYSQL_DATABASE;

  if (!host || !password || !port || !database) {
    throw new Error(
      "Missing MYSQL_* env vars (MYSQL_HOST, MYSQL_ROOT_PASSWORD, MYSQL_DOCKER_PORT, MYSQL_DATABASE)."
    );
  }

  const connection = await mysql.createConnection({
    host,
    user: "root",
    password,
    port,
    multipleStatements: true,
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await connection.query(`USE \`${database}\``);

    const schemaSql = fs.readFileSync(
      path.join(__dirname, "Tables.sql"),
      "utf8"
    );

    if (schemaSql.trim().length > 0) {
      await connection.query(schemaSql);
    }
  } finally {
    await connection.end();
  }
};
