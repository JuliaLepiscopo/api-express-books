import NaoEncontrado from "../erros/NaoEncontrado.js";
import { Autor } from "../models/index.js"; // <- Linha corrigida

class AutorController {
  // Busca todos os autores no MongoDB
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await Autor.find();

      res.status(200).json(autoresResultado);
    } catch (erro) {
      next(erro); // Passa o erro para o middleware de tratamento de erros
    }
  };

  // Busca um autor específico pelo ID do MongoDB
  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await Autor.findById(id);
      
      // Tratamento para retornar 404 caso o ID não exista
      if (autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro); // Passa o erro para o middleware de tratamento de erros
    } 
  }; 

  // Cadastra um novo autor no MongoDB
  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new Autor(req.body);
      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      console.error(erro);
      next(erro); // Passa o erro para o middleware de tratamento de erros
    }
  };

  // Atualiza um autor existente no MongoDB
  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await Autor.findByIdAndUpdate(id, {$set: req.body});

      if (autorResultado !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }

    } catch (erro) {
      next(erro);
    }
  };

  // Deleta um autor existente no MongoDB
  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await Autor.findByIdAndDelete(id);

      if (autorResultado !== null) {
        res.status(200).send({message: "Autor removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;