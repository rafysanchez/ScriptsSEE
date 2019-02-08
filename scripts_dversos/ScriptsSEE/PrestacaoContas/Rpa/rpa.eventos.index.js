"use strict";

$(document).ready(function () {

    if ($('#hdfFlValido').val() == 'false') {
        $('#btnNovoRpa').hide();

        $('#tblRpa > tbody > tr').each(function () {
            $(this).find('#btnEditarRpa').prop('disabled', true).css("color", "gray");
            $(this).find('#btnExcluirRpa').prop('disabled', true).css("color", "gray");
        });
    }

    $("#btnNovoRpa").click(function (e) {
        e.preventDefault();
        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var action = String.format(newURL + "prestacaocontas/Rpa/Criar?idLancamento={0}", $("#hdfIdLancamento").val());

        $("#divRpaDialog").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 980
        }).load(action, function () {
            $("#divRpaDialog").dialog("open");
        });
    });

    $("#tblRpa").on("click", '#btnEditar', function (e) {
        e.preventDefault();
        var flReprova = $(this).attr('data-reprova');
        var somenteLeitura = $(this).attr('data-leitura');
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        if (flReprova != "1") {
            flReprova = "false";
        } else {
            flReprova = "true";
        }

        var action = String.format(newURL + "prestacaocontas/Rpa/Editar?id={0}&flReprova={1}&somenteLeitura={2}", $(this).attr('data-id'), flReprova, somenteLeitura);
        $("#divRpaDialog").dialog({
            title: "Editar",
            autoOpen: false,
            width: 980,
        }).load(action, function () {
            $("#divRpaDialog").dialog("open");
        });
    });

    $("#tblRpa").on("click", '#btnVisualizar', function (e) {
        e.preventDefault();
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        var action = String.format(newURL + "prestacaocontas/Rpa/Editar?id={0}&flReprova={1}&somenteLeitura={2}", $(this).attr('data-id'));
        $("#divRpaDialog").dialog({
            title: "Visualizar",
            autoOpen: false,
            width: 980,
        }).load(action, function () {
            $("#divRpaDialog").dialog("open");
        });
    });

    $("#tblRpa").on("click", '#btnExcluir', function (e) {
        e.preventDefault();

        preencherHiddenPraRecuperarNaExclusao($(this).attr("data-id"))
        Mensagem.Alert({
            titulo: "Confirmação de exclusão",
            mensagem: "Deseja realmente excluir o registro?",
            tipo: "alerta",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        _rpa.excluir();
                    }
                },
                {
                    botao: "Não"
                }
            ]
        });

    });

    $("#tblRpa").on('click', '#btnAprovar', function (e) {
        e.preventDefault();

        var idRpa = $(this).attr('data-id');
        var idLancamento = $(this).attr('data-lancamento');
        var flFinalizada = $(this).attr('data-finalizada');
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        if (flFinalizada == 'True') {

        } else {

            $('#hdfLancamento').attr('value', idLancamento);
            $('#hdfIdRpa').attr('value', idRpa);
            $.ajax({
                cache: false,
                url: newURL + 'prestacaocontas/Aprovacao/AprovarRpa',
                data: { idLancamento: idLancamento, idRpa: idRpa },
                type: 'POST',
                datatype: 'HTML',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    if (data != null && data != undefined) {
                        var status = data[0].Status;
                        if (status == "Sucesso") {
                            mensagemAlerta(data);
                            _rpa.atualizarRpa();
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
        

    $("#tblRpa").on('click', '#btnReprovar', function (e) {
        e.preventDefault();
        var flFinalizada = $(this).attr('data-finalizada');
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        $('#hdfIdRpa').attr('value', $(this).attr("data-id"));
        $('#hdfLancamento').attr('value', $(this).attr("data-lancamento"));

        if (flFinalizada == 'True') { } else {

            $("#divReprova").empty();
            $("#divReprova").html("<div id='divRpaReprova'></div>");

            var action = String.format(newURL + "prestacaocontas/TipoGlosa/ObterTipoGlosaRPA");
            $("#divRpaReprova").dialog({
                title: "Reprova RPA",
                autoOpen: false,
                width: 980,
            }).load(action, function () {
                $("#divRpaReprova").dialog("open");
            });
        }
    });


    $("#divReprovaRpa").on('click', '#btnEnviarReprovacao', function (e) {
        e.preventDefault();
        if ($('#txtMotivo').val() != "") {
            _rpa.reprova();
        }
        else {
            mensagemAlerta.Alerta('Antes de encaminhar selecione os itens e informe um motivo!');
        }
    });
});

function preencherHiddenPraRecuperarNaExclusao(id) {
    $('#hdfIdRpa').attr('value', id);
}

$('#btnAprovarTodosRPA').click(function (e) {
    e.preventDefault();
    _rpa.aprovarEmLote();
});

