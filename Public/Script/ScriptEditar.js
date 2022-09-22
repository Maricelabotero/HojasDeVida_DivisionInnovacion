//Alerta para confirmación de eliminar las formaciones en el actualizar
function SwalDeleteActualizarFormacion(id) {

    Swal.fire({
        title: 'Alerta',
        text: "¿Estás seguro de eliminar esta formaciòn?",
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

            MandaridFormacion(id)

            document.querySelector(document).addEventListener('click', '.Eliminar btn btn-danger', function(event){
                const tid = document.querySelector(this).attr('id');
                alert('fila seleccionada: '+tid);
                document.querySelector('#' + tid).remove();
            });


            Swal.fire(
                'Eliminado!',
                'Registro eliminado correctamente',
                'success'
            )

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




//Eliminar las formaciones con el id seleccionado
function MandaridFormacion(elem) {
    const Elid = { _id: elem.id }


    function EliminarFormacionid() {
        fetch('http://localhost:4000/HojaDeVida/EliminarFormacion', {
            method: 'DELETE', body: JSON.stringify(Elid),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).catch(err => err)

    }
    EliminarFormacionid()
}


//Alerta para confirmación de eliminar las experiencias en el actualizar
function SwalDeleteActualizarExperiencia(id) {
    Swal.fire({
        title: 'Alerta',
        text: "¿Estás seguro de eliminar esta experiencia?",
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

            MandaridExperiencia(id)

            Swal.fire(
                'Eliminado!',
                'Registro eliminado correctamente',
                'success'
            )

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


//Eliminar las experiencias con el id seleccionado
function MandaridExperiencia(elem) {
    const Elid = { _id: elem.id }

    function EliminarExperienciaid() {
        fetch('http://localhost:4000/HojaDeVida/EliminarExperiencia', {
            method: 'DELETE', body: JSON.stringify(Elid),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).catch(err => err)
    }
    EliminarExperienciaid()
}


//Recibe el id, consulta el registro y lo agrega a cada campo del formulario en actualizar 
document.addEventListener('DOMContentLoaded', async (req, res) => {
    async function Consulta() {
        const idPerson = { _id: myVariableActualizar._id }
        const url = 'http://localhost:4000/HojaDeVida/ConsultarId'
        const datos = await fetch(url, {
            method: 'POST', body: JSON.stringify(idPerson),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => err)

        for (var i in datos) {

            document.getElementById(
                'id_Nombre_completo'
            ).innerHTML += `<input type="text" class="form-control" id="id_Nombre_completoE" name="Nombre_completo"
  value="${datos[i].Nombre_completo}"/>`

            document.getElementById(
                'id_cedula'
            ).innerHTML += `<input type="number" class="form-control" id="id_Cedula" name="Cedula" 
  value="${datos[i].Cedula}" disabled/>`

            document.getElementById(
                'id_Telefono'
            ).innerHTML += `<input type="tel" class="form-control" id="id_TelefonoE" name="Telefono"  
  value="${datos[i].Telefono}" />`

            document.getElementById(
                'id_Correo'
            ).innerHTML += `<input type="email" class="form-control" id="id_CorreoE" name="Correo"
  value="${datos[i].Correo}" /> `

            document.getElementById(
                'id_Tipo_personalE'
            ).innerHTML += `<select class="form-select" id="id_Tipo_personal" name="Tipo_personal">
            <option value=${datos[i].Tipo_personal}>${datos[i].Tipo_personal}</option></select>`
            const Tipo = { Nombre: datos[i].Tipo_personal }
            const data = await fetch('http://localhost:4000/TipoPersonal/ConsultarEditar', {
                method: 'POST', body: JSON.stringify(Tipo),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .catch(err => err)
            for (var j in data) {
                document.getElementById(
                    'id_Tipo_personalE'
                ).innerHTML += `<option value=${data[j].Nombre}>${data[j].Nombre}</option></select>`
            }
            document.getElementById(
                'id_OneDrive'
            ).innerHTML += `<input type="text" class="form-control" id="id_OneDriveE" name="OneDrive"
  value="${datos[i].OneDrive}" />`
        }


        const cedula = document.getElementById("id_Cedula").value;
        async function Formaciones() {

            var cedu = { Cedula: cedula };
            const Formaciones = await fetch('http://localhost:4000/HojaDeVida/ConsultarFormaciones', {
                method: 'POST', body: JSON.stringify(cedu),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).catch(err => err)
            for (var j in Formaciones) {
                Formacion = Formaciones[j]
                for (var a in Formacion) {
                    formacion = Formacion[a]
                    for (var b in formacion) {
                        formaciones = formacion[b]
                        for (var c in formaciones) {

                            document.getElementById("tabla-formacion").innerHTML += `
          <tr class="borrarFormacion" id="1${formaciones[c]._id}"> 
          <td>${formaciones[c].Cedula}</td> 
          <td>${formaciones[c].Unidad_formacion}</td> 
          <td>${formaciones[c].Area_formacion}</td> 
          <td>${formaciones[c].Nivel_formacion}</td> 
          <td> 
          <button type="button" class="Eliminar btn btn-danger" id="${formaciones[c]._id}" formaction="javascript:SwalDeleteActualizarFormacion()" onclick="SwalDeleteActualizarFormacion(this)"> 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" > 
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> 
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
          </svg> 
          </button> 
          </td> 
          </tr>`



                        }
                    }
                }

            }
        }
        Formaciones()


        async function Experiencias() {
            var cedu = { Cedula: cedula };
            const Experiencias = await fetch('http://localhost:4000/HojaDeVida/ConsultarExperiencias', {
                method: 'POST', body: JSON.stringify(cedu),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).catch(err => err)

            for (var j in Experiencias) {
                hola = Experiencias[j]
                for (var a in hola) {
                    experiencia = hola[a]
                    for (var b in experiencia) {
                        hola2 = experiencia[b]
                        for (var c in hola2) {

                            document.getElementById("Tabla-Experiencia").innerHTML += `
                <tr id="2${hola2[c]._id}">
                <td>${hola2[c].Cedula}</td> 
                <td>${hola2[c].Funciones}</td> 
                <td>${hola2[c].Entidad}</td> 
                <td>${hola2[c].Meses_Experiencia}</td> 
                <td>${hola2[c].Area_experiencia}</td> 
                <td> 
                <button type="button" class="btn btn-danger" id="${hola2[c]._id}" formaction="javascript:SwalDeleteActualizarExperiencia()" onclick="SwalDeleteActualizarExperiencia(this)"> 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" > 
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> 
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
                </svg> 
                </button> 
                </td> 
                </tr>`

                        }
                    }
                }
            }

        }
        Experiencias()
    }
    Consulta()



});



