const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Formacion = new Schema({
    Cedula: {
        type: String,
        required: true,
    },
    Unidad_formacion: {
        type: String,
        required: true,
    },
    Area_formacion: {
        type: String,
        required: true,
    },
    Nivel_formacion: {
        type: String,
        required: true,
    },

})


module.exports = mongoose.model('Formacion', Formacion);