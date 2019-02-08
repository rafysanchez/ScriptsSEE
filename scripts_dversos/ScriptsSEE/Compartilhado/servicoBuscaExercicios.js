var _buscaExercicios = (function () {

    function _obterExerciciosPorGrupoRepasse(codGrupoRepasse, ddl) {
    
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        $.ajax({
            type: "POST",
            url: newURL + 'prestacaocontas/PesquisaComum/ObterExerciciosPorGrupoRepasse',
            data: { codigoTipoPrograma: codGrupoRepasse },
            async: true,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {

                if (data != undefined) {
                    if (data.length > 1)
                        $(ddl).empty();
                    else
                        $("#ddlListaExercicio").empty();

                     $(data).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($(ddl));
                    });
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(ddl).empty().append($("<option></option>").attr("value", "").text("Selecione..."));

            }
        });
    }
 
    return {
        obterExerciciosPorGrupoRepasse: function (codGrupoRepasse, ddl) {
            _obterExerciciosPorGrupoRepasse(codGrupoRepasse, ddl);
        }
    }


})();