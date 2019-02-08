var dataTableBO = null;
var linhaSelecionada = undefined;
$(document).ready(function () {
    AplicarMascaras();

    $("#mes option")[new Date().getMonth() + 1].selected = true;

    $("#codigoDiretoria").change(function () { listarEscola() });
    if ($("#codigoDiretoria option").length == 2) {
        $("#codigoDiretoria option:selected").remove();
        $("#codigoDiretoria").trigger("change");
    }

    var columnDefs = [{ targets: [4], orderable: false }];

    var colunas = [
                    { data: "AnoMes" },
                    { data: "Cpf" },
                    { data: "Nome" },
                    { data: "QuantidadeAulas" },
                    {
                        data: function () {
                            return "<i class='icone-tabela-visualizar' title='Visualizar' onclick=\"visualizar(" + arguments[3].row + ")\"></i>";
                        }
                    }
    ]

    var rules = {
        anoLetivo: {
            required: true
        },
        mes: {
            required: true
        }
    };

    if ($("#codigoDiretoria").length > 0) {
        rules.codigoDiretoria = {
            required: true
        };
        rules.codigoEscola = {
            required: true
        }
        colunas.push({
            data: function () {
                return "<i class='icone-tabela-imprimir' title='Imprimir PDF' onclick=\"imprimirTodos(" + arguments[3].row + ")\"></i>";
            }
        });

        columnDefs = [{ targets: [4, 5], orderable: false }];
    }

    $("#formPesquisar").validate({
        rules: rules,
        submitHandler: function (form) {

            var filtros = {
                anoLetivo: $("#anoLetivo").val(),
                mes: $("#mes").val()
            };
            if ($("#codigoDiretoria").length > 0) {
                filtros.codigoEscola = $("#codigoEscola").val();
            }

            $.ajax({
                url: "/EventualBO/PesquisarBO",
                type: "GET",
                dataType: "JSON",
                data: filtros,
                success: function (data, textStatus, xhr) {
                    //$("#resultadoPesquisa").html(data);
                    $("#resultadoPesquisa").show();
                    $("#tabelaPesquisa").sedDataTable({
                        embutida: true,
                        nomeExportacao: "Relação de BO - Eventual",
                        botaoSelecionarColunas: false,
                        botaoImprimir: false,
                        botaoGerarCSV: false,
                        botaoGerarPDF: false,
                        data: data,
                        columns: colunas,
                        order: [[0, "desc"]],
                        columnDefs: columnDefs
                    });
                    dataTableBO = $("#tabelaPesquisa").DataTable();

                    //  $("#tabelaPesquisa").sedDataTable({});

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    ("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message);
                }
            });
            return;
        }
    });

});
function visualizar(linha) {

    var html = preencherView(linha);

    $("#formEventualBO").dialog({
        title: "Visualizar BO Eventual",
        width: "lg",
        destroy: false
    });
}
function preencherView(linha) {
    var view = $("#formEventualBO");
    var bo = dataTableBO.row(linha).data()

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

function imprimirTodos(linha) {
    linhaSelecionada = linha;
    MostrarOpcoes(
		["Sem Legenda", "Com Legenda"],
		ItemSelecionado,
		"BO Eventual", // opcional
		"Deseja imprimir com a legenda das escolas?", // opcional
		"sm" // largura (opcional, funciona como a largura do dialog)
	);
}


function ItemSelecionado(valor, indice) {
    if (indice > -1) {
        var bos = []

        if (linhaSelecionada != undefined) {
            bos.push(dataTableBO.row(linhaSelecionada).data());
        } else {
            for (var i = 0; i < dataTableBO.data().length; i++) {
                bos.push(dataTableBO.row(i).data())
            }
        }

        criarDoc(bos, indice == 0?false:true);
    }
}

function criarDoc(Bo,imprimirLegenda) {
    var config = {
        pageOrientation: "landscape",
        pageSize: "A4",
        pageMargins: [20, 100, 20, 110],
        title: "Boletim de ocorrência",
        imprimirLegenda:imprimirLegenda
    };

    config.Registros = Bo;

    sedPdfExporter.normalizeConfig(config);

    //config.debug = true;

    config.docGenerator = function (config) {
        var contentGeral = [];
        for (registro in config.Registros) {

            var totalHorasEnsinoCicloI = 0, totalHorasEnsinoCicloII = 0, totalHorasEnsinoMedio = 0;
            var totalHorasEnsinoCicloINT = 0, totalHorasEnsinoCicloIINT = 0, totalHorasEnsinoMedioNT = 0;
            var totalregistros = config.Registros[registro].Linha.length;
            var registrosPorPagina = 17;
            var totalPaginas = parseInt(totalregistros / registrosPorPagina);
            var resto = totalregistros % registrosPorPagina;
            if (resto > 0) {
                totalPaginas++;
                if (resto > 12) {
                    totalPaginas++;
                }
            } else {
                if (totalregistros >= registrosPorPagina) {
                    totalPaginas++;
                }
            }

            //Carrega os registro
            var registros = [];
            var grupo = [];
            var linhaRegistroAtual = 0;
            for (var linha = 0; linha < totalPaginas; linha++) {
                grupo = [[{ colSpan: 7, alignment: 'center', style: 'label', text: 'ENSINO FUNDAMENTAL CICLO I' }, '', '', '', '', '', '',
                                { colSpan: 7, alignment: 'center', style: 'label', text: 'ENSINO FUNDAMENTAL CICLO II' }, '', '', '', '', '', '',
                                { colSpan: 7, alignment: 'center', style: 'label', text: 'ENSINO MÉDIO' }, '', '', '', '', '', ''],
                                [{ text: 'DIA', style: 'small' }, { text: 'HS', style: 'small' }, { text: 'NT', style: 'small' }, { text: 'CPF SUBST.', style: 'small', }, { text: 'DI', style: 'small' }, { text: 'Escola', style: 'small' }, { text: 'Disc.', style: 'small' },
                                { text: 'DIA', style: 'small' }, { text: 'HS', style: 'small' }, { text: 'NT', style: 'small' }, { text: 'CPF SUBST.', style: 'small' }, { text: 'DI', style: 'small' }, { text: 'Escola', style: 'small' }, { text: 'Disc.', style: 'small' },
                                { text: 'DIA', style: 'small' }, { text: 'HS', style: 'small' }, { text: 'NT', style: 'small' }, { text: 'CPF SUBST.', style: 'small' }, { text: 'DI', style: 'small' }, { text: 'Escola', style: 'small' }, { text: 'Disc.', style: 'small' }]];

                if (linha + 1 == totalPaginas) {
                    registrosPorPagina = 12;
                }
                for (var i = 0; i < registrosPorPagina; i++) {
                    if (linhaRegistroAtual < totalregistros) {

                        grupo.push([{ text: config.Registros[registro].Linha[linhaRegistroAtual].Dia.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloI.QuantidadeAulas.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloI.QuantidadeAulasNT.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloI.CpfProfessor.toString(), style: 'small', }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloI.DiProfessor.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloI.CodigoEscola.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloI.Disciplina.toString(), style: 'small' },
                                    { text: config.Registros[registro].Linha[linhaRegistroAtual].Dia.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloII.QuantidadeAulas.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloII.QuantidadeAulasNT.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloII.CpfProfessor.toString(), style: 'small', }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloII.DiProfessor.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloII.CodigoEscola.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoFundamentalCicloII.Disciplina.toString(), style: 'small' },
                                    { text: config.Registros[registro].Linha[linhaRegistroAtual].Dia.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoMedio.QuantidadeAulas.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoMedio.QuantidadeAulasNT.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoMedio.CpfProfessor.toString(), style: 'small', }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoMedio.DiProfessor.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoMedio.CodigoEscola.toString(), style: 'small' }, { text: config.Registros[registro].Linha[linhaRegistroAtual].EnsinoMedio.Disciplina.toString(), style: 'small' }]);

                        totalHorasEnsinoCicloI += parseInt(grupo[grupo.length - 1][1].text);
                        totalHorasEnsinoCicloII += parseInt(grupo[grupo.length - 1][8].text);
                        totalHorasEnsinoMedio += parseInt(grupo[grupo.length - 1][15].text);

                        totalHorasEnsinoCicloINT += parseInt(grupo[grupo.length - 1][2].text);
                        totalHorasEnsinoCicloIINT += parseInt(grupo[grupo.length - 1][9].text);
                        totalHorasEnsinoMedioNT += parseInt(grupo[grupo.length - 1][16].text);

                    } else {
                        grupo.push([{ text: "#", style: 'small' }, { text: "", style: 'small' }, { text: "", style: 'small' }, { text: "", style: 'small', }, { text: "", style: 'small' }, { text: "", style: 'small' }, { text: "", style: 'small' },
                                  { text: "#", style: 'small' }, { text: "", style: 'small' }, { text: "", style: 'small' }, { text: "", style: 'small', }, { text: "", style: 'small' }, { text: "", style: 'small' }, { text: "", style: 'small' },
                                  { text: "#", style: 'small' }, { text: "", style: 'small' }, { text: "", style: 'small' }, { text: "", style: 'small', }, { text: "", style: 'small' }, { text: "", style: 'small' }, { text: "", style: 'small' }]);
                    }
                    linhaRegistroAtual++;
                }
                registros.push({ grupo: registros.length - 1, registros: grupo });
            }

            var content = [];
            for (var posicao = 0; posicao < registros.length; posicao++) {

                var cont = 0;

                content.push({ text: "BOLETIM DE OCORRÊNCIA ESPECÍFICO PARA SUBSTITUIÇÃO EVENTUAL", style: "title" });

                content.push({
                    margin: [0, 10, 0, 5],
                    layout: {
                        hLineWidth: function (i, node) {
                            return 1;
                        },
                        vLineWidth: function (i, node) {
                            return 1;
                        },
                        hLineColor: function (i, node) {
                            return 'gray';
                        },
                        vLineColor: function (i, node) {
                            return 'gray';
                        },
                    },
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                [
                                    {
                                        style: "small",
                                        layout: 'noBorders',
                                        table: {
                                            widths: ['auto', 40, 'auto', 40, 'auto', 200, 'auto', 25, '*', 'auto', 'auto', '*', 'auto', 'auto'],
                                            body: [
                                                [{ text: config.Registros[registro].Nome.toString(), style: "label", alignment: 'center', colSpan: 12 }, '', '', '', '', '', '', '', '', '', '', '', '', ''],
                                                [{ text: 'CPF:' }, { text: config.Registros[registro].Cpf.toString() }, { text: 'RSPV:' }, { text: config.Registros[registro].RS.toString() + '/' + config.Registros[registro].PV.toString() }, 'S.C.F.:', config.Registros[registro].Escola.toString(), { text: 'UA:' }, config.Registros[registro].CodigoUA.toString(), { text: 'CIE:', alignment: 'right' }, config.Registros[registro].CodigoEscola.toString(), { text: 'Período', alignment: 'rigth' }, config.Registros[registro].Periodo.toString(), { text: 'Categoria:', alignment: 'rigth' }, config.Registros[registro].Categoria.toString()]
                                            ]
                                        },
                                    }
                                ]
                            ]
                        ]
                    },
                });

                var dias = ['Total'];

                for (var i = 0; i < 31; i++) {
                    dias.push(config.Registros[registro].Dias[i].toString());
                }

                content.push(
                    {
                        margin: [0, 0, 0, 10],
                        alignment: 'center',
                        layout: {
                            hLineWidth: function (i, node) {
                                return 1;
                            },
                            vLineWidth: function (i, node) {
                                return 1;
                            },
                            hLineColor: function (i, node) {
                                return 'gray';
                            },
                            vLineColor: function (i, node) {
                                return 'gray';
                            },
                        },
                        style: "small",
                        table: {
                            widths: ['auto', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                            body: [
                                [{ colSpan: 32, alignment: 'center', text: 'QUANTIDADE DIÁRIA DE AULAS EVENTUAIS MINISTRADAS' }, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                                ['Data', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
                                dias
                            ]
                        }
                    }
                );

                var registrosSub = [];

                registrosSub.push(config.Registros[registro].QuantidadeHorasCicloI.toString());
                registrosSub.push(config.Registros[registro].QuantidadeNTCicloI.toString());
                registrosSub.push(config.Registros[registro].QuantidadeALECicloI.toString());

                registrosSub.push(config.Registros[registro].QuantidadeHorasCicloII.toString());
                registrosSub.push(config.Registros[registro].QuantidadeNTCicloII.toString());
                registrosSub.push(config.Registros[registro].QuantidadeALECicloII.toString());


                registrosSub.push(config.Registros[registro].QuantidadeHorasEnsinoMedio.toString());
                registrosSub.push(config.Registros[registro].QuantidadeNTEnsinoMedio.toString());
                registrosSub.push(config.Registros[registro].QuantidadeALEEsinoMedio.toString());

                content.push({
                    margin: [0, 0, 0, 5],
                    alignment: 'center',
                    style: "small",
                    layout: {
                        hLineWidth: function (i, node) {
                            return 1;
                        },
                        vLineWidth: function (i, node) {
                            return 1;
                        },
                        hLineColor: function (i, node) {
                            return 'gray';
                        },
                        vLineColor: function (i, node) {
                            return 'gray';
                        },
                    },
                    table: {
                        widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
                        style: "label",
                        body: [
                            [{ colSpan: 3, alignment: 'center', text: 'ENSINO FUNDAMENTAL CICLO I' }, '', '',
                            { colSpan: 3, alignment: 'center', text: 'ENSINO FUNDAMENTAL CICLO II' }, '', '',
                            { colSpan: 3, alignment: 'center', text: 'ENSINO MÉDIO' }, '', ''],
                            [{ text: 'HORAS', style: 'small' }, { text: 'GTCN', style: 'small' }, { text: 'ALE', style: 'small' }, { text: 'HORAS', style: 'small' }, { text: 'GTCN', style: 'small' }, { text: 'ALE', style: 'small' }, { text: 'HORAS', style: 'small' }, { text: 'GTCN', style: 'small' }, { text: 'ALE', style: 'small' }],
                            registrosSub
                        ]
                    }
                });

                var pularLinha = 'after';
                if (parseInt(registro) + 1 == config.Registros.length) {
                    pularLinha = '';
                }

                content.push({
                    alignment: 'center',
                    layout: {
                        hLineWidth: function (i, node) {
                            return 1;
                        },
                        vLineWidth: function (i, node) {
                            return 1;
                        },
                        hLineColor: function (i, node) {
                            return 'gray';
                        },
                        vLineColor: function (i, node) {
                            return 'gray';
                        },
                    },
                    style: "small",
                    table: {
                        widths: [20, 20, 20, '*', 15, '*', '*',
                                    20, 20, 20, '*', 15, '*', '*',
                                    20, 20, 20, '*', 15, '*', '*'],
                        body: registros[posicao].registros
                    },
                });

                if (posicao + 1 == registros.length) {
                    content.push({
                        alignment: 'center',
                        layout: {
                            hLineWidth: function (i, node) {
                                return 1;
                            },
                            vLineWidth: function (i, node) {
                                return 1;
                            },
                            hLineColor: function (i, node) {
                                return 'gray';
                            },
                            vLineColor: function (i, node) {
                                return 'gray';
                            },
                        },
                        table: {
                            widths: [20, 20, 20, '*', 15, '*', '*',
                                     20, 20, 20, '*', 15, '*', '*',
                                     20, 20, 20, '*', 15, '*', '*'],
                            body: [
                                [{ text: 'Total', style: 'small', border: [false, false, false, false] }, { text: totalHorasEnsinoCicloI.toString(), style: 'small', border: [true, false, true, true] }, { text: totalHorasEnsinoCicloINT.toString(), style: 'small', border: [true, false, true, true] }, { text: '', style: 'smallSemMargen', border: [false, false, false, false] }, { text: '', border: [false, false, false, false] }, { text: '', border: [false, false, false, false] }, { text: '', border: [false, false, false, false] },
                                { text: '', style: 'small', border: [false, false, false, false] }, { text: totalHorasEnsinoCicloII.toString(), style: 'small', border: [true, false, true, true] }, { text: totalHorasEnsinoCicloIINT.toString(), style: 'small', border: [true, false, true, true] }, { text: '', style: 'smallSemMargen', border: [false, false, false, false] }, { text: '', border: [false, false, false, false] }, { text: '', border: [false, false, false, false] }, { text: '', border: [false, false, false, false] },
                                { text: '', style: 'small', border: [false, false, false, false] }, { text: totalHorasEnsinoMedio.toString(), style: 'small', border: [true, false, true, true] }, { text: totalHorasEnsinoMedioNT.toString(), style: 'small', border: [true, false, true, true] }, { text: '', style: 'smallSemMargen', border: [false, false, false, false] }, { text: '', border: [false, false, false, false] }, { text: '', border: [false, false, false, false] }, { text: '', border: [false, false, false, false], }]
                            ]
                        }
                    });
                    content.push({
                        margin: [30, 10, 30, 0],
                        alignment: 'center',
                        style: "label",
                        pageBreak: pularLinha,
                        layout: {
                            hLineWidth: function (i, node) {
                                return 1;
                            },
                            vLineWidth: function (i, node) {
                                return 1;
                            },
                            hLineColor: function (i, node) {
                                return 'gray';
                            },
                            vLineColor: function (i, node) {
                                return 'gray';
                            },
                        },
                        table: {
                            widths: ['*', 20, '*'],
                            body: [
                                [
                                    {
                                        layout: 'noBorders',
                                        alignment: 'center',
                                        style: "label",
                                        table: {
                                            widths: ['*', '*'],
                                            body: [
                                                [{ alignment: 'left', text: 'Auxilio Transporte (09B)       ' + config.Registros[registro].QuantidadeAuxilioTransporteStr.toString(), colSpan: 2 }, ''],
                                                 [{ alignment: 'left', text: '_________', colSpan: 2, margin: [90, -10, 0, 0] }, ''],
                                                [{ alignment: 'center', text: 'RECEBIDO EM', colSpan: 2, margin: [0, 0, 0, 0] }, ''],
                                                 [{ text: '_________________________', margin: [0, 6, 0, 0] }, { text: '_____________________________________________', margin: [0, 6, 0, 0] }],
                                                [{ text: '/              /', margin: [0, -18, 0, 0] }, ''],
                                                [{ text: 'Data', style: 'small', margin: [0, -5, 0, 0] }, { text: 'Assinatura', style: 'small', margin: [0, -5, 0, 0] }],
                                            ]
                                        }
                                    },
                                    { border: [false, false, false, false], text: '' },
                                     {
                                         layout: 'noBorders',
                                         alignment: 'center',
                                         style: "label",
                                         table: {
                                             widths: ['*', '*'],
                                             body: [
                                                 [{ alignment: 'center', text: '', colSpan: 2 }, ''],
                                                 [{ alignment: 'center', text: config.Registros[registro].DataAtualPorExtenso.toString(), colSpan: 2, margin: [0, 12, 0, 0] }, ''],
                                                 [{ text: '_____________________________________________', margin: [0, 7, 0, 0] }, { text: '_____________________________________________', margin: [0, 7, 0, 0] }],
                                                 [{ text: 'GERENTE DE ORG. ESCOLAR', style: 'small' }, { text: 'DIRETOR DE ESCOLA', style: 'small' }],
                                                 //[{ text: 'RG', style: 'small' }, { text: 'RG', style: 'small' }],
                                                 //[{ text: 'Secretário de escola', style: 'small' }, { text: 'Diretor de escola', style: 'small' }]
                                             ]
                                         }
                                     },
                                ]
                            ]
                        }
                    });
                    
                    if (config.imprimirLegenda) {
                        content.push({ text: "Escolas", style: "title", pageBreak: "before" });
                        var legendaEscolas = [];
                        legendaEscolas.push(
                            [
                                { "text": "CÓDIGO", "style": "label" },
                                { "text": "NOME", "style": "label" },
                                { "text": "CÓDIGO", "style": "label" },
                                { "text": "NOME", "style": "label" },
                                { "text": "CÓDIGO", "style": "label" },
                                { "text": "NOME", "style": "label" },
                                { "text": "CÓDIGO", "style": "label" },
                                { "text": "NOME", "style": "label" }
                            ]
                        );
                        var escolaPosicao = 0;
                        while (escolaPosicao < config.Registros[registro].Escolas.length) {
                            var linha = [];
                            for (var i = 0; i < 4; i++) {
                                if (escolaPosicao < config.Registros[registro].Escolas.length) {
                                    linha.push({ "text": config.Registros[registro].Escolas[escolaPosicao].Key.toString() });
                                    linha.push({ "text": config.Registros[registro].Escolas[escolaPosicao].Value.toString() });
                                } else {
                                    linha.push({ "text": "" });
                                    linha.push({ "text": "" });
                                }
                                escolaPosicao++;
                            }
                            legendaEscolas.push(linha);
                        }

                        content.push({
                            margin: [0, 10, 0, 0],
                            alignment: "center",
                            style: "small",
                            layout: {
                                hLineWidth: function (i, node) {
                                    return 1;
                                },
                                vLineWidth: function (i, node) {
                                    return 1;
                                },
                                hLineColor: function (i, node) {
                                    return 'gray';
                                },
                                vLineColor: function (i, node) {
                                    return 'gray';
                                },
                            },
                            table: {
                                widths: [30, "*", 30, "*", 30, "*", 30, "*"],
                                style: "small",
                                body: legendaEscolas
                            }
                        })
                    }

                }
            }

            contentGeral.push(content);
        }

        var doc = {
            header: config.sedHeader,
            footer: config.sedFooter,
            content: contentGeral,
            styles: {
                title: {
                    bold: true,
                    color: '#459ad6',
                    alignment: 'center',
                    fontSize: 15
                },
                small: {
                    fontSize: 6
                },
                label: {
                    fontSize: 8
                },
                smallSemMargen: {
                    fontSize: 8,
                }
            }
        }
        return doc;
    };

    sedPdfExporter.exportPdf(config);
}

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