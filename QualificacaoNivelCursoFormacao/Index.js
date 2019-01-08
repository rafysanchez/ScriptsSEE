jQuery(document).ready(function ($) {

});

function pesquisar() {
    debugger;

    _url = '/SAS/QualificacaoNivelCursoFormacao/Consolidado';

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
            $("#QualificacaoNivelCursoFormacao").sedDataTable();
        },
        error: window.tratadorJSONException
    });
}




