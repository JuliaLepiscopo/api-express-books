import mongoose from "mongoose";

// Define o schema do livro
const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { 
        type: String, 
        required: [true, "O título do livro é obrigatório"], 
        trim: true },
    editora: { 
        type: String, 
        required: [true, "A editora do livro é obrigatória"], 
        trim: true, 
        enum: {
            values: ["Editora Brasil", "Classico"],
            message: "Não foi possível reconhecer o nome da editora {VALUE}." }},
    preco: { type: Number },
    numeroPaginas: { 
        type: Number, 
        min:[10, "O número de páginas deve ser acima de 10. Valor fornecido: {VALUE}"], 
        max: [5000, "O número de páginas não pode passar de 5000. Valor fornecido: {VALUE}"] },
    autor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "autores", 
        required: [true, "O autor(a) do livro é obrigatório"]
    }
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;

