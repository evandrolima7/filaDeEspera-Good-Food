import { Request, Response } from "express";
import { Clients } from "../model/Client";
import { Op } from "sequelize";

export const chegada = async (req: Request, res: Response) => {

    let clients = await Clients.findAll({limit: 9})

    if(clients.length < 9){
    }

    res.render("pages/filaClientes", {
        clients,
        chegada:true,
        numberPage1: true,
        nextNumber: true,
        nextPage: 2,
        rescentes: false,
        aguardando:false,
        chamado:false,
        desistente:false
    })
}


export const recentes = async (req: Request, res: Response) => {

    let clients = await Clients.findAll({
        where: {
            quantity:{
                [Op.gt]: 0
            }
        },
        order: [
            ["id", "DESC"]
        ],
        limit:9
    })

    let recente:boolean = true;

    if(clients.length < 9){
        recente = false;
    }

    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients,
        numberPage1: true,
        nextPage: 2,
        recente,
        chegada:false,
        aguardando:false,
        chamado:false,
        desistente:false
    })
}

export const aguardando = async (req: Request, res: Response) => {

    let clients = await Clients.findAll({
        where: {
            status: "aguardando"
        },
        limit:9
    })

    let aguardando:boolean = true;

    if(clients.length < 9){
        aguardando = false;
    }

    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients, 
        numberPage1: true,
        nextPage: 2,
        recente:false,
        chegada:false,
        aguardando,
        chamado:false,
        desistente:false
    })
}

export const chamados = async (req: Request, res: Response) => {

    let clients = await Clients.findAll({
        where: {
            status: "chamado"
        },
        limit:9
    })

    let chamado:boolean = true;

    if(clients.length < 9){
        chamado = false;
    }

    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients,
        numberPage1: true,
        nextPage: 2,
        recente:false,
        chegada:false,
        aguardando: false,
        chamado,
        desistente:false
    })
}

export const desistentes = async (req: Request, res: Response) => {

    let clients = await Clients.findAll({
        where: {
            status: "desistiu"
        },
        limit: 9
    })

    let desistente:boolean = true;

    if(clients.length < 9){
        desistente = false;
    }

    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients,
        numberPage1: true,
        nextPage: 2,
        recente:false,
        chegada:false,
        aguardando:false,
        chamado:false,
        desistente
    })
}