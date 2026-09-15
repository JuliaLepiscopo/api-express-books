//import http from "http";

import app from "./src/app.js";

const PORT = 3000;

const rotas = {
    "/": "Livros API",
    "/contato": "Contato",
    "/sobre": "Sobre",
    "/livros": "Lista de livros"
};

//const server = http.createServer((req, res) => {
  //  const rota = rotas[req.url] || "Rota não encontrada";
    //res.writeHead(200, { "Content-Type": "text/plain" });
    //res.end(rotas[req.url]);
//});

app.listen(PORT, () => { console.log("Servidor escutando"); });

