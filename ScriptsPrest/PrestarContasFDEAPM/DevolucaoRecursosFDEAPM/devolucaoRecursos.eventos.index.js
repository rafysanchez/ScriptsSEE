"use strict";
var newURL = window.location.protocol + "//" + window.location.host + "/";
$(document).ready(function () {
       
    if ($('#hdfFlValido').val() == 'false') {
        $('#btnNovoDevolucaoRecursos').hide();

        $('#tblDevolucaoRecursos > tbody > tr').each(function () {
            $(this).find('#btnEditarDevolucaoRecursos').prop('disabled', true).css("color", "gray");
            $(this).find('#btnExcluirDevolucaoRecursos').prop('disabled', true).css("color", "gray");
        });
    }

    $("#tblDevolucaoRecursos").on("click", '#btnEditarDevolucaoRecursos', function (e) {
        e.preventDefault();
        var idLancamentoRepasseAssociado = $('#hdfIdLancamentoRepasseAssociado').val();

        var action = String.format(newURL + "prestacaocontas/DevolucaoFDEAPM/Editar?id={0}&idLancamentoRepasseAssociado={1}", $(this).attr('data-id'), idLancamentoRepasseAssociado);
        $("#divDevolucaoRecursos").dialog({
            title: "Editar",
            autoOpen: false,
            width: 1020,
        }).load(action, function () {
            $("#divDevolucaoRecursos").dialog("open");
        });
    });

    $("#tblDevolucaoRecursos").on("click", '#btnVisualizarDevolucaoRecursos', function (e) {
        e.preventDefault();
        var action = String.format(newURL + "prestacaocontas/DevolucaoFDEAPM/Editar?id={0}", $(this).attr('data-id'));
        $("#divDevolucaoRecursos").dialog({
            title: "Editar",
            autoOpen: false,
            width: 1020,
        }).load(action, function () {
            $("#divDevolucaoRecursos").dialog("open");
        });

    });

    $("#tblDevolucaoRecursos").on("click", '#btnExcluirDevolucaoRecursos', function (e) {
        e.preventDefault();
        preencherHiddenPraRecuperarNaExclusao($(this).attr("data-id"));
        Mensagem.Alert({
            titulo: "Confirmação de exclusão",
            mensagem: "Deseja realmente excluir o registro?",
            tipo: "alerta",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        _devolucaoRecuros.excluir();
                    }
                },
                {
                    botao: "Não"
                }
            ]
        });

    });

});


function preencherHiddenPraRecuperarNaExclusao(id) {
    $('#hdfIdDevolucaoRecursos').attr('value', id);
}


