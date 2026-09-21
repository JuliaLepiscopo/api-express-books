import mongoose from "mongoose";

// Define o schema do livro
const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: [true, "O título do livro é obrigatório"], trim: true },
    editora: { type: String, required: [true, "A editora do livro é obrigatória"], trim: true },
    preco: { type: Number },
    paginas: { type: Number },
    autor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "autores", 
        required: [true, "O autor(a) do livro é obrigatório"]
    }
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;

