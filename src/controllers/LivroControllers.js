import livro from "../models/Livro.js";

class LivroController {
    // Busca todos os livros no MongoDB
    static async listarLivros (req, res){
        try{
        const listaLivros = await livro.find({});
        res.status(200).json(listaLivros);
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha na requisição dos livros` });
    }}


    // Busca um livro específico pelo ID do MongoDB
    static async listarLivroPorId (req, res){
        try {
            const id = req.params.id;
        const livroEncontrado = await livro.findById(id);
        res.status(200).json(livroEncontrado);
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha na requisição do livro` });
    }
    }


    // Cadastra um novo livro no MongoDB
    static async cadastrarLivros (req, res){
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ mensagem: "Livro adicionado com sucesso!", livro: novoLivro });
        } catch (erro) {
            res.status(500).json({ mensagem: `${erro.message} - falha ao cadastrar livro` });
        }
    }

    // Atualiza um livro existente no MongoDB
    static async atualizarLivro (req, res){
    try {
        const id = req.params.id;
        await livro.findByIdAndUpdate(id, req.body);
        res.status(200).json({ mensagem: "Livro atualizado com sucesso" });
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha na atualização` });
    }
};

    // Deleta um livro existente no MongoDB
    static async deletarLivro (req, res){
    try {
        const id = req.params.id;
        await livro.findByIdAndDelete(id);
        res.status(200).json({ mensagem: "Livro deletado com sucesso" });
    } catch (erro) {
        res.status(500).json({ mensagem: `${erro.message} - falha na exclusão` });
    }
};

};

export default LivroController;