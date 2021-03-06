﻿//function AjaxEncaminhaParaDEAutorizadaProrrogacao() {
//    return
//    $.ajax({
//        type: "POST",
//        url: action,
//        data: { "IdContrato": 163, "IdProrrogacaoDocumento": 1 }
//    }).done(function (data) {
//        debugger
//        gerarEncaminhaParaDEAutorizadaProrrogacao(data);
//        //gerarReferencialCADTERC(data);
//    }).fail(function (e) {
//        mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo');
//    });
//}


function gerarEncaminhaParaDEAutorizadaProrrogacao(data) {
    
    var config = {
        pageSize: "A4",
        pageOrientation: "portrait",
        title: "EncaminhaParaDEAutorizadaProrrogacao",
    };

    sedPdfExporter.normalizeConfig(config);

    
    config.nomeUnidadeGestora = data[0].unidadeGestora.nomeUnidadeGestora != undefined ? data[0].unidadeGestora.nomeUnidadeGestora : "";
    config.NmUnidGest = data[0].unidadeGestora.codigoUnidadeGestora != undefined ? data[0].unidadeGestora.codigoUnidadeGestora : "";
    config.descricaoMunicipio = data[0].unidadeGestora.descricaoMunicipio != undefined && data[0].unidadeGestora.descricaoMunicipio != "" ? titleize(data[0].unidadeGestora.descricaoMunicipio.toLowerCase()) : "São Paulo";
    config.numeroProcesso = data[0].processo.numeroProcesso != undefined ? data[0].processo.numeroProcesso : "";
    config.NrContrato = data[0].numeroContrato != undefined ? data[0].numeroContrato : "";
    config.NmCpfCgcCredor = data[0].nomeCredor != undefined ? data[0].nomeCredor : "";
    config.NrCpfCgcCredor = data[0].numeroCpfCnpj != undefined ? data[0].numeroCpfCnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") : "";
    config.dsAssunto = data[0].assuntoPlanejado.descricaoAssuntoPlanejado != undefined ? data[0].assuntoPlanejado.descricaoAssuntoPlanejado : "";
    config.DsClausulaContrato = data[0].clausulaContrato != undefined ? data[0].clausulaContrato : "";
    config.DtReajustemes = data[0].dataBaseReajuste != undefined ? dataAtualFormatadames(data[0].dataBaseReajuste) : "";
    config.DtReajusteano = data[0].dataBaseReajuste != undefined ? dataAtualFormatadaano(data[0].dataBaseReajuste) : "";
    config.DtReajuste = data[0].dataBaseReajuste != undefined ? dataAtualFormatada(data[0].dataBaseReajuste) : "";
    config.NrPercentual = data[0].percentualReajuste != undefined ? data[0].percentualReajuste + '%' : "";
    config.DsFolhaCadTerc = data[0].folhaCadTerc != undefined ? data[0].folhaCadTerc : "";
    config.IdPeriodoContrato = data[0].idPeriodoContrato != undefined ? data[0].idPeriodoContrato : "";
    config.DsUnidadeContratada = data[0].descricaoUnidadeContratada != undefined ? data[0].descricaoUnidadeContratada : "";
    config.VLReajuste = data[0].valorReajuste != undefined ? data[0].valorReajuste.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : "";
    config.VLReajustado = data[0].valorReajustado != undefined ? data[0].valorReajustado.toFixed(2).replace(".", ",").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : "";
    config.descricaoObjeto = data[0].descricaoObjeto != undefined ? data[0].descricaoObjeto : "";
    config.dataVigenciaIni = data[0].dataVigenciaIni != undefined ? dataAtualFormatada(data[0].dataVigenciaIni) : "";
    config.dataVigenciaFim = data[0].dataVigenciaFim != undefined ? dataAtualFormatada(data[0].dataVigenciaFim) : "";
    config.nomeGestor = data[0].nomeGestor != undefined ? titleize(data[0].nomeGestor) : "";
    config.dataImpressao = data[0].dataImpressao != undefined ? dataAtualFormatada(data[0].dataImpressao) : "";
    config.DtImpressaodia = data[0].dataImpressao != undefined ? dataAtualFormatadadia(data[0].dataImpressao) : "";
    config.DtImpressaomes = data[0].dataImpressao != undefined ? dataAtualFormatadames(data[0].dataImpressao) : "";
    config.DtImpressaonomemes = data[0].dataImpressao != undefined ? dataAtualFormatadanomemes(data[0].dataImpressao) : "";
    config.DtImpressaoano = data[0].dataImpressao != undefined ? dataAtualFormatadaano(data[0].dataImpressao) : "";
    config.nrFolha = data[0].nrFolha != undefined ? data[0].nrFolha : "";
    config.nomeResponsavel = data[0].usuarioResponsavel.nmResponsavel != undefined ? titleize(data[0].usuarioResponsavel.nmResponsavel) : "";


    for (var i = 0; i < data[0].listProrrogacao.length; i++) {
        if (data[0].listProrrogacao[i].prorrogacaoDocumento.IdDocumento == DOCS.Minuta_Termo_Prorrogacao_Contratos_Servicos_Continuos.value) {
            config.nrFolhasMinuta = data[0].listProrrogacao[i].nrFolha != undefined ? data[0].listProrrogacao[i].nrFolha : "";
        }
    }

    for (var i = 0; i < data[0].listProrrogacao.length; i++) {
        if (data[0].listProrrogacao[i].prorrogacaoDocumento.IdDocumento == DOCS.Quadro_Comparativo_de_Precos_Referencial_CADTERC.value) {
            config.nrFolhasQuadroCadterc = data[0].listProrrogacao[i].nrFolha != undefined ? data[0].listProrrogacao[i].nrFolha : "";
        }
    }

    var idTipoContratada = 0;
    for (var i = 0; i < data[0].listProrrogacao.length; i++) {
        if (data[0].listProrrogacao[i].prorrogacaoDocumento.IdDocumento == DOCS.Quadro_Demonstrativo_Valores_Prorrogacao_Cronograma_Desembolso.value) {
            config.NovaDataVigenciaIni = data[0].listProrrogacao[i].dataVigenciaIni != undefined ? dataAtualFormatada(data[0].listProrrogacao[i].dataVigenciaIni) : "";
            config.NovaDataVigenciaFim = data[0].listProrrogacao[i].dataVigenciaFim != undefined ? dataAtualFormatada(data[0].listProrrogacao[i].dataVigenciaFim) : "";
            config.NovaIdPeriodoContrato = data[0].listProrrogacao[i].contrato.idPeriodoContrato != undefined ? data[0].listProrrogacao[i].contrato.idPeriodoContrato : "";
            idTipoContratada = data[0].listProrrogacao[i].contrato.unidadeContratada;
        }
    }


    if (idTipoContratada == 1) {
        config.TipoContrada = "Meses";
    }
    else if(idTipoContratada == 2) {
        config.TipoContrada = "Diária";
    }




    config.docGenerator = function (config)
    {
        var doc =
        {
            pageSize: "A4",
            title: "EncaminhaParaDEAutorizadaProrrogacao",
            pageMargins: [30, 150, 50, 40],
            header:
            {
                margin: [0, 20, 0, 0],
                columns:
                [
                    {
                        image: "data:image/png;base64,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",
                        width: 80,
                        height: 80,
                        margin: [40, 10, 20, 0],
                    },
                    [
                        { text: "GOVERNO DO ESTADO DE SÃO PAULO", alignment: "center", fontSize: 16, bold: true, margin: [0, 10, 40, 0], },
                        { text: "SECRETARIA DA EDUCAÇÃO", alignment: "center", fontSize: 14, bold: true, margin: [0, 0, 40, 0], },
                        { text: "COORDENADORIA DE ORÇAMENTOS E FINANÇAS", alignment: "center", fontSize: 12, bold: false, margin: [0, 0, 40, 0], },
                        { text: "DEPARTAMENTO DE CONTROLE DE CONTRATOS E CONVÊNIOS", alignment: "center", fontSize: 12, bold: false, margin: [0, 0, 40, 0], },
                        { text: "CENTRO DE ACOMPANHAMENTO E CONTROLE DE CONTRATOS", alignment: "center", fontSize: 12, bold: false, margin: [0, 0, 40, 0], },
                    ],
                ],
            },

            content:
            {
                margin: [0, 10, 0, 0],
                columns:
                [
                    [
                        {
                            bold: true, fontSize: 13, margin: [20, 10, 40, 0], text: ["PROCESSO Nº : ",
                            { text: config.numeroProcesso + " (     Volumes)", bold: false }, ]
                        },

                        {
                            style: "destaque",
                            text: [
                                "INTERESSADO: ",
                                { text: "Diretoria de Ensino Região: " + config.nomeUnidadeGestora, style: "simples" }
                            ]
                        },

                        {
                            bold: true, fontSize: 13, margin: [20, 0, 40, 0], text: ["ASSUNTO PLANEJADO: ",
                            { text: config.descricaoObjeto, bold: false }, ]
                        },

                        {
                            bold: true, fontSize: 13, margin: [20, 0, 40, 0], text: ["INFORMAÇÃO Nº ",
                            { text: "......./20.......", bold: false }, ]
                        },

                        { text: "\n\nSenhor(a) Diretor(a) do CCONT,\n\n\n", alignment: "left", fontSize: 12, bold: false, margin: [20, 5, 10, 0], },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "Trata o presente de prestação de serviços de " + config.descricaoObjeto + " - Diretoria de Ensino Região " + config.nomeUnidadeGestora + " - Contrato Nº ", alignment: "justify", bold: false, fontSize: 11, color: "black" },
                                { text: config.NrContrato, bold: true, color: "black" },
                                { text: " firmado com a empresa " + config.NmCpfCgcCredor + ", com proposta advinda da citada Diretoria de Ensino quanto à análise da minuta do ........................ ", color: "black" },
                                { text: "Termo de Aditamento Contratual ", bold: true, color: "black" },
                                { text: "(minuta às fls. " + config.nrFolhasMinuta + ", no qual se objetiva a " },
                                { text: "PRORROGAÇÃO do prazo de vigência do Contrato", bold: true, color: "black" },
                                { text: ", por ........ (............) meses, contados a partir de ", bold: false, color: "black" },
                                { text: "....../....../20....", bold: true, color: "black" },
                                { text: " e término em ", bold: false, color: "black" },
                                { text: "....../......./20......", bold: true, color: "black" },
                            ]
                        },

                        {
                            style: "invisivel",
                            text: ["\n\n......................................",
                                { text: "Pelos documentos constantes dos autos, destacamos:\n\n\n", style: "simples", fontSize: 11 }
                            ]
                        },

                        {
                            alignment: "justify", bold: false, fontSize: 11, margin: [20, 0, 20, 0], text: ["",
                            { text: "Proposta vencedora", bold: true },
                            { text: " (fls. ......../........–vol. ......), no valor .............. estimado de R$ ................... e valor total estimado para ........ (................) meses de R$ ...................................;\n\n", alignment: "left", fontSize: 11, bold: false, margin: [20, 5, 10, 0], }],
                        },

                        {
                            alignment: "justify", bold: true, fontSize: 11, margin: [20, 0, 20, 0],
                            ul: [
                                    { text: "Contrato nº ......./20.... (fls. ....../...... – vol. ......), firmado em ....../........./20..... ", bold: true, fontSize: 11 },
                            ],
                        },
                        { text: "Vigência (cláusula ..........) – ........ (...........) meses, consecutivos e ininterruptos, com início em ........./........./20........ e término em ........../......../.........;\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 20, 0], },


                        { text: "Preço e Reajuste (cláusula ............) - base mensal estimada de R$ ...................... e valor total estimado para ....... (.........) meses de R$ ......................., com reajuste anual, sendo ............../20.... o mês de referência de preços;\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 20, 0], },

                        {
                            alignment: "justify", bold: false, fontSize: 11, margin: [20, 0, 20, 0],

                            ul: [
                                    { text: "Reajuste (s) aplicado (s) (fls. ....../...... – vol. .......):", bold: true, fontSize: 11 },
                            ],
                        },
                        { text: "Mês/ano de referência:  ........./20...... ", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 20, 0], },
                        { text: "Índice aplicado: ...........%", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 20, 0], },
                        { text: "Valor ............... já reajustado: R$ ..................... ", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 20, 0], },
                        { text: "Aplicação correta: (     ) Sim		(     ) Não. \n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 20, 0], },

                        {
                            alignment: "justify", bold: false, fontSize: 11, margin: [20, 0, 20, 0],
                            ul: [
                                    { text: "Parecer (es) CJ/SE (fls. ....../...... – vol. .......):", bold: true, fontSize: 11 },
                            ]
                        },
                        { text: "Parecer CJ/SE n.º .........../......... (fls. ......./........ – vol. .........) ", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Objeto (motivo) da análise: ..................................\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },

                        {
                            alignment: "justify", fontSize: 11, bold: true, margin: [20, 5, 10, 0],
                            ul: [
                                    "Informação (es) CCONT – Análise de Prorrogação (es) nos termos da Resolução PGE-23/2005 (fls. ........./.......... – vol. ................)",
                            ]
                        },
                        { text: "\tInformação n.º .........../......... (fls. ......./........ – vol. .........)", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Análise da Minuta do ............................... Termo de Prorrogação de Contratos Contínuos\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },

                        {
                            alignment: "justify", fontSize: 11, bold: true, margin: [20, 5, 10, 0],
                            ul: [
                                    "Termo (s) de Aditamento (s) contratual (ais) (fls. ....../...... – vol. .......):",
                            ]
                        },

                        { text: "............................. Termo de Aditamento Contratual", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Tipo de Aditamento:  ..............................", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Vigência (em caso de prorrogação) ........./........./........... a ........../........./...........", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Valor ...............:  R$ .....................", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Assinado corretamente: (     ) Sim		(     ) Não. \n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },

                        { text: "Em relação à prorrogação pretendida, constam dos autos os seguintes documentos (vols. .........):\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },

                        {
                            ul: [
                                    { text: "Às fls. 1315/1320 – Pesquisas de preço;", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                                    { text: "Às fls. 1321/1322 – Quadro comparativo de preços;", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },

                                    { text: "Certidões atualizadas e consultas realizadas pelo CCONT (fls. ....../...... – vol. .......): ", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                            ]
                        },
                        { text: "Certidão..................................................", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Certidão..................................................", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Certidão..................................................", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Consulta de inscritos no CADIN-Estadual", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Consulta de inscritos em Sanções Administrativas", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Consulta de Empresas Inidôneas e Suspensas\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "Considerando-se a edição da ", alignment: "justify", bold: false, fontSize: 11, color: "black" },
                                { text: "Resolução PGE nº 23/2015", bold: true, color: "black" },
                                { text: "(D.O.E. de 13/11/2015, republicada no D.O.E. de 14/11/2015), bem como da ", color: "black" },
                                { text: "Resolução SE-55/2015", bold: true, color: "black" },
                                { text: " (D.O.E. de 08/12/2015), que dispõe sobre a tramitação de contratos de prestação de serviços contínuos com termo de aditamento para prorrogação de prazo de vigência, e em complementação às informações prestadas acima, opinamos:\n\n", bold: false, color: "black" },
                            ]
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "1)	O art. 57, inciso II, da Lei Federal nº 8.666/93, autoriza a prorrogação de contratos de prestação de serviços executados de forma contínua até o limite de 60 meses;\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n.....................................",
                                { text: "2)	O contrato originário nº ........./20...... estabeleceu em sua cláusula ............. a vigência de .......... (..........) meses consecutivos e ininterruptos, com início em ........./........./20.......... e término em ........./.........../..........., tendo ocorrido as seguintes prorrogações para os seguintes períodos:\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },
                        { text: "- ............................. Termo de Aditamento Contratual", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Período: ............ (..........) meses", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Vigência: ........./........./........... a ........../........./...........\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },

                        { text: "- ............................. Termo de Aditamento Contratual", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Período: ............ (..........) meses", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },
                        { text: "Vigência: ........./........./........... a ........../........./...........\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },

                        { text: "Prazo este que se pretende estender, através do ...................... Termo de Aditamento, por ............... (............) meses, com início em ........./......../20....... e término em ........./......../20........, datas essas corretas, dada a aplicação do inciso II do artigo 57 da Lei Federal nº 8.666/93;\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "3)	[Informação a ser preenchida]\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "4)	Os reajustes de preços devem observados e aplicados conforme consignado na cláusula ................. do contrato, a qual deverá estar em consonância com o instrumento convocatório da licitação que originou o contrato (edital do pregão eletrônico), bem como atentando-se às orientações da legislação aplicável ao caso específico (Decreto n.º 48.326/2003 e Resolução CC-79/03 e alterações posteriores);\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "5)	Consignamos que a contratada deverá manter todas as condições de habilitação e qualificação exigidas na licitação e/ou previamente à celebração do ajuste e a cada pagamento.\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "6)	Deverá o Gestor do Contrato atentar às certidões apresentadas, quando da assinatura do aditamento em prorrogação, uma vez que devem estar todas atualizadas;\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "7)	Ressaltamos que nos termos da Portaria Subg-Cons 02, de 21-9-2016, e previamente à assinatura do termo de prorrogação, além da consulta ao “Cadastro Informativo dos Créditos não Quitados de Órgãos e Entidades Estaduais – CADIN ESTADUAL” (art. 2º, §3º da Resolução PGE-23, de 12-11-2015), a autoridade competente deverá verificar a regularidade da contratada perante o “Sistema Eletrônico de Aplicação e Registro de Sanções Administrativas – e-Sanções”, no endereço www.esancoes.sp.gov.br, e no “Cadastro Nacional de Empresas Inidôneas e Suspensas – CEIS”, no endereço http://www.portaltransparencia.gov.br;\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "8)	As reservas e empenhos deverão SEMPRE ser feitos no PROCESSO LICITATÓRIO, nunca no processo de pagamento, sendo este último destinado apenas ao arquivamento dos documentos relativos aos pagamentos mensais;\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "9)	A reserva orçamentária deverá ser providenciada oportunamente e a inobservância deste procedimento acarreta nulidade do ajuste e responsabilidade do servidor que lhe tenha dado causa, conforme o artigo 7º, §2º, Inciso III e §6º, da Lei Federal nº 8.666/93;\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "10) Destaca-se que a viabilidade da prorrogação foi justificada e autorizada por escrito pela autoridade competente (Dirigente Regional de Ensino), às fls. ..........., utilizando-se corretamente o MODELO DE DECLARAÇÃO DA AUTORIDADE COMPETENTE, em consonância com o estabelecido no artigo 2º, § 1º, da Resolução PGE-23/2015.” no check list;\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "11) No que toca à minuta apresentada às fls. ............./.............., foi utilizada a MINUTA PADRÃO, nos termos do artigo 2º, inciso IV, da Resolução PGE-23/2015, e encontra-se adequada para atingir os fins propostos (prorrogação da vigência). \n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "12) A contratada deverá renovar ou complementar a garantia ofertada originalmente, nos termos da cláusula ....................... do contrato, adequando-se ao novo prazo de vigência. \n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "13) Após assinatura do aditamento, deverá ser providenciada a publicação do respectivo extrato, nos termos do Decreto nº 61.476, de 03/09/2015;\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "14) Lembramos que os contratos e/ou aditamentos não podem ter efeitos pretéritos (art. 56 da Lei Estadual nº 6.544/89), podendo ser assinados até 10 (dez) dias antes da vigência, nunca depois ou em dias não úteis; \n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "15) Destacamos que o Gestor do Contrato deverá observar o que preceitua o artigo ................... da Portaria Conjunta CAF-CCE-CO-CPA nº ......., de ......../........../.........., publicada no DOE de ........./......../20........: “As informações referentes aos contratos de serviços devem ser obrigatoriamente cadastradas e mensalmente atualizadas no sistema da Corregedoria Geral da Administração, no endereço eletrônico www.terceirizados.sp.gov.br.”, lembrando que compete a Corregedoria Geral da Administração a gestão do referido cadastro, conforme Comunicado de 21 de outubro de 2004;\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "16) Frisamos, por oportuno, ser necessário também a atualização dos dados do cadastro deste contrato no Sistema de Contratos (SED).\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        {
                            alignment: "justify",
                            style: "invisivel",
                            text:
                            [
                                "\n\n......................................",
                                { text: "Diante do exposto, mostra-se possível a prorrogação da vigência do contrato, desde que atendida toda a legislação de regência e os requisitos apontados na presente Informação. Proponho a devolução dos autos à Diretoria de Ensino Região de ......................................., para ciência e providências pertinentes. \n\n\n", alignment: "justify", fontSize: 11, bold: false, margin: [20, 5, 10, 0], color: "black" }
                            ],
                        },

                        { text: config.descricaoMunicipio +", _____de _________________________________ de 20________\n\n\n\n", alignment: "left", fontSize: 11, bold: false, margin: [140, 0, 40, 0], },

                        { text: "_______________________________________________\n" + config.UsuarioLogadoNome + " / " + config.UsuarioLogadocargo, alignment: "center", fontSize: 11, bold: false, margin: [0, 0, 20, 0], },

                        { text: "De acordo.", alignment: "left", fontSize: 11, bold: true, margin: [20, 0, 20, 0], },
                        { text: "Encaminhe-se à Diretoria de Ensino Região ............................., para as pertinentes ", alignment: "left", fontSize: 11, bold: false, margin: [20, 0, 20, 0], },
                        { text: "providências.\n\n\n\n", alignment: "left", fontSize: 11, bold: false, margin: [20, 0, 20, 0], },

                        { text: "__________________________________", alignment: "left", fontSize: 11, bold: false, margin: [20, 0, 20, 0], },
                        { text: "Diretor Técnico II - CCONT\n\n", alignment: "left", fontSize: 11, bold: false, margin: [20, 0, 20, 0], },
                    ],
                ],
            },
            styles: {
                tabela: {
                    margin: [20, 0, 0, 0], color: 'gray'
                },
                destaque: {
                    margin: [20, 0, 20, 0],
                    fontSize: 13,
                    bold: true
                },
                simples: {
                    margin: [20, 0, 20, 0],
                    fontSize: 13,
                    bold: false,
                    color: 'black',
                },
                invisivel: {
                    margin: [20, 0, 20, 0],
                    fontSize: 11,
                    color: 'white',
                },
            },

            footer:
            {
                margin: [20, 0, 0, 20],
                columns:
                [
                    {
                        style: "tabela",
                        table: {
                            widths: [100, 100, 300],
                            headerRows: 2,
                            fontSize: 9,
                            body: [
                                     [{ text: "Praça da República, 53 - Centro - São Paulo/SP", colSpan: 3, fontSize: 9, border: [false, true, false, false], bold: false, color: 'gray' }],
                                     [{ text: "CEP: 01045-903                                                                                                                                                              www.educacao.sp.gov.br", colSpan: 3, fontSize: 9, border: [false, false, false, false], bold: false, color: 'gray' }]
                            ]
                        },
                    },
                ]
            }
        }
        return doc;
    };
    sedPdfExporter.exportPdf(config);
}