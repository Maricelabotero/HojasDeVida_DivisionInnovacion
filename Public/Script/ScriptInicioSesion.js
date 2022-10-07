//Alerta eliminar
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
            const valor = document.querySelector(".borrarFormacion")
            function eliminarFila() {
                valor.parentNode.removeChild(valor);
            }
            eliminarFila()

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


//Se llama con el botòn ingresar desde el formulario para validar los campos e ingresar 
async function verificarUsuario() {
    const usuario = document.getElementById("Usuario").value;
    const clave = document.getElementById("Clave").value;
    var tipousuario;
    if (usuario == "" || clave == "") {
        swal("Error", "Por favor llena todos los campos", "error")
    }
    else {
        var Usuario = { Usuario: usuario, Clave: clave };
        const data = await fetch('https://hojas-de-vida.herokuapp.com/Usuario/Consultar', {
            method: 'POST', body: JSON.stringify(Usuario),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(res => res.json())
            .catch(err => err)
        if (data == "") {
            swal("Error", "Datos incorrectos, inténtalo de nuevo", "error")
        } else {
            for (var i in data) {
                if (data[i].Tipo_Usuario == "Natural") {
                    function redireccionarPaginaNatural() {
                        window.location = "/Inicio.html";
                        tipousuario = "Natural";
                    }
                    redireccionarPaginaNatural()
                }
                else if(data[i].Tipo_Usuario == "Administrador"){
                    function redireccionarPaginaAdministrador() {
                        window.location = "/InicioAdministrador.html";
                        tipousuario = "Administrador";
                        
                    }
                    redireccionarPaginaAdministrador()

                }else{
                    function redireccionarPaginaInvitado() {
                        window.location = "/InicioInvitado.html";
                        tipousuario = "Invitado";
                        
                    }
                    redireccionarPaginaInvitado()
                }
            }
        }
    }

}
