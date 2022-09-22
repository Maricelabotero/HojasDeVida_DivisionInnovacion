const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Unidad_Formacion = new Schema({
    Unidad_formacion: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model('UnidadFormacion', Unidad_Formacion);