"use strict";

$(document).ready(function () {

    if ($('#hdfFlValido').val() == 'false') {
        $('#btnNovoRecibo').hide();

        $('#tblRecibo > tbody > tr').each(function () {
            $(this).find('#btnEditarRecibo').prop('disabled', true).css("color", "gray");
            $(this).find('#btnExcluirRecibo').prop('disabled', true).css("color", "gray");
        });
    }

    $("#btnNovoRecibo").click(function (e)
    {
        e.preventDefault();
        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var action = String.format(newURL + "prestacaocontas/Recibo/Criar?idLancamento={0}", $("#hdfIdLancamento").val());
        
        $("#divRecibo").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 980,
        }).load(action, function () {
            $("#divRecibo").dialog("open");
        });
    });

    $("#tblRecibo").on("click", '#btnEditar', function (e) {
        e.preventDefault();

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var flReprova = $(this).attr('data-reprova');
        var somenteLeitura = $(this).attr('data-leitura');

        if (flReprova != "1") {
            flReprova = "false";
        } else {
            flReprova = "true";
        }

        var action = String.format(newURL + "prestacaocontas/Recibo/Editar?id={0}&flReprova={1}&somenteLeitura={2}", $(this).attr('data-id'), flReprova, somenteLeitura);
        $("#divRecibo").dialog({
            title: "Editar",
            autoOpen: false,
            width: 980,
        }).load(action, function () {
            $("#divRecibo").dialog("open");
        });
    });

    $("#tblRecibo").on("click", '#btnVisualizar', function (e) {
        e.preventDefault();

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var flReprova = $(this).attr('data-reprova');
        var somenteLeitura = $(this).attr('data-leitura');

        if (flReprova != "1") {
            flReprova = "false";
        } else {
            flReprova = "true";
        }

        var action = String.format(newURL + "prestacaocontas/Recibo/Editar?id={0}&flReprova={1}&somenteLeitura={2}", $(this).attr('data-id'), flReprova, somenteLeitura);
        $("#divRecibo").dialog({
            title: "Visualizar",
            autoOpen: false,
            width: 980,
        }).load(action, function () {
            $("#divRecibo").dialog("open");
        });
    });


    $("#tblRecibo").on("click", '#btnExcluir', function (e) {
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
                        _recibo.excluir();
                    }
                },
                {
                    botao: "Não"
                }
            ]
        });
    });

    $("#tblRecibo").on('click', '#btnAprovar', function (e) {
        e.preventDefault();

        var idRecibo = $(this).attr('data-id');
        var idLancamento = $(this).attr('data-lancamento');
        var flFinalizada = $(this).attr('data-finalizada');
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        if (flFinalizada == 'True') { } else {
            $('#hdfLancamento').attr('value', idLancamento);
            $('#hdfIdRecibo').attr('value', idRecibo);

            $.ajax({
                cache: false,
                url: newURL + 'prestacaocontas/Aprovacao/AprovarRecibo',
                data: { idLancamento: idLancamento, idReciboMonitoria: idRecibo },
                type: 'POST',
                datatype: 'HTML',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    if (data != null && data != undefined) {
                        var status = data[0].Status;
                        if (status == "Sucesso") {
                            mensagemAlerta(data);
                            _recibo.atualizarRecibo();
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
    });


    $("#tblRecibo").on('click', '#btnReprovar', function (e) {
        e.preventDefault();
        var flFinalizada = $(this).attr('data-finalizada');
        var newURL = window.location.protocol + "//" + window.location.host + "/";
     
        $('#hdfIdRecibo').attr('value', $(this).attr('data-id'));
        $('#hdfLancamento').attr('value', $(this).attr('data-lancamento'));

        if (flFinalizada == 'True') { } else {
            var action = newURL + 'prestacaocontas/TipoGlosa/ObterMotivoGlosaReciboMonitoria';

            $("#divRecibo").empty();
            $("#divRecibo").html("<div id='divDialogRecibo'></div>");

            $("#divDialogRecibo").dialog({
                title: "Reprova Recibo",
                autoOpen: false,
                width: 980,
            }).load(action, function () {
                $("#divDialogRecibo").dialog("open");
            });
        }
    });

});

function preencherHiddenPraRecuperarNaExclusao(id) {
    $('#hdfIdRecibo').attr('value', id);
}

$('#btnAprovarTodosRecibo').click(function (e) {
    e.preventDefault();
    _recibo.aprovarEmLote();
});