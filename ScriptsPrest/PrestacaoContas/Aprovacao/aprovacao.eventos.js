"use strict";

$(document).ready(function () {

    $('#tbPrestacaoContas > tbody > tr').each(function () {
        var valido = $(this).closest('tr').attr('data-valido');
        if (valido == 'False') {
            $(this).find('#idDocExigidos').prop('disabled', true).css("color", "gray");
            $(this).find('#idFluxoDocumentos').prop('disabled', true).css("color", "gray");
            $(this).find('#idAvaliacao').prop('disabled', true).css("color", "gray");
            $(this).find('#slAprovaRevisa').prop('disabled', true).css("color", "gray");
        }
    });

 

    $("#tbPrestacaoContas").sedDataTable({
        columnDefs: [
           { targets: [13, 14, 15, 16, 17, 18, 19, 20], orderable: false },
        ],
        order: [[0, "asc"]],
    });

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
            $("#hdfIdLancamento").attr('value', id);
            var action = String.format(newURL + "prestacaocontas/Aprovacao/ObterPrestacaoContas?idLancamento={0}", id);

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


    $('#tbPrestacaoContas').on('click', '#idFluxoDocumentos', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        $("#hdfIdLancamento").attr('value', id);
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        var action = String.format(newURL + "prestacaocontas/Aprovacao/ObterFluxoDocumentos?idLancamento={0}", id);
        $("#divFluxoDocumentos").dialog({
            title: "Processo Físico",
            autoOpen: false,
            width: 'lg',
        }).load(action, function () {
            if ($("#divFluxoDocumentos").dialog("isOpen") === true) {
                $("#divFluxoDocumentos").dialog("open");
            }
        });
    });

    $('#planilhaGastos').click(function () {
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        window.location = String.format(newURL + 'prestacaocontas/Relatorios/GerarExcelPlanilhaGastos?idLancamento={0}', $(this).attr("data-id"));
    });

 
});