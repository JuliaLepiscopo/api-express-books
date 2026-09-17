import express from "express";
import LivroControllers from "../controllers/LivroControllers.js"; 

const routes = express.Router();

routes.get("/livros", LivroControllers.listarLivros);
routes.get("/livros/busca", LivroControllers.listarLivrosPorEditora);
routes.get("/livros/:id", LivroControllers.listarLivroPorId);
routes.post("/livros", LivroControllers.cadastrarLivros);
routes.put("/livros/:id", LivroControllers.atualizarLivro);
routes.delete("/livros/:id", LivroControllers.excluirLivro);


export default routes;