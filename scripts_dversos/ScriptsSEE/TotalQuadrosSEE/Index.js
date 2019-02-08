
jQuery(document).ready(function ($) {

});

function pesquisar(idTipo) {
    debugger;


    _url = '/SAS/TotalQuadrosSEE/Consolidado';


    $("#resultado").html("");
    $.ajax({
        type: "GET",
        url: _url,
        data: {
            Mes: $("#mes option:selected").val(),
            Ano: $("#ano option:selected").val()
        },
        success: function (result, textStatus, jqXHR) {
            $("#resultado").html(result);
            $("#TotalQuadrosSEE").sedDataTable({ "ordering": false });

        },
        error: window.tratadorJSONException
    });
}





