import { Request, Response } from "express";
import { Clients } from "../model/Client";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import twilio from "twilio";

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
    let { id, email, tel } = req.params;
    tel = `+55${tel}`;
    console.log(tel)

    const results = await Clients.findAll({ where: { id } });
    console.log(results);
    
    if (results.length > 0) {
        const client = results[0];
        client.status = "chamado"; 
        await client.save();
        
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS, 
            },
        });

        
        const mailOptions = {
            from: process.env.EMAIL_USER, 
            to: email,                   
            subject: 'Mesa Disponível',
            html: `Olá ${client.name}, <br> Sua mesa está pronta! Por favor, dirija-se ao local.`,
            text: `Olá ${client.name}, Sua mesa está pronta! Por favor, dirija-se ao local.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Erro ao enviar e-mail: ', error);
            } else {
                console.log('E-mail enviado: ' + info.response);
            }
            req.flash('successMessageChamado', `SMS enviado para o cliente com o número ${tel}.`);
        });
    }
    const clientTwilio = twilio(
        process.env.TWILIO_ACCOUNT_SID as string,
        process.env.TWILIO_AUTH_TOKEN as string
    );

    const sendSMS = async (to: string, message: string) => {
        try {
            const result = await clientTwilio.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: to,
            });
            console.log('SMS enviado com sucesso:', result.sid);
            return result;
        } catch (error) {
            console.error('Erro ao enviar SMS:', error);
            throw error;
        }
    };
    try {
        await sendSMS(tel, 'Sua mesa está pronta! Por favor, dirija-se ao local.');
        req.flash('successMessageChamado', `SMS enviado para o cliente com o número ${tel}.`);
    } catch (error) {
        req.flash('errorMessage', `Erro ao tentar enviar SMS para o número ${tel}.`);
    }

    let clients = await Clients.findAll({
        limit: 9
    });

    return res.render("pages/filaClientes", {
        successMessageChamado: req.flash('successMessageChamado'), 
        errorMessage: req.flash('errorMessage'),
        clients,
        titulo: "Novo Cliente",
        rota: "/",
        chegada: true,
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
