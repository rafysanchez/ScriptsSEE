function GerarPDF(id, cpf, docContrato) {
    if (docContrato == undefined)
        docContrato = false;
    else {
        GerarPdfContrato(id);
        return;
    }

    MostrarOpcoes(
             [
                 {
                     id: [1, cpf, id],
                     nome: "Contrato/Portaria"
                 },
                 {
                     id: [2, cpf, id],
                     nome: "Extinção/Dispensa"
                 },
             ],
             ItemSelecionado,
             "Escolha o tipo de documento",
             "",
             "md",
             "nome",
             "id"
         );
}
function ItemSelecionado(valor, valor2, indice) {

    var codigoEventual = "";
    var cpf = "";

    for (var i = 2; i < valor.length; i++)
    {
        //inicia eventual
        if (valor[i] == ",") {
            codigoEventual = codigoEventual + valor[i + 1];
            i++;
        }
        else if (codigoEventual != "")
            codigoEventual = codigoEventual + valor[i];
        else
            cpf = cpf + valor[i];
    }

    cpf = cpf.replace(",", "");

    if (valor[0] == "2") {
        GerarPdfExtincaoDispensa(codigoEventual);
    }
    else {
        GerarPdfContrato(codigoEventual, cpf);
    }
}

function GerarPdfExtincaoDispensa(codigoEventual) {
    $.ajax({
        url: "/Eventual/ImprimirExtincaoEventual",
        type: "POST",
        data: { codigoEventual: codigoEventual },
        dataType: "json",
        success: function (data, textStatus, xhr) {

            if (data.IsDocNovo)
                criarPDFExtincao(data);
            else
                criarPDFDispensa(data);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message);
        }
    });
    return;
}
function GerarPdfContrato(codigoEventual, cpf) {
    $.ajax({
        url: "/Eventual/GerarPDFContrato",
        type: 'POST',
        dataType: "JSON",
        data: {
            idEventual: parseInt(codigoEventual),
            NR_CPF: cpf
        },
        success: function (data) {

            if (data.TipoException == "erro") {
                Mensagem.Alert({
                    titulo: data.Title,
                    mensagem: data.Message,
                    tipo: "alerta",
                    escondido: data.Escondido,
                    botao: "Fechar"
                });
                return false;
            }
            else {
                if (data.IsDocNovo)
                    criarPDFContratoNovo(data);
                else
                    criarPDFContratoAntigo(data);
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.Alert({
                titulo: jqXHR.responseJSON.Title,
                mensagem: jqXHR.responseJSON.Message,
                tipo: jqXHR.responseJSON.TipoException,
                escondido: jqXHR.responseJSON.Escondido,
                botao: "Fechar"
            });
        }
    });
}

function criarPDFContratoAntigo(dados) {
    var config = {
        pageOrientation: "portrait",
        pageSize: "A4",
        pageMargins: [30, 10, 30, 0],
        title: "Eventual",
    };
    config.dados = dados;

    sedPdfExporter.normalizeConfig(config);

    config.docGenerator = function (config) {
        var dd = {
            content: [
                {
                    table: {
                        widths: ['auto', '*'],
                        body: [
                            [{ width: 44, alignment: 'center', image: 'data:image/jpeg;base64,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', border: [true, true, false, true] },
                            { border: [false, true, true, true], margin: [0, 6, 0, 0], stack: [{ text: 'GOVERNO DO ESTADO DE SÃO PAULO', fontSize: 14, bold: true, style: 'center' }, { text: 'SECRETARIA DE ESTADO DA EDUCAÇÃO', fontSize: 14, bold: true, style: 'center' }] }]
                        ]
                    }
                },
                {
                    table: {
                        widths: ['*', 20, 'auto'],
                        body: [
                            [{ text: 'COORDENADORIA DE ENSINO - COGSP', style: { bold: true, } }, { text: 'UO:', style: { bold: true, } }, config.dados.CodigoUO.toString()],
                            [{ text: 'DIRETORIA DE ENSINO - ' + config.dados.NomeDiretoria, style: { bold: true, } }, { text: 'UD:', style: { bold: true, } }, config.dados.CodigoUD.toString()]
                        ]
                    },
                    margin: [0, 3, 0, 0],
                },
                { text: 'PORTARIA ESPECIAL DE ADMISSÃO N° ' + config.dados.NumeroPortariaAdmissaoSequencia + '/' + config.dados.NumeroPortariaAdmissaoDiretoria + '/' + config.dados.NumeroPortariaAdmissaoAno, style: 'header' },
                { text: ['O Dirigente Regional de Ensino, no uso de suas atribuições, expede a presente Portaria para ', { text: 'ADMITIR', bold: true, pageBreak: 'after', }, ', nos termos do artigo 10 do Decreto n° 24.948 de 03 de abril de 1986, para ministração eventual de aulas no exercício de ', { text: '2007', bold: true }, ', conforme dias discriminados no verso.'] },
                {
                    columns: [
                        {
                            width: 40,
                            table: {
                                body: [
                                    [
                                        {
                                            columns: [
                                               { stack: ['D', 'A', 'D', 'O', 'S'], bold: true },
                                               { stack: ['P', 'E', 'S', 'S', 'O', 'A', ' I', 'S'], bold: true, margin: [5, 0, 0, 16] }
                                            ]
                                        }
                                    ]
                                ]
                            }
                        },

                        {
                            table: {
                                widths: ['*', 'auto', 'auto', 'auto', '*', '*', 'auto'],
                                body: [
                                    [{ text: 'Registro Geral N°', style: 'th', colSpan: 3 }, {}, {}, { text: 'DC', style: 'th' }, { text: 'UF', style: 'th' }, { text: 'Órgão Emissor', style: 'th' }, { text: 'Data da Emissão', style: 'th' }],
                                    [{ text: config.dados.RgNumero, style: 'center', colSpan: 3 }, {}, {}, { text: config.dados.RgDigito, style: 'th' }, { text: config.dados.RgUf, style: 'center' }, { text: config.dados.RgOrgao, style: 'center' }, { text: config.dados.DataEmissaoRgStr, style: 'center' }],
                                    [{ text: 'Nome', colSpan: 7, style: 'th' }, {}, {}, {}, {}, {}, {}],
                                    [{ text: config.dados.Nome, colSpan: 7, style: '' }, {}, {}, {}, {}, {}, {}],
                                    [{ text: 'CPF', style: 'th' }, { text: 'DC', style: 'th' }, { text: 'Sexo', style: 'th' }, { text: 'Raça/Cor', style: 'th' }, { text: 'Data de Nascimento', style: 'th' }, { text: 'Estado Civil', style: 'th' }, { text: 'Naturalidade', style: 'th' }],
                                    [{ text: config.dados.Cpf.substr(0, config.dados.Cpf.length), style: 'center' }, { text: config.dados.Cpf.substr(config.dados.Cpf.length - 2), style: 'center' }, { text: config.dados.Sexo, style: 'center' }, { text: config.dados.RacaDescricao, style: 'center' }, { text: config.dados.DataNascimentoStr, style: 'center' }, { text: config.dados.DescricaoEstadoCivicl, style: 'center' }, { text: config.dados.RgUf, style: '' }],
                                    [{ text: 'Estrangeiro', style: 'th' }, { text: 'Ano de Chegada', style: 'th' }, { text: 'Ingr. Serv. Públ.', style: 'th', colSpan: 2 }, {}, { text: 'Escolaridade', style: 'th', colSpan: 3 }, {}, {}],
   	                    [{
   	                        columns: [
                                { stack: [{ text: 'Código.', style: 'th' }, { text: 'Nacion.', style: 'th', }] },
                                { stack: [{ text: '-', style: 'th', bold: true }, { text: config.dados.DescricaoNacionalidade == "" ? "-" : config.dados.DescricaoNacionalidade, style: 'th', bold: true }] }
   	                        ]
   	                    }, { text: '-', style: 'center' }, { text: config.dados.DataIngServPublicoStr, style: 'center', colSpan: 2 }, {}, { text: config.dados.DS_ESCOLARIDADE, style: 'center', colSpan: 3 }, {}, {}],
                                ]
                            },
                            layout: {
                                hLineWidth: function (i, node) { return (i === 1 || i === 3 || i === 5 || i === 7) ? 0 : 1; },
                            }
                        }
                    ]
                },
                {
                    margin: [0, 5, 0, 0],
                    columns: [
                        {
                            width: 40,
                            table: {
                                body: [
                                    [
                                        {
                                            columns: [
                                               { stack: ['D', 'A', 'D', 'O', 'S', ' ', 'F', 'U', 'N', 'C', ' I', 'O', 'N', 'A', ' I', 'S'], bold: true, margin: [10, 0, 8, 5] }
                                            ]
                                        }
                                    ]
                                ]
                            }
                        },
                        {
                            stack: [
                                {
                                    table: {
                                        widths: ['*', 'auto', 'auto', 'auto'],
                                        body: [
                                            [{ text: 'Função - Atividade', style: 'th' }, { text: 'Faixa', style: 'th' }, { text: 'Nível Inicial', style: 'th' }, { text: 'A partir de', style: 'th' }],
                                            [{ text: config.dados.CodigoCargo.toString() + ' - ' + config.dados.NomeCargo, style: 'center' }, { text: config.dados.Faixa, style: 'center' }, { text: config.dados.Nivel, style: 'center' }, { text: config.dados.DataInicioExercicioStr, style: 'center' }],

                                        ]
                                    },
                                    layout: {
                                        hLineWidth: function (i, node) { return (i === 1) ? 0 : 1; },
                                    }
                                },
                                {
                                    table: {
                                        widths: ['auto', '*', 'auto', 'auto'],
                                        body: [
                                            [{ text: 'SEDE DE CONTROLE DE FREQÜÊNCIA', style: 'center', bold: true, colSpan: 4 }, {}, {}, {}],
                                            [{ text: 'Código U.A.', style: 'th', }, { text: 'Nome U.A.', style: 'th', colSpan: 2 }, {}, { text: 'Município', style: 'th' }],
                                            [{ text: config.dados.CodigoUA.toString(), style: 'center', }, { text: config.dados.NomeEscola, style: 'center', colSpan: 2 }, {}, { text: config.dados.NomeMunicipio, style: 'center' }],
                                            [{ text: 'ACUMULAÇÃO', style: 'center', bold: true, colSpan: 4 }, {}, {}, {}],
                                            [{ text: 'Cargo / Função - Atividade', style: 'th', colSpan: 2 }, {}, { text: 'Ato Decisório N°', style: 'th' }, { text: 'D.O.E.', style: 'th' }],
                                            [{ text: config.dados.Acumulacao.CodigoCargo == "0" ? " " : config.dados.Acumulacao.CodigoCargo + " - " + config.dados.Acumulacao.NomeCargo, style: 'center', colSpan: 2 }, {}, { text: config.dados.AtoDecisorio.Codigo == 0 ? " " : config.dados.AtoDecisorio.Codigo.toString(), style: 'center' }, { text: config.dados.AtoDecisorio.DataDoeStr, style: 'center' }],
                                            [{ text: 'LOCAL', style: 'center', bold: true, colSpan: 4 }, {}, {}, {}],
                                            [{ text: 'Código', style: 'th' }, { text: 'Denominação', style: 'th' }, { text: 'Município', style: 'th', colSpan: 2 }, {}],
                                            [{ text: config.dados.Acumulacao.CodigoAcumulacao == 0 ? "" : config.dados.Acumulacao.CodigoAcumulacao.toString(), style: 'center' }, { text: config.dados.Acumulacao.DescricaoAcumulacao, style: 'center' }, { columns: [{ stack: [{ text: 'Código:', style: 'th' }, { text: 'Denom.:', style: 'th', }] }, { stack: [{ text: config.dados.Acumulacao.CodigoMunicipioDne == 0 ? "" : config.dados.Acumulacao.CodigoMunicipioDne.toString(), style: 'th', bold: true }, { text: config.dados.Acumulacao.NomeLocal, style: 'th', bold: true }] }], colSpan: 2 }, {}],
                                            [{ text: 'PIS/PASEP', style: 'th' }, { text: 'Filiação', style: 'th', colSpan: 2 }, {}, { text: 'Ano 1° Emprego', style: 'th' }],
                                            [{ text: config.dados.NumeroPIS.toString(), style: 'center', }, { stack: [{ text: 'Mãe: ' + config.dados.NomeMae, style: 'left', fontSize: 10 }, { text: 'Pai: ' + config.dados.NomePai, style: 'left', fontSize: 10 }], colSpan: 2 }, {}, { text: config.dados.AnoPrimeiroEmprego.toString().replace("0", "-"), style: 'center' }],


                                        ]
                                    },
                                    margin: [0, 5, 0, 0],
                                    layout: {
                                        hLineWidth: function (i, node) { return (i === 2 || i === 5 || i === 8 || i === 10) ? 0 : 1; },
                                    }
                                }
                            ]
                        },
                    ]
                },
                {
                    margin: [0, 5, 0, 0],
                    columns: [
                        {
                            width: 40,
                            table: {
                                body: [
                                    [
                                        {
                                            columns: [
                                               { stack: ['D', 'A', 'D', 'O', 'S'], bold: true, fontSize: 5 },
                                               { stack: ['P', 'A', 'G', 'T', 'O'], bold: true, margin: [10, 0, 0, 1], fontSize: 5 }
                                            ]
                                        }
                                    ]
                                ]
                            }
                        },
                        {
                            table: {
                                widths: ['*', '*', '*', 'auto'],
                                body: [
                                    [{ text: 'Banco', style: 'th' }, { text: 'Agência', style: 'th' }, { text: 'Tipo', style: 'th' }, { text: 'N° Conta / DC', style: 'th' }],
                                    [{ text: config.dados.ContaBancaria.CodigoBanco.toString(), style: 'center' }, { text: config.dados.ContaBancaria.CodigoAgencia.toString(), style: 'center' }, { text: config.dados.ContaBancaria.CodigoTipoConta.toString(), style: 'center' }, { text: config.dados.ContaBancaria.NumeroConta.toString() + ' - ' + config.dados.ContaBancaria.DigitoConta.toString(), margin: [0, 0, 0, 2] }],
                                ]
                            },
                            layout: {
                                hLineWidth: function (i, node) { return (i === 1) ? 0 : 1; },
                            }
                        }
                    ]
                },
                {
                    margin: [0, 5, 0, 0],
                    table: {
                        widths: ['*', '*', '*', '*'],
                        body: [
                            [{ text: 'Local e Data', style: 'th' }, { text: 'Carimbo e Assinatura do Dirigente Regional de Ensino', style: 'th', colSpan: 2 }, {}, { text: 'Publicação no D.O.E.', style: 'th' }],
                            [{ text: config.dados.LocalData, style: 'center', rowSpan: 3 }, { text: '', colSpan: 2, rowSpan: 3 }, {}, { text: config.dados.DataPublicacaoDoeStr, style: 'center' }],
                            [{}, {}, {}, { text: 'Retificação no D.O.E.', style: 'th' }],
                            [{}, {}, {}, {
                                text: '', style: 'center', "margin": [0, 15, 0, 0] //teste
                            }],
                        ]
                    },
                    layout: {
                        hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 1; },
                    }
                },
                {
                    margin: [0, 5, 0, 0],
                    table: {
                        widths: ['*'],
                        body: [
                            [{ text: 'USO DO DDPE', style: 'thCentro' }],
                            [{ text: ' ', margin: [0, 0, 0, 60] }]
                        ]
                    },
                }
            ],
            styles: {
                cell: {
                    margin: [10, 10, 0, 10]
                },
                cellBold: {
                    margin: [10, 0, 0, 0],
                    bold: true
                },
                cellBold2: {
                    margin: [10, 10, 0, 10],
                    bold: true
                },
                cellCentro: {
                    margin: [10, 10, 0, 0],
                },
                cellCentro2: {
                    margin: [60, 40, 0, 0],
                },
                h1: {
                    fontSize: 20,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 20, 0, 0]
                },
                header: {
                    fontSize: 14,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 10, 0, 0]
                },
                subheader: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'justify',
                    margin: [0, 5, 0, 0]
                },
                p: {
                },
                th: {
                    fontSize: 8,
                    //alignment:'center'
                },
                thCentro: {
                    fontSize: 8,
                    alignment: 'center'
                },
                center: {
                    fontSize: 11,
                    alignment: 'center'
                },
            }
        }

        return dd;
    }
    sedPdfExporter.exportPdf(config);
}
function criarPDFContratoNovo(dados) {
    var config = {
        pageOrientation: "portrait",
        pageSize: "A4",
        pageMargins: [30, 10, 30, 0],
        title: "Eventual"
    };
    config.dados = dados;

    sedPdfExporter.normalizeConfig(config);

    config.docGenerator = function (config) {
        // playground requires you to assign document definition to a variable called dd

        var dd = {
            content: [
                 {
                     table: {
                         widths: ['*'],
                         body: [
                             [{ width: 40, alignment: 'center', image: 'data:image/jpeg;base64,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' }],
                             [{ alignment: 'center', text: 'GOVERNO DO ESTADO DE SÃO PAULO', style: { fontSize: 12, bold: true, } }],
                         ]
                     },
                     layout: {
                         hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 1; },
                     }
                 },
                {
                    table: {
                        widths: ['auto', '*', 20, 'auto'],
                        body: [
                            [{ text: 'SECRETARIA:', style: { bold: true, } }, 'Secretaria da Educação', { text: 'UO:', style: { bold: true, } }, config.dados.CodigoUO.toString()],
                            [{ text: 'UNIDADE', style: { bold: true, } }, 'DIRETORIA ENSINO-REG. ' + config.dados.NomeDiretoria, { text: 'UD:', style: { bold: true, } }, config.dados.CodigoUD.toString()]
                        ]
                    },
                    margin: [0, 3, 0, 0],
                    layout: {
                        vLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 1; },
                    }
                },
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [{ text: 'CONTRATO POR TEMPO DETERMINADO - CTD - Docente Eventual - Nº ' + config.dados.NumeroPortariaAdmissaoSequencia + '/' + config.dados.NumeroPortariaAdmissaoDiretoria + '/' + config.dados.NumeroPortariaAdmissaoAno, style: { bold: true, } }],
                        ]
                    },
                    margin: [0, 3, 0, 0],
                },
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [{ text: 'O Contratante abaixo, devidamente identificado, no uso da competência conferida pelo Artigo 1º da Resolução SE 67 de 01 de outubro de 2009, expede o presente instrumento particular, para CONTRATAR, nos termos do artigo 13, do Decreto nº54.682, de 13 agosto de 2009.', }],
                        ]
                    },
                    margin: [0, 3, 0, 0],
                },
                {
                    text: 'CONTRATADO',
                    style: 'subheader',
                    alignment: 'center'
                },
                {
                    table: {
                        widths: ['*', 'auto', 'auto', 'auto', 'auto', '*', 'auto', 35, 35],
                        body: [
                            [{ text: 'Nome', colSpan: 9, style: { fontSize: 8 } }, {}, {}, {}, {}, {}, {}, {}, {}],
                            [{ text: config.dados.Nome, colSpan: 9 }, {}, {}, {}, {}, {}, {}, {}, {}],
                            [{ text: 'Registro Geral', style: 'th' }, { text: 'DC', style: 'th' }, { text: 'UF', style: 'th' }, { text: 'Órgão Emissor', style: 'th' }, { text: 'Data de Emissão', style: 'th' }, { text: 'CPF', style: 'th' }, { text: 'DC', style: 'th' }, { text: 'Sexo', style: 'th' }, { text: 'Raça e Cor', style: 'th' }, ],
                            [{ text: config.dados.RgNumero.toString(), style: 'center' }, { text: config.dados.RgDigito.toString(), style: 'center' }, { text: config.dados.RgUf, style: 'center' }, { text: config.dados.RgOrgao, style: 'center' }, { text: config.dados.DataEmissaoRgStr, style: 'center' }, { text: config.dados.Cpf.substr(0, config.dados.Cpf.length - 2), style: 'center' }, { text: config.dados.Cpf.substr(config.dados.Cpf.length - 2), style: 'center' }, { text: config.dados.Sexo, style: 'center' }, { text: config.dados.RacaDescricao, style: 'center' }, ],
                            [{ text: 'Data de Nascimento', style: 'th' }, { text: 'Estado Civil', style: 'th' }, { text: 'Naturalidade', style: 'th', colSpan: 3 }, {}, {}, { text: 'Nacionalidade', style: 'th', colSpan: 3 }, {}, {}, { text: 'Ano de Chegada', style: 'th' }],
                            [{ text: config.dados.DataNascimentoStr, style: 'center' }, { text: config.dados.DescricaoEstadoCivicl, style: 'center' }, { text: 'UF: ' + config.dados.DescricaoNaturalidade, style: { fontSize: 10 }, colSpan: 3 }, {}, {}, { text: config.dados.DescricaoNacionalidade, style: { fontSize: 10 }, colSpan: 3 }, {}, {}, { text: config.dados.AnoEntradaBrasil.toString(), style: 'center' }],
                            [{ text: 'Ing. Serv. Publ. Est.', style: 'th', border: [true, false, true, false] }, { text: 'Escolaridade', style: 'th', colSpan: 3, border: [true, false, true, false] }, {}, {}, { text: 'Cargo Correspondente', style: 'th', colSpan: 3, border: [true, false, true, false] }, {}, {}, { text: 'Faixa / Nível', style: 'th', colSpan: 2, }, {}],
                            [{ text: config.dados.DataIngServPublicoStr, style: 'center', border: [true, false, true, true] }, { text: config.dados.DS_ESCOLARIDADE, style: 'center', colSpan: 3, border: [true, false, true, true] }, {}, {}, { text: config.dados.CodigoCargo.toString() + ' - ' + config.dados.NomeCargo, style: 'center', colSpan: 3, border: [true, false, true, true] }, {}, {}, { text: config.dados.Faixa, style: 'center' }, { text: config.dados.Nivel, style: 'center', }],
                            [{ text: 'PIS/PASEP', style: 'th', colSpan: 2 }, {}, { text: 'Filiação', style: 'th', colSpan: 5 }, {}, {}, {}, {}, { text: 'Ano 1°Emprego', style: 'th', colSpan: 2 }, {}],
                            [{ text: config.dados.NumeroPIS.toString(), style: 'center', colSpan: 2, rowSpan: 2 }, {}, { text: 'Mãe: ' + config.dados.NomeMae, style: 'left', colSpan: 5, fontSize: 10 }, {}, {}, {}, {}, { text: config.dados.AnoPrimeiroEmprego.toString(), style: 'center', colSpan: 2, rowSpan: 2 }, {}],
                            [{}, {}, { text: 'Pai: ' + config.dados.NomePai, style: 'left', colSpan: 5, fontSize: 10 }, {}, {}, {}, {}, {}, {}]
                        ],
                    },
                    layout: {
                        hLineWidth: function (i, node) { return (i === 1 || i === 3 || i === 5) ? 0 : 1; },
                    }
                },
                {
                    text: 'ACUMULAÇÃO',
                    style: 'subheader',
                    alignment: 'center'
                },
                {
                    table: {
                        widths: ['auto', '*', '*'],
                        body: [
                            [{ text: 'Cargo/Função-Atividade', style: 'th' }, { text: 'Ato Decisório N°', style: 'th' }, { text: 'D.O.E.', style: 'th' }],
                            [{ text: config.dados.Acumulacao.NomeCargo, style: 'center' }, { text: config.dados.AtoDecisorio.Codigo == 0 ? " " : config.dados.AtoDecisorio.Codigo.toString(), style: 'center' }, { text: config.dados.AtoDecisorio.DataDoeStr, style: 'center' }],
                        ],
                    },
                },
                {
                    text: 'CONTRATANTE',
                    style: 'subheader',
                    alignment: 'center'
                },
                {
                    table: {
                        widths: ['10%', '50%', '40%'],
                        body: [
                            [{ text: 'ORGÃO/UNIDADE', style: { bold: true, fontSize: 10 }, alignment: 'center', colSpan: 3 }, {}, {}],
                            [{ text: 'Código UD', style: 'th' }, { text: 'Denominação', style: 'th' }, { text: 'Município', style: 'th' }],
                            [{ text: config.dados.CodigoUD.toString(), style: 'center' }, { text: config.dados.NomeDiretoria, style: 'center' }, { columns: [{ stack: [{ text: 'Código:', style: { fontSize: 10 } }, { text: 'Denominação:', style: { fontSize: 10 } }] }, { stack: [{ text: config.dados.Acumulacao.CodigoMunicipio.toString(), style: { fontSize: 10 } }, { text: config.dados.Acumulacao.NomeMunicipio, style: { fontSize: 10 } }] }] }],
                            [{ text: 'Código UA', style: 'th' }, { text: 'Nome UA', style: 'th' }, { text: 'Município', style: 'th' }],
                            [{ text: config.dados.CodigoUA.toString(), style: 'center' }, { text: config.dados.NomeEscola, style: 'center' }, { columns: [{ stack: [{ text: 'Código:', style: { fontSize: 10 } }, { text: 'Denominação:', style: { fontSize: 10 } }] }, { stack: [{ text: config.dados.CodigoMunicipio.toString(), style: { fontSize: 10 } }, { text: config.dados.NomeMunicipio, style: { fontSize: 10 } }] }] }],

                        ],
                    },
                    layout: {
                        hLineWidth: function (i, node) { return (i === 2 || i === 4) ? 0 : 1; },
                    }
                },
                {
                    text: 'VIGÊNCIA',
                    style: 'subheader',
                    alignment: 'center'
                },
                {
                    table: {
                        widths: ['auto', '*', '*'],
                        body: [
                            [{ text: 'Período Contratual', style: 'center' }, { text: 'Data de Exercício', style: 'center' }, { text: 'Publicação no DOE', style: 'center' }],
                            [{ text: 'DE ' + config.dados.DataInicioExercicioStr + ' ATÉ ' + config.dados.DataFimContratoStr, style: 'center' }, { text: config.dados.DataInicioExercicioStr, style: 'center' }, { text: config.dados.DataPublicacaoDoeStr, style: 'center' }],
                        ],
                    },
                },
                 {
                     text: 'RETIFICAÇÃO DE VIGÊNCIA',
                     style: 'subheader',
                     alignment: 'center'
                 },
                {
                    table: {
                        widths: ['*', '*', '*', '*'],
                        body: [
                            [{ text: 'Período Contratual', style: 'center', colSpan: 2 }, {}, { text: 'Publicação no DOE', style: 'center', colSpan: 2 }, {}],
                            [{ text: (config.dados.DataRetificaoVigenciaStr == "" ? "" : 'DE ' + config.dados.DataInicioExercicioStr + ' ATÉ ' + config.dados.DataRetificaoVigenciaStr), style: 'centerMargin', colSpan: 2 }, {}, { text: config.dados.DataPublRetifVigenciaStr, style: 'centerMargin', colSpan: 2 }, {}],
                        ],
                    },
                },
                {
                    text: 'DADOS PARA PAGAMENTO',
                    style: 'subheader',
                    alignment: 'center'
                },
                {
                    table: {
                        widths: ['auto', '*', '*', '*'],
                        body: [
                            [{ text: 'Banco', style: 'th' }, { text: 'Agência', style: 'th' }, { text: 'Tipo', style: 'th' }, { text: 'N° Conta / DC', style: 'th' }],
                            [{ text: config.dados.ContaBancaria.CodigoBanco.toString(), style: 'center' }, { text: config.dados.ContaBancaria.CodigoAgencia.toString(), style: 'center' }, { text: config.dados.ContaBancaria.CodigoTipoConta.toString(), style: 'center' }, { text: config.dados.ContaBancaria.NumeroConta.toString() + ' - ' + config.dados.ContaBancaria.DigitoConta.toString(), style: 'center' }],
                        ],
                    },
                    layout: {
                        hLineWidth: function (i, node) { return (i === 1) ? 0 : 1; },
                    }
                },
                {
                    table: {
                        widths: ['*', '*', '*', '*'],
                        body: [
                            [{ text: 'Contratado', style: 'th', colSpan: 2 }, {}, { text: 'Contratante', style: 'th', colSpan: 2 }, {}],
                             [{ text: ' ', style: 'center', colSpan: 2 }, {}, { text: '', style: 'center', colSpan: 2 }, {}],
                             [{ text: 'Assinatura', style: 'th', colSpan: 2 }, {}, { text: 'Carimbo e Assinatura', style: 'th', colSpan: 2 }, {}],
                             [
                                 { text: 'Local/Data: ' + config.dados.LocalData, style: 'localData', colSpan: 2 }, {},
                                 { text: 'Local/Data: ' + config.dados.LocalData, style: 'localData', colSpan: 2 }, {}
                             ],
                        ],
                    },
                    margin: [0, 10, 0, 0],
                    layout: {
                        hLineWidth: function (i, node) { return (i === 1 || i === 2) ? 0 : 1; },
                    }
                }
            ],
            styles: {
                cell: {
                    margin: [10, 10, 0, 10]
                },
                cellBold: {
                    margin: [10, 0, 0, 0],
                    bold: true
                },
                cellBold2: {
                    margin: [10, 10, 0, 10],
                    bold: true
                },
                cellCentro: {
                    margin: [10, 10, 0, 0],
                },
                cellCentro2: {
                    margin: [60, 40, 0, 0],
                },
                h1: {
                    fontSize: 20,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 20, 0, 0]
                },
                header: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'justify',
                    margin: [0, 10, 0, 0]
                },
                subheader: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'justify',
                    margin: [0, 5, 0, 0]
                },
                p: {
                },
                th: {
                    fontSize: 8,
                    alignment: 'center'
                },
                localData: {
                    fontSize: 9,
                    alignment: 'center'
                },
                thCentro: {
                    //fontSize: 8,
                    margin: [60, 10, 0, 0],
                },
                center: {
                    fontSize: 10,
                    alignment: 'center'
                },
                centerMargin:
                    {
                        fontSize: 10,
                        alignment: 'center',
                        margin: [0, 8, 0, 0]
                    }
            }
        }
        return dd;
    }
    sedPdfExporter.exportPdf(config);
}
function criarPDFExtincao(data) {
    var config = {
        pageOrientation: "portrait",
        pageSize: "A4",
        pageMargins: [30, 10, 30, 0],
        title: "Extinção Contratual"
    };

    config.Registros = data;

    sedPdfExporter.normalizeConfig(config);




    config.docGenerator = function (config) {
        var contentGeral = [];
        var doc = {
            content: [
                {
                    table: {
                        widths: ['*'],
                        body: [
                            [{ alignment: 'center', image: 'data:image/jpeg;base64,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' }],
                            [{ alignment: 'center', text: 'GOVERNO DO ESTADO DE SÃO PAULO', style: { fontSize: 12, bold: true, } }],
                        ]
                    },
                    layout: {
                        hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 1; },
                    }
                },
                {
                    table: {
                        widths: ['auto', 'auto', 20, '*'],
                        body: [
                            [{ text: 'SECRETARIA/AUTARQUIA', style: { bold: true, } }, 'Coordenadoria de Gestão de Recursos Humanos', { text: 'UO:', style: { bold: true, } }, config.Registros.CodigoUO.toString()],
                            [{ text: 'UNIDADE/ORGÃO', style: { bold: true, } }, 'DIRETORIA ENSINO-REG. ' + config.Registros.NomeDiretoria, { text: 'UD:', style: { bold: true, } }, config.Registros.CodigoUD.toString()]
                        ]
                    },
                    //content.push({ text: "Válido até  " + config.carteirinhas[i].Validade, style: "outros", margin: [0, 0, 5, 0], pageBreak: "after" });
                    margin: [0, 10, 0, 0],
                    layout: {
                        vLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 1; },
                    }
                },
                {
                    text: 'EXTINÇÃO CONTRATUAL(DOCENTE) Nº' + (config.Registros.NumeroPortariaDispensa > 0 ? config.Registros.NumeroPortariaDispensaSequencia + "/" + config.Registros.NumeroPortariaDispensaDiretoria + "/" + config.Registros.NumeroPortariaDispensaAno : ""),
                    style: 'subheader',
                    fontSize: 13,
                    alignment: 'center',
                    bold: true
                },
                {
                    table: {
                        body: [
                            [{ text: 'O Contratante abaixo, devidamente identificado, no uso da competência conferida pelo Artigo 1º da Resolução SE 67 de 01-10-2009, expede o presente instrumento particular, para EXTINGUIR, nos termos Inciso I do art 8º da L.C. 1093/09, da Lei Complementar nº1093, de 16 de julho de 2009, o contrato firmado conforme segue:', style: 'p' }],
                        ],
                    },
                },
                {
                    text: 'CONTRATADO',
                    style: 'subheader',
                    alignment: 'center'
                },
                {
                    table: {
                        widths: ['*', 'auto', 'auto', 'auto', '*', '*', 'auto', '*'],
                        body: [
                            [{ text: 'Nome', colSpan: 8, style: { fontSize: 8 } }, {}, {}, {}, {}, {}, {}, {}],
                            [{ text: config.Registros.Nome, colSpan: 8 }, {}, {}, {}, {}, {}, {}, {}],
                            [{ text: 'Registro Geral', style: 'th' }, { text: 'DC', style: 'th' }, { text: 'UF', style: 'th' }, { text: 'Orgão Emissor', style: 'th' }, { text: 'Data de Emissão', style: 'th' }, { text: 'CPF', style: 'th' }, { text: 'DC', style: 'th' }, { text: 'Cargo Correspondente', style: 'th' }, ],
                            [{ text: config.Registros.RgNumero, style: 'center' }, { text: config.Registros.RgDigito, style: 'center' }, { text: config.Registros.RgUf, style: 'center' }, { text: config.Registros.RgOrgao, style: 'center' }, { text: config.Registros.DataEmissaoRgStr, style: 'center' }, { text: config.Registros.Cpf.substring(0, 9), style: 'center' }, { text: config.Registros.Cpf.substring(9, 11), style: 'center' }, { text: config.Registros.CodigoCargo.toString() + ' - ' + config.Registros.NomeCargo, style: 'center' }, ],
                        ],
                    },
                    layout: {
                        hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 1; },
                    }
                },
                {
                    text: 'CONTRATANTE',
                    style: 'subheader',
                    alignment: 'center'
                },
                {
                    table: {
                        widths: ['auto', '*', 'auto'],
                        body: [
                            [{ text: 'ORGÃO/UNIDADE', style: { bold: true, fontSize: 10 }, alignment: 'center', colSpan: 3 }, {}, {}],
                            [{ text: 'Código UD', style: 'th' }, { text: 'Denominação', style: 'th' }, { text: 'Município', style: 'th' }],
                            [{ text: config.Registros.CodigoUD.toString(), style: 'center' }, { text: config.Registros.NomeMunicipioDiretoria, style: 'center' }, { columns: [{ stack: [{ text: 'Código:', style: { fontSize: 10 } }, { text: 'Denominação:', style: { fontSize: 10 }, margin: [0, 0, 2, 0] }] }, { stack: [{ text: config.Registros.CodigoMunicipioDiretoria.toString(), style: { fontSize: 10 } }, { text: config.Registros.NomeMunicipioDiretoria, style: { fontSize: 10 } }] }] }],
                            [{ text: 'Código UA', style: 'th' }, { text: 'Nome UA', style: 'th' }, { text: 'Município', style: 'th' }],
                            [{ text: config.Registros.CodigoUA.toString(), style: 'center' }, { text: config.Registros.NomeUA, style: 'center' }, { columns: [{ stack: [{ text: 'Código:', style: { fontSize: 10 } }, { text: 'Denominação:', style: { fontSize: 10 }, margin: [0, 0, 2, 0] }] }, { stack: [{ text: config.Registros.CodigoMunicipio.toString(), style: { fontSize: 10 } }, { text: config.Registros.NomeMunicipio, style: { fontSize: 10 } }] }] }],

                        ],
                    },
                    layout: {
                        hLineWidth: function (i, node) { return (i === 2 || i === 4) ? 0 : 1; },
                    }
                },
                 {
                     text: 'VIGÊNCIA DO CONTRATO',
                     style: 'subheader',
                     alignment: 'center'
                 },
                {
                    table: {
                        widths: ['auto', '*', '*'],
                        body: [
                            [{ text: 'Período Contratual', style: 'center' }, { text: 'Data de Exercício', style: 'center' }, { text: 'Publicação no DOE', style: 'center' }],
                            [{ text: 'DE ' + config.Registros.DataInicioExercicioStr + ' ATÉ ' + config.Registros.DataFimContratoStr, style: 'center' }, { text: config.Registros.DataInicioExercicioStr, style: 'center' }, { text: config.Registros.DataPublicacaoDoeStr, style: 'center' }],
                        ],
                    },
                },
                {
                    table: {
                        widths: ['auto', '*', '*'],
                        body: [
                            [{ text: 'Férias', style: 'th' }, { text: 'Valor', style: 'th' }, { text: 'Extenso', style: 'th' }, ],
                            [{ text: 'Inciso II, Art. 12, LC n° 1093/09', style: 'center' }, { text: '', style: 'center' }, { text: '', style: 'center' }, ],
                            [{ text: 'Indenização', style: 'th' }, { text: 'Valor', style: 'th' }, { text: 'Extenso', style: 'th' }, ],
                            [{ text: '§ 2°, Inciso VIII, Art. 8º, LC nº1093/09', style: 'center' }, { text: '', style: 'center' }, { text: '', style: 'center' }, ],
                        ],
                    },
                    margin: [0, 10, 0, 0],
                    layout: {
                        hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 1; },
                    }
                },
                 {
                     text: 'EXTINÇÃO CONTRATUAL',
                     style: 'subheader',
                     alignment: 'center'
                 },
                {
                    table: {
                        widths: ['auto', '*', '*'],
                        body: [
                            [{ text: 'Motivo/Fundamento Legal', style: 'center' }, { text: 'Data de Extinção', style: 'center' }, { text: 'Publicação no DOE', style: 'center' }],
                            [{ text: 'Tipo ' + config.Registros.DescricaoDispensa, style: 'center' }, { text: config.Registros.DataVigenciaDispensaStr, style: 'center' }, { text: config.Registros.DataPublicacaoDispensaStr, style: 'center' }],
                        ],
                    },
                },
                {
                    table: {
                        widths: ['*', '*', '*', '*'],
                        body: [
                            [{ text: 'Contratado', style: 'th', colSpan: 2 }, {}, { text: 'Contratante', style: 'th', colSpan: 2 }, {}],
                             [{ text: ' ', style: 'center', colSpan: 2 }, {}, { text: '', style: 'center', colSpan: 2 }, {}],
                             [{ text: 'Assinatura', style: 'th', colSpan: 2 }, {}, { text: 'Carimbo e Assinatura', style: 'th', colSpan: 2 }, {}],
                             [
                                 { text: 'Local/Data: ' + config.Registros.LocalData, style: 'localData', colSpan: 2 }, {},
                                 { text: 'Local/Data: ' + config.Registros.LocalData, style: 'localData', colSpan: 2 }, {}
                             ],
                        ],
                    },
                    margin: [0, 10, 0, 0],
                    layout: {
                        hLineWidth: function (i, node) { return (i === 1 || i === 2) ? 0 : 1; },
                    }
                },
            ],
            styles: {
                header: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'justify',
                    margin: [0, 10, 0, 0]
                },
                subheader: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'justify',
                    margin: [0, 10, 0, 0]
                },
                p: {
                },
                th: {
                    fontSize: 8,
                    alignment: 'center'
                },
                localData: {
                    fontSize: 9,
                    alignment: 'center'
                },
                center: {
                    alignment: 'center'
                },
                footer: {
                    bold: true,
                    fontSize: 8
                }
            }
        }

        return doc;
    };

    sedPdfExporter.exportPdf(config);
}
function criarPDFDispensa(data) {
    var config = {
        pageOrientation: "portrait",
        pageSize: "A4",
        pageMargins: [30, 10, 30, 0],
        title: "Extinção Contratual"
    };

    config.Registros = data;
    sedPdfExporter.normalizeConfig(config);

    config.docGenerator = function (config) {
        var contentGeral = [];
        var doc = {
            content: [
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                [{
                                    width: 70, alignment: 'center', image: 'data:image/jpeg;base64,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',
                                    "margin": [
                                          0,
                                          30,
                                          0,
                                          0
                                    ]
                                },
                                {
                                    table: {
                                        widths: ['auto', '*'],
                                        body: [

                                            [{ text: 'GOVERNO DO ESTADO DE SÃO PAULO', colSpan: 2, fontSize: 14, bold: true }, {}],
                                            [{ text: 'SECRETARIA DO ESTADO DA EDUCAÇÃO', colSpan: 2, bold: true, fontSize: 14 }, {}],
                                            [{ text: 'Coordenadoria de Gestão de Recursos Humanos', colSpan: 2 }, {}],
                                            [{ text: 'Diretoria de Ensino', border: [true, true, false, true] }, { text: "REGIÃO " + config.Registros.NomeDiretoria, fontSize: 12, bold: true, border: [false, true, true, true] }],
                                        ],
                                    },
                                    margin: [
                                          0,
                                          30,
                                          0,
                                          0
                                    ]

                                }],
                            ],
                        },
                        layout: 'noBorders'
                    },
                    { text: 'PORTARIA DE DISPENSA Nº ' + (config.Registros.NumeroPortariaDispensa > 0 ? config.Registros.NumeroPortariaDispensaSequencia + "/" + config.Registros.NumeroPortariaDispensaDiretoria + "/" + config.Registros.NumeroPortariaDispensaAno + "\n\n" : "\n\n"), style: 'subheader', fontSize: 13, alignment: 'center', bold: true },
                    {
                        text: "O Dirigente Regional de Ensino da Diretoria de Ensino supramencionada, no uso da",
                        margin: [
                          20,
                          0,
                          0,
                          0
                        ],
                    },
                    {
                        text: " competência conferida pelo artigo 37 do Decreto nº52.833, de 24 de Março de 2008, expede a presente Portaria de Dispensa:",
                        margin: [
                          0,
                          0,
                          0,
                          20
                        ],
                    },
                    {
                        table: {
                            body: [
                                   [
                                       {
                                           table: {
                                               widths: ['auto', '*', '*', '*', '*', '*'],
                                               body: [
                                                   [{ text: 'NOME', style: 'th', colSpan: 4, fontSize: 11, bold: true }, {}, {}, {}, { text: 'R.G. / DC', colSpan: 2, style: 'th', fontSize: 11, bold: true }, {
                                                   }],
                                                   [{ text: config.Registros.Nome, colSpan: 4, style: 'texto', fontSize: 10 }, {}, {}, {}, { text: config.Registros.RgNumero + '  ' + config.Registros.RgDigito, colSpan: 2, style: 'cell', fontSize: 10 }, {}],
                                                   [{ text: 'FUNÇÃO-ATIVIDADE', style: 'th', fontSize: 11, colSpan: 3, border: [true, false, false, false], bold: true }, {}, {}, { text: 'ADMISSÃO', style: 'thCentro', fontSize: 11, colSpan: 2, border: [true, true, true, true], bold: true }, {}, { text: 'A PARTIR DE', fontSize: 11, style: 'th', border: [false, false, true, false], bold: true }],
                                                   [{ text: config.Registros.CodigoCargo.toString() + ' - ' + config.Registros.NomeCargo + "F1/NI", fontSize: 10, style: 'th', colSpan: 3, border: [true, false, false, false] }, {}, {}, {
                                                       stack: [
                                                           { text: 'VIGÊNCIA', style: 'center', fontSize: 11, bold: true },
                                                           { text: config.Registros.DataInicioExercicioStr, style: 'center', fontSize: 10 }
                                                       ]
                                                   }, {
                                                       stack: [
                                                           { text: 'D.O.E', style: 'center', fontSize: 11, bold: true },
                                                           { text: config.Registros.DataPublicacaoDoeStr, style: 'center', fontSize: 10 }
                                                       ]
                                                   }, { text: config.Registros.DataVigenciaDispensaStr, style: 'center', fontSize: 10, border: [false, false, true, false] }],
                                                   [{ text: 'FUNDAMENTO LEGAL', colSpan: 4, style: 'th', bold: true }, {}, {}, {}, { text: "Tipo" + config.Registros.DescricaoDispensa, style: 'cellCentro2', colSpan: 2, rowSpan: 2, fontSize: 10, bold: true }, {}],
                                                   [{ stack: [{ text: 'L.C. 180/78 - Artigo 59 - Inciso I, § 1º, item 1', style: 'cellCentro', fontSize: 10 }, { text: 'Lei 500/74 - Artigo 35 - Inciso I', style: 'cellCentro', fontSize: 10 }], colSpan: 4 }, {}, {}, {}, {}, {}],
                                                   [{ text: 'ESCOLA SEDE DE CONTROLE DE FREQÜÊNCIA', style: 'th', fontSize: 11, colSpan: 3, bold: true }, {}, {}, {
                                                       text: 'DIRETORIA DE ENSINO - REGIÃO', alignment: 'center', style: 'th', colSpan: 3, bold: true
                                                   }, {
                                                   }, {
                                                   }],
                                                   [{ columns: [{ stack: [{ text: 'CÓDIGO:', fontSize: 11, style: 'cellBold' }, { text: 'DENOMINAÇÃO:', fontSize: 11, style: 'cellBold' }] }, { stack: [{ text: config.Registros.CodigoUA.toString(), fontSize: 10 }, { text: config.Registros.NomeUA, fontSize: 10 }] }], colSpan: 3 }, {}, {}, {
                                                       text: config.Registros.NomeDiretoria, fontSize: 10, style: 'center', colSpan: 3
                                                   }, {
                                                   }],
                                                   [{ text: 'LOCAL E DATA', style: 'th', fontSize: 11, colSpan: 2, bold: true, border: [true, true, false, false] }, {}, { text: 'ASSINATURA / CARIMBO DO DIRIGENTE REGIONAL DE ENSINO \n\n\n\n\n', fontSize: 11, style: 'th', colSpan: 4, bold: true, border: [true, true, true, false] }, {}, {}, {}],
                                                   [{ text: config.Registros.LocalData, style: 'cellCentro', colSpan: 2, fontSize: 10, margin: [10, 0, 0, 0], border: [true, false, true, false] }, {}, { text: ' ', colSpan: 4, border: [false, false, true, false] }, {}, {}, {}],
                                                   [{ text: 'PUBLICAÇÃO NO D.O.E.: ' + config.Registros.DataPublicacaoDispensaStr, style: 'cell', fontSize: 10, colSpan: 6, bold: true }, {}, {}, {}, {}, {}]
                                               ],
                                           },
                                           "margin": [
                                                0,
                                                0,
                                                0,
                                                20
                                           ],
                                       }
                                   ]
                            ]
                        }
                    },

            ],
            styles: {
                cell: {
                    margin: [10, 10, 0, 10]
                },
                cellBold: {
                    margin: [10, 0, 0, 0],
                    bold: true
                },
                cellBold2: {
                    margin: [10, 10, 0, 10],
                    bold: true
                },
                cellCentro: {
                    margin: [10, 10, 0, 0],
                },
                cellCentro2: {
                    margin: [40, 40, 0, 0],
                },
                h1: {
                    fontSize: 20,
                    bold: true,
                    alignment: 'center',
                    margin: [0, 20, 0, 0]
                },
                header: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'justify',
                    margin: [0, 10, 0, 0]
                },
                subheader: {
                    fontSize: 12,
                    bold: true,
                    alignment: 'justify',
                    margin: [0, 10, 0, 0]
                },
                p: {
                },
                th: {
                    //fontSize: 8,
                    margin: [10, 10, 0, 0],
                },
                thCentro: {
                    //fontSize: 8,
                    margin: [60, 10, 0, 0],
                },
                center: {
                    alignment: 'center'
                },
                texto: { margin: [10, 10, 0, 10] }
            }
        }
        return doc;
    };

    sedPdfExporter.exportPdf(config);
}


//SE PASSAR APENAS A MENSAGEM O RESTANTE É 
function mensagemAlert(msg, titulo, tipo, escondido) {
    Mensagem.Alert({
        mensagem: msg,
        titulo: titulo === undefined ? "Eventual" : titulo,
        tipo: tipo === undefined ? "Aviso" : tipo,
        escondido: escondido === undefined ? undefined : "Detalhes: \n" + escondido,
        botao: "Fechar"
    });
}