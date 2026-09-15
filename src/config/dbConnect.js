import mongoose from "mongoose";  

async function connectNaDatabase(){
    // O '@' da senha foi trocado por '%40' e adicionamos o 'await'
    await mongoose.connect("mongodb+srv://admin:admin%40123@livraria-cluster.qhommrx.mongodb.net/livraria?appName=livraria-cluster");
    
    return mongoose.connection;
}

export default connectNaDatabase;