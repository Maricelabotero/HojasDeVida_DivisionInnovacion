function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


//INGRESAR

//Se llama con el botòn ingresar desde el formulario para validar los campos e ingresar 
async function verificarCedula() {
  const cedula = document.getElementById("id_Cedula").value;
  var cedu = { Cedula: cedula };
  const data = await fetch('http://localhost:4000/HojaDeVida/ConsultaCedula', {
    method: 'POST', body: JSON.stringify(cedu),
    headers: {
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
    .catch(err => err)
  if (data == "") {
    const Nombre = document.getElementById("id_Nombre_completo").value;
    const cedula = document.getElementById("id_Cedula").value;
    const Tipopersonal = document.getElementById("id_Tipo_personal").value;
    const telefono = document.getElementById("id_Telefono").value;
    const correo = document.getElementById("id_Correo").value;
    const OneDrive = document.getElementById("id_OneDrive").value;
    var imagen = document.getElementById("img").src;


    if (Nombre == "" || cedula == "" || Tipopersonal == "" || telefono == "" || correo == "" || OneDrive == "") {
      swal("Error", "Por favor llena todos los campos", "error")
    }
    else {
      if (imagen != "" & imagen.length > 1000000) {
        swal("Error", "Esta imagen es demasiado larga", "error")
      }
      else if (imagen == "") {
        imagen = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAIGAgYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9U6KKSgAzSMwHPpUM1wsKlnO1VGS3pXg3xV/aCW183SvDDrJOCVl1AgFE9RGO5/2unpmtIwlN2iefjMdRwMOes7dl1foeleOvirongOH/AE2fzbthlLODDSt+HYe5r518afHbxH4qaaGCf+yNPbKiG1Y+Yyn++/XP0wK89urqa8uJLi4le4uJW3vJISWY5zyair0YUYxV3ufmWPzzE4xtQfJDsv8AMPXHrn8fWjPuTRRXSfOdbsKKKKQBRRRTAKKKKdwCiiii4BRRRRcAoooouAUUUUXAKKKKLgFFFFFwCiiii4BRRRRcAoooouAUUUUXAKKKKLgFFFFFwCiiii4BRRRRcAoooouAUUUUXAKKKKLgFFFFFwCiiii4BRRRSuAUUUUgCjkHI470UVSdgNPw/wCKNV8K3f2nSb6aylP3ghyj+zKeDXu/gH9pWG4Mdn4mhW1mztF9Bnyj6Fh1X6jP4V860Z2/SsZ041Nz1cHmWJwUv3UtOx9+6ffw6jAlxbzxzwSDckkbBgw9QRVrcPWvin4f/FLWfh/cL9kmNzYswMtlKxKH12n+E+9fVfgb4gaT480xbrTpv3i8TW8uBJE3oR/Xoa86pSlDXofpmW5xRzD3Np9jrKKarZUGnVznvhRRRQAhOKr3FwsMTSOwRFGSzHAA9T7VLIwC5r5w+PvxYe7uJ/DOj3BWCM7b2eJsbz/zzBHb19ela06bqSsjzMfjqeX0vaz+S7sy/jF8bJfEs0+i6JM0WlKSk1zGcNcYPQeifzrx7px2o69sUV68YqEbI/H8Xi6uMqurVev5BRRRTOIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAPpxWn4b8Sah4V1aLUNNuGguEOOvyuO6sO4NZlFD10ZcJypyUouzR9mfDH4oWXxC0kSRlYL+EBbi1PVSe49VPb/Oe6Vt1fB3hfxNf+EtYg1LTpfKnhPTPyuvdW9jX2X8P/ABrZeOtAg1O0bZvGJIWPzROOqn6evcV5lalyO62P1TJc3WOj7Kp8a/FHUUUmc0Vyn1J5Z8cviU3gvw/9ksnA1a+BSLnmNejP+vHv9K+TCxY7iSxbkknJJNb3jvxdN448T3urShkjlbbBEx+5EPuj/PcmsCvXow5EfjObY+WPxDlf3VogooorY8UKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKD9KYr9AooXBIHX/d5qzDpV9dN+5srmQf7MLH+lTe25pGEpbIrUVfl0DU4V3SabfRr3LWrgfniqUkbQ/wCsR4v99SP50c0e43Tmt0/uG0UDB6MCKDx9KfoZ9bBRRRTAKKKKQBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFdv8JfiHL8PvEiSO7f2XdER3cft2f6r/ACzXEUD6ZpNKSszow9aeGqKrB6o/QC1nS5t0lR1kRxuVlOQQehBorxL9nX4gf2locugXsuLjTlDQu7cvCTgD/gJwPoRRXkSi4ux+y4XHUcVRjVbs2fNh65ooor2T8SCiiikAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFAHQnpQAD5unNWdN0281i6W1sLaW7uW6RwoWP446fU16n8PP2fNR8TFLzXDJpenkBlhx++lHrg/dH159q+jPDPgvR/B9mLfTLGK1QDBYD5m92bqa5p14x0R9TgOH6+LSqVfdj+J87+E/2a9d1XEus3EWkwt/yzT97N+mAP1r1TQP2d/CWj7WuLaXVJR/FeSbl/wC+RgV6FqOrWWjwebd3EdvH/ekYD8vWuP1b4v6dbZjsoJbt/wC8fkT9ef0rmc61R+6fZUcry7BK8opvu9fwOn0/wnouk4W00uztvaOFV/pWqsKKMBcD2rx27+LusTZEEVvbr2+Usf1P9KyJfiF4imJ/4mboPRI0X+lUsNUlq2dyxmGp6QjY96MYIxiq11pdrdJtuLeGZe4kQEV4WvjzxCp41Wb8Qp/pV61+KPiC3xuuIp/+ukQ/piq+q1EtGDx2HlpKNzvNa+D/AIR8QK3n6LbI+OJLdfKYfiuK828Sfst27Ru+h6rLBJjKw3oDofbcOR+RrrNO+Mcm9RfWAK93t35/I/412Oj+OdH1zakF2qyt0il+Vvpz1/CsrVqZzVMJl2NVpRV/uPkHxb8OPEPgob9V0947fOPtUfzxfUsOn44rmf8A9dff80MdxGyOiyIwwVYZBFeQfED9nfS9f8690IppF+cnygv7iQ+hH8P1H5VvTxF9Jny2O4blTvPCO67dT5forU8ReGdT8K6i9lqlpJa3C8gEZDj+8pHBH0rKrrTvqfFyjKDcZKzQtFFFMgKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiimBYsdQuNOkMtrO1vKRtLKeccHH6UVWKhuvNFZuCbudFPEVKa5YyshaKKKs5wooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKfDBJcSJHFG0kjsEVUGSSegA9aBpNuyH2dnPqF1FbW0TTTzMEjijGWYnsK+nPhL8C7bwzHFqmsxx3ersoZIjzHbH/Z9W9/y9Ta+C/whj8F2aapqUavrk65O7BFupB+RT6+p/CvR9a1u10GxkuruQRxoMAd2PoPevOqVnN8sT9HyfJYYeKxOK+Lonsv+CWri4g0+3eWeRYoUGWZjgCvNvFHxaOZLfR1GPu/apBn8VH9TXJeKfGV34onPmFobRT8lup4+p9TWBXRSwqXvTPXxGOlJ8tLYmu7651GYzXU8k8p6tI2TUNFFdystjyW3J3YUUUUxBRRRSAKKKKYHTeHfiBqmgMqtIby1UY8qU52j2bt/nivWvDfi7T/ABLDm3l2zAfNC5w6/wCIr5/qW1uprK4Sa3kaGVDlXU4INctTDwmtNGehQxtSlaMtUe7+MPBWl+NdLey1K2WZTnZJ0eI/3lPY18mfEj4Y6l8O9U8u4LXOnyN+4vQOH9m9G9fzr6a8B/EFNcC2V8RFfKMK3QS/T0PtXS+IvDtj4o0qfT9Qt1uLaZcMrDkehB7EetcEZToy5ZbF5hltDNaXtKek1s/0f9aHwf2FFdb8SPh7efDzXGtZg01jJlra5K4Dr6H/AGhxmuSr0k7q5+VVqNTD1HSqqzQUUUUzEKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooopgFFFFIAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiijpTAPwzXv37PPwxEmzxRqcG4f8uCP+I8z+YH1J715R8N/BsnjnxZaaaFb7MT5ly6nGyIdeffoPc57V9q2FjFYWUNtAixRQqERF6ADgVx4ipZKKZ9nw7lyr1PrVRe7Hb1GapqVvpFhNd3LiOKIbif6V4P4p8TXHijUDPLujgXiGHP3B/ia2viZ4qOtaobCB/9EtW5I/5aP6/T/A1xlaYeiormkfU4zEupLkjshPbtS0UV2nlhRRRQAUUUUAFFFFABRRRQAUUUUAKjNHIrqxRlIIZeCDnrXs3w78a/29amyu2xfwjO4/8ALVfUe/rXjFT2F9Npt5Fc27mOaJtykf19qwq0lUjbqdeHryozTWx7f4+8D2fjjw9Ppt2NpOXilA5ik5ww/r6jNfF2uaLd+HdXu9NvYTFdW0hRwf0PuCOR7GvuHwzr0XiLR4buP5SRiSPurdxXjv7SngH7ZYp4mtYz51tiO6Cj70fZvqp/T6V59Go6b5GYZ9l8cTQWLpL3lv5r/gHznRRg9aK9E/M/QKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooopsbCiiikIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAoX72cZoq7oukza9rVjpsGVlupkhDem443fh1p35dSoxdSShHd6H0r+zb4M/sfwpJrE4/0nU23pkcrCpIUfjyfxFd18QvEX/CP6DKY2xdT/u4sdQT1P4CtvSbGHSNOt7O3UJBBGsSL6ADgflivIPilrR1TxI1upxFaDyx6Fj94/wBPwry6cfaVdT9jjTWAwUaUNHY47nOeffJzS0UV7Gx4YUUUUxBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHZfDLxEdJ1pbSWQra3Z2cngSdj+PSvXtUsINX0+e0njEsEyNG6t0IIIIr5wRmSRWU4YEEfUdK+h/DWqrrmiWl4DzJGN3+90b9f515mKjytTie7gJqpB0Zf0j4m8XeH5vCniTUNJnU5tpSisf4142t+IOfzrIr2/wDai8Mta61petxLiO6ja2mYD+NeUJ/At+VeIV005c0Uz8rzDDPCYmdK2l9PQKKKK0POCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooopsbCiiikIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr039nfQ/wC1viRbzOu6Kxge4P1+6oP/AH1n8K8yr379lexHma9d4y37qEN7fMT/AErKs7U2ezk9L22OpRfR3+49+v7hLGznnc4SJGdj04AzXzheXT311NcS/fmcu2fc5r3b4gXBtfCOosD95Nn/AH0QP614JnPPrWWEjo5H6RmErzjHyCiiivQPGCiiigAooooAKKKKACiiigAooooAKKKKACiiigAr1f4O6l52m3dmx5hcOoPow/xH615RXb/CO4MPiWaPPE0DAj6HIrnxEeamzuwcuWtHzNr9oHRf7W+HGoSKu57MpcjjsrYb/wAdLfnXyNX3b4t08at4X1WzI4ntZI8H3U18I4I4PWubDSvFo+d4opcuIhUXVC0UUV1nxYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFNjYUUUUhBRRRQAUUUUAFFFFABRRRQAUUU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";

        var dataPersona = { Nombre_completo: Nombre, Cedula: cedula, Tipo_personal: Tipopersonal, Telefono: telefono, Correo: correo, OneDrive: OneDrive, Imagen: imagen };
        fetch('http://localhost:4000/HojaDeVida/Ingresar', {
          method: 'POST', body: JSON.stringify(dataPersona),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        swal("Correcto", "Ingreso valido", "success")
        function redireccionarPagina() {
          window.location = "/";
        }
        setTimeout(redireccionarPagina, 2000);
      } else {
        var dataPersona = { Nombre_completo: Nombre, Cedula: cedula, Tipo_personal: Tipopersonal, Telefono: telefono, Correo: correo, OneDrive: OneDrive, Imagen: imagen };
        fetch('http://localhost:4000/HojaDeVida/Ingresar', {
          method: 'POST', body: JSON.stringify(dataPersona),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        swal("Correcto", "Ingreso valido", "success")
        function redireccionarPagina() {
          window.location = "/";
        }
        setTimeout(redireccionarPagina, 2000);
      }
    }

  } else {
    swal("Error", "Este registro ya existe", "error")
  }
}

//Validar los campos de formacion, agregarlos a la tabla e ingresarlos en la base de datos
async function TraerDatosFormacion() {

  const cedula = document.getElementById("id_Cedula").value;
  var select = document.getElementById('id_Unidad_formacion');
  var unidad = select.options[select.selectedIndex].text
  var selectA = document.getElementById("id_Area_formacion");
  var area = selectA.options[selectA.selectedIndex].text
  var selectN = document.getElementById("id_Nivel_formacion");
  var nivel = selectN.options[selectN.selectedIndex].text

  if (area == "Otro programa") {
    var areao = document.getElementById("Cual").value;

    if (cedula == "") {
      swal("Error!", "La cédula es obligatoria", "error");
      document.getElementById("id_Cedula").focus();
    } else {
      if (unidad == "") {
        swal("Error!", "La unidad de formación es obligatoria", "error");
        document.getElementById("id_Unidad_formacion").focus();
      } else {
        if (areao == "") {
          swal("Error!", "El área de formación es obligatoria", "error");
          document.getElementById("id_Area_formacion").focus();
        } else {
          if (nivel == "") {
            swal("Error!", "El nivel de formación es obligatorio", "error");
            document.getElementById("id_Nivel_formacion").focus();
          } else {

            var dataFormacion = { Cedula: cedula, Unidad_Formacion: unidad, Area_formacion: areao, Nivel_Formacion: nivel };

            fetch('http://localhost:4000/Formacion/Insertar', {
              method: 'POST', body: JSON.stringify(dataFormacion),
              headers: {
                'Content-Type': 'application/json'
              }
            })

            fetch('http://localhost:4000/HojaDeVida/Actualizarformaciones', {
              method: 'POST', body: JSON.stringify(dataFormacion),
              headers: {
                'Content-Type': 'application/json'
              }

            })

            var cedu = { Cedula: cedula };
            const Formaciones = await fetch('http://localhost:4000/HojaDeVida/ConsultarFormacionesIngresar', {
              method: 'POST', body: JSON.stringify(cedu),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(res => res.json()).catch(err => err)

            document.getElementById("tabla-formacion").innerHTML = `<thead class="thead-light">
            <tr>
                <th scope="col"> Cédula </th>
                <th> Unidad Formación </th>
                <th> Area Formación </th>
                <th> Nivel </th>
                <th> Eliminar </th>
            </tr>
        </thead> `;

            console.log("Hola formacion ", Formaciones);
            for (var a in Formaciones) {
              document.getElementById("tabla-formacion").innerHTML += `
                    <tbody id="1${Formaciones[a]._id}">
                      <tr> 
                      <td>${Formaciones[a].Cedula} </td> 
                      <td>${Formaciones[a].Unidad_formacion} </td> 
                      <td>${Formaciones[a].Area_formacion} </td> 
                      <td>${Formaciones[a].Nivel_formacion} </td> 
                      <td> 
                      <button type="button" class="btn btn-danger" id="${Formaciones[a]._id}" formaction="javascript:SwalDeleteActualizarFormacion()" onclick="SwalDeleteActualizarFormacion(this)"> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" > 
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> 
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
                      </svg> 
                      </button> 
                      </td> 
                      </tr>
                      </tbody>`
              swal("Ingresado", "Formación ingresada con éxito", "success")
              console.log(Formaciones[a]._id)
              sleep(900);
            }
          }
        }

      }

    }
  } else {
    var selectA = document.getElementById("id_Area_formacion");
    var arean = selectA.options[selectA.selectedIndex].text

    if (cedula == "") {
      swal("Error!", "La cedula es obligatoria", "error");
      document.getElementById("id_Cedula").focus();
    } else {
      if (unidad == "") {
        swal("Error!", "La unidad de formación es obligatoria", "error");
        document.getElementById("id_Unidad_formacion").focus();
      } else {
        if (arean == "") {
          swal("Error!", "El área de formación es obligatoria", "error");
          document.getElementById("id_Area_formacion").focus();
        } else {
          if (nivel == "") {
            swal("Error!", "El nivel de formación es obligatorio", "error");
            document.getElementById("id_Nivel_formacion").focus();
          } else {

            var dataFormacion = { Cedula: cedula, Unidad_Formacion: unidad, Area_formacion: arean, Nivel_Formacion: nivel };

            fetch('http://localhost:4000/Formacion/Insertar', {
              method: 'POST', body: JSON.stringify(dataFormacion),
              headers: {
                'Content-Type': 'application/json'
              }
            })

            fetch('http://localhost:4000/HojaDeVida/Actualizarformaciones', {
              method: 'POST', body: JSON.stringify(dataFormacion),
              headers: {
                'Content-Type': 'application/json'
              }

            })

            var cedu = { Cedula: cedula };
            const Formaciones = await fetch('http://localhost:4000/HojaDeVida/ConsultarFormacionesIngresar', {
              method: 'POST', body: JSON.stringify(cedu),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(res => res.json()).catch(err => err)

            document.getElementById("tabla-formacion").innerHTML = `<thead class="thead-light">
             <tr>
                 <th scope="col"> Cédula </th>
                 <th> Unidad Formación </th>
                 <th> Area Formación </th>
                 <th> Nivel </th>
                 <th> Eliminar </th>
             </tr>
         </thead> `;

            console.log("Hola formacion ", Formaciones);
            for (var a in Formaciones) {
              document.getElementById("tabla-formacion").innerHTML += `
                    <tbody id="1${Formaciones[a]._id}">
                      <tr> 
                      <td>${Formaciones[a].Cedula} </td> 
                      <td>${Formaciones[a].Unidad_formacion} </td> 
                      <td>${Formaciones[a].Area_formacion} </td> 
                      <td>${Formaciones[a].Nivel_formacion} </td> 
                      <td> 
                      <button type="button" class="btn btn-danger" id="${Formaciones[a]._id}" formaction="javascript:SwalDeleteActualizarFormacion()" onclick="SwalDeleteActualizarFormacion(this)"> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" > 
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> 
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
                      </svg> 
                      </button> 
                      </td> 
                      </tr>
                      </tbody>`

              swal("Ingresado", "Formación ingresada con éxito", "success")
              console.log(Formaciones[a]._id)
              sleep(900);
            }

          }

        }
      }
    }
  }
}



//Validar los campos de experiencia, agregarlos a la tabla e ingresarlos en la base de datos
async function TraerDatosExperiencia() {
  const cedula2 = document.getElementById("id_Cedula").value;
  const entidad2 = document.getElementById("id_Entidad_experiencia").value;
  const meses_Experiencia2 = document.getElementById(
    "id_Meses_experiencia"
  ).value;
  const funciones2 = document.getElementById("id_Funciones").value;
  var selectN = document.getElementById("id_Area_experiencia");
  var area = selectN.options[selectN.selectedIndex].text


  if (area == "Otra") {
    var areao = document.getElementById("Cual_experiencia").value;
    if (cedula2 == "") {
      swal("Error!", "La cédula es obligatoria", "error");
      document.getElementById("id_Cedula").focus();
    } else {
      if (funciones2 == "") {
        swal("Error!", "Las funciones son obligatorias", "error");
        document.getElementById("id_Funciones").focus();
      } else {
        if (entidad2 == "") {
          swal("Error!", "La entidad es obligatoria", "error");
          document.getElementById("id_Entidad_experiencia").focus();
        } else {
          if (meses_Experiencia2 == "") {
            swal("Error!", "Los meses de la experiencia son obligatorios", "error");
            document.getElementById("id_Meses_experiencia").focus();
          } else {
            if (areao == "" || areao == "Selecciona un área de experiencia") {
              swal("Error!", "El área es obligatoria", "error");
              document.getElementById("id_Area_experiencia").focus();
            }
            else {

              var dataPerson = { Cedula: cedula2, Entidad: entidad2, Meses_Experiencia: meses_Experiencia2, Funciones: funciones2, Area_experiencia: areao };

              fetch('http://localhost:4000/Experiencia/Insertar', {
                method: 'POST', body: JSON.stringify(dataPerson),
                headers: {
                  'Content-Type': 'application/json'
                }
              })

              fetch('http://localhost:4000/HojaDeVida/ActualizarExperiencias', {
                method: 'POST', body: JSON.stringify(dataPerson),
                headers: {
                  'Content-Type': 'application/json'
                }

              })

              var cedu = { Cedula: cedula2 };
              const Experiencias = await fetch('http://localhost:4000/HojaDeVida/ConsultarExperienciasIngresar', {
                method: 'POST', body: JSON.stringify(cedu),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json()).catch(err => err)

              document.getElementById("Tabla-Experiencia").innerHTML = `<thead class="thead-light">
              <tr>
                  <th scope="col"> Cédula </th>
                  <th> Funciones </th>
                  <th> Entidad </th>
                  <th> Meses</th>
                  <th> Área</th>
                  <th>Eliminar</th>
              </tr>
          </thead> `;

              console.log("Hola experiencia ", Experiencias);
              for (var a in Experiencias) {
                document.getElementById("Tabla-Experiencia").innerHTML += `
                      <tbody id="2${Experiencias[a]._id}">
                        <tr> 
                        <td>${Experiencias[a].Cedula} </td> 
                        <td>${Experiencias[a].Funciones} </td> 
                        <td>${Experiencias[a].Entidad} </td> 
                        <td>${Experiencias[a].Meses_Experiencia} </td> 
                        <td>${Experiencias[a].Area_experiencia} </td> 
                        <td> 
                        <button type="button" class="btn btn-danger" id="${Experiencias[a]._id}" formaction="javascript:SwalDeleteActualizarExperiencia()" onclick="SwalDeleteActualizarExperiencia(this)"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" > 
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> 
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
                        </svg> 
                        </button> 
                        </td> 
                        </tr>
                        </tbody>`

                swal("Ingresado", "Experiencia ingresada con éxito", "success")
                console.log(Experiencias[a]._id)
                sleep(900);
              }


              document.getElementById("id_Entidad_experiencia").value = "";
              document.getElementById("id_Meses_experiencia").value = "";
              document.getElementById("id_Funciones").value = "";
            }
          }

        }
      }
    }

  }
  else {
    var selectN = document.getElementById("id_Area_experiencia");
    var arean = selectN.options[selectN.selectedIndex].text
    if (cedula2 == "") {
      swal("Error!", "La cédula es obligatoria", "error");
      document.getElementById("id_Cedula").focus();
    } else {
      if (funciones2 == "") {
        swal("Error!", "Las funciones son obligatorias", "error");
        document.getElementById("id_Funciones").focus();
      } else {
        if (entidad2 == "") {
          swal("Error!", "La entidad es obligatoria", "error");
          document.getElementById("id_Entidad_experiencia").focus();
        } else {
          if (meses_Experiencia2 == "") {
            swal("Error!", "Los meses de la experiencia son obligatorios", "error");
            document.getElementById("id_Meses_experiencia").focus();
          } else {
            if (arean == "" || arean == "Selecciona un área de experiencia") {
              swal("Error!", "El área es obligatoria", "error");
              document.getElementById("id_Entidad_experiencia").focus();
            }
            else {

              var dataPerson = { Cedula: cedula2, Entidad: entidad2, Meses_Experiencia: meses_Experiencia2, Funciones: funciones2, Area_experiencia: arean };

              fetch('http://localhost:4000/Experiencia/Insertar', {
                method: 'POST', body: JSON.stringify(dataPerson),
                headers: {
                  'Content-Type': 'application/json'
                }
              })


              fetch('http://localhost:4000/HojaDeVida/ActualizarExperiencias', {
                method: 'POST', body: JSON.stringify(dataPerson),
                headers: {
                  'Content-Type': 'application/json'
                }

              })

              var cedu = { Cedula: cedula2 };
              const Experiencias = await fetch('http://localhost:4000/HojaDeVida/ConsultarExperienciasIngresar', {
                method: 'POST', body: JSON.stringify(cedu),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json()).catch(err => err)

              document.getElementById("Tabla-Experiencia").innerHTML = `<thead class="thead-light">
              <tr>
                  <th scope="col"> Cédula </th>
                  <th> Funciones </th>
                  <th> Entidad </th>
                  <th> Meses</th>
                  <th> Área</th>
                  <th>Eliminar</th>
              </tr>
          </thead> `;

              console.log("Hola experiencia ", Experiencias);
              for (var a in Experiencias) {
                document.getElementById("Tabla-Experiencia").innerHTML += `
                      <tbody id="2${Experiencias[a]._id}">
                        <tr> 
                        <td>${Experiencias[a].Cedula} </td> 
                        <td>${Experiencias[a].Funciones} </td> 
                        <td>${Experiencias[a].Entidad} </td> 
                        <td>${Experiencias[a].Meses_Experiencia} </td> 
                        <td>${Experiencias[a].Area_experiencia} </td> 
                        <td> 
                        <button type="button" class="btn btn-danger" id="${Experiencias[a]._id}" formaction="javascript:SwalDeleteActualizarExperiencia()" onclick="SwalDeleteActualizarExperiencia(this)"> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" > 
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> 
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
                        </svg> 
                        </button> 
                        </td> 
                        </tr>
                        </tbody>`
                swal("Ingresado", "Experiencia ingresada con éxito", "success")
                console.log(Experiencias[a]._id)
                sleep(900);
              }


              document.getElementById("id_Entidad_experiencia").value = "";
              document.getElementById("id_Meses_experiencia").value = "";
              document.getElementById("id_Funciones").value = "";
            }
          }
        }
      }
    }
  }
}


function mostrar() {
  var archivo = document.getElementById("file").files[0];
  var reader = new FileReader();
  if (file) {
    reader.readAsDataURL(archivo);
    reader.onloadend = function () {
      document.getElementById("img").src = reader.result;
    }
  }
}


//ACTUALIZAR

//Alerta eliminar en actualizar
function SwalDeleteActualizarFormacion(id) {

  Swal.fire({
    title: 'Alerta',
    text: "¿Estás seguro de eliminar esta formación?",
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
      eliminarFila(id)

      function eliminarFila(ID) {
        //document.querySelector(".borrarFormacion").deleteRow(id);
        const valor = document.getElementById("1" + ID.id)
        console.log(valor)
        function eliminarFila() {
          valor.parentNode.removeChild(valor);
        }
        eliminarFila()
      }

      sleep(900);

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
  console.log("id", Elid)


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
      eliminarFila(id)

      function eliminarFila(ID) {
        //document.querySelector(".borrarFormacion").deleteRow(id);
        const valor = document.getElementById("2" + ID.id)
        console.log(valor)
        function eliminarFila() {
          valor.parentNode.removeChild(valor);
        }
        eliminarFila()
      }
      sleep(900);

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
  console.log("id", Elid)


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


//Se llama con el botòn ingresar desde Actualizar para validar los campos y actualizar 
async function MandarActualizar() {

  const cedula = document.getElementById("id_Cedula").value;
  const Nombre = document.getElementById("id_Nombre_completoE").value;
  const Tipopersonal = document.getElementById("id_Tipo_personalE").value;
  const telefono = document.getElementById("id_TelefonoE").value;
  const correo = document.getElementById("id_CorreoE").value;
  const OneDrive = document.getElementById("id_OneDriveE").value;

  if (Nombre == "" || cedula == "" || Tipopersonal == "" || telefono == "" || correo == "" || OneDrive == "") {
    swal("Error", "Por favor llena todos los campos", "error")
  }
  else {

    var dataPerso = { Nombre_completo: Nombre, Cedula: cedula, Tipo_personal: Tipopersonal, Telefono: telefono, Correo: correo, OneDrive: OneDrive };
    fetch('http://localhost:4000/HojaDeVida/Actualizar', {
      method: 'POST', body: JSON.stringify(dataPerso),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    swal("Correcto", "Actualizado Correctamente", "success")
    setTimeout(function () {
      window.close();
    }, 2000);
  }

}

//Validar los campos de formacion en actualizar, agregarlos a la tabla e ingresarlos en la base de datos
async function TraerDatosFormacionActualizar() {
  const cedula = document.getElementById("id_Cedula").value;
  var select = document.getElementById('id_Unidad_formacion');
  var unidad = select.options[select.selectedIndex].text
  var selectA = document.getElementById("id_Area_formacion");
  var area = selectA.options[selectA.selectedIndex].text
  var selectN = document.getElementById("id_Nivel_formacion");
  var nivel = selectN.options[selectN.selectedIndex].text


  if (area == "Otro programa") {

    const areao = document.getElementById("Cual").value;
    if (cedula == "") {
      swal("Error!", "La cedula es obligatoria", "error");
      document.getElementById("id_Cedula").focus();
    } else {
      if (unidad == "" || unidad == "	Selecciona una unidad de formación") {
        swal("Error!", "La unidad de formación es obligatoria", "error");
        document.getElementById("id_Unidad_formacion").focus();
      } else {
        if (areao == "") {
          swal("Error!", "El área de formación es obligatoria", "error");
          document.getElementById("id_Area_formacion").focus();
        } else {
          if (nivel == "" || nivel == "Selecciona un nivel de formación") {
            swal("Error!", "El nivel de formación es obligatorio", "error");
            document.getElementById("id_Nivel_formacion").focus();
          } else {

            var dataFormacion = { Cedula: cedula, Unidad_Formacion: unidad, Area_formacion: areao, Nivel_Formacion: nivel };

            fetch('http://localhost:4000/Formacion/Insertar', {
              method: 'POST', body: JSON.stringify(dataFormacion),
              headers: {
                'Content-Type': 'application/json'
              }
            })


            fetch('http://localhost:4000/HojaDeVida/Actualizarformaciones', {
              method: 'POST', body: JSON.stringify(dataFormacion),
              headers: {
                'Content-Type': 'application/json'
              }

            })

            var cedu = { Cedula: cedula };
            const Formaciones = await fetch('http://localhost:4000/HojaDeVida/ConsultarFormacionesIngresar', {
              method: 'POST', body: JSON.stringify(cedu),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(res => res.json()).catch(err => err)

            document.getElementById("tabla-formacion").innerHTML = `<thead class="thead-light">
            <tr>
                <th scope="col"> Cédula </th>
                <th> Unidad Formación </th>
                <th> Area Formación </th>
                <th> Nivel </th>
                <th> Eliminar </th>
            </tr>
        </thead> `;

            for (var a in Formaciones) {
              document.getElementById("tabla-formacion").innerHTML +=
                `<tbody id="1${Formaciones[a]._id}">
            <tr> 
            <td>${Formaciones[a].Cedula} </td> 
            <td>${Formaciones[a].Unidad_formacion} </td> 
            <td>${Formaciones[a].Area_formacion} </td> 
            <td>${Formaciones[a].Nivel_formacion} </td> 
            <td> 
            <button type="button" class="btn btn-danger" id="${Formaciones[a]._id}" formaction="javascript:SwalDeleteActualizarFormacion()" onclick="SwalDeleteActualizarFormacion(this)"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" > 
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> 
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
            </svg> 
            </button> 
            </td> 
            </tr>
            </tbody>`
            }

            swal("Ingresado", "Formación ingresada con éxito", "success")
            sleep(900);

          }
        }
      }
    }
  } else {
    var selectA = document.getElementById("id_Area_formacion");
    var arean = selectA.options[selectA.selectedIndex].text
    if (cedula == "") {
      swal("Error!", "La cedula es obligatoria", "error");
      document.getElementById("id_Cedula").focus();
    } else {
      if (unidad == "" || unidad == "	Selecciona una unidad de formación") {
        swal("Error!", "La unidad de formación es obligatoria", "error");
        document.getElementById("id_Unidad_formacion").focus();
      } else {
        if (arean == "" || arean == "Selecciona una Area de formación") {
          swal("Error!", "El área de formación es obligatoria", "error");
          document.getElementById("id_Area_formacion").focus();
        } else {
          if (nivel == "" || nivel == "Selecciona un nivel de formación") {
            swal("Error!", "El nivel de formación es obligatorio", "error");
            document.getElementById("id_Nivel_formacion").focus();
          } else {

            var dataFormacion = { Cedula: cedula, Unidad_Formacion: unidad, Area_formacion: arean, Nivel_Formacion: nivel };

            fetch('http://localhost:4000/Formacion/Insertar', {
              method: 'POST', body: JSON.stringify(dataFormacion),
              headers: {
                'Content-Type': 'application/json'
              }
            })


            fetch('http://localhost:4000/HojaDeVida/Actualizarformaciones', {
              method: 'POST', body: JSON.stringify(dataFormacion),
              headers: {
                'Content-Type': 'application/json'
              }

            })

            var cedu = { Cedula: cedula };
            const Formaciones = await fetch('http://localhost:4000/HojaDeVida/ConsultarFormacionesIngresar', {
              method: 'POST', body: JSON.stringify(cedu),
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(res => res.json()).catch(err => err)

            document.getElementById("tabla-formacion").innerHTML = `<thead class="thead-light">
             <tr>
                 <th scope="col"> Cédula </th>
                 <th> Unidad Formación </th>
                 <th> Area Formación </th>
                 <th> Nivel </th>
                 <th> Eliminar </th>
             </tr>
         </thead> `;

            for (var a in Formaciones) {
              document.getElementById("tabla-formacion").innerHTML +=
                `<tbody id="1${Formaciones[a]._id}">
             <tr> 
             <td>${Formaciones[a].Cedula} </td> 
             <td>${Formaciones[a].Unidad_formacion} </td> 
             <td>${Formaciones[a].Area_formacion} </td> 
             <td>${Formaciones[a].Nivel_formacion} </td> 
             <td> 
             <button type="button" class="btn btn-danger" id="${Formaciones[a]._id}" formaction="javascript:SwalDeleteActualizarFormacion()" onclick="SwalDeleteActualizarFormacion(this)"> 
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" > 
             <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> 
             <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
             </svg> 
             </button> 
             </td> 
             </tr>
             </tbody>`
            }
            swal("Ingresado", "Formación ingresada con éxito", "success")
            sleep(900);

          }
        }
      }
    }
  }
}


//Validar los campos de experiencia enactualizar, agregarlos a la tabla e ingresarlos en la base de datos
async function TraerDatosExperienciaActualizar() {
  const cedula2 = document.getElementById("id_Cedula").value;
  const entidad2 = document.getElementById("id_Entidad_experiencia").value;
  const meses_Experiencia2 = document.getElementById(
    "id_Meses_experiencia"
  ).value;
  const funciones2 = document.getElementById("id_Funciones").value;
  var selectN = document.getElementById("id_Area_experiencia");
  var area = selectN.options[selectN.selectedIndex].text


  if (area == "Otra") {
    var areao = document.getElementById("Cual_experiencia").value;
    if (cedula2 == "") {
      swal("Error!", "La cédula es obligatoria", "error");
      document.getElementById("id_Cedula").focus();
    } else {
      if (funciones2 == "") {
        swal("Error!", "Las funciones son obligatorias", "error");
        document.getElementById("id_Funciones").focus();
      } else {
        if (entidad2 == "") {
          swal("Error!", "La entidad es obligatoria", "error");
          document.getElementById("id_Entidad_experiencia").focus();
        } else {
          if (meses_Experiencia2 == "") {
            swal("Error!", "Los meses de la experiencia son obligatorios", "error");
            document.getElementById("id_Meses_experiencia").focus();
          } else {
            if (areao == "" || areao == "Selecciona un área de experiencia") {
              swal("Error!", "El área es obligatoria", "error");
              document.getElementById("id_Area_experiencia").focus();
            }
            else {

              var dataPerson = { Cedula: cedula2, Entidad: entidad2, Meses_Experiencia: meses_Experiencia2, Funciones: funciones2, Area_experiencia: areao };

              fetch('http://localhost:4000/Experiencia/Insertar', {
                method: 'POST', body: JSON.stringify(dataPerson),
                headers: {
                  'Content-Type': 'application/json'
                }
              })

              fetch('http://localhost:4000/HojaDeVida/ActualizarExperiencias', {
                method: 'POST', body: JSON.stringify(dataPerson),
                headers: {
                  'Content-Type': 'application/json'
                }

              })
              var cedu = { Cedula: cedula2 };
              const Experiencias = await fetch('http://localhost:4000/HojaDeVida/ConsultarExperienciasIngresar', {
                method: 'POST', body: JSON.stringify(cedu),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json()).catch(err => err)

              document.getElementById("Tabla-Experiencia").innerHTML = `<thead class="thead-light">
              <tr>
                  <th scope="col"> Cédula </th>
                  <th> Funciones </th>
                  <th> Entidad </th>
                  <th> Meses</th>
                  <th> Área</th>
                  <th>Eliminar</th>
              </tr>
          </thead> `;

              for (var a in Experiencias) {
                document.getElementById("Tabla-Experiencia").innerHTML += `
                  <tbody id="2${Experiencias[a]._id}">
                    <tr> 
                    <td>${Experiencias[a].Cedula} </td> 
                    <td>${Experiencias[a].Funciones} </td> 
                    <td>${Experiencias[a].Entidad} </td> 
                    <td>${Experiencias[a].Meses_Experiencia} </td> 
                    <td>${Experiencias[a].Area_experiencia} </td> 
                    <td> 
                    <button type="button" class="btn btn-danger" id="${Experiencias[a]._id}" formaction="javascript:SwalDeleteActualizarExperiencia()" onclick="SwalDeleteActualizarExperiencia(this)"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" > 
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> 
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
                    </svg> 
                    </button> 
                    </td> 
                    </tr>
                    </tbody>`
                console.log(Experiencias[a]._id)
                swal("Ingresado", "Experiencia ingresada con éxito", "success")
                sleep(1000);
              }

              document.getElementById("id_Entidad_experiencia").value = "";
              document.getElementById("id_Meses_experiencia").value = "";
              document.getElementById("id_Funciones").value = "";
            }
          }
        }
      }
    }

  }
  else {
    var selectN = document.getElementById("id_Area_experiencia");
    var arean = selectN.options[selectN.selectedIndex].text
    if (cedula2 == "") {
      swal("Error!", "La cédula es obligatoria", "error");
      document.getElementById("id_Cedula").focus();
    } else {
      if (funciones2 == "") {
        swal("Error!", "Las funciones son obligatorias", "error");
        document.getElementById("id_Funciones").focus();
      } else {
        if (entidad2 == "") {
          swal("Error!", "La entidad es obligatoria", "error");
          document.getElementById("id_Entidad_experiencia").focus();
        } else {
          if (meses_Experiencia2 == "") {
            swal("Error!", "Los meses de la experiencia son obligatorios", "error");
            document.getElementById("id_Meses_experiencia").focus();
          } else {
            if (arean == "" || arean == "Selecciona un área de experiencia") {
              swal("Error!", "El área es obligatoria", "error");
              document.getElementById("id_Entidad_experiencia").focus();
            }
            else {

              var dataPerson = { Cedula: cedula2, Entidad: entidad2, Meses_Experiencia: meses_Experiencia2, Funciones: funciones2, Area_experiencia: arean };


              fetch('http://localhost:4000/Experiencia/Insertar', {
                method: 'POST', body: JSON.stringify(dataPerson),
                headers: {
                  'Content-Type': 'application/json'
                }
              })

              fetch('http://localhost:4000/HojaDeVida/ActualizarExperiencias', {
                method: 'POST', body: JSON.stringify(dataPerson),
                headers: {
                  'Content-Type': 'application/json'
                }

              })
              var cedu = { Cedula: cedula2 };
              const Experiencias = await fetch('http://localhost:4000/HojaDeVida/ConsultarExperienciasIngresar', {
                method: 'POST', body: JSON.stringify(cedu),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json()).catch(err => err)

              document.getElementById("Tabla-Experiencia").innerHTML = `<thead class="thead-light">
              <tr>
                  <th scope="col"> Cédula </th>
                  <th> Funciones </th>
                  <th> Entidad </th>
                  <th> Meses</th>
                  <th> Área</th>
                  <th>Eliminar</th>
              </tr>
          </thead> `;

              for (var a in Experiencias) {
                document.getElementById("Tabla-Experiencia").innerHTML += `
                  <tbody id="2${Experiencias[a]._id}">
                    <tr> 
                    <td>${Experiencias[a].Cedula} </td> 
                    <td>${Experiencias[a].Funciones} </td> 
                    <td>${Experiencias[a].Entidad} </td> 
                    <td>${Experiencias[a].Meses_Experiencia} </td> 
                    <td>${Experiencias[a].Area_experiencia} </td> 
                    <td> 
                    <button type="button" class="btn btn-danger" id="${Experiencias[a]._id}" formaction="javascript:SwalDeleteActualizarExperiencia()" onclick="SwalDeleteActualizarExperiencia(this)"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" > 
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> 
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> 
                    </svg> 
                    </button> 
                    </td> 
                    </tr>
                    </tbody>`
                swal("Ingresado", "Experiencia ingresada con éxito", "success")
                sleep(1000);
                console.log(Experiencias[a]._id)
              }


              document.getElementById("id_Entidad_experiencia").value = "";
              document.getElementById("id_Meses_experiencia").value = "";
              document.getElementById("id_Funciones").value = "";
            }
          }
        }
      }
    }
  }
}


