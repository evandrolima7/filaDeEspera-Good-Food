import { Request, Response } from "express";
import { Clients } from "../model/Client";
import { Op } from "sequelize";

export const pesquisar = async (req: Request, res: Response) => {
    let name = req.body.search; 

    let clients = await Clients.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        }
    })


    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients
    });
}