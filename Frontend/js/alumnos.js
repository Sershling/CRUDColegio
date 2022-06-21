// Call the dataTables jQuery plugin
$(document).ready(function() {
  $.ajax({
    url: "http://localhost:3000/alumnos",
    type: 'GET',
    success: function(response) {
      console.log(response)
      response.forEach(element => {
        var tr = `<tr id="tr`+element.id+`">
                      <td>
                        <span onclick="showModalEliminar(`+element.id+`,'`+element.nombre+`')" style="cursor: pointer; margin-right: 10px;"><i class="fas fa-trash"></i></span>
                        <span onclick="showModalEditar(`+element.id+`)" style="cursor: pointer;"><i class="fas fa-pen"></i></span>
                      </td>
                      <td>`+element.id+`</td>
                      <td>`+element.nombre+`</td>
                      <td>`+element.apellidos+`</td>
                      <td>`+element.genero+`</td>
                      <td>`+element.fechaNacimiento+`</td>
                  </tr>`;
                  console.log(tr)
        $("#dataTable tbody").append(tr);
      });
     //$('#dataTable').DataTable();
    }
  });

  $("#alumnoForm").submit(function( e ) {
    e.preventDefault();
    var genero = $("#selectGenero").val();
    var fecha = $("#inputFechaNacimiento").val();
    var form = getFormData($(this));
    var RegExPattern = /^\d{4}\-\d{2}\-\d{2}$/;

    if(genero == 0){
      alert("Selecciona genero");
      return;
    }

    if(!fecha.match(RegExPattern)){
      alert("Fecha no valida el formato debe ser 'aaaa-mm-dd'")
      return;
    }

    $.ajax({
        url: "http://localhost:3000/alumno",
        type: "POST",
        data: JSON.stringify(form),
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
            var tr = `<tr id="tr`+response.id+`">
                          <td>
                            <span onclick="showModalEliminar(`+response.id+`,'`+response.nombre+`')" style="cursor: pointer; margin-right: 10px;"><i class="fas fa-trash"></i></span>
                            <span onclick="showModalEditar(`+response.id+`)" style="cursor: pointer;"><i class="fas fa-pen"></i></span>
                          </td>
                          <td>`+response.id+`</td>
                          <td>`+response.nombre+`</td>
                          <td>`+response.apellidos+`</td>
                          <td>`+response.genero+`</td>
                          <td>`+response.fechaNacimiento+`</td>
                      </tr>`;
            $("#dataTable tbody").append(tr);
        },
        error: function() {
          alert("Ocurrio un error al insertar el regitro")
        }
    });
    $(this).trigger("reset");
  });
});

function showModalEditar(id){
  $("#modalEditar").modal("show");
  $.ajax({
    url: "http://localhost:3000/alumno/"+id,
    type: 'GET',
    success: function(response) {
      $("#inputNombreEditar").val(response.nombre);
      $("#inputApellidosEditar").val(response.apellidos);
      $("#selectGeneroEditar").val(response.genero);
      $("#inputFechaEditar").val(response.fechaNacimiento);
      $("#btnModalEditar").attr("data-id", id);
      $("#btnModalEditar").data("id", id);
    }
  });
}

$("#formUpdate").submit(function( e ) {
  e.preventDefault();
  var form = getFormData($(this));
  var id = $("#btnModalEditar").data("id");
  var genero = $("#selectGeneroEditar").val();
  var fecha = $("#inputFechaEditar").val();
  var RegExPattern = /^\d{4}\-\d{2}\-\d{2}$/;
  
  if(!fecha.match(RegExPattern)){
    alert("El formato de fecha es incorrecto")
    return;
  }

  if(genero == 0){
      alert("Selecciona genero");
      return;
  }

  $.ajax({
      url: "http://localhost:3000/alumno/"+id,
      type: "PUT",
      data: JSON.stringify(form),
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
          var html = `<td>
                        <span onclick="showModalEliminar(`+response.id+`,'`+response.nombre+`')" style="cursor: pointer; margin-right: 10px;"><i class="fas fa-trash"></i></span>
                        <span onclick="showModalEditar(`+response.id+`)" style="cursor: pointer;"><i class="fas fa-pen"></i></span>
                      </td>
                      <td>`+response.id+`</td>
                      <td>`+response.nombre+`</td>
                      <td>`+response.apellidos+`</td>
                      <td>`+response.genero+`</td>
                      <td>`+response.fechaNacimiento+`</td>`;
          $("#tr"+id).html(html);
          $("#modalEditar").modal("hide");
      },
      error: function() {
         alert("No se pudo editar el alumno")
      }
  });
  
});

function showModalEliminar(id, nombre){
  $("#btnModalEliminar").attr("data-id", id);
  $("#btnModalEliminar").data("id", id);
  $("#modalEliminar").modal("show");
  $("#modalEliminarText").html("¿Estas seguro de eliminar al alumno <strong>"+nombre+"</strong>?");
}

function deleteAlumno(id){
  $.ajax({
      url: "http://localhost:3000/alumno/"+id,
      type: "DELETE",
      success: function() {
          $("#tr"+id).remove();
      },
      error: function() {
          alert("Error al intenter eliminar el alumno");
      }
  });
  $("#modalEliminar").modal("hide");
}

function getFormData($form){
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function(n, i){
      indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}