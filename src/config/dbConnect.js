import mongoose from "mongoose";  

async function connectNaDatabase(){
    // O '@' da senha foi trocado por '%40' e adicionamos o 'await'
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    
    return mongoose.connection;
}

export default connectNaDatabase;