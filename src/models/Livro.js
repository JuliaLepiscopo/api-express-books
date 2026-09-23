import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { 
    type: String, 
    required: [true, "O título do livro é obrigatório"], 
    trim: true 
  },
  editora: { 
    type: String, 
    required: [true, "A editora do livro é obrigatória"], 
    trim: true, 
    enum: {
      values: ["Editora Brasil", "Classico"],
      message: "A editora {VALUE} não é um valor permitido."
    }
  },
  preco: { type: Number },
  numeroPaginas: { 
    type: Number,
    min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
    max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"]
  },
      autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O(a) autor(a) é obrigatório"],
      autopopulate: true // propriedade adicionada
    },
}, { versionKey: false });

livroSchema.plugin(autopopulate);
const livro = mongoose.model("livros", livroSchema);

export default livro;