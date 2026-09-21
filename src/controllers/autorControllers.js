import { autor as Autor } from "../models/Autor.js";

class AutorController {
  // Busca todos os autores no MongoDB
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await Autor.find();

      res.status(200).json(autoresResultado);
    } catch (erro) {
      console.error(erro);
      res.status(500).json({ message: "Erro interno no servidor" });
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
        res.status(404).send({ message: "Id do Autor não localizado." });
      }
    } catch (erro) {
      next(erro); // Passa o erro para o middleware de tratamento de erros
    } // <--- A CHAVE QUE FALTAVA FOI ADICIONADA AQUI PARA FECHAR O CATCH
  }; 

  // Cadastra um novo autor no MongoDB
  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new Autor(req.body);

      const autorResultado = await autor.save();

      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      console.error(erro);
      res.status(500).send({ message: "Falha ao cadastrar Autor." });
    }
  };

  // Atualiza um autor existente no MongoDB
  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
  
      await Autor.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };

  // Deleta um autor existente no MongoDB
  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;

      await Autor.findByIdAndDelete(id);

      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };
}

export default AutorController;