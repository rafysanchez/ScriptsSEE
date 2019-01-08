'use strict'
var _tr = null;
$(document).ready(function () {

    var newURL = window.location.protocol + "//" + window.location.host + "/";

    $("#btnNovoNotaFiscalItem").click(function (e)
    {
        var action = String.format(newURL + "prestacaocontas/NotaFiscalItem/Criar?idNotaFiscal={0}&idLancamento={1}", $("#hdfIdNotaFiscal").val(), $("#hdfIdLancamento").val());
        e.preventDefault();
        $("#divNfi").empty();
        $("#divNfi").html("<div id='divDialogNFI'></div>");
        $("#divDialogNFI").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 'lg',
        }).load(action, function () {
            $("#divDialogNFI").dialog("open");
        });

    });

    $("#tblNotaFiscalItem").on("click", '#btnEditar', function (e) {
        e.preventDefault();

        var action = String.format(newURL + "prestacaocontas/NotaFiscalItem/Editar?idItemNota={0}&idLancamento={1}&idNotaFiscal={2}", $(this).attr('data-id'), $("#hdfIdLancamento").val(), $("#hdfIdNotaFiscal").val());
          $("#divNfi").empty();
         $("#divNfi").html("<div id='divDialogNFI'></div>");
        $("#divDialogNFI").dialog({
            title: "Editar",
            autoOpen: false,
            width: 'lg',
        }).load(action, function () {
            $("#divDialogNFI").dialog("open");
        });
    });

    $("#tblNotaFiscalItem").on("click", '#btnVisualizar', function (e) {
        e.preventDefault();
        var action = String.format(newURL + "prestacaocontas/NotaFiscalItem/Editar?idItemNota={0}&idLancamento={1}&idNotaFiscal={2}", $(this).attr('data-id'), $("#hdfIdLancamento").val(), $("#hdfIdNotaFiscal").val());
        $("#divNfi").empty();
        $("#divNfi").html("<div id='divDialogNFI'></div>");

        $("#divDialogNFI").dialog({
            title: "Editar",
            autoOpen: false,
            width: 'lg',
        }).load(action, function () {
            $("#divDialogNFI").dialog("open");
        });
    });
    
    $("#tblNotaFiscalItem").on("click", '#btnExcluir', function (e) {
        e.preventDefault();
        $('#hdfIdNotaFiscalItem').attr('value', $(this).attr("data-id"));
        _tr = $(this).parent().parent();
        Mensagem.Alert({
            titulo: "Confirmação de exclusão",
            mensagem: "Deseja realmente excluir o registro?",
            tipo: "alerta",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {                     
                        _notaFiscalItens.excluir(_tr);
                    }
                },
                {
                    botao: "Não"
                }
            ]
        });
    });

});