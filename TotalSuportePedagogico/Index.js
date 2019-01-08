jQuery(document).ready(function ($) {

});

function pesquisar(idTipo) {
    debugger;


    _url = '/SAS/TotalSuportePedagogico/Consolidado';


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
            $("#TotalSuportePedagogico").sedDataTable({ "ordering": false });
            
        },
        error: window.tratadorJSONException
    });
}




