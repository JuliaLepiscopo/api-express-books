import express from "express";
import connectNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js"; //Importando o arquivo index.js de rotas

try {
    const db = await connectNaDatabase();
    console.log("Conexão com o banco feita com sucesso!");
} catch (erro) {
    console.error("Erro de conexão com o banco:", erro);
}

const app = express();

routes(app); //Chama a função que criada no index.js passando o 'app'

export default app;