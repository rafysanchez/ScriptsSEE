
  "use strict";
$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        delay: { "show": 0, "hide": 0 }
    })
});


$("#divT")
  .velocity({ opacity: 0 }, 2000)
  .velocity("reverse");


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
                    encerrarPrestacaoContas();
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

function encerrarPrestacaoContas()
{
    var token = $('input[name="__RequestVerificationToken"]').val();
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/PrestarContasFNDEPDDE/EncerrarPrestacaoContas',
        data: { __RequestVerificationToken: token, idLancamento: $('#hdfIdLancamento').val() },
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
                    prestacaoContas.atualizarConteudoAbas();
                } 
                else
                {
                    mensagemAlerta(data);
                }
            }
        },
        error: function (jqXHR, txtStatus, errorThrown)
        {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });
}

$("#abaPrincipal").sedTabControl();
$("#abasRepasse").sedTabControl();


$("#abasSaldo").sedTabControl();

$('#abaPrincipal a#tbSaldo').click(function (e) {
    e.preventDefault();

    $.ajax({
        cache: false,
        async: true,
        url: urlAbsoluta + 'Saldos/Obter',
        data: { idLancamento: $('#hdfIdLancamento').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data)
        {
            $('#divSaldos').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });

    e.preventDefault();
    $.ajax({
        cache: false,
        async: true,
        url: urlAbsoluta + 'Devolucao/Obter',
        data: { idLancamento: $('#hdfIdLancamento').val() },
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

$('#tabReceita a#tabRec').click(function (e) {
    e.preventDefault();

    $.ajax({
        cache: false,
        async: true,
        url: urlAbsoluta + 'RecursosProprios/Obter',
        data: { idLancamento: $('#hdfIdLancamento').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            $('#divRec').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });
});

$('#tabReceita a#tabRend').click(function (e) {
    e.preventDefault();
    var newURL = window.location.protocol + "//" + window.location.host + "/";
    
    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/Rendimentos/Obter',
        data: { idLancamento: $('#hdfIdLancamento').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            $('#divRend').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });
});

$("#abasDespesas").sedTabControl();

$('#abasDespesas a').click(function (e) {
    e.preventDefault();
    var aba = $("#abasDespesas").sedTabControl("atual");
    $("#abaInternaAtiva").attr('value', aba);
});



$('#tabDespesa a#tNf').click(function (e) {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/NotaFiscal/Obter',
        data: { idLancamento: $('#hdfIdLancamento').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            $('#divNf').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });

});

$('#tabDespesa a#tRecibo').click(function (e) {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/Recibo/Obter',
        data: { idLancamento: $('#hdfIdLancamento').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            $('#divRc').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });

});

$('#tabDespesa a#tReciboCartorio').click(function (e) {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/ReciboCartorio/Obter',
        data: { idLancamento: $('#hdfIdLancamento').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) { 
            $('#divRecCartorio').empty().html(data);          
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            console.log(errorThrown);
        }
    });

});

$('#tabDespesa a#tRpa').click(function (e) {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/Rpa/Obter',
        data: { idLancamento: $('#hdfIdLancamento').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            $('#divRpa').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });

});

$('#tabDespesa a#tOE').click(function (e) {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/TributosGDAE/Obter',
        data: { idLancamento: $('#hdfIdLancamento').val() },
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

$('#tabDespesa a#Saque').click(function (e) {
    var newURL = window.location.protocol + "//" + window.location.host + "/";
   // alert(newURL);
    debugger;
    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/Saques/Obter',
        data: { idLancamento: $('#hdfIdLancamento').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            $('#divSaquesLista').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            debugger;
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });

});




$('#abaPrincipal a#tbDespesa').click(function (e) {
    e.preventDefault();
    
    if ($("#ddlProgramaPesquisa").val() != "6") { //PDDE - QUALIDADE
        $('#liRpa').css({ 'pointer-events': 'none', 'opacity': '0.6' });
    }
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    $.ajax({
        cache: false,
        async: true,
        url: newURL + 'prestacaocontas/NotaFiscal/Obter',
        data: { idLancamento: $('#hdfIdLancamento').val() },
        type: 'POST',
        dataType: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            $('#divNf').empty().html(data);
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });

});

$('#abaPrincipal a').click(function (e) {
    e.preventDefault();
    var click = $(this);
    var aba = $("#abaPrincipal").sedTabControl("atual");
    $("#abaAtiva").attr('value', aba);
});


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

$('#btnPlanilhaGastos').click(function ()
{
    var newURL = window.location.protocol + "//" + window.location.host + "/";
    window.location = String.format(newURL + 'prestacaocontas/PrestarContasFNDEPDDE/GerarExcelPlanilhaGastos?idLancamento={0}', $(this).attr("data-id"));
});


