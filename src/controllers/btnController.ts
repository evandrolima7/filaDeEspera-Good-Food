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
        req.flash('successMessageChamado', `Alterações do cliente ${client.name} foram salvas com sucesso!`);
    }

    let clients = await Clients.findAll({
        limit: 9
    });

    return res.render("pages/filaClientes", {
        successMessageChamado: req.flash('successMessageChamado'),
        clients,
        titulo: "Novo Cliente",
        rota: "/",
        chegada: true,
    });
};

export const deletar = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const results = await Clients.findAll({ where: { id } });

    if (results.length > 0) {
        const client = results[0];

        await client.destroy();
        req.flash('successMessageChamado', `Você excluiu ${client.name} da fila de espera.`);
    }

    let clients = await Clients.findAll({
        limit: 9
    });

    return res.render("pages/filaClientes", {
        successMessageChamado: req.flash('successMessageChamado'),
        clients,
        titulo: "Novo Cliente",
        rota: "/",
        chegada: true,
    });
};

export const chamarCliente = async (req: Request, res: Response) => {
    let { id, email, tel } = req.params; // Acessando os parâmetros corretamente
    tel = `+55${tel}`;
    console.log(tel)

    const results = await Clients.findAll({ where: { id } });

    if (results.length > 0) {
        const client = results[0];
        client.status = "chamado"; // Atualizando o status
        await client.save();

        // Enviando e-mail
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

    // Instância do Twilio
    const clientTwilio = twilio(
        process.env.TWILIO_ACCOUNT_SID as string,
        process.env.TWILIO_AUTH_TOKEN as string
    );

    // Função para enviar SMS
    const sendSMS = async (to: string, message: string) => {
        try {
            const result = await clientTwilio.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER, // Número Twilio
                to: to, // Número do destinatário (telefone do cliente)
            });

            console.log('SMS enviado com sucesso:', result.sid);
            return result;
        } catch (error) {
            console.error('Erro ao enviar SMS:', error);
            throw error;
        }
    };

    try {
        // Enviar SMS para o cliente
        await sendSMS("goodFood:", 'Sua mesa está pronta! Por favor, dirija-se ao local.');

        // Exibir mensagem de sucesso
        req.flash('successMessageChamado', `SMS enviado para o cliente com o número ${tel}.`);
    } catch (error) {
        // Caso ocorra erro, exibe mensagem de erro
        req.flash('errorMessage', `Erro ao tentar enviar SMS para o número ${tel}.`);
    }

    // Recuperar a lista de clientes atualizada ou outro dado que você queira
    let clients = await Clients.findAll({
        limit: 9
    });

    // Renderizar a página ou fazer o redirecionamento
    return res.render("pages/filaClientes", {
        successMessageChamado: req.flash('successMessageChamado'),
        errorMessage: req.flash('errorMessage'), // Caso haja erro no envio
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
        req.flash('successMessageChamado', `Status do cliente ${client.name} foi atualizado para "desistiu".`);
    }

    let clients = await Clients.findAll({
        limit: 9
    });

    return res.render("pages/filaClientes", {
        successMessageChamado: req.flash('successMessageChamado'),
        clients,
        titulo: "Novo Cliente",
        rota: "/",
        chegada: true,
    });
};
