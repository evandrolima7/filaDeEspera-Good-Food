
# Fila de Espera

## Descrição

O Fila de Espera é uma aplicação web construída com Node.js, Express, e Sequelize. Este sistema permite o gerenciamento de uma fila de espera para um serviço, oferecendo funcionalidades como adicionar pessoas à fila, gerenciar os status da fila (como "Aguardando", "Chamados", etc.), e fazer buscas por nome. A aplicação também utiliza Mustache para renderização de templates e MySQL para persistência de dados.

## Funcionalidades

### Adição de pessoas à fila de espera: Registre as pessoas que estão aguardando para serem atendidas.
Gerenciamento de status: Acompanhe as pessoas na fila com diferentes status (Aguardando, Chamados, Desistentes, etc.).

### Busca por nome: Permita a pesquisa rápida de pessoas dentro da fila.
Envio de notificações: Utilize o Nodemailer para enviar notificações por e-mail.

## Tecnologias Utilizadas

Node.js: Ambiente de execução JavaScript do lado do servidor.
Express: Framework web para Node.js.
Sequelize: ORM (Object-Relational Mapping) para interagir com o banco de dados MySQL.
MySQL: Sistema de gerenciamento de banco de dados relacional.
Mustache: Motor de templates para renderização de HTML.
Nodemailer: Para envio de e-mails automáticos.
dotenv: Para gerenciamento de variáveis de ambiente.

## Pré-Requisitos

Antes de iniciar, é necessário ter as seguintes ferramentas instaladas:

Node.js (versão 16 ou superior)
MySQL ou MariaDB


## Como Rodar o Projeto

1. Clonar o Repositório
Clone o repositório para o seu ambiente local:

bash
Copiar código
git clone https://github.com/evandrolima7/Fila-de-espera.git
cd fila-de-espera
2. Instalar Dependências
Execute o seguinte comando para instalar as dependências do projeto:

bash
Copiar código
npm install
Isso instalará todas as dependências listadas no arquivo package.json, incluindo as dependências de produção e desenvolvimento.

3. Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias. Um exemplo de configuração:

bash
Copiar código
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua-senha
DB_NAME=fila_de_espera

EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha

4. Configurar o Banco de Dados
O banco de dados MySQL ou MariaDB precisa estar instalado e em execução. Crie o banco de dados utilizando o seguinte comando SQL:

sql
Copiar código
CREATE DATABASE fila_de_espera;

5. Rodar o Servidor de Desenvolvimento
Inicie o servidor de desenvolvimento com o comando:

bash
Copiar código
npm run start-dev
Isso iniciará o servidor utilizando o nodemon, que irá monitorar alterações no código e reiniciar automaticamente. O servidor estará disponível em http://localhost:3000.

## Scripts
start-dev: Inicia o servidor de desenvolvimento com o nodemon, que monitora alterações nos arquivos.
test: Exibe um erro fictício de "teste não especificado" (não há testes implementados no momento).

## Como Contribuir

Se você deseja contribuir com o projeto, siga estas etapas:

Faça um fork deste repositório.
Crie uma nova branch (git checkout -b minha-feature).
Realize as modificações necessárias e faça commit (git commit -am 'Adicionando minha feature').
Envie a branch para o repositório remoto (git push origin minha-feature).
Abra um Pull Request.
Licença
Este projeto está licenciado sob a Licença ISC.