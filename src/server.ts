import express, { Request, Response } from "express";
import path from "path";
import mustache from "mustache-express";
import dotenv from "dotenv";
import routerMain from "./routes/index";
import flash from 'connect-flash';
import session from 'express-session';

dotenv.config();

const server = express();
const sessionSecret = process.env.SESSION_SECRET || process.env.SECRET_KEY;

if (!sessionSecret) {
  throw new Error("SESSION_SECRET or SECRET_KEY environment variable must be defined");
}

server.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true
}));

server.use(flash());

server.set("view engine", "mustache");
server.set("views", path.join(__dirname, "views"));
server.engine("mustache", mustache());

server.use(express.urlencoded({ extended: true }));
server.use(routerMain);

server.use(express.static(path.join(__dirname, "../public")));

server.use((req: Request, res: Response) => {
    res.status(404).send("Página não encontrada");
});

server.listen(process.env.PORT, () => {
    console.log("Servidor rodando");
});
