# Fila de Espera - Documentação

### Este projeto é uma aplicação web construída com Node.js, Express e TypeScript para gerenciar uma lista de espera de clientes. Ele permite que administradores adicionem, editem, excluam e chamem clientes para suas mesas. Além disso, oferece recursos como notificações por e-mail e SMS para os clientes.

## Configuração do Projeto

### 1. Instalação

### Para começar, clone o repositório e execute os seguintes comandos:

#### bash
#### Copiar código
#### npm install
#### Isso irá instalar todas as dependências definidas no arquivo package.json.

### 2. Variáveis de Ambiente

#### Crie um arquivo .env no diretório raiz e defina as seguintes variáveis:

##### bash
##### Copiar código
##### PORT=numero_da_sua_porta
##### SECRET_KEY=sua_chave_de_segredo_para_sessao
##### EMAIL_USER=seu_email
##### EMAIL_PASS=sua_senha_email
##### TWILIO_ACCOUNT_SID=sua_conta_twilio_sid
##### TWILIO_AUTH_TOKEN=sua_chave_twilio_auth_token
##### TWILIO_PHONE_NUMBER=seu_numero_twilio

Essas variáveis são usadas para configurar os serviços de e-mail e SMS.

### 3. Iniciar o Servidor de Desenvolvimento
#### Use o seguinte script para rodar o servidor de desenvolvimento com recarregamento automático:

##### bash
##### Copiar código
##### npm run start-dev
##### Isso usa nodemon para monitorar alterações no arquivo src/server.ts.

## 📂 Estrutura do Projeto

### O projeto segue uma estrutura padrão para uma aplicação baseada em Express.

#### src/: Contém todos os arquivos fonte em TypeScript.
#### controllers/: Contém a lógica para o tratamento das rotas.
#### routes/: Define todas as rotas da aplicação.
#### views/: Contém os templates Mustache para renderização das views.
#### model/: Contém os modelos Sequelize para interação com o banco de dados.
#### public/: Arquivos estáticos como CSS e imagens.

## 🚀 Funcionalidades Principais

### 1. Rotas de Home

#### GET /: Exibe a página inicial.
#### GET /horario-atual: Exibe a hora atual.

### 2. Rotas de Clientes (Fila de Espera)

#### GET /fila-de-espera: Exibe a lista de espera atual.
#### POST /fila-de-espera: Adiciona um novo cliente à fila de espera.

### 3. Rotas de Gerenciamento de Clientes

#### POST /fila-de-espera/:id/:name/editar: Edita os detalhes de um cliente na fila de espera.
#### GET /fila-de-espera/:id/deletar: Exclui um cliente da fila de espera.
#### GET /fila-de-espera/:id/:email/:tel/chamando-cliente: Marca um cliente como chamado e envia uma notificação por e-mail e SMS.
#### GET /fila-de-espera/:id/cliente-desistiu: Marca um cliente como desistente da fila.

### 4. Rotas de Status de Clientes
#### GET /fila-de-espera/aguardando: Exibe os clientes que estão aguardando pela mesa.
#### GET /fila-de-espera/chamados: Exibe os clientes que foram chamados.
#### GET /fila-de-espera/desistentes: Exibe os clientes que desistiram da fila.

### 5. Rota de Pesquisa
#### POST /fila-de-espera/pesquisar: Pesquisa um cliente na fila de espera.

### 6. Rotas de Paginação

#### O projeto oferece suporte à paginação para facilitar a navegação pela lista de espera. As seguintes rotas gerenciam a paginação:

##### GET /fila-de-espera2, GET /fila-de-espera3
##### GET /fila-de-espera/recentes2, GET /fila-de-espera/recentes3
##### GET /fila-de-espera/aguardando2, GET /fila-de-espera/aguardando3
##### GET /fila-de-espera/chamados2, GET /fila-de-espera/chamados3
##### GET /fila-de-espera/desistentes2, GET /fila-de-espera/desistentes3

### 7. Notificações

#### Quando um cliente é chamado, é enviado um e-mail usando o Nodemailer e um SMS usando o Twilio.
#### As mensagens de e-mail e SMS notificam os clientes de que suas mesas estão prontas.

## 🧰 Tecnologias Utilizadas

### Express.js: Framework web usado para criar o servidor e gerenciar as rotas.
### Sequelize: ORM (Object Relational Mapper) usado para interagir com o banco de dados MySQL.
### Mustache: Engine de templates usada para renderizar as views.
### Twilio: Serviço de SMS utilizado para enviar notificações aos clientes.
### Nodemailer: Serviço de e-mail usado para enviar notificações aos clientes.
### Connect-Flash: Para exibição de mensagens temporárias (ex.: sucesso ou erro).
### Express-Session: Usado para o gerenciamento de sessões entre as requisições.

## 📝 Explicação do Código

# Configuração do Servidor (src/server.ts)

### Configuração de Sessão e Flash:

#### O servidor usa express-session para gerenciamento de sessões e connect-flash para lidar com mensagens flash (sucesso, erro, etc.).

### Configuração do Ambiente:

#### A variável de ambiente é carregada usando o pacote dotenv a partir do arquivo .env.

### Configuração da Engine de Views:

#### A engine Mustache é configurada para renderizar as views localizadas no diretório views/.

### Arquivos Estáticos:

#### O servidor serve arquivos estáticos (ex.: CSS, imagens) a partir do diretório public/.

### Tratamento de 404:

#### Um manipulador de 404 personalizado exibe uma mensagem de erro caso a página não seja encontrada.

# Controlador de Clientes (src/controllers/btnController.ts)

### Editar Cliente (editar):
#### Atualiza os detalhes de um cliente com base no parâmetro id da URL.

### Excluir Cliente (deletar):
#### Remove um cliente da fila de espera com base no id.

### Chamar Cliente (chamarCliente):
#### Atualiza o status do cliente para "chamado" e envia notificações por e-mail e SMS.

### Cliente Desistiu (clienteDesistiu):
#### Atualiza o status do cliente para "desistiu" quando ele decide abandonar a fila.

# Rotas (src/routes/index.ts)

### Define as rotas para lidar com as diferentes funcionalidades (home, gerenciamento de clientes, notificações, paginação, etc.).

#### Usa os controladores para processar as requisições e gerar as respostas.


## 🤝 Contribua
### Se você deseja contribuir com este projeto, faça um fork do repositório, faça suas alterações e envie um pull request.

## 📄 Licença
### Este projeto está licenciado sob a Licença ISC.

## ⚠️ Notas
### Certifique-se de ter credenciais válidas para os serviços de e-mail e Twilio para que as notificações funcionem corretamente.
### O banco de dados MySQL deve ter uma tabela Clients que corresponde ao modelo Sequelize utilizado nos controladores.