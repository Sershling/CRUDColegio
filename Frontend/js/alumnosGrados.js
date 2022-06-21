// Call the dataTables jQuery plugin
$(document).ready(function() {
  $.ajax({
    url: "http://localhost:3000/alumnos",
    type: 'GET',
    success: function(response) {
      console.log(response)
      response.forEach(element => {
        var options = '<option value="'+element.id+'">'+element.nombre+' '+element.apellidos+'</option>';
        $("#selectAlumno").append(options);
        $("#selectAlumnoEditar").append(options);
      });
    }
  });

  $.ajax({
    url: "http://localhost:3000/grados",
    type: 'GET',
    success: function(response) {
      console.log(response)
      response.forEach(element => {
        var options = '<option value="'+element.id+'">'+element.nombre+'</option>';
        $("#selectGrado").append(options);
        $("#selectGradoEditar").append(options);
      });
    }
  });

  $.ajax({
    url: "http://localhost:3000/alumnosGrados",
    type: 'GET',
    success: function(response) {
      console.log(response)
      response.forEach(element => {
        var tr = `<tr id="tr`+element.id+`">
                      <td>
                        <span onclick="showModalEliminar(`+element.id+`)" style="cursor: pointer; margin-right: 10px;"><i class="fas fa-trash"></i></span>
                        <span onclick="showModalEditar(`+element.id+`)" style="cursor: pointer;"><i class="fas fa-pen"></i></span>
                      </td>
                      <td>`+element.id+`</td>
                      <td>`+element.alumno.nombre+` `+element.alumno.apellidos+`</td>
                      <td>`+element.grado.nombre+`</td>
                      <td>`+element.seccion+`</td>
                  </tr>`;
        $("#dataTable tbody").append(tr);
      });
     //$('#dataTable').DataTable();
    }
  });

  $("#alumnoGradoForm").submit(function( e ) {
    e.preventDefault();
    var alumno = $("#selectAlumno").val();
    var grado = $("#selectGrado").val();
    var form = getFormData($(this));

    if(alumno == 0){
      alert("Selecciona un alumno");
      return;
    }

    if(grado == 0){
      alert("Selecciona un grado");
      return;
    }

    $.ajax({
        url: "http://localhost:3000/alumnoGrado",
        type: "POST",
        data: JSON.stringify(form),
        dataType: 'json',
        contentType: 'application/json',
        success: function(response) {
            var tr = `<tr id="tr`+response.id+`">
                          <td>
                            <span onclick="showModalEliminar(`+response.id+`)" style="cursor: pointer; margin-right: 10px;"><i class="fas fa-trash"></i></span>
                            <span onclick="showModalEditar(`+response.id+`)" style="cursor: pointer;"><i class="fas fa-pen"></i></span>
                          </td>
                          <td>`+response.id+`</td>
                          <td>`+response.alumno.nombre+` `+response.alumno.apellidos+`</td>
                          <td>`+response.grado.nombre+`</td>
                          <td>`+response.seccion+`</td>
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
    url: "http://localhost:3000/alumnoGrado/"+id,
    type: 'GET',
    success: function(response) {
      $("#selectAlumnoEditar").val(response.alumnoId);
      $("#selectGradoEditar").val(response.gradoId);
      $("#inputSeccionEditar").val(response.seccion);
      $("#btnModalEditar").attr("data-id", id);
      $("#btnModalEditar").data("id", id);
    }
  });
}

$("#formUpdate").submit(function( e ) {
  e.preventDefault();
  var form = getFormData($(this));
  var id = $("#btnModalEditar").data("id");
  var alumno = $("#selectAlumnoEditar").val();
  var grado = $("#selectGradoEditar").val();
  console.log(id)
  console.log(form)
  if(alumno == 0){
    alert("Selecciona un alumno");
    return;
  }

  if(grado == 0){
    alert("Selecciona un grado");
    return;
  }

  $.ajax({
      url: "http://localhost:3000/alumnoGrado/"+id,
      type: "PUT",
      data: JSON.stringify(form),
      dataType: 'json',
      contentType: 'application/json',
      success: function(response) {
        console.log(response)
          var html = `<td>
                        <span onclick="showModalEliminar(`+response.id+`)" style="cursor: pointer; margin-right: 10px;"><i class="fas fa-trash"></i></span>
                        <span onclick="showModalEditar(`+response.id+`)" style="cursor: pointer;"><i class="fas fa-pen"></i></span>
                      </td>
                      <td>`+response.id+`</td>
                      <td>`+response.alumno.nombre+` `+response.alumno.apellidos+`</td>
                      <td>`+response.grado.nombre+`</td>
                      <td>`+response.seccion+`</td>`;
          $("#tr"+id).html(html);
          $("#modalEditar").modal("hide");
      },
      error: function() {
         alert("No se pudo editar el alumno")
      }
  });
  
});

function showModalEliminar(id){
  $("#btnModalEliminar").attr("data-id", id);
  $("#btnModalEliminar").data("id", id);
  $("#modalEliminar").modal("show");
  $("#modalEliminarText").html("¿Estas seguro de eliminar el registro con id <strong>"+id+"</strong>?");
}

function deleteAlumnoGrado(id){
  $.ajax({
      url: "http://localhost:3000/alumnoGrado/"+id,
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