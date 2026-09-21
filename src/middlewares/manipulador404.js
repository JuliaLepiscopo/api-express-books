import NaoEncontrado from "../erros/NaoEncontrado.js";

function manipulador404(req, res, next) {
    const erro404 = new NaoEncontrado();
    next(erro404); // Passa o erro para o próximo middleware de tratamento de erros
}

export default manipulador404;