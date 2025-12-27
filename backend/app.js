import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import chalk from "chalk";
import { config } from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectPg from "connect-pg-simple";
import session from "express-session";
config();
const { APP_PORT } = process.env;
const app = express();

// SESSION

const pgStore = connectPg(session);
const pgSession = new pgStore({
    conObject: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
    },
    tableName: "session",
});

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        name: "auth_session",
        store: pgSession,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: "/",
            // domain: "localhost",
            sameSite: "lax",
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
        },
    })
);


app.use(morgan((tokens, req, res) => {
  const format = [];
  const method = tokens.method(req, res);
  const status = tokens.status(req, res);
  if (method == "GET") {
    format.push(`${chalk.yellow("")}${chalk.bgYellow.gray(' GET ')}${chalk.yellow('')}`);
  } else if (method == "POST") {
    format.push(`${chalk.blue("")}${chalk.bgBlue.gray(' POST ')}${chalk.blue('')}`);
  } else {
    format.push(`${chalk.magenta("")}${chalk.bgMagenta.gray(` ${method} `)}${chalk.magenta('')}`);
  }

  format.push(tokens.url(req,res));
  format.push('->');
  format.push(chalk.green(status));
  format.push(tokens['remote-addr'](req,res));

  return format.join(' ');


}));

app.use(helmet());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "PUT", "CREATE"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/auth", authRoutes);

app.listen(APP_PORT, () => {
  console.log(chalk.green(`✓ Server listening on port ${APP_PORT}`));
})
