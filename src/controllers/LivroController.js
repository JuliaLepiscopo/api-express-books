import livro from "../models/Livro.js";

class LivroController {
    static async listarLivros (req, res){
        const listaLivros = await livro.find({});
        res.status(200).json(listaLivros);
    }

    static async CadastrarLivroPor (req, res){
        try {
            const novoLivro = await livro.create(req.body);
            res.status(201).json({ mensagem: "Livro adicionado com sucesso!", livro: novoLivro });
        } catch (erro) {
            res.status(500).json({ mensagem: `${erro.message} - falha ao cadastrar livro` });
        }
    }
};

export default LivroController;