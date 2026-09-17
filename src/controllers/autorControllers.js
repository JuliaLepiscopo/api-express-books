import { autor } from "../models/Autor.js";

class AutorController {
    // Busca todos os autores no MongoDB
    static async listarAutores (req, res){
        try{
        const listaAutores = await autor.find({});
        res.status(200).json(listaAutores);
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha na requisição dos livros` });
    }}


    // Busca um autor específico pelo ID do MongoDB
    static async listarAutorPorId (req, res){
        try {
            const id = req.params.id;
        const autorEncontrado = await autor.findById(id);
        res.status(200).json(autorEncontrado);
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha na requisição do autor` });
    }
    }


    // Cadastra um novo autor no MongoDB
    static async cadastrarAutor (req, res){
        try {
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ mensagem: "Autor adicionado com sucesso!", autor: novoAutor });
        } catch (erro) {
            res.status(500).json({ mensagem: `${erro.message} - falha ao cadastrar autor` });
        }
    }

    // Atualiza um autor existente no MongoDB
    static async atualizarAutor (req, res){
    try {
        const id = req.params.id;
        await autor.findByIdAndUpdate(id, req.body);
        res.status(200).json({ mensagem: "Autor atualizado com sucesso" });
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha na atualização` });
    }
};

    // Deleta um autor existente no MongoDB
    static async excluirAutor (req, res){
    try {
        const id = req.params.id;
        await autor.findByIdAndDelete(id);
        res.status(200).json({ mensagem: "Autor deletado com sucesso" });
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha na exclusão` });
    }
};

};

export default AutorController;