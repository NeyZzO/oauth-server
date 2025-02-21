import { config } from "dotenv";
config();

const {DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_DIALECT, DB_PORT} = process.env;

export default {
    development: {
        dialect: DB_DIALECT,
        username: DB_USER,
        password: DB_PASS,
        host: DB_HOST,
        database: DB_NAME,
        port: DB_PORT
    }
};