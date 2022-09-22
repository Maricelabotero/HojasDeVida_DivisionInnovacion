const express = require("express");
const router = express.Router();
const FormacionModel = require("./model");


router.post("/Insertar", async (req, res) => {
  console.log(req.body)
  if (req.body.Area_formacion == "Otro") {
    var cual = req.body.Cual
    const formacion = FormacionModel.insertMany(
      {
        Cedula: req.body.Cedula,
        Unidad_formacion: req.body.Unidad_Formacion,
        Area_formacion: cual,
        Nivel_formacion: req.body.Nivel_Formacion,
      },
      { versionKey: false }
    );
    const Formacion = await formacion.save;
    console.log(Formacion);
  } else {
    const formacion = FormacionModel.insertMany(
      {
        Cedula: req.body.Cedula,
        Unidad_formacion: req.body.Unidad_Formacion,
        Area_formacion: req.body.Area_formacion,
        Nivel_formacion: req.body.Nivel_Formacion,
      },
      { versionKey: false }
    );
    const Formacion = await formacion.save;
    console.log(Formacion);
  }
});

router.get("/Consultar", async (req, res) => {
  const consultaForma = await FormacionModel.find(
    {},
    { Unidad_formacion: 1, Area_formacion: 1, Nivel_formacion: 1, _id: 0 }
  );
  const arreglo = [];
  for (const llena in consultaForma) {
    arreglo.push(consultaForma[llena]);
  }
  res.send(arreglo);
});


module.exports = router;