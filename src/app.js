import express from "express";
import connectNaDatabase from "./config/dbConnect.js";

const db = await connectNaDatabase();

db.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

console.log("Conexão com o banco feita com sucesso!");

const app = express();
app.use(express.json());

const livros = [ 
    { id: 1, titulo: "O senhor dos anéis" },
    { id: 2, titulo: "O hobbit" }
];

function buscarLivro(id) {
    return livros.findIndex(livro => livro.id === Number(id));
}

app.get("/", (req, res) => {
    res.status(200).send("Livros API");
});

app.get("/livros", (req, res) => {
    res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
    const index = buscarLivro(req.params.id);
    if (index === -1) {
        return res.status(404).send("Livro não encontrado.");
    }
    res.status(200).json(livros[index]);
});

app.post("/livros", (req, res) => {
    // Pega o maior id existente e soma 1 (ou usa 1 se a lista estiver vazia)
    const novoId = livros.length > 0 ? Math.max(...livros.map(l => l.id)) + 1 : 1;
    
    const novoLivro = {
        id: novoId,
        titulo: req.body.titulo
    };

    livros.push(novoLivro);
    res.status(201).json({ mensagem: "Livro adicionado com sucesso!", livro: novoLivro });
});

app.put("/livros/:id", (req, res) => {
    const index = buscarLivro(req.params.id);
    if (index === -1) {
        return res.status(404).send("Livro não encontrado para atualizar.");
    }
    livros[index].titulo = req.body.titulo;
    res.status(200).json(livros);
});

app.delete("/livros/:id", (req, res) => {
    const index = buscarLivro(req.params.id);
    if (index === -1) {
        return res.status(404).send("Livro não encontrado para exclusão.");
    }
    livros.splice(index, 1);
    res.status(200).send("Livro removido com sucesso!");
});

export default app;