import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cors from "cors";
import chalk from "chalk";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
config();
const { APP_PORT } = process.env;
const app = express();

app.use(morgan("combined"));
app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "PUT", "CREATE"],
  credential: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use("/auth", authRoutes);

app.listen(APP_PORT, () => {
  console.log(chalk.green(`✓ Server listening on port ${APP_PORT}`));
})
