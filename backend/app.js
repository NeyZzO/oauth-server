import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import chalk from "chalk";
import { config } from "dotenv";
config();
const {APP_PORT} = process.env;
const app = express(); 

app.use(morgan("combined"));
app.use(helmet());
app.use(cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "CREATE"],
}));
app.use(bodyParser.json());


app.listen(APP_PORT, () => {
    console.log(chalk.green(`✓ Server listening on port ${APP_PORT}`));
})