jQuery(document).ready(function ($) {

});

function pesquisar() {
    $("#resultado").html("");
    $.ajax({
        type: "GET",
        url: "/SAS/TotalDocentesPorInterrupcaoCargoSexo/ListarConsolidado",
        data: {
            Mes: $("#mes option:selected").val(),
            Ano: $("#ano option:selected").val()
        },
        success: function (result, textStatus, jqXHR) {
            $("#resultado").html(result);
            $("#TotalDocentesPorInterrupcaoCargoSexo").sedDataTable({
                "ordering": false
            });
        },
        error: window.tratadorJSONException
    });
}