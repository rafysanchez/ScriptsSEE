var dataTableBO = null;
var codigoFolha = 0;
$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    AplicarMascaras(); 

    $("#formPesquisar").validate({
        rules: {
            anoLetivo: {
                required: true
            },
            codigoDiretoria: {
                required: true
            }
        },
        submitHandler: function (form) {

            var filtros = {
                anoLetivo: $("#anoLetivo").val(),
                mes: $("#mes").val()
            };

            $.ajax({
                url: "/EventualBoFolha/PesquisarEnvioArquivoFolha",
                type: "POST",
                dataType: "JSON",
                data: filtros,
                success: function (data, textStatus, xhr) {
                    $("#tabelaPesquisa").sedDataTable({
                        botaoSelecionarColunas: false,
                        botaoImprimir: false,
                        botaoGerarCSV: false,
                        botaoGerarPDF: false,
                        data: data,
                        columns: [
                            { data: "Codigo" },
                            { data: "MesAno" },
                            { data: "DataCriacaoStr" },
                            { data: "TotalRegistros" },
                            {
                                data: function () {
                                    return "<i class='icone-tabela-visualizar' title='Visualizar' onclick=\"visualizar(" + arguments[3].row + ")\"></i>";
                                }
                            },
                            {
                                data: function () {
                                    return "<i class='icone-tabela-download' title='Fazer download do arquivo' onclick=\"baixarArquivo(" + arguments[0].Codigo + ")\"></i>";
                                }
                            }
                        ],
                        columnDefs: [{ targets: [4, 5], orderable: false }]
                    });
                    dataTableBO = $("#tabelaPesquisa").DataTable();
                    dataTableBO.draw();
                    $("#tabelaPesquisa").show();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    ("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message);
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
function gerarArquivo(codigoFolha) {

    var mes = $("#mes").val();
    mes = mes == ""? 0 : parseInt($("#mes").val());

    if (mes == 0) {
        $("#mes").addClass("error");
        return;
    } else {
        $("#mes").removeClass("error");
    }

    if (!$("#formPesquisar").valid()) {
        return;
    }

    var filtros = {
        anoLetivo: $("#anoLetivo").val(),
        mes: $("#mes").val()
    };

    $.ajax({
        url: "/EventualBoFolha/GerarFolhaEnvioVisualizacao",
        type: "POST",
        dataType: "JSON",
        data: filtros,
        success: function (data, textStatus, xhr) {
            if (data.TipoException != undefined && data.TipoException != "sucesso") {
                Mensagem.Alert({
                    mensagem: data.Message,
                    titulo: data.Title,
                    tipo: data.TipoException,
                    botao: "Fechar"
                });
                return;
            }

            var html = preencherView(data);

            return;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.Alert({ mensagem: "Ocorreu um erro durante o processamento!", titulo: jqXHR.responseJSON.Title, tipo: jqXHR.responseJSON.TipoException, botao: "Fechar" });
        }
    });
}
function visualizar(linha) {
    var folha = dataTableBO.row(linha).data();
    preencherView(folha);
}
function preencherView(folha) {

    codigoFolha = folha.Codigo;
    var view = $("#formEventualBO");
    if (codigoFolha > 0) {
        view.find("#btnGerarArquivo").hide();
        view.find("#btnBaixarArquivo").show();
    } else {
        view.find("#btnGerarArquivo").show();
        view.find("#btnBaixarArquivo").hide();
    }

    $("#controleDeAbas").sedTabControl({ embutida: true });

    view.find("#anoExercicio").val(folha.AnoExercicio);
    view.find("#mes").val(folha.MesRefencia);
    view.find("#dataCriacao").val(folha.DataCriacaoStr);
    view.find("#totalRegistros").val(folha.Cadastro.length);

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

    view.find("#tabelaResumo > tbody").html("<tr>" + linha + "</tr>");

    $("#tabelaBOTotais").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false,
        //footerCallback: function (row, data, start, end, display) {
        //    var api = this.api(), j, total, data, linhas;
        //    var colunas = [1, 2, 8, 9, 15, 16];

        //    for (var i = 0; i < colunas.length; i++) {
        //        data = api.column(colunas[i], { search: "applied" }).data();
        //        linhas = data.length;
        //        total = 0;
        //        for (j = linhas - 1; j >= 0; j--) {
        //            f = parseFloat(data[j].toString());
        //            if (!isNaN(f))
        //                total += f;
        //        }
        //        $(api.column(colunas[i]).footer()).html(total.toString());
        //    }
        //}
    });

    var t = $("#tabelaBOTotais").DataTable();
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

    $("#formEventualBO").dialog({
        title: "Eventual BO Folha",
        width: "lg",
        destroy: false
    });
}
function baixarArquivo(codigoFolha) {

    if (codigoFolha > 0) {
        var ano = $("#anoLetivo").val();
        window.open("/EventualBoFolha/BaixarArquivoFolha?codigo=" + parseInt(codigoFolha) + "&anoCriacao=" + parseInt(ano), "_blank");
    } else {
        codigoFolha = 0;
        var filtros = {
            anoLetivo: $("#anoLetivo").val(),
            mes: $("#mes").val()
        };
        $.ajax({
            url: "/EventualBoFolha/GerarFolha",
            type: "POST",
            dataType: "JSON",
            data: filtros,
            success: function (data, textStatus, xhr) {

                if (data.TipoException != undefined && data.TipoException != "sucesso") {
                    Mensagem.Alert({
                        mensagem: data.Message,
                        titulo: data.Title,
                        tipo: data.TipoException,
                        botao: "Fechar"
                    });
                    return;
                }

                Mensagem.Alert({
                    mensagem: "Arquivo gerado com sucesso!",
                    titulo: "Folha - BO",
                    tipo: "sucesso",
                    botao: "Fechar",
                    callback: function () {
                        $("#formEventualBO").dialog("close");
                        Mensagem.Fechar();
                        $("#formPesquisar").submit();
                    }
                });

                return;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Mensagem.Alert({ mensagem: "Ocorreu um erro durante o processamento!", titulo: jqXHR.responseJSON.Title, tipo: jqXHR.responseJSON.TipoException, botao: "Fechar" });
            }
        });
    }
}