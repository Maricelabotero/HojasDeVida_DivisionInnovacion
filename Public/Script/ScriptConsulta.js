//Petición para llenar lista tipo personal 
document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetch('http://localhost:4000/TipoPersonal/Consultar')
    .then(res => res.json())
    .catch(err => err)
  for (var i in data) {
    document.getElementById(
      'id_Tipo_personal'
    ).innerHTML += `<option value=${data[i].Nombre}>${data[i].Nombre}</option>`
  }
})

//Petición para llenar lista Nivel formación 
document.addEventListener('DOMContentLoaded', async () => {
  const data2 = await fetch('http://localhost:4000/NivelFormacion/Consultar')
    .then(res => res.json())
    .catch(err => err)
  for (var i in data2) {
    document.getElementById(
      'id_Nivel_formacion'
    ).innerHTML += `<option value=${data2[i].Nivel_formacion}>${data2[i].Nivel_formacion}</option>`
  }
})

//De acuerdo a la unidad desplegar las àreas correspondientes
var select = document.getElementById('id_Unidad_formacion');
select.addEventListener('change',
  function () {
    var selectedOption = this.options[select.selectedIndex];
    var Unidad = selectedOption.text;

    if (Unidad == "Agrarias, veterinaria y afines") {
      document.getElementById("id_Area_formacion").innerHTML = "";
      const ConsultarAreaFormacion = async () => {
        const dataA = await fetch('http://localhost:4000/AreaFormacion/ConsultarAgrarias')
          .then(res => res.json())
          .catch(err => err)
        for (var i in dataA) {
          document.getElementById(
            'id_Area_formacion'
          ).innerHTML += `<option value=${dataA[i].Area_formacion}>${dataA[i].Area_formacion}</option>`
        }
      }

      ConsultarAreaFormacion()
    }
    else if (Unidad == "Bellas artes") {
      document.getElementById("id_Area_formacion").innerHTML = "";
      const ConsultarAreaFormacion = async () => {
        const dataA = await fetch('http://localhost:4000/AreaFormacion/ConsultarBellasArtes')
          .then(res => res.json())
          .catch(err => err)
        for (var i in dataA) {
          document.getElementById(
            'id_Area_formacion'
          ).innerHTML += `<option value=${dataA[i].Area_formacion}>${dataA[i].Area_formacion}</option>`
        }
      }

      ConsultarAreaFormacion()
    }
    else if (Unidad == "Ciencias de la educación") {
      document.getElementById("id_Area_formacion").innerHTML = "";
      const ConsultarAreaFormacion = async () => {
        const dataA = await fetch('http://localhost:4000/AreaFormacion/ConsultarCienciasEducacion')
          .then(res => res.json())
          .catch(err => err)
        for (var i in dataA) {
          document.getElementById(
            'id_Area_formacion'
          ).innerHTML += `<option value=${dataA[i].Area_formacion}>${dataA[i].Area_formacion}</option>`
        }
      }

      ConsultarAreaFormacion()
    }
    else if (Unidad == "Ciencias de la salud") {
      document.getElementById("id_Area_formacion").innerHTML = "";
      const ConsultarAreaFormacion = async () => {
        const dataA = await fetch('http://localhost:4000/AreaFormacion/ConsultarCienciasSalud')
          .then(res => res.json())
          .catch(err => err)
        for (var i in dataA) {
          document.getElementById(
            'id_Area_formacion'
          ).innerHTML += `<option value=${dataA[i].Area_formacion}>${dataA[i].Area_formacion}</option>`
        }
      }

      ConsultarAreaFormacion()
    }
    else if (Unidad == "Económica, administración, contaduría y afines") {
      document.getElementById("id_Area_formacion").innerHTML = "";
      const ConsultarAreaFormacion = async () => {
        const dataA = await fetch('http://localhost:4000/AreaFormacion/ConsultarEconomica')
          .then(res => res.json())
          .catch(err => err)
        for (var i in dataA) {
          document.getElementById(
            'id_Area_formacion'
          ).innerHTML += `<option value=${dataA[i].Area_formacion}>${dataA[i].Area_formacion}</option>`
        }
      }

      ConsultarAreaFormacion()
    }
    else if (Unidad == "Ciencias sociales y humanas") {
      document.getElementById("id_Area_formacion").innerHTML = "";
      const ConsultarAreaFormacion = async () => {
        const dataA = await fetch('http://localhost:4000/AreaFormacion/ConsultarCienciasSociales')
          .then(res => res.json())
          .catch(err => err)
        for (var i in dataA) {
          document.getElementById(
            'id_Area_formacion'
          ).innerHTML += `<option value=${dataA[i].Area_formacion}>${dataA[i].Area_formacion}</option>`
        }
      }

      ConsultarAreaFormacion()
    }
    else if (Unidad == "Ingeniería, arquitectura, urbanismo y afines") {
      document.getElementById("id_Area_formacion").innerHTML = "";
      const ConsultarAreaFormacion = async () => {
        const dataA = await fetch('http://localhost:4000/AreaFormacion/ConsultarIngenieria')
          .then(res => res.json())
          .catch(err => err)
        for (var i in dataA) {
          document.getElementById(
            'id_Area_formacion'
          ).innerHTML += `<option value=${dataA[i].Area_formacion}>${dataA[i].Area_formacion}</option>`
        }
      }

      ConsultarAreaFormacion()
    }
    else if (Unidad == "Ciencias exactas") {
      document.getElementById("id_Area_formacion").innerHTML = "";
      const ConsultarAreaFormacion = async () => {
        const dataA = await fetch('http://localhost:4000/AreaFormacion/ConsultarCienciasExactas')
          .then(res => res.json())
          .catch(err => err)
        for (var i in dataA) {
          document.getElementById(
            'id_Area_formacion'
          ).innerHTML += `<option value=${dataA[i].Area_formacion}>${dataA[i].Area_formacion}</option>`
        }
      }

      ConsultarAreaFormacion()
    }
  }
)

//Petición para llenar lista Unidad formación 
document.addEventListener('DOMContentLoaded', async () => {
  const dataU = await fetch('http://localhost:4000/UnidadFormacion/Consultar')
    .then(res => res.json())
    .catch(err => err)
  for (var i in dataU) {
    document.getElementById(
      'id_Unidad_formacion'
    ).innerHTML += `<option value=${dataU[i].Unidad_formacion}>${dataU[i].Unidad_formacion}</option>`
  }
})

//Petición para llenar lista area experiencia
document.addEventListener('DOMContentLoaded', async () => {
  const data2 = await fetch('http://localhost:4000/AreaExperiencia/Consultar')
    .then(res => res.json())
    .catch(err => err)
  for (var i in data2) {
    document.getElementById(
      'id_Area_experiencia'
    ).innerHTML += `<option value=${data2[i].Area_experiencia}>${data2[i].Area_experiencia}</option>`
  }
})
