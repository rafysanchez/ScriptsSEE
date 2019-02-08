var SarespQuestoesRelPdf = {
    gerar: function (data) {

        var config = {
            pageOrientation: "portrait",
            pageSize: "A4",
            pageMargins: [10, 10, 10, 10],
            filename: "QuestionarioAlunosResponsaveis.pdf",
            title: "Relatório Questionários Alunos/Responsáveis"

        };

        sedPdfExporter.normalizeConfig(config);
        //config.discOrdenadas = data.Disciplinas.sort(function (a, b) { return a.NomeDisciplina.localeCompare(b.NomeDisciplina); });
        config.data = data;
        //config.debug = true;
        config.docGenerator = function (config) {
            var content = [];
            var ficha = [];
            //debugger
            var resultado = config.data;

            content.push(
                {
                    text: 'Relatório Questionários Alunos/Responsáveis',
                    fontSize: 18,
                    alignment: 'center',
                    color: '#459ad6'
                },
                {
                    style: 'infoTurma',
                    color: '#222',
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            [{ text: "Diretoria:", style: 'h2' }, { text: resultado[0].CodigoDiretoria+' - '+resultado[0].NomeDiretoria }],
                            [{ text: "Ano Letivo:", style: 'h2' }, { text: resultado[0].AnoLetivo.toString()}],
                        ]
                    },
                    layout: {
                        hLineColor: function () { return "#CCC" },
                        vLineColor: function () { return "#CCC" },
                        hLineWidth: function (i, node) { return (i === 0 || i == node.table.body.length) ? 2 : 0; },
                        vLineWidth: function (i, node) { return (i === 0 || i == node.table.widths.length) ? 2 : 0; }
                    }
                });
            

            var lstLinha = [];

            var tabela = [
                    [
                        { text: "Ano Letivo", style: "h" },
                        { text: "Código Diretoria", style: "h" },
                        { text: "Diretoria", style: "h" },
                        { text: "Escola", style: "h" },
                        { text: "Respondentes", style: "h" },
                        { text: "% de Respondentes", style: "h" },
                        { text: "Tipo Questionario", style: "h" }
                    ]
            ];
                        
            for (var a = 0; a < resultado.length; a++) {
                var perc = parseFloat(((resultado[a].Quantidade * 100) / resultado[a].QtdAlunosEscola).toFixed(2)).toString()+"%";
                var linha = [
                        
                            { text: resultado[a].AnoLetivo.toString(), style: "hc" },
                            { text: resultado[a].CodigoDiretoria.toString(), style: "hc" },
                            { text: resultado[a].NomeDiretoria, style: "he" },
                            { text: resultado[a].NomeEscola, style: "he" },
                            { text: resultado[a].Quantidade.toString(), style: "hc" },
                            { text: perc, style: "hc" },
                            { text: resultado[a].TipoQuestao, style: "he" }
                        
                ];
                tabela.push(linha);
            }

            //tabela.push.apply(tabela, lstLinha);



            content.push(
                {
                    style: 'tabelaSed',
                    table: {
                        widths: 'auto',
                        body: tabela,
                    },
                    layout: {
                        hLineColor: function () { return "#CCC" },
                        vLineColor: function () { return "#CCC" }
                    }
                });

            var doc = {
                content: content,

                styles: {
                    h2: { bold: true, color: '#459AD7' },
                    infoAluno: { fillColor: '#E2EFFF', fontSize: 8 },
                    infoTurma: {
                        fillColor: '#E2EFFF',
                        fontSize: 8,
                    },
                    fichaSed: {
                        margin: [0, 5, 0, 15],
                        fontSize: 5,
                        alignment: 'center',
                    },
                    tabelaSed: { margin: [0, 5, 0, 15], color: '#222', fontSize: 10, alignment: 'center' },
                    h: { bold: true, fontSize: 8, fillColor: '#459ad6', color: 'white' },
                    he: { bold: true, fontSize: 8, alignment: 'left' },
                    hc: { bold: true, fontSize: 8, alignment: 'center' }
                }
            };

            return doc;

        };
        config.docGenerator(config);
        sedPdfExporter.exportPdf(config);

    }
}