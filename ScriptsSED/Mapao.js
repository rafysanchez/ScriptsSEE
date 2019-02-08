$(document).ready(function () {
    PreenchimentoAutomatico();
    IniciarVariavel();
    AplicarMascaras();
    ValidarFiltro();
    Pesquisar();
    //PesquisarGoe();
    $("#filt-redeEnsino").change();
    GerarPDF();
    //GerarExcel();
});

var PreenchimentoAutomatico = function () {
    //$('#AnoLetivo').autoPreencher($('#CodigoDiretoria'), 'Diretoria', 'CarregarListaDiretorias');
    //$('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    //$('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: "'CodigoEscola'", AnoLetivo: "'AnoLetivo'" }]);
    //$('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "'CodigoEscola'", CodigoTipoEnsino: "'CodigoTipoEnsino'", AnoLetivo: "'AnoLetivo'" }]);
    //$('#CodigoTurma').autoPreencher($('#CodigoSubTurma'), 'SubTurma', 'CarregarListaSubTurma', [{ CodigoTurma: "'CodigoTurma'" }]);
    //// Preenchendo hidden com o texto da turma selecionada
    //$('#CodigoTurma').change(function () { $('#TextoTurma').val($(this).find('option:selected').text()); });
    //// Remontar o DDL de tipos de Fechamentos conforme Kanban #1824 para as turmas EJA. Para os outros tipos de turmas são os tipos de fechamentos tradicionais
    //$('#CodigoTurma').autoPreencher($('#CodigoTipoFechamento'), 'Mapao', 'CarregarListaTipoFechamentoConselho', [{ TextoTurma: "'TextoTurma'", AnoLetivo: "'AnoLetivo'" }]);
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

var IniciarVariavel = function () {
    var _folha = "A2";
    var _margins = [30, 150, 5, 30];
    var qtdLinhas = 0;
}

var ValidarFiltro = function () {
    $('#frmFiltro').validate({
        rules: {
            AnoLetivo: {
                required: true
            },
            CodigoDiretoria: {
                required: true
            },
            CodigoEscola: {
                required: true
            },
            //CodigoTipoEnsino: {
            //    required: true
            //},
            CodigoTurma: {
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
                anoLetivo: TratarValorNumerico($('#filt-redeEnsino').val())
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

    var fileName = 'MAPAO_' + $('#filt-escola :checked').text().replace(/ /g, '') + '_' + $('#filt-turma :checked').text().replace(/ /g, '') + '_' + $('#filt-redeEnsino').val() + '.xls';
    Exportar(url, 'Mapão', fileName);
}

var GerarPDF = function () {
    $('#btnGerarPdf').click(function () {
        debugger
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
            },
            success: function (data) {
                $('#resultadoPDF').html(data);

                //Nome Arquivo
                NomeArquivo = $("#NomeArquivo").val();
                colSpan = $("#colSpan").val();

                //Filtros a ser inserido no PDF
                filtros = [
                            { nome: "Ano Letivo", valor: $("#filt-redeEnsino").val() },
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
    });
}

var GerarExcel = function () {
    $('#btnExportarExcel').click(function () {
        if ($('#frmFiltro').valid() == false) {
            return;
        }
        var url = '/Mapao/GerarExcel?codigoTipoFechamento=' + $('#CodigoTipoFechamento').val() + '&codigoTurma=' + $('#filt-turma').val() + '&anoLetivo=' + $('#filt-redeEnsino').val();
        var fileName = 'MAPAO_' + $('#filt-escola :checked').text().replace(/ /g, '') + '_' + $('#filt-turma :checked').text().replace(/ /g, '') + '_' + $('#filt-redeEnsino').val() + '.xls';
        Exportar(url, 'Mapão', fileName);
    });
}

function EscrevePDF(filtros, NomeArquivo, tabelasOrigem, tabelasOrigemWidths, turmaOrigem, tipoMapa) {

    
    //Configurações
    var config = {
        pageOrientation: "portrait",
        pageSize: _folha,
        pageMargins: _margins,
        title: "Registro e Controle do Rendimento Escolar",
        filters: filtros,
        filename: NomeArquivo,
        tabelas: tabelasOrigem,
        tabelasWidths: tabelasOrigemWidths,
        turma: turmaOrigem
    };

    config.footerWidth = ((config.pageOrientation === "portrait") ? 555 : 805);
    config.tabela = tabelasOrigem;

    sedPdfExporter.normalizeConfig(config);

    //config.debug = true;
    config.docGenerator = function (config) {
        debugger
        //Filtros
        var filters;
        if (!config.filters || !config.filters.length) {
            filters = [{ text: "Nenhum filtro informado\n", bold: true }];
        } else {
            filters = [];
            for (i = 0; i < config.filters.length; i++) {
                filters.push({ text: config.filters[i].nome.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + ": ", bold: true });
                filters.push({ text: config.filters[i].valor.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + "\n" });
            }
        }
        filters.push({ text: " \n" });

        //Cabeçalho
        //Titulo
        //Filtros
        var content = [

            {
                table: {
                    widths: ["*", (config.pageOrientation == "portrait") ? 175 : 200],
                    body: [[{
                        image: "cabecalho",
                        width: (config.pageOrientation == "portrait") ? 350 : 450
                    }]]
                },
                layout: "noBorders",
                margin: [15, 0, 20, 0]
            },

            {
                text: config.title,
                style: "title",
                margin: [0, 5]
            },
			{
			    text: filters,
			    margin: [0, 0, 0, 0]
			}
        ];

        //Assinatura
        content.push({ text: "________________________________________", style: "assinatura", margin: [0, 0, 20, 0] });
        content.push({ text: "GOE", style: "assinaturatexto", margin: [0, 0, 140, 0] });

        for (var i = 0; i < config.tabelas.length; i++) {

            if (config.turma.length != 0) {
                content.push({
                    text: config.turma[i].find(Array)[0].text,
                    style: "titleTurma",
                    margin: [0, 5]
                });
            }

            content.push({
                //pageBreak: 'before',
                margin: [0, 20, 0, 0],
                table: {
                    widths: config.tabelasWidths[i],
                    headerRows: 3,
                    body: config.tabelas[i],
                }
            });

        }

        //Rodape
        content.push({
            image: "rodape",
            width: config.footerWidth - 2,
            style: "centro",
            margin: [0, 10, 0, 30]
        });

        var doc = {
            content: content,
            //header: config.sedHeader,
            //footer: config.sedFooter,
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
                    fontSize: 20
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
                fontSize: 7
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