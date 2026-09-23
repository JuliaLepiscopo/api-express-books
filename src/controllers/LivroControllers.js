import { Livro } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { Autor } from "../models/index.js";
import livro from "../models/Livro.js";

class LivroController {
  // Busca todos os livros no MongoDB com paginação e ordenação
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = Livro.find();
      
      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  // Busca um livro específico pelo ID do MongoDB
  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      // Desativa o autopopulate padrão e traz todas as informações do autor neste ID específico
      const livroResultado = await Livro.findById(id, {}, { autopopulate: false })
        .populate("autor");

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
      next(erro);
    }
  };

  // Atualiza um livro existente no MongoDB
  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await Livro.findByIdAndUpdate(id, { $set: req.body });

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
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
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  // Busca livros pelo Query Param de editora/autor
  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livro
          .find(busca)
          .populate("autor");
        
        req.resultado = livrosResultado
        next();
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