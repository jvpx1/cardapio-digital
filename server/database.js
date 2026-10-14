const Database = require('better-sqlite3');//importa o sqlite

const db = new Database('pratos.db')//abre pratos.db ou cria se não existir

// criando a tabela se ela não existir
db.exec(
    `CREATE TABLE IF NOT EXISTS pratos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        categoria TEXT NOT NULL,
        preco INT NOT NULL,
        descricao TEXT
    );`
)


module.exports = db;
