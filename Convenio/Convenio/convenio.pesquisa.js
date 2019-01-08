/// <reference path="../../jquery-3.1.1.intellisense.js" />


$(document).ready(function () {
    AplicarMascaras();
    eventosPesquisa();

    _convenioPesquisa._preencharDropDown();



});

var _convenioPesquisa = (function () {

    function preencherDropPesquisa() {

        $.ajax({
            type: "POST",
            url: '/convenios/PesquisasJson/ObterListas',
            async: true,
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {


                if (data.ListaSituacaoTCE != undefined) {

                    $("#ddlSituacaoTCE").empty().append($("<option></option>").attr("value", "0").text("Selecione..."));
                    $(data.ListaSituacaoTCE).each(function () {
                        $('<option>').val(this.CodSituacaoTCE)
                                     .text(this.Descricao)
                                     .appendTo($("#ddlSituacaoTCE"));
                    });

                }
                $("#ddlSituacaoTCE").multiselect({
                    noneSelectedText: "Faça sua seleção aqui",
                    selectedText: multiSelectTextoPadrao,
                }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });



                //if (data.ListaUge != undefined) {
                //    $("#ddlUgePesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                //    $(data.ListaUge).each(function () {
                //        $('<option>').val(this.CodUGE)
                //                     .text(this.Descricao)
                //                     .appendTo($("#ddlUgePesquisa"));
                //    });
                //}

                if (data.listaDiretorias != undefined) {
                    $("#ddlUgePesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                    $(data.listaDiretorias).each(function () {
                        $('<option>').val(this.CodDiretoria)
                                     .text(this.NomeDiretoria)
                                     .appendTo($("#ddlUgePesquisa"));
                    });
                }





                $("#ddlUgePesquisa").multiselect({
                    noneSelectedText: "Faça sua seleção aqui",
                    selectedText: multiSelectTextoPadrao,
                }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });

                //

                $("#ddlVigencia").multiselect({
                    noneSelectedText: "Faça sua seleção aqui",
                    selectedText: multiSelectTextoPadrao,
                });


                //if (data.ListaSituacaoConvenio != undefined) {

                //     $("#ddlSituacaoConvenio").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                //    $(data.ListaSituacaoConvenio).each(function () {
                //        $('<option>').val(this.IdSituacaoConvenio)
                //                     .text(this.NmSituacao)
                //                     .appendTo($("#ddlSituacaoConvenio"));
                //    });


                //}

                //$("#ddlSituacaoConvenio").multiselect({
                //    noneSelectedText: "Faça sua seleção aqui",
                //    selectedText: multiSelectTextoPadrao,
                //}).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });

            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });


    }

    function pesquisar() {
        debugger;
        var CodPesquisaUge = $('#ddlUgePesquisa').multiselect("getCheckedValues"), mensagem;
        if (CodPesquisaUge == "") {
            var CodPesquisaUge = '0';
        }

        var CodPesquisaApm = $('#ddlApmPesquisa').multiselect("getCheckedValues"), mensagem;
        if (CodPesquisaApm == "") {
            var CodPesquisaApm = '0';
        }

        var CodPesquisaVigencia = $('#ddlVigencia').multiselect("getCheckedValues"), mensagem;
        if (CodPesquisaVigencia == "") {
            var CodPesquisaVigencia = '1';
        }


        var anoInicio = $('#AnoInicio').val();
        if (anoInicio == "") {
            var anoInicio = 0;
        }
        var anoFim = $('#AnoFim').val();
        if (anoFim == "") {
            var anoFim = 0;
        }

        //var SituacaoConvenio = $('#ddlSituacaoConvenio').multiselect("getCheckedValues"), mensagem;  
        //if (SituacaoConvenio == "") {
        //    var SituacaoConvenio = '0';
        //}


        var SituacaoTec = $('#ddlSituacaoTCE').multiselect("getCheckedValues"), mensagem;
        if (SituacaoTec == "") {
            var SituacaoTec = '0';
        }

        var codApm = $('#CodApm').val();
        if (codApm == "")
            codApm = 0;

        var codCie = $('#CodCie').val();
        if (codCie == "")
            codCie = 0;

        var paramsPesquisa =
         {
             MultUgePesquisa: CodPesquisaUge,
             MultApmPesquisa: CodPesquisaApm,
             AnoInicio: anoInicio,
             AnoFim: anoFim,
             //MultSituacaoConvenio : SituacaoConvenio,
             MultSituacaoTC: SituacaoTec,
             CodApm: codApm,
             CodCie: codCie,
             MultVigencia: CodPesquisaVigencia
         };

        debugger;

        $.ajax({
            type: "POST",
            async: true,
            url: "/convenios/Convenio/Pesquisar",
            data: { formPesquisa: paramsPesquisa },
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                $("#divGrid").html(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a pesquisa' + errorThrown);
            }
        });
    }

    function carregarApmPorUge() {
        debugger;
        var codlistaIdsUge = $('#ddlUgePesquisa').multiselect("getCheckedValues"), mensagem;

        $.ajax({
            type: "POST",
            async: true,
            url: "/convenios/PesquisasJson/ObterAPMsPorCodUGE",
            data: { listaIdsUge: codlistaIdsUge },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != undefined) {
                    $("#ddlApmPesquisa").multiselect("destroy");
                    $("#ddlApmPesquisa option").remove().end();
                    $(data).each(function () {
                        $('<option>').val(this.CodAPM)
                                    .text(this.Descricao).appendTo($("#ddlApmPesquisa"));
                    });
                }

                $("#ddlApmPesquisa").multiselect({
                    noneSelectedText: "Faça sua seleção aqui",
                    selectedText: multiSelectTextoPadrao,
                }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a listagem da APM' + errorThrown);
            }
        });
    }


    function carregarApmPorDiretoria() {
        var codlistaIdsUge = $('#ddlUgePesquisa').multiselect("getCheckedValues"), mensagem;

        $.ajax({
            type: "POST",
            async: true,
            url: "/convenios/PesquisasJson/ObterAPMsPorCodDiretoria",
            data: { listaIdsDiretoria: codlistaIdsUge },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            success: function (data) {
                if (data != undefined) {
                    $("#ddlApmPesquisa").multiselect("destroy");
                    $("#ddlApmPesquisa option").remove().end();
                    $(data).each(function () {
                        $('<option>').val(this.CodAPM)
                                    .text(this.Descricao).appendTo($("#ddlApmPesquisa"));
                    });
                }

                $("#ddlApmPesquisa").multiselect({
                    noneSelectedText: "Faça sua seleção aqui",
                    selectedText: multiSelectTextoPadrao,
                }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante a listagem da APM' + errorThrown);
            }
        });
    }




    function carregarTipoConvenioPorGrupoRepasse() {

        var _codGrupoRepasse = $('#ddlGrupoRepassePesquisa').val();

        if (parseInt(_codGrupoRepasse) > 0) {

            $.ajax({
                type: "POST",
                async: false,
                url: "/convenios/Convenio/ListarTipoConvenioPorGrupoRepasse",
                data: JSON.stringify({ codGrupoRepasse: _codGrupoRepasse }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {

                    if (data != undefined && data.length > 0) {
                        $("#ddlTipoConvenioPesquisa").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                        $(data).each(function () {
                            $('<option>').val(this.CodTipoConvenio)
                                         .text(this.Descricao)
                                         .appendTo("#ddlTipoConvenioPesquisa");
                        });

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante a listagem da APM' + errorThrown);
                }
            });

        } else {
            $('#ddlTipoConvenioPesquisa').empty().append($("<option></option>").attr("value", "0").text("Selecione..."));
        }

    }


    return {
        _pesquisar: function () {
            pesquisar();
        },
        _carregarApmPorUge: function () {
            carregarApmPorUge();
        },
        _carregarApmPorDiretoria: function () {
            carregarApmPorDiretoria();
        },
        _carregarTipoConvenioPorGrupoRepasse: function () {
            carregarTipoConvenioPorGrupoRepasse();
        },
        _preencharDropDown: function () {
            preencherDropPesquisa();
        }
    }
})();


var eventosPesquisa = function () {

    $("#ddlApmPesquisa").multiselect({
        noneSelectedText: "Faça sua seleção aqui",
        selectedText: multiSelectTextoPadrao,
    }).multiselectfilter({ label: "Pesquisar", placeholder: "Pesquisar...", width: "100px" });

    $("#btnPesquisar").click(function (e) {
        e.preventDefault();
        _convenioPesquisa._pesquisar();
    });

    $('#ddlUgePesquisa').change(function (e) {
        e.preventDefault();

        // _convenioPesquisa._carregarApmPorUge();
        _convenioPesquisa._carregarApmPorDiretoria();

        if (parseInt($(this).val()) > 0) {
            desabilitarCampos();
        }
        else {
            habilitarCampos();
        }
    });

    $('#ddlGrupoRepassePesquisa').change(function (e) {
        e.preventDefault();
        _convenioPesquisa._carregarTipoConvenioPorGrupoRepasse();
    });



    $("#btnNovo").click(function (e) {
        debugger;
        e.preventDefault();
        $("#divGrid").html('');
        $("#divConvenio").dialog({
            title: "Cadastro de Convênio",
            autoOpen: false,
            width: 1080,
            close: function (event, ui) {
                $("#divConvenio").html('');
            }
        }).load("/Convenios/Convenio/Novo", function () {
            $("#divConvenio").dialog("open");
        });
    });

    $('#CodApm').blur(function () {

        if ($(this).val() != "") {
            $('#ddlUgePesquisa').prop("disabled", true);
            $('#ddlApmPesquisa').prop("disabled", true);
            $("#ddlUgePesquisa").multiselect("disable");
            $("#ddlApmPesquisa").multiselect("disable");
            $('#CodCie').attr('disabled', 'disabled');
        } else {
            $('#ddlUgePesquisa').prop("disabled", false);
            $('#ddlApmPesquisa').prop("disabled", false);
            $("#ddlUgePesquisa").multiselect("enable");
            $("#ddlApmPesquisa").multiselect("enable");
            $('#CodCie').removeAttr('disabled');
        }
    });

    $('#CodCie').blur(function () {
        //$('#ddlSituacaoConvenio').prop("disabled", false);

        if ($(this).val() != "") {
            $('#ddlUgePesquisa').prop("disabled", true);
            $('#ddlApmPesquisa').prop("disabled", true);
            $("#ddlUgePesquisa").multiselect("disable");
            $("#ddlApmPesquisa").multiselect("disable");
            $('#CodApm').attr('disabled', 'disabled');
        }
        else {
            $('#ddlUgePesquisa').prop("disabled", false);
            $('#ddlApmPesquisa').prop("disabled", false);
            $("#ddlUgePesquisa").multiselect("enable");
            $("#ddlApmPesquisa").multiselect("enable");
            $('#CodApm').removeAttr('disabled');

        }

    });
}

function desabilitarCampos() {
    $('#CodCie').attr('disabled', 'disabled');
    $('#CodApm').attr('disabled', 'disabled');
}

function habilitarCampos() {
    $('#CodApm').removeAttr('disabled');
    $('#CodCie').removeAttr('disabled');
}

function AjustaChkTodos() {

    alert(1);
}