"use strict";
$(document).ready(function () {
    AplicarMascaras();

    if ($('#hdfFlValido').val() == 'false') {
        $('#btnNovoRendimento').hide();

        $('#tblRendimentos > tbody > tr').each(function () {
            $(this).find('#btnEditarRendimentos').prop('disabled', true).css("color", "gray");
            $(this).find('#btnExcluirRendimentos').prop('disabled', true).css("color", "gray");
        });
    }

$("#txtVlCusteioR").maskMoney({ showSymbol: false, decimal: ",", thousands: "." });
    $("#txtVlCapitalR").maskMoney({ showSymbol: false, decimal: ",", thousands: "." });

    $("#txtVlCusteioR").focusout(function (e) {
        e.preventDefault();
        calcularTotal(this, $("#txtVlCapitalR"), $("#txtVlTotalR"));
    });

    $("#txtVlCapitalR").focusout(function (e) {
        e.preventDefault();
        calcularTotal($("#txtVlCusteioR"), this, $("#txtVlTotalR"));

    });



    $("#btnNovoRendimento").click(function (e) {
        e.preventDefault();
        var action = passarIdsViaUrlERecuperarParaFormCadastro();

        $("#divRendimentos").empty();
        $("#divRendimentos").html("<div id='divDialogRendimentos'></div>");

        $("#divDialogRendimentos").dialog({
            title: "Novo Registro",
            autoOpen: false,
            destroy: true,
            width: 768,
        }).load(action, function () {
            $("#divDialogRendimentos").dialog("open");
        });

    });

   
    $("#tblRendimentos").on("click", '#btnEditar', function (e) {
        e.preventDefault();
       
        $("#divRendimentos").empty();
        $("#divRendimentos").html("<div id='divDialogRendimentos'></div>");
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        var action = String.format(newURL + "prestacaocontas/Rendimentos/Editar?id={0}", $(this).attr('data-id'));
        $("#divDialogRendimentos").dialog({
            title: "Editar",
            autoOpen: false,
            destroy:true,
            width: 768,
        }).load(action, function () {
            $("#divDialogRendimentos").dialog("open");
        });

    });

    $("#tblRendimentos").on("click", '#btnVisualizar', function (e) {
        e.preventDefault();
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        var action = String.format(newURL + "prestacaocontas/Rendimentos/Editar?id={0}", $(this).attr('data-id'));
        $("#divRendimentos").empty();
        $("#divRendimentos").html("<div id='divDialogRendimentos'></div>");
        $("#divDialogRendimentos").dialog({
            title: "Visualizar",
            autoOpen: false,
            destroy:true,
            width: 768,
        }).load(action, function () {
            $("#divDialogRendimentos").dialog("open");
        });

    });


    $("#tblRendimentos").on("click", '#btnExcluir', function (e) {
        e.preventDefault();

        $('#hdfIdRendimento').attr('value', $(this).attr("data-id"));

        Mensagem.Alert({
            titulo: "Confirmação de exclusão",
            mensagem: "Deseja realmente excluir o registro?",
            tipo: "alerta",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        _rendimentos.excluir();
                    }
                },
                {
                    botao: "Não"
                }
            ]
        });

    });

    $("#tblRendimentos").on('click', '#btnAprovar', function (e) {
        e.preventDefault();
        _rendimentos.aprovar(this);
    });

    $("#tblRendimentos").on('click', '#btnReprovar', function (e) {
        e.preventDefault();

        var reprovado = $(this).attr('data-reprova');
        var idRendimentos = $(this).attr('data-id');
        var idLancamento = $(this).attr('data-lancamento');
        var flFinalizada = $(this).attr('data-finalizada');
        var newURL = window.location.protocol + "//" + window.location.host + "/";

        if (parseInt(reprovado) == 0) {
            if (flFinalizada == 'True') {

            } else {
                $('#hdfLancamento').attr('value', idLancamento);
                $('#hdfIdRendimento').attr('value', idRendimentos);

                $("#divReprova").empty();
                $("#divReprova").html("<div id='divDialogReprovaRendimentos'></div>");
                var action = newURL + 'prestacaocontas/TipoGlosa/ObterMotivoGlosaRendimentos';

                $("#divDialogReprovaRendimentos").dialog({
                    title: "Reprovar",
                    autoOpen: false,
                    destroy: true,
                    width: 768,
                }).load(action, function () {
                    $("#divDialogReprovaRendimentos").dialog("open");
                });
            }
        }
    });

    $("#tblRendimentos").on('click', '#btnDesfazerAprovacao', function (e) {
        e.preventDefault();

        $('#hdfIdRendimento').attr('value', $(this).attr('data-id'));
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
                        _rendimentos.desfazerAprovacao();
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
 
    $("#tblRendimentos").on('click', '#btnDesfazerReprovacao', function (e) {
        e.preventDefault();

        $('#hdfIdRendimento').attr('value', $(this).attr('data-id'));
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

                        _rendimentos.desfazerReprovacao();
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


    $('#btnAprovarTodosREND').click(function (e) {
        e.preventDefault();
        _rendimentos.aprovarEmLote();
    });
});


function passarIdsViaUrlERecuperarParaFormCadastro() {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    return String.format(newURL + "prestacaocontas/Rendimentos/Criar?idLancamento={0}", $("#hdfIdLancamento").val());
}