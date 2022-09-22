const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tipo_PersonalShema = Schema({
  _id: Schema.Types.ObjectId,
  Nombre: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('TipoPersonal', Tipo_PersonalShema)