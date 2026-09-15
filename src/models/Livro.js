import mongoose from "mongoose";

// Aqui definimos a "fôrma" do nosso livro no banco de dados
const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true }
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;