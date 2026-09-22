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
        validate: 
            { validator: (valor) => {
            return valor >= 10 && valor <= 5000;
            },
            message: "O número de págian deve estar entre 10 e 5000. O valor fornecido foi: {VALUE}" 
            }
    },
    autor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "autores", 
        required: [true, "O autor(a) do livro é obrigatório"]
    }
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;

