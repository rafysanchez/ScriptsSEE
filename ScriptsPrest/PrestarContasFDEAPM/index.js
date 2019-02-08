
$(document).ready(function () {
    eventos();
});

var prestacaoContas = (function () {

    var newURL = window.location.protocol + "//" + window.location.host + "/";

    function _obterTransferidos()
    {
        $.ajax({
            cache: false,
            url: urlAbsoluta + 'PrestarContasFDEAPM/ObterTransferidos',
            data: $('#frmPesquisa').serialize(),
            type: 'POST',
            //dataType: 'JSON',
            dataType: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data)
            {
                $('#divTransferidoFdeApm').html(data);

                //if (data.status)
                //{
                //    $('#divTransferidoFdeApm').html(data.view);

                //    if (data.resultadoOperacao != null && data.resultadoOperacao != undefined) {
                //        mensagemAlerta(data.resultadoOperacao);
                //    }
                //}
                //else
                //{
                //    $('#divTransferidoFdeApm').html('');
                //    if (data.resultadoOperacao != null && data.resultadoOperacao != undefined) {
                //        mensagemAlerta(data.resultadoOperacao);
                //    }
                //}
            },
            error: function (jqXHR, txtStatus, errorThrown)
            {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }


    function _pesquisarFdeApm(idTransferido, idLancamento, idLancamentoRepasseAssociado)
    {
        var idPrograma = $("#ddlProgramaPesquisa option:selected").val();
        var idExercicio = $("#ddlExercicioPesquisa option:selected").val();
        var idEscola = $("#hdfCodigoEscola").val();
        var token = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            cache: false,
            url: newURL + 'prestacaocontas/PrestarContasFDEAPM/ObterPrestacaoContas',
            data: { __RequestVerificationToken: token, IdTransferidoFdeApm: idTransferido, IdLancamento: idLancamento, IdEscola: idEscola, IdPrograma: idPrograma, IdExercicio: idExercicio, IdLancamentoRepasseAssociado: idLancamentoRepasseAssociado },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data)
            {
                $("#divPrincipal").empty().html(data);
                esconderPesquisa();
                var abaAtiva = $("#abaAtiva").val();
                var abaInternaAtiva = $("#abaInternaAtiva").val();
                var abaRepasse = $("#abaRepasseAtiva").val();
                if (abaAtiva != undefined && abaAtiva != "")
                {
                    $("#divPrincipal").sedTabControl("atual", abaAtiva);
                    $("#abasDespesas").sedTabControl("atual", abaInternaAtiva);
                    $("#abasRepasse").sedTabControl("atual", abaRepasse);
                }

                if ($("#hdfDtUtilizacaoIni").val() == "false") {
                    $("#manualUtilizacao").hide();
                }
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });
    }

    function esconderPesquisa()
    {
        $('#divVoltar').show();
        $('#divPesquisa, .divPesquisaFDEAPM').hide();
        $('#spDiretoria').html($("#ddlDiretoriaPesquisa option:selected").text());
        $('#spEscolaApm').html($("#ddlApmPesquisa option:selected").text());
        $('#spPrograma').html($("#ddlProgramaPesquisa option:selected").text());
        $('#spAno').html($("#ddlExercicioPesquisa option:selected").text());
    }

    return {

        obterTransferidos: function () {
            _obterTransferidos();
        },

        atualizarConteudoAbasFdeApm: function (idTransferido, idLancamento, flgDescolaTrabalho, IdLancamentoRepasseAssociado) {
            
            if (flgDescolaTrabalho == Status.PrestacaoBloqueada.value) {
                Mensagem.Alert({
                    titulo: "No momento o módulo encontra-se em desenvolvimento.",
                    mensagem: "Aguardando liberação para Prestação de Contas.",
                    tipo: "alerta",
                    botoes: [
                       {
                           botao: "Fechar",
                           callback: function (e) {
                               Mensagem.Fechar();
                           }
                       }
                    ]
                });
                return;
            }

            _pesquisarFdeApm(idTransferido, idLancamento, IdLancamentoRepasseAssociado);
        },
    }

})();

var Status = {
    PrestacaoBloqueada: { value: 1, name: "Prestação Bloqueada" }
};


function eventos() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            delay: { "show": 0, "hide": 0 }
        })
    });

    $("#frmPesquisa").submit(function (e) {
        e.preventDefault();

        if ($("#frmPesquisa").valid()) {
            prestacaoContas.obterTransferidos();
        }

        return false;
    });


    $('#divVoltar').hide();

    //$("#divPesquisa").on('click', '#btnPesquisa', function (e) {

    //    e.preventDefault();
    //    if (parseInt($("#ddlExercicioPesquisa").val()) > 0 && parseInt($("#ddlProgramaPesquisa").val()) > 0) {
    //        $("#divEx").removeClass('has-error');
    //        $("#divPg").removeClass('has-error');
    //        prestacaoContas.obterTransferidos();

    //    }
    //    else {
    //        if (parseInt($("#ddlExercicioPesquisa").val()) == 0) {
    //            $("#divEx").addClass('has-error');
    //        }

    //        if (parseInt($("#ddlProgramaPesquisa").val()) == 0) {
    //            $("#divPg").addClass('has-error');
    //        }
    //    }

    //});

    $("#ddlExercicioPesquisa").change(function (e) {
        e.preventDefault();
        $("#divEx").removeClass('has-error');

        var anoBase = $("#ddlExercicioPesquisa option:selected").text();
        $('#AnoBase').attr('value', anoBase);
    });
    $("#ddlProgramaPesquisa").change(function (e) {
        e.preventDefault();
        $("#divPg").removeClass('has-error');
    });

    $('#btnHabilitarPesquisa').click(function (e) {
        e.preventDefault();

        $('#divVoltar').hide();
        $('#divPesquisa, .divPesquisaFDEAPM').show();
        $("#divPrincipal").html('');
        $('#divInfo').html('');
        prestacaoContas.obterTransferidos();
    });


}




