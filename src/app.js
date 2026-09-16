import express from "express";
import connectNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const db = await connectNaDatabase();

db.on("error", (erro) => {
    console.error("Erro de conexão", erro);
});

console.log("Conexão com o banco feita com sucesso!");

const app = express();

// Configura as rotas da aplicação
routes(app);

// Busca um livro específico pelo ID do MongoDB
app.get("/livros/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const livroEncontrado = await livro.findById(id);
        res.status(200).json(livroEncontrado);
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha na requisição do livro` });
    }
});

// Cadastra um novo livro no MongoDB
app.post("/livros", async (req, res) => {
    try {
        const novoLivro = await livro.create(req.body);
        res.status(201).json({ mensagem: "Livro adicionado com sucesso!", livro: novoLivro });
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha ao cadastrar livro` });
    }
});

// Atualiza um livro existente pelo ID
app.put("/livros/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await livro.findByIdAndUpdate(id, req.body);
        res.status(200).json({ mensagem: "Livro atualizado com sucesso" });
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha na atualização` });
    }
});

// Exclui um livro pelo ID
app.delete("/livros/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await livro.findByIdAndDelete(id);
        res.status(200).send("Livro removido com sucesso!");
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha na exclusão` });
    }
});

export default app;