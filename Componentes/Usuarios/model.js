const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuarios = new Schema({
    Usuario: {
        type: String,
        required: true,
    },
    Clave: {
        type: String,
        required: true,
    },
    Tipo_Usuario: {
        type: String,
        required: true,
    },
})


module.exports = mongoose.model('Usuario', Usuarios);