//Essa parte seleciona o formulário e lista 
const formCardapio = document.getElementById("form-cardapio")
const listaCardapio = document.getElementById("lista-cardapio")

// Utilitárias

// Pega o valor salvo no localStorage (uma string JSON) e transforma em
// um array de objetos JavaScript. Se não existir nada salvo, retorna [].
const obter_cardapio = () =>{
    return JSON.parse(localStorage.getItem('pratos')) || [];
}//localStorage → string JSON → JSON.parse → array/objeto JS   (LER)


//recebe um array e transforma em string no formato JSON
//(porque o localStorage só aceita strings) e salva no navegador.
const salvar_cardapio = pratos => localStorage.setItem('pratos', JSON.stringify(pratos));
//array/objeto JS → JSON.stringify → string JSON → localStorage   (SALVAR)

//adicionando um listener de eventos para o form
if(formCardapio){//se tiver no forms, então acontece:
    formCardapio.addEventListener('submit', (event) =>{
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
        id: Date.now(),
        nome,
        categoria,
        preco,
        descricao

    }
    // console.log("Dados capturados com sucesso:", novoPrato); //teste

    //Buscando lista atual de pratos ou criando uma nova
    const pratos_salvos = obter_cardapio();  //obtem ou cria a lista  []
    pratos_salvos.push(novoPrato); //coloca o objeto na lista
    salvar_cardapio(pratos_salvos)//salva o ojeto novo na storage 


    alert(`Prato ${nome} foi adicionado`)
    formCardapio.reset();
    carregar_cardapio();//atualizar o cardapio para chegar na página e estar atualizada
})

}

function carregar_cardapio(){
    if(!listaCardapio) return;

        const pratos_salvos = obter_cardapio(); //é retornada os objetos salvos

        if (pratos_salvos.length === 0){
            listaCardapio.innerHTML = `<p style="color: #64748b; text-align: center;">Nenhum prato cadastrado ainda.</p>`;
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

            //montando a li final, com tudo:
            //criando na li tudo que foi montado na hierarquia ali em cima
            li.append(div_info, prato_preco, btn_excluir)

            //Finalmente adicionando a <li> toda pronta no cardápio
            listaCardapio.appendChild(li);




        });
    }
if (listaCardapio) {
    listaCardapio.addEventListener('click', (event) => {
        // verifica se o clique foi num botão de excluir
        if (event.target.classList.contains('btn-excluir')) {
            const id = Number(event.target.dataset.id); //transformando o id para numero pq ele é string no 'pratos'
            const nome = event.target.dataset.nome;
            const confirma = confirm(`Tem certeza que quer exlcuir ${nome}?`)
            

            if (!confirma) return;
            // filtra o array, removendo o prato com esse id
                const pratos_filtrados = obter_cardapio().filter(prato => prato.id !== id);

            // salva a lista filtrada
                salvar_cardapio(pratos_filtrados);

            // atualiza a lista
                carregar_cardapio();
            
        }
    });
}

carregar_cardapio();

