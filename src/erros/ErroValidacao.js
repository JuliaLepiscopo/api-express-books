import RequisicaoIncorreta from "../erros/requisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(erro) {
    const mensagensDeErro = Object.values(erro.errors)
        .map((erro) => erro.message)
        .join(", ");
    super(`Os seguintes erros foram encontrados: ${mensagensDeErro}`);
   } }

   export default ErroValidacao;