"use strict";

$(document).ready(function () {
       
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            delay: { "show": 0, "hide": 0 }
        })
    });
    

    if ($('#hdfFlValido').val() == 'false') {
        $('#btnNovoDevolucaoRecursos').hide();

        $('#tblDevolucaoRecursos > tbody > tr').each(function () {
            $(this).find('#btnEditarDevolucaoRecursos').prop('disabled', true).css("color", "gray");
            $(this).find('#btnExcluirDevolucaoRecursos').prop('disabled', true).css("color", "gray");
        });
    }

    $("#btnNovoDevolucaoRecursos").click(function (e) {
        e.preventDefault();
        var action = passarIdsViaUrlERecuperarParaFormCadastro();
        $("#divDevolucaoRecursos").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 1020,
        }).load(action, function () {
            $("#divDevolucaoRecursos").dialog("open");
        });

    });

    $("#tblDevolucaoRecursos").on("click", '#btnEditar', function (e) {
        e.preventDefault();

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var action = String.format(newURL + "prestacaocontas/Devolucao/Editar?id={0}", $(this).attr('data-id'));

        $("#divDevolucaoRecursos").dialog({
            title: "Editar",
            autoOpen: false,
            width: 1020,
        }).load(action, function () {
            $("#divDevolucaoRecursos").dialog("open");
        });

    });

    $("#tblDevolucaoRecursos").on("click", '#btnVisualizar', function (e) {
        e.preventDefault();

        var newURL = window.location.protocol + "//" + window.location.host + "/";
        var action = String.format(newURL + "prestacaocontas/Devolucao/Editar?id={0}", $(this).attr('data-id'));
        $("#divDevolucaoRecursos").dialog({
            title: "Visualizar",
            autoOpen: false,
            width: 1020,
        }).load(action, function () {
            $("#divDevolucaoRecursos").dialog("open");
        });

    });

    $("#tblDevolucaoRecursos").on("click", '#btnExcluir', function (e) {
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
                        _devolucaoRecuros.excluir();
                    }
                },
                {
                    botao: "Não"
                }
            ]
        });

    });

   $("#tblDevolucaoRecursos").on('click', '#btnAprovar', function (e) {
       e.preventDefault();

       var idSaldo = $(this).attr('data-id');
       var idLancamento = $(this).attr('data-lancamento');
       var idReprova = $(this).attr('data-reprova');
       var flFinalizada = $(this).attr('data-finalizada');

       if (flFinalizada == 'True') {

       } else {

           var newURL = window.location.protocol + "//" + window.location.host + "/";
           $('#hdfLancamento').attr('value', idLancamento);
           $('#hdfIdDevolucaoRecursos').attr('value', idSaldo);

           $.ajax({
               cache: false,
               url: newURL + 'prestacaocontas/Aprovacao/AprovarSaldoDevolvido',
               data: { idLancamento: idLancamento, idSaldo: idSaldo },
               type: 'POST',
               datatype: 'HTML',
               contentType: 'application/x-www-form-urlencoded; charset=utf-8',
               success: function (data) {
                   if (data != null && data != undefined) {
                       var status = data[0].Status;
                       if (status == "Sucesso") {
                           //mensagemAlerta(data);
                           _devolucaoRecuros.atualizar();
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

   $("#tblDevolucaoRecursos").on('click', '#btnReprovar', function (e) {
       e.preventDefault();

       var reprovado = $(this).attr('data-reprova');
       var idSaldo = $(this).attr('data-id');
       var idLancamento = $(this).attr('data-lancamento');
       var flFinalizada = $(this).attr('data-finalizada');

       if (parseInt(reprovado) == 0) {
           if (flFinalizada == 'True') {

           }
           else
           {
               var newURL = window.location.protocol + "//" + window.location.host + "/";
               $('#hdfLancamento').attr('value', idLancamento);
               $('#hdfIdDevolucaoRecursos').attr('value', idSaldo);
               var criterio = $(this).attr('data-flCriterio');

               $("#divReprova").empty();
               $("#divReprova").html("<div id='divDialogReprovaSaldoDevolvido'></div>");
               var action = newURL + 'prestacaocontas/TipoGlosa/ObterMotivoGlosaDevolucaoRecursos';

               $("#divDialogReprovaSaldoDevolvido").dialog({
                   title: "Reprovar Saldo Devolvido",
                   autoOpen: false,
                   destroy: true,
                   width: 768,
                   close: function () { }
               }).load(action, function () {
                   $("#divDialogReprovaSaldoDevolvido").dialog("open");
               });
           }
       }
   });

   $("#tblDevolucaoRecursos").on('click', '#btnDesfazerAprovacao', function (e) {
       e.preventDefault();

       $('#hdfIdDevolucaoRecursos').attr('value', $(this).attr('data-id'));
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
                       _devolucaoRecuros.desfazerAprovacao();
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

   $("#tblDevolucaoRecursos").on('click', '#btnDesfazerReprovacao', function (e) {
       e.preventDefault();

       $('#hdfIdDevolucaoRecursos').attr('value', $(this).attr('data-id'));
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
                       _devolucaoRecuros.desfazerReprovacao();
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

   $('#btnAprovarTodosDevRecursos').click(function (e) {
       e.preventDefault();
       _devolucaoRecuros.aprovarEmLote();
   });

});


function preencherHiddenPraRecuperarNaExclusao(id) {
    $('#hdfIdDevolucaoRecursos').attr('value', id);
}

function passarIdsViaUrlERecuperarParaFormCadastro() {
    var newURL = window.location.protocol + "//" + window.location.host + "/";

    return String.format(newURL + "prestacaocontas/Devolucao/Criar?idLancamento={0}", $("#hdfIdLancamento").val());
}
