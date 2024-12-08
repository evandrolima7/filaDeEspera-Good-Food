import { Request, Response } from "express";



export const home = async (req: Request, res: Response) => {

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = String(data.getFullYear());

    const dataAtual = `${dia}/${mes}/${ano}`;

    res.render("pages/home", {
        dataAtual,
        titulo: "Fila De Espera",
        rota: "/fila-de-espera"
    })
}

export const timeAtual = (req: Request, res: Response) => {
    const time = new Date();
    const options: object = { 
        timeZone: 'America/Sao_Paulo', 
        hour: '2-digit', 
        minute: '2-digit' 
    };

    const horarioAtual = time.toLocaleString('pt-BR', options);

    res.json({ horarioAtual });
};