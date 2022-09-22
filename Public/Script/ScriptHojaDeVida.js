//Consulta el id de la persona, las formaciones y las experiencias y los muestra en forma de hoja de vida
document.addEventListener('DOMContentLoaded', async (req, res) => {
    async function MostrarHoja() {
        const idPerson = { _id: myVariable._id }
        const url = 'https://hojas-de-vida.herokuapp.com/HojaDeVida/ConsultarId'
        const data = await fetch(url, {
            method: 'POST', body: JSON.stringify(idPerson),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(err => err)
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
            document.getElementById(
                'foto'
            ).innerHTML += `<img src="${data[i].Imagen}" alt="..." id="imagen"></p>`

            document.getElementById(
                'divparrafo'
            ).innerHTML += `<p id="parrafo">${data[i].Nombre_completo}</p>`

            document.getElementById(
                'Telefono'
            ).innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" color="#D61C4E" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
            <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
          </svg>
          <p>${data[i].Telefono}</p>`

            document.getElementById(
                'Correo'
            ).innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" color="#D61C4E" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
          </svg>
          <p>${data[i].Correo}</p>`

            document.getElementById(
                'Onedrive'
            ).innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" color="#D61C4E" fill="currentColor" class="bi bi-cloud-check" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
          </svg>
        <a href="${data[i].OneDrive}">OneDrive</a>`

            document.getElementById(
                'Info'
            ).innerHTML += `<p><h5>Formación:</h5>${Formaciones1} </p></br><p><h5>Experiencia:</h5>${Experiencias1} </p></br> 
            <p><h5>Cedula:</h5>${data[i].Cedula} </p></br>
            <p><h5>Tipo de personal:</h5>${data[i].Tipo_personal} </p> </br>`



            var id = { _id: data[i]._id }


        }
    }

    MostrarHoja()

});
