"use strict";

$(document).ready(function () {

    $("#btnNovoLancamentoDocExigidos").click(function (e)
    {
        e.preventDefault();

        $("#divLancamentoDocExigidosDialog").empty();
        $("#divLancamentoDocExigidosDialog").html("<div id='divDialogLancamentoDocsExigidos'></div>");

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var action = String.format(newURL + "prestacaocontas/LancamentoDocumentosExigidos/Criar?idLancamento={0}", $("#hdfIdLancamento").val());

        $("#divDialogLancamentoDocsExigidos").dialog({
            title: "Documentação Exigida",
            autoOpen: false,
            destroy: true,
            close: function () { },
            width: 980,
        }).load(action, function ()
        {
            if ($("#divDialogLancamentoDocsExigidos").dialog("isOpen") === true)
            {
                $("#divDialogLancamentoDocsExigidos").dialog("open");
            }
        });
    });


    $("#tblRecibo").on("click", '#btnEditarRecibo', function (e)
    {
        e.preventDefault();
        $("#divLancamentoDocExigidosDialog").empty();
        $("#divLancamentoDocExigidosDialog").html("<div id='divDialogLancamentoDocsExigidos'></div>");

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var action = String.format(newURL + "prestacaocontas/LancamentoDocumentosExigidos/Editar?id={0}", $(this).attr('data-id'));

        $("#divDialogLancamentoDocsExigidos").dialog({
            title: "Documentação Exigida - Edição",
            autoOpen: false,
            destroy: true,
            close: function () { },
            width: 980,
        }).load(action, function ()
        {
            if ($("#divDialogLancamentoDocsExigidos").dialog("isOpen") === true)
            {
                $("#divDialogLancamentoDocsExigidos").dialog("open");
            }
        });
    });



});
