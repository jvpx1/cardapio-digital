// URL base da API (pode mudar pra url nova quando tiver online)
const API_URL = 'http://192.168.0.73:3000';

//Essa parte seleciona o formulário e lista 
const formCardapio = document.getElementById("form-cardapio")
const listaCardapio = document.getElementById("lista-cardapio")

// ===== NAVEGAÇÃO ENTRE VIEWS =====
const botoesNav = document.querySelectorAll('[data-view]');

botoesNav.forEach(btn => {
    btn.addEventListener('click', () => {
        trocarView(btn.dataset.view);
    });
});

function trocarView(view) {
    // Esconde todas as sections
    document.querySelectorAll('section').forEach(sec => {
        sec.hidden = true;
    });
    
    // Mostra só a que foi pedida
    const alvo = document.getElementById(`view-${view}`);
    if (alvo) alvo.hidden = false;
}

let pratoEmEdicaoId = null;

// Utilitárias

const obter_cardapio = async () =>{
    const resposta = await fetch(`${API_URL}/pratos`)
    const pratos = await resposta.json();
    return pratos;
}


//adicionando um listener de eventos para o form
if(formCardapio){//se tiver no forms, então acontece:
    formCardapio.addEventListener('submit', async (event) =>{
    event.preventDefault()//evita que a página recarregue ao enviar o form
    
    //obtendo valores do formulário
    const nome = document.getElementById("nome").value.trim();
    const categoria = document.getElementById("categoria").value;
    const preco = parseFloat(document.getElementById("preco").value);
    const descricao = document.getElementById("descricao").value.trim();

    //checagem para ver se o usuário está colocando os valores corretos
    if(!nome || !categoria || isNaN(preco) || preco<=0 ){
        alert("Preencha todos os campos corretamente!")
        return;
        }

    //Colocando valores em NovoPrato
    const novoPrato ={
        nome,
        categoria,
        preco,
        descricao
    }
    let resposta;
    
    if (pratoEmEdicaoId) {
        // EDIÇÃO → PUT
        resposta = await fetch(`${API_URL}/pratos/${pratoEmEdicaoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoPrato)
        });
        
        if (!resposta.ok) {
            alert('Erro ao atualizar prato');
            return;
        }
        
        alert('Prato atualizado com sucesso!');
        pratoEmEdicaoId = null;
        document.getElementById('btn-submit').textContent = 'Salvar';
    }else{
        resposta  = await fetch(`${API_URL}/pratos`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(novoPrato)})
        if(!resposta.ok){
            alert('Erro ao cadastrar o prato!')
            return;
        }
        alert(`Prato ${nome} adicionado com sucesso!`)
    }

    formCardapio.reset();
    await carregar_cardapio();
    trocarView('cardapio');


})

}

async function carregar_cardapio(){
    if(!listaCardapio){
      return;  
    } 
    
    const pratos_salvos = await obter_cardapio();

    if (pratos_salvos.length === 0){
        listaCardapio.innerHTML = `<p style="color: #64748b; text-align: center;">Nenhum prato cadastrado ainda </p>`;
        return;
    }
    listaCardapio.innerHTML = '';

    pratos_salvos.forEach(prato => {
        //criando <li> principal aqui
        const li = document.createElement('li');
        li.className = 'item-prato';

        //criando <div class='item-info'>
        const div_info = document.createElement('div');
        div_info.className = 'item-info';

        // criando h3
        const h3nome = document.createElement('h3');
        h3nome.textContent = prato.nome

        // criando <p> com o texto ou sem descrição
        const p_descricao = document.createElement('p');
        p_descricao.textContent = prato.descricao || 'Sem descrição'

        // criando <span> da categoria
        const p_categoria = document.createElement('span');
        p_categoria.className ='item-categoria'
        p_categoria.textContent = prato.categoria

        //Aqui nós montamos a hierarquia em cima nome, no meio descrição e embaixo categoria
        div_info.append(h3nome, p_descricao, p_categoria)

            

            // <span> do preço
            const prato_preco = document.createElement('span');
            prato_preco.className = 'item-preco';
            prato_preco.textContent = `R$ ${prato.preco.toFixed(2).replace('.',',')}`;


            const btn_excluir = document.createElement('button');
            btn_excluir.className = 'btn-excluir';
            btn_excluir.textContent = 'Excluir';
            btn_excluir.dataset.id = prato.id;
            btn_excluir.dataset.nome = prato.nome;

            const btn_editar = document.createElement('button');
            btn_editar.className = 'btn-editar';
            btn_editar.textContent = 'Editar';
            btn_editar.dataset.id = prato.id;
            btn_editar.dataset.nome =prato.nome;
            btn_editar.dataset.categoria = prato.categoria;
            btn_editar.dataset.preco = prato.preco;
            btn_editar.dataset.descricao = prato.descricao || '';







            //montando a li final, com tudo:
            //criando na li tudo que foi montado na hierarquia ali em cima
            li.append(div_info, prato_preco, btn_editar, btn_excluir)

            //Finalmente adicionando a <li> toda pronta no cardápio
            listaCardapio.appendChild(li);

        });
    }
if (listaCardapio) {
    listaCardapio.addEventListener('click', async(event) => {
        const id = event.target.dataset.id; //id guardado la no html

        // verifica se o clique foi num botão de excluir
        if (event.target.classList.contains('btn-excluir')) {
            const nome = event.target.dataset.nome;
            const confirma = confirm(`Tem certeza que quer exlcuir ${nome}?`)
            

            if (!confirma) return;
            
            const resposta = await fetch(`${API_URL}/pratos/${id}`,{
                method:'DELETE'
            })

            if (!resposta.ok){
                alert('Erro ao excluir prato')
                return
            }

            await carregar_cardapio();
            
        }

        // event do editar
        else if(event.target.classList.contains('btn-editar')){
            //pegando dados dos dataset
            const id = Number(event.target.dataset.id);
            const nome = event.target.dataset.nome;
            const categoria = event.target.dataset.categoria;
            const preco = Number(event.target.dataset.preco);
            const descricao = event.target.dataset.descricao;


            // Preenche o formulário
            document.getElementById('nome').value = nome;
            document.getElementById('categoria').value = categoria;
            document.getElementById('preco').value = preco;
            document.getElementById('descricao').value = descricao;

            // Guarda o id numa variável global
            pratoEmEdicaoId = id;

            // Muda o texto do botão
            document.getElementById('btn-submit').textContent = 'Atualizar';
            document.getElementById('btn-cancelar').hidden = false; //mostra o botão
            // Troca pra view de cadastro
            trocarView('cadastro');

        }
    });
}
// ===== BOTÃO CANCELAR EDIÇÃO =====
const btnCancelar = document.getElementById('btn-cancelar');
if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
        pratoEmEdicaoId = null;
        formCardapio.reset();
        document.getElementById('btn-submit').textContent = 'Salvar';
        btnCancelar.hidden = true;
        trocarView('cardapio');
    });
}
carregar_cardapio();

