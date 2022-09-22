const express = require('express');
const router = express.Router();
const Area_ExperienciaModel = require('./model');


router.post('/Ingresar', async (req, res) => {
    const AExperiencia = Area_ExperienciaModel.insertMany({
        Area_experiencia: req.body.Area_Experiencia,

    }, { versionKey: false });
    const Area = await AExperiencia.save;
    console.log(Area)
});

router.get('/Consultar', async (req, res) => {
    const consultaAreaExperiencia = await Area_ExperienciaModel.find({}, { Area_experiencia: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaAreaExperiencia) {
        arreglo.push(consultaAreaExperiencia[llena]);
    }
    res.send(arreglo)
});


module.exports = router;