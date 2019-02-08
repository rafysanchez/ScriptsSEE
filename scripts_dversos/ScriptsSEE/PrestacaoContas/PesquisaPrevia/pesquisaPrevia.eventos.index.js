'use strict'

var _tr = null;

$(document).ready(function () {

    $("#tblPesquisaPrevia").sedDataTable({
        columnDefs: [
    		{ targets: [8, 9], orderable: false },
        ],
        order: [[0, "asc"]],
    });


    //$("#btnNovoPesquisaPrevia").click(function (e) {
    //    var action = String.format("../CriarPesquisaPrevia?idNotaFiscal={0}&numeroNotaFiscal={1}&idLancamento={2}", $("#hdfIdNotaFiscal").val(), $("#hdfNrNotaFiscal").val(), $("#hdfIdLancamento").val());
    //    e.preventDefault();
    //    $("#divPesquisaPrevia").dialog({
    //        title: "Novo Registro",
    //        autoOpen: false,
    //        width: 980,
    //    }).load(action, function () {
    //        $("#divPesquisaPrevia").dialog("open");
    //    });

    //});

    //$("#tblPesquisaPrevia").on("click", '#btnEditarPesquisaPrevia', function (e) {
    //    e.preventDefault();
    //    var action = String.format("../EditarPesquisaPrevia?id={0}&idLancamento={1}", $(this).attr('data-id'), $("#hdfIdLancamento").val());
    //    $("#divPesquisaPrevia").dialog({
    //        title: "Editar",
    //        autoOpen: false,
    //        width: 980,
    //    }).load(action, function () {
    //        $("#divPesquisaPrevia").dialog("open");
    //    });

    //});

    $("#tblPesquisaPrevia").on("click", '#btnExcluirPesquisaPrevia', function (e) {
        e.preventDefault();
        $('#hdfIdPesquisaPrevia').attr('value', $(this).attr("data-id"));
        _tr = $(this).parent().parent();
        Mensagem.Alert({
            titulo: "Confirmação de exclusão",
            mensagem: "Deseja realmente excluir o registro?",
            tipo: "alerta",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        _pesquisaPrevia.excluir(_tr);
                    }
                },
                {
                    botao: "Não"
                }
            ]
        });

    });


});