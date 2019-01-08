"use strict";

$(document).ready(function () {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            delay: { "show": 0, "hide": 0 }
        })
    });


    $("#btnNovoNotaFiscal").click(function (e)
    {
        e.preventDefault();
        var idLancamento = $("#hdfIdLancamento").val();
        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var action = String.format(newURL + "prestacaocontas/NotaFiscal/Criar?idLancamento={0}", idLancamento);

        $("#divNotaFiscais").empty();
        $("#divNotaFiscais").html("<div id='divDialogNF'></div>");

        $("#divDialogNF").dialog({
            title: "Novo Registro",
            autoOpen: false,
            destroy: true,
            width: 'lg',
            close: function () { }
        }).load(action, function ()
        {
            $("#divDialogNF").dialog("open");
        });
    });

    $("#tblNotaFiscal").on("click", '#btnEditar', function (e)
    {
        e.preventDefault();
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        var id = $(this).attr('data-id');
        var somenteLeitura = $(this).attr('data-leitura');
        var action = String.format(newURL + "prestacaocontas/NotaFiscal/Editar?id={0}&somenteLeitura={1}", id, somenteLeitura);

        $("#divNotaFiscais").empty();
        $("#divNotaFiscais").html("<div id='divDialogNF'></div>");

        $("#divDialogNF").dialog({
            title: "Editar",
            autoOpen: false,
            destroy: true,
            width: 'lg',
            close: function () { }
        }).load(action, function () {
            $("#divDialogNF").dialog("open");
        });
    });

    $("#tblNotaFiscal").on("click", '#btnExcluir', function (e) {

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

    $("#tblNotaFiscal").on("click", '#btnPesquisaPrevia', function (e)
    {
        e.preventDefault();
        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var id = $(this).attr('data-id');
        var nrNotaFiscal = $(this).attr('data-nrNota');

        $("#hdfIdNotaFiscal").attr('value',id);
        $("#hdfNrNotaFiscal").attr('value',nrNotaFiscal);
        
        var action = String.format(newURL + "prestacaocontas/PesquisaPrevia/CarregarPesquisaPrevia?idNotaFiscal={0}", id);

        $.ajax({
            type: 'GET',
            url: action,
            success: function (data)
            {
                if (data.status)
                {
                    $("#divNotaFiscalPesquisaPrevia").empty();
                    $("#divNotaFiscalPesquisaPrevia").html("<div id='divDialogNotaFiscalPesquisaPrevia'></div>");

                    $("#divDialogNotaFiscalPesquisaPrevia").html(data.view);
                    $("#divDialogNotaFiscalPesquisaPrevia").dialog({
                        title: "Pesquisa Prévia",
                        autoOpen: false,
                        destroy: true,
                        width: 1350,
                        close: function () { }
                    }).dialog("open");
                }
                else
                {
                    mensagemAlerta(data.resultadoOperacao);
                }
            },
            error: function (jqXHR, txtStatus, errorThrown)
            {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a exclusão' + errorThrown);
            }
        });

    });

    $("#tblNotaFiscal").on("click", '#btnItensNotaFiscal', function (e) {
        e.preventDefault();

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var id = $(this).attr('data-id');
        var nrNotaFiscal = $(this).attr('data-nrNota');
        var flAprovado = $(this).attr('data-aprovado');

        $("#hdfIdNotaFiscal").attr('value', id);
        $("#hdfNrNotaFiscal").attr('value', nrNotaFiscal);
        $("#hdfAprovado").attr('value', flAprovado);

        var action = String.format(newURL + "prestacaocontas/NotaFiscalItem/CarregarNotaFiscalItens?idNotaFiscal={0}&idLancamento={1}", id, $("#hdfIdLancamento").val());
        $("#divNotaFiscalItemNotaFiscal").dialog({
            title: "Itens da Nota Fiscal",
            autoOpen: false,
            width: 1020,
        }).load(action, function () {
            $("#divNotaFiscalItemNotaFiscal").dialog("open");
        });

    });

    $("#tblNotaFiscal").on("click", '#btnVisualizar', function (e) {
        e.preventDefault();

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var id = $(this).attr('data-id');
        var action = String.format(newURL + "prestacaocontas/NotaFiscal/Editar?id={0}&somenteLeitura={1}", id, true);

        $("#divNotaFiscais").empty();
        $("#divNotaFiscais").html("<div id='divDialogNF'></div>");

        $("#divDialogNF").dialog({
            title: "Visualizar",
            autoOpen: false,
            destroy: true,
            width: 1020,
            close: function () { }
        }).load(action, function () {
            $("#divDialogNF").dialog("open");
        });
    });

    $(".btnMotivoGlosa").click(function (e) {
        e.preventDefault();

        _notaFiscal.visualizarMotivoGlosa(this);
    });

    $("#tblNotaFiscal").on('click', '#btnAprovar', function (e) {
        e.preventDefault();
        var idNotaFiscal = $(this).attr('data-id');
        var idLancamento = $(this).attr('data-lancamento');
        var idReprova = $(this).attr('data-reprova');
        var flFinalizada = $(this).attr('data-finalizada');

        if (flFinalizada == 'True') {

        } else {

            $('#hdfLancamento').attr('value', idLancamento);
            $('#hdfIdNotaFiscal').attr('value', idNotaFiscal);
            _notaFiscal.aprovar(this);
        }
    });

    $("#tblNotaFiscal").on('click', '#btnReprovar', function (e) {
        e.preventDefault();

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var idNotaFiscal = $(this).attr('data-id');
        var idLancamento = $(this).attr('data-lancamento');
        var flFinalizada = $(this).attr('data-finalizada');

        if (flFinalizada == 'True') {

        } else {
            $('#hdfLancamento').attr('value', idLancamento);
            $('#hdfIdNotaFiscal').attr('value', idNotaFiscal);

            var action = newURL + 'prestacaocontas/Aprovacao/ObterItensNotaFiscal?idNotaFiscal=' + idNotaFiscal + '&idLancamento=' + idLancamento;

            $("#divReprova").empty();
            $("#divReprova").html("<div id='divDialogReprovaNF'></div>");
            $("#divDialogReprovaNF").dialog({
                title: "Reprova Itens Nota Fiscal",
                autoOpen: false,
                width: 768,
                destroy:true
            }).load(action, function () {
                $("#divDialogReprovaNF").dialog("open");
            });
        }
    });

    $("#btnEncerrar").click(function (e) {
        e.preventDefault();
        var idLancamento = $(this).attr('data-id');
        $('#hdfLancamento').attr('value', idLancamento);

        _notaFiscal.enviarPrestacaoAvaliacao();

    });

    $("#tblNotaFiscal").on('click', '#btnDesfazerAprovacao', function (e) {
        e.preventDefault();

        $('#hdfIdNotaFiscal').attr('value', $(this).attr('data-id'));
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
                        _notaFiscal.desfazerAprovacao();
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

    $("#tblNotaFiscal").on('click', '#btnDesfazerReprovacao', function (e) {
        e.preventDefault();

        $('#hdfIdNotaFiscal').attr('value', $(this).attr('data-id'));
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
                        _notaFiscal.desfazerReprovacao();
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

    $('#btnAprovarTodosNF').click(function (e) {
        e.preventDefault();
        _notaFiscal.aprovarNotaFiscalEmLote();
    });

});