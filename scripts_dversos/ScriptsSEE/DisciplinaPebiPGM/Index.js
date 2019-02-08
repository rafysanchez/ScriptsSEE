jQuery(document).ready(function ($) {

});

function validar(request) {

    var valido = true;

    $("#mes").removeClass('error');
    $("#ano").removeClass('error');

    if (request.Mes == "") {
        $("#mes").addClass('error');
        valido = false;
    }

    if (request.Ano == "") {
        $("#ano").addClass('error');
        valido = false;
    }

    return valido;
}

function pesquisar() {
    $("#resultado").html("");

    var request = {
        Mes: $("#mes option:selected").val(),
        Ano: $("#ano option:selected").val()
    };

    var valido = validar(request);
    if (!valido) return;

    $.ajax({
        type: "GET",
        url: "/SAS/DisciplinaPebiPGM/Listar",
        data: request,
        success: function (result, textStatus, jqXHR) {
            $("#resultado").html(result);
            $("#tabela").sedDataTable();
        },
        error: function (err) {
            console.log(err);
        }
    });
}