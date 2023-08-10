import { createPool, createConnection } from "mysql2";
import { config } from "dotenv";
config();

const mysqlPool = createPool({
    host: process.env.MYSQL_HOST,
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: Number(process.env.MYSQL_DOCKER_PORT),
    database: process.env.MYSQL_DATABASE
});

export default mysqlPool;