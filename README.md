# 🍽️ Cardápio Digital

Um gerenciador de cardápio **full-stack** que permite cadastrar, visualizar, editar e excluir pratos de um restaurante. Construído do zero com **HTML, CSS, JavaScript puro no front** e **Node.js + Express + SQLite no back**, sem frameworks.

🔗 **Acesse o projeto:** [https://jvpx1.github.io/cardapio-digital/](https://jvpx1.github.io/cardapio-digital/)

---

## ✨ Funcionalidades

- ✅ **Cadastrar pratos** com nome, categoria, preço e descrição
- ✅ **Listar pratos** dinamicamente na tela
- ✅ **Editar pratos** reaproveitando o formulário de cadastro
- ✅ **Excluir pratos** com confirmação
- ✅ **Validação de dados** no front e no back
- ✅ **Formatação de preço** no padrão brasileiro (`R$ 12,50`)
- ✅ **Navegação SPA** entre views (cadastro / cardápio) sem recarregar a página
- ✅ **Persistência real** em banco de dados SQLite
- ✅ **API REST** completa (CRUD)

---

## 🛠️ Tecnologias

### Frontend
- **HTML5** — estrutura semântica
- **CSS3** — estilização e layout responsivo
- **JavaScript (ES6+)** — toda a lógica da aplicação
  - `fetch` API para comunicação com o backend
  - `async/await` para operações assíncronas
  - Manipulação de DOM (`createElement`, `append`)
  - Delegação de eventos
  - `dataset` para guardar dados em elementos
  - SPA com views (`trocarView`)

### Backend
- **Node.js** — runtime JavaScript
- **Express** — framework web
- **better-sqlite3** — driver SQLite síncrono
- **CORS** — habilitar requisições entre origens
- **Nodemon** — reinício automático em desenvolvimento

### Banco de dados
- **SQLite** — banco relacional embutido em arquivo único

---

## 🏗️ Arquitetura do projeto

```
📁 cardapio-digital/
├── 📁 client/                    ← Frontend (navegador)
│   ├── index.html                ← SPA única
│   ├── script.js                 ← Lógica da aplicação
│   └── style.css                 ← Estilos
│
├── 📁 server/                    ← Backend (Node.js)
│   ├── server.js                 ← Servidor Express + rotas
│   ├── database.js               ← Configuração do SQLite
│   ├── package.json
│   └── pratos.db                 ← Banco de dados (gerado automaticamente)
│
├── 📁 postman/                   ← Collection da API
├── .gitignore
└── README.md
```

### 🔄 Fluxo da aplicação:

```
┌──────────────┐    HTTP    ┌──────────────┐    SQL    ┌──────────┐
│   Frontend   │ ─────────► │   Backend    │ ────────► │  SQLite  │
│  (navegador) │ ◄───────── │   (Express)  │ ◄──────── │  (banco) │
└──────────────┘    JSON    └──────────────┘    dados   └──────────┘
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- **Node.js** (v18 ou superior)
- **Git**
- Navegador moderno

### 1. Clonar o repositório

```bash
git clone https://github.com/jvpx1/cardapio-digital.git
cd cardapio-digital
```

### 2. Rodar o backend

```bash
cd server
npm install
npm run dev
```

O servidor vai rodar em `http://localhost:3000` (ou `http://SEU_IP:3000` se configurado).

### 3. Abrir o frontend

Abra o arquivo `client/index.html` no navegador, ou use uma extensão como **Live Server** (VS Code).

**⚠️ Importante:** se você rodar o front em uma porta diferente do back (ex: `5500` e `3000`), ajuste o `API_URL` no `client/script.js`:

```javascript
const API_URL = 'http://localhost:3000';  // ou o IP da sua máquina
```

---

## 🔌 Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/pratos` | Lista todos os pratos |
| `POST` | `/pratos` | Cadastra um novo prato |
| `PUT` | `/pratos/:id` | Atualiza um prato existente |
| `DELETE` | `/pratos/:id` | Remove um prato |

### Exemplo de requisição (`POST /pratos`):

```json
{
    "nome": "Pizza Margherita",
    "categoria": "Prato Principal",
    "preco": 45.90,
    "descricao": "Molho de tomate, mussarela e manjericão"
}
```

### Exemplo de resposta (`201 Created`):

```json
{
    "id": 1,
    "nome": "Pizza Margherita",
    "categoria": "Prato Principal",
    "preco": 45.90,
    "descricao": "Molho de tomate, mussarela e manjericão"
}
```

---

## 🧠 O que aprendi com esse projeto

Esse projeto foi construído do zero com o objetivo de aprender **desenvolvimento full-stack** sem frameworks. Os principais aprendizados:

### Frontend
- Manipulação dinâmica do DOM com `createElement` (evitando `innerHTML` por segurança contra XSS)
- **Delegação de eventos** para lidar com elementos criados dinamicamente
- **SPA (Single Page Application)** com troca de views sem recarregar
- Uso de `dataset` para guardar informações em elementos HTML
- `fetch` API + `async/await` para comunicação com o backend

### Backend
- Criação de **API REST** com Express
- **Rotas HTTP** (GET, POST, PUT, DELETE)
- **Middlewares** (CORS, JSON parser)
- **Tratamento de erros** com status codes apropriados (400, 404, 500)
- Integração com **SQLite** via `better-sqlite3`
- **SQL** na prática: `CREATE TABLE`, `SELECT`, `INSERT`, `UPDATE`, `DELETE`

### Conceitos gerais
- **HTTP** (métodos, status codes, headers)
- **CORS** (por que existe, como configurar)
- **Variáveis de ambiente** e configuração
- **Git** e versionamento

---

## 🎯 Próximos passos

- [ ] **Autenticação** de usuário (login/cadastro)
- [ ] **Filtro** por categoria
- [ ] **Busca** por nome
- [ ] **Migrar para PostgreSQL** (banco mais robusto para produção)

---

## 👤 Autor

**João Ribeiro**

- GitHub: [@jvpx1](https://github.com/jvpx1)
- LinkedIn: [João Vitor Ribeiro](https://www.linkedin.com/in/joãoribeiro2626)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.