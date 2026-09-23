import express from "express";
import LivroControllers from "../controllers/LivroControllers.js"; 
import paginar from "../middlewares/paginar.js";

const routes = express.Router();
// Define as rotas para os livros
routes.get("/livros", LivroControllers.listarLivros, paginar);
routes.get("/livros/busca", LivroControllers.listarLivroPorFiltro, paginar); 
routes.get("/livros/:id", LivroControllers.listarLivroPorId);
routes.post("/livros", LivroControllers.cadastrarLivro); // <-- Corrigido (tirado o 's')
routes.put("/livros/:id", LivroControllers.atualizarLivro);
routes.delete("/livros/:id", LivroControllers.excluirLivro);

export default routes;