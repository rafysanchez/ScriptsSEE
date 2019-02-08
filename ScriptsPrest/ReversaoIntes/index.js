
$(document).ready(function () {

    AplicarMascaras();
    eventos();

});



function eventos() {

    $('#divVoltar').hide();
    $("#ddlListaObjetoRepasse").multiselect();
    $("#ddlListaAPM").multiselect();

    $('#ddlListaGrupoRepasse').change(function (e) {
        $("#divGrid").html('');
        e.preventDefault();
        $('#divObjRepasse').removeClass('form-group has-error');
        carregarProgramaPorTipoPrograma();

        if (parseInt($(this).val()) > 0) {
            _buscaExercicios.obterExerciciosPorGrupoRepasse($(this).val(), $("#ddlListaExercicio"));
        }
        else {
            $("#ddlListaExercicio").empty();

        }

    });

    $('#ddlListaDiretoria').change(function (e) {
        $("#divGrid").html('');
        e.preventDefault();
        carregarApmPorUge();
    });

    $('#btnPesquisar').click(function (e) {
        e.preventDefault();
        pesquisar();

    });

    $("#CodigoEscola").focus(function () {
        $('#ddlListaAPM_ms').attr("disabled", "disabled");
        $('#ddlListaDiretoria').attr("disabled", "disabled");
    });

    $("#CodigoEscola").focusout(function () {

        if ($("#CodigoEscola").val().length == 0) {
            $('#ddlListaAPM_ms').removeAttr("disabled");
            $('#ddlListaDiretoria').removeAttr("disabled");
        }
    });

    $('#btnHabilitarPesquisa').click(function (e) {
        e.preventDefault();

        $('#divVoltar').hide();
        $('#divPesquisa').show();
        $("#divPrincipal").html('');
        $(document).ready(function () { $('#h1Header').html('').html('Reabertura de Item'); });

    });

}

function pesquisar() {

    $('#divObjRepasse').removeClass('form-group has-error');
    var codigoTipoPrograma = $('#ddlListaGrupoRepasse').val();
    if (parseInt(codigoTipoPrograma) > 0) {

        var idsObjetoRepasse = $('#ddlListaObjetoRepasse').multiselect("getCheckedValues"), mensagem;
        if (idsObjetoRepasse == "") {
            var idsObjetoRepasse = '0';
        }

        var idsApm = $('#ddlListaAPM').multiselect("getCheckedValues"), mensagem;
        if (idsApm == "") {
            var idsApm = '0';
        }
        var form = {
            CodigoExercicio: $('#ddlListaExercicio').val(),
            CodigoGrupoRepasse: $('#ddlListaGrupoRepasse').val(),
            MultCodigoObjetoRepasse: idsObjetoRepasse,
            CodigoDiretoria: $('#ddlListaDiretoria').val(),
            MultCodigoEscola: idsApm,
            CodigoEscola: $('#CodigoEscola').val(),
        }

        $.ajax({
            cache: false,
            url: urlAbsoluta + 'ReaberturaItem/ObterPrestacaoContas',
            data: { filtros: form },
            type: 'POST',
            datatype: 'HTML',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                $("#divGrid").html(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
            }
        });

    } else {
        $('#divObjRepasse').addClass('form-group has-error');
        $('#divObjRepasse').focus();
        $("#divObjRepasse")
          .velocity({ opacity: 0 }, 500)
          .velocity("reverse");
    }

}

function carregarApmPorUge() {
    var codigoDiretoria = $('#ddlListaDiretoria').val();

    $.ajax({
        type: "POST",
        async: true,
        url: urlAbsoluta + "PesquisaComum/ListarEscolas",
        data: { codigoDiretoria: codigoDiretoria },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            if (data != undefined) {
                $("#ddlListaAPM").multiselect("destroy");
                $("#ddlListaAPM option").remove().end();
                $(data).each(function () {
                    $('<option>').val(this.Codigo)
                                .text(this.Nome).appendTo($("#ddlListaAPM"));
                });
            }

            $("#ddlListaAPM").multiselect({
                noneSelectedText: "Faça sua seleção aqui",
                selectedText: multiSelectTextoPadrao,
            }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante a listagem da APM' + errorThrown);
        }
    });
}

function carregarProgramaPorTipoPrograma() {
    var codigoTipoPrograma = $('#ddlListaGrupoRepasse').val();

    $.ajax({
        type: "POST",
        async: true,
        url: urlAbsoluta + "PesquisaComum/ProgramasPorGrupoRepasse",
        data: { codigoTipoPrograma: codigoTipoPrograma },
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            if (data != undefined) {
                $("#ddlListaObjetoRepasse").multiselect("destroy");
                $("#ddlListaObjetoRepasse option").remove().end();
                $(data).each(function () {
                    $('<option>').val(this.Codigo)
                                .text(this.Nome).appendTo($("#ddlListaObjetoRepasse"));
                });
            }

            $("#ddlListaObjetoRepasse").multiselect({
                noneSelectedText: "Faça sua seleção aqui",
                selectedText: multiSelectTextoPadrao,
            }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante a listagem ' + errorThrown);
        }
    });
}


function obterPDDE(idLancamento) {
    $.ajax({
        cache: false,
        url: urlAbsoluta + 'ReaberturaItem/ObterPDDE',
        data: { idLancamento: idLancamento },
        type: 'POST',
        datatype: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            $("#divPrincipal").html(data);
            $('#divVoltar').show();
            $('#divPesquisa').hide();
            var abaAtiva = $("#abaAtiva").val();
            if (abaAtiva != undefined && abaAtiva != "") {
                $("#divPrincipal").sedTabControl("atual", abaAtiva);
            
            }

        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });
}

function obterFDE(idTransferido) {
    $.ajax({
        cache: false,
        url: urlAbsoluta + 'ReaberturaItem/ObterFDE',
        data: { idTransferido: idTransferido },
        type: 'POST',
        datatype: 'HTML',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (data) {
            $("#divPrincipal").html(data);
            $('#divVoltar').show();
            $('#divPesquisa').hide();
            var abaAtiva = $("#abaAtiva").val();
            if (abaAtiva != undefined && abaAtiva != "") {
                $("#divPrincipal").sedTabControl("atual", abaAtiva);

            }
        },
        error: function (jqXHR, txtStatus, errorThrown) {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo.' + errorThrown);
        }
    });
}