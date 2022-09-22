const express = require('express');
const router = express.Router();
const UsuarioModel = require('./model');


router.post('/Ingresar', async (req, res) => {
    const Usuario = UsuarioModel.insertMany({
        Usuario: req.body.Usuario,
        Clave: req.body.Clave,
        Tipo_Usuario: req.body.Tipo_Usuario,

    }, { versionKey: false });
    const Area = await Usuario.save;
    console.log(Area)
});

router.all('/Consultar', async (req, res) => {
    console.log(req.body)
    const consultaUsuario = await UsuarioModel.find({ Usuario: req.body.Usuario, Clave: req.body.Clave }, { Usuario: 1, Clave: 1, Tipo_Usuario: 1, _id: 0 });
    const arreglo = [];
    for (const llena in consultaUsuario) {
        arreglo.push(consultaUsuario[llena]);
    }
    res.send(arreglo)
});


module.exports = router;