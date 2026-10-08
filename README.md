# 🍽️ Cardápio Digital

Um gerenciador de cardápio simples e funcional, feito com **HTML, CSS e JavaScript puro** — sem frameworks, sem bibliotecas. Os dados ficam salvos no navegador do usuário via `localStorage`, permitindo cadastrar, visualizar e excluir pratos de forma prática.

🔗 **Acesse o projeto:** [https://github.com/jvpx1/cardapio-digital](https://github.com/jvpx1/cardapio-digital)

## ✨ Funcionalidades

- ✅ **Cadastrar pratos** com nome, categoria, preço e descrição
- ✅ **Listar pratos** dinamicamente na tela
- ✅ **Excluir pratos** com confirmação antes de remover
- ✅ **Validação de campos** (nome, categoria e preço obrigatórios)
- ✅ **Formatação de preço** no padrão brasileiro (`R$ 12,50`)
- ✅ **Persistência de dados** no `localStorage` — os pratos continuam salvos ao recarregar a página
- ✅ **Feedback visual** quando não há pratos cadastrados

---

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura semântica
- **CSS3** — estilização e layout responsivo
- **JavaScript (ES6+)** — toda a lógica da aplicação
  - Manipulação de DOM (`createElement`, `append`, `querySelector`)
  - Eventos (`addEventListener`, delegação de eventos)
  - Armazenamento local (`localStorage`, `JSON.parse` / `JSON.stringify`)
  - Arrow functions, template literals, `dataset`, `filter`

---

## 🧠 O que aprendi com esse projeto

- Manipulação dinâmica do DOM sem `innerHTML` (usando `createElement` + `textContent`, mais seguro contra XSS)
- Delegação de eventos para lidar com elementos criados dinamicamente
- Persistência de dados no navegador com `localStorage`
- Uso de `dataset` para guardar informações em elementos HTML
- Boas práticas de organização de código (funções utilitárias, early return, separação de responsabilidades)

---

## 🚀 Próximos passos

- [ ] Integrar com banco de dados
- [ ] Criar backend com Node.js + Express
- [ ] Implementar edição de pratos
- [ ] Adicionar filtro por categoria
- [ ] Implementar autenticação de usuário
- [ ] Sincronização entre dispositivos

---

## 📂 Como rodar o projeto localmente

1. Clone o repositório:
   git clone https://github.com/jvpx1/cardapio-digital.git

2. Entre na pasta:
   cd cardapio-digital
3. Abra o arquivo admin.html no navegador e pronto! Não precisa de servidor nem instalação. 🎉 