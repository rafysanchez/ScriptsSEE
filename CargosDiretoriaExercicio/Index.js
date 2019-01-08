jQuery(document).ready(function ($) {

});

function pesquisar(idTipo) {
    $("#resultado").html("");
    $.ajax({
        type: "GET",
        url: "/SAS/CargosDiretoriaExercicio/ListarConsolidado",
        data: {
            Mes: $("#mes option:selected").val(),
            Ano: $("#ano option:selected").val()
        },
        success: function (result, textStatus, jqXHR) {
            $("#resultado").html(result);
            $("#ServidoresAdidos").sedDataTable();
        },
        error: window.tratadorJSONException
    });
}