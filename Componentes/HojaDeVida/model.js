const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalShema = new Schema({
    Nombre_completo: {
        type: String,
        required: true,
    },
    Cedula: {
        type: String,
        required: true,
        unique: true,
    },
    Telefono: {
        type: String,
        required: true,
    },
    Correo: {
        type: String,
        required: true,
    },
    Tipo_personal: {
        type: String,
        required: true,
    },
    Formaciones: {
        type: Array,
        required: true,
    },
    Experiencias: {
        type: Array,
        required: true,
    },
    OneDrive: {
        type: String,
        required: true,
    },
    Imagen: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Personal', PersonalShema)