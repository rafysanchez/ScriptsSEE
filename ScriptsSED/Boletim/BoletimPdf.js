var boletimPdf = {
    gerar: function (data) {
        
        var config = {
            pageOrientation: "portrait",
            pageSize: "A4",
            pageMargins: [10, 10, 10, 10],
            title: "Boletim Escolar Aluno"
        };

        sedPdfExporter.normalizeConfig(config);
        config.discOrdenadas = data.Disciplinas.sort(function (a, b) { return a.NomeDisciplina.localeCompare(b.NomeDisciplina); });
        config.data = data;
        //config.debug = true;
        config.docGenerator = function (config) {

            var content = [];
            var boletim = config.data;
            var contaAluno = 0;

            var discOrdenadas = config.discOrdenadas;

            content.push(
                {
                    text: 'Boletim Escolar',
                    fontSize: 18,
                    alignment: 'center',
                    color: '#459ad6'
                });

            for (var a = 0; a < boletim.Alunos.length; a++) {
                var aluno = boletim.Alunos[a];

                if (contaAluno >= 3)
                    contaAluno = 0;
                contaAluno = contaAluno + 1;

                content.push(
                {
                    style: 'infoAluno',
                    color: '#222',
                    table: {
                        widths: ['auto', '*', 'auto', '*'],
                        body: [
                            [{ text: "Município / Diretoria:", style: 'h2' }, { text: boletim.NomeDiretoria }, { text: "Nome do Aluno:", style: 'h2' }, { text: aluno.NomeAluno }],
                            [{ text: "Escola:", style: 'h2' }, { text: boletim.CodigoEscola + ' - ' + boletim.NomeEscola }, { text: "RA:", style: 'h2' }, { text: aluno.Ra }],
                            [{ text: "Turma:", style: 'h2' }, { text: boletim.NomeTurma }, { text: "Ano Letivo:", style: 'h2' }, { text: boletim.AnoLetivo.toString() }],
                            [{ text: "Tipo de Ensino:", style: 'h2' }, { text: boletim.NomeTipoEnsino }, { text: "", style: 'h2' }, { text: "", style: 'h2' }],
                        ]
                    },
                    layout: {
                        hLineColor: function () { return "#CCC" },
                        vLineColor: function () { return "#CCC" },
                        hLineWidth: function (i, node) { return (i === 0 || i == node.table.body.length) ? 2 : 0; },
                        vLineWidth: function (i, node) { return (i === 0 || i == node.table.widths.length) ? 2 : 0; }
                    }
                });

                var cabecalho1 = [];
                cabecalho1.push({ text: "Disciplina", style: "h", rowSpan: 2 });
                for (var i = 0; i < boletim.TiposFechamento.length; i++) {
                    cabecalho1.push({ text: (boletim.TiposFechamento[i] - 4) + "º Bimestre", style: "h", colSpan: 4 }, {}, {}, {});
                }

                cabecalho1.push({ text: 'Aval/Sit', style: "h", colSpan: 3 }, {}, {});


                var cabecalho2 = [{}];
                for (var i = 0; i < boletim.TiposFechamento.length; i++) {
                    cabecalho2.push({ text: 'N', style: "h" }, { text: 'F', style: "h" }, { text: 'AC', style: "h" }, { text: '%Freq', style: "h" });
                }

                cabecalho2.push({ text: 'N', style: "h" }, { text: 'F', style: "h" }, { text: 'AC', style: "h" });

                var tabela = [cabecalho1, cabecalho2];

                for (var i = 0; i < discOrdenadas.length; i++) {
                    var row = [];
                    var disciplina = discOrdenadas[i];
                    row.push({ text: disciplina.NomeDisciplina, alignment: 'left' });
                    // para cada tipo de fechamento
                    for (var k = 0; k < boletim.TiposFechamento.length; k++) {
                        
                        // buscar os fechamentos relacionados ao seu tipo e disciplina
                        var fechamento = null;
                        for (var j = 0; j < aluno.Fechamentos.length; j++) {
                            if (aluno.Fechamentos[j].CodigoDisciplina != disciplina.CodigoDisciplina) continue;
                            if (aluno.Fechamentos[j].CodigoTipoFechamento != boletim.TiposFechamento[k]) continue;
                            fechamento = aluno.Fechamentos[j];
                            break;
                        }


                        if (fechamento != null) {

                            var nota = (fechamento.AbreviacaoDispensaLicensa == null ? (fechamento.Nota < 0 ? "-" : fechamento.Nota.toString()) : fechamento.AbreviacaoDispensaLicensa);
                            var faltas = (fechamento.AbreviacaoDispensaLicensa == null ? (fechamento.NumeroFaltas < 0 ? "-" : fechamento.NumeroFaltas.toString()) : fechamento.AbreviacaoDispensaLicensa);
                            var ac = (fechamento.AbreviacaoDispensaLicensa == null ? (fechamento.NumeroFaltasCompensadas < 0 ? "-" : fechamento.NumeroFaltasCompensadas.toString()) : fechamento.AbreviacaoDispensaLicensa);
                            var freq = (fechamento.AbreviacaoDispensaLicensa == null ? fechamento.NumeroAulasRealizadas == 0 ? "-" : fechamento.PercentualFrequencia.toString() + "%" : fechamento.AbreviacaoDispensaLicensa);
                            row.push(
                                nota == null ? {} : nota,
                                faltas == null ? {} : faltas,
                                ac == null ? {} : ac,
                                freq == null ? {} : freq
                            )

                        }
                        else {
                            row.push("-", "-", "-", "-");
                        }
                    }

                    var final = null;
                    for (var j = 0; j < aluno.Fechamentos.length; j++) {

                        if (aluno.Fechamentos[j].CodigoDisciplina != disciplina.CodigoDisciplina) continue;
                        if (aluno.Fechamentos[j].CodigoTipoFechamento != 10) continue;

                        final = aluno.Fechamentos[j];

                        break;
                    }

                    if (final != null) {

                        var notaf = (final.Nota == null ? "-" : final.Nota.toString());
                        //var faltasf = (final.NumeroFaltas == null ? " - " : final.NumeroFaltas.toString());
                        var faltasf = (final.NumeroTotalFaltas == null ? " - " : final.NumeroTotalFaltas.toString());
                        var faltascompf = (final.NumeroFaltasCompensadas == null ? " - " : final.NumeroFaltasCompensadas.toString());

                        row.push(notaf,
                                faltasf,
                                faltascompf);

                    }
                    else {
                        row.push("-", "-", "-");
                    }

                    totalFaltas = null;

                    tabela.push(row);


                }

                content.push({
                    style: 'tabelaSed',
                    table: {
                        headerRows: 2,
                        body: tabela
                    },
                    layout: {
                        hLineColor: function () { return "#CCC" },
                        vLineColor: function () { return "#CCC" }
                    }
                });

                content.push({
                    columns: [
                        {
                            width: 135,
                            style: 'tabelaSed',
                            table: {
                                body: [
                                    [
                                        { text: "Siglas", style: "h" },

                                    ],
                                    [{ text: 'N - Notas', alignment: 'left' }],
                                    [{ text: 'F - Faltas', alignment: 'left' }],
                                    [{ text: 'AC - Ausências Compensadas', alignment: 'left' }]
                                ]
                            },
                            layout: {
                                hLineColor: function () { return "#CCC" },
                                vLineColor: function () { return "#CCC" }
                            }
                        },
                        {
                            style: 'tabelaSed',
                            table: {
                                widths: [180],
                                body: [
                                    [
                                        { text: "Resultado Final", style: "h" },

                                    ],
                                    [aluno.ResultadoFinal == null ? "" : aluno.ResultadoFinal]
                                ]
                            },
                            layout: {
                                hLineColor: function () { return "#CCC" },
                                vLineColor: function () { return "#CCC" }
                            },
                            pageBreak: ((contaAluno >= 3 && boletim.Disciplinas.length <= 5) || (a % 2 == 1 && a < boletim.Alunos.length - 1 && boletim.Disciplinas.length > 5) || boletim.Disciplinas.length > 12 ? 'after' : '')
                        }
                    ]
                });
            }

            var doc = {
                content: content,
                styles: {
                    h2: { bold: true, color: '#459AD7' },
                    infoAluno: { fillColor: '#E2EFFF', fontSize: 8 },
                    tabelaSed: { margin: [0, 5, 0, 15], color: '#222', fontSize: 9, alignment: 'center' },
                    h: { bold: true, fontSize: 9, fillColor: '#459ad6', color: 'white' }
                }
            };

            return doc;
        };
        sedPdfExporter.exportPdf(config);
    }
}