var buscasComuns = (function () {

    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _carregarDropDownPerfilEscola() {
        debugger
        $.ajax({
            type: "POST",
            url: newURL + 'OrcamentoParticipativo/PesquisaComum/ObterListasPesquisa',
            async: true,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data.ListaDiretorias != undefined) {
                    if (data.ListaDiretorias.length > 1)
                        $("#ddlDiretoria").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    else
                        $("#ddlDiretoria").empty();
                    //$("#ddlDiretoriaPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));

                    $(data.ListaDiretorias).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#ddlDiretoria"));
                    });
                }
                debugger
                if (data.ListaEscolas != undefined) {
                    if (data.ListaEscolas.length > 1)

                    { $("#CodigoEscola").empty().append($("<option></option>").attr("value", "").text("Selecione...")); }
                    else
                    { $("#CodigoEscola").empty(); }

                    $(data.ListaEscolas).each(function () {
                        $('<option>').val(this.Codigo)
                                     .text(this.Nome)
                                     .appendTo($("#CodigoEscola"));
                    });
                }

                $('#ddlDiretoria').trigger("change");


            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    return {

        carregarDropDownPerfilEscola: function () {
            _carregarDropDownPerfilEscola();
        }
    }
})();