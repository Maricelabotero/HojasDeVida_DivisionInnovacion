const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Nivel_Formacion = new Schema({
    Nivel_formacion: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model('NivelFormacion', Nivel_Formacion);