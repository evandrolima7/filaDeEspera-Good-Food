import express, { Request, Response } from "express";
import path from "path";
import mustache from "mustache-express";
import dotenv from "dotenv";
import routerMain from "./routes/index";
import flash from 'connect-flash';
import session from 'express-session';

const server = express();

server.use(session({
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: true
}));
server.use(flash());

dotenv.config();

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
