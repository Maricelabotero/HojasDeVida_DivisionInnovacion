const express = require("express");
const router = express.Router();
const ExperienciaModel = require("./model");


//Insertar experiencias en la base de datos con el botón agregar
router.post("/Insertar", async (req, res) => {
  console.log("body:", req.body)
  const experiencia = ExperienciaModel.insertMany(
    {
      Cedula: req.body.Cedula,
      Entidad: req.body.Entidad,
      Meses_Experiencia: req.body.Meses_Experiencia,
      Funciones: req.body.Funciones,
      Area_experiencia: req.body.Area_experiencia,
    },
    { versionKey: false }
  );
  const Experiencia = await experiencia.save;
  console.log(Experiencia);

});


router.get("/Consultar", async (req, res) => {
  const consultaExpe = await ExperienciaModel.find(
    { Cedula: "867" },
    { Entidad: 1, Meses_Experiencia: 1, Funciones: 1, _id: 0 }
  );
  const arreglo = [];
  for (const llena in consultaExpe) {
    arreglo.push(consultaExpe[llena]);
  }
  res.send(arreglo);
});

module.exports = router;
