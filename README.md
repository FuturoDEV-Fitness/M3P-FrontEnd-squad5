# G.M.J. Exercises

Este projeto é uma plataforma de gerenciamento de exercícios e locais de atividades físicas, desenvolvida utilizando **React**, **Vite**, e **React Router** para o frontend. A aplicação permite que os usuários cadastrem novos locais de exercício, visualizem uma lista de locais, façam login e naveguem em um dashboard para gerenciar suas informações e configurações. Além disso, ela faz uso de uma API para gerenciar dados dos locais e dos usuários, autenticação com JWT, e diversos contextos para gerenciar o estado da aplicação.

## Índice

- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Scripts](#scripts)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contextos](#contextos)
- [Rotas](#rotas)
- [Providers](#providers)

## Funcionalidades

- **Login e Autenticação**: A aplicação utiliza JWT para autenticação e navegação segura entre as rotas privadas.
- **Cadastro e Gerenciamento de Locais**: Usuários autenticados podem cadastrar e gerenciar locais de exercícios.
- **Dashboard Personalizado**: Um painel para visualização de dados personalizados para o usuário.
- **Configurações**: Gerenciamento de informações de perfil através de uma página de configurações.
- **Lista de Locais**: Exibição de uma lista de locais de atividades físicas, com filtros e detalhes.

## Instalação

Para rodar a aplicação localmente, siga os passos abaixo:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/FuturoDEV-Fitness/M3P-FrontEnd-squad5.git
   cd g.m.j.exercises
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação** no navegador:
   ```bash
   http://localhost:5173
   ```

## Scripts

Na configuração do projeto, você tem os seguintes scripts à disposição:

- `npm run dev`: Inicia o servidor de desenvolvimento utilizando Vite.
- `npm run build`: Gera a build da aplicação para produção.
- `npm run preview`: Pré-visualiza a build de produção.
- `npm run lint`: Verifica o código usando ESLint e garante que todas as regras estão sendo seguidas corretamente.

## Estrutura de Pastas

A estrutura básica do projeto é a seguinte:

```
├── node_modules/              # Dependências do projeto
├── public/                    # Arquivos públicos, como o index.html
├── src/                       # Diretório principal do código-fonte
│   ├── assets/                # Arquivos estáticos (imagens, fontes, etc.)
│   ├── components/            # Componentes reutilizáveis do React
│   ├── context/               # Gerenciamento de estado global (React Context API)
│   ├── helper/                # Funções utilitárias para o projeto
│   ├── layout/                # Layout da aplicação
│   ├── pages/                 # Páginas da aplicação
│   ├── router/                # Configuração de rotas
│   ├── services/              # Serviços de comunicação com APIs
│   ├── AllProviders.jsx       # Provedor de contexto para a aplicação
│   ├── index.css              # Estilos globais
│   ├── main.jsx               # Ponto de entrada principal do React
├── .eslintrc.cjs              # Configurações do ESLint
├── .gitignore                 # Arquivos e diretórios ignorados pelo Git
├── index.html                 # HTML principal da aplicação
├── package-lock.json          # Arquivo de bloqueio de dependências (gerado pelo npm)
├── package.json               # Gerenciamento de dependências e scripts do projeto
├── README.md                  # Documentação do projeto
├── vite.config.js             # Configuração do Vite

```

## Tecnologias Utilizadas

- **React**: Biblioteca principal para a criação da interface do usuário.
- **Vite**: Ferramenta para bundling e servidor de desenvolvimento.
- **React Router**: Para gerenciamento de rotas no frontend.
- **Axios**: Cliente HTTP para comunicação com a API.
- **React Hook Form**: Gerenciamento de formulários de maneira eficiente.
- **Yup**: Validação de formulários.
- **JWT Decode**: Utilizado para decodificar tokens JWT.
- **React Toastify**: Para exibição de notificações de sucesso e erro.
- **SweetAlert2**: Alertas e modais de confirmação.

## Contextos

O projeto utiliza o conceito de **contextos** do React para gerenciar o estado global da aplicação:

- **AuthContext**: Gerencia a autenticação do usuário e mantém o estado de login.
- **LoginContext**: Gerencia informações relacionadas ao processo de login.
- **LocaisContext**: Gerencia os dados dos locais de exercício.
- **UsuariosContext**: Gerencia os dados dos usuários.
- **DashboardContext**: Gerencia as informações do dashboard do usuário.

## Rotas

As rotas são gerenciadas através do `react-router-dom`. Algumas delas são protegidas, ou seja, exigem que o usuário esteja autenticado para acessá-las:

- `/login`: Página de login.
- `/`: Página principal (dashboard).
- `/cadastro`: Página de cadastro de novos locais de exercícios.
- `/lista`: Lista de locais de exercícios.
- `/configuracao`: Configuração do perfil do usuário.
- **Rotas protegidas**: Utilizam o componente `PrivateRoutes` para garantir o acesso restrito a usuários logados.

## Providers

O componente `AllProviders.jsx` é responsável por encapsular todos os contextos e provê-los para a aplicação inteira. Os principais providers incluídos são:

- `AuthProvider`: Provedor do contexto de autenticação.
- `LocaisContextProvider`: Provedor do contexto dos locais de exercício.
- `UsuariosContextProvider`: Provedor do contexto dos usuários.
- `DashboardContextProvider`: Provedor do contexto do dashboard.
- `LoginContextProvider`: Provedor do contexto de login.

## Autores

-**Autor**

- **Autor:** [Glauton](https://github.com/glautonOsorio)
- **Autor:** [Marcelo](https://github.com/marcelovntr)

- **Autor:** [Jorge](https://github.com/jayemelBR)

## Licença

Este projeto é privado e não possui licença aberta para uso público.

[Batata Secreta](https://www.receiteria.com.br/receitas-com-batata/)
