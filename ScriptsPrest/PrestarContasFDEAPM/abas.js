"use strict";
var newURL = window.location.protocol + "//" + window.location.host + "/";

$("#divT")
  .velocity({ opacity: 0 }, 2000)
  .velocity("reverse");

$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        delay: { "show": 0, "hide": 0 }
    })
});

$("#abaPrincipal").sedTabControl();
$("#abasRepasse").sedTabControl();


$("#abasSaldo").sedTabControl();

$("#abasDespesas").sedTabControl();


$('#abaPrincipal a').click(function (e) {
    e.preventDefault();
    var aba = $("#abaPrincipal").sedTabControl("atual");
    $("#abaAtiva").attr('value', aba);
});

$('#abasRepasse a').click(function (e) {
    e.preventDefault();
    var aba = $("#abasRepasse").sedTabControl("atual");
    $("#abaRepasseAtiva").attr('value', aba);
});

$('#abasDespesas a').click(function (e) {
    e.preventDefault();
    var aba = $("#abasDespesas").sedTabControl("atual");
    $("#abaInternaAtiva").attr('value', aba);
});


$('.box_toggle').click(function () {
    if ($(this).attr('class') == 'box_toggle fa fa-chevron-down') {
        $(this).removeAttr('class');
        $('#divTotalizadores').removeAttr('style');
        $(this).attr('class', 'box_toggle fa fa-chevron-up');
        $('#divTotalizadores').attr('style', 'display:none');

    } else {
        $(this).removeAttr('class');
        $('#divTotalizadores').removeAttr('style');
        $(this).attr('class', 'box_toggle fa fa-chevron-down');
        $('#divTotalizadores').attr('style', 'display:block');

    }

});

$('#btnEnviar').click(function (e) {
    e.preventDefault();

    Mensagem.Alert({
        titulo: "Encaminhar Prestação de Contas FDE",
        mensagem: "Deseja encaminhar para avaliação FDE?",
        tipo: "alerta",
        botoes: [
            {
                botao: "Sim",
                callback: function (e) {
                    e.preventDefault();
                    enviarPrestacaoAvaliacaoFde();
                }
            },
            {
                botao: "Não",
                callback: function () {
                    Mensagem.Fechar();
                }
            }
        ]
    });

});

function enviarPrestacaoAvaliacaoFde() {
    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/PrestarContasFDEAPM/EnviarPrestacaoAvaliacaoFde',
        data: { idTransferidoFdeApm: $('#hdfIdTransferidoFdeApm').val(), idLancamentoRepasseAssociado: $('#hdfIdLancamentoRepasseAssociado').val() },
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data)
        {
            if (data != null && data != undefined)
            {
                var status = data[0].Status;
                if (status == "Sucesso")
                {
                    mensagemAlerta(data);
                    prestacaoContas.atualizarConteudoAbasFdeApm($('#hdfIdTransferidoFdeApm').val(), $('#hdfIdLancamento').val(), 0, $('#hdfIdLancamentoRepasseAssociado').val());

                } else {
                    mensagemAlerta(data);
                }
            }
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });
}


$('#abaPrincipal a#tbSaldo').click(function (e) {
    e.preventDefault();

    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/DevolucaoFDEAPM/Obter',
        data: { idTransferidoFdeApm: $('#hdfIdTransferidoFdeApm').val(), idLancamentoRepasseAssociado: $('#hdfIdLancamentoRepasseAssociado').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            $('#divDevolucao').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });

});

$('#abaPrincipal a#tabOEntradas').click(function (e)
{
    e.preventDefault();

    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/OutrasEntradas/Obter',
        data: { idTransferidoFdeApm: $('#hdfIdTransferidoFdeApm').val(), idLancamentoRepasseAssociado: $('#hdfIdLancamentoRepasseAssociado').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data)
        {
            $('#divOutrasEntradas').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown)
        {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });
});


$('#abaPrincipal a#tbDespesa').click(function (e) {
    e.preventDefault();

    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/NotaFiscalFDEAPM/Obter',
        data: { idTransferidoFdeApm: $('#hdfIdTransferidoFdeApm').val(), idLancamentoRepasseAssociado: $('#hdfIdLancamentoRepasseAssociado').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data)
        {
            $('#divNf').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown)
        {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });


    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/OutrasSaidas/Obter',
        data: { idTransferidoFdeApm: $('#hdfIdTransferidoFdeApm').val(), idLancamentoRepasseAssociado: $('#hdfIdLancamentoRepasseAssociado').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            $('#divOutrasSaidas').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });

});


$('#btnPlanilhaGastos').click(function () {
    window.location = String.format(newURL + 'prestacaocontas/Cofi/GerarExcelPlanilhaGastos?idTransferidoFdeApm={0}', $(this).attr("data-id"));
});


