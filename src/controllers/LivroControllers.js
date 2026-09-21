import Livro from "../models/Livro.js";
class LivroController {
  // Busca todos os livros no MongoDB
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await Livro.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro); // Passa o erro para o middleware de tratamento de erros
    }
  };

  // Busca um livro específico pelo ID do MongoDB
  static listarLivroPorId = async (req, res, next) => {
      try {
        const id = req.params.id;

        const livroResultados = await Livro.findById(id)
          .populate("autor", "nome")
          .exec();

          res.status(200).send(livroResultados);
      
      } catch (erro) {
        next(erro); // Passa o erro para o middleware de tratamento de erros
      }
    };

  // Cadastra um novo livro no MongoDB
  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new Livro(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro); // Passa o erro para o middleware de tratamento de erros
    }
  };

  // Atualiza um livro existente no MongoDB
  static atualizarLivro = async (req, res,next) => {
    try {
      const id = req.params.id;
    
      await Livro.findByIdAndUpdate(id, { $set: req.body });
    
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (erro) {
      next(erro); // Passa o erro para o middleware de tratamento de erros
    }
  };

  // Deleta um livro existente no MongoDB
  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      await Livro.findByIdAndDelete(id);

      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (erro) {
      next(erro); // Passa o erro para o middleware de tratamento de erros
    }
  };

  // Busca livros pelo Query Param de editora
  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      
      const livrosResultado = await Livro.find({ "editora": editora });

      res.status(200).send(livrosResultado);
    } catch (erro) {
      next(erro); // Passa o erro para o middleware de tratamento de erros
    }
  };
}

export default LivroController;