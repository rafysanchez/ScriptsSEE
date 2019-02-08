

$(document).ready(function () {
    AplicarMascaras();
    ConfigurarDropdown();
    TipoPesquisa();

    $("#frmConsultaPerfis").validate({
        rules: {
            TipoPesquisa:
                {
                    required: true
                },
            CPF: {
                required: function () {
                    return $("#inputCpf").css("visibility", "visible");
                }
            },
            CodigoPerfil:
            {
                required: function () {
                    return $("#ddlPerfil").css("visibility", "visible");
                },

            },
            CodigoDiretoria:
            {
                required: function () {
                    return $("#diretoriaEscola").css("visibility", "visible");
                }

            },
            RedeEnsino:
            {
                required: function () {
                    return $("#TipoPesquisa").val() == 5;
                }

            },
            PerfilComp3:
           {
               required: function () {
                   return $("#TipoPesquisa").val() == 5;
               }

           },
            CodigoEscola:
            {
                required: function () {
                    return $("#cd_comportamento").val() == 3;
                }
            }
        },
    })
});


function ConfigurarDropdown() {

    $("#TipoPesquisa").change(function () {

        if ($("#cd_comportamento").val() == 3 && $("#TipoPesquisa").val() == 3) {

            $("#CodigoDiretoria, #Municipio, #RedeEnsino").off();
            $("#CodigoDiretoria").autoPreencher($("#CodigoEscola"), "PerfilRel", "CarregarEscola");

        }
        else if ($("#cd_comportamento").val() == 2 && $("#TipoPesquisa").val() == 3) {
            $("#CodigoDiretoria, #RedeEnsino, #Municipio").off();

            $("#CodigoDiretoria").autoPreencher($("#RedeEnsino"), "RedeEnsino", "CarregarListaRedeEnsinoPorDiretoriaTipo", [{ codDiretoria: "'CodigoDiretoria'" }]);

            $("#RedeEnsino").autoPreencher($("#Municipio"), "Municipio", "CarregarMunicipiosPorDiretoriaTipo", [{ codDiretoria: "'CodigoDiretoria'", codRedeEnsino: "'RedeEnsino'" }]);
            $("#RedeEnsino").autoPreencher($("#CodigoEscola"), "Escola", "CarregarListaEscolasPorDiretoria", [{ codDiretoria: "'CodigoDiretoria'", codRedeEnsino: "'RedeEnsino'" }]);

            $("#Municipio").autoPreencher($("#CodigoEscola"), "Escola", "CarregaListaEscolasPorTipoDiretoriaMunicipio", [{ CodigoDiretoria: "'CodigoDiretoria'", CodigoRedeEnsino: "'RedeEnsino'", CodigoMunicipio: "'Municipio'" }]);
        }
        else if ($("#cd_comportamento").val() != 2 && $("#cd_comportamento").val() != 3 && $("#TipoPesquisa").val() == 3) {

            $("#TipoDiretoria, #CodigoDiretoria, #RedeEnsino, #Municipio").off();

            $("#TipoDiretoria").autoPreencher($("#CodigoDiretoria"), "Diretoria", "CarregarListaDiretoriasPorTipo", [{ codTipoDiretoria: "'TipoDiretoria'" }]);

            $("#CodigoDiretoria").autoPreencher($("#RedeEnsino"), "RedeEnsino", "CarregarListaRedeEnsinoPorDiretoriaTipo", [{ codDiretoria: "'CodigoDiretoria'", tipoDiretoria: "'TipoDiretoria'" }]);

            $("#RedeEnsino").autoPreencher($("#Municipio"), "Municipio", "CarregarMunicipiosPorDiretoriaTipo", [{ codDiretoria: "'CodigoDiretoria'", codRedeEnsino: "'RedeEnsino'", tipoDiretoria: "'TipoDiretoria'" }]);
            $("#RedeEnsino").autoPreencher($("#CodigoEscola"), "Escola", "CarregaListaEscolasPorTipoDiretoriaMunicipio", [{ CodigoDiretoria: "'CodigoDiretoria'", TipoDiretoria: "'TipoDiretoria'", CodigoRedeEnsino: "'RedeEnsino'", CodigoMunicipio: "'Municipio'" }]);

            $("#Municipio").autoPreencher($("#CodigoEscola"), "Escola", "CarregaListaEscolasPorTipoDiretoriaMunicipio", [{ CodigoDiretoria: "'CodigoDiretoria'", CodigoRedeEnsino: "'RedeEnsino'", CodigoMunicipio: "'Municipio'", TipoDiretoria: "'TipoDiretoria'" }]);

        }
        else if ($("#TipoPesquisa").val() == 5) {
            $("#TipoDiretoria, #CodigoDiretoria, #RedeEnsino, #Municipio").off();
            $("#DiretoriaComp3").autoPreencher($("#RedeEnsino"), "RedeEnsino", "CarregarListaRedeEnsinoPorDiretoriaTipo", [{ codDiretoria: "'DiretoriaComp3'" }], null, null, null, function () {
                $("#RedeEnsino").append($("<option />").val("0").html("TODOS"));
    });

        }
    });
};

//Configuração de exibição dos campos da tela
function TipoPesquisa() {
    $("#TipoPesquisa").change(function () {
        $("#div_relatorio").hide();

        var pesquisaPorCPF = $("#inputCpf");
        var pesquisaPorPerfil = $("#ddlPerfil");
        var pesquisaDiretoriaEscola = $("#diretoriaEscola, #inputTipoDiretoria, #CodigoDiretoria, #InputMunicipio, #InputRedeEnsino, #inputCodigoEscola");
        var pesquisaDiretoriaEscolaComp2 = $("#diretoriaEscola, #CodigoDiretoria, #InputMunicipio, #InputRedeEnsino, #inputCodigoEscola");
        var pesquisaDiretoriaEscolaComp3 = $("#diretoriaEscola, #CodigoDiretoria, #inputCodigoEscola");
        var pesquisaEscolaSemPerfil = $("#diretoriaEscola, #DiretoriaComp3, #InputRedeEnsino, #InputPerfilComp3");

        if ($("#TipoPesquisa").val() == 1) {
            clear();
            pesquisaPorCPF.show();
            pesquisaPorPerfil.hide()
            pesquisaDiretoriaEscola.hide();
            pesquisaDiretoriaEscolaComp2.hide();
            pesquisaDiretoriaEscolaComp3.hide();
            pesquisaEscolaSemPerfil.hide();
            $("#Pesquisar").show();
        }
        else if ($("#TipoPesquisa").val() == 2) {
            clear();
            pesquisaPorPerfil.show();
            pesquisaPorCPF.hide();
            pesquisaDiretoriaEscola.hide();
            pesquisaDiretoriaEscolaComp2.hide();
            pesquisaDiretoriaEscolaComp3.hide();
            pesquisaEscolaSemPerfil.hide();
            $("#Pesquisar").show();

        } else if ($("#TipoPesquisa").val() == 3) {
            clear();
            pesquisaPorPerfil.hide();
            pesquisaPorCPF.hide();
            pesquisaDiretoriaEscola.hide();
            pesquisaDiretoriaEscolaComp2.hide();
            pesquisaDiretoriaEscolaComp3.hide();
            pesquisaEscolaSemPerfil.hide();
            $("#Pesquisar").show();
            RemoveSelected();
            if ($("#cd_comportamento").val() != 2 && $("#cd_comportamento").val() != 3) {
                pesquisaDiretoriaEscola.show();
            } else if ($("#cd_comportamento").val() == 2) {
                pesquisaDiretoriaEscolaComp2.show();
            } else if ($("#cd_comportamento").val() == 3) {
                pesquisaDiretoriaEscolaComp3.show();
            }
        }
        else if ($("#TipoPesquisa").val() == 4) {
            clear();
            pesquisaPorPerfil.hide();
            pesquisaPorCPF.hide();
            pesquisaDiretoriaEscola.hide();
            pesquisaDiretoriaEscolaComp2.hide();
            pesquisaDiretoriaEscolaComp3.hide();
            pesquisaEscolaSemPerfil.hide();
            $("#Pesquisar").show();
        }
        else if ($("#TipoPesquisa").val() == 5) {
            clear();
            pesquisaPorPerfil.hide();
            pesquisaPorCPF.hide();
            pesquisaDiretoriaEscola.hide();
            pesquisaDiretoriaEscolaComp2.hide();
            pesquisaDiretoriaEscolaComp3.hide();
            pesquisaEscolaSemPerfil.show();
            RemoveSelected();
            $("#Pesquisar").show();
        }
    })
};

//Limpa a seleção anterior doa campos

function clear() {
    $(':input', '#frmConsultaPerfis').not('#TipoPesquisa , #Pesquisar').val('').removeAttr('checked').removeAttr('selected').removeAttr('required');
}

function RemoveSelected() {

    if ($("#cd_comportamento").val() == 3 && $("#TipoPesquisa").val() == 3) {
        $("#CodigoDiretoria option:contains('Selecione')").remove();
        $("#CodigoDiretoria").val($("#CodigoDiretoria option:first").val());
        $("#CodigoEscola option:first").remove();

    } else if ($("#cd_comportamento").val() == 2 && $("#TipoPesquisa").val() == 3) {
        $("#CodigoDiretoria option:contains('Selecione')").remove();
        $("#CodigoDiretoria").val($("#CodigoDiretoria option:first").val());

    } else if ($("#TipoPesquisa").val() == 5) {
        $("#CodigoDiretoria option:contains('Selecione')").remove();
        $("#CodigoDiretoria").val($("#CodigoDiretoria option:first").val());
    }
};

function AbrirPdf(data) {
    $('#div_relatorio').show().html(data);
    $("#tblDataTable").sedDataTable({
        order: [[0, "asc"]],
        nomeExportacao: "Relatório Gestor outras redes",
        tituloFiltro: "Informações Extras",
    });
};



