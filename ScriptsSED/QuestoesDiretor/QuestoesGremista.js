
var questionario = {

    validar: function () {
        var quantidadeQuestoes = $("b.nr-questao").length;

        for (var i = 1; i <= quantidadeQuestoes; i++) {
            $("[name='linq-" + i + "']").css('border', '0px none'); // retira borda
            $("[name='grupo-" + i + "']").css('border', '0px none'); // retira borda

            var tipo = $("[name='q-" + i + "']:checked").attr("type");

            if (tipo == undefined) {
                tipo = "checkbox";
            } else {
                tipo = "radio";
            }

            // verificação radio 1 
            if (i == 1) {
                if ($('#q-1-5').is(':checked')) {
                    var y = $("[name='t-1-5']").val();
                    if (y == "") {
                        $("[name='linq-1']").css('border', '2px solid red');
                        break;
                    }
                }
            }

            if (tipo == "checkbox") {
                for (var x = 1; x <= 20; x++) {
                    var t = parseInt($("[name='q-" + i + "-" + x + "']:checked").val());
                    if (!isNaN(t)) {
                        $("[name='linq-" + i + "']").css('border', '0px none'); // retira borda
                        break;
                    }
                    else {
                        $("[name='linq-" + i + "']").css('border', '2px solid red');
                    }
                }

            }


            for (var h = 1; h <= 20; h++) {
                var t = parseInt($("[name='q-" + i + "-" + h + "']:checked").val());
                var y = $("[name='t-" + i + "-" + h + "']").val();

                if ((!isNaN(t)) && (y == "")) {
                    $("[name='linq-" + i + "']").css('border', '2px solid red');
                    break;
                }
            }


            if (i != 43) {
                //                if (($("[name='q-" + i + "']:checked").length == 0) && (tipo != "checkbox")) {    // colocar a borda demonstrando erro
                //$("[name='linq-" + i + "']").css('border', '2px solid red');

                if ($("[name='q-" + i + "']:checked").length == 0) {    // colocar a borda demonstrando erro
                    if ((i > 5) && (i < 10)) {
                        $("[name='grupo-1']").css('border', '2px solid red');
                    } else if ((i > 11) && (i < 15)) {
                        $("[name='grupo-2']").css('border', '2px solid red');
                    } else if ((i > 14) && (i < 18)) {
                        $("[name='grupo-3']").css('border', '2px solid red');
                    } else if ((i > 17) && (i < 24)) {
                        $("[name='grupo-4']").css('border', '2px solid red');
                    } else if ((i > 26) && (i < 31)) {
                        $("[name='grupo-5']").css('border', '2px solid red');
                    } else if ((i > 32) && (i < 35)) {
                        $("[name='grupo-6']").css('border', '2px solid red');
                    } else if ((i > 34) && (i < 42)) {
                        $("[name='grupo-7']").css('border', '2px solid red');
                    }

                }
            }
            if (i == 43) {
                //if ($("[name='o-" + i + "']").val() == "") {
                //    $("[name='linq-" + i + "']").css('border', '2px solid red');
                //}
                //else {
                $("[name='linq-" + i + "']").css('border', '0px none'); // retira borda
                //}
            }
        }


        for (var i = 1; i <= quantidadeQuestoes; i++) {

            var tipo = $("[name='q-" + i + "']:checked").attr("type");

            if (tipo == undefined) {
                tipo = "checkbox";
            } else {
                tipo = "radio";
            }

            if (i == 43) {
                tipo = "text";
            }


            // verificação radio 1 
            if (i == 1) {
                if ($('#q-1-5').is(':checked')) {
                    var y = $("[name='t-1-5']").val();
                    if (y == "") {
                        Mensagem.Alert({
                            tipo: "Alerta", titulo: "Alerta", mensagem: "Na questão " + i + " não foi preenchida a observação. Todas as questões são obrigatórias", botao: "Fechar"
                        });
                        $("[name='q-" + i + "']").focus();
                        return false;
                    }
                }
            }

            var t = 0
            if (tipo == "checkbox") {
                for (var x = 1; x <= 20; x++) {
                    t = parseInt($("[name='q-" + i + "-" + x + "']:checked").val());
                    if (isNaN(t)) {
                        continue;
                    }
                    else {
                        break;
                    }
                }
            }

            if ((isNaN(t)) && (tipo == "checkbox")) {
                Mensagem.Alert({
                    tipo: "Alerta", titulo: "Alerta", mensagem: "A questão " + i + " não foi preenchida. Todas as questões são obrigatórias", botao: "Fechar"
                });
                $("[name='q-" + i + "']").focus();
                return false;
            }



            for (var h = 1; h <= 20; h++) {
                var t = parseInt($("[name='q-" + i + "-" + h + "']:checked").val());
                var y = $("[name='t-" + i + "-" + h + "']").val();

                if ((!isNaN(t)) && (y == "")) {
                    Mensagem.Alert({
                        tipo: "Alerta", titulo: "Alerta", mensagem: "Na questão " + i + " não foi preenchida a observação. Todas as questões são obrigatórias", botao: "Fechar"
                    });
                    $("[name='q-" + i + "']").focus();
                    return false;
                }
            }


            if (i != 43) {
                // Mostra a mensagem de alerta e vai para a resposta errada
                if (($("[name='q-" + i + "']:checked").length == 0) && (tipo == "radio")) {
                    Mensagem.Alert({ tipo: "Alerta", titulo: "Alerta", mensagem: "A questão " + i + " não foi preenchida. Todas as questões são obrigatórias", botao: "Fechar" });
                    $("[name='q-" + i + "']").focus();
                    return false;
                }

            }

            if (i == 43) {
                //if ($("[name='o-" + i + "']").val() == "") {
                //    Mensagem.Alert({ tipo: "Alerta", titulo: "Alerta", mensagem: "A questão " + i + " não foi preenchida. Todas as questões são obrigatórias", botao: "Fechar" });
                //    $("[name='o-" + i + "']").focus();
                //    return false;
                //}
                //else {
                $("[name='grupo-" + i + "']").css('border', '0px none'); // retira borda
                //}
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

        var usuario = $("#usuario").val();
        var nome = $("#nome").val();

        for (var i = 1; i <= quantidadeQuestoes; i++) {
            var linhas = $("div", questionario);
            //var len = $("[name='q-" + i + "']").length;
            //if (len == 0) {
            //    quantidadeQuestoes++;
            //    continue;
            //}


            var tipo = $("[name='q-" + i + "']:checked").attr("type");

            if (tipo == undefined) {
                tipo = "checkbox";
            } else {
                tipo = "radio";
            }

            if (i == 43) {
                tipo = "text";
            }


            var resposta = {
                CodigoQuestao: i,
            }


            //if (tipo == "radio") {
            //    resposta.CodigoResposta = parseInt($("[name='q-" + i + "']:checked").val());
            //}


            if (tipo == "checkbox") {
                for (var x = 1; x <= 20; x++) {
                    //resposta.CodigoResposta = parseInt($("[name='q-" + i + "']:checked").val());

                    var t = parseInt($("[name='q-" + i + "-" + x + "']:checked").val());
                    if (!isNaN(t)) {
                        var tes = {};
                        tes.CodigoQuestao = i;
                        tes.CodigoResposta = parseInt($("[name='q-" + i + "-" + x + "']:checked").val());
                        tes.CodigoAluno = $("#aluno").val();
                        tes.NrRA = nrRa;
                        tes.DigRA = digRa;
                        tes.UfRA = ufRa;
                        tes.DataNascimento = dataNascimento;
                        tes.CodigoUsuario = usuario;
                        tes.DsResposta = $("[name='t-" + i + "-" + x + "']").val();
                        respostas.push(tes);
                    }
                }
                //} else {
                //    var binStr = "";
                //    $("[name='q-" + i + "']").each(function (x, e) { binStr += $(e).is(":checked") ? "1" : "0"; });
                //    resposta.CodigoResposta = parseInt(binStr.padStart(16, "0"), 2);
            }




            if (tipo == "radio") {
                var resp_radio = {};
                resp_radio.CodigoQuestao = i;
                resp_radio.CodigoResposta = parseInt($("[name='q-" + i + "']:checked").val());
                resp_radio.CodigoAluno = $("#aluno").val();
                resp_radio.NrRA = nrRa;
                resp_radio.DigRA = digRa;
                resp_radio.UfRA = ufRa;
                resp_radio.nomeAluno = nome;
                resp_radio.DataNascimento = dataNascimento;
                resp_radio.CodigoUsuario = usuario;
                resp_radio.DsResposta = "";

                // exceção para pergunta 1

                if ((i == 1) && ($('#q-1-5').is(':checked'))) {
                    resp_radio.DsResposta = $("[name='t-1-5']").val();
                }

                respostas.push(resp_radio);
            }

            if (tipo == "text") {
                var resp_text = {};
                resp_text.CodigoQuestao = i;
                resp_text.CodigoResposta = 1;
                resp_text.CodigoAluno = $("#aluno").val();
                resp_text.NrRA = nrRa;
                resp_text.DigRA = digRa;
                resp_text.UfRA = ufRa;
                resp_text.DataNascimento = dataNascimento;
                resp_text.CodigoUsuario = usuario;
                resp_text.DsResposta = $("[name='o-" + i + "']").val();
                respostas.push(resp_text);
            }

        }

        return respostas;
    },

    salvar: function () {
        var valido = questionario.validar();
        debugger
        if (!valido) return;

        var respostas = questionario.buscarPreenchimento();

        Mensagem.Alert({ tipo: "Alerta", titulo: "Alerta", mensagem: respostas, botao: "Fechar" });

        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: "Ao finalizar o questionário o mesmo não poderá ser editado. Deseja continuar?",
            tipo: "Alerta",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.unblockUI();
                        $.ajax({
                            url: "/QuestoesDiretor/SalvarGremista",
                            type: "POST",
                            //                            data: JSON.stringify({ respostas: respostas }),
                            data: JSON.stringify({ respostas: respostas, codigoAlunoResponsavel: $("#aluno").val() == null ? 0 : $("#aluno").val() }),
                            contentType: "application/json",
                            success: function (data) {
                                Mensagem.Alert({
                                    titulo: "Sucesso", tipo: "Sucesso", 
                                    mensagem: "Questionário enviado com sucesso. \n Aguarde o download do questionário em PDF.",
                                    botoes: [{
                                        botao: "Fechar",
                                        callback: function () {
                                            var url = "/Inicio/Index";
                                            questionario.imprimirPDF(respostas);
                                            setTimeout(function(){window.location = url, '';}, 1000); 
                                        }
                                    }]

                                });
                            },
                            error: window.tratadorJSONException
                        });
                    }
                },
                {
                    botao: "Não",
                    callback: function () {
                        $.unblockUI();
                    }
                }
            ]
        });

        

    },
    //},
    //politica: function () {
    //    $('#Gremista_Modal').modal();
    //}


    imprimirPDF: function (dados) {
        //debugger
        var config = {
            pageOrientation: "portrait",
            pageSize: "A4",
            pageMargins: [30, 80],
            title: "Questionario_Alunos_Gremistas"
        };

        sedPdfExporter.normalizeConfig(config);

        config.dados = dados;
        var qtdDados = dados.length;

        var textoResposta = '';
        var numCase = '';
        var idT = 0;
        var textoQuestao = '';

        config.nomeAluno = dados[0].nomeAluno;

        //Q1
        switch (dados[0].CodigoResposta) {
            case 1:
                config.Q1 = "Presidente, vice-presidente.";
                break;
            case 2:
                config.Q1 = "Diretor, coordenador ou representante de conselho.";
                break;
            case 3:
                config.Q1 = "Secretário.";
                break;
            case 4:
                config.Q1 = " Tesoureiro.";
                break;
            case 5:
                config.Q1 = "Outro. Qual?" + ' ' + dados[0].DsResposta + '';
                break;
        };

        //Q2
        switch (dados[1].CodigoResposta) {
            case 1:
                config.Q2 = "Menos de 01 ano.";
                break;
            case 2:
                config.Q2 = "De 01 ano a 02 anos.";
                break;
            case 3:
                config.Q2 = "Mais de 02 anos.";
                break;
        };

        //Q3
        switch (dados[2].CodigoResposta) {
            case 1:
                config.Q3 = "1º série do Ensino Médio.";
                break;
            case 2:
                config.Q3 = "2º série do Ensino Médio.";
                break;
            case 3:
                config.Q3 = "3º série do Ensino Médio.";
                break;
        };

        //Q4
        switch (dados[3].CodigoResposta) {
            case 1:
                config.Q4 = "Até 03 anos.";
                break;
            case 2:
                config.Q4 = "Mais de 03 até 05 anos.";
                break;
            case 3:
                config.Q4 = "Mais de 05 até 10 anos.";
                break;
            case 4:
                config.Q41 = "Mais de 10 anos.";
                break;
            case 5:
                config.Q4 = "Não quero informar.";
                break;
        };

        //Q5
        switch (dados[4].CodigoResposta) {
            case 1:
                config.Q5 = "Manhã.";
                break;
            case 2:
                config.Q5 = "Tarde / Vespertino.";
                break;
            case 3:
                config.Q5 = "Noite.";
                break;
            case 4:
                config.Q5 = "Integral.";
                break;
        };

        //Q6...
        //tabela 1 - Q6-8
        var limpezaAmbiente = [];
        limpezaAmbiente.push([{ text: 'Como você avalia a conservação e limpeza dos ambientes desta escola:', style: 'tableHeader1' }, { text: 'Ótima.', style: 'tableHeader2' }, { text: 'Boa.', style: 'tableHeader2' }, { text: 'Regular.', style: 'tableHeader2' }, { text: 'Ruim.', style: 'tableHeader2' }, { text: 'Péssima.', style: 'tableHeader2' }, { text: 'Não quero informar.', style: 'tableHeader2' }]);

        textoQuestao = '06.Salas de aula.';
        idT = 5;
        if (dados[idT].CodigoQuestao === 6) { limpezaAmbiente.push(questionario.respostaTabela(textoQuestao, dados, idT, 6, 1, 6)) }
        textoQuestao = '07.Banheiros.';
        idT++;
        if (dados[idT].CodigoQuestao === 7) { limpezaAmbiente.push(questionario.respostaTabela(textoQuestao, dados, idT, 7, 1, 6)) }
        textoQuestao = '08.Pátios.';
        idT++;
        if (dados[idT].CodigoQuestao === 8) { limpezaAmbiente.push(questionario.respostaTabela(textoQuestao, dados, idT, 8, 1, 6)) }
        textoQuestao = '09.Quadras.';
        idT++;
        if (dados[idT].CodigoQuestao === 9) { limpezaAmbiente.push(questionario.respostaTabela(textoQuestao, dados, idT, 9, 1, 6)) }

        //Q10
        idT++;
        switch (dados[idT].CodigoResposta) {
            case 1:
                config.Q10 = "Frequentemente.";
                break;
            case 2:
                config.Q10 = "Às vezes.";
                break;
            case 3:
                config.Q10 = "Raramente.";
                break;
            case 4:
                config.Q10 = "Nunca.";
                break;
            case 5:
                config.Q10 = "Não tem quadra na escola.";
                break;
        };

        //Q11
        idT++;
        switch (dados[idT].CodigoResposta) {
            case 1:
                config.Q11 = "Ótima.";
                break;
            case 2:
                config.Q11 = "Boa.";
                break;
            case 3:
                config.Q11 = "Regular.";
                break;
            case 4:
                config.Q11 = " Ruim.";
                break;
            case 5:
                config.Q11 = "Péssima.";
                break;
            case 6:
                config.Q11 = "Não quero informar.";
                break;
        };

        //tabela 2 - Q12-14
        var acessoComputadores = [];
        acessoComputadores.push([{ text: 'Com relação aos computadores da escola para acesso dos alunos, você diria que:', style: 'tableHeader1' }, { text: 'Ótima.', style: 'tableHeader2' }, { text: 'Boa.', style: 'tableHeader2' }, { text: 'Regular.', style: 'tableHeader2' }, { text: 'Ruim.', style: 'tableHeader2' }, { text: 'Péssima.', style: 'tableHeader2' }, { text: 'Não quero informar.', style: 'tableHeader2' }]);
        textoQuestao = '12.O acesso dos alunos aos equipamentos (disponibilidade da sala de informática).';
        idT++;
        if (dados[idT].CodigoQuestao === 12) { acessoComputadores.push(questionario.respostaTabela(textoQuestao, dados, idT, 12, 1, 6)) }
        textoQuestao = '13.O funcionamento e a conservação dos computadores.';
        idT++;
        if (dados[idT].CodigoQuestao === 13) { acessoComputadores.push(questionario.respostaTabela(textoQuestao, dados, idT, 13, 1, 6)) }
        textoQuestao = '14.A conexão à internet (velocidade).';
        idT++;
        if (dados[idT].CodigoQuestao === 14) { acessoComputadores.push(questionario.respostaTabela(textoQuestao, dados, idT, 14, 1, 6))
        }

        //tabela 3 - Q12-14
        var acessoEquipamentos = [];
        acessoEquipamentos.push([{ text: 'Com relação a condição de acesso dos alunos a outros equipamentos e espaços da escola, você diria que:', style: 'tableHeader1' }, { text: 'Ótima.', style: 'tableHeader2' }, { text: 'Boa.', style: 'tableHeader2' }, { text: 'Regular.', style: 'tableHeader2' }, { text: 'Ruim.', style: 'tableHeader2' }, { text: 'Péssima.', style: 'tableHeader2' }, { text: 'Não existe na escola.', style: 'tableHeader2' }, { text: 'Não quero informar.', style: 'tableHeader2' }]);
        textoQuestao = '15.Material pedagógico (TV, projetor, etc.).';
        idT++;
        if (dados[idT].CodigoQuestao === 15) { acessoEquipamentos.push(questionario.respostaTabela(textoQuestao, dados, idT, 15, 1, 7)) }
        textoQuestao = '16.Sala de leitura.';
        idT++;
        if (dados[idT].CodigoQuestao === 16) { acessoEquipamentos.push(questionario.respostaTabela(textoQuestao, dados, idT, 16, 1, 7)) }
        textoQuestao = '17.Material esportivo (bolas, redes, etc.).';
        idT++;
        if (dados[idT].CodigoQuestao === 17) { acessoEquipamentos.push(questionario.respostaTabela(textoQuestao, dados, idT, 17, 1, 7)) }

        //tabela 4 - Q18-23
        var freqAtividades = [];
        freqAtividades.push([{ text: 'Com que frequência a escola realiza as seguintes atividades para os alunos:', style: 'tableHeader1' }, { text: 'Sempre.', style: 'tableHeader2' }, { text: 'Frequentemente.', style: 'tableHeader2' }, { text: 'Algumas vezes.', style: 'tableHeader2' }, { text: 'Raramente.', style: 'tableHeader2' }, { text: 'Nunca.', style: 'tableHeader2' }, { text: 'Não quero informar.', style: 'tableHeader2' }]);
        textoQuestao = '18.Eventos culturais na escola (show, festival de música, projeção de filmes, etc.).';
        idT++;
        if (dados[idT].CodigoQuestao === 18) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 18, 1, 6)) }
        textoQuestao = '19.Atividades esportivas na escola (jogos, campeonatos, etc.).';
        idT++;
        if (dados[idT].CodigoQuestao === 19) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 19, 1, 6)) }
        textoQuestao = '20.Festas, feiras, eventos e projetos temáticos realizados na escola.';
        idT++;
        if (dados[idT].CodigoQuestao === 20) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 20, 1, 6)) }
        textoQuestao = '21.Palestras e debates promovidos na escola.';
        idT++;
        if (dados[idT].CodigoQuestao === 21) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 21, 1, 6)) }
        textoQuestao = ' 22.Visitas a teatros, museus, parques, universidades, etc.';
        idT++;
        if (dados[idT].CodigoQuestao === 22) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 22, 1, 6)) }
        textoQuestao = ' 23.Olimpíadas de conhecimento.';
        idT++;
        if (dados[idT].CodigoQuestao === 23) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 23, 1, 6)) }

        //Q24
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 24) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Nova explicação da matéria para os alunos que foram mal nas avaliações.";
                        break;
                    case 2:
                        numCase = "Horários diferenciados para apoio nas lições ou estudos.";
                        break;
                    case 3:
                        numCase = "Palestras ou debates.";
                        break;
                    case 4:
                        numCase = "Solicitação de trabalhos temáticos.";
                        break;
                    case 5:
                        numCase = "Aplicação de outras avaliações.";
                        break;
                    case 6:
                        numCase = "Outras atividades. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                    case 7:
                        numCase = "Não sei."
                        break;
                    case 8:
                        numCase = "Não realiza reforço."
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q24 = textoResposta;
        };

        //Q25
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 25) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Tem outro professor para substituir.";
                        break;
                    case 2:
                        numCase = "Adiantam outras aulas.";
                        break;
                    case 3:
                        numCase = "Agrupam os alunos com outras salas de aula.";
                        break;
                    case 4:
                        numCase = "Ficam na sala de leitura ou sala de informática.";
                        break;
                    case 5:
                        numCase = "Ficam na sala de aula com aula vaga.";
                        break;
                    case 6:
                        numCase = "Ficam na quadra ou pátio com aula vaga.";
                        break;
                    case 7:
                        numCase = "Os alunos são dispensados.";
                        break;
                    case 8:
                        numCase = "Tem reposição de aula em outro dia ou outro horário.";
                        break;
                    case 9:
                        numCase = "Fazem outra atividade como filmes, debates, palestras, etc..";
                        break;
                    case 10:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                    case 11:
                        numCase = "Não sei.";
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q25 = textoResposta;
        };
        //Q26
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 26) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Identificação dos principais problemas dos alunos.";
                        break;
                    case 2:
                        numCase = "Organização das classes misturando alunos 'fracos' e 'fortes'.";
                        break;
                    case 3:
                        numCase = "Acompanhamento das notas dos alunos.";
                        break;
                    case 4:
                        numCase = "Apoio dos alunos com baixo desempenho.";
                        break;
                    case 5:
                        numCase = "Controle da frequência dos alunos.";
                        break;
                    case 6:
                        numCase = "Projetos de integração (entre alunos, alunos e professores).";
                        break;
                    case 7:
                        numCase = "Cursos de formação continuada para os professores.";
                        break;
                    case 8:
                        numCase = "Contato com os pais de alunos (avisos de ausência, conversas sobre o aluno, etc.)";
                        break;
                    case 9:
                        numCase = "Atividades para melhoria da escola."
                        break;
                    case 10:
                        numCase = "Projetos culturais, esportivos, etc. para motivação dos alunos.";
                        break;
                    case 11:
                        numCase = "Atividades com o Grêmio Escolar.";
                        break;
                    case 12:
                        numCase = "Abertura da escola nos finais de semana.";
                        break;
                    case 13:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                    case 14:
                        numCase = "Nenhuma atividade.";
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q26 = textoResposta;
        };

        //tabela 5 - 27-30
        var freqConflitos = [];
        freqConflitos.push([{ text: 'Nesta escola com que frequência costuma acontecer confitos do tipo: brigas, ameaças, indisciplinas ou intolerância?', style: 'tableHeader1' }, { text: 'Quase não acontece.', style: 'tableHeader2' }, { text: 'De 1 a 2 vezes por semestre.', style: 'tableHeader2' }, { text: 'De 1 a 2 vezes por mês.', style: 'tableHeader2' }, { text: 'Quase toda semana.', style: 'tableHeader2' }, { text: 'Mais de 1 vez por semana.', style: 'tableHeader2' }]);
        textoQuestao = '27.Entre alunos.';
        idT++;
        if (dados[idT].CodigoQuestao === 27) { freqConflitos.push(questionario.respostaTabela(textoQuestao, dados, idT, 27, 1, 5)) }
        textoQuestao = '28.Entre alunos e professores.';
        idT++;
        if (dados[idT].CodigoQuestao === 28) { freqConflitos.push(questionario.respostaTabela(textoQuestao, dados, idT, 28, 1, 5)) }
        textoQuestao = '29.Entre alunos e direção.';
        idT++;
        if (dados[idT].CodigoQuestao === 29) { freqConflitos.push(questionario.respostaTabela(textoQuestao, dados, idT, 29, 1, 5)) }
        textoQuestao = '30.Entre alunos e outros funcionários.';
        idT++;
        if (dados[idT].CodigoQuestao === 30) { freqConflitos.push(questionario.respostaTabela(textoQuestao, dados, idT, 30, 1, 5)) }

        //Q31
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 31) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Conversa com as pessoas envolvidas no conflito.";
                        break;
                    case 2:
                        numCase = "Rodas de conversa com as classes.";
                        break;
                    case 3:
                        numCase = "Conversa com os pais.";
                        break;
                    case 4:
                        numCase = "Realização de oficinas com alunos, professores e demais funcionários sobre temas relacionados aos conflitos.";
                        break;
                    case 5:
                        numCase = "Inclusão dos alunos em atividades esportivas, culturais, etc.";
                        break;
                    case 6:
                        numCase = "Advertências e suspenções.";
                        break;
                    case 7:
                        numCase = "Registra as ocorrências.";
                        break;
                    case 8:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                    case 9:
                        numCase = "Nada";
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q31 = textoResposta;
        };

        //Q32
        idT++;
        switch (dados[idT].CodigoResposta) {
            case 1:
                config.Q32 = "Não aconteceu este ano.";
                break;
            case 2:
                config.Q32 = "De 1 a 2 vezes por semestre.";
                break;
            case 3:
                config.Q32 = "De 1 a 2 vezes por mês.";
                break;
            case 4:
                config.Q32 = "Quase toda semana.";
                break;
            case 5:
                config.Q32 = "Não sei.";
                break;
            case 6:
                config.Q32 = "Não quero informar.";
                break;
        };


        //tabela 6 - Q33-34
        var nivelSeguranca = [];
        nivelSeguranca.push([{ text: 'Com relação à segurança desta escola, geralmente como os alunos se sentem: ', style: 'tableHeader1' }, { text: 'Muito seguro.', style: 'tableHeader2' }, { text: 'Seguro. ', style: 'tableHeader2' }, { text: 'Inseguro.', style: 'tableHeader2' }, { text: 'Muito inseguro.', style: 'tableHeader2' }, { text: 'Não quero informar.', style: 'tableHeader2' }]);
        textoQuestao = '33.Dentro da escola.';
        idT++;
        if (dados[idT].CodigoQuestao === 33) { nivelSeguranca.push(questionario.respostaTabela(textoQuestao, dados, idT, 33, 1, 5)) }
        textoQuestao = '34.No entorno da escola.';
        idT++;
        if (dados[idT].CodigoQuestao === 34) { nivelSeguranca.push(questionario.respostaTabela(textoQuestao, dados, idT, 34, 1, 5)) }


        //tabela 7 - Q35-41
        var incentivoAprender = [];
        incentivoAprender.push([{ text: 'Qual o seu grau de concordância com as seguintes afirmações:', style: 'tableHeader1' }, { text: 'Concordo bastante.', style: 'tableHeader2' }, { text: 'Concordo. ', style: 'tableHeader2' }, { text: 'Nem concordo Nem discordo.', style: 'tableHeader2' }, { text: 'Discordo.', style: 'tableHeader2' }, { text: 'Discordo bastante.', style: 'tableHeader2' }, { text: '	Não sei responder.', style: 'tableHeader2' }, ]);
        textoQuestao = '35.Os alunos são incentivados a aprender cada vez mais.';
        idT++;
        if (dados[idT].CodigoQuestao === 35) { incentivoAprender.push(questionario.respostaTabela(textoQuestao, dados, idT, 35, 1, 6)) }
        textoQuestao = '36.As atividades esportivas e culturais são valorizadas.';
        idT++;
        if (dados[idT].CodigoQuestao === 36) { incentivoAprender.push(questionario.respostaTabela(textoQuestao, dados, idT, 36, 1, 6)) }
        textoQuestao = '37.Os alunos são bastante incentivados a usar a tecnologia.';
        idT++;
        if (dados[idT].CodigoQuestao === 37) { incentivoAprender.push(questionario.respostaTabela(textoQuestao, dados, idT, 37, 1, 6)) }
        textoQuestao = '38.Os professores sabem conversar com os alunos.';
        idT++;
        if (dados[idT].CodigoQuestao === 38) { incentivoAprender.push(questionario.respostaTabela(textoQuestao, dados, idT, 38, 1, 6)) }
        textoQuestao = '39.Os alunos gostam das aulas porque costumam ser interessantes.';
        idT++;
        if (dados[idT].CodigoQuestao === 39) { incentivoAprender.push(questionario.respostaTabela(textoQuestao, dados, idT, 39, 1, 6)) }
        textoQuestao = '40.A escola apoia os alunos com dificuldades.';
        idT++;
        if (dados[idT].CodigoQuestao === 40) { incentivoAprender.push(questionario.respostaTabela(textoQuestao, dados, idT, 40, 1, 6)) }
        textoQuestao = '41.Os alunos são chamados para participar das decisões sobre os problemas da escola.';
        idT++;
        if (dados[idT].CodigoQuestao === 41) { incentivoAprender.push(questionario.respostaTabela(textoQuestao, dados, idT, 41, 1, 6)) }


        //Q42
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 42) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Cursar ensino superior.";
                        break;
                    case 2:
                        numCase = "Frequentar cursos profissionalizantes.";
                        break;
                    case 3:
                        numCase = "Fazer cursos de idiomas, computação, etc.";
                        break;
                    case 4:
                        numCase = "Trabalhar ou procurar emprego.";
                        break;
                    case 5:
                        numCase = "Cuidar de família ou parentes (cuidar de filhos, cuidar dos pais, etc.).";
                        break;
                    case 6:
                        numCase = "Parar os estudos.";
                        break;
                    case 7:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                    case 8:
                        numCase = "Não sei.";
                        break;
                    case 9:
                        numCase = "Não quero informar.";
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q42 = textoResposta;
        };

        //Q43
        idT++;
        config.Q43 = dados[idT].DsResposta + '';

        config.limpezaAmbiente = limpezaAmbiente;
        config.acessoComputadores = acessoComputadores;
        config.acessoEquipamentos = acessoEquipamentos;
        config.freqAtividades = freqAtividades;
        config.freqConflitos = freqConflitos;
        config.nivelSeguranca = nivelSeguranca;
        config.incentivoAprender = incentivoAprender;

        config.docGenerator = function (config) {
            //debugger
            var doc = {
                pageMargins: [30, 100],
                header: config.sedHeader,
                footer: config.sedFooter,
                content: [
                            {
                                style: 'header',
                                text: "Questionário dos Alunos Gremistas"
                            },
                            {
                                style: 'subheader',
                                text: [
                                        { text: "Aluno(a): ", bold: true },
                                        { text: config.nomeAluno },
                                ],
                            },

        { text: '01.Qual a sua função na diretoria gremista?', style: 'pergunta' },
        { text: config.Q1, style: 'resposta' },

        { text: '02.Há quanto tempo você atua em diretoria gremista nesta escola?', style: 'pergunta' },
        { text: config.Q2, style: 'resposta' },

        { text: '03.Em que série você estuda?', style: 'pergunta' },
        { text: config.Q3, style: 'resposta' },

        { text: '04.Há quantos anos você estuda nesta escola?', style: 'pergunta' },
        { text: config.Q4, style: 'resposta' },

        { text: '05.Em que período você estuda nesta escola?', style: 'pergunta' },
        { text: config.Q5, style: 'resposta' },

            //tabela1
            {
                style: 'tableBody',
                table: {
                    dontBreakRows: true,
                    headerRows: 2,
                    keepWithHeaderRows: true,
                    widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: config.limpezaAmbiente
                }
            },

        { text: '10.Além das aulas de educação física, com que frequência a quadra fica livre para uso dos alunos?', style: 'pergunta' },
        { text: config.Q10, style: 'resposta' },

        { text: '11.Como você avalia a conservação dos mobiliários nas salas de aula?', style: 'pergunta' },
        { text: config.Q11, style: 'resposta' },

            //tabela 2
            {
                style: 'tableBody',
                table: {
                    dontBreakRows: true,
                    headerRows: 2,
                    keepWithHeaderRows: true,
                    widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: config.acessoComputadores
                }
            },

                //tabela 3
                {
                    style: 'tableBody',
                    table: {
                        dontBreakRows: true,
                        headerRows: 2,
                        keepWithHeaderRows: true,
                        widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: config.acessoEquipamentos
                    }
                },

                //tabela 4
                {
                    style: 'tableBody',
                    table: {
                        dontBreakRows: true,
                        headerRows: 2,
                        keepWithHeaderRows: true,
                        widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: config.freqAtividades
                    }
                },


        { text: '24.Como a escola realiza reforço ou recuperação para os alunos? ', style: 'pergunta' },
        { text: config.Q24, style: 'resposta' },

        { text: '25.Quando falta algum professor, o que acontece com os alunos da sala?', style: 'pergunta' },
        { text: config.Q25, style: 'resposta' },

        { text: '26.Quais destas atividades costumam acontecer na escola?', style: 'pergunta' },
        { text: config.Q26, style: 'resposta' },


                //tabela 5
                {
                    style: 'tableBody',
                    table: {
                        dontBreakRows: true,
                        headerRows: 2,
                        keepWithHeaderRows: true,
                        widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: config.freqConflitos
                    }
                },

        { text: '31.O que a escola costuma fazer para solucionar esses conflitos?', style: 'pergunta' },
        { text: config.Q31, style: 'resposta' },

        { text: '32.Neste ano, com que frequência aconteceram roubo ou furto nesta escola?', style: 'pergunta' },
        { text: config.Q32, style: 'resposta' },

                //tabela 6
                {
                    style: 'tableBody',
                    table: {
                        dontBreakRows: true,
                        headerRows: 2,
                        keepWithHeaderRows: true,
                        widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: config.nivelSeguranca
                    }
                },

                //tabela 7
                {
                    style: 'tableBody',
                    table: {
                        dontBreakRows: true,
                        headerRows: 2,
                        keepWithHeaderRows: true,
                        widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: config.incentivoAprender
                    }
                },

        { text: '42.Na sua opinião, após a conclusão do ensino médio a maioria dos alunos vai:', style: 'pergunta' },
        { text: config.Q42, style: 'resposta' },

        { text: '43.Gostaria de deixar alguma sugestão, crítica ou comentário?', style: 'pergunta' },
        { text: config.Q43, style: 'resposta' },
                ],
                "styles": {
                    "header": {
                        "fontSize": 15,
                        "bold": true,
                        "margin": [0, 10, 10, 10],
                        "alignment": "center"
                    },
                    "subheader": {
                        "fontSize": 9,
                        "margin": [0, 5, 0, 5]
                    },
                    "bloco": {
                        "fontSize": 10,
                        "bold": true,
                        "margin": [0, 5, 0, 0]
                    },
                    "pergunta": {
                        "fontSize": 9,
                        "bold": true,
                        "margin": [0, 8, 0, 2]
                    },
                    "resposta": {
                        "fontSize": 8,
                        "margin": [15, 0, 0, 2]
                    },
                    "respostaTab": {
                        "fontSize": 8,
                        "alignment": "center",
                        "margin": [0, 2, 0, 0]
                    },
                    "tableBody": {
                        "margin": [0, 10, 0, 10],
                        "fontSize": 8
                    },
                    "tableHeader1": {
                        "bold": true,
                        "fontSize": 9
                    },
                    "tableHeader2": {
                        "bold": true,
                        "fontSize": 9,
                        "alignment": "center"
                    },
                    "observacao": {
                        "fontSize": 7,
                        "margin": [16, 0, 0, 5]
                    },
                    "espacoV": {
                        "margin": [0, 0, 0, 8]
                    }
                },
                defaultStyle: {
                    // alignment: 'justify'
                }
            }
            return doc;
        };
        sedPdfExporter.exportPdf(config);
    },


    respostaTabela: function (textoQuestao, dados, idT, questao, xI, xF) {
        var criaR = [];
        criaR.push({ text: textoQuestao });
        for (var x = xI; x <= xF; x++) {
            if (dados[idT].CodigoResposta === x) {
                criaR.push({ text: 'X', style: 'respostaTab' });
            }
            else {
                criaR.push({ text: '' });
            }
        }
        return criaR
    }
};





Mensagem.IgnorarMensagensAutomaticas = true;