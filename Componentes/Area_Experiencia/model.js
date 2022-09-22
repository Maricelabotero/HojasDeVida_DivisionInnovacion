const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Area_Experiencia = new Schema({
    Area_experiencia: {
        type: String,
        required: true,
    },
})


module.exports = mongoose.model('AreaExperiencia', Area_Experiencia);