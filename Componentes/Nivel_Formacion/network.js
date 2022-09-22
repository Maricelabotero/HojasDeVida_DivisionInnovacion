const express = require('express');
const router = express.Router();
const Nivel_FormacionModel = require('./model');


router.get('/Consultar', async (req, res) => {
    const consultaNivel = await Nivel_FormacionModel.find({}, { Nivel_formacion: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaNivel) {
        arreglo.push(consultaNivel[llena]);
    }
    res.send(arreglo)
});



module.exports = router;