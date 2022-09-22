const express = require("express");
//const Inicio = require("../Public/Inicio.html");
const HojaDeVida = require("../Componentes/HojaDeVida/network");
const NivelFormacion = require("../Componentes/Nivel_Formacion/network");
const Tipo_Personal = require("../Componentes/Tipo_Personal/network");
const UnidadFormacion = require('../Componentes/Unidad_Formacion/network')
const AreaFormacion = require('../Componentes/Area_Formacion/network')
const Formacion = require('../Componentes/Formacion/network')
const Experiencia = require("../Componentes/Experiencia/network");
const Area_Experiencia = require("../Componentes/Area_Experiencia/network");
const Usuario = require("../Componentes/Usuarios/network");

const routes = function (server) {
  //server.use("/Inicio", Inicio),
  server.use("/HojaDeVida", HojaDeVida),
  server.use("/NivelFormacion", NivelFormacion),
  server.use("/TipoPersonal", Tipo_Personal);
  server.use('/UnidadFormacion', UnidadFormacion),
  server.use('/AreaFormacion', AreaFormacion),
  server.use('/Formacion', Formacion),
  server.use("/Experiencia", Experiencia);
  server.use("/AreaExperiencia", Area_Experiencia);
  server.use("/Usuario", Usuario);
};

module.exports = routes;
