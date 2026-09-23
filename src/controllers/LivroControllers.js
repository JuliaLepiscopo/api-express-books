import { Livro } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { Autor } from "../models/index.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

class LivroController {
  // Busca todos os livros no MongoDB com paginação e ordenação
  static listarLivros = async (req, res, next) => {
    try {
      // CORREÇÃO: Removemos o 'ordem = -1' daqui para evitar conflito
      let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;
      
      let [campoOrdenacao, ordemParam] = ordenacao.split(":");

      limite = parseInt(limite);
      pagina = parseInt(pagina);
      const ordem = parseInt(ordemParam); // Convertemos a ordem extraída para número

      if (limite > 0 && pagina > 0) {
        const livrosResultado = await Livro.find()
          .sort({ [campoOrdenacao]: ordem })
          .skip((pagina - 1) * limite)
          .limit(limite);
          // O .populate("autor") foi removido daqui pois o plugin faz isso sozinho!

        res.status(200).json(livrosResultado);
      } else {
        next(new RequisicaoIncorreta());
      }
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
        const livrosResultado = await Livro.find(busca);
        // O .populate("autor") foi removido daqui também

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