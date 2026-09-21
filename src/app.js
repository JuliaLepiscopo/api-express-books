import express from "express";
import connectNaDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js"; //Importando o arquivo index.js de rotas

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
app.use((erro, req, res, next) => {
    res.status(500).send({ message: "Erro interno no servidor" });
});

export default app;