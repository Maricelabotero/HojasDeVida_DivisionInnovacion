const express = require("express");
const router = express.Router();
const FullPersonal = require("./model");
const ExperienciaModel = require("../Experiencia/model");
const FormacionModel = require("../Formacion/model");
const connection = require('./ConnectionBD')
connection

//INGRESAR
//Recibe los datos después de la validación para ingresarlos a la base de datos
router.post("/Ingresar", (req, res) => {
  //Consultamos las experiencias que pertenezcan a esa cédula
  async function ConsultarE() {
    const consultaExperiencia = await ExperienciaModel.find(
      { Cedula: req.body.Cedula },
      {
        Cedula: 1,
        Entidad: 1,
        Meses_Experiencia: 1,
        Funciones: 1,
        Area_experiencia: 1,
        _id: 1,
      }
    );
    const arregloExperiencias = [];
    for (const llena in consultaExperiencia) {
      arregloExperiencias.push(consultaExperiencia[llena]);
    }


    //Se hace una modificación a la colección Personal y se le agrega el array de experiencia
    async function ConsultarP() {
      const agregar = await FullPersonal.updateMany(
        { Cedula: req.body.Cedula },
        { $push: { Experiencias: arregloExperiencias } }
      );
    }
    ConsultarP();

  }

  //Consultamos las formaciones que pertenezcan a esa cédula      
  async function ConsultarF() {
    const consultaFormacion = await FormacionModel.find(
      { Cedula: req.body.Cedula },
      {
        Cedula: 1,
        Unidad_formacion: 1,
        Area_formacion: 1,
        Nivel_formacion: 1,
        _id: 1,
      }
    );
    const arregloFormacion = [];
    for (const llena in consultaFormacion) {
      arregloFormacion.push(consultaFormacion[llena]);
    }

    //Se hace una modificación a la colección Personal y se le agrega el array de formación
    async function ConsultarP() {
      const agregar = await FullPersonal.updateMany(
        { Cedula: req.body.Cedula },
        { $push: { Formaciones: arregloFormacion } }
      );
    }
    ConsultarP();
  }

  //Se ingresa a la base de datos
  let fullPersonal = new FullPersonal();
  (fullPersonal.Nombre_completo = req.body.Nombre_completo),
    (fullPersonal.Cedula = req.body.Cedula),
    (fullPersonal.Telefono = req.body.Telefono),
    (fullPersonal.Correo = req.body.Correo),
    (fullPersonal.Tipo_personal = req.body.Tipo_personal),
    (fullPersonal.Formacion = ConsultarF()),
    (fullPersonal.Experiencia = ConsultarE()),
    (fullPersonal.OneDrive = req.body.OneDrive),
    (fullPersonal.Imagen = req.body.Imagen),
    fullPersonal.save((err, fullPersonalStored) => {
      if (err)
        res.status(500).send({
          message: `Error al ingresar en la base de datos: ${err}`,
        });

    });
  res.redirect("/");
});




//CONSULTAR
//Manda todos los registros de las personas para mostrar las tarjetas en consultar
router.get("/Consultar", async (req, res) => {
  const consultaPersonal = await FullPersonal.find({}, {}
  );
  const arreglo = [];
  for (const llena in consultaPersonal) {
    arreglo.push(consultaPersonal[llena]);
  }
  res.send(arreglo);
});


//Consultar por varios campos al mismo tiempo
router.all("/ConsultaBusqueda", async (req, res) => {
  body = req.body
  const arregloB = [];

  //Comprobar que si los datos no son indefinidos sea igual a la consulta y que se agregue a un arreglo
  for (var a in body) {
    if (body[a].Nombre != undefined) {
      var nombre = body[a].Nombre;
      Nombre = { Nombre_completo: nombre }
      arregloB.push({ Nombre_completo: { $regex: Nombre.Nombre_completo, $options: 'i' } });
    }

    if (body[a].Cedula != undefined) {
      var cedula = body[a].Cedula;
      Cedula = { Cedula: cedula }
      arregloB.push(Cedula);
    }
  }


  //Consultar por los campos indicados
  const consultaCedula = await FullPersonal.find({
    $and:
      arregloB
  })

  const arreglo = [];
  for (const llena in consultaCedula) {
    arreglo.push(consultaCedula[llena]);
  }
  res.send(arreglo)
}

);



//Consultar por varios campos al mismo tiempo
router.all("/ConsultaExperienciayFormacion", async (req, res) => {
  body = req.body
  const arregloB = [];
  const arregloE = [];

  //Comprobar que si los datos no son indefinidos sea igual a la consulta y que se agregue a un arreglo
  for (var a in body) {
    if (body[a].Experiencia != undefined) {
      var experiencia = body[a].Experiencia;
      Expe = { Experiencia: experiencia }

      arregloB.push({
        $unwind: "$Experiencias"
      },
        {
          $match: {
            "Experiencias.Area_experiencia": Expe.Experiencia
          }
        });
    }
    if (body[a].Meses_Experiencia != undefined) {
      var mesesexperiencia = body[a].Meses_Experiencia;
      MesesExpe = { MesesExperiencia: mesesexperiencia }
      arregloB.push(
        {
          $unwind: "$Experiencias"
        },
        {
          $match: {
            "Experiencias.Meses_Experiencia": MesesExpe.MesesExperiencia
          }
        }
      );
    }
    if (body[a].Unidad_formacion != undefined & body[a].Unidad_formacion != "Selecciona una unidad de formación") {
      var formacion = body[a].Unidad_formacion;
      forma = { Formacion: formacion }
      arregloB.push(
        {
          $unwind: "$Formaciones"
        },
        {
          $match: {
            "Formaciones.Unidad_formacion": forma.Formacion
          }
        }
      );
    }
    if (body[a].Area_formacion != undefined & body[a].Area_formacion != "Selecciona un area de formación") {
      var areaformacion = body[a].Area_formacion;
      Areaforma = { Area_formacion: areaformacion }
      arregloB.push(
        {
          $unwind: "$Formaciones"
        },
        {
          $match: {
            "Formaciones.Area_formacion": Areaforma.Area_formacion
          }
        }
      )
    }
    if (body[a].Nivel_formacion != undefined & body[a].Nivel_formacion != "Selecciona un nivel de formación") {
      var nivelformacion = body[a].Nivel_formacion;
      Nivelforma = { Nivel_formacion: nivelformacion }
      arregloB.push(
        {
          $unwind: "$Formaciones"
        },
        {
          $match: {
            "Formaciones.Nivel_formacion": Nivelforma.Nivel_formacion
          }
        }
      );
    }
  }

  arregloB.forEach(myFunction)

  function myFunction(numero) {
    arregloE.push(numero)
  }

  //Consultar por los campos indicados
  const consultaCedula = await FullPersonal.aggregate(
    arregloE)

  const arreglo = [];
  for (const llena in consultaCedula) {
    arreglo.push(consultaCedula[llena]);
  }
  res.send(arreglo)
});



//ACTUALIZAR
//Recibe el body de script que trae los nuevos datos
router.post("/Actualizar", (req, res) => {

  //Consultamos las experiencias que pertenezcan a esa cédula
  async function ConsultarE() {
    const consultaExperiencia = await ExperienciaModel.find(
      { Cedula: req.body.Cedula },
      {
        Cedula: 1,
        Entidad: 1,
        Meses_Experiencia: 1,
        Funciones: 1,
        Area_experiencia: 1,
        _id: 1,
      }
    );
    const arregloExperiencias = [];
    for (const llena in consultaExperiencia) {
      arregloExperiencias.push(consultaExperiencia[llena]);
    }


    //Se hace una modificación a la colección Personal y se le agrega el array de experiencia
    async function ConsultarP() {
      const agregar = await FullPersonal.updateMany(
        { Cedula: req.body.Cedula },
        { $push: { Experiencias: arregloExperiencias } }
      );
    }
    ConsultarP();

  }

  //Consultamos las formaciones que pertenezcan a esa cédula      
  async function ConsultarF() {
    const consultaFormacion = await FormacionModel.find(
      { Cedula: req.body.Cedula },
      {
        Cedula: 1,
        Unidad_formacion: 1,
        Area_formacion: 1,
        Nivel_formacion: 1,
        _id: 1,
      }
    );
    const arregloFormacion = [];
    for (const llena in consultaFormacion) {
      arregloFormacion.push(consultaFormacion[llena]);
    }

    //Eliminar el array de formaciones para agregar el otro
    //Se hace una modificación a la colección Personal y se le agrega el array de formacion
    async function ConsultarP() {
      const agregar = await FullPersonal.updateMany(
        { Cedula: req.body.Cedula },
        { $push: { Formaciones: arregloFormacion } }
      );
    }
    ConsultarP();
  }

  //sentencia para la cosulta
  let fullPersonal = {
    Nombre_completo: req.body.Nombre_completo,
    Cedula: req.body.Cedula,
    Telefono: req.body.Telefono,
    Correo: req.body.Correo,
    Tipo_personal: req.body.Tipo_personal,
    Formaciones: ConsultarF(),
    Experiencias: ConsultarE(),
    OneDrive: req.body.OneDrive
  }

  console.log(fullPersonal)

  async function Actualizar() {
    await FullPersonal.updateOne(
      { Cedula: req.body.Cedula }, { $set: fullPersonal }
    );
  }
  Actualizar()
  res.redirect("/");
});

//Recibe body para saber si la cédula existe en la base de datos (Script y scriptActualizar)
router.post("/ConsultaCedula", async (req, res) => {
  const consultaCedula = await FullPersonal.find(
    { Cedula: req.body.Cedula }, {}
  );
  const arreglo = [];
  for (const llena in consultaCedula) {
    arreglo.push(consultaCedula[llena]);
  }
  res.json(arreglo)
});

router.all("/Actualizarformaciones", function (req, res) {
  async function ConsultarF() {
    //Se hace una modificación a la colección Personal y se le agrega el array de formación
    const agregar = await FullPersonal.updateMany(
      { Cedula: req.body.Cedula }, { $unset: { 'Formaciones': 1 } });
  }
  ConsultarF();

  async function Consultar() {
    const consultaFormacion = await FormacionModel.find(
      { Cedula: req.body.Cedula },
      {
        Cedula: 1,
        Unidad_formacion: 1,
        Area_formacion: 1,
        Nivel_formacion: 1,
        _id: 1,
      }
    );
    const arregloFormacion = [];
    for (const llena in consultaFormacion) {
      arregloFormacion.push(consultaFormacion[llena]);
    }

    //Se hace una modificación a la colección Personal y se le agrega el array de formación
    async function ConsultarP() {
      const agregar = await FullPersonal.updateMany(
        { Cedula: req.body.Cedula },
        { $push: { Formaciones: arregloFormacion } }
      );
    }
    ConsultarP();
  }
  Consultar()
});


router.all("/ActualizarExperiencias", function (req, res) {
  async function ConsultarE() {
    //Se hace una modificación a la colección Personal y se le agrega el array de formación
    const agregar = await FullPersonal.updateMany(
      { Cedula: req.body.Cedula }, { $unset: { 'Experiencias': 1 } });
  }
  ConsultarE();

  async function Consultar() {
    const consultaExperiencia = await ExperienciaModel.find(
      { Cedula: req.body.Cedula },
      {
        Cedula: 1,
        Funciones: 1,
        Entidad: 1,
        Meses_Experiencia: 1,
        Area_experiencia: 1,
        _id: 1,
      }
    );
    const arregloExperiencia = [];
    for (const llena in consultaExperiencia) {
      arregloExperiencia.push(consultaExperiencia[llena]);
    }

    //Se hace una modificación a la colección Personal y se le agrega el array de Experiencia
    async function ConsultarP() {
      const agregar = await FullPersonal.updateMany(
        { Cedula: req.body.Cedula },
        { $push: { Experiencias: arregloExperiencia } }
      );
    }
    ConsultarP();
  }
  Consultar()
});





//EDITAR
//Recibe cédula de ScriptEditar para llamar las experiencias de esa persona
router.all('/ConsultarExperiencias', async (req, res) => {
  const consultaExperiencia = await FullPersonal.find({ Cedula: req.body.Cedula },
    {
      Experiencias: 1,
      _id: 0,
    }
  );
  res.json(consultaExperiencia)
})

//Recibe cédula de editar para llamar las formaciones de esa persona
router.all('/ConsultarFormacionesIngresar', async (req, res) => {
  const consultaFormacion = await FormacionModel.find(
    { Cedula: req.body.Cedula }, {}
  );
  res.send(consultaFormacion)
})

//Recibe cédula de editar para llamar las formaciones de esa persona
router.all('/ConsultarExperienciasIngresar', async (req, res) => {
  const consultaFormacion = await ExperienciaModel.find(
    { Cedula: req.body.Cedula }, {}
  );
  res.send(consultaFormacion)
})


//Recibe cédula de editar para llamar las formaciones de esa persona
router.all('/ConsultarFormaciones', async (req, res) => {
  const consultaFormacion = await FullPersonal.find(
    { Cedula: req.body.Cedula },
    {
      Formaciones: 1,
      _id: 0
    }
  );
  res.json(consultaFormacion)
})

router.all('/RecibirId', async (req, res) => {
  const consultaCedula = await FullPersonal.find(
    { _id: req.body._id }, {}
  );
  var arregloc = [];
  for (const llena in consultaCedula) {
    arregloc.push(consultaCedula[llena]);
  }
  res.send(arregloc);
})


//Recibe el id de editar para mandar los datos que se mostrarán en el formulario de actualizar
router.all('/ConsultarId', async (req, res) => {
  const consultaCedula = await FullPersonal.find(
    { _id: req.body._id }, {}
  );
  const arreglo = [];
  for (const llena in consultaCedula) {
    arreglo.push(consultaCedula[llena]);
  }
  res.send(arreglo);
})


//ELIMINAR
//Recibe el id de editar para eliminar las formaciones de actualizar
router.delete("/EliminarFormacion", (req, res) => {
  FormacionModel.findOneAndDelete({ _id: req.body._id }).then((res) => {
  })
    .catch((error) => console.error(error));
});

//Recibe el id de editar para eliminar las experiencias de actualizar
router.delete("/EliminarExperiencia", (req, res) => {
  ExperienciaModel.findOneAndDelete({ _id: req.body._id }).then((res) => {
  })
    .catch((error) => console.error(error));
});

//Recibe el id de editar para eliminar las experiencias de actualizar
router.delete("/EliminarHojaDeVida", (req, res) => {
  FullPersonal.findOneAndDelete({ _id: req.body._id }).then((res) => {
  })
    .catch((error) => console.error(error));
});

//Recibe el id de editar para eliminar las formaciones de actualizar
router.delete("/EliminarFormacionCedula", (req, res) => {
  FormacionModel.deleteMany({ Cedula: req.body.Cedula }).then((res) => {
  })
    .catch((error) => console.error(error));
});

//Recibe el id de editar para eliminar las experiencias de actualizar
router.delete("/EliminarExperienciaCedula", (req, res) => {
  ExperienciaModel.deleteMany({ Cedula: req.body.Cedula }).then((res) => {
  })
    .catch((error) => console.error(error));
});

module.exports = router;
