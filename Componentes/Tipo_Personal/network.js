const express = require('express');
const router = express.Router();
const Tipo_PersonalModel = require('./model');

//Consulta de los tipos de personal
router.get('/Consultar', async (req, res) => {
    const consultaTipo = await Tipo_PersonalModel.find({}, { Nombre: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaTipo) {
        arreglo.push(consultaTipo[llena]);
    }
    res.send(arreglo)
    console.log(arreglo)
});

//Consulta de los tipos de personal
router.all('/ConsultarEditar', async (req, res) => {
    const consultaTipo = await Tipo_PersonalModel.find({ Nombre: { $ne: req.body.Nombre } }, { Nombre: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaTipo) {
        arreglo.push(consultaTipo[llena]);
    }
    res.send(arreglo)
});

module.exports = router;