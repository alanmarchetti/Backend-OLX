# MINI BACKEND OLX

## Descrição do projeto
Um mini backend similar ao modelo da 'olx', onde um usuário se cadastrará e após realizar login poderá cadastrar seus produtos definir um preço, preço negociável, definir status, também terá acesso a quantidade de visualizações que o seu produto teve, etc. Todos os usuário cadastrados no sistema, poderão visualizar todos os produtos, buscar por um produto específico através do nome, etc. 

- Cadastro e login de usuários
- Autenticação e Autorização as rotas
- Cadastro de produtos
- Edição, listagem e buscas (por nome) de produtos cadastrados
<hr>

### Tecnologias utilizadas no projeto
- Javascript
- Node.js
- MongoDB (mongoose)
- Express
- Validators
- Cors
- Bcryptjs
<hr>

### Como utilizar o projeto
- Clonar o repositório
- Executar o comando  `npm i`  para instalar as dependecias
- Fazer uma cópia do arquivo `.env.example` e chamar de `.env`
- Atualizar variáveis de ambiente no arquivo `.env`
- Executar o comando `npm start` para rodar o servidor
- Utilizar programas como `postman, insomnia` ou similares, para realizar as requisições
- Por questões de aprendizagem, todos os parâmetros serão passadas via body (ate mesmo os do tipo get)
<hr>

### Algumas regras de negócio

- Usuário só terá acesso a determinadas rotas caso esteja cadastrado e autenticado no sistema
- O acesso a determiadas rotas só sera liberado caso o usuário informe o token gerado após o cadastro do mesmo
- O usuário só poderá editar seus proprios produtos e informações