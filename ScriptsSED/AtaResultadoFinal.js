$(document).ready(function () {
    //PreenchimentoAutomatico();
    //AplicarMascaras();
    ValidarFiltro();
    Pesquisar();
    $("#filt-anoLetivo").change();

});

var PreenchimentoAutomatico = function () {
    $('#AnoLetivo').autoPreencher($('#CodigoDiretoria'), 'Diretoria', 'CarregarListaDiretorias');
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: "'CodigoEscola'", AnoLetivo: "'AnoLetivo'" }]);
    $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "'CodigoEscola'", CodigoTipoEnsino: "'CodigoTipoEnsino'", AnoLetivo: "'AnoLetivo'" }]);
    $('#CodigoTurma').change(function () { $('#TextoTurma').val($(this).find('option:selected').text()); });
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
            CodigoTipoEnsino: {
                required: true
            },
            CodigoTurma: {
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
            url: '/AtaResultadoFinal/Pesquisar',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigoDiretoria: $('#filt-diretoria').val(),
                codigoEscola: $('#filt-escola').val(),
                codigoTipoEnsino: $('#filt-tipoEnsino').val(),
                codigoTurma: $('#filt-turma').val(),
                anoLetivo: $('#filt-anoLetivo').val()
            },
            success: function (data) {
                $('#resultado').empty().html(data);
                $('#tabela').sedDataTable({
                    botaoGerarPDF: false,
                    nomeExportacao: "Ata Resultado Final",
                    tituloFiltro: " ",
                    filtros: [
                        { nome: "Ano Letivo", valor: $('#filt-anoLetivo').val() },
                        { nome: "Diretoria", valor: $('#filt-diretoria  option:selected').text() },
                        { nome: "Escola", valor: $('#filt-escola  option:selected').text() },
                        { nome: "Tipo de Ensino", valor: $('#filt-tipoEnsino  option:selected').text() },
                        { nome: "Turma", valor: $('#filt-turma  option:selected').text() }
                    ]
                });
            }
        });
    });
}

function AbirPdf() {
    if ($('#frmFiltro').valid() == false) {
        return;
    }
  //  window.open('../../AtaResultadoFinal/GerarExcel?codigoDiretoria=' + $('#filt-diretoria').val() + '&codigoEscola=' + $('#filt-escola').val() + '&codigoTipoEnsino=' + $('#filt-tipoEnsino').val() + '&codigoTurma=' + $('#filt-turma').val() + '&anoLetivo=' + $('#filt-anoLetivo').val(), '_blanck');
//}

    $.ajax({
        cache: false,
        url: '/AtaResultadoFinal/GerarPDF',
        type: 'POST',
        datatype: 'JSON',
        data: {
            codigoDiretoria: $('#filt-diretoria').val(),
            codigoEscola: $('#filt-escola').val(),
            codigoTipoEnsino: $('#filt-tipoEnsino').val(),
            codigoTurma: $('#filt-turma').val(),
            anoLetivo: $('#filt-anoLetivo').val()
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            gerarPdf(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop();
        }
    });
}

function gerarPdf(data) {

    var config = {
        pageOrientation: "landscape",
        pageSize: "A3",
        pageMargins: [5, 5, 5, 5],
        title: "Ata Resultado Final"
    };
    sedPdfExporter.normalizeConfig(config);
    //config.debug = true;
    config.data = data;
    config.docGenerator = function (config) {
        var content = [];
        //laço para cada Turma
        for (var t = 0; t < config.data.length ; t++) {
            var turma = config.data[t];
            //adiciona informacao da turma 
            content.push(
                {
                    text: 'Ata Resultado Final',
                    fontSize: 18,
                    alignment: 'center',
                    color: '#459ad6'
                },
                {
                    style: 'infoTurma',
                    color: '#222',
                    table: {
                        widths: ['auto', '*', 'auto', '*'],
                        body: [
                            [{ text: "Diretoria:", style: 'h2' }, { text: turma.NomeDiretoria }, { text: "Escola:", style: 'h2' }, { text: turma.CodigoEscola + ' - ' + turma.NomeEscola }],
                            [{ text: "Turma:", style: 'h2' }, { text: turma.DescTurma }, { text: "Ano Letivo:", style: 'h2' }, { text: turma.AnoLetivo.toString() }],
                            [{ text: "Tipo de Ensino:", style: 'h2' }, { text: turma.DescTipoEnsino, colSpan: 3 }, {}, {}],
                        ]
                    },
                    layout: {
                        hLineColor: function () { return "#CCC" },
                        vLineColor: function () { return "#CCC" },
                        hLineWidth: function (i, node) { return (i === 0 || i == node.table.body.length) ? 2 : 0; },
                        vLineWidth: function (i, node) { return (i === 0 || i == node.table.widths.length) ? 2 : 0; }
                    }
                });
            var cabecalho = [];
            var w = [];
            cabecalho.push({ text: "RA", style: "h" }, { text: "Nº", style: "h" }, { text: "Aluno", style: "h" });
            w.push('auto', 'auto', '*');
            for (var i = 0; i < turma.Disciplinas.length; i++) {
                cabecalho.push({ text: turma.Disciplinas[i].NomeDisciplina, style: "h" });
                w.push('auto');
            }
            cabecalho.push({ text: "Situação Aluno", style: "h" });
            w.push('auto');
            cabecalho.push({ text: "Resultado Final", style: "h" });
            w.push('auto');

            var tabela = [cabecalho];
            var row = [];
            for (var i = 0; i < turma.Alunos.length; i++) {
                var aluno = turma.Alunos[i];
                row.push(aluno.NrRaAluno.toString(), aluno.NrAluno.toString(), aluno.NomeAluno);
                for (var j = 0; j < turma.Disciplinas.length; j++) {
                    for (var k = 0; k < aluno.Fechamento.length; k++) {
                        if (turma.Disciplinas[j].CodigoDisciplina == aluno.Fechamento[k].CodigoDisciplina) {
                            if (aluno.Fechamento[k].NotaMediaFinal == null)
                                row.push("S/N");
                            else
                                row.push(aluno.Fechamento[k].NotaMediaFinal);
                        }
                    }
                }
                row.push(aluno.SituacaoAluno);
                switch (aluno.FlResultado) {
                    case 1:
                        row.push("Aprovado");
                        break;
                    case 2:
                        row.push("AprovadoParcial");
                        break;
                    case 3:
                        row.push("RetidoFrequencia");
                        break;
                    case 4:
                        row.push("RetidoRendimento");
                        break;
                    case 5:
                        row.push("RetidoParcial");
                        break;
                    case 6:
                        row.push("AprovadoParcialDesativado");
                        break;
                    case 7:
                        row.push("TE");
                        break;
                    case 8:
                        row.push("CursoEmAndamento");
                        break;
                    default:
                        row.push("-");
                        break;
                }
                tabela.push(row);
                row = [];
            }
            content.push({
                style: 'tabelaSed',
                table: {
                    widths: w,
                    body: tabela
                },
                layout: {
                    hLineColor: function () { return "#CCC" },
                    vLineColor: function () { return "#CCC" }
                },
            });

            content.push({
                columns: [
                    {
                        table: {
                            widths: ['*', '*'],
                            body: [
                                [{
                                    canvas: [
                                        {
                                            type: 'line',
                                            x1: 40, y1: 60,
                                            x2: 560, y2: 60,
                                            lineWidth: 3
                                        }, ]
                                }, {
                                    canvas: [
                                        {
                                            type: 'line',
                                            x1: 40, y1: 60,
                                            x2: 560, y2: 60,
                                            lineWidth: 3
                                        }, ]
                                }],
                                ['Diretor da Escola', 'GOE / AOE'],
                            ],
                            alignment: 'center'
                        },
                        layout: 'noBorders',
                        alignment: 'center'
                    }
                ],
                pageBreak: (t + 1 != config.data.length ? 'after' : '')
            });


            content.push();
        }
        var doc = {
            content: content,
            styles: {
                h2: {
                    bold: true,
                    color: '#459AD7'
                },
                infoTurma: {
                    fillColor: '#E2EFFF',
                    fontSize: 8,
                },
                tabelaSed: {
                    color: '#222',
                    fontSize: 8,
                    alignment: 'center',
                },
                h: {
                    bold: true,
                    fontSize: 8,
                    fillColor: '#459ad6',
                    color: 'white',
                }
            }
        };

        return doc;
    };
    sedPdfExporter.exportPdf(config);
}
