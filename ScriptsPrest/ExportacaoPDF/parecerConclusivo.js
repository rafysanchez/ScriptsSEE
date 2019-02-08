
function GerarParecerConclusivo(idLancamento) {
    if (parseInt(idLancamento) > 0) {
        $.ajax({
            cache: false,
            dataType: 'Json',
            url: '../GerarParecerConclusivo',
            type: 'Post',
            data: { idLancamento: idLancamento },
            success: function (data) {
                gerarPdf(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });
    }
    else {
        mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
    }
}

function gerarPdf(dados) {
    var config = {
        pageOrientation: "portrait",
        pageSize: "A4",
        title: "Parecer Conclusivo",
    };

    config.Escola = dados.Lancamento.Escola.Nome;
    config.Exercicio = dados.Lancamento.AnoBase;
    config.Diretoria = dados.Lancamento.Diretoria.NmDiretoria;
    config.SaldoExercAnteriorCusteio = dados.Totalizador.Receita.SaldoExercAnteriorCusteio;
    config.SaldoExercAnteriorCapital = dados.Totalizador.Receita.SaldoExercAnteriorCapital;
    config.FndeCusteio = dados.Totalizador.Receita.FNDECusteio;
    config.FndeCapital = dados.Totalizador.Receita.FNDECapital;
    config.RecCusteio = dados.Totalizador.Receita.RecursosPropriosCusteio;
    config.RecCapital = dados.Totalizador.Receita.RecursosPropriosCapital;
    config.RendCusteio = dados.Totalizador.Receita.RendimentosCusteio;
    config.RendCapital = dados.Totalizador.Receita.RendimentosCapital;
    config.ReceitaTotalCusteio = dados.Totalizador.Receita.VlTotalCusteio;
    config.ReceitaTotalCapital = dados.Totalizador.Receita.VlTotalCapital;
    
    config.TotalSaldoEx = dados.Totalizador.Receita.ReceitaSaldoExercAnterior;
    config.TotalFnde = dados.Totalizador.Receita.ReceitaFNDE;
    config.TotalRec = dados.Totalizador.Receita.ReceitaRecursoProprios;
    config.TotalRend = dados.Totalizador.Receita.ReceitaRendimentos;

    config.TotalReceita = dados.Totalizador.Receita.VlTotalReceita;



    config.SaldoDevolvidoCusteio = dados.Totalizador.Despesa.VlDebitoDevolucaoCusteio;
    config.SaldoDevolvidoCapital = dados.Totalizador.Despesa.VlDebitoDevolucaoCapital;
    config.TotalSaldoDevolvido = dados.Totalizador.Despesa.TotalDebitosDevolucaoRecursos;

    //TODO: VER A LOGICA DE DEVOLUÇÃO PRA ESSES CASOS.
    config.DevolucaoRecFndeCusteio = "0";//dados.Totalizador.DevolucaoRecFndeCusteio;
    config.DevolucaoRecFndeCapital = "0"; //dados.Totalizador.DevolucaoRecFndeCapital;
    config.TotalDevolucaoFnde = "0"; //dados.Totalizador.TotalDevolucaoFnde;


    config.DespesaCusteio = dados.Totalizador.Despesa.TotalDebitosCusteio;
    config.DespesaCapital = dados.Totalizador.Despesa.TotalDebitosCapital;

    config.TotalDespesa = dados.Totalizador.Despesa.TotalDebitos;

    config.SaldoAReprogramarCusteio = dados.Totalizador.Despesa.VlDebitoSaldoReprogramadoCusteio;
    config.SaldoAReprogramarCapital = dados.Totalizador.Despesa.VlDebitoSaldoReprogramadoCapital;
    config.TotalSaldoAReprogramar = dados.Totalizador.Despesa.TotalDebitosSaldoReprogramado;

    sedPdfExporter.normalizeConfig(config);

    config.docGenerator = function (config) {
        var doc = {
            pageMargins: [30, 90, 30, 30],
            header: function (currentPage, pageCount) {
                return [
                    {
                        image: 'cabecalho',
                        width: 408,
                        height: 62,
                        margin: [20, 10, 20, 0],
                    },
                ];
            },
            images: {
                cabecalho: 'data:image/png;base64,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',
            },

            content: [

                            {
                                text: 'PDDE - EDUCAÇÃO BÁSICA \n',
                                fontSize: 13,
                                bold: false,
                            },
                           {
                               text: 'INTERESSADO:' + config.Escola + '\n',
                               fontSize: 13,
                               bold: false,
                           },
                            {
                                text: 'ASSUNTO: Prestação de contas referente ao exercício ' + config.Exercicio + ' \n\n\n',
                                fontSize: 13,

                            },

                          {
                              text: 'PARECER CONCLUSIVO\n\n',
                              fontSize: 13,
                              bold: true,
                          },

                          {
                              italics: false,
                              text: [
                              'A presente Prestação de Contas referente ao exercício de ' + config.Exercicio + ', dos recursos transferidos do Fundo Nacional de Desenvolvimento da Educação - FNDE no âmbito ',
                              'do Programa DINHEIRO DIRETO NA ESCOLA - PDDE à Associação de Pais e Mestre - APM da Escola Estadual ' + config.Escola + ',',
                              'destinados à cobertura de despesas de custeio e capital que concorram para a garantia de funcionamento e melhorias da infraestrutura física é pedagógica dos ',
                              'estabelecimentos de ensino beneficiários.\n',
                              'A Diretoria de Ensino Região ' + config.Diretoria + ', atesta que a prestação de conta foi executada com a Resolução /CD/FNDE nº 10, de 18 abril 2013\n\n'

                              ]
                          },
                            {
                                style: 'tabela',
                                table: {
                                    headerRows: 2,
                                    body: [
                                           		[
										            { text: 'Receita', style: 'tableHeader', colSpan: 5, alignment: 'center' },
										            {},
										            {},
                                                    {},
                                                    {}
                                           		],
                                            [
                                                { text: 'Saldo Reprogramado Exerc. Anterior', style: 'tableHeader' },
                                                { text: 'Valor Creditado FNDE no exercício', style: 'tableHeader' },
                                                { text: 'Recursos Próprios', style: 'tableHeader' },
                                                { text: 'Rendimento de Aplicação Financeira', style: 'tableHeader' },
                                                { text: 'Valor Total da Receita', style: 'tableHeader' }
                                            ],
                                            ['(C) =' + config.SaldoExercAnteriorCusteio, '(C) =' + config.FndeCusteio, '(C) =' + config.RecCusteio, '(C) =' + config.RendCusteio, '(C) =' + config.ReceitaTotalCusteio, ],
                                            ['(K) =' + config.SaldoExercAnteriorCapital, '(K) =' + config.FndeCapital, '(K) =' + config.RendCapital, '(K) =' + config.RendCusteio, '(K) =' + config.ReceitaTotalCapital, ],
                                            ['Total =' + config.TotalSaldoEx, 'Total =' + config.TotalFnde, 'Total =' + config.TotalRec, 'Total =' + config.TotalRend, 'Total =' + config.TotalReceita, ]

                                    ]
                                },

                            },

                            {
                                style: 'tabela',
                                table: {
                                    headerRows: 2,
                                    body: [
                                            [
										        { text: 'Despesa', style: 'tableHeader', colSpan: 4, alignment: 'center' },
										        {},
										        {},
                                                {}

                                            ],
                                            [
                                                { text: 'Saldo Devolvido', style: 'tableHeader' },
                                                { text: 'Devolução de Recursos FNDE', style: 'tableHeader' },
                                                { text: 'Valor da Despesa Realizada', style: 'tableHeader' },
                                                { text: 'Saldo a programar para o Exercício Seguinte', style: 'tableHeader' },

                                            ],
                                            ['(C) =' + config.SaldoDevolvidoCusteio, '(C) =' + config.DevolucaoRecFndeCusteio, '(C) =' + config.DespesaCusteio, '(C) =' + config.SaldoAReprogramarCusteio, ],
                                            ['(K) =' + config.SaldoDevolvidoCapital, '(K) =' + config.DevolucaoRecFndeCapital, '(K) =' + config.DespesaCapital, '(K) =' + config.SaldoAReprogramarCapital, ],
                                            ['Total =' + config.TotalSaldoDevolvido, 'Total =' + config.TotalDevolucaoFnde, 'Total =' + config.TotalDespesa, 'Total =' + config.TotalSaldoAReprogramar, ]

                                    ]
                                },

                            },

                             {
                                 italics: false,
                                 text: [
                                     '\n\n',
                                     'Local e Data\n',
                                     'São Paulo, ____________________________________\n',
                                     'Dirigente Regional de Ensino',
                                 ]

                             },

            ],

            styles: {

                header: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 11,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tabela: {
                    margin: [0, 5, 0, 1]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 12,
                    color: 'black'
                }
            },
        }
        return doc;
    };
    sedPdfExporter.exportPdf(config);

}


