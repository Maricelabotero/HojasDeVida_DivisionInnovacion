const express = require('express');
const router = express.Router();
const Area_FormacionModel = require('./model');


router.get('/ConsultarAgrarias', async (req, res) => {
    const consultaArea = await Area_FormacionModel.find({ "Unidad_formacion": "Agrarias, veterinaria y afines" }, { Area_formacion: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaArea) {
        arreglo.push(consultaArea[llena]);
    }
    res.send(arreglo)
});

router.get('/ConsultarBellasArtes', async (req, res) => {
    const consultaArea = await Area_FormacionModel.find({ "Unidad_formacion": "Bellas artes" }, { Area_formacion: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaArea) {
        arreglo.push(consultaArea[llena]);
    }
    res.send(arreglo)
});

router.get('/ConsultarCienciasEducacion', async (req, res) => {
    const consultaArea = await Area_FormacionModel.find({ "Unidad_formacion": "Ciencias de la educación" }, { Area_formacion: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaArea) {
        arreglo.push(consultaArea[llena]);
    }
    res.send(arreglo)
});

router.get('/ConsultarCienciasSalud', async (req, res) => {
    const consultaArea = await Area_FormacionModel.find({ "Unidad_formacion": "Ciencias de la salud" }, { Area_formacion: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaArea) {
        arreglo.push(consultaArea[llena]);
    }
    res.send(arreglo)
});

router.get('/ConsultarEconomica', async (req, res) => {
    const consultaArea = await Area_FormacionModel.find({ "Unidad_formacion": "Económica, administración, contaduría y afines" }, { Area_formacion: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaArea) {
        arreglo.push(consultaArea[llena]);
    }
    res.send(arreglo)
});

router.get('/ConsultarCienciasSociales', async (req, res) => {
    const consultaArea = await Area_FormacionModel.find({ "Unidad_formacion": "Ciencias sociales y humanas" }, { Area_formacion: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaArea) {
        arreglo.push(consultaArea[llena]);
    }
    res.send(arreglo)
});

router.get('/ConsultarIngenieria', async (req, res) => {
    const consultaArea = await Area_FormacionModel.find({ "Unidad_formacion": "Ingeniería, arquitectura, urbanismo y afines" }, { Area_formacion: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaArea) {
        arreglo.push(consultaArea[llena]);
    }
    res.send(arreglo)
});

router.get('/ConsultarCienciasExactas', async (req, res) => {
    const consultaArea = await Area_FormacionModel.find({ "Unidad_formacion": "Ciencias exactas" }, { Area_formacion: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaArea) {
        arreglo.push(consultaArea[llena]);
    }
    res.send(arreglo)
});

router.get('/ConsultarAreas', async (req, res) => {
    const consultaArea = await Area_FormacionModel.find({ Area_formacion: { $ne: 'Otro programa' } }, { Area_formacion: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaArea) {
        arreglo.push(consultaArea[llena]);
    }
    res.send(arreglo)
});

module.exports = router;