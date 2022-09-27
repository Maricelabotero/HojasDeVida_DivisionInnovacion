
//Mostrar tarjetas con las personas registradas en la base de datos
document.addEventListener('DOMContentLoaded', async (req, res) => {
    Mostrar()
});

async function Mostrar() {
    const data = await fetch('https://hojas-de-vida.herokuapp.com/HojaDeVida/Consultar', {
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
      <div class="card-header bg-success text-white fs-4 fst-italic" id="Nombretarjeta">${data[i].Nombre_completo}</div>
      <p class="card-text border"><p><h5>Descripción:</h5> ${Formaciones1} </br> ${Experiencias1}</p></p>
      <p class="card-text border border-success"><p><h5>Datos de contacto:</h5>${data[i].Telefono} , ${data[i].Correo} </p></p>
      <p class="card-text border border-success"><p><h5>Link OneDrive:</h5>${data[i].OneDrive}</p></p><p class="card-text border border-success"></p>
      <button class="btn btn-outline-primary boton" id="${data[i]._id}" onclick="mandarId(this)" formaction="/"
     ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
      </svg></button>        </div></div>`

    }
}


//Llenar lista desplegable de unidad de formacion
document.addEventListener('DOMContentLoaded', async () => {
    const dataU = await fetch('https://hojas-de-vida.herokuapp.com/UnidadFormacion/Consultar')
        .then(res => res.json())
        .catch(err => err)
    for (var i in dataU) {
        document.getElementById(
            'idFormacion'
        ).innerHTML += `<option value=${dataU[i].Unidad_formacion}>${dataU[i].Unidad_formacion}</option>`
    }
})

//Llenar lista desplegable de area de formaciòn
document.addEventListener('DOMContentLoaded', async () => {
    const dataU = await fetch('https://hojas-de-vida.herokuapp.com/AreaFormacion/ConsultarAreas')
        .then(res => res.json())
        .catch(err => err)
    for (var i in dataU) {
        document.getElementById(
            'idAreaFormacion'
        ).innerHTML += `<option value=${dataU[i].Area_formacion}>${dataU[i].Area_formacion}</option>`
    }
})

//Petición para llenar lista Nivel formación 
document.addEventListener('DOMContentLoaded', async () => {
    const data2 = await fetch('https://hojas-de-vida.herokuapp.com/NivelFormacion/Consultar')
        .then(res => res.json())
        .catch(err => err)
    for (var i in data2) {
        document.getElementById(
            'idNivelFormacion'
        ).innerHTML += `<option value=${data2[i].Nivel_formacion}>${data2[i].Nivel_formacion}</option>`
    }
})

//Petición para llenar lista área experiencia
document.addEventListener('DOMContentLoaded', async () => {
    const data2 = await fetch('https://hojas-de-vida.herokuapp.com/AreaExperiencia/Consultar')
        .then(res => res.json())
        .catch(err => err)
    for (var i in data2) {
        document.getElementById(
            'idAreaExperiencia'
        ).innerHTML += `<option value=${data2[i].Area_experiencia}>${data2[i].Area_experiencia}</option>`
    }
})



//Mandar id de la persona a la nueva ventana de hoja de vida
function mandarId(elem) {
    const Elid = { _id: elem.id }
    var w = window.open("https://hojas-de-vida.herokuapp.com/HojaDeVida.html");
    w.myVariable = Elid;
}



//Limpiar campos de nombre, cédula y tarjetas
function LimpiarNombreyCedula() {
    document.getElementById("idNombreCompleto").value = "";
    document.getElementById("idCedula").value = "";
    document.getElementById("Tarjetas-Personas").innerHTML = "";

    Mostrar()

}

//Limpiar campos de experiencias, formaciones y tarjetas
function LimpiarExperienciasyFormaciones() {
    document.getElementById("idAreaExperiencia").value = "";
    document.getElementById("idMesesexperiencia").value = "";
    document.getElementById("idFormacion").value = "";
    document.getElementById("idAreaFormacion").value = "";
    document.getElementById("idNivelFormacion").value = "";
    document.getElementById("Tarjetas-Personas").innerHTML = "";

    const tablaexperiencia = document.getElementById("Tabla-Experiencia")
    tablaexperiencia.innerHTML = `<table class="table margin-table" ><thead class="thead-light"><tr><th>Experiencia</th></tr></thead></table>`;
    const tablameses = document.getElementById("Tabla-Meses")
    tablameses.innerHTML = `<table class="table margin-table" ><thead class="thead-light"><tr><th> Meses experiencia </th></tr></thead></table>`;
    const tablaformacion = document.getElementById("Tabla-Formacion")
    tablaformacion.innerHTML = `<table class="table margin-table" ><thead class="thead-light"><tr><th> Formacion </th></tr></thead></table>`;
    const tablaarea = document.getElementById("Tabla-Area")
    tablaarea.innerHTML = `<table class="table margin-table" ><thead class="thead-light"><tr><th> Area formacion </th></tr></thead></table>`;
    const tablanivel = document.getElementById("Tabla-Nivel")
    tablanivel.innerHTML = `<table class="table margin-table" ><thead class="thead-light"><tr><th> Nivel formacion </th></tr></thead></table>`;
    Mostrar()

}

//Agregar al array los campos que no están vacios para la consulta por nommbre y cédula
async function TraerDatosBusqueda() {
    const Nombre = document.getElementById("idNombreCompleto").value;
    const Cedula = document.getElementById("idCedula").value;

    const arregloBusqueda = [];
    if (Nombre == "" & Cedula == "") {
        swal("Error", "Ingresa por lo menos una opción para buscar", "error")
    } else {
        nombre = `${Nombre}`
        cedula = `${Cedula}`

        if (Nombre != "") {
            NOMBRE = { Nombre: nombre }
            arregloBusqueda.push(NOMBRE);
        }
        if (Cedula != "") {
            CEDULA = { Cedula: cedula }
            arregloBusqueda.push(CEDULA);
        }

        //Enviar datos de consulta
        const data = await fetch('https://hojas-de-vida.herokuapp.com/HojaDeVida/ConsultaBusqueda', {
            method: 'POST', body: JSON.stringify(arregloBusqueda),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => err)

        //Si recibe vacío, muestra la alerta, si no muestra el resultado de la consulta en las tarjetas
        if (data == "") {
            swal("Error", "No se encontró el registro", "error")
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
                        Experiencias1.push(`</br>` + ` Experiencia en el área de ${experiencia[a].Area_experiencia} como ${experiencia[a].Funciones} en la entidad ${experiencia[a].Entidad} por un periodo de ${experiencia[a].Meses_Experiencia} meses`)

                    }

                }


                //Tarjetas de personaas
                document.getElementById(
                    'Tarjetas-Personas'
                ).innerHTML += `<div class="col" ><div class="card"><div class="card-body border border border-success ">
      <div class="card-header bg-success text-white fs-4 fst-italic" id="Nombretarjeta">${data[i].Nombre_completo}</div>
      <p class="card-text border"><p><h5>Descripción:</h5> ${Formaciones1} </br> ${Experiencias1}</p></p>
      <p class="card-text border border-success"><p><h5>Datos de contacto:</h5>${data[i].Telefono} , ${data[i].Correo} </p></p>
      <p class="card-text border border-success"><p><h5>Link OneDrive:</h5>${data[i].OneDrive}</p></p><p class="card-text border border-success"></p>
      <button class="btn btn-outline-primary boton" id="${data[i]._id}" onclick="mandarId(this)" formaction="/"
     ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
      </svg></button>        </div></div>`

            }
        }
    }
}



//Agregar al array los campos que no están vacios para la consulta
async function TraerDatosBusquedaExpeyForma() {
    var conteo = 0
    var conteoExperiencia = 0
    var conteoFormacion = 0

    const MesesExperiencia = document.getElementById("idMesesexperiencia").value;
    const selectE = document.getElementById("idAreaExperiencia");
    var AreaExperiencia = selectE.options[selectE.selectedIndex].text
    const selectF = document.getElementById("idFormacion");
    var Formacion = selectF.options[selectF.selectedIndex].text
    const selectA = document.getElementById("idAreaFormacion");
    var AreaFormacion = selectA.options[selectA.selectedIndex].text
    const selectN = document.getElementById("idNivelFormacion");
    var NivelFormacion = selectN.options[selectN.selectedIndex].text

    const arregloBusqueda = [];
    if (AreaExperiencia == "Selecciona un área de experiencia" & MesesExperiencia == "" & Formacion == "Selecciona una unidad de formación" & AreaFormacion == "Selecciona un area de formación" & NivelFormacion == "Selecciona un nivel de formación") {
        swal("Error", "Ingresa por lo menos una opcion para buscar", "error")
    } else {
        experiencia = `${AreaExperiencia}`
        mesesexperiencia = `${MesesExperiencia}`
        formacion = `${Formacion}`
        areaformacion = `${AreaFormacion}`
        nivelformacion = `${NivelFormacion}`

        //Si trae este campo de busqueda, se agrega el objeto al array
        if (AreaExperiencia != "" & AreaExperiencia != "Selecciona un área de experiencia") {
            EXPERIENCIA = { Experiencia: experiencia }
            arregloBusqueda.push(EXPERIENCIA);
            conteo = conteo + 1
            conteoExperiencia = conteoExperiencia + 1
        }
        if (MesesExperiencia != "") {
            MESESEXPERIENCIA = { Meses_Experiencia: mesesexperiencia }
            arregloBusqueda.push(MESESEXPERIENCIA);
            conteo = conteo + 1
            conteoExperiencia = conteoExperiencia + 1
        }
        if (Formacion != "" & Formacion != "Selecciona una unidad de formación") {
            FORMACION = { Unidad_formacion: formacion }
            arregloBusqueda.push(FORMACION);
            conteo = conteo + 1
            conteoFormacion = conteoFormacion + 1
        }
        if (AreaFormacion != "" & AreaFormacion != "Selecciona un area de formación") {
            AREAFORMACION = { Area_formacion: areaformacion }
            arregloBusqueda.push(AREAFORMACION);
            conteo = conteo + 1
            conteoFormacion = conteoFormacion + 1
        }
        if (NivelFormacion != "" & NivelFormacion != "Selecciona un nivel de formación") {
            NIVELFORMACION = { Nivel_formacion: nivelformacion }
            arregloBusqueda.push(NIVELFORMACION);
            conteo = conteo + 1
            conteoFormacion = conteoFormacion + 1
        }

        console.log(arregloBusqueda)
        //Enviar datos de consulta
        const data = await fetch('https://hojas-de-vida.herokuapp.com/HojaDeVida/ConsultaExperienciayFormacion', {
            method: 'POST', body: JSON.stringify(arregloBusqueda),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => err)
        //Si recibe vacío, muestra la alerta, si no muestra el resultado de la consulta en las tarjetas
        if (data == "") {
            swal("Error", "No se encontró el registro", "error")
        } else {
            document.getElementById("Tarjetas-Personas").innerHTML = "";
            console.log("formaciones", data.Formaciones)
            for (var i in data) {

                formaciones = data[i].Formaciones
                console.log("formaciones", formaciones)
                console.log("formaciones.leght", formaciones.length)
                console.log("conteo formaciones", conteoFormacion)


                Experiencias = data[i].Experiencias
                console.log("experiencias", Experiencias)
                console.log("experiencias.leght", Experiencias.length)
                console.log("conteo experiencias", conteoExperiencia)



                Formaciones1 = []
                Experiencias1 = []
                //Hace validaciones de acuerdo a las posibles consultas
                //Consulta formaciones
                if (formaciones.length == undefined & Experiencias.length != undefined & conteoExperiencia == 0 & conteoFormacion >= 2) {
                    console.log("1")
                    for (var m = 5; m < 6; m++) {
                        Formaciones1.push(`</br>` + ` ${formaciones.Nivel_formacion} en  ${formaciones.Unidad_formacion} en el área de ${formaciones.Area_formacion} `)
                    }


                    for (var j in Experiencias) {
                        experiencia = Experiencias[j]
                        Experiencias1 = []
                        for (var a in experiencia) {
                            Experiencias1.push(`</br>` + ` Experiencia en el área de ${experiencia[a].Area_experiencia} como ${experiencia[a].Funciones} en la entidad ${experiencia[a].Entidad} por un periodo de ${experiencia[a].Meses_Experiencia} meses`)

                        }

                    }

                } else {

                    //Consulta experiencias
                    if (formaciones.length != undefined & Experiencias.length == undefined & conteoExperiencia >= 1 & conteoFormacion == 0) {
                        console.log("2")
                        for (var j in formaciones) {
                            formacion = formaciones[j]
                            for (var a in formacion) {
                                Formaciones1.push(`</br>` + ` ${formacion[a].Nivel_formacion} en  ${formacion[a].Unidad_formacion} en el área de ${formacion[a].Area_formacion} `)

                            }
                        }


                        for (var m = 5; m < 6; m++) {
                            Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias.Area_experiencia} como ${Experiencias.Funciones} en la entidad ${Experiencias.Entidad} por un periodo de ${Experiencias.Meses_Experiencia} meses`)
                        }

                    } else {

                        //Consulta todos los campos y 2 y 2
                        if (formaciones.length == undefined & Experiencias.length == undefined & conteoExperiencia == 2 & conteoFormacion >= 2) {
                            console.log("3")
                            for (var m = 5; m < 6; m++) {
                                Formaciones1.push(`</br>` + ` ${formaciones.Nivel_formacion} en  ${formaciones.Unidad_formacion} en el área de ${formaciones.Area_formacion} `)
                            }


                            for (var m = 5; m < 6; m++) {
                                Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias.Area_experiencia} como ${Experiencias.Funciones} en la entidad ${Experiencias.Entidad} por un periodo de ${Experiencias.Meses_Experiencia} meses`)
                            }
                        }
                        else {

                            //1 y 1
                            if (formaciones.length != undefined & Experiencias.length != undefined & conteoExperiencia == 1 & conteoFormacion == 1) {
                                console.log("4")
                                for (var a in formaciones) {
                                    Formaciones1.push(`</br>` + ` ${formaciones[a].Nivel_formacion} en  ${formaciones[a].Unidad_formacion} en el área de ${formaciones[a].Area_formacion} `)

                                }


                                for (var j in Experiencias) {
                                    Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias[j].Area_experiencia} como ${Experiencias[j].Funciones} en la entidad ${Experiencias[j].Entidad} por un periodo de ${Experiencias[j].Meses_Experiencia} meses`)

                                }

                            }
                            else {

                                //2 o 3 formaciones y 1 experiencia
                                if (formaciones.length == undefined & Experiencias.length != undefined & conteoExperiencia == 1 & conteoFormacion >= 2) {
                                    console.log("5")
                                    for (var m = 5; m < 6; m++) {
                                        Formaciones1.push(`</br>` + ` ${formaciones.Nivel_formacion} en  ${formaciones.Unidad_formacion} en el área de ${formaciones.Area_formacion} `)
                                    }


                                    for (var j in Experiencias) {
                                        Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias[j].Area_experiencia} como ${Experiencias[j].Funciones} en la entidad ${Experiencias[j].Entidad} por un periodo de ${Experiencias[j].Meses_Experiencia} meses`)

                                    }

                                } else {
                                    if (formaciones.length != undefined & Experiencias.length == undefined & conteoExperiencia == 2 & conteoFormacion <= 2) {
                                        console.log("6")
                                        for (var a in formaciones) {
                                            Formaciones1.push(`</br>` + ` ${formaciones[a].Nivel_formacion} en  ${formaciones[a].Unidad_formacion} en el área de ${formaciones[a].Area_formacion} `)

                                        }


                                        for (var m = 5; m < 6; m++) {
                                            Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias.Area_experiencia} como ${Experiencias.Funciones} en la entidad ${Experiencias.Entidad} por un periodo de ${Experiencias.Meses_Experiencia} meses`)
                                        }

                                    } else {
                                        //1 experiencia
                                        if (formaciones.length != undefined & Experiencias.length != undefined & conteoExperiencia == 1 & conteoFormacion == 0) {
                                            console.log("7")
                                            for (var j in formaciones) {
                                                formacion = formaciones[j]
                                                for (var a in formacion) {
                                                    Formaciones1.push(`</br>` + ` ${formacion[a].Nivel_formacion} en  ${formacion[a].Unidad_formacion} en el área de ${formacion[a].Area_formacion} `)

                                                }
                                            }

                                            for (var j in Experiencias) {
                                                Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias[j].Area_experiencia} como ${Experiencias[j].Funciones} en la entidad ${Experiencias[j].Entidad} por un periodo de ${Experiencias[j].Meses_Experiencia} meses`)

                                            }
                                        } else {
                                            //1 formación
                                            if (formaciones.length != undefined & Experiencias.length != undefined & conteoExperiencia == 0 & conteoFormacion == 1) {
                                                console.log("8")
                                                for (var a in formaciones) {
                                                    Formaciones1.push(`</br>` + ` ${formaciones[a].Nivel_formacion} en  ${formaciones[a].Unidad_formacion} en el área de ${formaciones[a].Area_formacion} `)

                                                }

                                                for (var j in Experiencias) {
                                                    experiencia = Experiencias[j]
                                                    Experiencias1 = []
                                                    for (var a in experiencia) {
                                                        Experiencias1.push(`</br>` + ` Experiencia en el área de ${experiencia[a].Area_experiencia} como ${experiencia[a].Funciones} en la entidad ${experiencia[a].Entidad} por un periodo de ${experiencia[a].Meses_Experiencia} meses`)

                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                document.getElementById(
                    'Tarjetas-Personas'
                ).innerHTML += `<div class="col" ><div class="card"><div class="card-body border border border-success ">
        <div class="card-header bg-success text-white fs-4 fst-italic">${data[i].Nombre_completo}</div>
        <p class="card-text border"><p><h5>Descripción:</h5> ${Formaciones1} </br> ${Experiencias1}</p></p>
        <p class="card-text border border-success"><p><h5>Datos de contacto:</h5>${data[i].Telefono} , ${data[i].Correo} </p></p>
        <p class="card-text border border-success"><p><h5>Link OneDrive:</h5>${data[i].OneDrive}</p></p><p class="card-text border border-success"></p>  
        <button class="btn btn-outline-success boton" id="${data[i]._id}" onclick="mandarId(this)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
      </svg>
      </button>`
            }
        }
    }
}



//Acción botón descargar excel con todas las hojas de vida y crea una tabla con los registros
async function ConsultaExcel() {
    document.getElementById(
        'TablaExcel'
    ).innerHTML += `            <tr>
    <tr>
        <th>Nombre completo</th>
        <th>Cedula</th>
        <th>Telefono</th>
        <th>Correo</th>
        <th>Tipo de personal</th>
        <th>One Drive</th>
        <th>Formaciones</th>
        <th>Experiencias</th>
    </tr>`

    const data = await fetch('https://hojas-de-vida.herokuapp.com/HojaDeVida/Consultar', {
        mode: 'no-cors',
    })
        .then(res => res.json())
        .catch(err => err)
    for (var i in data) {

        //Mostrar formaciones directamente del registro
        Formaciones = data[i].Formaciones
        console.log(Formaciones)
        for (var j in Formaciones) {
            formacion = Formaciones[j]
            Formaciones1 = []
            console.log(formacion)
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
            'TablaExcel'
        ).innerHTML += `
    <tr>
        <th>${data[i].Nombre_completo}</th>
        <th>${data[i].Cedula}</th>
        <th>${data[i].Telefono}</th>
        <th>${data[i].Correo}</th>
        <th>${data[i].Tipo_personal}</th>
        <th>${data[i].OneDrive}</th>
        <th>${Formaciones1} </th>
        <th>${Experiencias1}</th>
    </tr>`

    }

    //Función para descargar excel con las hojas de vida
    function exportTableToExcel(tableID, filename = '') {
        var downloadLink;
        var dataType = 'application/vnd.ms-excel';
        var tableSelect = document.getElementById('TablaExcel');
        var tableHTML = tableSelect.outerHTML
        var Escape = escape(tableHTML)
        // Specify file name
        filename = filename ? filename + '.xlsx' : 'Hojas de vida.xls';

        // Create download link element
        downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            var blob = new Blob(['UTF-8', Escape], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + Escape;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
        }
    }
    exportTableToExcel()

    //Recarga la página para no mostrar la tabla
    function redireccionarPagina() {
        window.location = "/ConsultarHojasdeVidaAdministrador.html";
    }
    setTimeout(redireccionarPagina, 1000);
}



//Acción botón descargar excel con las hojas de vida que cumplen con los requisitos y crea una tabla con los registros
async function ConsultaExcelConsulta() {

    var conteo = 0
    var conteoExperiencia = 0
    var conteoFormacion = 0

    const MesesExperiencia = document.getElementById("idMesesexperiencia").value;
    const selectE = document.getElementById("idAreaExperiencia");
    var AreaExperiencia = selectE.options[selectE.selectedIndex].text
    const selectF = document.getElementById("idFormacion");
    var Formacion = selectF.options[selectF.selectedIndex].text
    const selectA = document.getElementById("idAreaFormacion");
    var AreaFormacion = selectA.options[selectA.selectedIndex].text
    const selectN = document.getElementById("idNivelFormacion");
    var NivelFormacion = selectN.options[selectN.selectedIndex].text

    const Nombre = document.getElementById("idNombreCompleto").value;
    const Cedula = document.getElementById("idCedula").value;


    const arregloBusqueda = [];
    console.log(AreaExperiencia, MesesExperiencia, Formacion, AreaFormacion, NivelFormacion)
    if (AreaExperiencia == "Selecciona un área de experiencia" & MesesExperiencia == "" & Formacion == "Selecciona una unidad de formación" & AreaFormacion == "Selecciona un area de formación" & NivelFormacion == "Selecciona un nivel de formación" & Nombre == "" & Cedula == "") {
        swal("Error", "Agregue una consulta", "error")
    } else if (AreaExperiencia == "Selecciona un área de experiencia" & MesesExperiencia == "" & Formacion == "Selecciona una unidad de formación" & AreaFormacion == "Selecciona un area de formación" & NivelFormacion == "Selecciona un nivel de formación") {

        document.getElementById(
            'TablaExcelConsulta'
        ).innerHTML += `            <tr>
          <tr>
              <th>Nombre completo</th>
              <th>Cedula</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Tipo de personal</th>
              <th>One Drive</th>
              <th>Formaciones</th>
              <th>Experiencias</th>
          </tr>`

        nombre = `${Nombre}`
        cedula = `${Cedula}`

        if (Nombre != "") {
            NOMBRE = { Nombre: nombre }
            arregloBusqueda.push(NOMBRE);
        }
        if (Cedula != "") {
            CEDULA = { Cedula: cedula }
            arregloBusqueda.push(CEDULA);
        }

        //Enviar datos de consulta
        const data = await fetch('https://hojas-de-vida.herokuapp.com/HojaDeVida/ConsultaBusqueda', {
            method: 'POST', body: JSON.stringify(arregloBusqueda),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => err)

        //Si recibe vacío, muestra la alerta, si no muestra el resultado de la consulta en las tarjetas
        if (data == "") {
            swal("Error", "No se encontró el registro", "error")
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
                        Experiencias1.push(`</br>` + ` Experiencia en el área de ${experiencia[a].Area_experiencia} como ${experiencia[a].Funciones} en la entidad ${experiencia[a].Entidad} por un periodo de ${experiencia[a].Meses_Experiencia} meses`)

                    }

                }


                //Tarjetas de personaas
                document.getElementById(
                    'TablaExcelConsulta'
                ).innerHTML += `
        <tr>
        <th>${data[i].Nombre_completo}</th>
        <th>${data[i].Cedula}</th>
        <th>${data[i].Telefono}</th>
        <th>${data[i].Correo}</th>
        <th>${data[i].Tipo_personal}</th>
        <th>${data[i].OneDrive}</th>
        <th>${Formaciones1} </th>
        <th>${Experiencias1}</th>
        </tr>`

            }

            //Función para descargar excel con las hojas de vida consultadas
            function exportTableToExcel(tableID, filename = '') {
                var downloadLink;
                var dataType = 'application/vnd.ms-excel; charset=UTF-8';
                var tableSelect = document.getElementById('TablaExcelConsulta');
                var tableHTML = tableSelect.outerHTML
                var Escape = escape(tableHTML)
                // Specify file name
                filename = filename ? filename + '.xlsx' : 'Consulta Hojas de vida.xls';

                // Create download link element
                downloadLink = document.createElement("a");

                document.body.appendChild(downloadLink);

                if (navigator.msSaveOrOpenBlob) {
                    //<meta charset="UTF-8"></meta>
                    var blob = new Blob(['\UTF-8', Escape], {
                        type: dataType
                    });
                    navigator.msSaveOrOpenBlob(blob, filename);
                } else {
                    // Create a link to the file
                    downloadLink.href = 'data:' + dataType + ', ' + Escape;

                    // Setting the file name
                    downloadLink.download = filename;

                    //triggering the function
                    downloadLink.click();
                }
            }
            exportTableToExcel()
            //Recarga la página para no mostrar la tabla
            function redireccionarPagina() {
                window.location = "/ConsultarHojasdeVidaAdministrador.html";
            }
            setTimeout(redireccionarPagina, 0000);

        }


    } else {
        
        document.getElementById(
            'TablaExcelConsulta'
          ).innerHTML += `            <tr>
          <tr>
              <th>Nombre completo</th>
              <th>Cedula</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Tipo de personal</th>
              <th>One Drive</th>
              <th>Formaciones</th>
              <th>Experiencias</th>
          </tr>`

        experiencia = `${AreaExperiencia}`
        mesesexperiencia = `${MesesExperiencia}`
        formacion = `${Formacion}`
        areaformacion = `${AreaFormacion}`
        nivelformacion = `${NivelFormacion}`

        //Si trae este campo de busqueda, se agrega el objeto al array
        if (AreaExperiencia != "" & AreaExperiencia != "Selecciona un área de experiencia") {
            EXPERIENCIA = { Experiencia: experiencia }
            arregloBusqueda.push(EXPERIENCIA);
            conteo = conteo + 1
            conteoExperiencia = conteoExperiencia + 1
        }
        if (MesesExperiencia != "") {
            MESESEXPERIENCIA = { Meses_Experiencia: mesesexperiencia }
            arregloBusqueda.push(MESESEXPERIENCIA);
            conteo = conteo + 1
            conteoExperiencia = conteoExperiencia + 1
        }
        if (Formacion != "" & Formacion != "Selecciona una unidad de formación") {
            FORMACION = { Unidad_formacion: formacion }
            arregloBusqueda.push(FORMACION);
            conteo = conteo + 1
            conteoFormacion = conteoFormacion + 1
        }
        if (AreaFormacion != "" & AreaFormacion != "Selecciona un area de formación") {
            AREAFORMACION = { Area_formacion: areaformacion }
            arregloBusqueda.push(AREAFORMACION);
            conteo = conteo + 1
            conteoFormacion = conteoFormacion + 1
        }
        if (NivelFormacion != "" & NivelFormacion != "Selecciona un nivel de formación") {
            NIVELFORMACION = { Nivel_formacion: nivelformacion }
            arregloBusqueda.push(NIVELFORMACION);
            conteo = conteo + 1
            conteoFormacion = conteoFormacion + 1
        }



        console.log(JSON.stringify(arregloBusqueda));
        console.log("arreglo", arregloBusqueda);

        //Enviar datos de consulta
        const data = await fetch('https://hojas-de-vida.herokuapp.com/HojaDeVida/ConsultaExperienciayFormacion', {
            method: 'POST', body: JSON.stringify(arregloBusqueda),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(err => err)
        console.log(data)
        //Si recibe vacío, muestra la alerta, si no muestra el resultado de la consulta en las tarjetas
        if (data == "") {
            swal("Error", "No se encontró el registro", "error")
        } else {
            document.getElementById("Tarjetas-Personas").innerHTML = "";
            console.log("formaciones", data.Formaciones)
            for (var i in data) {

                formaciones = data[i].Formaciones
                console.log("formaciones", formaciones)
                console.log("formaciones.leght", formaciones.length)


                Experiencias = data[i].Experiencias
                console.log("experiencias", Experiencias)
                console.log("experiencias.leght", Experiencias.length)



                Formaciones1 = []
                Experiencias1 = []

                //Hace validaciones de acuerdo a las posibles consultas
                //Consulta formaciones
                if (formaciones.length == undefined & Experiencias.length != undefined & conteoExperiencia == 0 & conteoFormacion >= 2) {
                    console.log("1")
                    for (var m = 5; m < 6; m++) {
                        Formaciones1.push(`</br>` + ` ${formaciones.Nivel_formacion} en  ${formaciones.Unidad_formacion} en el área de ${formaciones.Area_formacion} `)
                    }


                    for (var j in Experiencias) {
                        experiencia = Experiencias[j]
                        Experiencias1 = []
                        for (var a in experiencia) {
                            Experiencias1.push(`</br>` + ` Experiencia en el área de ${experiencia[a].Area_experiencia} como ${experiencia[a].Funciones} en la entidad ${experiencia[a].Entidad} por un periodo de ${experiencia[a].Meses_Experiencia} meses`)

                        }

                    }

                } else {

                    //Consulta experiencias
                    if (formaciones.length != undefined & Experiencias.length == undefined & conteoExperiencia >= 1 & conteoFormacion == 0) {
                        console.log("2")
                        for (var j in formaciones) {
                            formacion = formaciones[j]
                            for (var a in formacion) {
                                Formaciones1.push(`</br>` + ` ${formacion[a].Nivel_formacion} en  ${formacion[a].Unidad_formacion} en el área de ${formacion[a].Area_formacion} `)

                            }
                        }


                        for (var m = 5; m < 6; m++) {
                            Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias.Area_experiencia} como ${Experiencias.Funciones} en la entidad ${Experiencias.Entidad} por un periodo de ${Experiencias.Meses_Experiencia} meses`)
                        }

                    } else {

                        //Consulta todos los campos y 2 y 2
                        if (formaciones.length == undefined & Experiencias.length == undefined & conteoExperiencia == 2 & conteoFormacion >= 2) {
                            console.log("3")
                            for (var m = 5; m < 6; m++) {
                                Formaciones1.push(`</br>` + ` ${formaciones.Nivel_formacion} en  ${formaciones.Unidad_formacion} en el área de ${formaciones.Area_formacion} `)
                            }


                            for (var m = 5; m < 6; m++) {
                                Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias.Area_experiencia} como ${Experiencias.Funciones} en la entidad ${Experiencias.Entidad} por un periodo de ${Experiencias.Meses_Experiencia} meses`)
                            }
                        }
                        else {

                            //1 y 1
                            if (formaciones.length != undefined & Experiencias.length != undefined & conteoExperiencia == 1 & conteoFormacion == 1) {
                                console.log("4")
                                for (var a in formaciones) {
                                    Formaciones1.push(`</br>` + ` ${formaciones[a].Nivel_formacion} en  ${formaciones[a].Unidad_formacion} en el área de ${formaciones[a].Area_formacion} `)

                                }


                                for (var j in Experiencias) {
                                    Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias[j].Area_experiencia} como ${Experiencias[j].Funciones} en la entidad ${Experiencias[j].Entidad} por un periodo de ${Experiencias[j].Meses_Experiencia} meses`)

                                }

                            }
                            else {

                                //2 o 3 formaciones y 1 experiencia
                                if (formaciones.length == undefined & Experiencias.length != undefined & conteoExperiencia == 1 & conteoFormacion >= 2) {
                                    console.log("5")
                                    for (var m = 5; m < 6; m++) {
                                        Formaciones1.push(`</br>` + ` ${formaciones.Nivel_formacion} en  ${formaciones.Unidad_formacion} en el área de ${formaciones.Area_formacion} `)
                                    }


                                    for (var j in Experiencias) {
                                        Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias[j].Area_experiencia} como ${Experiencias[j].Funciones} en la entidad ${Experiencias[j].Entidad} por un periodo de ${Experiencias[j].Meses_Experiencia} meses`)

                                    }

                                } else {
                                    if (formaciones.length != undefined & Experiencias.length == undefined & conteoExperiencia == 2 & conteoFormacion <= 2) {
                                        console.log("6")
                                        for (var a in formaciones) {
                                            Formaciones1.push(`</br>` + ` ${formaciones[a].Nivel_formacion} en  ${formaciones[a].Unidad_formacion} en el área de ${formaciones[a].Area_formacion} `)

                                        }


                                        for (var m = 5; m < 6; m++) {
                                            Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias.Area_experiencia} como ${Experiencias.Funciones} en la entidad ${Experiencias.Entidad} por un periodo de ${Experiencias.Meses_Experiencia} meses`)
                                        }

                                    } else {
                                        //1 experiencia
                                        if (formaciones.length != undefined & Experiencias.length != undefined & conteoExperiencia == 1 & conteoFormacion == 0) {
                                            console.log("7")
                                            for (var j in formaciones) {
                                                formacion = formaciones[j]
                                                for (var a in formacion) {
                                                    Formaciones1.push(`</br>` + ` ${formacion[a].Nivel_formacion} en  ${formacion[a].Unidad_formacion} en el área de ${formacion[a].Area_formacion} `)

                                                }
                                            }

                                            for (var j in Experiencias) {
                                                Experiencias1.push(`</br>` + ` Experiencia en el área de ${Experiencias[j].Area_experiencia} como ${Experiencias[j].Funciones} en la entidad ${Experiencias[j].Entidad} por un periodo de ${Experiencias[j].Meses_Experiencia} meses`)

                                            }
                                        } else {
                                            //1 formación
                                            if (formaciones.length != undefined & Experiencias.length != undefined & conteoExperiencia == 0 & conteoFormacion == 1) {
                                                console.log("8")
                                                for (var a in formaciones) {
                                                    Formaciones1.push(`</br>` + ` ${formaciones[a].Nivel_formacion} en  ${formaciones[a].Unidad_formacion} en el área de ${formaciones[a].Area_formacion} `)

                                                }

                                                for (var j in Experiencias) {
                                                    experiencia = Experiencias[j]
                                                    Experiencias1 = []
                                                    for (var a in experiencia) {
                                                        Experiencias1.push(`</br>` + ` Experiencia en el área de ${experiencia[a].Area_experiencia} como ${experiencia[a].Funciones} en la entidad ${experiencia[a].Entidad} por un periodo de ${experiencia[a].Meses_Experiencia} meses`)

                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


                //Tarjetas de personas
                document.getElementById(
                    'TablaExcelConsulta'
                ).innerHTML += `
        <tr>
        <th>${data[i].Nombre_completo}</th>
        <th>${data[i].Cedula}</th>
        <th>${data[i].Telefono}</th>
        <th>${data[i].Correo}</th>
        <th>${data[i].Tipo_personal}</th>
        <th>${data[i].OneDrive}</th>
        <th>${Formaciones1} </th>
        <th>${Experiencias1}</th>
        </tr>`

            }

            //Función para descargar excel con las hojas de vida consultadas
            function exportTableToExcel(tableID, filename = '') {
                var downloadLink;
                var dataType = 'application/vnd.ms-excel; charset=UTF-8';
                var tableSelect = document.getElementById('TablaExcelConsulta');
                var tableHTML = tableSelect.outerHTML
                var Escape = escape(tableHTML)
                // Specify file name
                filename = filename ? filename + '.xlsx' : 'Consulta Hojas de vida.xls';

                // Create download link element
                downloadLink = document.createElement("a");

                document.body.appendChild(downloadLink);

                if (navigator.msSaveOrOpenBlob) {
                    //<meta charset="UTF-8"></meta>
                    var blob = new Blob(['\UTF-8', Escape], {
                        type: dataType
                    });
                    navigator.msSaveOrOpenBlob(blob, filename);
                } else {
                    // Create a link to the file
                    downloadLink.href = 'data:' + dataType + ', ' + Escape;

                    // Setting the file name
                    downloadLink.download = filename;

                    //triggering the function
                    downloadLink.click();
                }
            }
            exportTableToExcel()
            //Recarga la página para no mostrar la tabla
            function redireccionarPagina() {
                window.location = "/ConsultarHojasdeVidaAdministrador.html";
            }
            setTimeout(redireccionarPagina, 0000);

        }
    }
}

