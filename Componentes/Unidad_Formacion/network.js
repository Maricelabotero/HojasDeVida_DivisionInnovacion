const express = require('express');
const router = express.Router();
const Unidad_FormacionModel = require('./model');


router.get('/Consultar', async (req, res) => {
    const consultaUnidad = await Unidad_FormacionModel.find({}, { Unidad_formacion: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaUnidad) {
        arreglo.push(consultaUnidad[llena]);
    }
    res.send(arreglo)
});


module.exports = router;