import { Livro } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js"; // <- Caminho corrigido para a classe de erro
import { Autor } from "../models/index.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

class LivroController {
  // Busca todos os livros no MongoDB
  static listarLivros = async (req, res, next) => {
    try {
      let { limite = 5, pagina = 1 } = req.query;

      limite = parseInt(limite);
      pagina = parseInt(pagina);

      if (limite > 0 && pagina > 0){
        const livrosResultado = await Livro.find()
          .skip((pagina - 1) * limite)
          .limit(limite)
          .populate("autor")
          .exec();

        res.status(200).json(livrosResultado);
      } else {
        next(new RequisicaoIncorreta());
      }

    } catch (erro) {
      next(erro); // Passa o erro para o middleware de tratamento de erros
    }
  };

  // Busca um livro específico pelo ID do MongoDB
  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await Livro.findById(id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
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
  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await Livro.findByIdAndUpdate(id, {$set: req.body});

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  // Deleta um livro existente no MongoDB
  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await Livro.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  // Busca livros pelo Query Param de editora
    static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = await Livro
          .find(busca)
          .populate("autor");

        res.status(200).send(livrosResultado);
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (nomeAutor) {
    const autor = await Autor.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;