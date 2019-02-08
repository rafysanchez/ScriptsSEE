function gerarRelacaoBens(_result) {
    debugger;

    var config = {
        pageOrientation: "landscape",
        pageSize: "A4",
        title: "Relação de Bens",
    };

    sedPdfExporter.normalizeConfig(config);

    config.programa = _result[0].nmPrograma != undefined ? _result[0].nmPrograma : "";
    config.exercicio = _result[0].nrAnoBase != undefined ? _result[0].nrAnoBase : "";
    config.razaosocial = _result[0].nmAPM != undefined ? _result[0].nmAPM : "";
    config.cnpj = _result[0].nrCNPJAPM != undefined ? _result[0].nrCNPJAPM : "";
    config.endereco = _result[0].dsLogradouro != undefined ? _result[0].dsLogradouro : "";
    config.municipio = _result[0].dsMunicipio != undefined ? _result[0].dsMunicipio : "";
    config.uf = _result[0].dsUF != undefined ? _result[0].dsUF : "";

    var Grid = [];
    
    var totais = 0;

    Grid.push(  [
                    { text: "BLOCO 2 - IDENTIFICAÇÃO DOS BENS ADQUIRIDOS OU PRODUZIDOS", colSpan: 9, fillColor: 'lightgrey', fontSize: "10" },
                    { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }
                ],
                [
                    { text: "08-Documento", colSpan: 3, alignment: "center", fontSize: "9" },
                    { text: "" },
                    { text: "" },
                    { text: "09-Especificação dos Bens", rowSpan: 2, alignment: "center", fontSize: "9" },
                    { text: "10-Qtde", rowSpan: 2, fontSize: "9" },
                    { text: "11-Valor(R$)", colSpan: 2, alignment: "center", fontSize: "9" },
                    { text: "" },
                    { text: "12-Confirmação Setor de Patrimônio", colSpan: 2, fontSize: "9" },
                    { text: "" }
                ],
                [
                    { text: "Tipo", alignment: "center", fontSize: "9" },
                    { text: "Número", alignment: "center", fontSize: "9" },
                    { text: "Data", alignment: "center", fontSize: "9" },
                    { text: "" },
                    { text: "" },
                    { text: "Unitário", alignment: "center", fontSize: "9" },
                    { text: "Total", alignment: "center", fontSize: "9" },
                    { text: "Sim", alignment: "center", fontSize: "9" },
                    { text: "Não", alignment: "center", fontSize: "9" }
                ]);

    var pagebreak = 0;
    for (var i = 0; i < _result.length; i++) {

        Grid.push(
                [
                    { text: _result[i].dsTipo.toString(), fontSize: "9" },
                    { text: _result[i].nrNotaFiscao.toString(), fontSize: "9" },
                    { text: _result[i].dtEmissao, fontSize: "9", alignment: "center" },
                    { text: _result[i].dsItem.toString(), fontSize: "9" },
                    { text: _result[i].nrQuantidade.toString(), fontSize: "9", alignment: "center" },
                    { text: _result[i].vlUnitario.toLocaleString("pt-BR", { minimumFractionDigits: 2 }), fontSize: "9", alignment: "right" },
                    { text: _result[i].vlTotalItem.toLocaleString("pt-BR", { minimumFractionDigits: 2 }), fontSize: "9", alignment: "right" },
                    { text: "" },
                    { text: "" }
                ]);

        pagebreak++;

        //Quebra página após 15 linhas e recria o cabeçalho para continuar a listagem.
        if (pagebreak == 15)
        {
            Grid.push(
                [
                    { text: "BLOCO 2 - IDENTIFICAÇÃO DOS BENS ADQUIRIDOS OU PRODUZIDOS", colSpan: 9, fillColor: 'lightgrey', pageBreak: "before", fontSize: "10" },
                    { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }, { text: "" }
                ],
                [
                    { text: "08-Documento", colSpan: 3, alignment: "center", fontSize: "9" },
                    { text: "" },
                    { text: "" },
                    { text: "09-Especificação dos Bens", rowSpan: 2, alignment: "center", fontSize: "9" },
                    { text: "10-Qtde", rowSpan: 2, fontSize: "9" },
                    { text: "11-Valor(R$)", colSpan: 2, alignment: "center", fontSize: "9" },
                    { text: "" },
                    { text: "12-Confirmação Setor de Patrimônio", colSpan: 2, fontSize: "9" },
                    { text: "" }
                ],
                [
                    { text: "Tipo", alignment: "center", fontSize: "9" },
                    { text: "Número", alignment: "center", fontSize: "9" },
                    { text: "Data", alignment: "center", fontSize: "9" },
                    { text: "" },
                    { text: "" },
                    { text: "Unitário", alignment: "center", fontSize: "9" },
                    { text: "Total", alignment: "center", fontSize: "9" },
                    { text: "Sim", alignment: "center", fontSize: "9" },
                    { text: "Não", alignment: "center", fontSize: "9" }
                ]);
            pagebreak = 0;
        }

        totais = totais + _result[i].vlTotalItem;
    }

    var vlTotal = totais.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
    try
    {
        vlTotal = vlTotal.replace('R$', '');
    } catch (e) {
    }

    Grid.push([
                { text: "\n\n", colSpan: 5 }, { text: "" }, { text: "" }, { text: "" }, { text: "" },
                { text: "13-TOTAL", alignment: "center" },
                { text: vlTotal, alignment: "right" },
                { text: "14- Visto de Confirmação", colSpan: 2, fontSize: "7" }, { text: "" }
            ]);

    //totais.toLocaleString("pt-BR", { minimumFractionDigits: 2 })

    config.Itens = Grid;

    //config.debug = true;

    config.docGenerator = function (config) {

        config.pageMargins = [40, 80, 40, 40];

        var doc = {

            header: {
                stack: [
                    {
                        table: {
                            widths: ["50%", "50%"],
                            body: [
                                [
                                    {
                                        image: 'data:image/png;base64,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',
                                        width: 240,
                                        margin: [0, 5, 0, 0]
                                    },
                                    {
                                        stack: [
                                            { text: "PRESTAÇÃO DE CONTAS" },
                                            { text: "Relação de Bens Adquiridos ou Produzidos" }
                                        ],
                                        alignment: "right",
                                        margin: [0, 20, 0, 0]
                                    }
                                ],
                            ]

                        },
                        layout: "noBorders"
                    },
                    {
                        table: {
                            widths: ["70%", "20%", "10%"],
                            body: [
                                    [
                                        { text: "BLOCO 1 - IDENTIFICAÇÃO", colSpan: 3, fillColor: 'lightgrey', fontSize: "10" },
                                        { text: "" },
                                        { text: "" }
                                    ],
                                    [
                                        {
                                            stack: [
                                                { text: "01-Programa/Ação : ", fontSize: "9" },
                                                { text: [{ text: config.programa, bold: "true", fontSize: "9" }] }
                                            ], colSpan: 2
                                        },
                                        { text: "" },
                                        {
                                            stack: [{ text: "02-Exercício: ", fontSize: "9" },
                                                    { text: [{ text: config.exercicio, bold: "true", fontSize: "9" }] }
                                            ]
                                        }
                                    ],
                                    [
                                        {
                                            stack: [
                                                    { text: "03-Nome da Razão Social", fontSize: "9" },
                                                    { text: [{ text: config.razaosocial, bold: "true", fontSize: "9" }] }
                                            ]
                                        },
                                        {
                                            stack: [
                                                    { text: "04-Número do CNPJ", fontSize: "9" },
                                                    { text: [{ text: config.cnpj, bold: "true", fontSize: "9" }] }
                                            ], colSpan: 2
                                        },
                                        { text: "" }
                                    ],
                                    [
                                        {
                                            stack: [
                                                    { text: "05-Endereço", fontSize: "9" },
                                                    { text: [{ text: config.endereco, bold: "true", fontSize: "9" }] }
                                            ]
                                        },
                                        {
                                            stack: [
                                                    { text: "06-Munícipio", fontSize: "9" },
                                                    { text: [{ text: config.municipio, bold: "true", fontSize: "9" }] }
                                            ]
                                        },
                                        {
                                            stack: [
                                                    { text: "07-UF", fontSize: "9" },
                                                    { text: [{ text: config.uf, bold: "true", fontSize: "9" }] }
                                            ]
                                        }
                                    ]
                            ],
                        }

                    },
                ],

                margin: [40, 20]
            },
            content: [
                {
                    table: {
                        widths: ["5%", "10%", "10%", "32%", "6%", "12%", "13%", "6%", "6%"],
                        body: config.Itens
                    }
                },
            ],
            footer: {
                stack: [
                    {
                        table: {
                            widths: ["30%", "30%", "40%"],
                            body: [
                                    [
                                        { text: "BLOCO 3 - AUTENTICAÇÃO", colSpan: 3, fillColor: 'lightgrey', fontSize: "10"  },
                                        { text: "" },
                                        { text: "" }
                                    ],
                                    [
                                        { text: "\n\n_________________________________________\nLocal e Data", alignment: "center", fontSize: "9" },
                                        { text: "\n\n_________________________________________\nNome do Diretor Executivo da APM", alignment: "center", fontSize: "9" },
                                        { text: "\n\n_______________________________________________________\nNome do Diretor Executivo da APM ou Representante Legal", alignment: "center", fontSize: "9" }
                                    ]
                            ]
                        }

                    }
                ],
                margin: [40, 0]
            },
            pageMargins: [40, 180, 40, 110]
        };
        return doc;
    };

    sedPdfExporter.exportPdf(config);

}
