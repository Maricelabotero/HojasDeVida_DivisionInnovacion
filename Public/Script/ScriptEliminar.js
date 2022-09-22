//Alerta para confirmación de eliminar
function SwalDeleteHojaDeVida(id, cedula) {
  Swal.fire({
    title: 'Alerta',
    text: "¿Estás seguro de eliminar este registro?",
    icon: 'warning',
    iconColor: 'red',
    showCancelButton: true,
    confirmButtonColor: '#5BB318',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {

      MandaridPersona(id)
      EliminarFormacionCedula(cedula)
      EliminarExperienciaCedula(cedula)
      Swal.fire(
        'Eliminado!',
        'Registro eliminado correctamente',
        'success'
      )

      function redireccionarPagina() {
        window.location = "/EliminarHojasdeVida.html";
      }
      setTimeout(redireccionarPagina, 2000);

    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      Swal.fire(
        'Cancelado',
        'Tu registro está a salvo',
        'error'
      )
    }
  })
}


//Eliminar la hoja de vida con el id del botón
function MandaridPersona(element) {
  const Elid = { _id: element.id }

  function EliminarPersonaid() {
    fetch('http://localhost:4000/HojaDeVida/EliminarHojaDeVida', {
      method: 'DELETE', body: JSON.stringify(Elid),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).catch(err => err)
  }

  EliminarPersonaid()
}


//Eliminar las formaciones con la cédula eliminada
function EliminarFormacionCedula(cedula) {
  Cedu = { Cedula: cedula }
  fetch('http://localhost:4000/HojaDeVida/EliminarFormacionCedula', {
    method: 'DELETE', body: JSON.stringify(Cedu),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).catch(err => err)
}


//Eliminar las experiencias con la cédula eliminada
function EliminarExperienciaCedula(cedula) {
  Cedu = { Cedula: cedula }
  fetch('http://localhost:4000/HojaDeVida/EliminarExperienciaCedula', {
    method: 'DELETE', body: JSON.stringify(Cedu),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).catch(err => err)
}


//Mostrar tarjetas con las personas registradas en la base de datos
document.addEventListener('DOMContentLoaded', async (req, res) => {
  async function Mostrar() {
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
    <div class="card-header bg-success text-white fs-4 fst-italic" id="nombre">${data[i].Nombre_completo}</div>
    <p class="card-text border"><p><h5>Descripción:</h5> ${Formaciones1} </br> ${Experiencias1}</p></p>
    <p class="card-text border border-success"><p><h5>Datos de contacto:</h5>${data[i].Telefono} , ${data[i].Correo} </p></p>
    <p class="card-text border border-success"><p><h5>Link OneDrive:</h5>${data[i].OneDrive}</p></p><p class="card-text border border-success"></p>
    <button class="btn btn-outline-danger boton" name="${i}" id="${data[i]._id}" formaction="javascript:SwalDeleteHojaDeVida() " onclick="SwalDeleteHojaDeVida(this, ${data[i].Cedula} )"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
   <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
   </svg></button>        </div></div>`


    }
  }
  Mostrar()
});


//Mostrar tarjetas con la cedula buscada 
async function BuscarCedula() {
  const cedula = document.getElementById("Cedula").value;
  Cedu = { Cedula: cedula }
  const data = await fetch('http://localhost:4000/HojaDeVida/ConsultaBusquedaCedula', {
    method: 'POST', body: JSON.stringify(Cedu),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json()).catch(err => err)
  if (data == "") {
    swal("Error", "No se encontro el registro", "error")
  } else {
    document.getElementById("Tarjetas-Personas").innerHTML = "";
    for (var i in data) {
      Formaciones = data[i].Formaciones
      for (var j in Formaciones) {
        formacion = Formaciones[j]
        Formaciones1 = []
        for (var a in formacion) {
          Formaciones1.push(`</br>` + ` ${formacion[a].Nivel_formacion} en  ${formacion[a].Unidad_formacion} en el área de ${formacion[a].Area_formacion} `)

        }
      }


      Experiencias = data[i].Experiencias
      for (var j in Experiencias) {
        experiencia = Experiencias[j]
        Experiencias1 = []
        for (var a in experiencia) {
          Experiencias1.push(`</br>` + ` Experiencia en el área de ${experiencias[a].Area_experiencia} como ${experiencia[a].Funciones} en la entidad ${experiencia[a].Entidad} por un periodo de ${experiencia[a].Meses_Experiencia} meses`)

        }

      }

      document.getElementById(
        'Tarjetas-Personas'
      ).innerHTML += `<div class="col" ><div class="card"><div class="card-body border border border-success ">
    <div class="card-header bg-success text-white fs-4 fst-italic" id="nombre">${data[i].Nombre_completo}</div>
    <p class="card-text border"><p><h5>Descripción:</h5> ${Formaciones1} </br> ${Experiencias1}</p></p>
    <p class="card-text border border-success"><p><h5>Datos de contacto:</h5>${data[i].Telefono} , ${data[i].Correo} </p></p>
    <p class="card-text border border-success"><p><h5>Link OneDrive:</h5>${data[i].OneDrive}</p></p><p class="card-text border border-success"></p>
    <button class="btn btn-outline-danger boton" name="${i}" id="${data[i]._id}" formaction="javascript:SwalDeleteHojaDeVida() " onclick="SwalDeleteHojaDeVida(this, ${data[i].Cedula} )"> 
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
   <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
   </svg></button>        </div></div>`


    }
  }
}
