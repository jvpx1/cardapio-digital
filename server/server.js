//importa o Express (posso usar qualquer nome pra variavel , mas é melhor usar 'express' de preferência )
const express = require('express');

//importando cors
const cors = require('cors');

//importa a conexão criada no database.js
const db = require('./database');

//cria a aplicação express
const app = express();

//definindo a porta do servidor
const PORT = 3000;

app.use(cors());

//Middleware que ensina o Express a ler JSON no corpo das requisições.
app.use(express.json());

app.get('/pratos',(req,res) =>{
    //buscar todos os pratos
    const pratos = db.prepare('SELECT * FROM pratos').all();

    res.json(pratos);
})

app.post('/pratos', (req,res) =>{
    //pega os dados do corpo da requisição
    const{nome, categoria, preco, descricao} = req.body;

    if(!nome || !preco || preco<=0)
        return res.status(400).json("Nome e preço são obrigatórios")
    
    const stmt = db.prepare(
        `INSERT INTO pratos (nome, categoria, preco, descricao)
        VALUES
        (?,?,?,?)`)

    const result = stmt.run(nome, categoria,preco, descricao)

    res.status(201).json({
        id: result.lastInsertRowid,
        nome,
        preco,
        categoria,
        descricao
    });
});

app.delete('/pratos/:id', (req,res) =>{
    //pegando o ID na URL, tipo: ...?id=1&nome=blabla&....
    const id = Number(req.params.id);

    //procurando prato:
    const prato = db.prepare('SELECT * FROM pratos WHERE id = ?').get(id)

     //se não achar o prato:
    if (!prato) return res.status(404).json({erro: "Prato não encontrado!"})

    //deletando o prato
    db.prepare('DELETE FROM pratos WHERE id = ?').run(id)

    //prato deletado e retorna sucesso(200)
    res.status(200).json({mensagem: "Prato excluido com sucesso!", prato})

})

app.put('/pratos/:id', (req, res)=>{
    const id = Number(req.params.id);

    const {nome, categoria, preco, descricao} = req.body;


    //verificando se existe

    const prato = db.prepare('SELECT * FROM pratos WHERE id = ?').get(id)

    if (!prato){
        return res.status(404).json({erro: 'Prato não existe!'})
    }

    db.prepare(`UPDATE pratos 
        set nome = ?, categoria = ?, preco = ?, descricao = ?
        WHERE id = ?`).run(nome,categoria,preco,descricao,id)
    
    const prato_atualizado = db.prepare(`SELECT * FROM pratos WHERE id = ?`).get(id)

    res.json(prato_atualizado);
})








//inciando o servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://192.168.0.73:${PORT}`);
});

