import express, {Request, Response, urlencoded} from "express";
import path from "path";
import mustache from "mustache-express";
import dotenv from "dotenv";
import routerMain from "./routes/index";

dotenv.config();

const server = express();

server.set("view engine", "mustache");
server.set("views", path.join(__dirname, "views"));
server.engine("mustache", mustache());

server.use(express.urlencoded({extended:true}));
server.use(routerMain);

server.use(express.static(path.join(__dirname, "../public")))

server.use( (req: Request, res: Response) => {
    res.status(404).send("Pagina não encontrado")
})

server.listen(process.env.PORT, () => {
    console.log("Servidor rodando")
})