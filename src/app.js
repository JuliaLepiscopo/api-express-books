import express from "express";
import connectNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js"; //Importando o arquivo index.js de rotas
import manipulador404 from "./middlewares/manipulador404.js"; // Importando o middleware de tratamento de erros 404
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js"; // Importando o middleware de tratamento de erros


try {
    await connectNaDatabase(); // <-- Esta linha precisa continuar aqui!
    console.log("Conexão com o banco feita com sucesso!");
} catch (erro) {
    console.error("Erro de conexão com o banco:", erro);
}

const app = express();
app.use(express.json()); // Middleware para interpretar JSON no corpo das requisições
routes(app); //Chama a função que criada no index.js passando o 'app'

// eslint-disable-next-line no-unused-vars
app.use(manipulador404); // Middleware para tratamento de erros
app.use(manipuladorDeErros); // Middleware para tratamento de erros

export default app;