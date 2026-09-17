import express from "express";
import LivroControllers from "../controllers/LivroControllers.js"; 

const routes = express.Router();

routes.get("/livros", LivroControllers.listarLivros);
routes.post("/livros", LivroControllers.cadastrarLivros);

export default routes;