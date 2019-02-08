function obterTermoDoacao(idLancamento) {
    if (parseInt(idLancamento) > 0) {
        
        $.ajax({
            cache: false,
            dataType: 'JSON',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            url: urlAbsoluta + 'PrestarContasFNDEPDDE/GerarTermoDeDoacao',
            type: 'POST',
            data: JSON.stringify({ idLancamento: idLancamento }),
            success: function (data) {
                //console.log(data.nfItem);
                if (data.nfItem.length > 0) {
                    //if (data != null && data != undefined)
                    gerarTermoDoacao(data);
                }
                else {
                    mensagemAlerta.Alerta('Não existem itens para serem exibidos.');
                }

            },
            contentType: 'application/json; charset=utf-8',
            error: function (jqXHR, txtStatus, errorThrown) {
                mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
            }
        });

    }
    else {
        mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
    }
}

function gerarTermoDoacao(data) {

    var config = {
        pageSize: "A4",
        pageOrientation: 'landscape',
        title: "Termo de Doação"
    };
    config.debug = true;

    sedPdfExporter.normalizeConfig(config);

    config.NmEscola = data.escola.Nome;
    config.NmPrograma = data.NomePrograma;
    config.AnoExercicio = data.NrAnoBase;


    var body = [];
    body.push([{ text: 'N° ORD', rowSpan: 2, colSpan: 1, fontSize: 9 },
            { text: 'Descrição do Bem', rowSpan: 2, colSpan: 1, fontSize: 9 },
            { text: 'QTDE', rowSpan: 2, colSpan: 1, fontSize: 9 },
            { text: 'Nota Fiscal', colSpan: 2, fontSize: 9 },
            { text: "" },
            { text: 'VALOR (R$)', colSpan: 2, fontSize: 9 }, { text: "" }
    ]);

    body.push([
            { text: "" },
            { text: "" },
            { text: "" },
            { text: 'N°', fontSize: 9 },
            { text: 'DATA', fontSize: 9 },
            { text: 'UNITARIO', fontSize: 9 },
            { text: 'TOTAL', fontSize: 9 }

    ]);

    var index = 0;
    var dados = data.nfItem;
    var total = 0;
    if (dados.length > 0) {
        for (var key in dados) {
            body.push([
                (parseInt(key) + 1).toString(),
                dados[key].DsItem.toString(),
                dados[key].NrQuantidade.toString(),
                dados[key].NrNotaFiscal.toString(),
                dados[key].DtEmissaoStr.toString(),
                dados[key].VlUnitarioFornecedorVencedorStr.toString(),
                dados[key].VlTotalItensNfStr.toString()
            ]);
            total += parseFloat(dados[key].VlTotalItensNf.toString().replace(",", "."));
        }
    } else {
        var row = new Array();

        row.push("");
        row.push("");
        row.push("");
        row.push("");
        row.push("");
        row.push("");
        row.push("");
        body.push(row);

    }
    if (total) {
        total = total.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    body.push([
                            { text: 'TOTAL\n\n', colSpan: 6, fontSize: 9 },
                            { text: "" },
                            { text: "" },
                            { text: "" },
                            { text: "" },
                            { text: "" },
                            total.toString()

    ]);

    var a1 = config.NmEscola;
    var a2 = config.NmPrograma + "/" + config.AnoExercicio;

    var a3 = "                       RECEBI O(S) BEM(S) ACIMA, A SER(EM) INCORPORADO(S) AO PATRIMÔNIO DO ESTADO.";

    //    config.numeroItens = numeroIntes.substring(0, (numeroIntes.length - 1));

    config.body = body;
    config.pageMargins = [70, 150, 70, 170 ];
    config.docGenerator = function (config) {

        var doc = {
            header: [
                {
                        margin: [70, 30, 70, 30],
                        stack: [

                                {
                                    text: "TERMO DE DOAÇÃO\n\n",
                                    alignment: "center",
                                    fontSize: 18,
                                    bold: true
                                }
                                ,
                                {
                                    text: [
                                            { text: "Pelo presente instrumento, a Associação de Pais e Mestres da Escola Estadual ", fontSize: 12 },
                                            { text: a1, fontSize: 12, bold: true },
                                            { text: " faz, em conformidade com a legislação aplicável", fontSize: 12 },
                                            { text: " ao Programa Dinheiro Direto na Escola ", fontSize: 12 },
                                            { text: a2, fontSize: 12, bold: true },
                                            { text: " e demais normas pertinentes à matéria, a doação do(s) bem(ns) discriminado(s) ou produzido(s)", fontSize: 12 },
                                            { text: " com recursos do referido Programa, à ", fontSize: 12 },
                                            { text: " Secretaria da Educação do Estado de São Paulo", fontSize: 12, bold: true },
                                            { text: ", para que seja(m) tomado(s) e incorporado(s) ao seu patrimônio público e destinado(s) à escola acima identificada, à qual cabe a responsabilidade pela guarda e conservação do(s)", fontSize: 12 },
                                            { text: " mesmo(s).\n\n", fontSize: 12 }
                                        ]

                                }
                            ]
                }
            ],
            content: [
                    {
                        //margin: [70, 0, 70, 30],
                        table:
                        {

                            widths: ["10%", "40%", "10%", "10%", "10%", "10%", "10%"],
                            //headerRows: 6,
                            // keepWithHeaderRows: 1,
                            body: config.body

                        },
                        fontSize: 9
                    },

            ],
            footer: [
	        {
	            margin: [70, 0, 70, 30],
	            alignment: "center",
	            //stack: [
	            //{
	            table: {
	                alignment: "rigth",
	                width: ["10%", "90%"],
	                body: [
                        [
                         { text: "ESPAÇO BR", color: "#FFFFFF" },
                         {
                             stack: [
                                 { text: "ENTREGA : ", fontSize: 9, bold: "true", alignment: "left" },
                                 {
                                     text: [
                                         {
                                             text: "\n_____________________________________\nAssinatura do Diretor Executivo(APM)", alignment: "right", fontSize: 9

                                         }]
                                 }
                             ]
                         }

                        ],
                        [
                         { text: "" },
                         {
                             stack: [
                                     {
                                         text: [
                                                 { text: "RECEBIMENTO :", fontSize: 9, alignment: "left" },
                                                 { text: a3, fontSize: 9, alignment: "rigth" }, "\n\n"
                                         ]
                                     },
                                     {
                                         text: [
                                             { text: "\n___________________________________________________\nCarimbo e Assinatura do Diretor da Unidade Escolar\n\n", alignment: "right", fontSize: 9 }]
                                     },
                                     {
                                         text: [
                                             { text: "ESPAÇO BRANCO ESPAÇO BRANCO ESPAÇO BRANCO ESPAÇO BRANCO ESPAÇO BRANCO ESPAÇO BRANCO ESPAÇO BRANCO ESPAÇO BRANCO ESPAÇO BRANCO ESPAÇO", color: "#FFFFFF", fontSize: 8 },
                                             {
                                                 text: "                     \n____________________________________                                                                   ____________________________________                            \n 1-Nome e Assinatura da Testemunha                                                                  2-Nome e Assinatura da Testemunha", alignment: "center", fontSize: 9
                                             }
                                         ]
                                     }
                             ]
                         }
                        ]
	                ]
	            }
	            //}

	            // ]      
	        }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'center'
                },
                body: {
                    fontSize: 9,
                    alignment: 'justify'


                }
            }
        }

        return doc;
    };
    sedPdfExporter.exportPdf(config);
}


