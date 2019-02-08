'use strict'
var _tr = null;
$(document).ready(function () {
    var newURL = window.location.protocol + "//" + window.location.host + "/";




    $("#btnNovoNotaFiscalItem").click(function (e) {
        var action = String.format(newURL + "prestacaocontas/NotaFiscalItemFDEAPM/Criar?idNotaFiscal={0}&idTransferidoFdeApm={1}", $("#hdfIdNotaFiscal").val(), $("#hdfIdTransferidoFdeApm").val());
        e.preventDefault();

        $("#divCadastroItensNotaFiscal").empty();
        $("#divCadastroItensNotaFiscal").html("<div id='divNFI'></div>");

        $("#divNFI").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 1080,
            destroy: true,
        }).load(action, function () {
            $("#divNFI").dialog("open");
        });

    });


    $("#tblNotaFiscalItem").on("click", '#btnEditarNotaFiscalItem', function (e) {
        e.preventDefault();
        var action = String.format(newURL + "prestacaocontas/NotaFiscalItemFDEAPM/Editar?idItemNota={0}&idTransferidoFdeApm={1}&idNotaFiscal={2}", $(this).attr('data-id'), $("#hdfIdTransferidoFdeApm").val(), $("#hdfIdNotaFiscal").val());

        $("#divCadastroItensNotaFiscal").empty();
        $("#divCadastroItensNotaFiscal").html("<div id='divNFI'></div>");

        $("#divNFI").dialog({
            title: "Editar",
            autoOpen: false,
            width: 1080,
            destroy: true,
        }).load(action, function () {
            $("#divNFI").dialog("open");
        });

    });


    $("#tblNotaFiscalItem").on("click", '#btnExcluirNotaFiscalItem', function (e) {
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