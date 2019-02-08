"use strict";

$(document).ready(function () {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    if ($('#hdfFlValido').val() == 'false') {
        $('#btnNovoNotaFiscal').hide();

        $('#tblNotaFiscal > tbody > tr').each(function () {
            $(this).find('#btnPesquisaPrevia').prop('disabled', true).css("color","gray");
            $(this).find('#btnItensNotaFiscal').prop('disabled', true).css("color", "gray");
            $(this).find('#btnEditarNotaFiscal').prop('disabled', true).css("color", "gray");
            $(this).find('#btnExcluirNotaFiscal').prop('disabled', true).css("color", "gray");
        });
    }

    $("#btnNovoNotaFiscal").click(function (e) {
        e.preventDefault();

        var idTransferidoFdeApm = $("#hdfIdTransferidoFdeApm").val();
        
        $("#divNotaFiscais").empty();
        $("#divNotaFiscais").html("<div id='divDialogNF'></div>");

        $.ajax({
            url: urlAbsoluta + 'NotaFiscalFDEAPM/CriarNF_FDEAPM',
            data: { idTransferidoFdeApm: idTransferidoFdeApm },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {

                $("#divNotaFiscais").empty();
                $("#divNotaFiscais").html("<div id='divDialogNF'></div>");

                $("#divDialogNF").html(data);
                $("#divDialogNF").dialog({
                    title: "Novo Registro",
                    autoOpen: false,
                    destroy: true,
                    width: 1080,
                    close: function () { }
                }).dialog("open");
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });

    });


    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            delay: { "show": 0, "hide": 1000 }
        })
    });


    $("#tblNotaFiscal").on("click", '#btnEditarNotaFiscal', function (e)
    {
        e.preventDefault();
        var id = $(this).attr('data-id');

        $.ajax({
            url: urlAbsoluta + 'NotaFiscalFDEAPM/EditarNF', 
            data: { idNotaFiscal: id },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {

                $("#divNotaFiscais").empty();
                $("#divNotaFiscais").html("<div id='divDialogNF'></div>");

                $("#divDialogNF").html(data);
                $("#divDialogNF").dialog({
                    title: "Visualizar",
                    autoOpen: false,
                    destroy: true,
                    width: 1020,
                    close: function () { }
                }).dialog("open");

            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    });

    $("#tblNotaFiscal").on("click", '#btnExcluirNotaFiscal', function (e) {

        e.preventDefault();
        $('#hdfIdNotaFiscal').attr('value', $(this).attr("data-id"));

        Mensagem.Alert({
            titulo: "Confirmação de exclusão",
            mensagem: "Deseja realmente excluir o registro? Nota Fiscal, Pesquisa Prévia e Itens serão excluídos, confirma?",
            tipo: "alerta",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        _notaFiscal.excluir();
                    }
                },
                {
                    botao: "Não"
                }
            ]
        });
    });

    $("#tblNotaFiscal").on("click", '#btnPesquisaPrevia', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        var nrNotaFiscal = $(this).attr('data-nrNota');
        var idTransferido = $(this).attr('data-transferido');
        $("#hdfIdNotaFiscal").attr('value',id);
        $("#hdfNrNotaFiscal").attr('value',nrNotaFiscal);


        var action = String.format(newURL + "prestacaocontas/PesquisaPreviaFDEAPM/Obter?idNotaFiscal={0}&idTransferidoFdeApm={1}", id, idTransferido);

        $('#divNotaFiscalPesquisaPrevia').append('<div id="divListagemPesquisaPrevia">  </div>');
        $("#divListagemPesquisaPrevia").dialog({
            title: "Listagem",
            autoOpen: false,
            width: 1020,
            destroy: true
        }).load(action, function () {
            $("#divListagemPesquisaPrevia").dialog("open");
        });

    });

    
});