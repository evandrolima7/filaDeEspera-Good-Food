import { Request, Response } from "express";
import { format } from 'date-fns'; 
import { toZonedTime } from 'date-fns-tz';

export const home = async (req: Request, res: Response) => {
    const data = new Date();
    

    const timeZone: string = "America/Sao_Paulo"; 

    const localDate: Date = toZonedTime(data, timeZone); 


    const dataAtual: string = format(localDate, 'dd/MM/yyyy'); 

    res.render("pages/home", {
        dataAtual,
        titulo: "Fila De Espera",
        rota: "/fila-de-espera"
    });
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