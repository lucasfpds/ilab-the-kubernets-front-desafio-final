![Logo](https://www.notion.so/image/https%3A%2F%2Fbutecotecnologico.com.br%2Fkubernetes-explicado%2Fk8s-logo.png?table=block&id=4bdd526d-997b-4b7a-aff3-60f6d830cb8e&spaceId=b5bde1f6-a69d-4d6a-ba92-e85e080fe677&width=150&height=150&userId=8a4a1998-bbe3-4ecd-8da4-81ad9f899b9c&cache=v2)

# The Kubernetes: FrontEnd

</br>

Acesse no [site](https://front-desafio-final.vercel.app/)<br>

<h2>📷 Preview</h2>
<img src="./src/assets/gravacao_tela.mp4">

## Tópicos

- [Sobre o projeto](#-sobre-o-projeto)
- [Informações Gerais](#-informações-gerais)
- [Environment](#-environment)
- [Pré-requisitos](#-pré-requisitos)
- [Passos para montar o ambiente local](#-passos-para-montar-o-ambiente-local)
- [Tecnologias](#-tecnologias)
- [Equipe responsável](#-equipe-responsável)

<br/>
<hr/>

## 📌 Sobre o projeto

<p>
O projeto tem como objetivo implementar um sistema de realização de pedidos, gerenciado por um administrador. Para o funcionamento correto da aplicação, o administrador precisa estar logado em sua conta para que o pedido seja criado. O processamento deste deve ocorrer através de um sistema de mensageria (em background), com o envio de e-mail ao usuário ao término da operação, informando que o pedido foi realizado com sucesso.
Por fim, os pedidos devem ser armazenados em um banco de dados, possibilitando que posteriormente estes possam ser consultados.
</p>

Em resumo, o fluxo do processo consiste em:

- Administrador se conecta à aplicação.
- Seleciona qual a opção desejada (usuários ou pedidos).
  - Caso usuários seja escolhido:
    - Cadastrar um novo usuário.
    - Editar um usuário existente.
    - Excluir um usuário.
  - Caso pedidos seja escolhido:
    - Criar um novo pedido.
      - O pedido é enviado para o sistema de mensageria.
      - O sistema de mensageria processa o pedido.
      - O sistema de mensageria envia um e-mail ao usuário, informado que o pedido foi realizado.
- Independente da escolha, usuários e pedidos sempre estão sendo salvos no banco de dados.

</br>

<em>
    link para os repositórios de Back:
    [API Admin](https://gitlab.com/ilab-the-kubernets/admin-api)
    [API Users](https://gitlab.com/ilab-the-kubernets/users-api)
    [API Orders](https://gitlab.com/ilab-the-kubernets/orders-api)
    [API Order Consomer SQS](https://gitlab.com/ilab-the-kubernets/api-order-consomer-sqs)
</em>

<br/>
<hr/>

## 📝 Informações Gerais

- A persistência dos dados foi feita no Sistema Gerenciador de Banco de Dados Postgres.
- O sistema de mensageria foi realizado utilizando Simple Queue Service (SQS) da Amazon Web Service (AWS).
- O sistema de envio de e-mails foi realizado utilizando Simple Email Service (SES) da AWS.
- As imagens docker de cada aplicação estão publicadas no [DockerHub](https://hub.docker.com/).
- As aplicações foram deployadas utilizando Kubernetes.
- O FrontEnd foi deployado na Vercel.

<br/>
<hr/>

## Pré-requisitos

- [NodeJS](https://nodejs.org/en/download/)

</br>

```bash
#Fazer o fork do repositório para sua conta

#Executar git clone do seu fork no terminal para clonar o repositório
```

<br/>
<hr/>

## 🔒 Environment

Por padrão, após a instalação das dependências a aplicação React vem com um módulo de configuração que pode ler todas as variáveis ​​de ambiente do arquivo `.env` que possuem o prefixo REACT_APP.

```bash
# Crie um arquivo .env usando de exemplo o arquivo .env.example
$ cp .env.example .env
```

| Key                     | Description    | Default Value         |
| ----------------------- | -------------- | --------------------- |
| REACT_APP_API_ADMIN_URL | URL API ADMIN  | http://localhost:8080 |
| REACT_APP_API_USER_URL  | URL API USERS  | http://localhost:8081 |
| REACT_APP_API_ORDER_URL | URL API ORDERS | http://localhost:8082 |

<br/>
<hr/>

## Passos para montar o ambiente local

1. Instalar o Yarn

```sh
npm install -g Yarn
```

3. Instalar dependências:

```sh
yarn install
```

4. Start da aplicação:

```sh
yarn start
```

5. Aplicação disponível em **http://localhost:3000**

<br/>
<hr/>

## 🛠 Tecnologias

As seguintes linguagens/tecnologias foram usadas na construção do projeto:

<div>
  
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
" target="_blank">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
" target="_blank">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" target="_blank">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
" target="_blank">
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white
" target="_blank">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
" target="_blank">
  <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white
" target="_blank">
  <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E
" target="_blank">
  
</div>

<br/>
<hr/>

## 🛠 Ferramentas

As seguintes ferrramentas foram utilizadas no projeto (clique nos ícones para acessar a documentação):

<div>
    <a href=https://donovan-tarsis.atlassian.net/jira/software/projects/KG4/boards/2>
        <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white" target="_blank">
    </a>
    <a href=https://www.notion.so/d797dd90bf404eb889490c76731514e7?v=fd976418c0704b7c9205a5dc80db1826>
        <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" target="_blank">
    </a>
</div>

<br/>
<hr/>

## 👩‍💻🧑‍💻 Equipe responsável

**Antônia Pamela Yhaohannah de Lima** - [GitLab](https://gitlab.com/yhaohannah.lima) [Linkedin](https://www.linkedin.com/in/yhaohannah-lima-954690216/)

**Donovan Társis Bicalho Silva** - [GitLab](https://gitlab.com/donovan.tarsis) [Linkedin](https://www.linkedin.com/in/donovan-tarsis/)

**Guilherme Felipe Campos** - [GitLab](https://gitlab.com/GuilhermeFelipeCampos) [Linkedin](https://www.linkedin.com/in/guilhermefelipecampos/)

**Lucas Fernandes Paixão dos Santos** - [GitLab](https://gitlab.com/lucasfpds) [Linkedin](https://www.linkedin.com/in/lfpds/)

**Rebeca Victoria dos Santos Ferreira** - [GitLab](https://gitlab.com/rvsfrebeca1) [Linkedin](https://www.linkedin.com/in/rebecaferreirajs/)

---
