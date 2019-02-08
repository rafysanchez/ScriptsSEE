var dataTableBO = null;
var ano = 0;
var codigoFolha = 0;
$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    AplicarMascaras();

    $("#formPesquisar").validate({
        rules: {
            anoLetivo: {
                required: true
            }
        },
        submitHandler: function (form) {

            var filtros = {
                anoExercicio: $("#anoLetivo").val(),
                codigoDiretoria: $("#codigoDiretoria").val(),
                codigoEscola: $("#codigoEscola").val(),
                cpf: $("#cpf").val().replace(/\./g, '').replace(/\-/g, ''),
                rg: $("#rg").val(),
                di: $("#di").val(),
                mesReferencia: $("#mes").val(),
                status: $("#situacao").val()
            };

            $.ajax({
                url: "/EventualBoFolha/PesquisarSituacao",
                type: "POST",
                data: filtros,
                success: function (data, textStatus, xhr) {
                    $("#resultadoPesquisa").html(data);
                    $("#tabelaPesquisa").sedDataTable({
                        columnDefs: [{
                            targets: "nosort",
                            orderable: false
                        }]
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message);
                }
            });
            return;
        }
    });

    $("#mes option")[new Date().getMonth() + 1].selected = true;

    $("#codigoDiretoria").change(function () { listarEscola() });
    if ($("#codigoDiretoria option").length == 2) {
        $("#codigoDiretoria option:selected").remove();
        $("#codigoDiretoria").trigger("change");
    }
});
function listarEscola() {
    select = $("#formPesquisar #codigoEscola");
    select.empty();
    var codigoDiretoria = $("#codigoDiretoria option:selected").val() == "0" || $("#codigoDiretoria option:selected").val() == "" || $("#codigoDiretoria option:selected").val() == undefined ? 0 : parseInt($("#codigoDiretoria option:selected").val());

    var paramns = {
        id: codigoDiretoria
    }
    if (codigoDiretoria != "") {
        $.ajax({
            url: '/Escola/CarregarListaEscolasPorTipo',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(paramns),
            success: function (data) {
                if (data != null) {
                    if (data.length == 0 || data.length > 1) {
                        select.append($('<option/>', {
                            value: "",
                            text: "Selecione..."
                        }));
                    }
                    $.each(data, function (index, itemData) {
                        select.append($('<option/>', {
                            value: itemData.value,
                            text: itemData.text
                        }));
                    });
                    select.trigger("change");
                }
                else {
                    select.append($('<option/>', {
                        value: "",
                        text: ""
                    }));
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            }
        });
    }
    else {
        select.trigger("change");
    }
}
function visualizarSituacaoBO(ano, mes, cpf) {

    var filtros = {
        anoLetivo: ano,
        mes: mes,
        cpf: cpf
    };

    $.ajax({
        url: "/EventualBoFolha/ObterDetalhesEventualBO",
        type: "POST",
        dataType: "JSON",
        data: filtros,
        success: function (data, textStatus, xhr) {

            var html = preencherViewBO(data[0]);

            $("#formEventualBO").dialog({
                title: "Visualizar BO Eventual",
                width: "lg",
                destroy: false
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {
            ("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message);
        }
    });
}
function preencherViewBO(bo) {
    var view = $("#formEventualBO");

    view.find("#diretoria").val(bo.Diretoria);
    view.find("#escola").val(bo.Escola);
    view.find("#cpf").val(bo.Cpf + "/" + bo.Di);
    view.find("#nome").val(bo.Nome);
    view.find("#categoria").val(bo.Categoria);
    view.find("#dataInicioExercicio").val(bo.DataInicioExercicioStr);
    view.find("#cargo").val(bo.Cargo);
    view.find("#qualificacao").val(bo.Qualificacao);
    view.find("#ua").val(bo.UAConcat);
    view.find("#rspv").val(bo.RS + "/" + bo.PV);
    view.find("#mes").val(bo.Mes + "/" + bo.Ano);
    view.find("#auxilioTransporte").text(bo.QuantidadeAuxilioTransporteStr);

    $("#controleDeAbas").sedTabControl({ embutida: true });

    var linhaDias = "<td>Total</td>";

    for (var i = 0; i < bo.Dias.length; i++) {
        linhaDias += "<td>" + bo.Dias[i].toString() + "</td>";
    }
    $("#tabelaDias").find("#trDia").remove();
    $("#tabelaDias").find("tbody").html("<tr id='trDia'>" + linhaDias + "</tr>");

    var linhaDias = "";

    linhaDias += "<td>" + bo.QuantidadeHorasCicloI.toString() + "</td>";
    linhaDias += "<td>" + bo.QuantidadeNTCicloI.toString() + "</td>";
    linhaDias += "<td>" + bo.QuantidadeALECicloI.toString() + "</th>";

    linhaDias += "<td>" + bo.QuantidadeHorasCicloII.toString() + "</td>";
    linhaDias += "<td>" + bo.QuantidadeNTCicloII.toString() + "</td>";
    linhaDias += "<td>" + bo.QuantidadeALECicloII.toString() + "</td>";

    linhaDias += "<td>" + bo.QuantidadeHorasEnsinoMedio.toString() + "</td>";
    linhaDias += "<td>" + bo.QuantidadeNTEnsinoMedio.toString() + "</td>";
    linhaDias += "<td>" + bo.QuantidadeALEEsinoMedio.toString() + "</td>";

    $("#tabelaBOTotais").find("#trDia").remove();
    $("#tabelaBOTotais").find("tbody").html("<tr id='trDia'>" + linhaDias + "</tr>");


    $("#tabelaBO").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false,
        footerCallback: function (row, data, start, end, display) {
            var api = this.api(), j, total, data, linhas;
            var colunas = [1, 2, 8, 9, 15, 16];

            for (var i = 0; i < colunas.length; i++) {
                data = api.column(colunas[i], { search: "applied" }).data();
                linhas = data.length;
                total = 0;
                for (j = linhas - 1; j >= 0; j--) {
                    f = parseFloat(data[j].toString());
                    if (!isNaN(f))
                        total += f;
                }
                $(api.column(colunas[i]).footer()).html(total.toString());
            }
        }
    });

    var t = $("#tabelaBO").DataTable();
    t.clear().draw();

    for (var i = 0; i < bo.Linha.length; i++) {
        t.row.add([
            bo.Linha[i].Dia.toString(),
            bo.Linha[i].EnsinoFundamentalCicloI.QuantidadeAulas.toString(),
            bo.Linha[i].EnsinoFundamentalCicloI.QuantidadeAulasNT.toString(),
            bo.Linha[i].EnsinoFundamentalCicloI.CpfProfessor.toString(),
            bo.Linha[i].EnsinoFundamentalCicloI.DiProfessor.toString(),
            bo.Linha[i].EnsinoFundamentalCicloI.CodigoEscola.toString(),
            bo.Linha[i].EnsinoFundamentalCicloI.Disciplina.toString(),

            bo.Linha[i].Dia.toString(),
            bo.Linha[i].EnsinoFundamentalCicloII.QuantidadeAulas.toString(),
            bo.Linha[i].EnsinoFundamentalCicloII.QuantidadeAulasNT.toString(),
            bo.Linha[i].EnsinoFundamentalCicloII.CpfProfessor.toString(),
            bo.Linha[i].EnsinoFundamentalCicloII.DiProfessor.toString(),
            bo.Linha[i].EnsinoFundamentalCicloII.CodigoEscola.toString(),
            bo.Linha[i].EnsinoFundamentalCicloII.Disciplina.toString(),

            bo.Linha[i].Dia.toString(),
            bo.Linha[i].EnsinoMedio.QuantidadeAulas.toString(),
            bo.Linha[i].EnsinoMedio.QuantidadeAulasNT.toString(),
            bo.Linha[i].EnsinoMedio.CpfProfessor.toString(),
            bo.Linha[i].EnsinoMedio.DiProfessor.toString(),
            bo.Linha[i].EnsinoMedio.CodigoEscola.toString(),
            bo.Linha[i].EnsinoMedio.Disciplina.toString()
        ]).draw(false);
    }
}
function visualizar(codigoFolha,situacao,erro,codigoErro,cpf) {

    var filtros = {
        codigoFolha: codigoFolha,
        cpf: cpf,
    };

    $.ajax({
        url: "/EventualBoFolha/ObterEnvioArquivoFolha",
        type: "POST",
        dataType: "JSON",
        data: filtros,
        success: function (data, textStatus, xhr) {

            preencherViewFolha(data[0], situacao, erro, codigoErro);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message);
        }
    });
}
function preencherViewFolha(folha, situacao, erro, codigoErro) {

    var view = $("#formEventualBoFolha");
    $("#controleDeAbasFolha").sedTabControl({ embutida: true });

    view.find("#anoExercicioFolha").val(folha.AnoExercicio);
    codigoFolha = folha.Codigo;
    ano = folha.AnoExercicio;
    view.find("#mesFolha").val(folha.MesRefencia);
    view.find("#dataCriacaoFolha").val(folha.DataCriacaoStr);
    view.find("#totalRegistrosFolha").val(folha.Cadastro.length);
    view.find("#situacaoFolha").val(situacao.toString());
    view.find("#erroFolha").val(erro.toString());
    view.find("#codigoErroFolha").val(codigoErro.toString());

    ////Dados Eventual
    view.find("#diretoriaFolha").val(folha.EventualBo.NomeDiretoria.toString());
    view.find("#escolaFolha").val(folha.EventualBo.NomeEscola.toString());
    view.find("#cpfFolha").val(folha.EventualBo.Cpf.toString());
    view.find("#diFolha").val(folha.EventualBo.NrDI.toString());
    view.find("#rgFolha").val(folha.EventualBo.NrRG.toString());
    view.find("#inicioExercicioFolha").val(folha.EventualBo.DataInicioExercicioStr.toString());
    view.find("#cargoFolha").val(folha.EventualBo.NomeCargo.toString());
    view.find("#qualificacaoFolha").val(folha.EventualBo.CodigoQualificacao.toString());
    view.find("#uaFolha").val(folha.EventualBo.NomeUA.toString());
    view.find("#rspvFolha").val(folha.EventualBo.RSPV.toString());


    var linha = "<td>" + folha.QTDE_Efetivos.toString() + "</td>";
    linha += "<td>" + folha.QTDE_ACT.toString() + "</td>";
    linha += "<td>" + folha.QTDE_Estaveis.toString() + "</td>";
    linha += "<td>" + folha.QTDE_Eventual.toString() + "</td>";
    linha += "<td>" + folha.QTDE_AULA_EF_CICLOI.toString() + "</td>";
    linha += "<td>" + folha.QTDE_GTCN_EF_CICLOI.toString() + "</td>";
    linha += "<td>" + folha.QTDE_ALE_EF_CICLOI.toString() + "</td>";
    linha += "<td>" + folha.QTDE_AULA_EF_CICLOII.toString() + "</td>";
    linha += "<td>" + folha.QTDE_GTCN_EF_CICLOII.toString() + "</td>";
    linha += "<td>" + folha.QTDE_ALE_EF_CICLOII.toString() + "</td>";
    linha += "<td>" + folha.QTDE_AULA_EM.toString() + "</td>";
    linha += "<td>" + folha.QTDE_GTCN_EM.toString() + "</td>";
    linha += "<td>" + folha.QTDE_ALE_EM.toString() + "</td>";
    linha += "<td>" + folha.QTDE_AUX_TRANSPORTE.toString() + "</td>";

    view.find("#tabelaResumoFolha > tbody").html("<tr>" + linha + "</tr>");

    $("#tabelaBOTotaisFolha").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false,
    });

    var t = $("#tabelaBOTotaisFolha").DataTable();
    t.clear().draw();

    for (var i = 0; i < folha.Cadastro.length; i++) {
        t.row.add([
            folha.Cadastro[i].RS.toString(),
            folha.Cadastro[i].PV.toString(),
            folha.Cadastro[i].NrRG.toString(),
            folha.Cadastro[i].NrDI.toString(),
            folha.Cadastro[i].CodigoCargo.toString(),
            folha.Cadastro[i].CodigoCategoria.toString(),
            folha.Cadastro[i].Tipo.toString(),
            folha.Cadastro[i].TipoSubst.toString(),
            folha.MesAno.toString(),
            folha.Cadastro[i].CodigoUATurma.toString(),
            folha.Cadastro[i].QTDE_AUX_TRANSPORTE.toString(),
            folha.Cadastro[i].QTDE_AULA_EF_CICLOI.toString(),
            folha.Cadastro[i].QTDE_GTCN_EF_CICLOI.toString(),
            folha.Cadastro[i].QTDE_ALE_EF_CICLOI.toString(),
            folha.Cadastro[i].QTDE_AULA_EF_CICLOII.toString(),
            folha.Cadastro[i].QTDE_GTCN_EF_CICLOII.toString(),
            folha.Cadastro[i].QTDE_ALE_EF_CICLOII.toString(),
            folha.Cadastro[i].QTDE_AULA_EM.toString(),
            folha.Cadastro[i].QTDE_GTCN_EM.toString(),
            folha.Cadastro[i].QTDE_ALE_EM.toString()
        ]).draw(false);
    }

    $("#formEventualBoFolha").dialog({
        title: "Eventual BO Folha",
        width: "lg",
        destroy: false
    });
}
function baixarArquivo() {
    window.open("/EventualBoFolha/BaixarArquivoFolha?codigo=" + parseInt(codigoFolha) + "&anoCriacao=" + parseInt(ano), "_blank");
}