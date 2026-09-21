import express from "express";
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";

// Define as rotas principais da aplicação
const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send({ titulo: "API de Livros" });
    });

    app.use(
        express.json(),
        livros,
        autores
    );
};

export default routes;