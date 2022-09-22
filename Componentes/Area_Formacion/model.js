const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Area_Formacion = new Schema({
    Unidad_formacion: {
        type: String,
        required: true,
    },
    Area_formacion: {
        type: String,
        required: true,
    },
})


module.exports = mongoose.model('AreaFormacion', Area_Formacion);