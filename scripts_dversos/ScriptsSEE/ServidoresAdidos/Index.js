jQuery(document).ready(function ($) {

});

function pesquisar(idTipo) {
    debugger;

    if (idTipo == 1) {
        _url = '/SAS/ServidoresAdidos/Consolidado';
    } else if (idTipo == 2) {
        _url = '/SAS/ServidoresAdidos/CargosDiretoriaExercicioList';
    } else {
        _url = '/SAS/ServidoresAdidos/ViceDiretorCoordenadorList';
    }




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
            $("#ServidoresAdidos").sedDataTable();
        },
        error: window.tratadorJSONException
    });
}




