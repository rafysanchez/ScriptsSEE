"use strict";

$(document).ready(function () {

    //$('#tbPrestacaoContas > tbody > tr').each(function () {
    //    var valido = $(this).closest('tr').attr('data-valido');
    //    if (valido == 'False') {

    //        $(this).find('#planilhaGastos').prop('disabled', true).css("color", "gray");
    //        $(this).find('#termoDoacao').prop('disabled', true).css("color", "gray");
    //        $(this).find('#relacaoBens').prop('disabled', true).css("color", "gray");
    //        $(this).find('#execDespesaReceita').prop('disabled', true).css("color", "gray");
            
    //    }
    //});

 



   // $("#tbPrestacaoContas").sedDataTable();

    $('.valorMonetario').priceFormat({
        centsSeparator: ',',
        thousandsSeparator: '.'
    });


    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            delay: { "show": 0, "hide": 0 }
        })
    });


    $('#tbPrestacaoContas').on('click', '#idAvaliacao', function (e) {
        e.preventDefault();
        var newURL = window.location.protocol + "//" + window.location.host + "/";
        try
        {
            var id = $(this).attr('data-id');
            var idLancamentoRepasseAssociado = $(this).data('lancamentorepasseassociado');
            $("#hdfIdTransferidoFdeApm").attr('value', id);

            var action = String.format(newURL + "prestacaocontas/AprovacaoFDEAPM/ObterPrestacaoContasFdeApm?idTransferidoFdeApm={0}&idLancamentoRepasseAssociado={1}", id, idLancamentoRepasseAssociado);

            $.ajax({
                type: 'GET',
                url: action,
                success: function (data)
                {
                    $("#divPContas").empty();
                    $("#divPContas").html("<div id='divDialogPC'></div>");

                    $("#divDialogPC").html(data).dialog({
                        title: "Aprovação de Prestação de Contas",
                        width: 'lg',
                        autoOpen: false,
                        destroy: true,
                        close: function () { }
                    }).dialog("open");
                },
                error: function (e)
                {
                    $("#divPContas").empty();
                    mensagemAlerta.ErroAjax('Ocorreu um erro: ' + e);
                }
            });
        }
        catch (e)
        {
            $("#divPContas").empty();
            mensagemAlerta.ErroAjax('Ocorreu um erro: ' + e);
        }
        
    });


});