'use strict'
var _tr = null;
$(document).ready(function () {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    $("#btnNovoNotaFiscalItem").click(function (e) {
        var action = String.format(newURL + "prestacaocontas/NotaFiscalItemFDEAPM/Criar?idNotaFiscal={0}&idTransferidoFdeApm={1}&idLancamentoRepasseAssociado={2}", $("#hdfIdNotaFiscal").val(), $("#hdfIdTransferidoFdeApm").val(), $('#hdfIdLancamentoRepasseAssociado').val());
        e.preventDefault();

        $("#divCadastroItensNotaFiscal").empty();
        $("#divCadastroItensNotaFiscal").html("<div id='divNFI'></div>");

        $("#divNFI").dialog({
            title: "Novo Item de Nota Fiscal",
            autoOpen: false,
            width: 1080,
            destroy: true,
        }).load(action, function () {
            $("#divNFI").dialog("open");
        });
    });

});