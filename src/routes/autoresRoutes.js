import express from "express";
import autorController from "../controllers/autorControllers.js"; 

const routes = express.Router();

routes.get("/autores", autorController.listarAutores);
routes.post("/autores", autorController.cadastrarAutor);

export default routes;