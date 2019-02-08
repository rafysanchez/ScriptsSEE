
function obterPesquisaPreco(input) {

    var idNotaFiscal = $(input).attr('data-id');
    if (parseInt(idNotaFiscal) > 0) {

        var newURL = window.location.protocol + "//" + window.location.host + "/";

        $.ajax({
            cache: false,
            dataType: 'Json',
            url: newURL + 'prestacaocontas/NotaFiscal/ObterPesquisaPreco',
            type: 'Post',
            data: { idNotaFiscal: idNotaFiscal },
            success: function (data) {
                gerarPdfPesquisaPreco(data);
            },
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });
    }
    else
    {
        mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
    }
}

function gerarPdfPesquisaPreco(dados) {

    var config = {
        pageOrientation: "landscape",
        pageSize: "A4",
        title: "Pesquisa de Preço",
    };
   
   
    sedPdfExporter.normalizeConfig(config);
  
    config.RazaoSocialAPM = dados.APM.Nome;
    config.CNPJAPM = dados.APM.NrCnpj;
    config.RazaoSocialVencedor = dados.RazaoSocialProponenteA;
    config.RazaoSocialProponenteB = dados.RazaoSocialProponenteB;
    config.RazaoSocialProponenteC = dados.RazaoSocialProponenteC;
    config.CNPJVencedor = dados.CnpjProponenteA;
    config.CNPJProponenteB = dados.CnpjProponenteB;
    config.CNPJProponenteC = dados.CnpjProponenteC;
    config.ListaItens = dados.ListaItens;
    config.TotalVencedor = dados.TotalProponenteA;
    config.TotalProponenteB = dados.TotalProponenteB;
    config.TotalProponenteC = dados.TotalProponenteC;
    config.ItensMenorValor = dados.ItensMenorValor;
    config.ValorItensMenorValor = dados.TotalProponenteA;
    config.Itens = dados.Itens;
    

    var body = [];
    var index = 0;
    var totalItens = dados.ListaItens.length;
    var numeroIntes = "";
    for (var key in dados.ListaItens) {
        if (dados.ListaItens.hasOwnProperty(key)) {
            var data = dados.ListaItens[key];
            var row = new Array();
            
            index += 1;
            row.push((index).toString());
            row.push(data.DsItem.toString());
            row.push(data.DsUnidadeAbrev.toString());
            row.push(data.NrQuantidade.toString());
            row.push(data.VlFornecedorA.toString());
            row.push(data.VlFornecedorB.toString());
            row.push(data.VlFornecedorC.toString());
            body.push(row);

            numeroIntes += index + ',';
            //totalItens += index;
        }
    }
    config.numeroItens = numeroIntes.substring(0, (numeroIntes.length - 1));
    config.body = body;
    if (totalItens > 4) {
        config.quebraPagina = 'before';
    } else {
        config.quebraPagina = '';
    }
  
    config.docGenerator = function (config) {
        var doc = {

            
            pageMargins: [30, 90, 30, 30],
            header: function (currentPage, pageCount) {
                return [
                    {
                        margin: [40, 10, 40, 0],
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
                                                text: "\nPrograma Dinheiro Direto na Escola (PDDE)\n\n", bold: true, fontSize: 14, margin: [0, 0, 0, 5]

                                            },
                                            {
                                                text: "Consolidação de Pesquisa de Preço", fontSize: 12

                                            }
                                        ],
                                        alignment: "right",
                                    }
                                ],
                            ]
                        },
                        layout: "noBorders"
                    },
                ];
            },

            content: [
                         
                        {
                            style: 'tabela',
                            table: {
                                widths: ['*', '*'],
                                headerRows: 1,
                                body: [
                                        [{ text: 'BLOCO I - IDENTIFICAÇÃO DA UNIDADE EXECUTORA PRÓPRIA(UEx)', colSpan: 2, fontSize: 12, bold: true }, {}],
                                        [{ text: '01 - Razão Social' + '\n' + config.RazaoSocialAPM + '\n', fontSize: 8 }, { text: '02 - CNPJ' + '\n' + config.CNPJAPM + '\n', fontSize: 8 }],

                                ]
                            },

                        },
                        {
                            style: 'tabela',
                            table: {
                                widths: ['*', '*', '*'],
                                headerRows: 1,
                                body: [
                                        [{ text: 'BLOCO II - IDENTIFICAÇÃO DOS PROPONENTES(Fornecedores de produtos ou prestadores de serviço.)', colSpan: 3, fontSize: 12, bold: true }, {}, {}],
                                         [
                                             { text: '03 - Razão Social do Proponente (A)' + '\n' + config.RazaoSocialVencedor + '\n\n04 CNPJ do proponente (A)\n' + config.CNPJVencedor + '\n', fontSize: 8 },
                                             { text: '03 - Razão Social do Proponente (B)' + '\n' + config.RazaoSocialProponenteB + '\n\n04 CNPJ do proponente (B)\n' + config.CNPJProponenteB + '\n', fontSize: 8 },
                                             { text: '03 - Razão Social do Proponente (C)' + '\n' + config.RazaoSocialProponenteC + '\n\n04 CNPJ do proponente (C)\n' + config.CNPJProponenteC + '\n', fontSize: 8},

                                         ]

                                ]
                            },
                        },
                        
                                     
                        {
                            
                            style: 'tabela',
                            table: {
                                widths: [32, 200, 40, 40, '*', '*', '*'],
                                headerRows: 1,
                                body: [

                                        [{ text: 'BLOCO III - IDENTIFICAÇÃO DOS BENS ADQUIRIDOS OU PRODUZIDOS', colSpan: 7, fontSize: 12, bold: true }, {}, {}, {}, {}, {}, {}],

                                        [                                          	
                                            { text: '05 - Item', fontSize: 8 },
                                            { text: '06 - Descrição dos produtos e serviços', fontSize: 8 },
                                            { text: '07 - Unid', fontSize: 7 },
                                            { text: '08 - Quant.', fontSize: 8 },
                                            { text: '09 - Valor Proponente (A)', fontSize: 8 },
                                            { text: '10 - Valor proponente (B)', fontSize: 8 },
                                            { text: '11 - Valor Proponente (C)', fontSize: 8 }
                                        ],
                                         [

                                             	{
                                             	  
                                             	    layout: 'lightHorizontalLines',
                                             	    colSpan: 7,
                                             	    fontSize: 7 ,
                                             	    table: {
                                             	             widths: [32, 200, 40, 40, '*', '*', '*'],
                                             	             body:config.body
                                             	           }
                                             	   
                                             	},
                                                {},
                                                {},
                                                {},
                                                {},
                                                {},
                                                {}

                                         ],
                                 
                                        [

                                            { text: '', fontSize: 8, colSpan: 4, border: [true, false, false, false] },
                                            {}, {}, {},
                                            { text: 'Proponente (A)', fontSize: 8 },
                                            { text: 'Proponente (B)', fontSize: 8 },
                                            { text: 'Proponente (C)', fontSize: 8 },
                                        ],
                                          [

                                            { text: '12 - Valor Total', fontSize: 8, colSpan: 4, alignment: 'right', border: [true, false, false, false] },
                                            {}, {}, {},
                                            { text: config.TotalVencedor.toString(), fontSize: 8 },
                                            { text: config.TotalProponenteB.toString(), fontSize: 8 },
                                            { text: config.TotalProponenteC.toString(), fontSize: 8 },
                                          ],
                                         [

                                            { text: '13 - Valor Total da Proposta', fontSize: 8, colSpan: 4, alignment: 'right', border: [true, false, false, true] },
                                            { text: '', fontSize: 8 },
                                            { text: '', fontSize: 8 },
                                            { text: '', fontSize: 8 },
                                            { text: '', fontSize: 8 },
                                            { text: '', fontSize: 8 },
                                            { text: '', fontSize: 8 },
                                         ],



                                ],

                            },
                        },
     
                         { text: '', pageBreak: config.quebraPagina },
                        {
                            style: 'tabela',
                            table: {
                                widths: ['*', 300, '*'],
                                headerRows: 1,
                                body: [
                                        [{ text: 'BLOCO IV - APURAÇÃO DAS PROPOSTAS', colSpan: 3, fontSize: 12, bold: true }, {}, {}],
                                        [

                                            { text: '', fontSize: 8, border: [true, false, false, false] },
                                            { text: '14 - Itens de menor valor', fontSize: 8, border: [false, false, false, false] },
                                            { text: '15 - Valor Total dos Itens', fontSize: 8, alignment: 'right', border: [false, false, true, true] },

                                        ],
                                         [
                                            { text: 'Proponente A', fontSize: 8, border: [true, false, false, false] },
                                            { text: config.numeroItens.toString(), fontSize: 8 },
                                            { text:  config.TotalVencedor.toString(), fontSize: 8 },

                                         ]
                                         ,
                                         [
                                            { text: 'Proponente B', fontSize: 8, border: [true, false, false, false] },
                                            { text: '', fontSize: 8 },
                                            { text: '', fontSize: 8 },

                                         ]
                                         ,
                                         [
                                            { text: 'Proponente C', fontSize: 8, border: [true, false, false, false] },
                                            { text: '', fontSize: 8 },
                                            { text: '', fontSize: 8 },

                                         ]
                                        ,
                                         [
                                            { text: '', border: [true, false, false, true] },
                                            { text: '16 - Valor Total', fontSize: 8, alignment: 'right' },
                                            { text: config.TotalVencedor.toString(), fontSize: 8 },

                                         ]

                                ]
                            },
                        },

                        //{ text: '', pageBreak: config.quebraPagina },

                        {
                            style: 'tabela',
                            table: {
                                widths: ['*', '*', '*'],
                                headerRows: 1,
                                body: [
                                            [{ text: 'BLOCO V - AUTENTICAÇÃO', colSpan: 3, fontSize: 12, bold: true },
                                                {},
                                                {}
                                            ],
                                         
                                            

                                       [
                                            { text: '\n17 - Local e Data\n\n____________________________________\n\n', fontSize: 10, alignment: 'center', border: [true, false, false, true] },
                                            { text: '\n18 - Nome do Dirigente ou Representante\n\n____________________________________\n\n', fontSize: 10, alignment: 'center', border: [false, true, false, true] },
                                            { text: '\n19 - Assinatura do Dirigente ou Representante\n\n____________________________________\n\n', fontSize: 10, alignment: 'center', border: [false, true, true, true] },

                                         ]

                                ]
                            },
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
