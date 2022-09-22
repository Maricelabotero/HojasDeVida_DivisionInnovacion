const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienciaShema = new Schema({
    Cedula: {
        type: String,
        required: true,
    },
    Entidad: {
        type: String,
        required: true,
    },
    Meses_Experiencia: {
        type: String,
        required: true,
    },
    Funciones: {
        type: String,
        required: true,
    },
    Area_experiencia: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model('Experiencia', ExperienciaShema)