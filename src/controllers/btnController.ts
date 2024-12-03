import { Request, Response } from "express";
import { Clients } from "../model/Client";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

export const editar = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const { name, phone, email, peopleCount, observations } = req.body; 
    
    const results = await Clients.findAll({ where: { id } });

    if (results.length > 0) {
        const client = results[0];
        client.name = name;
        client.tel = phone;
        client.email = email;
        client.quantity = peopleCount;
        client.observations = observations;

        await client.save();
    }

    return res.redirect("/fila-de-espera");
};

export const deletar = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const results = await Clients.findAll({ where: { id } });

    if (results.length > 0) {
        const client = results[0];

        await client.destroy();
    }
    return res.redirect("/fila-de-espera");
};

export const chamarCliente = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    let email: string = req.params.email;

    const results = await Clients.findAll({ where: { id } });

    if (results.length > 0) {
        const client = results[0];
        client.status = "chamado"; 
        await client.save();

        // Envio do e-mail
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Status Atualizado',
            html: `Olá ${client.name}, seu status foi alterado para <strong>'chamado'</strong>.`,
            text: `Olá ${client.name}, seu status foi alterado para 'chamado'.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Erro ao enviar e-mail: ', error);
            } else {
                console.log('E-mail enviado: ' + info.response);
            }
        });

        // Definindo o flash message
        req.flash('successMessageChamado', `Status do cliente ${client.name} foi atualizado para "chamado".`);
    }

    let clients = await Clients.findAll({
        limit: 9
    });

    return res.render("pages/filaClientes", {
        successMessageChamado: req.flash('successMessageChamado'), 
        clients
    });
};


export const clienteDesistiu = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const results = await Clients.findAll({ where: { id } });

    if (results.length > 0) {
        const client = results[0];
        client.status = "desistiu";
        await client.save();
    }

    return res.redirect("/fila-de-espera");
};
