$(document).ready(function () {
    PreenchimentoAutomatico();
    AplicarMascaras();
    ValidarFiltro();
    Pesquisar();
    $("#filt-anoLetivo").change();
    GerarPDF();
});

var PreenchimentoAutomatico = function () {
    //$('#AnoLetivo').autoPreencher($('#CodigoDiretoria'), 'Diretoria', 'CarregarListaDiretorias');
    //$('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    //$('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: "'CodigoEscola'", AnoLetivo: "'AnoLetivo'" }]);
    //$('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "'CodigoEscola'", CodigoTipoEnsino: "'CodigoTipoEnsino'", AnoLetivo: "'AnoLetivo'" }]);
    //$('#CodigoTurma').autoPreencher($('#CodigoSubTurma'), 'SubTurma', 'CarregarListaSubTurma', [{ CodigoTurma: "'CodigoTurma'" }]);
    //// Preenchendo hidden com o texto da turma selecionada
    //$('#filt-turma').change(function () { $('#TextoTurma').val($(this).find('option:selected').text()); });
    // Remontar o DDL de tipos de Fechamentos conforme Kanban #1824 para as turmas EJA. Para os outros tipos de turmas são os tipos de fechamentos tradicionais
    //$('#filt-turma').autoPreencher($('#CodigoTipoFechamento'), 'Mapao', 'CarregarListaTipoFechamentoConselho', [{ TextoTurma: "'TextoTurma'", AnoLetivo: "'filt-anoLetivo'" }]);
}

var TratarValorNumerico = function (valor) {
    if (valor == undefined) {
        return 0;
    }

    if (valor == '') {
        return 0;
    }

    if (isNaN(valor)) {
        return 0;
    }

    return parseInt(valor);
}

var ValidarFiltro = function () {
    $('#frmFiltro').validate({
        rules: {
            //AnoLetivo: {
            //    required: true
            //},
            //CodigoDiretoria: {
            //    required: true
            //},
            //CodigoEscola: {
            //    required: true
            //},
            ////CodigoTipoEnsino: {
            ////    required: true
            ////},
            //CodigoTurma: {
            //    required: true
            //},
            //CodigoTipoFechamento: {
            //    required: true
            //}

            'filt-anoLetivo': {
                required: true
            },
            'filt-redeEnsino': {
                required: true
            },
            'filt-diretoria': {
                required: true
            },
            'filt-municipio': {
                required: true
            },

            'filt-situacaoEscola': {
                required: true
            },

            'filt-escola': {
                required: true
            },

            'filt-tipoEnsino': {
                required: true
            },

            //CodigoTipoEnsino: {
            //    required: true
            //},
            'filt-turma': {
                required: true
            },
            CodigoTipoFechamento: {
                required: true
            }
        }
    });
}

var Pesquisar = function () {
    $('#btnPesquisar').click(function () {
        if ($('#frmFiltro').valid() == false) {
            return;
        }

        $.ajax({
            cache: false,
            url: '/Mapao/Pesquisar',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigoTipoFechamento: $('#CodigoTipoFechamento').val(),
                codigoTurma: TratarValorNumerico($('#filt-turma').val()),
                codigoSubTurma: TratarValorNumerico($('#filt-subTurma').val()),
                anoLetivo: TratarValorNumerico($('#filt-anoLetivo').val())
            },
            success: function (data) {
                $('#resultado').html(data);
            }
        });
    });
}

function AbirXls() {

    if ($('#frmFiltro').valid() == false) {
        return;
    }

    var url = '/Mapao/GerarExcel?codigoTipoFechamento=' + $('#CodigoTipoFechamento').val() +
                                '&codigoTurma=' + $('#filt-turma').val() +
                                '&codigoSubTurma=' + $('#filt-subTurma').val() +
                                '&anoLetivo=' + $('#filt-anoLetivo').val() +
                                '&tipoMapa=' + $('#hdnNovoMapao').val();

    var fileName = 'MAPAO_' + $('#filt-escola :checked').text().replace(/ /g, '') + '_' + $('#filt-turma :checked').text().replace(/ /g, '') + '_' + $('#AnoLetivo').val() + '.xls';
    Exportar(url, 'Mapão', fileName);
}

var GerarPDF = function () {
    $('#btnGerarPdf').click(function () {
        GeracaoPDF();
    });
}

var GerarExcel = function () {
    $('#btnExportarExcel').click(function () {
        if ($('#frmFiltro').valid() == false) {
            return;
        }
        var url = '/Mapao/GerarExcel?codigoTipoFechamento=' + $('#CodigoTipoFechamento').val() + '&codigoTurma=' + $('#filt-turma').val() + '&anoLetivo=' + $('#filt-anoLetivo').val();
        var fileName = 'MAPAO_' + $('#filt-escola :checked').text().replace(/ /g, '') + '_' + $('#filt-turma :checked').text().replace(/ /g, '') + '_' + $('#filt-anoLetivo').val() + '.xls';
        Exportar(url, 'Mapão', fileName);
    });
}

function GeracaoPDF() {
    if ($('#frmFiltro').valid() == false) {
        return;
    }
   
    $.ajax({
        cache: false,
        url: '/Mapao/GerarPDF',
        type: 'POST',
        datatype: 'HTML',
        data: {
            codigoTipoFechamento: $('#CodigoTipoFechamento').val(),
            codigoTurma: $('#filt-turma').val(),
            codigoSubTurma: $('#filt-subTurma').val(),
            anoLetivo: $('#filt-anoLetivo').val(),
            codigoDiretoria: $('#filt-diretoria').val(),
            codigoEscola: $('#filt-escola').val(),
            tipoMapa: $('#hdnNovoMapao').val()
            //codigoTipoFechamento: 5,
            //codigoTurma: 34724399,
            //codigoSubTurma: '',
            //anoLetivo: 2017,
            //codigoDiretoria: 20102,
            //codigoEscola: 42122,
            //tipoMapa: 'novoMapao'
        },
        success: function (data) {
            $('#resultadoPDF').html(data);

            //Nome Arquivo
            NomeArquivo = $("#NomeArquivo").val();
            colSpan = $("#colSpan").val();

            //Filtros a ser inserido no PDF
            filtros = [
                        { nome: "Ano Letivo", valor: $('#filt-anoLetivo').val() },
                        { nome: "Diretoria", valor: $("#filt-diretoria option:selected").text() },
                        { nome: "Escola", valor: $("#filt-escola option:selected").text() },
                        { nome: "Tipo de Ensino", valor: $("#filt-tipoEnsino option:selected").text() },
                        { nome: "Turma", valor: $("#filt-turma option:selected").text() }
            ];

            if ($("#SubTurmaDescricao").length) {
                filtros.push({ nome: "Subturma", valor: $("#SubTurmaDescricao").val() });
            }

            filtros.push({ nome: "Tipo Fechamento", valor: $("#CodigoTipoFechamento option:selected").text() });
            filtros.push({ nome: "Total de Aulas Dadas", valor: $("#TotalAulaDadaDescricao").text() });
            
            //turmaOrigem = $("#filt-turma option:selected").text();
            EscrevePDF(filtros, NomeArquivo, tabelas, tabelasWidths, turmaOrigem, $('#hdnNovoMapao').val());
        }
    });
}

function EscrevePDF(filtros, NomeArquivo, tabelasOrigem, tabelasOrigemWidths, turmaOrigem, tipoMapa) {

    //Configurações
    var config = {
        pageOrientation: "portrait",
        pageSize: "A4",
        pageMargins: [20, 140, 20, 20],
        title: "Registro e Controle do Rendimento Escolar",
        filters: filtros,
        filename: NomeArquivo,
        tabelas: tabelasOrigem,
        tabelasWidths: tabelasOrigemWidths,
        turma: turmaOrigem,
        tipoMapa: tipoMapa
    };

    config.tabela = tabelasOrigem;

    sedPdfExporter.normalizeConfig(config);

    //config.debug = true;
    config.docGenerator = function (config) {
        //Cabeçalho
        var hheader = [
            //logo
            {
                table: {
                    widths: ["*", (config.pageOrientation == "portrait") ? 175 : 200],
                    body: [[{
                        image: "cabecalho",
                        width: (config.pageOrientation == "portrait") ? 350 : 450
                    }]]
                },
                layout: "noBorders",
                margin: [20, 0, 20, 0]
            },
            //titulo
            {
                text: config.title,
                style: "title",
                margin: [20, 2, 2, 0]
            },
            //assinatura e filtro
            {
                table: {
                    widths: ['55%', '45%'],
                    body: [
                        [
                            {
                                text: [
                                    { text: config.filters[0].nome.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + ": ", bold: true, fontSize: 7 },
                                    { text: config.filters[0].valor.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + "\n" },
                                    { text: config.filters[1].nome.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + ": ", bold: true, fontSize: 7 },
                                    { text: config.filters[1].valor.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + "\n" },
                                    { text: config.filters[2].nome.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + ": ", bold: true, fontSize: 7 },
                                    { text: config.filters[2].valor.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + "\n" },
                                    { text: config.filters[3].nome.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + ": ", bold: true, fontSize: 7 },
                                    { text: config.filters[3].valor.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + "\n" },
                                    { text: config.filters[4].nome.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + ": ", bold: true, fontSize: 7 },
                                    { text: config.filters[4].valor.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + "\n" },
                                    { text: config.filters[5].nome.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + ": ", bold: true, fontSize: 7 },
                                    { text: config.filters[5].valor.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + "\n" },
                                    { text: config.filters[6].nome.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + ": ", bold: true, fontSize: 7 },
                                    { text: config.filters[6].valor.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + "\n" }
                                ]
                            },
                            {
                                text: [
                                    { text: "\n______________________________________\n", style: "assinatura", margin: [0, 0, 0, 0] },
                                    { text: "GOE", alignment: 'center', style: "assinaturatexto", margin: [0, 0, 0, 0] }
                                ]
                            }
                        ]
                    ]
                },
                layout: "noBorders",
                margin: [20, 0, 20, 0]
            }
        ];

        //debugger;
        var content = [
        ];

        var qtdMaxLinhas = 52;

        if (config.tipoMapa == "novoMapao") {
            qtdMaxLinhas = 40;
        }

        for (var i = 0; i < config.tabelas.length; i++) {

            if (config.turma.length != 0) {
                content.push({
                    text: config.turma[i].find(Array)[0].text,
                    style: "titleTurma",
                    margin: [0, 5]
                });
            }

            var qtdarray = 0;
            var newarray = [];

            //processa primeiras 6 disciplinas
            if (i == 0) {
                qtdarray = Math.ceil((config.tabelas[0].length - 2) / qtdMaxLinhas);
                for (var z = 0; z < qtdarray; z++) {

                    //isto foi feito para clonar o array, pois gerava problema no cabeçalho
                    newarray = [[], []];
                    for (var o = 0; o < 2; o++) {
                        var original = config.tabelas[i][o];
                        for (var li = 0; li < original.length; li++) {
                            var oa = original[li];
                            var no = {};
                            for (var p in oa)
                                no[p] = oa[p];
                            newarray[o].push(no);
                        }
                    }

                    //processa primeiras 52 linhas
                    if (z == 0) {
                        for (var x = 2; x < (config.tabelas[i].length < (qtdMaxLinhas + 2) ? config.tabelas[i].length : (qtdMaxLinhas + 2)) ; x++) {
                            newarray.push(config.tabelas[i][x]);
                        }

                        if (i == config.tabelas.length - 1 && newarray.length - 2 < qtdMaxLinhas) {
                            content.push({
                                margin: [0, 5, 0, 0],
                                table: {
                                    widths: config.tabelasWidths[i],
                                    headerRows: 2,
                                    body: newarray,
                                }
                            });
                        }
                        else {
                            content.push({
                                margin: [0, 5, 0, 0],
                                pageBreak: 'after',
                                table: {
                                    widths: config.tabelasWidths[i],
                                    headerRows: 2,
                                    body: newarray,
                                }
                            });
                        }
                    }
                        //processa demais linhas
                    else {
                        for (var x = 2; x < qtdMaxLinhas + 2; x++) {
                            if (((z * qtdMaxLinhas) + x) < config.tabelas[i].length) {
                                newarray.push(config.tabelas[i][(z * qtdMaxLinhas) + x]);
                            }
                        }

                        if (i == config.tabelas.length - 1 && newarray.length - 2 < qtdMaxLinhas) {
                            content.push({
                                margin: [0, 5, 0, 0],
                                table: {
                                    widths: config.tabelasWidths[i],
                                    headerRows: 2,
                                    body: newarray,
                                }
                            });
                        }
                        else {
                            content.push({
                                margin: [0, 5, 0, 0],
                                pageBreak: 'after',
                                table: {
                                    widths: config.tabelasWidths[i],
                                    //headerRows: 2,
                                    body: newarray,
                                }
                            });
                        }
                    }
                }
            }
            //processa demais disciplinas
            else {
                qtdarray = Math.ceil((config.tabelas[0].length - 2) / qtdMaxLinhas);
                for (var z = 0; z < qtdarray; z++) {
                    //isto foi feito para clonar o array, pois gerava problema no cabeçalho
                    newarray = [[], []];
                    for (var o = 0; o < 2; o++) {
                        var original = config.tabelas[i][o];
                        for (var li = 0; li < original.length; li++) {
                            var oa = original[li];
                            var no = {};
                            for (var p in oa)
                                no[p] = oa[p];
                            newarray[o].push(no);
                        }
                    }

                    //processa primeiras 52 linhas
                    if (z == 0) {
                        for (var x = 2; x < (config.tabelas[i].length < (qtdMaxLinhas + 2) ? config.tabelas[i].length : (qtdMaxLinhas + 2)) ; x++) {
                            newarray.push(config.tabelas[i][x]);
                        }

                        if (i == config.tabelas.length - 1 && newarray.length - 2 < qtdMaxLinhas) {
                            content.push({
                                margin: [0, 5, 0, 0],
                                table: {
                                    widths: config.tabelasWidths[i],
                                    headerRows: 2,
                                    body: newarray,
                                }
                            });
                        }
                        else {
                            content.push({
                                margin: [0, 5, 0, 0],
                                pageBreak: 'after',
                                table: {
                                    widths: config.tabelasWidths[i],
                                    headerRows: 2,
                                    body: newarray,
                                }
                            });
                        }
                    }
                        //processa demais linhas
                    else {
                        for (var x = 2; x < qtdMaxLinhas + 2; x++) {
                            if (((z * qtdMaxLinhas) + x) < config.tabelas[i].length) {
                                newarray.push(config.tabelas[i][(z * qtdMaxLinhas) + x]);
                            }
                        }

                        if (i == config.tabelas.length - 1 && newarray.length - 2 < qtdMaxLinhas) {
                            content.push({
                                margin: [0, 5, 0, 0],
                                table: {
                                    widths: config.tabelasWidths[i],
                                    headerRows: 2,
                                    body: newarray,
                                }
                            });
                        }
                        else {
                            content.push({
                                margin: [0, 5, 0, 0],
                                pageBreak: 'after',
                                table: {
                                    widths: config.tabelasWidths[i],
                                    //headerRows: 2,
                                    body: newarray,
                                }
                            });
                        }
                    }
                }
            }
        }

        var doc = {
            content: content,
            header: hheader,
            styles: {
                assinatura: {
                    bold: true,
                    color: "#000",
                    alignment: "right",
                    fontSize: 14,
                    margin: [0, -50, 0, 0]
                },
                assinaturatexto: {
                    bold: true,
                    color: "#000",
                    alignment: "right",
                    fontSize: 14,
                    margin: [0, 0, 0, 0]
                },
                tableHeader: {
                    bold: true,
                    color: "#fff",
                    fontSize: 6,
                    fillColor: "#459ad6",
                    alignment: "center",
                    margin: [0, 0, 0, 0]
                },
                tableHeaderSeparador: {
                    color: "#fff",
                    fontSize: 5,
                    fillColor: "#fff",
                    alignment: "center"
                },
                tableBodyEven: {},
                tableBodyOdd: {
                    fillColor: "#e2efff"
                },
                title: {
                    bold: true,
                    color: "#459ad6",
                    alignment: "center",
                    fontSize: 13
                },
                titleTurma: {
                    bold: true,
                    color: "#459ad6",
                    alignment: "center",
                    fontSize: 14
                },
                centro: {
                    alignment: "center"
                },
                cabecalho: {
                    alignment: "right",
                    fontSize: 12,
                    bold: true
                },
                filtroTitle: {
                    fontSize: 10,
                    bold: true,
                    color: "#459ad6",
                }
            },
            defaultStyle: {
                fontSize: 6
            },
            images: {
                cabecalho: config.sedHeaderImage,
                rodape: config.sedFooterImage
            }
        }

        return doc;
    };

    sedPdfExporter.exportPdf(config);
}