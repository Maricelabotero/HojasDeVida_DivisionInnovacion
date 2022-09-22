async function ConsultaExcel() {
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
        Experiencias1.push(`</br>` + ` Experiencia como ${experiencia[a].Funciones} en la entidad ${experiencia[a].Entidad} por un periodo de ${experiencia[a].Meses_Experiencia} meses`)

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


  function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById('TablaExcel');
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'Hojas de vida.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(['ufeff', tableHTML], {
        type: dataType
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }
  }
  exportTableToExcel()
}


