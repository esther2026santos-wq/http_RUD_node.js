// Importa o mõdulo nativo HTTP do Node.js
const http = require('http'); 


// Criamos um array/vetor para simular o bando de dados (persistência de memoria). 
let livros = [
    {
        id: 1, 
        titulo: 'O pequeno Principe', 
        autor: 'Antoine ded Saint-Exipéry'
    }
];

const server = http.createServer((req, res) => {
    // Capturamos o método (GET, POST, PUT, DELETE, etc)
    const metodo = req.method;
    //Captura a URL da requisição (rotas)
    const url = req.url;
    // Define que a resposta sera em JSON
    res.setHeader('content-Type', 'application/json');

    // GET -> LISTA LIVROS 
    if (url === '/livros' && metodo === 'GET'){
        // Status 200= OK/sucesso
        res.statusCode = 200;
        // Retornamos a lista de livros em formato JSON
        res.end(JSON.stringify(livros));
        // Encerra a execução da requisição 
        return;
    }


// Post -> LIVROS
 if (url === '/livros' && metodo === 'POST'){
    // Variavel para armazenar os dados vindos do body
    let body=  '';
    // Evento disparado quando chegam os 'pedaços' da requisição
    req.on('data', parte => {
        body += parte // concatena os pedaços 
    });
    // Evento disparado quando todos em objeto javascript
    req.on('end', () => {
        const novoLivro = JSON.parse(body);
        // Adiciona o novo Livro ao array livros
        livros.push(novoLivro);
        // Status 201 = criado com sucesso
        res.statusCode= 201;
        // Retorna mensagem final + objeto criado
        res.end(JSON.stringify({
            mensagem: 'Livro cadastrado com sucesso',
            livro: novoLivro
        }))
    })
    return; // Encerra a requisição 
 }

 // PUT -> ATUALIZAR LIVRO
 if (url === '/livros' && metodo === 'PUT'){
    let body = '';
    req.on('end', () => {
        body += parte;
    });
    req.on('end', () => {
        const livroAtualizado = JSON.parce(body);
        livros = livros.map(livros => {
            if(livros.id === livroAtualizado.id){
                return livroAtualizado;
            }
            return livros;
        });
        res.statusCode = 200; 
        res.end(JSON.stringify({
            mensagem: 'Livro atualizado com sucesso',
            livros:livros
        }));
    });
    return;
 }
 // DELETE -> REMOVER LIVRO
 if (url === '/livros' && metodo === 'DELETE'){
    let body = '';
    req.on('data', parte => {
        body += parte;
    });
    req.on('end', () => {
        // Recebe o ID do livro a ser excluido
        const dados = JSON.parse(body);
        livros = livros.filter(livro => livro.id !== dados.id);
        res.statusCode = 200;
        res.end(JSON.stringify({
            mensagem: 'Livros removido com sucesso',
            livros:livros
        }))
    })
    return;
 }

 // ROTA NÃO ENCONTRADA
 res.statusCode = 404;
 res.end(JSON.stringify({
    mensagem: 'Rota não encotrada'
 }))
});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});