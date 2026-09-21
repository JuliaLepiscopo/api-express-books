import mongoose from "mongoose";

// Define o schema do autor
const autorSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { type: String, required: [true, "O nome do(a) autor(a) é obrigatório"], trim: true },
    nacionalidade: { type: String, trim: true }
}, { versionKey: false });

const autor = mongoose.model("autores", autorSchema);

export {autor, autorSchema};