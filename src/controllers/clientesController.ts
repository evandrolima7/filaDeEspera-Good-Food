import { Request, Response } from "express";
import { Clients } from "../model/Client";

export const filaClientesGet = async (req: Request, res: Response) =>{

    let clients = await Clients.findAll({
        limit: 9
    });


    res.render("pages/filaClientes", {
        titulo: "Novo Cliente",
        rota: "/",
        clients,
        chegada:true,
        numberPage1: true,
        nextPage:2,
        recente:false,
        aguardando:false,
        chamado:false,
        desistente:false
    })
}


export const filaClientes = async (req: Request, res: Response) => {
    try {
        let { name, 
            phone: tel, 
            peopleCount: quantity, 
            email, arrivalDate: date,
            arrivalTime: time, observations } 
            = req.body;

        let clientsInsert = Clients.build({
            name,
            tel,
            quantity,
            email,
            observations,
            date,
            time,
            status: "aguardando"
        });

        await clientsInsert.save();

        let clients = await Clients.findAll({
            limit: 9
        });

        let successMessage = true;

        res.render("pages/filaClientes", {
            titulo: "Novo Cliente",
            rota: "/",
            clients,
            chegada:true,
            recente: false,
            aguardando:false,
            chamado:false,
            desistente:false,
            successMessage,
            action: "salvo"
        });
    } catch (error) {
        console.error("Erro ao salvar cliente:", error);
        res.status(500).send("Erro ao cadastrar cliente. Tente novamente mais tarde.");
    }
};

