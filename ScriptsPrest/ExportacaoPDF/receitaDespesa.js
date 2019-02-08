function gerarReceitaDespesa(_result) {
    var config = {
        pageOrientation: "landscape",
        pageSize: "A4",
        title: "Receita e Despesa",
    };

    sedPdfExporter.normalizeConfig(config);

    config.CIE = _result.Escola.Codigo != undefined ? _result.Escola.Codigo : "";
    config.logradouro = _result.Escola.Logradouro != undefined ? _result.Escola.Logradouro : "";

    config.programa = _result.Programa.Nome != undefined ? "PROGRAMA DINHEIRO DIRETO NA ESCOLA - " + _result.Programa.Nome : "";
    config.exercicio = _result.AnoExercicio != undefined ? _result.AnoExercicio : "";
    config.razaosocial = _result.Apm.Nome != undefined ? _result.Apm.Nome : "";
    config.cnpj = _result.Apm.NrCnpj != undefined ? formatarCnpj(_result.Apm.NrCnpj.toString()) : "";
    config.municipio = _result.Municipio.NmMunicipio != undefined ? _result.Municipio.NmMunicipio : "";
    config.uf = _result.Municipio.UF != undefined ? _result.Municipio.UF : "";

    config.saldoExercicioAnteriorCusteio = _result.PlanilhaGastos.SaldoExercicioAnteriorCusteioS;
    config.saldoExercicioAnteriorCapital = _result.PlanilhaGastos.SaldoExercicioAnteriorCapitalS;
    config.somaSaldoExercicioAnteriorCusteioCapital = _result.PlanilhaGastos.SomaSaldoExercicioAnteriorCusteioCapitalS;

    config.saldoFNDECusteio = _result.PlanilhaGastos.SaldoFNDECusteioS;
    config.saldoFNDECapital = _result.PlanilhaGastos.SaldoFNDECapitalS;
    config.somaSaldoFNDECusteioCapital = _result.PlanilhaGastos.SomaSaldoFNDECusteioCapitalS;

    config.saldoRecProprioCusteio = _result.PlanilhaGastos.SaldoRecProprioCusteioS;
    config.saldoRecProprioCapital = _result.PlanilhaGastos.SaldoRecProprioCapitalS;
    config.somaSaldoRecProprioCusteioCapital = _result.PlanilhaGastos.SomaSaldoRecProprioCusteioCapitalS;

    config.saldoRendimentosCusteio = _result.PlanilhaGastos.SaldoRendimentosCusteioS;
    config.saldoRendimentosCapital = _result.PlanilhaGastos.SaldoRendimentosCapitalS;
    config.somaSaldoRendimentosCusteioCapital = _result.PlanilhaGastos.SomaSaldoRendimentosCusteioCapitalS;

    config.totalReceitaCusteio = _result.PlanilhaGastos.TotalReceitaCusteioS;
    config.totalReceitaCapital = _result.PlanilhaGastos.TotalReceitaCapitalS;
    config.somaTotalReceitaCusteioCapital = _result.PlanilhaGastos.SomaTotalReceitaCusteioCapitalS;

    config.saldoDevolvidoCusteio = _result.PlanilhaGastos.SaldoDevolvidoCusteioS;
    config.saldoDevolvidoCapital = _result.PlanilhaGastos.SaldoDevolvidoCapitalS;
    config.somaSaldoDevolvidoCusteioCapital = _result.PlanilhaGastos.SomaSaldoDevolvidoCusteioCapitalS;

    config.devolucaoRecursosCusteio = _result.PlanilhaGastos.DevolucaoRecursosCusteioS;
    config.devolucacaoRecursosCapital = _result.PlanilhaGastos.DevolucacaoRecursosCapitalS;
    config.somaDevolucacaoRecursosCusteioCapital = _result.PlanilhaGastos.SomaDevolucacaoRecursosCusteioCapitalS;

    config.despesaCusteio = _result.PlanilhaGastos.DespesaCusteioS;
    config.despesaCapital = _result.PlanilhaGastos.DespesaCapitalS;
    config.somaDespesaCusteioCapital = _result.PlanilhaGastos.SomaDespesaCusteioCapitalS;

    //config.saldoAReprogramarCusteio = _result.PlanilhaGastos.DespesaSaldoExercAnteriorCusteio != undefined ? formatReal(_result.PlanilhaGastos.DespesaSaldoExercAnteriorCusteio) : "";
    config.saldoAReprogramarCusteio = _result.PlanilhaGastos.SaldoAReprogramarCusteioS;
    config.saldoAReprogramarCapital = _result.PlanilhaGastos.SaldoAReprogramarCapitalS;
    config.somaSaldoAReprogramarCusteioCapital = _result.PlanilhaGastos.SomaSaldoAReprogramarCusteioCapitalString;

    config.valorTotalNotasImpostos = _result.PlanilhaGastos.valorTotalNotasImpostosS;

    config.status = _result.PlanilhaGastos.Status != undefined ? "\n" + _result.PlanilhaGastos.Status : "";

    var body = [];
    var index = 0;
    var numeroItens = "";

    //Insere as notas fiscais e seus itens
    for (var key in _result.NotaFiscal)
    {
        if (_result.NotaFiscal.hasOwnProperty(key))
        {
            var data = _result.NotaFiscal[key];

            //for (var i in data.Itens) {
            //    var dados = data.Itens[i];
            var row = new Array();

            index += 1;
            row.push((index).toString());
            row.push(data.Fornecedor != undefined ? data.Fornecedor.toString() : "");
            row.push(data.CNPJ != undefined ? formatarCnpj(data.CNPJ.toString()) : "");
            row.push(data.DsGrupoDespesa != undefined ? data.DsGrupoDespesa.toString() : "");
            row.push(data.tipoNotaValor != undefined ? data.tipoNotaValor.toString() : "");
            row.push(data.DsSigla != undefined ? data.DsSigla.toString() : "");
            row.push(data.NrNotaFiscal != undefined && data.NrNotaFiscal != '' ? data.NrNotaFiscal.toString() : "");
            row.push(data.DtEmissaoString != undefined && data.DtEmissaoString != '' ? data.DtEmissaoString : "");
            row.push(data.VlTotalNfS);
            row.push(data.NrCheque != undefined ? data.NrCheque.toString() : "");
            row.push(data.DtEmissaoString != undefined && data.DtEmissaoString != '' ? data.DtEmissaoString : "");
            body.push(row);

            numeroItens += index + ',';
            //}
        }
    }

    //Insere as notas de RPA
    for (var key in _result.Rpa) {
        if (_result.Rpa.hasOwnProperty(key)) {
            var data = _result.Rpa[key];
            var row = new Array();

            index += 1;
            row.push((index).toString());
            row.push(data.Fornecedor.DsRazaoSocial != undefined ? data.Fornecedor.DsRazaoSocial.toString() : "");
            row.push(data.Fornecedor.NrCnpj != undefined ? formatarCpf(data.Fornecedor.NrCnpj.toString()) : "");
            row.push("SERVIÇOS CONTRATADOS");
            row.push("C");
            row.push("RPA");
            row.push(" ");
            row.push(data.DtRpa != undefined ? formatarDataJson2(data.DtRpa) : "");
            row.push(data.VlPagoS);
            row.push(data.VlPagoNrCheque != undefined ? data.VlPagoNrCheque.toString() : "");
            row.push(data.DtRpa != undefined ? formatarDataJson2(data.DtRpa) : "");
            body.push(row);

            numeroItens += index + ',';
        }
    }

    //Insere as notas de Recibo
    for (var key in _result.ReciboMonitoria) {
        if (_result.ReciboMonitoria.hasOwnProperty(key)) {
            var data = _result.ReciboMonitoria[key];
            var row = new Array();

            index += 1;
            row.push((index).toString());
            row.push(data.NmMonitor != undefined ? data.NmMonitor.toString() : "");
            row.push(data.NrCpfMonitor != undefined ? formatarCpf(data.NrCpfMonitor.toString()) : "");
            row.push("SERVIÇOS CONTRATADOS");
            row.push("C");
            row.push("RECIBO");
            row.push(" ");
            row.push(data.DtReciboMonitoria != undefined ? formatarDataJson2(data.DtReciboMonitoria) : "");
            row.push(data.VlTotalS);
            row.push(data.NrCheque != undefined ? data.NrCheque.toString() : "");
            row.push(data.DtReciboMonitoria != undefined ? formatarDataJson2(data.DtReciboMonitoria) : "");
            body.push(row);

            numeroItens += index + ',';
        }
    }

    //Insere as notas de Recibo Cartório
    for (var key in _result.ReciboCartorio) {
        if (_result.ReciboCartorio.hasOwnProperty(key)) {
            var data = _result.ReciboCartorio[key];
            var row = new Array();

            index += 1;
            row.push((index).toString());
            row.push(data.Fornecedor != undefined ? data.Fornecedor.toString() : "");
            row.push(data.Cnpj != undefined ? formatarCnpj(data.Cnpj.toString()) : "");
            row.push("SERVIÇOS CONTRATADOS");
            row.push("C");
            row.push("RECIBO CARTÓRIO");
            row.push(" ");
            row.push(data.Data != undefined ? formatarDataJson2(data.Data) : "");
            row.push(data.VlTotalS);
            row.push(data.NrCheque != undefined ? data.NrCheque.toString() : "");
            row.push(data.Data != undefined ? formatarDataJson2(data.Data) : "");
            body.push(row);

            numeroItens += index + ',';
        }
    }


    config.numeroItens = numeroItens.substring(0, (numeroItens.length - 1));

    //Insere uma linha para não ocorrer erro no pdf
    if (numeroItens == 0) {
        var row = new Array();

        row.push("");
        row.push("");
        row.push("");
        row.push("");
        row.push("");
        row.push("");
        row.push("");
        row.push("");
        row.push("");
        body.push(row);
    }

    config.body = body;
    //config.debug = true;

    config.docGenerator = function (config) {

        //config.pageMargins = [40, 310, 40, 40];
        config.pageMargins = [20, 310, 20, 70];

        var doc = {
            header: [
                {
                    margin: [20, 10, 20, 0],
                    table: {
                        widths: ["50%", "50%"],
                        body: [
                            [
                                {
                                    stack: [
                                        {
                                            image: 'data:image/png;base64,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',
                                            width: 350,
                                            height: 50,
                                        },
                                        {
                                            text: ""
                                        }
                                    ]
                                },
                                {
                                    stack: [
                                        {
                                            text: "Prestação de Contas", bold: true, fontSize: 18, margin: [0, 0, 0, 5]

                                        },
                                        {
                                            text: "Demonstrativo da Execução da Receita e da Despesa e Relação de Pagamentos Efetuados ", fontSize: 9

                                        }
                                    ],
                                    alignment: "right",
                                }
                            ],
                        ]
                    },
                    layout: "noBorders"
                },
                {
                    margin: [20, 0, 20, 0],
                    table: {
                        widths: ["30%", "30%", "40%"],
                        body: [
                                [
                                    {
                                        text: "DIRETORIA FINANCEIRA",
                                        colSpan: 3, fontSize: "9", bold: true

                                    },
                                    { text: "" },
                                    { text: "" }
                                ],
                                [
                                    {
                                        text: "COORDENAÇÃO GERAL DE CONTABILIDADE E ACOMPANHAMENTO DE PRESTAÇÃO DE CONTAS                                                                                                                                                Código CIE: " + config.CIE,
                                        colSpan: 3, fontSize: "9", bold: true, margin: [0, -5, 0, 0]

                                    },
                                    { text: "" },
                                    { text: "" }
                                ]
                        ]
                    },
                    layout: "noBorders"
                },
                 {
                     margin: [20, 0, 20, 0],
                     table: {
                         widths: ["70%", "20%", "10%"],
                         body: [
                                 [
                                     {
                                         text: "BLOCO 1 - IDENTIFICAÇÃO",
                                         colSpan: 3, fontSize: "8", bold: true, fillColor: '#d9d9d9'

                                     },
                                     { text: "" },
                                     { text: "" }
                                 ],
                                 [
                                     {
                                         stack: [
                                             { text: "01-Programa/Ação : ", fontSize: "6", margin: [0, 0, 0, 5] },
                                             {
                                                 text: [{ text: config.programa, bold: "true", alignment: "left", fontSize: "9" }]
                                             }
                                         ], colSpan: 2
                                     },
                                     { text: "" },
                                     {
                                         stack: [
                                                 { text: "02-Exercício: ", fontSize: "6", margin: [0, 0, 0, 5] },
                                                 {
                                                     text: [{ text: config.exercicio, bold: "true", alignment: "left", fontSize: "9" }]
                                                 }
                                         ]
                                     }
                                 ],
                                 [
                                     {
                                         stack: [
                                                 { text: "03-Nome da Razão Social", fontSize: "6", margin: [0, 0, 0, 5] },
                                                 {
                                                     text: [{ text: config.razaosocial, bold: "true", alignment: "left", fontSize: "9" }]
                                                 }
                                         ]
                                     },
                                     {
                                         stack: [
                                                 { text: "04-Número do CNPJ", fontSize: "6", margin: [0, 0, 0, 5] },
                                                 {
                                                     text: [{ text: config.cnpj, bold: "true", alignment: "left", fontSize: "9" }]
                                                 }
                                         ], colSpan: 2
                                     },
                                     { text: "" }
                                 ],
                                 [
                                     {
                                         stack: [
                                                 { text: "05-Endereço", fontSize: "6", margin: [0, 0, 0, 5] },
                                                 {
                                                     text: [{ text: config.logradouro, bold: "true", alignment: "left", fontSize: "9" }]
                                                 }
                                         ]
                                     },
                                     {
                                         stack: [
                                                 { text: "06-Munícipio", fontSize: "6", margin: [0, 0, 0, 5] },
                                                 {
                                                     text: [{ text: config.municipio, bold: "true", alignment: "left", fontSize: "9" }]
                                                 }
                                         ]
                                     },
                                     {
                                         stack: [
                                                 { text: "07-UF", fontSize: "6", margin: [0, 0, 0, 5] },
                                                 {
                                                     text: [{ text: config.uf, bold: "true", alignment: "left", fontSize: "9" }]
                                                 }
                                         ]
                                     }
                                 ]
                         ]
                     }

                 },
                  {
                      margin: [20, 2, 20, 0],
                      table: {
                          widths: ["10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%"],
                          body: [
                                  [
                                      {
                                          text: "BLOCO 2 - SÍNTESE DA EXECUÇÃO DA RECEITA E DA DESPESA (R$)",
                                          colSpan: 10, fontSize: "8", bold: true, fillColor: '#d9d9d9'
                                      },
                                      { text: "" },
                                      { text: "" },
                                      { text: "" },
                                      { text: "" },
                                      { text: "" },
                                      { text: "" },
                                      { text: "" },
                                      { text: "" },
                                      { text: "" }
                                  ],
                                  [
                                      { text: "08-Saldo Reprogramado do Exercicio Anterior", fontSize: "6", colSpan: 2 },
                                      { text: "" },
                                      { text: "09-Valor Creditado pelo FNDE no Exercicio", fontSize: "6", colSpan: 2 },
                                      { text: "" },
                                      { text: "10-recursos Próprios", fontSize: "6", colSpan: 2 },
                                      { text: "" },
                                      { text: "11-Rendimento de Aplicação Financeira", fontSize: "6", colSpan: 2 },
                                      { text: "" },
                                      { text: "12-Valor Total da Receita", fontSize: "6", colSpan: 2 },
                                      { text: "" }
                                  ],
                                  [
                                      { text: '(C) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoExercicioAnteriorCusteio, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(C) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoFNDECusteio, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(C) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoRecProprioCusteio, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(C) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoRendimentosCusteio, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(C) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.totalReceitaCusteio, fontSize: "7", alignment: 'right', border: [false, true, true, true] }
                                  ],
                                  [
                                      { text: '(K) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoExercicioAnteriorCapital, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(K) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoFNDECapital, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(K) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoRecProprioCapital, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(K) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoRendimentosCapital, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(K) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.totalReceitaCapital, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                  ],
                                  [
                                      { text: 'Total = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.somaSaldoExercicioAnteriorCusteioCapital, fontSize: "7", bold: true, alignment: 'right', border: [false, true, true, true] },
                                      { text: 'Total = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.somaSaldoFNDECusteioCapital, fontSize: "7", bold: true, alignment: 'right', border: [false, true, true, true] },
                                      { text: 'Total = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.somaSaldoRecProprioCusteioCapital, fontSize: "7", bold: true, alignment: 'right', border: [false, true, true, true] },
                                      { text: 'Total = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.somaSaldoRendimentosCusteioCapital, fontSize: "7", bold: true, alignment: 'right', border: [false, true, true, true] },
                                      { text: 'Total = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.somaTotalReceitaCusteioCapital, fontSize: "7", bold: true, alignment: 'right', border: [false, true, true, true] },
                                  ],
                                    [
                                      { text: "13-Saldo Devolvido", fontSize: "6", colSpan: 2 },
                                      { text: "" },
                                      { text: "14-Devolução de Recursos ao FNDE", fontSize: "6", colSpan: 2 },
                                      { text: "" },
                                      { text: "15-Valor da Despesa Realizada", fontSize: "6", colSpan: 2 },
                                      { text: "" },
                                      { text: "16-Saldo a Reprogramar para o Exercicio Seguinte", fontSize: "6", colSpan: 2 },
                                      { text: "" },
                                      { text: "17-Status", fontSize: "6", colSpan: 2 },
                                      { text: "" }
                                    ],
                                     [
                                      { text: '(C) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoDevolvidoCusteio, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(C) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.devolucaoRecursosCusteio, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(C) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.despesaCusteio, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(C) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoAReprogramarCusteio, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { rowSpan: 3, colSpan: 2, fontSize: "9", text: config.status, alignment: 'center' },
                                      { text: "" },
                                     ],
                                     [
                                      { text: '(K) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoDevolvidoCapital, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(K) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.devolucacaoRecursosCapital, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(K) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.despesaCapital, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: '(K) = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.saldoAReprogramarCapital, fontSize: "7", alignment: 'right', border: [false, true, true, true] },
                                      { text: "" },
                                      { text: "" }
                                     ],
                                     [
                                      { text: 'Total = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.somaSaldoDevolvidoCusteioCapital, fontSize: "7", bold: true, alignment: 'right', border: [false, true, true, true] },
                                      { text: 'Total = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.somaDevolucacaoRecursosCusteioCapital, fontSize: "7", bold: true, alignment: 'right', border: [false, true, true, true] },
                                      { text: 'Total = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.somaDespesaCusteioCapital, fontSize: "7", bold: true, alignment: 'right', border: [false, true, true, true] },
                                      { text: 'Total = ', fontSize: "7", alignment: 'left', border: [true, true, false, true] },
                                      { text: config.somaSaldoAReprogramarCusteioCapital, fontSize: "7", bold: true, alignment: 'right', border: [false, true, true, true] },
                                      { text: "" },
                                      { text: "" }
                                     ]
                          ]
                      }
                  }
            ],

            content: [
                {
                    style: "tableExample",
                    table: {
                        widths: ["100%"],
                        body: [
                                [
                                    {
                                        text: "BLOCO 3 - PAGAMENTOS EFETUADOS",
                                        fontSize: "8",
                                        bold: true,
                                        fillColor: '#d9d9d9'
                                    }
                                ],
                                [
                                    {
                                        table: {
                                            widths: ["5%", "15%", "15%", "25%", "5%", "5%", "4%", "7%", "7%", "5%", "7%"],
                                            body: [
                                                        [
                                                            {
                                                                text: "18-Item",
                                                                rowSpan: "2",
                                                                alignment: "center",
                                                                fontSize: "6"
                                                            },
                                                            {
                                                                text: "19-Nome do Favorecido",
                                                                rowSpan: "2",
                                                                alignment: "center",
                                                                fontSize: "6"
                                                            },
                                                            {
                                                                text: "20-CPF ou CNPJ",
                                                                rowSpan: "2",
                                                                alignment: "center",
                                                                fontSize: "6"
                                                            },
                                                            {
                                                                text: "21-Tipos de Materiais Adquiridos ou Serviços Contratados",
                                                                rowSpan: "2",
                                                                alignment: "center",
                                                                fontSize: "6"
                                                            },
                                                            {
                                                                text: "22-Nat. Desp.",
                                                                rowSpan: "2",
                                                                alignment: "center",
                                                                fontSize: "6"
                                                            },
                                                            {
                                                                text: "23-Documento Despesa",
                                                                colSpan: "4",
                                                                alignment: "center",
                                                                fontSize: "6"
                                                            }, { text: "" }, { text: "" }, { text: "" },
                                                            {
                                                                text: "24-Pagamento",
                                                                colSpan: "2",
                                                                alignment: "center",
                                                                fontSize: "6"
                                                            }, { text: "" }
                                                        ],
                                                        [
                                                            { text: "" },
                                                            { text: "" },
                                                            { text: "" },
                                                            { text: "" },
                                                            { text: "" },
                                                            { text: "Tipo", alignment: "center", fontSize: "6" },
                                                            { text: "Número", alignment: "center", fontSize: "6" },
                                                            { text: "Data", alignment: "center", fontSize: "6" },
                                                            { text: "Valor", alignment: "center", fontSize: "6" },
                                                            { text: "Nº Ch", alignment: "center", fontSize: "6" },
                                                            { text: "Data", alignment: "center", fontSize: "6" }
                                                        ],
                                                        [
                                                            {
                                                                layout: 'lightHorizontalLines',
                                                                colSpan: 11,
                                                                fontSize: 7,
                                                                table: {
                                                                    widths: ["5%", "15%", "15%", "25%", "5%", "5%", "4%", "7%", "7%", "5%", "7%"],
                                                                    alignment: "center",
                                                                    body: config.body
                                                                },
                                                                alignment: "center",
                                                            }
                                                        ]
                                                        ,[
                                                            {
                                                                layout: 'lightHorizontalLines',
                                                                colSpan: 11,
                                                                fontSize: 7,
                                                                table: {
                                                                    widths: ["67%", "33%"],
                                                                    alignment: "center",
                                                                    body: [
                                                                        [
                                                                            {
                                                                                text: "TOTAL",
                                                                                alignment: "left",
                                                                                fontSize: "6"
                                                                            },
                                                                            {
                                                                                text: config.valorTotalNotasImpostos,
                                                                                alignment: "center",
                                                                                fontSize: "6"
                                                                            }
                                                                        ]
                                                                     
                                                                    ]
                                                                },
                                                                alignment: "center",
                                                            }
                                                        ]
                                            ]
                                        }
                                    }
                                   
                                ],

                                
                                
                        ]
                    }
                }
		        
		       
                
            ],

            footer: {
                margin: [20, 5, 20, 0],
                table: {
                    widths: ["30%", "30%", "40%"],
                    body: [
                            [
                                {
                                    text: "BLOCO 4 - AUTENTICAÇÃO",
                                    colSpan: 3, fontSize: "8", bold: true, fillColor: '#d9d9d9'

                                },
                                { text: "" },
                                { text: "" }
                            ],
                            [
                                { text: "\n_________________________________________\nLocal e Data", alignment: "center", fontSize: "10" },
                                { text: "\n_________________________________________\nNome do Diretor Executivo da APM", alignment: "center", fontSize: "10" },
                                { text: "\n_______________________________________________________\nNome do Diretor Executivo da APM ou Representante Legal", alignment: "center", fontSize: "10" }
                            ]
                    ]
                }
            },

            styles: {
                tableExample: {
                    margin: [0, 2, 0, 2]
                }
            },
            images: {
                building: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqYAAAF9CAYAAADWaqruAABVl0lEQVR42uzBAQEAAACAkP6v7ggCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIDZgwMBAAAAACD/10ZQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXYgwMBAAAAACD/10ZQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXYgwMBAAAAACD/10ZQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXYgwMBAAAAACD/10ZQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXYgwMBAAAAACD/10ZQVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVXYOR/QKLI7jg8hLEGCBBERCUFEREQOkSAiYkVSz5rdVUKQICJXESlyHEGkiEjhOKyItTbubnLp1Vpr/XMnwbNBpLXWC8nsJF7D3SaGQ0RCEBGRIHKIhBCmvzf5zbw3782b2Ul2VwK/D/zY3Zn37/ebF+Y7v/cmBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQBEEQHunOwcPpnPVw4djgw1TOavnFQ1v1JWvummO7D/Z0DSWNCpDK5I+lslYJ4hDsB9h9iNHddOfQ1T1dj86DX8dTGTMN/a5pvjhYZ1SQdDa/DcbyoAR+ld1S2Xx3MpOvNSrHcrAWsH0xbC8YG2MjWGtQGWxTvs4JsKaAsq2aMayOGPtqTf87wRqUc2qfu8E2ga0CWzyH2NWAbQX7HdgtsPtgPWCnsN1EzPbWBIyzMaLOYo2f6SJ9WgH2xTzn0DLsMwN2F+xfYJfAjmD7BvrRIvTZGnJd1mj6qcJzR8Eus36wvwusbY2/1WC7AubmkgifNstjxN8bi4zJb8A2yAc149vh60cda71BEERl2fsnqyqdtXpAQNgLyKZAaLVoRPbZubbLBG9zh1ljlJE9GTMB/fSWIAYxfbNmoN9p+BwHuw3C+AiIsNWpi2bCKCPQz29hfs1//JWwnHULHmyqjcrBxOMWsM/BfgabAXsLdo/d9F1D0fUD2DuwSbC1TNCh0PzaqcfrtuONfVHATXg9+5PHtmaw7SYsvw9/T+G5MUeI6FmOwvAc2DTYUxQPH4EtBdsGdtptDz9/AusHewBmsjro9zOwGziWqPlYxcQv1n/OhBGOnT1UfgJ2G2N0z/G3eFZgG5dZnHHMryPaWIQxOA72BuwV2GEmBJ1z0XyG9dYFno0WxacwBk/xOrRibNrAusFGwa6CFdgcc+ccXpuTYO+FudMBtt2Jg8pKFLuvcI4cwgeLfRj/cbAn2G9CmnONKBR/cPvCOVsT8dCzi/WF5XvRr1XFCHWcu1ciS/K/iaQ0vgkU4NscEU0QRGVJdgzUgmApiDfoVNaUbtrm7LGMcNxfBs/n1XpCnZT7m5/HY0IbrmXw/Oxx3r9T35pszphrA4Vf51Cv2E/K68NpSx1/xufXVDJjNhllBITaMhj/2LxFlOyL+jvCLGYv4fs1iP/Oj7uHyyLIoP1bYO714MaPqZ++8Zshc8oMPp7BtvjccucVL5dx+/E+Z2BOnTU+DItQaNko3oKytrWYBXstZYPWorizUYwVcx0PoiBaHzCOjNMWby8qg7wEhdFJzY1/AtsaY2JWEpj1KGaGmSBAP84744gWcwUvDmqfBzBOE7PiIhppXCdQSNsoWFYVIXAsJmpjPpQU0O/TMcdYj2JtGkVeg6bcBmFeBc3tITz3ggm6kOxlAR96DmkeHNZhP++YLxrRuVTob8aJcTRNOCc2x4jNAYzL25jZzjZ33jtjIwjiwwFCrAGE6SsUlYpwVG/6kiANFKPi9wAxisJBFSiqYORleNn9f7am/vZdoe96f2G76MvHf7QM8GU8UOz4/PCNSe6nJ9lhVhllAvpYA2N87fjjxRTH5veVj3/2tyiwvU8u4t32lNj6/Q68zvl30FYv2PpkdsgoFc0XzRrw1RLjrX4K39VrrfqVkedM+BxN6WKcVWP1xbf/++mmOZK5MTBStusfsizdGypMuWi6Kt2oEyjCbMySRY4dl5pfapZf65y2uIA4U4SoHnKyYsEMCwKvOiRbeUvIWHVpyh7ALN8bNwYhcWrHtp6HLeuGjOe5EIM7zjUK515MgdniCCgu2pcVWa8Ws8IzuJxeV8QWhXHngUPljtB/QiOAn2CZUxFzaxWbhyjoj2nKfCLMrZ+deRjOejZPY2a+H85RYDYJ13u/QRDEhwP2IG5M5yB7JopFWRi5pp7nx0TRwOuChWa8Zs0tx48LAtYTZN4Yj159ZN8wH9sgIDb4hVC+HjKmb7BvZZzcR0W4iH69hyXuDUaZYHs9IVP5Pi0LI/4pxTwfdNz7zY/5feTXSyqbFfvzx2J2XNbZdGZgqVECIDu8EubWy1kR7vPRNen6qN95jFwffdfKV58Len5erSOW42No6czbX/7nR5hXI1fggceoMAkUG1yY6mkMWGJ/hXVzRQrTJGbJajVCcwrP2/j9SEi7NZgtPKI5PxQpTLkg7mdlUbAdChIpeP58lJ94fgzLDzl+Fc9yzLY+FUROR8T4e4vdL4rtPMBM5LTnb3GcRPH0rljBjdfmqhIzPudGZd+w7B1hTi4pcmx2SJZzP26zeIvlXgeVk1YDXsTY6rDFzZS7fsVYit8hCNN9BkEQHw7IaB3mewADslBZRczJZRSRoB7z1Xe/xzQ+nhPffG/fNEdfg4Col0RfE/gyjWV1S8HqMXVp+FLyD/8tedbsl38vsHh/FrwUH5SR9rKKUkZZzU7rl8ul4+qDBZbx7bXsgzrzFufJXH4T+PtOuQ5cpGr9TnkPJ6HXT5vdT0nH+JwM3gbQ1m3ZV/pGYF49bv/GemxUGFWYRlBmYfqGZbfcrCH+3llmYcrYKmQRC66owHpdgiDbUmRcTglC98AchGkbjsPGTO2hEgnTRhTZ29j+Wmz/fhFZ2aWCOH/gu9bR2y0u8/hHC1Mc23vfg0A0G9lcwTo3Aursx/nwqfPAw6/zyhIIU9bXV/gC3KfCvuY2EqYEsYBI5QYNuIFnpEwm388pilI1o6kKAuW8kpWTlul9y8zKcixfrvW38/t/Dttf5x8Xrg8Vqv3bEvJHwR+5vqYP2S9fH69SOXOdUWJA/FVDFrFbWormy+xZZV9scKy8c155/0OF17Y2vrplcPH8OHzfOs/s8CFoZ1peQofjQQJRP7/88eFxk/1R4yS3KwtXL9a//uugfXNgZOr6QGGvUXmihGk1LpUvraAw/ci5QXNx8pQJhTIL04S7JxL73S0srY+744jxFv9mIeN5m7UfU5juwDZeCBm+7SUQpl2sPMbunOdvdAb0gODPyZj7ZjfEzJh+xc7FFHdLsC0b5+TKAGH6PZa7gCLQRjFZO09h2oDXLOn8nfCHqrssziRMCWKBADfkKrhB96U0GTouWgKW5dXlWa+emsXz/fa/dCK36R1z2/XEg3N+by5v5/79I1vG75GXXMGPy2BuljdI/En7C+UlZC8GM5B5PdOc6S9p1jSZsdgb+f18DFL8svqXgNRlfFloeuekTKl3TBV3cqZWKZ+fnKs4/dXFIfYi2mm5Xz5HtHuLVd/VcvyYuic12AIFOd960n79ETzsjE7eGBhda1SeKGFah3sYl1dYmLK2jgtZzIfspl9GYco454kvLvSaBIFsxohrg7tsjMJ2RWxhOkur8ILZM9buPITpahxLWtii8NbbLhDONSE2u435oxOmtSggbXcuxNgrfVsY4y6NMF2M86zHKcdfAKuahzBtd7Kv/OHjjLCtYBMJU4JYIMANPQE35Un9W/RaUel/014WEkFvXitLzF57yjn1N+9r35eWffm7EbaUf+If5qjny+5sfwLK9En1XFErjVfZZzpb1v+vo56BUC3p/7CDfuvcl7NmLSCeev/VbKH0wpT6EBAgRnXXVrtVw5qAODTGF+H5BPu3VL4HAVUw6h9a5Pnlr69eV399NYuqzldfnD7/dpg97Dy5NlBYZlQeUZg+xxt4K9pBFCQTH0CYumO7JLyY1M1ETBmFqfiCzBVWR3pjusdXOnrp+5mQ7Vw7F2GKMT3pCnT3paM5CtNjKKBqhGz4bSHLGLa/e0zIrm4x5o9OmNYLWwYmHTFdPN3CtTqmFab8waEgZGYPzlGY1mI7R311+cPMBRKmBLFASGWsNexfJAk3bWW5lS9/Ru7tU5eU+fFgQaRkaj3RoD1/8C+DTEBMXx8YaZOE0AqoO+GUV5fIvd8pZcuATrRabK/l0eaOAaNUpHP51dDmdBF7XzVxCMlEy3Hn2xn0DxbS1gF1b6fpivRh+L0ipjBdvKdzsMAFsm6fq/SfF0L+FVQqfM+y6m/WX0f3QPB/9q4GNKosSz+KEEIIEoKISAgiIiIi4krTDCKNNOLYVZW0nXEd13ZcscXpccV1epysNL3rZF1XXMcxlTKmY1pjOsboOGkJ4jiOnc5P1UtMYqxEaTIiTiOuiEgIEkIIofa851e5N/fWfVXPVJn05n5weC/v5/6ce7W+d+4953jpnbKbvdbHTlNdqC+tcV2TIKYj8GTvsgSEbnAaiWlsibaF++E+YNWTJmJaxJNQ6GYnd63OZUimB5zlb9UbEVPWz1qBoGe5JKZzMKYiYdvExRTda6jAtjMM2X2ZOlTEdBH0BUJPfyePCm6sDquIqbTfltX1vltiCv09Ev59ZGCVIYoycjUx1dD4EYCIQLGPlq2lfX7Skqgcukl2inIMMyWWJx0h6nsga3u/piXXUP8gEdOVgqPNCiKTw7KTC0Qgouw5mawxQmYO+Ms6UkZUfEHTSyQvnj4gSou0s3WTOUE5OTklGoMEzkVmtStiWh4qIP29kJfm5T752MeQMD54Tx4zQRfilhBHD3xcY/ctqWmJWB88AWN64LSUnwHrWNc0EtPYkvMjbnm0OE3EdEsci+nWN7SY5kKfMdKz7I2JKSPozZyF74BLYroe5LJAaieWznHMTYKYrjamjrjEFO17LllM3RPTg0kQUw/G/BU3/5cmIqbC+7cVobo2cwkedmhiqqHxIwARghI5lBMTJ2vcL6o7ojvPvX05cs1ecv2BnFTmCyR7q+VoE2srf4RIpIi/Tu9LfQbJSZkzDKUIPRivDbLlUL728dkkdUROPNvo2cLgpL2q/Lncd2GMfXGtqeYo6WhD0n19HYZsPF6fWB3y3CuuCE95jriVX164E71IVniaVzuN6YFMTOX7x6eZmFrYwFnSHlvPpIGYlnDE5uhEe9kyepvLdJ0/cFsk8l0TUxlLOceaYZK1LohpE/SxE0SJl+ucxdyveD/CRRl4z5g6VMQ0T7A0L3fhZFXNjV9RImIKZIDEjvMRCpIkpqvRxtI4Oj0AYh2FxT9LE1MNjRkOIgfX2LJ3WJAQhN334/gz2uf5VfO9KDkfvXUh8kDSf6u+rT+bxS81LWtkKeuLfGQSStBPCLM2hnx/SE2a0sKKrlq5Xrm94jMfEsn88q/u9F3bGon+d1OPTbwKmV4c6/M76AoEttcbMOcmR8I7dhMxBQll/cS5LLj/2aWuKc+RN5xXI/XtkTXG9EAipoo85VkJiOk5F8vlT9wSU2CnkBWpIIXE1MPpYZTL776IW+4dQBuTwWJun+EN670UENMYiXnJEd4VSRDTFXinDuMkC7MaNip0FeRI33Zj6nDyyr/KEeViF8H/b3GEdrGSmMrwQAfjnCPYckZMHUNE9TvotIULHfW+JqYaGjMY3vJwNhGHHrY06pz5id8r+HGVKRBFOtrn7NpFErpmH+1rE9fpaL/bN3HNErwnCK5x70OqhOxVHpBs2cNdDCjP+itkTFKGwhqm/ZJeIwUgfX8v7nFkonY6+3mlGb3QAv0xvYu6xrXJ4/E1EdTDjd3RTafF5XS5v/IeTmkujNEz+4tOdzha5Vad+V8ruH4gbt8C8jU+MUPpNz1cPyzBXEE/cY/1PTbH8Czfd1YO/3wfuzdZn8/o75Q6u6WQmDqDWQVvunAw6ifJdkVMASHUzxWSnhQR03zUHdPDvDiZsYZdLGNjvyrbu5kiYupBatQRzoobSkBMAyTXDGeciy3VK6yUGzliWm9MHU7EdAs3xkfR50TI57YbXEeZCmKqtHC3cB8mFfggWeac1Yr0ogDefcnpLCNFxDSHJOUhBTU0ZjW85e2LiQg845ay45EWeUmczn9FmZcodeNYQ/hBf4P5oOctS1ddW2S74O2eQUvNA1w/pHbDUqfoH46SZ/sEYWok8ps1Ret0Hskg1aXcJzr5Hvv7k/Od0bq2vnGK3Zq0vi+F7w+QM88oWZdt4nX8+t3J5DReKk8VMZ287N//QaAtz3DAxlNhDxHT2zLRTxzlIfDaCel5CuaJKyF9NdZ1/S2l4cHeIjGNWakeJGkVPIYc6xlvSExzJxxLYI1KETENcmXui0Myh3HvsJEcarnYp/NSSExjY3aCa++YAzEtQHkbDWe8i3KiirKyuSX2Fyg3GXhAzOe7IKY53P7cCMhkIvhJRiFeg+CGmAKrOHI7BivyMkWfDmBe5STo+1Vuv+ySFBHTDTZ519DQSB3IYrqGLHjDk6yMtijD+kzc//xqt0UefiALUwEdPUppxzFJoXSQCcux8pjXtUdEJ66FlqMNa6OcjQrXQIQUsTRxlK2Z5hBd/8kUg82vJb2O+sT2MOInRjKYeO7Xl7qsGJvPydq8cEIXpAeVHq/cue9pCPfl0PkSymS0l0hXP+lt3FraLwqG42T5iuO9L+sK75jj1OZtCfqagRiokz3l5aX7iXvYX0pbRCJRavPhutZ7bMwTzRvoIrH0yc+20zVLQpHpIqUxknNtCsR0L2dNfCfJEEq7HSxBQwIxVZGtXvZj7pqYygkEmGd6La6Jz1Sy5fOEnuIroY9XIBEE18T0/STG7aYUd1UmRgfR/+wk4oCGODI9V0H+hvBMLdqQiJRuV+S6v6YipsBGziq8LYm2N2P8KhTlbUtETIG1GLfYnF7mECJqf7KhoCBfpICYzoHupmuFRUPj/yeIFHyKpVmBwDGiiiVxyfnpf8j6Rj/qt2mZONuYAaA+vEftGrfbmGRgdZAj/jrXzzjPB83qf9hdORV970Ab41gO1X976fw/yeGLrNOR+rb7OcYboL6tL5cI2DH6kBj5TUOXbCGVnZ/kZXb+2umOG4VlbRnKvpaFFtLzY/HHQaFrOm6ztogQgSYiusOYXcjiljAHYJF0g3mcJa1JQWg8JItwv8WhjoUulstXkbxIQEwHJGIqk8AjqHMMy9k5DqT5OuprcujDcpIekJud6HtiyHE8/UkG8Y84ENMF0MExIzkcSrD9IAPPxEh8tQNBygbhP6cgxS0cCc5x2LIwjI+BVQ7jchztaVTlp0d/BnA/EXaRjDoQ0x0kg9I9tR6ecE57Cw0ZXiEcWjx4oOtaENMMQ0NDIzUoLv/Oytl+UpF/Xcp5z1sfC0m+vG1nXqq58JeIMRNAJGgXWUyd9kYq9o+GeAshb62U3w2algWwYArENDhRljoZAd8mcXn76sWWvjf+j5D2VWbQmO09/11keOuXpmgpVuhMFt9rXQzSe4sc+rqJ65sYFUEViYC84zsty/AQWYZTETz8xwAPftzWcQ5Mr7Dkme2SUK2BtXUcVqnduLaaZD2IwyNYMBcr2jIH5Gocx9wk2rAJ5GG3UFYWiN0wt4xaCXKyGYSpGm0eRpu34j0lQGqCsBq2oI4FIEdLUP5DEJBNrnTI2v0piF8NydwkCMh7GL/SOCS/Bvq8ir89DnXPFbzan1m6UkRp2IM6x9HfEyRejPk6EPIb0HkuXw/e/wlneR1RzTn0fRssyE9A2paiTQtQ502QxGMK0pmBZ5tR5ya0wZPAGn0Kzy8TSOZGtGUYbVNaYFH3O/iAinLkeSn37y9vYtsHs8jXQXcVkBqQ0cd4ZpehoaGROvjL2rNpSfa6Y9B2hVVtc6VJHt9940R09hszBESAquJYfVXkD0vIbuKsQoIdh9+ofWVhaw/sTalMuV5J78UVZrSalrcvmw9KjSmitrXbQ9bTQ6XX7o4ps08pRCDM4x9WdO52IKYlivchckpRSw5dsbeIPCUHpQJjdmApyVH8ANZwUg0iuc5whwXYf9nGEYnHOL8F61euQx72k7Cu1eB4gqQ4CTJXIuy3W4l3q1AWE1Z2NerbDUtcphsCCWJVwSUh6CHpRz8PwBLrFmuh92qunSdBdhOR082olx+LUzF9QgIO2woWQ2c1cebCAYXFcxGWppsx1s8w1v0gVuvitHsZ+qiac++p5hbG+TbK77H0Dv0HHSzs2bDwBri6qlDXiiSWzGu5DykP9FwttPuIg6f/NrGvkAqM9z6McU0iEdq/0NDQ0EgdyAKaRyRrQCYKITF/vWRVs8IPXWzvt2I+bjBmAH76ezv//A05rap1jE82rfBLP7ethrF+qzzFBQmaj2hpfZ77/byhefT+92I7SNRkGkvqH1d1kOOTnekqJcvbRPqyzjZHmrZSuepsXrIu2dwAYa7svObwodDI+oAy+D7julj3sSZ7i0iILKZzDI2pIAfErMASnKdz200mSUpCqr2BxTkXpCn/LfTTCZ5prDs23vnQRV4al5mz+bqg/3Tuz85JY180NDRmCogYLJvsLOS0N5Mt+Vryr/VdFnkYJM/4JcYMgDfQbpG+x4rlcYFosrSm/9HYze6pCKpsPR6nsvf5yjrdOpottR2oWDsUIuv7V7WdljPQMBHKVGR6sdEQjiw7UN/1XLbWqkk50xMclc50PiMLZ770oXA6nMXCkDGZcIRSkNJCkoq/3rPmVl1d68zYIqKhoaGhoaHxFkAkaSMJS0UasCQEcSJKoejv7DiT/Y/ru/pnxFesn0gf5WQfnEyAFKlNQaw+JbJnpaD8J7Ia2tfQPxVJFEjvA1/AzHO31SC0ifQ94lfs55UINOcpby9vt/c9vdh6L6XL27/75u6RwqCSyAtWXVkf5N0//m9Xuv1x+mqHIcM8ivVDvZcVfd58xorV2jdOluESQ0NDQ0NDQ2P2wBc095JViyMIIplTyx/+3Gs5Pt0yZgiIBPmtdJmTQxLFcXTivL9LLtvhl14c+mP3oNpSKu235YPMb3VJng+q0o7iXLXH1MreRG29b1IEhJQulZb/pXdh8ZmOIX7Lg3Aedz7w1s7fXu4O/O3vfxfHY42/HGHI1P2T5J+/oi0L7dbe5b6NhoaGhoaGhsbsAe3JrFaET5LyyfOE9aOKcPTst3aWnKPGDEFhxZ39k0kf6wf7mw9PhL2M4ftdZ7+9d+SjClMI9C7HEZXvmyFvWXtSRPGDsjYP6bJGCKqv2MvL9B5LRXr61j1L31eMNOAfv7xzQ9Uenzg/4uyF/ayhq/ebO/czhRime0g/Y6RDqYy444Tx2XfRTtowRE51yw0NDQ0NDQ2N2YPC050hH0+GnJxwGLmjpW8z+nWbncoxFXmaUwKy/J5Du2VSClLJLxlby9cVt+y9jDWXzL75v7nc8xJ7bBkZVabSxN+WhTbJNKX0XCY938tvM5A/CkjQPj527JZKM3q+pS9KiQc+M9KAjyo6StBf9D0k9FO2lvJe9Pvru4cuh+8vYPOq1RqPU3ie749IvlEPy53/742vkzbUmUR0NTQ0NDQ0NGYPLEccRtzUViw4BXFxJu9YucbHSWZEjuDCMjODSHazavmdRLpefDocvdDaZzkUfd7Y8cBz8s/3ThWfMYUlf4gi3z489K/SeWZCXZeF59OzT9R7N9V7eq3l7Yvtlr4jRUYaUBg015H1POpL5PQletVj3uy50DlG7VvP+moKYcik/kK/cpap39+wtohEQoaGhoaGhobG7MEH5eECInPKvY6wnLF7nCWSsgZZpO7lby/fWUrX5lniKyeveBJfgIT+to78PR/OIXQf1+noZ8/j3fAcl/FB5xGxegJyw/oQl2jZ18kj34w2hPpHiFBtNggXWiOr/6Wu+yXel/ZBsjz7wh7MoOVlb64yEsBbFnqHnh9TBdP3xbOg4vq+ujuWFXGoPk0fAlTPcqpvNN5HiXUuXEc7mS53nuu0PlR2cdbhuaSXh+w9rj8SyWV6sHL4B8mKTVsrKjBPILG5wc8pXMfRJzwrim/ydWpfaEY47WloaGhoaGhMZOUxRTIqL9nKIaRsAvGzM/b+wec+TvwTR5wHcA/nfvE8wJ5nEqZr4WMu+7IMIZxiy9EQVdYikL0wkb32vhUG4ZuO/qzj13sbPjwtWvLUZTCraUegqLzD40z+zM1E1oT9peqc/f4A25v5xZ/s5e0nl9r6cow0wB9oz6e2PZX7zNojC5sXH5+1YqxGjrPxMJdTeS/YMypLLO6z67ZXPo3BK788n9h5gM0hvzC3pOtx55j5wFsemm9oaGhoaGhozAwQeSjxiTnxBUcfMV+8fE9Jqtg17l6cfPyyNS1oWrLLJTHdgnoEoi0TLJ7sUS72h2TpW8AyIkXWf3L+zgjKURI0OSC9OegPmFSOGt5AqIieG58oQ3I24q9Nqh/L2323SNKy75IsznOQaEG111ger4m2W0kKLGLad5WR8A6v3VfcF/eWsvEW+8zNOe45ee5Jznm4pzoPiYQ6Qtd08H4NDQ0NDY2ZAvpxbnLywvdJRAL32fMySZhECKX3eDLGEx0xQ9PY9uqOYsr6k+OCmB5lpEoQ1CtuTTh5w84udPvrdpZ3/vrd+5n/1XS3uTAIiyVP1FWe+UxPRxOE5ppDZfTgWVHfwjYBppdCuvdVc8RyfDpZ2d1tpANUd5b/dGcEehKII68H4T7av+WMSe2738w5ou0jYsrPA0UZvGAOJLZ2y3ORvyacC+QWUSXMq7RdYMGl5kg6M9VoTA8ykJFoIbJd5QnZitKy6vAjg52PH/pZhOxN+kNNwwke/FvKx5wpeAvZvjRmEz4ItGVaViOBWIF8xfsxZxYo9fKsOse+nOEHpIHVwS/ljld9e+8ZWTN3uSTZYvnKpWginna4KyK/VYaAc99Find81TmG/iokxCQwQX4fewPhBUqdl7UaH5/tLC0KmkK7hPYJzkGkD9vRjKyle4w0gfpqEdNetEkhInnEdUZM286b9zwgpjWJnLzkugTLvagfWYRnGEFN1A+KWztkpzxtuZdnzAwsRh7xSpJ6B6nGc14Saa4JecRLSWrZuwmlFmUmwgaUXeNQVh1JEPnH1ziQwTnI/37Ces+FqLb6LEVO+kckD0gekvTi+XehO7/BsILkc0HviaQB+rWwk+SUcN9rOGMdyWFOf3XI8b6DZDtJlVgndOl36HMgzvOLFHNjHeruJ+kkMUm+x/EwSH08rOXbzck5zIdNhjNWMl0xQXmfq9K4os464fkikjWK9lSgvEVo8xHu/Qa0NcMlISux38W/E9S7nmQ1yRcYMzfzZ6NBwPG4cH9PArK3Ev2r5t45QbIXOizFNbdywiGd8CrMqR6SLpIQ5k8vyUmStPg+aMwy+MtCi4mMPJeW6mXioD4y8qQIeyRtB+CJqPwOyO8vqq1l4X5r6brISAIby0MGvf9UDj2k3tto5cevbbXDXUnk949mJOeLP/X0yuSbXzaOu9Rtkdn93nLTUIEce/ZsO9sxxlkNBZEdnz4532npYpTa+q6RJlC/MskRrkf+6ED/Jiy58du8lfRJHxKdtW292SwMGSONk/rLzzdxuwUjm/KzeJ9/V7knls0DoezXKU+PX79LyQoehCqvPZwpX/sZIG+rSZ6SREmG8EO+G0RoF34EHpOMkjwDIZlnyMgiyQURi0KCIE1+XkCImkjGQNQSIROEcjveiZIMkBxGWVtASGtJBklGcH8P+inllYf17gbKGibZK7YTZGQ/COf3KEv8wf4BP5YbY9ZA9DmEckesckS9o98vSKIov1isH2NwFONynLPA5pMciOkC47ckCf3tRHsCsERlobxlIIlRSCf6kaWaO+hrI56/TrJY1A90fA7tr4C+8tCWRRifJySPoD+Pot2bSKJcX9fhelaSluwj3PtjqIveVyKXZDd09QyEMJtrj5/T/ROMZQ7qy8T7B0lG8cwrkndcfjS+5Nq8A/VmcvNnHcqNgrx5FfPnJObhIU6n81DmS659GwwFhDoHSW6gjGxIJ8qoJCnB3PyMZADlP4Q+DuBYhTkxAF1NAPWUom1N+BiYi/7n499JP/7t7NLW0/9j73xAo7r2PH4ZhhBCKCEECSIiQURERIoUEZEiJVhNovW5Pld8PnF9PtfNc/tcsSJd3/p8vq7PbX0axzS16qaaxmhtmtquq1bTmExuJmk0kz/ry3ZFQhEJIlIkhBCG2d+9fqfn5zlz7tybzLizz/uDHzO5M/fcc849k/nM7/z++DJZEFliR2HLgTeSJUr1DYTKievlrWgOr3yLXwYvxfLYjqCk/lh9a9RV6c2yUPs0au+pDJ/ieqq/4RaCPQK9cUq/tNRIIidv9m6mMqUxeq8CO2hXA5RmlF4XoKBAb3/xOxe/GxRzq4C9OI7tfMqAYIHpMFlNZxgZkvIq07aYqj9AxFjFc8lKieAnAtNuSoyf/2ZVW9D2uVWt6SrcSlZ45bh8PdE39XzldRVOKxD5X3PDLlZwysg+ySW9ThoHfCmWRhzbhS+TOEB1kaa9xaQjeF9liuu2AFbcSg77Mq7RfClNI61nUNDkYJHbxYB8gaGXuaTdEgi9AkvOsMZ6k0daC4BZpRnLDVw/jDnWyTaAnSy7JZh0DK4DDD4CYMiygM3ZZZcWvv0Ac8VSCnCNYPx7UkDYD4DA7Zp7Woh5jpM2ThBGojh/FC4XqWQu4GiLxup+T/QHoo7/Ibs/Zz1YTQ/hnITma2BxCK+nqoa4B9ZJWSqkHzevuvj8dePHWkLysX5XJXlvM9puTvIjYhHuSZE0r5dIY6RncI4igGITfX+PNK2VCX15iYQgoNKKYq+o0tQvl4OfcIwrjsmvow1dEnkAnnwNds67n9kR6I/rWv4n6A6qwqX2WOh8bWCRZKXddb6LrtH7lAJ2iowk0tDRW7Tns+5B1Xoogbmi5hjphooTXYZOqq/f2UcZDWIMrFQgQ/tl9PjHL7stiOqmBPYZ+8CvONaWVxGK9GndF/hWeZUK/393JmJt5Xc1tPbklx0zS8hiGmPWT3UtQfWpqMJJE/OXO4CrCr6iDWbFt63ltc/y11Ya2Sc5pJcEmDpaktYzMBzQWOkWMIBNNd5KvN+L/OgEppA8fBHHoBdxTJadLsE0gDnigPAGvhhNQy/TYC1apWnzskswLcZ4ZVkuAUyDGKcqALJhzY+KXAbKD9F3reD9V0mPaNbUdQEl6JPzuorhPpRqQPC+GKN3AfTGoBuM1LJNsujJ6+su+lOnOX8qYG8Q73sC2IU43uvv2XljmvkLYk7cgOkczQ+bQoB6HBrG9Z3ExFzye1NDmusRTIM4r5j9HRK7Ic79wBoewfxkzOXMl79iKf+gzdr6DklRzsqj/bp0HJoUOPAa9xNMGnGtbsmKdlaS/umr2/EL5kCrB//I7QSDAF25IADvs4jI/0OTDXtDhkbicdOoudlLANkhxij6rMA35imR17Rl+dGOHK3VtKN36tv1XY9Va6zoK7c0n7h2xwL1jJQiFRkDOqw8sEPPj0+91wBRpRDD9rMRy8od+dTsz7XTkIVM9mOFR9mH+XjxGm+fgac4Lj3n65K/BoiFSq/jPYBoco0gi3yZkX2SA3BzA6YB+LfF8P5TpMFJgGmRpRkA0wQ8tLDt2w2ewFSVOdJYt7ucsxDpas1cNrkBU1x3jgZMH7Ft+Bi2QQOOVjy9tXsj6Rja2erCoviDxsq2DW2MKVCuv1ddzPJbpLFQTgZMpzOQa8YcpdpFOOjQ3wE3YCq5XBw1Usvb2Ko+lUYwzdWsn0K2NR9DW/VoWyemBIJ5wsfZPZhCSkkL2FoeQT92ufTDbWTW3pmGL754Sw0UtqryXAc46EpQCoCwHqWIap11Eo/ScY0Pq+pTaW+zfvhNj2XNOuPB+lurZA+Q2uUguYoCn45dvRP/NEXd+Qvh3um7GrqHMS9Q3XyFhYZMy1q4yHCQ49/0vW/nS8Wc8jb4PJJl1Y7Ivxi5u9PIoJBf7BxaEyOYP41frRRUxuD1n853WWDaei4SCays7tyj3Ac86taNuj6U56Ivch/l/ojX5OvYurO+i/xL+x7VtUWz8Z+nHkz1Fp37zDdtuncwhY8iJENgaskS9oVrkuZNAExf0cDzamaBO+wAlqsnCaZTHbYqlzMfx0HmL7sR7XsF0yK25d2dApYPAmhkiClg0Dbk4YfHAfYjYl0GwDTArOijWBs6mQfYmZMGMF3GdiQeKG4P6jgH8aOnKk1gOlXcIy2YLkQbceg+nJMaTCGewVQF58vsszjbcCfr+A8y39/UF09CAFBIX9SwjsnBJ2FZ1XRREgQq/qPiXAU8oKq1FO+xt1lb3G+zvnnczCFLXzOuq4UaDqdrqtvjZ5qjltVsv+Eg8YEB48iVOzVUplT1WSR1zGt6oqPBcJBP2/pm/6aua0SyQMqR73Yg2Dk7Ir8vI6VIWSqrUppHNdhLAT88SimlUACg2SChdhrFOtDMm3INNfhJvS6peE3XHo4ltdLbx3//hW0tHyT/4gIj+8QrmAbgOxmHVnoFUwBS6AWAaT7GlIDoeV7BFNagTSkAfRyQNk/Th4IJgmkAPnQlKcC0CJbLRwyAFnoFU8i7pDGMqcIBzL5HIIosrzMf4yasLzeyBteMY30F0gymBubosQBKLXwdxXWCaQDTUtJlzBK919DLRszrlDSC6SEAqBZMAeAzpc/KBtLACwLTmcwfN+ohvdoc5ooQ8dOP+eJJCAbnVYQQnJLMiglVkubjOY5BxTGh4dTPNW3RNqsdlEQgttyl9dcKfLov+7uqvrG8FKkNe+QTmRr2KHKfypR2PlGCwvCoRIaLv3+k92id1xvNaPDQV7cvrj5hqqDOAp9+c84OBBulwKdZRgaFqlIdUAOPSPmYks4BKaLcCfYaln/YbqUh68N7NSpdR11HetWvo9TnkJaRHr92x7r3jZ/e6slIsYIXDKaWbGNgWusRTHMQHX7pBYBpMAF/0HUOYPqqQwCTLo3chgSEQR8BBFRrsHcwDeALu5V0RkowFWAzwu7lNO9gigApATwBzbj7NMC9CwCGe+RaFkhR5nkZANMAW+tP9NvbsHSSpAlMrf63Mv/JIs0PGBOWPyMNYBpEYGGLKzAVPyqGmZ/x4hcEphUYZxz9dSvFiQAwzHXGgnV9+SsUAoc1IlhIVkAc/5tZyP7x08747xu/y4juJ/3gP25bZUKtCPQ5Lq2/861a9aq1FFqlWv/+gWCv3oLfcH/KrdzGSF8OAFJY85TIdFVx/ZqVIVP7ZX36Zs+yrbWdI+VKO8IS+M+XbEvk8LmWvjwjg7LyRMcNycrscoy2awRFudsW6ENUj76ExjPMXDWStyeVXbVcFn73+eTXkJs1dvaW3df3jeyUiYDpMgZjrTowBXCdkvQKXm98AWAaSHzBQ9/WgOkY+sP7WUtqwiKz2aH9jYDDODQGYNhGmucSTB/ievz6dYCxYQ9gGoSFNcai6/O9gCnkFItgX5AEeJodIu2PsLl432OKpCcsBVNBBsDUksVsfg4n/dGFDAxpBFNLNjOL8EZDlVUY9yyvYIrzTknagOODbsEUsjYBiRhj8QsA0814H6zsruUVdh+e2GvVF188WMd2o0a+VgFGIgUUKhAdu2qXxoRGob3SozjOFcdSHicwHSQwLXQJpuuttFdK7lI5ipu9TsnVycewf6geEfmp5Nyt3jcovZQoU8oBS4JVfj3U/J+lDYJq783/w5dUZSp5DlMEgnXHG8z+llNtfzEyJQTvxStDHY9FvzW5aeV+AvzX1ZjxT25Z965vC71/sbgfatqx5Ndot3O1nrulrCflubr29Mf0x22L/EYjO8UzmCIiPQ41HcD0FOl6phtI98HK0fSCwPQw6+suDZiOArREX0Ui+6d47iSzkA4oJuXLbCadlwpMAQ+bpOtvI73qBUwh+SwoZBxjyPEIpgvEFqkSzb0wha8kgArg515msG32hxkE0wCzXt6XwCvPfg1R52kG00LmB9wnuQnkYi2cQf+8gmlU/pwhr2+LVzDF9Q+xtXzJun6GwXQL3qdPv6W/D1G26/Ga4YsvHsD0kgYSpAhsth0O38zTzXb+x0xr0/nWntyUATtH2yx/xn1yqiChaqBVGR37Nyu5ujlwo85EKdIUcqWzL/je5dvXxZawQxAPlGUrcPwyqG2Jrv3lqci44tqAfJvVViBYe39G821S/7dYFnS17/w5h+/nI+O31lJEvp0Ttnc5uVZUoi0exS/GpbSL4CkKSErDunGrIwSq2fpPcyJgukqycHj1MS0lbXhBYHqS9XXzBHxM92u28nUVjkxmcYoDtpZNxMcUcHbZC5hCChl8jQFSAq7BFC4QcvJ+tFGd4t69JxVY8J5UHvl0MwSmiaCZGLSSr0uMtzgDYGrJTnbdtVLqowcJsErTVr5YP17AVIyvgfX1KGluBsF0A64jxuLdYjpsB0354osbWfnnVitYqEvNV5m6jKNd3aetN0ZBIw0EIe/RI2kvNNXf0WSPOq1o7LybOvfm0XAOWX4bmB+pZgualSIl/ehZ1H+14UGodGnZxtMRTe11NZm7UPOHspBZ7OAqkEdVpgbUNFo03wgEoxr5Gcu3ufJ4Ry5d77pSDlTMnVNpUO5u8JQsntPLq8wQXpMg3Xmd7W+02xhW10KUaa/0XHmv7hy5vb11t6JFRnbKRMD0XQYfByYAptNID70AMOVJ7MfgQ+cVTEthhXIrBQDBB2yOogAVz1H5CJaZ7gVMIXOlil5L3YMp2hYBO3vQ3xkIzilLEcAzzqAt4NXHFJbiYAbB1JqvQTb3r+B6ZxKBVxkC06nMJ7KFAWcNLJM5aQbTxGe1wBOYCgt2F+vD9gyC6WL2uY5gbJ58TLEus/V/rC/ZJmTRmkqwNCxtpUowJ1nK8HzbJxELHkYoOGm+kQVC1rd8guxuffJ/NZflz2ss2IvGL3T81w7Dg3zeEQ3ub7ozUF4lFxKQgFip8W5a81tZVqNPuE9ViCr/9qMOMdewMG450xGn6P0YzXmpkSGhOVz4rGoW+ovrq3OqJv8vR3nP48/cO+7tudBVQOO9+tPcP7eekqSDwjGrjT//p9VGX4vhi1cwDSZSu0CXeAJTAWVFLwBMC1gwxw/4IvMKprmk+Rq4LkmRcuiOkgLJO5gWYs49gSmkgsHeIIDULZgWsP5HsS624liB47iFr+gdnOc1Kn9vBtJFyXKApY5ainv5fcK6nSEwDTCL8gjuXzG3qmcATAtxXW9gKn7cDDPL/+sZAlMUFfjJQj99AlH59aTZGFzqSzaKFSxE/oTjaj385/5WjsE307LePSCLU7GRBUIR1tMp8OmBSEdla5LqQQKCNp/usODaqju/3PAoH34T3fqLjyMxzItskdU/D5l3qI8F+jKlvQV7LnbfK2fwV06ayLd5vq0vI1si5cfMAIFkXYVahlbjG6r60VLZVspwYPtv1q6pNossCzEPEsN5yvriz39GLiIfU/ouGuchwxevYDqfwaFJmusZTNXrz8gQmG6X/R09gakqhQzKFikBQM7lWXd5AlN9xHzAA5gGcN1RFszyBH13IzvY/K1GP3cbzhKQclLOM9zJYbYlO28yYIo+rEpheZtN+ojB5dsJ62kGwVRU3xJuMFWw6udkCEz5nJTgPBVMnf3Jf2T/H4YyAKYB0iP6NGXOQVNY39lYvMSXbBWCgY0EDzEBcXhMuuXK85b+lBKohbZEMxoh7lZoHAtJY2oyf33qq9/Wd1qBT4/Jx9Bz+iWC2akEkN+jPa2WK4FX5jhZdtc4Jty/1rP35zUdmHORb5NcDgbJfzMj+TYJ7BdQ32AtdZg3Xn5Ums/dz+r4x2lutpcdD89FGrJUyfSFIndtHeVqpTa2GL54AdNcliz8qfgCmRSYrifdkgEwnZ2IlgfUTE8DmB4incvAtCWFlaaIwcO2SYJpEbaZg1ow1d+zap41wAOYTmX5JftwLTc/Wl9jfrbOP/7UwKAjGONkwHQ+6T4XoFbHwGZQt14nU5JUU2I1xK47kvgcZRhMZ2Md5HoBU8zTTu43nQEwtWQWcz25hPE5SZBVdvvar5fviyehqjwHk1pK5WMCSG1dQa99fLPHtoxRuVAjG4Sgah2BkLCQivGoitfIl9HaMh6sa/XuY3itLxqoutpzkNwBYpprqIUF0B/q51W6vvZLs66tt2Tn+e8ecvg7Zm9v935N/q1p/5BX2L6lahBcuVA5p6kyxytJq67aOUFHyIo+l8a7hl6PYa55Any1ChjLX2oHT1EbdE8WG77kAJAcwRTgVM1KTe7Ducmg5KlLMJ1G2o1Ht/LUBZjOITWZBU7nmrLLA5hWkF5l11ykLbmpWsceo32dZdHEvDvdoyoAgryV/0ADpjLYtXgHUwFR0LOkAQ9b5eOKBRSiiQI3kVxelgIGYRddQGMTtp1TyVJmTX7gYR3mM5CunwCYzmOW9AENhFXj9fE0gGkugH6r/GMHa3+uizk94wVMcc0WxZ8W4lwSF7DuvGa2YG7u+UFPvngVUZWHlG+Bp9rap21aO/8jWbXeNrJEKLvAQQ456rief1xJ+TY/uEIR+e0DX9d/2x00JiAX2/tm7az/7oE+UEw9DivoOJ2jLbt3o+e/A1XXeqrfOmHa57xFfT3zbdQCtsP17bfTXtoNuWzHdBkZnNOIiZrzFPBkWaDNc239OdQm0pApW/nqMbbO3rnQZbmIDFsWacOXfAQcxEXVGeX1UvYl8wO+mHK0wUKwriCiPeCQ/NskvewBdqaxL/TaJH0oxhfWEEAnkgLC9gurlBZe8+Af+pBbdtFuDMfXJulLLqBuHOAVVF4X835XzLsiRTj/UZJ64OsBfiUu3QDuegVTAPUTjGOhh/NysT0/iiCa2Zq5fRfvueHgW1gsJd8vwbrMsxTPizGurzHOAlc/ysS69hKcOkVkEMCPFVVm4Z6tc6jzHtNBHl6PQ6dofmw8YD7AOQ5zV4XPbYnGsr3QpVW72QOYFgG6Ad/qGDTzsgPrbUizToPYwn8CK35WxJ/48v9Ilh+7mbPyRCSqhw69xXGzFYjTauV/7M1YII73pPCdl/Xb0GHl2M8o/dLJm1HLYhoyJiHHrvaEAJCp9fmSro454c6Howsqz1llSilI60PTgtJxspZuM9Is1Jdp9ANlkM+N+mMEfzvUsz/Y1I28s/3vot1LilWUW5A10P6vl20XEZPA9GUuYVdAugiWrRFmCe3Dl3UjvnSjpE8AF7t18ADwqECaohj0Mdq6zrQZQPYY71nnEqreIL3E2v6RtBttNuI699DuZaSgKdDAyGuAzAeJ9nDuDamvLRj/CHSqBKYDKBgwjHN3AhZ3YB6eoqZ8ngQ1SwBtY2LeMRYo2gvjx8I4jgVJA7BwlaFv49hOXprS4ofKPh7BNAfzG5mgNX415mkIgL0Klt5KjG/YIXJ8GsZVx+7TOCCrD+OP4vl9sY49VZxaDzBWAUffn5OJ/uAe78M9LWDvuYi+duFzMVfxD1azNeQCErcnPh/QS1j/M2zQRB+k9dOlWT/3WRtBlpqrFO+L4XEZjgdSpPQaTAGmhZiLI6x/o1jvS/C6kwTxvlbSYdzLNZivTfi8PcJx37Dgi3dZcby9hIDkUfKtZ1JR815Ji/Tb+i4LlB4TPMw0skSofw8US69U5YmPZwOVIj3baqdfmlRy9Qtm75zKc52jom0lsT4/zsH0qeXXaWikqaM38KevbjdZVaZ+XRuxAp+eErAtNNIo5VVmPsHgFbufmnuP4wpc8/f9guby37+N0lxSH1t756442pZDQXXdGLd6P/haYzlnV5DW3LBdROrqzR7jJZYp+Gdf4aCl+MIudBG8sADneNEyd8EmADHndpbCSoXUP46WvFKvfUX7XOYAIoKYy3Wwul0GBOzFlm1AgRvMu0edw764F2nmYKbLoKASw5u8DsCcqORjzO9hbppgTd6UImfoLHHfPWmJxx9oezCvqWSmrj84XqTrM+5ZQFqHc6RjeQBEXftzAaee50RaG/PQhtz+fPTHSV5FUJ9OpqSYo2IPFvfFgP4GVoBgO8aS9l09X14SIVBYTBpjW6mqPyEHFBwXgTh99z5pHwgaWSArjoenVITMUSmiXLX+ib/tdFcEQJYVcokxCWmM9AcOf32nYVWIz5d+K1+yIp4sC7Vr5/BMc7T0V7Wdo+9csHxhrQwIPSVGmmRFqCOPrl+ts5Kr+Vj1Ne4PfPGTtfQ6gXoOvX/6szRkAkh50BQ7zufMLiJw9padG3ev4Ysvvvjiiy++vDxC1tKtjtCkSfFj6RHbN7P/ipElQn0rtSBbASgWdEOqRJATXD+qa+uZZkxSzrb1L/5VbdcY5kwCU2EVVEHVtPxTZ2t9WMN9ef/S2N1C9fmtvkbOtfWkJQNC2fH2HJqDI8KvNFkmBiWRvly7X6SIumX7v8YITjc8ux9tr9L6GlMh1jmd1i9PWblabTBdbvjiiy+++OKLLy+HvHl6wLKYniSNJ4cHnlD/+YCVv6HAp49ou/Vi518OGFkiBFk7+Pa5bkufW07/+KVt9b37aVvPpK2+X3T15h78qufKSgH0Yg5lIGVJ+QGnBylwS7v1cfpmz9qzt2x/3ovGJGX5ETOwgmrhEzRegrVchUbV7UFrMaXx2gFk1DdrLrsbWqOvoHDDZqTu0tbaFwAvSsbuqOu02vqxjqL6DV988cUXX3zx5eUQ2j62oqabFUuZgBQl+bmt8CckULKChtYaWSI0lrPoq5IuChWUOKTaQBW6ZvsyNtS1RdPiD3O6Obpu0+nIWDng0zFCn8N+yBwiX1NtShmyRuZR5oA7lGt1tzEJoWsW0Hxsof4NKjDqrJhDKR8rkv7XPUuoP0a+pZtEIFrkkNQ+4FY6lpgn3KfffW67LAzVt/X7VUJ88cUXX3zx5WWRcoIUAoyHpJrUQOpjIofp31u+meF+S+cZWSDlJzqCZJ0LO6ZrkoKS3jrRTqVIbaDaX9faZaRDPjP7CqjOfTRZJoNy3g+lb2a8PNS+yXAQcpvYTIn1VxkeZdFnFwJ0b+fTfd1F14mIrXuNpVQ7d+I4D3g61dyTSKgfrg8/i6Jf/kFnEGnIROoutKG6VKguIhfa+5sNX3zxxRdffPHl5ZHyY+2zCVRGeX33crmWvGTNSoAp1UC3ykU+qbvVmxWlSKmv06mfQ0mAS/SbQxA9Wn6R58N24NMaI43y0Y1o5QalTKnqWoB55dD3mM6J6JQsvN0UGNQnH9druIvavUv32Mq6MCoDJ+4vVK5dL6zjynlYA9QXsjhbCf9t39JRgtNFBqTshJlPYHpXhXO0kewRupFgl+Zv2BrD/4keb2+lx6zJNOHL/7J3BqBRXGkcfyxLCEFEQgghSJAgIiJFRKSIiIjneV4SPLGSpkXaXs8TTzwpIiKed7YVz5OetWmas7nUekmM0cul4tlgxeaSuFnTGGOyWhGRICIhiIiEICGEvW/Gf5jP9/bNzmRn46LvDx8bZydv3nszmN987/veZ5QBCmO7sYUJNmIvMDXQjYyMAhElv5SX8ao8DsTxbaHU2ELEZlK1p96Gzr6M+A/peSnNrlFlWZpXHJLCEmh7JwtMRwlMF4gARXuP5u85e23QgTGEEegz23kWv/qd5phSOUn9Xo3tJJPCNjzsHuDA/OT51u4Dh+gZsKAUsaVHpDK39jZkCcDWNfMfwOw6B6Ve5kgzN17apRCEwZLKrnxhZGRkKYSto8aw72cntpYKww6T5QojIyMjKJUqSfskcHFAToY6nAcoQWxmrIUskNhMkfJYIpupj+MADDYGQBU/jmP7mu1YxnuU/R2o1/c/V2OCynIesMqUlrI4UqVvScul6n6OaEBNLh2Ln1UgVP/NIVS9984xVMuy4kBp3mwopeX73kZpDsu++ulNK/FJ3nqslM2BCtD8O33lsaRFAHhb/N/y+dxjy69ZFY0ea70eplr9wsjISKzA3q+fsBKbo2RNgNIm4zE1MjIKRPQH+rwGijisKn/MN/0jitKYN/c2dN4UL1u/+qLNSnw6rHpIWVKXBD8ldOzv39uZ5Jfr2/tSzshPEGs6Z+epniFAoBznin4qsZbJPaYOLDqmeB61scLu11Ey8pVqVfZLyV9aHCilcA7aVxVL+BxMq7u3EJhqxub8rB97on8nakOeQ/W4e7sqpP+h/qdhGlsrjWuWMDIy2spqtc9GRaMhVAuK2RvTGxkZGQmRcrJQFnmGYg58aDelx3EeA2jvM2ntV1khMkClVRFrLM0MTFx3GMAnlSK1k3aOizTpi0sDx9ZXKXMqbxmlgzKN6c/HvXJpS4kX5vDLQD5hHXw7pvTTc73PoRRZ+PQcbGrsGFC85s6m/XJMbSLAZNn+fD4qpf4r237J7XDvrAq+6jOR2Jv855Zee1cACvF4ncuhGhnxSljZUhnT+VjOn20q/BgZGQUiK7mD/hAPvwAgTsKL6jHFMcRmWqUxn1B84WKRASqtshJtoqjzzsZAxoGEV7B6+3jUzsgnyPpApElnumLztjdQnXsF9pXyqInCJnQb0WtKgzpjZ4bvYZodAnBO4rbQr7e/jsa/uNg36Sm17NkpKuN6MnonQSIatiHjXmHengORujFK/UhUAjWxl1T1EuvnlB/nYHu0tc8a3/nTHS+9olkB2XqU0qxIYJvw/QqyhTg/lT6HUC871fjaPN5vH8Y9b6sxPuU8tLsBZUuXoLxljg6Q0O5Gl/nLTlBqca10/XK0UexSnnEpasqfRR30C2SH0c9ZALo9Hku8ClzrkxTvZxHZZng5L6JfJ8i2oHRmGKVcy7y2iT7NE1MU7tVytNNM1oZQgUPoywxhZGT0+on+gK8gmBuTwE2CFDmG77n9yYrNjMQGg47NTAmyq6LDDPrQZ55t/uJ3v/u22xrDGI1hpUiT4mfeEke+7zvrlCmVkonk7ZgUr6HTdwZP8i4DrG12nLVpm+oRl9qQsvPx/W+qnm94/429JdQklMZGyFO6vS56PaR5tmbS7w+XqjDJrkfG+ibdO8ek31ViTfm8OWPiCWf4ZPMMUxL9yCh+lsZqj/OoePmahVrvu8lGyOJIPrlN1krWgj/ot/D9A7JzgLYc4V9vkD0GPKWiGYDBD8ieot8j6O9ZZs04FiF7hmNyrfAoWRw2TNZOdg7WSfaI7AlZD0Bnjqae+yp7rtAWfu9dwGSWYMK/FwNa75BNAOZWAP65Qjh+Cf1oAQiuBpBuBRB2k50kG/KRKLQPbRYL/8oFFA9juX0/PJyr8HxUkvWTNeJ58ro/8nz0ad8UQXklQPQB+lCGedqAOR7G87DceGKNjF4zUYzlVooBHGebpksAEIGpXqvPKDaToO5yw5WBjHizpT6tpn7SWJQEHu2S967TPfGm6K3H9Z0380UaRbG4a7dQnXvuJXXfL1RvACnVy+e5DbSjLqcn8sLaIRtH/nvdLjUKKLXsKdmHTVduhvXPVtc8amfsBQ+uZtyl6jH9zgJ8P1SYNC6vMaVSyIADyZZnuL5zwCq1mxFhKlAOA7S7k54u9sc+H9BxGec8A3Dk+oSGw4CwWIBZ1q3o032Atg5k9wMc5eeqnMHke5gL/nsLyD5jAHwb8KXznI7jvFrhTbsBS7riFxX4fhge1SzN/dtGNgpAL/TkdQYUY278aA6ehXGMU+dAWAxgjvvwzB7E+bd8ejZDuH+PMK6lOCafsxbQOkxWbuDUyOg10S+Pdlg18itVUNHFPAKKAHy1P1qQEqutv9IvMkHUvy3kMZU9f2QMqsm4N/LTc3Yp0rs10QcinToTGcj5+LvrbY7XVDu/rP/suOZ3cI4+yUnZk9Ql6YiMZ8NXEJx9/F1v/F/tiCV1toS6RZ7S1Y1dA6EkLwqbqJ0JJQ4UfYBpY2hVAOcxsOrOEdJ1cM+9gG9EuebvT3ZbYx0nT/pSkTnKImth4DXTBfAqySZgLYBBLyoE9MaxLVBQe/vWOGDqCrv58JhmyxnhDEzLdNADD+VD5g1dLlQVYWxxHx6/zeh7WJOtPooXgU0ewGw7wDRpURJA3AT6GnPg0gPQ4gUF85njwQM6CLhPpvzJZwRWIrxrFeZpBD+7aT2g+ql9X42MjF59lXwZySGQu5BgCZmBqeRRws9vUUY+baMzQRnLO0WGiLa9qpWSYiQIwnGYBYmfUxzhmas/N4tp0D9/7K94n8qUOnDIgInPvbpsj0/5XDZWHJcSl9CeAmCAUBWGN1Z3xbdSNa+/noeHlECU7vGkl3SMPOR1lAyU77E07P4XE4wSvvjwYgey59YZjwLbHEYT7bXK50oGfX4tpw98Xnc39Vj78z6gF69CkTnKAmRIYKqNdWxiy/67PHqdtgJQHuN3WwPaAqjaG5jC+6hec7kCpnqtw5gBc4qXs8ABU8/hCu9iXsIJ2rqDtlo8zlUOoHGlh/sdhTdzAn2u8OiVPITfeeojDnQb2XEvsAz4H8a4L3pNnmLbTDV4iIMOoe045jgjQsaMjIzSqNLKaB4t49+VvWkAUiWjmXumfnviqg0q5FHKiDdZ8v6Gy77qvqxuCK/fQumt6micYNEKRzgkpkH/jt7MpbjcvqTLzHKWfHJjAM4/+X1Uk5xKyKiKlJ0Atq2um7yj1+JfX75BLxwAUrJGxywvaXlDx40sH6EV5ziEkr0Ihb52FeBj1bUBc2Dcv2FeqGiAtYzf23Tl50xaQvQMptBCsifKEro7zEaxnHuMxYQuEanLC5iGZXj2D6YQ5glwtj2NYLqXQWOZz62XXMsKA1wfIvTgPvp7wQP8FrAXi/M+lsHzAKbhJM/gRYDvMbaX6SIP7R+YwlyVs/u4SxgZGb3aInCjjPyrPbQB/DNr2daP7TnbY8HKI4KVeSIDVFIVnUWQ3U6e3CcVNZ7GYHsG6ztjFpgGtVyZVCfabmwjr+mEdf3psndqonYt+/e/uWovUf/x1E/xvf++Fv8bxY1WX+p7vlR/hcWPkocUS/bjBGe3yGu4g15Acus6+4RXrfuyPUSg17qxOvqooib1MUynWfP11Q99Vuxxncgs+QXTME/0SbbMDPh7CKCdy+CtKoAYv6RgCgh5IyAwXcOWwNvJstMAprlkfWjnAUIEvCrX7XzMdwPzLH7G4obf8AC9cdh2n/Gf8/Hp9owMwwu7mL34VOP33KA3hnOHfCRyzWMJf1GTqW9k9Ipr3dFoeP2X0YK6joFYHS3b+rF6MirjeYfAJYhlvpRVcvxa6J2vuwq//V9/s59xEJROUMWiadvu6mx0YGZ9x8BD69rTbfVkDSxWFCb9O2YB6QhZ6+mum5sbqKzqibY+4Ve/OPJD6Nefd+bVtvXX1AXQ9+k2K3zhTPTn/SKz5AtMob0MUiqFu+pgYdg5BpOFaQbTMM5ZEhCYFgKy4/icnQYwXcLALEoW5LZiCwC7qycTlBigua7wsPs2kYbYzAaykxhrFrvWIJKtdFrE5qrPB2DmsXjWIfsaRkZGr7YIRIoIzh4ATPxaq8ggkVcvh/oU8zOG09bYI/2FYhpF19xH825d/6Ub9cVO8iF7THaR+rWdgLT4VOeNlF84GiIDYWrzQmMA/Zxuo3mZIM/xBpFZmgqYljGgu5Rkr8whJPJMyhr/OABnS0BgOpm1XsJsE5aFHwcIptbcxJiXcVEawPRd5pUN8v/CEJKyutn1snANAJprWMa9gMMwJjUH92+5HM8L25EkkekZ+tXpcyeKPnYf3xRGRkavtsgztIj+EN8lGyQo8WQ416qIk1ExPwTY+QQUPVa1Hq9GENZKnt+UIcwXmF4ZKARA358mGyS7R57h2zQ/vae7Yu10/y4QeFXS8Q/pPi6jbZ+yRcCiZyuH2o8E0P9pN3ou7mVKmEqKYLqaAV13ku1/AAzqUjW+ywkATEcByBeZXQL0jQQIpjNY3yfIlqYBTLewPp0VwWkW7u8H/CCAfgzj2eYy7gfo02Pb8xqcDpK1SUv2YfYC0Ivr6xLaxqcAptlkPSyJL237TRsZGWWICMqyaSm3iP4YFzV2kpEH9RR9nnr+iX/H6NP+2Tb6g03H+un8GxlVqrGhqz9M2xrNtsdhjQGfdAyfOM7+TeMqaOzqE9OpxsiNEMFgYSPrH/pEn7yfOE6m9h3nOz9rja5VRElLs+l3C051DOQ2ThOIU99CrL/OWDv4MYyjI1Hf1fPUTzKrPT5XyhwOsHNxXG5TnTOyG0EuzQahqYDpWsVjqt/+Z4PGczcBIFoWAJjqkrDmkkUCBFNrbvrT7DHlYBrkzh4bnCx07YtCFGNMBHL3GZguFMGoAM/cZqFqJwPHVS5jGpsqmBqPqZGRkZGRUeZpKmC6zUOM6XuAmP1kH0l2lAHFSbJQAGCaq9vEPkAwzSO7x5a+iyQQf+YTTDejPQ6mm9jctIng1A7v9kcJrJ15ntdofv82A7llIhi9R/ZE84wcYt7QhAmDAMqnfmNMcV4/CwMpFkZGRkZGRkYZIb9gisxufVY+2uzGvprVGuthMYtz0gimc8nyAgLTN8nGNFn5OQxMDwpv2oIl67CUMf5o8n4EVCVrGV4SajT3ooYlQTVqXhRqX7jnqWsGwJvM/RkBvBZpvfL+s/J5Els3WUat0hkZGRkZGb3O8gums9my7kMN9K1CTOICt3AABnn70wim8ljDKYDpYRZfmqgIyCi+PyG8aS9CIUIS4F5CO6MBeCdD6E9DsqglBoHzNIlGcVitSF3L8IwsSlLUYNSlmlaIVf8a81EtaimrYLY/gG3LjIyMjIyMjAKSHzANYaP8CSyz7sExeYumOg9VeHKYR+wWWV6awTQEEMyfCpgC1p6w/ua7LHd3e4CdELyTRzV7r44xCAz72A5qR4KyoA8xVjctZ7sBHNB4OG+x5e/ZPp6vPQnu73GMPytJwlbUeTZ5G+r2WgDwsI8XjPtmqygjIyMjI6PMUhZZs0cwfZd5sJqlc2UQWuUjVnUMbfvVcR9gutbxZPoG0yKyiFMrXzu2g8zrONcD6A6RrUvysjDq0ROYi/EVS/B7AHCX7SEhqDtJCMFGshEGgdmeavir3uVCwO0akVw7nRch7TOyy5n3pFtZFSOs4ZndnpGRkZGRkVFGKZusjQHJDE0s315A0jigaZYGRI4CFLO9ePhY8kon2vSjJhZSUJBkI/a7ACuu9UnANAtbY/WyDd/XuHhDi6W67TM0c7QQ3uIml3nKY6A47NT61163CcAsA/Ug7h2U1Bsed9ljNgzv5xiegxMuntMZAMYqjJFf5xiSvrL8PCOYs5maftWg3xHdswDvaCegdJdZwjcyMjIyMsocZQF+1rFkmxEsr+5CxvQ2ZM3fBRxE4GXK0sDrdsDrYwBdbhIP32aWMDQBuCh2W47Fd3msjGUckFSL/nLbDUB8BHgtnLw2IKWFgWkUmeAfYq/Pg0hwegq4q/S4fL0S2zJNAKS2AhhXkJWjn0O4dr6HJJ0GzOkYoGoHIHo12qtEP1dJc7SQja8ZHtocl2ehmHlpOQznSgAXArTexxjvAzTL0acy9PES2RFcU35GRnBP1iYJ4chjzwiPb50vPyO4zl70ux/P7xy0MR+e1zu4l+UGSo2MjP7P3v2zNhWFcQAOoXQoRYqIFBEncRRxFrlZxE/h2KGIY3HqUkQcpNhEv4WTgzhIR+nk5NRP0EHSpt0c6qm8yOGc3Egkpak+D/zIzc2959x/hTcnNykwX+7EF0peR3FTJV57EcXa/UmFTSzzplh3PV5r+4h3u+wzRu1u/eFj9c0oevpT5GlWzKzHfrUtux33IT6P4unmX/w3o60oGPdjJPpb5H0UW8tTjGg/itsWvsZI434UXx/jTUS5favl/sXzhxOuha2W47DWMqp7OwrBz1HsDWP/9uLe3wdF8dhtuUaetVwjCynrLdfnywnn5G72puJLyl7kU8qGe0oBYH51J2VGbU3d9wy2e2zOab/bdKP4vBpF1I2UlSjyphaF2pUYAVyNdpemPEadczgfSymbMZp7L7Zx4YKvkezYZ8cK+L8d9pvN0aB3MOqLyLgcp7+Pk7e9WfwmJFyUazFq+iNGdFc6APMoFaavjvq908Od5nR49phlmD3GdPY8X74pl6/X34nHLFVf5by0TdFPStZHTKfE/LK/SNV+vj1n60Xy9qO/fDrfnpTiebzeeiya6lhFX2ViftVXPq/ch6rvYXkex7YTy9Ztl+c0Uux3tU5KfU6K5atl632ffL3V2xnzWtJ+nKr2m/oazdo+GvROT971nnTgcluK+zcPft0WADCPfhemIpJHYcq/ZDG+ePU97p9d7ADMo1SYro36ze6RiIzNaNDsHg+axx24nK7Hz0F9iC+KLXcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICf7MGBAAAAAACQ/2sjqKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoq7MGBAAAAAACQ/2sjqKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoq7MGBAAAAAACQ/2sjqKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoq7MGBAAAAAACQ/2sjqKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoq7MGBAAAAAACQ/2sjqKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqoq7cEhAQAAAICg/69dYQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgESlgPlFbIXbkAAAAASUVORK5CYII="
            }
        };

        return doc;
    };

    sedPdfExporter.exportPdf(config);

}
