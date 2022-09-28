const mongoose = require("mongoose");


const uri =
  //"mongodb://gestioninnovacion:MHOrtiz2@hojasdevida-shard-00-00.n8lzb.mongodb.net:27017,hojasdevida-shard-00-01.n8lzb.mongodb.net:27017,hojasdevida-shard-00-02.n8lzb.mongodb.net:27017/?ssl=true&replicaSet=atlas-99b541-shard-0&authSource=admin&retryWrites=true&w=majority"
  //process.env.URL;
"mongodb+srv://gestioninnovacion:MHOrtiz2@hojasdevida.n8lzb.mongodb.net/test"
//"mongodb+srv://Mari:mari123@hv.ci2km.mongodb.net/HV?retryWrites=true&w=majority"
mongoose.Promise = global.Promise;


const connection = mongoose.connect(uri, {
  useNewUrlParser: true,
})
  .then(() => console.log("[db] Conectada con éxito Hoja de vida connectionBD"))
  .catch((e) => console.error("[db]", e));

module.export = connection 
