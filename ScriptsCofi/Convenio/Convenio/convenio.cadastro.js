/// <reference path="../../jquery-3.1.1.intellisense.js" />


$(document).ready(function () {
    eventosCadastro();
});

var _convenio_cadastro = (function () {

    function carregarApmPorUge() {

        var codUge = $('#ddlUGE').val();

        if (parseInt(codUge) > 0) {

            $.ajax({
                type: "POST",
                async: true,
                url: "/convenios/Convenio/ListarAPMPorUGE",
                data: JSON.stringify({ codUge: codUge }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {

                    if (data != undefined && data.length > 0) {
                        $("#ddlAPM").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                        $(data).each(function () {
                            $('<option>').val(this.CodAPM)
                                         .text(this.Descricao)
                                         .appendTo("#ddlAPM");
                        });

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante a listagem da APM' + errorThrown);
                }
            });

        } else {
            $('#ddlAPM').empty().append($("<option></option>").attr("value", "0").text("Selecione..."));
        }

    }

    function carregarTipoConvenioPorGrupoRepasse() {

        var _codGrupoRepasse = $('#dllGrupoRepasse').val();

        if (parseInt(_codGrupoRepasse) > 0) {

            $.ajax({
                type: "POST",
                async: true,
                url: "/convenios/Convenio/ListarTipoConvenioPorGrupoRepasse",
                data: JSON.stringify({ codGrupoRepasse: _codGrupoRepasse }),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {

                    if (data != undefined && data.length > 0) {
                        $("#ddlTipoConvenio").empty().append($("<option></option>").attr("value", "").text("Selecione..."));
                        $(data).each(function () {
                            $('<option>').val(this.CodTipoConvenio)
                                         .text(this.Descricao)
                                         .appendTo("#ddlTipoConvenio");
                        });

                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlerta.ErroAjax('Ocorreu um erro durante a listagem da APM' + errorThrown);
                }
            });

        } else {
            $('#ddlTipoConvenio').empty().append($("<option></option>").attr("value", "0").text("Selecione..."));
        }

    }



    return {
        _remover: function () {
            remover();
        },
        _pesquisar: function () {
            pesquisar();
        },
        _carregarApmPorUge: function () {
            carregarApmPorUge();
        },
        _carregarTipoConvenioPorGrupoRepasse: function () {
            carregarTipoConvenioPorGrupoRepasse();
        }

    }
})();


var eventosCadastro = function () {


    $("#frmConvenio").validate({
        rules: {
            CodGrupoRepasse: {
                required: true
            },
            CodTipoConvenio: {
                required: true
            },
            dllGrupoRepasse: {
                required: true
            },
            CodUge: {
                required: true
            },
            CodApm: {
                required: true
            },
            DataConvenio: {
                required: true
            },
            DataInicio: {
                required: true
            },
            DataFim: {
                required: true
            },
            Status: {
                required: true
            },
            CodSituacaoTCE: {
                required: true
            },
            CodTermoConvenio: {
                required: true
            }
        },
        submitHandler: function () {
            salvar();
        }
    });

    $("#btnNovo").click(function (e) {
        e.preventDefault();
        $("#divConvenio").dialog({
            title: "Novo Registro",
            autoOpen: false,
            width: 1020,
        }).load("/convenios/Convenio/Cadastro", function () {
            $("#divConvenio").dialog("open");
        });

    });

}


