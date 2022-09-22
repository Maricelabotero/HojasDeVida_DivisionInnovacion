//Mostrar tarjetas con las personas registradas en la base de datos
document.addEventListener('DOMContentLoaded', async (req, res) => {
  async function MostrarA() {
    const data = await fetch('http://localhost:4000/HojaDeVida/Consultar', {
      mode: 'no-cors',
    })
      .then(res => res.json())
      .catch(err => err)
    for (var i in data) {

      //Mostrar formaciones directamente del registro
      Formaciones = data[i].Formaciones
      for (var j in Formaciones) {
        formacion = Formaciones[j]
        Formaciones1 = []
        for (var a in formacion) {
          Formaciones1.push(`</br>` + ` ${formacion[a].Nivel_formacion} en  ${formacion[a].Unidad_formacion} en el área de ${formacion[a].Area_formacion} `)

        }
      }

      //Mostrar experiencias directamente del registro
      Experiencias = data[i].Experiencias
      for (var j in Experiencias) {
        experiencia = Experiencias[j]
        Experiencias1 = []
        for (var a in experiencia) {
          Experiencias1.push(`</br>` + ` Experiencia en el área de ${experiencia[a].Area_experiencia} como ${experiencia[a].Funciones} en la entidad ${experiencia[a].Entidad} por un periodo de ${experiencia[a].Meses_Experiencia} meses`)

        }

      }

      //Tarjetas de personaas
      document.getElementById(
        'Tarjetas-Personas'
      ).innerHTML += `<div class="col" ><div class="card"><div class="card-body border border border-success ">
      <div class="card-header bg-success text-white fs-4 fst-italic">${data[i].Nombre_completo}</div>
      <p class="card-text border"><p><h5>Descripción:</h5> ${Formaciones1} </br> ${Experiencias1}</p></p>
      <p class="card-text border border-success"><p><h5>Datos de contacto:</h5>${data[i].Telefono} , ${data[i].Correo} </p></p>
      <p class="card-text border border-success"><p><h5>Link OneDrive:</h5>${data[i].OneDrive}</p></p><p class="card-text border border-success"></p>
     <button class="btn btn-outline-info" style="text-align:center" id="${data[i]._id}" onclick="mandarId(this)" formaction="/">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>
    </button>
  </div></div>`
    }

  }
  MostrarA()
})


//Mandar id de la persona a la nueva ventana
function mandarId(elem) {
  const Elid = { _id: elem.id }
  var w = window.open("http://localhost:4000/EditarHojasDeVida.html");
  w.myVariableActualizar = Elid;
}


//Busqueda cédula y muestra las tarjetas con la busqueda
async function Busqueda() {
  const cedula = document.getElementById("IdCedula").value;

  if (cedula == "") {
    swal("Error", "Este campo es obligatorio", "error")
  } else {

    var dataPerson = { Cedula: cedula };
    const data = await fetch('http://localhost:4000/HojaDeVida/ConsultaCedula', {
      method: 'POST', body: JSON.stringify(dataPerson),
      headers: {
        'Content-Type': 'application/json'
      }

    }).then(res => res.json())
      .catch(err => err)
    if (data == "") {
      swal("Error", "No se encontró esta cédula en la base de datos", "error")
    } else {
      //Mostrar tarjetas con las personas buscadas en la base de datos
      for (var i in data) {
        document.getElementById("Tarjetas-Personas").innerHTML = "";
        //Mostrar formaciones directamente del registro
        Formaciones = data[i].Formaciones
        for (var j in Formaciones) {
          formacion = Formaciones[j]
          Formaciones1 = []
          for (var a in formacion) {
            Formaciones1.push(`</br>` + ` ${formacion[a].Nivel_formacion} en  ${formacion[a].Unidad_formacion} en el área de ${formacion[a].Area_formacion} `)

          }
        }

        //Mostrar experiencias directamente del registro
        Experiencias = data[i].Experiencias
        for (var j in Experiencias) {
          experiencia = Experiencias[j]
          Experiencias1 = []
          for (var a in experiencia) {
            Experiencias1.push(`</br>` + ` Experiencia en el área de ${experiencia[a].Area_experiencia} como ${experiencia[a].Funciones} en la entidad ${experiencia[a].Entidad} por un periodo de ${experiencia[a].Meses_Experiencia} meses`)

          }

        }

        //Tarjetas de personaas
        document.getElementById(
          'Tarjetas-Personas'
        ).innerHTML += `<div class="col" ><div class="card"><div class="card-body border border border-success ">
      <div class="card-header bg-success text-white fs-4 fst-italic">${data[i].Nombre_completo}</div>
      <p class="card-text border"><p><h5>Descripción:</h5> ${Formaciones1} </br> ${Experiencias1}</p></p>
      <p class="card-text border border-success"><p><h5>Datos de contacto:</h5>${data[i].Telefono} , ${data[i].Correo} </p></p>
      <p class="card-text border border-success"><p><h5>Link OneDrive:</h5>${data[i].OneDrive}</p></p><p class="card-text border border-success"></p>
     <button class="btn btn-outline-info" id="${data[i]._id}" onclick="mandarId(this)" formaction="/">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
    </svg>
    </button>
  </div></div>`
      }

    }
  }
};

