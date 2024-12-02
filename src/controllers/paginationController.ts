import { Request, Response } from "express";
import { Clients } from "../model/Client";
import { Op } from "sequelize";

export const pagina2 = async (req: Request, res: Response) =>{

    let clients = await Clients.findAll({
        limit:9,
        offset:9
    });

    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        numberPage2: true,
        previousPage:"",
        nextPage: 3,
        clients,
        recente:false,
        chegada: true,
        aguardando:false,
    })
}

export const pagina3 = async (req: Request, res: Response) =>{

    let clients = await Clients.findAll({
        limit:9,
        offset:18
    });

    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients,
        numberPage3: true,
        previousPage: 2,
        nextPage:3,
        recent: false,
        chegada: true,
        aguardando:false,
    })}

export const paginaRescentes2 = async (req: Request, res: Response) =>{
        let clients = await Clients.findAll({
            where: {
                quantity:{
                    [Op.gt]: 0
                }
            },
            order: [
                ["id", "DESC"]
            ],
            limit:9,
            offset:9
        })
    
        res.render("pages/filaClientes", {
            titulo: "Novo Cliente",
            rota: "/",
            clients,
            previousPage:"",
            numberPage2: true,
            nextPage: 3,
            recente:true,
            chegada:false,
            aguardando:false,
        })
}
    
export const paginaRescentes3 = async (req: Request, res: Response) =>{
    
        let clients = await Clients.findAll({
            where: {
                quantity:{
                    [Op.gt]: 0
                }
            },
            order: [
                ["id", "DESC"]
            ],
            limit:9,
            offset:18
        });

    
        res.render("pages/filaClientes", {
            titulo: "Novo Cliente",
            rota: "/",
            clients,
            previousPage: 2,
            nextPage:3,
            numberPage3: true,
            recente:true,
            chegada:false,
            aguardando:false,
})}

export const paginaAguardando2 = async (req: Request, res: Response) =>{
    let clients = await Clients.findAll({
        where: {
            status: "aguardando"
        },
        limit:9,
        offset:9
    })

    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients,
        numberPage2: true,
        previousPage:"",
        nextPage: 3,
        recente:false,
        chegada:false,
        aguardando:true
    })
}

export const paginaAguardando3 = async (req: Request, res: Response) =>{

    let clients = await Clients.findAll({
        where: {
            status: "aguardando"
        },
        limit:9,
        offset:18
    });


    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients,
        previousPage: 2,
        nextPage:3,
        numberPage3: true,
        recente:false,
        chegada:false,
        aguardando: true
})}

export const paginaChamados2 = async (req: Request, res: Response) =>{
    let clients = await Clients.findAll({
        where: {
            status: "chamado"
        },
        limit:9,
        offset:9
    })

    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients,
        previousPage:"",
        numberPage2: true,
        nextPage: 3,
        recente:false,
        chegada:false,
        aguardando:false,
        chamado:true
    })
}

export const paginaChamados3 = async (req: Request, res: Response) =>{

    let clients = await Clients.findAll({
        where: {
            status: "chamado"
        },
        limit:9,
        offset:18
    });


    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients,
        previousPage: 2,
        nextPage:3,
        numberPage3: true,
        recente:false,
        chegada:false,
        aguardando: false,
        chamado:true
})}

export const paginaDesistentes2 = async (req: Request, res: Response) =>{
    let clients = await Clients.findAll({
        where: {
            status: "desistiu"
        },
        limit:9,
        offset:9
    })

    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients,
        previousPage:"",
        nextPage: 3,
        numberPage2: true,
        recente:false,
        chegada:false,
        aguardando:false,
        chamado:false,
        desistente:true
    })
}

export const paginaDesistentes3 = async (req: Request, res: Response) =>{

    let clients = await Clients.findAll({
        where: {
            status: "desistiu"
        },
        limit:9,
        offset:18
    });


    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients,
        numberPage3: true,
        previousPage: 2,
        nextPage:3,
        recente:false,
        chegada:false,
        aguardando: false,
        chamado:false,
        desistente:true
})}