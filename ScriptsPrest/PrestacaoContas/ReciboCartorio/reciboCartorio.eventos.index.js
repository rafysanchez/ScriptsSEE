"use strict";

$(document).ready(function () {

    AplicarMascaras();

    $("#btnNovoReciboCartorio").click(function (e) {
        e.preventDefault();
        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var action = String.format(newURL + "prestacaocontas/ReciboCartorio/Criar?idLancamento={0}", $("#hdfIdLancamento").val());
        
        $("#divReciboCartorio").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 980,
        }).load(action, function () {
            $("#divReciboCartorio").dialog("open");
        });
    });

    $("#tblReciboCartorio").on("click", '#btnEditar', function (e) {
        e.preventDefault();

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var action = String.format(newURL + "prestacaocontas/ReciboCartorio/Editar?id={0}", $(this).attr('data-id'));
        $("#divReciboCartorio").dialog({
            title: "Editar",
            autoOpen: false,
            width: 980,
        }).load(action, function () {
            $("#divReciboCartorio").dialog("open");
        });
    });

    $("#tblReciboCartorio").on("click", '#btnVisualizar', function (e) {
        e.preventDefault();

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var action = String.format(newURL + "prestacaocontas/ReciboCartorio/Editar?id={0}", $(this).attr('data-id'));
        $("#divReciboCartorio").dialog({
            title: "Visualizar",
            autoOpen: false,
            width: 980,
        }).load(action, function () {
            $("#divReciboCartorio").dialog("open");
        });
    });

    $("#tblReciboCartorio").on("click", '#btnExcluir', function (e) {
        e.preventDefault();
        
        $("#hdfIdReciboCartorio").attr("value", $(this).attr("data-id"));
        Mensagem.Alert({
            titulo: "Confirmação de exclusão",
            mensagem: "Deseja realmente excluir o registro?",
            tipo: "alerta",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        _reciboCartorio.excluir();
                    }
                },
                {
                    botao: "Não"
                }
            ]
        });
    });


    $("#tblReciboCartorio").on('click', '#btnAprovar', function (e) {
        e.preventDefault();
        _reciboCartorio.aprovar(this);
    });

    $("#tblReciboCartorio").on('click', '#btnReprovar', function (e) {
        e.preventDefault();

        var reprovado = $(this).attr('data-reprova');
        var idReciboCartorio = $(this).attr('data-id');
        var idLancamento = $(this).attr('data-lancamento');
        var flFinalizada = $(this).attr('data-finalizada');
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        if (parseInt(reprovado) == 0)
        {
            if (flFinalizada == 'True') {

            }
            else
            {
                $('#hdfLancamento').attr('value', idLancamento);
                $('#hdfIdReciboCartorio').attr('value', idReciboCartorio);

                $("#divReprova").empty();
                $("#divReprova").html("<div id='divDialogReprovaReciboCartorio'></div>");
                var action = newURL + 'prestacaocontas/TipoGlosa/ObterMotivoGlosaReciboCartorio';

                $("#divDialogReprovaReciboCartorio").dialog({
                    title: "Reprovar",
                    autoOpen: false,
                    destroy: true,
                    width: 768,
                }).load(action, function () {
                    $("#divDialogReprovaReciboCartorio").dialog("open");
                });
            }
        }

    });

    $("#tblReciboCartorio").on('click', '#btnDesfazerAprovacao', function (e) {
        e.preventDefault();

        $('#hdfIdReciboCartorio').attr('value', $(this).attr('data-id'));
        $('#hdfLancamento').attr('value', $(this).attr('data-lancamento'));

        Mensagem.Alert({
            titulo: "Confirmar",
            mensagem: "Tem certeza que deseja desfazer a aprovação?",
            tipo: "alerta",
            botoes:
            [
                {
                    botao: "Sim",
                    callback: function (e) {
                        e.preventDefault();
                        _reciboCartorio.desfazerAprovacao();
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

    $("#tblReciboCartorio").on('click', '#btnDesfazerReprovacao', function (e) {
        e.preventDefault();

        $('#hdfIdReciboCartorio').attr('value', $(this).attr('data-id'));
        $('#hdfLancamento').attr('value', $(this).attr('data-lancamento'));

        Mensagem.Alert({
            titulo: "Confirmar",
            mensagem: "Tem certeza que deseja desfazer a reprovação?",
            tipo: "alerta",
            botoes:
            [
                {
                    botao: "Sim",
                    callback: function (e) {
                        e.preventDefault();
                        _reciboCartorio.desfazerReprovacao();
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

    $('#btnAprovarTodosRecCartorio').click(function (e) {
        e.preventDefault();
        _reciboCartorio.aprovarEmLote();
    });


});


