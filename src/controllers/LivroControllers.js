import Livro from "../models/Livro.js";
class LivroController {
  // Busca todos os livros no MongoDB
  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await Livro.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      console.error(erro); // <-- Erro utilizado para registro no console
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  // Busca um livro específico pelo ID do MongoDB
  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;

      const livroResultados = await Livro.findById(id)
        .populate("autor", "nome")
        .exec();

      // Tratamento para caso o ID seja válido, mas não exista no banco
      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        res.status(404).send({ message: "Id do livro não localizado." });
      }
      
    } catch (erro) {
      res.status(400).send({ message: `${erro.message} - Requisição mal formatada.` });
    }
  };

  // Cadastra um novo livro no MongoDB
  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new Livro(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      res.status(500).send({ message: `${erro.message} - falha ao cadastrar livro.` });
    }
  };

  // Atualiza um livro existente no MongoDB
  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
    
      await Livro.findByIdAndUpdate(id, { $set: req.body });
    
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };

  // Deleta um livro existente no MongoDB
  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;

      await Livro.findByIdAndDelete(id);

      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };

  // Busca livros pelo Query Param de editora
  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.query.editora;
      
      const livrosResultado = await Livro.find({ "editora": editora });

      res.status(200).send(livrosResultado);
    } catch (erro) {
      console.error(erro); // <-- Erro utilizado para registro no console
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };
}

export default LivroController;