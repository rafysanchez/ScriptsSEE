
$(document).ready(function () {
    eventos();
});

var prestacaoContas = (function () {
    function _pesquisar() {

            var newURL = window.location.protocol + "//" + window.location.host + "/";

            $.ajax({
                cache: false,
                url: newURL + 'prestacaocontas/PrestarContasFNDEPDDE/ObterPrestacaoContas',
                data: $("#frmPesquisa").serialize(),
                type: 'POST',
                datatype: 'HTML',
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                success: function (data) {
                    $("#divPrincipal").html(data);
                    esconderPesquisa();
                    var abaAtiva = $("#abaAtiva").val();
                    var abaInternaAtiva = $("#abaInternaAtiva").val();
                    var abaRepasse = $("#abaRepasseAtiva").val();
                    if (abaAtiva != undefined && abaAtiva != "") {
                        $("#divPrincipal").sedTabControl("atual", abaAtiva);
                        $("#abasDespesas").sedTabControl("atual", abaInternaAtiva);
                        $("#abasRepasse").sedTabControl("atual", abaRepasse);
                    }

                },
                error: function (jqXHR, txtStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
                }
            });
        
    }

    function esconderPesquisa() {
        $('#divVoltar').show();
        $('#divPesquisa').hide();
        $('#spDiretoria').html($("#ddlDiretoriaPesquisa option:selected").text());


        if ($("#ddlApmPesquisa option:selected").text() == '')
        {
            $('#spEscolaApm').html($("#ddlEscolaPesquisa option:selected").text());
        }
        else
        {
            $('#spEscolaApm').html($("#ddlApmPesquisa option:selected").text());
        }
        
        $('#spPrograma').html($("#ddlProgramaPesquisa option:selected").text());
        $('#spAno').html($("#ddlExercicioPesquisa option:selected").text());
    }

    return {
        pesquisar: function () {
            _pesquisar();
        },
        atualizarConteudoAbas: function () {
            _pesquisar();
        },
        obterEscolas: function (codDiretoria) {
            _obterEscolas(codDiretoria);
        },
    }

})();

function eventos() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            delay: { "show": 0, "hide": 0 }
        })
    });

    $("#frmPesquisa").submit(function (e) {
        e.preventDefault();

        if ($("#frmPesquisa").valid()) {
            prestacaoContas.pesquisar();
        }

        return false;
    });

    $('#divVoltar').hide();

    //$("#divPesquisa").on('click', '#btnPesquisa', function (e) {


    //    e.preventDefault();
    //    if (parseInt($("#ddlExercicioPesquisa").val()) > 0 && parseInt($("#ddlProgramaPesquisa").val()) > 0) {
    //        $("#divEx").removeClass('has-error');
    //        $("#divPg").removeClass('has-error');
    //        prestacaoContas.pesquisar();

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
        $('#divPesquisa').show();
        $("#divPrincipal").html('');
        $('#divInfo').html('');
    });
}




