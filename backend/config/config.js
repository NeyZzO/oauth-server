import { config } from "dotenv";
config();

const {DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_DIALECT} = process.env;

export default {
    development: {
        username: DB_USER,
        password: DB_PASS,
        host: DB_HOST,
        database: DB_NAME,
        dialect: DB_DIALECT
    }
};