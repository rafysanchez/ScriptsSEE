"use strict";

$(document).ready(function () {

    $('.valorMonetario').priceFormat({
        centsSeparator: ',',
        thousandsSeparator: '.'
    });

    $(".btnMotivoGlosa").click(function (e) {
        e.preventDefault();
        _recursosProprios.carregarMotivoGlosa(this);
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            delay: { "show": 0, "hide": 0 }
        })
    });


    $("#btnNovoRecursoProprio").click(function (e) {
        e.preventDefault();
        var action = passarIdsViaUrlERecuperarParaFormCadastro();
        $("#divRecursosProprios").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 768,
        }).load(action, function () {
            $("#divRecursosProprios").dialog("open");
        });
    });

    $("#tblRecursosProprios").on("click", '#btnEditar', function (e) {
        e.preventDefault();
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        var action = String.format(newURL + "prestacaocontas/RecursosProprios/Editar?id={0}", $(this).attr('data-id'));
        $("#divRecursosProprios").dialog({
            title: "Editar",
            autoOpen: false,
            width: 768,
        }).load(action, function () {
            $("#divRecursosProprios").dialog("open");
        });
    });

    $("#tblRecursosProprios").on("click", '#btnVisualizar', function (e) {
        e.preventDefault();
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        var action = String.format(newURL + "prestacaocontas/RecursosProprios/Editar?id={0}", $(this).attr('data-id'));
        $("#divRecursosProprios").dialog({
            title: "Visualizar",
            autoOpen: false,
            width: 768,
        }).load(action, function () {
            $("#divRecursosProprios").dialog("open");
        });
    });

    $("#tblRecursosProprios").on("click", '#btnExcluir', function (e) {
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
                        _recursosProprios.excluir();
                    }
                },
                {
                    botao: "Não"
                }
            ]
        });

    });


    $("#tblRecursosProprios").on('click', '#btnAprovar', function (e) {
        e.preventDefault();
        _recursosProprios.aprovar(this);
    });


    $("#tblRecursosProprios").on('click', '#btnReprovar', function (e) {
        e.preventDefault();
        debugger;
        var reprovado = $(this).attr('data-reprova');
        var idRecursoProprio = $(this).attr('data-id');
        var idLancamento = $(this).attr('data-lancamento');
        var flFinalizada = $(this).attr('data-finalizada');
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        if (parseInt(reprovado) == 0) {
            if (flFinalizada == 'True') {

            } else {
                $('#hdfLancamento').attr('value', idLancamento);
                $('#hdfIdRecursoProprio').attr('value', idRecursoProprio);

                $("#divReprova").empty();
                $("#divReprova").html("<div id='divDialogReprovaRecProprio'></div>");
                var action = newURL + 'prestacaocontas/TipoGlosa/ObterMotivoGlosaRecProprio';

                $("#divDialogReprovaRecProprio").dialog({
                    title: "Reprovar",
                    autoOpen: false,
                    destroy: true,
                    width: 768,
                }).load(action, function () {
                    $("#divDialogReprovaRecProprio").dialog("open");
                });
            }
        }
    });


    $("#tblRecursosProprios").on('click', '#btnDesfazerAprovacao', function (e) {
        e.preventDefault();

        $('#hdfIdRecursoProprio').attr('value', $(this).attr('data-id'));
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
                        _recursosProprios.desfazerAprovacao();
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


    $("#tblRecursosProprios").on('click', '#btnDesfazerReprovacao', function (e) {
        e.preventDefault();

        $('#hdfIdRecursoProprio').attr('value', $(this).attr('data-id'));
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
                        _recursosProprios.desfazerReprovacao();
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

    $('#btnAprovarTodosRecProprio').click(function (e) {
        e.preventDefault();
        _recursosProprios.aprovarEmLote();
    });
});


function preencherHiddenPraRecuperarNaExclusao(id) {
    $('#hdfIdRecursoProprio').attr('value', id);
}

function passarIdsViaUrlERecuperarParaFormCadastro() {
    var newURL = window.location.protocol + "//" + window.location.host + "/";
    return String.format(newURL + "prestacaocontas/RecursosProprios/Criar?idLancamento={0}", $("#hdfIdLancamento").val());
}
