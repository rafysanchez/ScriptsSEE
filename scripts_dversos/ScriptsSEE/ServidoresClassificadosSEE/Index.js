jQuery(document).ready(function ($) {

});

function pesquisar() {
    $("#resultado").html("");
    $.ajax({
        type: "GET",
        url: "/SAS/ServidoresClassificadosSEE/ListarConsolidado",
        data: {
            Mes: $("#mes option:selected").val(),
            Ano: $("#ano option:selected").val()
        },
        success: function (result, textStatus, jqXHR) {
            $("#resultado").html(result);
            $("#ServidoresClassificadosSEE").sedDataTable();
        },
        error: window.tratadorJSONException
    });
}