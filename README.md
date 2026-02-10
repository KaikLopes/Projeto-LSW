# 🎮 Game Vault - Gerenciador de Backlog

![Status](https://img.shields.io/badge/Status-Finalizado-success)
![Course](https://img.shields.io/badge/Curso-ADS-blue)
![License](https://img.shields.io/badge/License-MIT-green)

> Aplicação web para gerenciamento de jogos utilizando consumo de API REST simulada e programação assíncrona.

## 💻 Sobre o Projeto

O **Game Vault** é uma aplicação Single Page Application (SPA) desenvolvida para gerenciar um backlog pessoal de jogos. O projeto foi criado como parte da disciplina de Desenvolvimento Web, com o objetivo de praticar requisições HTTP (**GET, POST, PUT, DELETE**) e manipulação do DOM com JavaScript Moderno (Async/Await).

A aplicação permite cadastrar jogos, monitorar status (rank, tempo de jogo, dias seguidos) e filtrar a biblioteca em tempo real.

## 🛠 Tecnologias Utilizadas

* **Frontend:**
    * HTML5 & CSS3
    * JavaScript (ES6+)
    * [Bootstrap 5](https://getbootstrap.com/) (Layout e Responsividade)
    * [SweetAlert2](https://sweetalert2.github.io/) (Alertas e Modais interativos)
    * Bootstrap Icons & Google Fonts (Poppins)
* **Backend (Simulado):**
    * [JSON-Server](https://github.com/typicode/json-server) (API REST Fake)
    * Node.js (Ambiente de execução) 

## ✨ Funcionalidades

* ✅ **Listagem de Jogos (GET):** Carregamento dinâmico dos jogos salvos na API.
* ✅ **Cadastro Detalhado (POST):** Adição de jogos com nome, status, rank, tempo de jogo e streak (dias seguidos).
* ✅ **Edição Completa (PUT):** Atualização de todos os dados do jogo através de um modal dedicado.
* ✅ **Exclusão Segura (DELETE):** Remoção de jogos com confirmação visual via SweetAlert.
* 🔍 **Busca em Tempo Real:** Filtro instantâneo por nome ou status sem recarregar a página.
* 🎨 **Dark Mode:** Interface moderna e responsiva com tema escuro.

## 🚀 Como Executar o Projeto

### Pré-requisitos
Antes de começar, você precisa ter o **[Node.js](https://nodejs.org/en/)** instalado em sua máquina.

### Passo a Passo

1.  **Clone o repositório** (ou baixe os arquivos):
    ```bash
    git clone [https://github.com/seu-usuario/game-vault.git](https://github.com/seu-usuario/game-vault.git)
    cd game-vault
    ```

2.  **Instale as dependências** (caso ainda não tenha o json-server):
    ```bash
    npm install
    # Ou instale o json-server globalmente/desenvolvimento
    npm install json-server -D
    ```

3.  **Inicie a API Simulada**:
    Abra o terminal na pasta do projeto e execute:
    ```bash
    npx json-server --watch db.json
    ```
    *O servidor iniciará em `http://localhost:3000/jogos`*.

4.  **Abra a Aplicação**:
    Basta abrir o arquivo `index.html` no seu navegador preferido ou usar a extensão "Live Server" do VS Code.

## 📂 Estrutura da API (db.json)

O projeto utiliza um arquivo JSON local para persistência de dados. Exemplo da estrutura:

```json
{
  "jogos": [
    {
      "id": "1",
      "nome": "League of Legends",
      "status": "Viciado",
      "rank": "Esmeralda IV",
      "tempo": "2000h+",
      "streak": 12
    }
  ]
}
