var questionario = {
    validar: function () {
        var quantidadeQuestoes = $("b.nr-questao").length;
        for (var i = 1; i <= quantidadeQuestoes; i++) {
            $("[name='linq-" + i + "']").css('border', '0px none'); // retira borda
            $("[name='grupo-" + i + "']").css('border', '0px none'); // retira borda

            if ($("[name='q-" + i + "']:checked").length == 0) {    // colocar a borda demonstrando erro
                $("[name='linq-" + i + "']").css('border', '2px solid red');

                if ((i > 1) && (i < 9)) {
                    $("[name='grupo-1']").css('border', '2px solid red');
                } else if ((i > 11) && (i < 19)) {
                    $("[name='grupo-2']").css('border', '2px solid red');
                } else if ((i > 23) && (i < 30)) {
                    $("[name='grupo-3']").css('border', '2px solid red');
                } else if ((i > 29) && (i < 32)) {
                    $("[name='grupo-4']").css('border', '2px solid red');
                } else if ((i > 31) && (i < 51)) {
                    $("[name='grupo-5']").css('border', '2px solid red');
                }

            }
        }


        for (var i = 1; i <= quantidadeQuestoes; i++) {
            // Mostra a mensagem de alerta e vai para a resposta errada
            if ($("[name='q-" + i + "']:checked").length == 0) {
                Mensagem.Alert({ tipo: "Alerta", titulo: "Alerta", mensagem: "A questão " + i + " não foi preenchida. Todas as questões são obrigatórias", botao: "Fechar" });
                $("[name='q-" + i + "']").focus();
                return false;
            }
        }

        return true;
    },

    buscarPreenchimento: function () {
        var respostas = new Array();
        var nrRa = $("#nrRa").val();
        var digRa = $("#digRa").val();
        var ufRa = $("#ufRa").val();
        var dataNascimento = $("#dataNascimento").val();
        var quantidadeQuestoes = $("b.nr-questao").length;

        var aluno = $("#aluno").val();
        var nome = $("#nome").val();

        for (var i = 1; i <= quantidadeQuestoes; i++) {

            var len = $("[name='q-" + i + "']").length;
            if (len == 0) {
                quantidadeQuestoes++;
                continue;
            }

            var tipo = $("[name='q-" + i + "']:checked").attr("type");
            var resposta = {
                CodigoQuestao: i,
            }
            if (tipo == "radio") {
                resposta.CodigoResposta = parseInt($("[name='q-" + i + "']:checked").val());
            }
            else {
                var binStr = "";
                $("[name='q-" + i + "']").each(function (x, e) { binStr += $(e).is(":checked") ? "1" : "0"; });
                resposta.CodigoResposta = parseInt(binStr.padStart(16, "0"), 2);
            }
            resposta.CodigoAluno = $("#aluno").val();



            resposta.NrRA = nrRa;
            resposta.DigRA = digRa;
            resposta.UfRA = ufRa;
            resposta.DataNascimento = dataNascimento;
            resposta.Nome = nome;

            respostas.push(resposta);
        }

        return respostas;
    },

    salvar: function () {
        var valido = questionario.validar();

        if (!valido) return;

        var respostas = questionario.buscarPreenchimento();

        //Mensagem.Alert({ tipo: "Alerta", titulo: "Alerta", mensagem: respostas, botao: "Fechar" });

        //Mensagem.Alert({
        //    titulo: "Aviso",
        //    mensagem: "Ao finalizar o questionário o mesmo não poderá ser editado. Deseja continuar?",
        //    tipo: "Alerta",
        //    botoes: [
        //        {
        //            botao: "Sim",
        //            callback: function () {
        //                $.unblockUI();
        //                $.ajax({
        //                    url: "/SarespQuestoesPais/Salvar",
        //                    type: "POST",
        //                    //                            data: JSON.stringify({ respostas: respostas }),
        //                    data: JSON.stringify({ respostas: respostas, codigoAlunoResponsavel: $("#aluno").val() == null ? 0 : $("#aluno").val() }),
        //                    contentType: "application/json",
        //                    success: function (data) {
        //                        Mensagem.Alert({
        //                            titulo: "Sucesso", tipo: "Sucesso",
        //                            mensagem: "Questionário enviado com sucesso.",
        //                            botoes: [{
        //                                botao: "Fechar",
        //                                callback: function () {
        //                                    location.href = "/Inicio/Index";
        //                                }
        //                            }]
        //                        });
        //                    },
        //                    error: window.tratadorJSONException
        //                });
        //            }
        //        },
        //        {
        //            botao: "Não",
        //            callback: function () {
        //                $.unblockUI();
        //            }
        //        }
        //    ]
        //});

        imprimirPDF(respostas);
    },

    politica: function () {
        $('#Pais_Modal').modal();
    },

};



var imprimirPDF = function (dados) {
    debugger
    var config = {
        pageOrientation: "portrait",
        pageSize: "A4",
        pageMargins: [30, 80],
        title: "Questionario_dos_Pais"
    };

    sedPdfExporter.normalizeConfig(config);

    config.dados = dados;


    //Q1
    switch (dados[0].CodigoResposta) {
        case 1:
            config.Q1 = "Muito satisfeito.";
            break;
        case 2:
            config.Q1 = "Satisfeito.";
            break;
        case 3:
            config.Q1 = "Insatisfeito.";
            break;
        case 4:
            config.Q1 = "Muito insatisfeito.";
            break;
    };

    //Q9
    switch (dados[8].CodigoResposta) {
        case 1:
            config.Q9 = "Sim, sempre.";
            break;
        case 2:
            config.Q9 = "Sim, às vezes.";
            break;
        case 3:
            config.Q9 = "Sim, quase nunca.";
            break;
        case 4:
            config.Q9 = "Não, nunca.";
            break;
        case 5:
            config.Q9 = "Não sei.";
            break;
    };

    //Q10
    switch (dados[9].CodigoResposta) {
        case 1:
            config.Q10 = "Sim, sempre.";
            break;
        case 2:
            config.Q10 = "Sim, às vezes.";
            break;
        case 3:
            config.Q10 = "Sim, quase nunca.";
            break;
        case 4:
            config.Q10 = "Não, nunca.";
            break;
        case 5:
            config.Q10 = "Não, a escola não passa lição de casa.";
            break;
        case 6:
            config.Q10 = "Não sei.";
            break;
    };

    //Q11
    switch (dados[10].CodigoResposta) {
        case 1:
            config.Q11 = "Sim.";
            break;
        case 2:
            config.Q11 = "Não.";
            break;
        case 3:
            config.Q11 = "Não sei.";
            break;
    };

    //Q19
    switch (dados[18].CodigoResposta) {
        case 1:
            config.Q19 = "Nunca estudou ou não completou a 4ª série/5º ano (antigo primário).";
            break;
        case 2:
            config.Q19 = "Completou a 4ª série/5º ano, mas não completou a 8ª série/9º ano (antigo ginásio).";
            break;
        case 3:
            config.Q19 = "Completou a 8ª série/9º ano, mas não completou o Ensino Médio (antigo 2º grau).";
            break;
        case 4:
            config.Q19 = "Completou o Ensino Médio, mas não completou o Ensino Superior.";
            break;
        case 5:
            config.Q19 = "Completou o Ensino Superior.";
            break;
        case 6:
            config.Q19 = "Completou a Pós-Graduação (especialização, mestrado ou doutorado).";
            break;
        case 7:
            config.Q19 = "Não sei.";
            break;
    };

    //Q20
    switch (dados[19].CodigoResposta) {
        case 1:
            config.Q20 = "Nunca estudou ou não completou a 4ª série/5º ano (antigo primário).";
            break;
        case 2:
            config.Q20 = "Completou a 4ª série/5º ano, mas não completou a 8ª série/9º ano (antigo ginásio).";
            break;
        case 3:
            config.Q20 = "Completou a 8ª série/9º ano, mas não completou o Ensino Médio (antigo 2º grau).";
            break;
        case 4:
            config.Q20 = "Completou o Ensino Médio, mas não completou o Ensino Superior.";
            break;
        case 5:
            config.Q20 = "Completou o Ensino Superior.";
            break;
        case 6:
            config.Q20 = "Completou a Pós-Graduação (especialização, mestrado ou doutorado).";
            break;
        case 7:
            config.Q20 = "Não sei.";
            break;
    };

    //Q21
    switch (dados[20].CodigoResposta) {
        case 1:
            config.Q21 = "Empregado.";
            break;
        case 2:
            config.Q21 = "Autônomo (trabalha por conta própria prestando serviços).";
            break;
        case 3:
            config.Q21 = "Empresário ou microempresário.";
            break;
        case 4:
            config.Q21 = "Aposentado ou pensionisto.";
            break;
        case 5:
            config.Q21 = "Desempregado.";
            break;
        case 6:
            config.Q21 = "Não sei/não quero responder.";
            break;
    };

    //Q22
    switch (dados[21].CodigoResposta) {
        case 1:
            config.Q22 = "Empregada.";
            break;
        case 2:
            config.Q22 = "Autônoma (trabalha por conta própria prestando serviços).";
            break;
        case 3:
            config.Q22 = "Empresária ou microempresária.";
            break;
        case 4:
            config.Q22 = "Aposentada ou pensionista.";
            break;
        case 5:
            config.Q22 = "Desempregada.";
            break;
        case 6:
            config.Q22 = "Não sei/não quero responder.";
            break;
    };

    //Q23
    switch (dados[22].CodigoResposta) {
        case 1:
            config.Q23 = "Até um salário mínimo (até R$954,00).";
            break;
        case 2:
            config.Q23 = "De um a dois salários mínimos (de R$954,01 a R$1.908,00).";
            break;
        case 3:
            config.Q23 = "De dois a três salários mínimos (de R$1.908,01 a R$2.862,00).";
            break;
        case 4:
            config.Q23 = "De três a cinco salários mínimos (de R$2.862,01 a R$4.770,00).";
            break;
        case 5:
            config.Q23 = "De cinco a oito salários mínimos (de R$4.770,01 a R$7.632,00).";
            break;
        case 6:
            config.Q23 = "De oito a quinze salários mínimos (mais de R$ 7.632,01 a R$ 14.310).";
            break;
        case 7:
            config.Q23 = "Mais de quinze salários mínimos (mais de R$ 14.310,01).";
            break;
        case 8:
            config.Q23 = "Não sei/não quero responder.";
            break;
    };

    //tabela 1
    var avaliacaoEscola = [];
    avaliacaoEscola.push([{ text: 'Faça uma avaliação da escola do seu filho, indicando uma nota de 1 a 5 para cada item, sendo 1 uma avaliação muito negativa, e 5 uma avaliação muito positiva.' + '\n ' + '(Marque uma resposta em cada linha)', style: 'tableHeader1' }, { text: '1', style: 'tableHeader2' }, { text: '2', style: 'tableHeader2' }, { text: '3', style: 'tableHeader2' }, { text: '4', style: 'tableHeader2' }, { text: '5', style: 'tableHeader2' }]);
    avaliacaoEscola.push([{ text: '02. Qualidade do ensino.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    avaliacaoEscola.push([{ text: '03. Localização da escola.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    avaliacaoEscola.push([{ text: '04. Segurança da escola.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    avaliacaoEscola.push([{ text: '05. Salas de aula.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    avaliacaoEscola.push([{ text: '06. Espaço para esportes.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    avaliacaoEscola.push([{ text: '07. Refeitório.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    avaliacaoEscola.push([{ text: '08. Banheiros.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);

    //tabela2
    var vidaEscolar = [];
    vidaEscolar.push([{ text: 'Como você participa da vida escolar de seu filho?' + '\n ' + '(Marque uma resposta em cada linha)', style: 'tableHeader1' }, { text: 'Sim, muito.', style: 'tableHeader2' }, { text: 'Sim, um pouco.', style: 'tableHeader2' }, { text: 'Não.', style: 'tableHeader2' }]);
    vidaEscolar.push([{ text: '12. Converso com meu filho sobre a escola.' }, { text: '' }, { text: '' }, { text: '' }]);
    vidaEscolar.push([{ text: '13. Acompanho as lições de casa do meu filho.' }, { text: '' }, { text: '' }, { text: '' }]);
    vidaEscolar.push([{ text: '14. Converso com os professores do meu filho.' }, { text: '' }, { text: '' }, { text: '' }]);
    vidaEscolar.push([{ text: '15. Participo das reuniões de pais.' }, { text: '' }, { text: '' }, { text: '' }]);
    vidaEscolar.push([{ text: '16. Participo das reuniões do Conselho de Escola.' }, { text: '' }, { text: '' }, { text: '' }]);
    vidaEscolar.push([{ text: '17. Participo de passeios, festas, campeonatos esportivos ou apresentações culturais promovidas pela escola.' }, { text: '' }, { text: '' }, { text: '' }]);
    vidaEscolar.push([{ text: '18. Participo de outras formas.' }, { text: '' }, { text: '' }, { text: '' }]);

    //tabela3
    var casaTem = [];
    casaTem.push([{ text: 'Na sua casa você tem:' + ' (Marque uma resposta em cada linha)', style: 'tableHeader1' }, { text: 'Sim.', style: 'tableHeader2' }, { text: 'Não.', style: 'tableHeader2' }]);
    casaTem.push([{ text: '24. Jornal de notícias.' }, { text: '' }, { text: '' }]);
    casaTem.push([{ text: '25. Revista de informação geral (Veja, Época, Isto É etc.).' }, { text: '' }, { text: '' }]);
    casaTem.push([{ text: '26. Dicionário.' }, { text: '' }, { text: '' }]);
    casaTem.push([{ text: '27. Livros (romances, poesias, contos, etc.).' }, { text: '' }, { text: '' }]);
    casaTem.push([{ text: '28. Gibis e histórias em quadrinhos.' }, { text: '' }, { text: '' }]);
    casaTem.push([{ text: '29. Revistas educativas ou de divulgação científica (Ciência Hoje, Galileu, etc.).' }, { text: '' }, { text: '' }]);

    //tabela4
    var casaTem2 = [];
    casaTem2.push([{ text: 'Na sua casa você tem:', style: 'tableHeader1' }, { text: 'Sim.', style: 'tableHeader2' }, { text: 'Não.', style: 'tableHeader2' }]);
    casaTem2.push([{ text: '30. Acesso à internet.' }, { text: '' }, { text: '' }]);
    casaTem2.push([{ text: '31. Serviço de TV por assinatura (cabo, satélite, streaming etc.).' }, { text: '' }, { text: '' }]);

    //tabela5
    var bensServicos = [];
    bensServicos.push([{ text: 'Indique quais e quantos bens e serviços domésticos listados abaixo você possui em casa.' + '(Marque uma resposta em cada linha)', style: 'tableHeader1' }, { text: 'Não tem.', style: 'tableHeader2' }, { text: 'Um.', style: 'tableHeader2' }, { text: 'Dois.', style: 'tableHeader2' }, { text: 'Três.', style: 'tableHeader2' }, { text: 'Quatro ou mais.', style: 'tableHeader2' }]);
    bensServicos.push([{ text: '32. Banheiro.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '33. Quartos para dormir.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '34. Televisão.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '35. Geladeira.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '36. Freezer (junto com geladeira ou separado).' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '37. Forno de micro-ondas.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '38. Telefone fixo.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '39. Telefone celular (tipo smartphone).' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '40. Computador (desktop ou notebook).' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '41. Tablet.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '42. Máquina de lavar roupa.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '43. Máquina de secar roupa (junto com máquina de lavar roupa ou separado).' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '44. Máquina de lavar louça.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '45. Aparelho de DVD ou qualquer dispositivo que leia DVD.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '46. Aspirador de pó.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '47. Automóvel (carro).' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '48. Motocicleta.' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '49. Empregada diarista (um ou dois dias na semana).' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    bensServicos.push([{ text: '50. Empregada mensalista (três ou mais dias na semana).' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }]);


    //Respostas
    config.R2 = dados[1].CodigoResposta;
    config.R3 = dados[2].CodigoResposta;
    //debugger

    var DadosAvaliacaoEscolaAux = [];


    //for (var i = 1; i < avaliacaoEscola.length; i++) {
    //var DadosAvaliacaoEscolaAux = [];

    //    for (var j = 1; j < avaliacaoEscola[i].length; j++) {
            
    //        if (config.dados[i].CodigoQuestao == i && config.dados[i].CodigoResposta == j) {
    //            DadosAvaliacaoEscolaAux.push([{ text: config.R2 }, ]);
    //        }
    //        else {
    //            DadosAvaliacaoEscolaAux.push([{ text: '' }, ]);
    //        }           
    //    }      
    //    DadosAvaliacaoEscolaAux.push([DadosAvaliacaoEscolaAux]);
    //}




   // avaliacaoEscola.push(DadosAvaliacaoEscolaAux);

    config.avaliacaoEscola = avaliacaoEscola;
    config.vidaEscolar = vidaEscolar;
    config.casaTem = casaTem;
    config.casaTem2 = casaTem2;
    config.bensServicos = bensServicos;

    config.docGenerator = function (config) {
        debugger
        var doc = {
            pageMargins: [30, 100],
            header: config.sedHeader,
            footer: config.sedFooter,
            content: [
                {
                    style: 'header',
                    text: "Questionário dos Pais"
                },
                {
                    style: 'subheader',
                    text: [
                            { text: "Aluno(a): ", bold: true },
                            { text: config.dados[0].Nome },
                    ],
                },

                {
                    style: 'bloco',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: 'BLOCO 1: OPINIÃO SOBRE A ESCOLA.', fillColor: '#eeeeee' }
                            ],
                        ]
                    },
                    layout: 'noBorders'
                },

                //Q1
                { text: '01.Qual seu grau de satisfação com a escola de seu filho?', style: 'pergunta' },
                { text: config.Q1, style: 'resposta' },

                //tabela 1 - Q2 - Q8
                {
                    style: 'tableBody',
                    table: {
                        widths: ['auto', 'auto', '*', '*', '*', '*'],
                        body: config.avaliacaoEscola
                    }
                },

                {
                    style: 'bloco',
                    fillColor: '#e8e8e8',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                { text: 'BLOCO 2: HÁBITOS DE ESTUDO, LEITURA E VIDA ESCOLAR.', fillColor: '#eeeeee' }
                            ],
                        ]
                    },
                    layout: 'noBorders'
                },

                { text: '09.A escola passa lição de casa para o seu filho?', style: 'pergunta' },
                { text: config.Q9, style: 'resposta' },

                { text: '10.Seu filho faz lição de casa?', style: 'pergunta' },
                { text: config.Q10, style: 'resposta' },

                { text: '11.Você ou seu filho utilizam o app Minha Escola SP no celular?', style: 'pergunta' },
                { text: config.Q11, style: 'resposta' },

                {
                    style: 'bloco',
                    table: {
                        widths: ['*'],
                        body: [
                                [
                                    { text: 'BLOCO 3: PARTICIPAÇÃO DOS PAIS (OU RESPONSÁVEIS).', fillColor: '#eeeeee' }
                                ]
                        ]
                    },
                    layout: 'noBorders'

                },

                 //tabela 1 - Q12 - Q18
                {
                    style: 'tableBody',
                    table: {
                        widths: ['*', 'auto', 'auto', 'auto'],
                        body: config.vidaEscolar
                    }
                },


                {
                    style: 'bloco',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                    { text: 'BLOCO 4: INFORMAÇÕES BÁSICAS.', fillColor: '#eeeeee' }
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },


                { text: '19.Até que série/nível de ensino o pai (ou responsável) estudou?', style: 'pergunta' },
                { text: config.Q19, style: 'resposta' },

                { text: '20.Até que série/nível de ensino a mãe (ou responsável) estudou?', style: 'pergunta' },
                { text: config.Q20, style: 'resposta' },

                { text: '21.Qual é a situação de trabalho do pai (ou responsável)?', style: 'pergunta' },
                { text: config.Q21, style: 'resposta' },

                { text: '22.Qual é a situação de trabalho da mãe (ou responsável)?', style: 'pergunta' },
                { text: config.Q22, style: 'resposta' },

                {
                    style: 'bloco',
                    table: {
                        widths: ['*'],
                        body: [
                            [
                                    { text: 'BLOCO 5: RENDA E ACESSO A BENS/SERVIÇOS DOMÉSTICOS.', fillColor: '#eeeeee' }
                            ]
                        ]
                    },
                    layout: 'noBorders'

                },
                { text: '23.Qual é a renda familiar de seu domicílio, ou seja, a soma dos salários e rendimentos (valor bruto) de todas as pessoas que moram em sua casa?', style: 'pergunta' },
                { text: config.Q23, style: 'resposta' },


                //tabela2 - Q24 - Q29
                {
                    style: 'tableBody',
                    table: {
                        widths: ['*', 'auto', 'auto'],
                        body: config.casaTem
                    }
                },

                //tabela3 - Q30 - Q31
                {
                    style: 'tableBody',
                    table: {
                        widths: ['*', 'auto', 'auto'],
                        body: config.casaTem2
                    }
                },

                //tabela4 - Q32 - Q50
                {
                    style: 'tableBody',
                    table: {
                        widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: config.bensServicos
                    }
                },
            ],

            styles: {
                header: {
                    fontSize: 15,
                    bold: true,
                    margin: [0, 10, 10, 10],
                    alignment: 'center'
                },
                subheader: {
                    fontSize: 9,
                    margin: [0, 5, 0, 5]
                },
                bloco: {
                    fontSize: 10,
                    bold: true,
                    margin: [0, 5, 0, 0]
                },
                pergunta: {
                    fontSize: 9,
                    bold: true,
                    margin: [0, 10, 0, 2]
                },
                resposta: {
                    fontSize: 8,
                    margin: [18, 0, 0, 2]
                },
                tableBody: {
                    margin: [0, 5, 0, 5],
                    fontSize: 8
                },
                tableHeader1: {
                    bold: true,
                    fontSize: 9,
                },
                tableHeader2: {
                    bold: true,
                    fontSize: 9,
                    alignment: 'center'
                },
                espacoV: {
                    margin: [0, 0, 0, 8],
                }
            },
            defaultStyle: {
                // alignment: 'justify'
            }

        }

        return doc;
    };

    var linha = function () {
        return {
            canvas: [
                {
                    type: 'line',
                    lineColor: 'grey',
                    x1: 0,
                    y1: 10,
                    x2: 520,
                    y2: 10,
                    lineWidth: 1,
                }
            ],
        };
    };

    function pageBreak() {

        return { text: "", pageBreak: 'after' };
    }


    sedPdfExporter.exportPdf(config);
}


//Mensagem.IgnorarMensagensAutomaticas = true;