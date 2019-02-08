
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


                for (var h = 1; h <= 20; h++) {
                    var t = parseInt($("[name='q-" + i + "-" + h + "']:checked").val());
                    var y = $("[name='t-" + i + "-" + h + "']").val();

                    if ((!isNaN(t)) && (y == "")) {
                        $("[name='linq-" + i + "']").css('border', '2px solid red');
                        break;
                    }
                }



            }

            if (i != 52) {
                //                if (($("[name='q-" + i + "']:checked").length == 0) && (tipo != "checkbox")) {    // colocar a borda demonstrando erro
                //$("[name='linq-" + i + "']").css('border', '2px solid red');

                if ($("[name='q-" + i + "']:checked").length == 0) {    // colocar a borda demonstrando erro
                    if ((i > 5) && (i < 9)) {
                        $("[name='grupo-1']").css('border', '2px solid red');
                    } else if ((i > 8) && (i < 12)) {
                        $("[name='grupo-2']").css('border', '2px solid red');
                    } else if ((i > 15) && (i < 21)) {
                        $("[name='grupo-3']").css('border', '2px solid red');
                    } else if ((i > 20) && (i < 24)) {
                        $("[name='grupo-4']").css('border', '2px solid red');
                    } else if ((i > 24) && (i < 31)) {
                        $("[name='grupo-5']").css('border', '2px solid red');
                    } else if ((i > 34) && (i < 39)) {
                        $("[name='grupo-6']").css('border', '2px solid red');
                    } else if ((i > 41) && (i < 44)) {
                        $("[name='grupo-7']").css('border', '2px solid red');
                    } else if ((i > 43) && (i < 46)) {
                        $("[name='grupo-8']").css('border', '2px solid red');
                    }

                }
            }
            if (i == 52) {
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

            if (i == 52) {
                tipo = "text";
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



            if (i != 52) {
                // Mostra a mensagem de alerta e vai para a resposta errada
                if (($("[name='q-" + i + "']:checked").length == 0) && (tipo == "radio")) {
                    Mensagem.Alert({ tipo: "Alerta", titulo: "Alerta", mensagem: "A questão " + i + " não foi preenchida. Todas as questões são obrigatórias", botao: "Fechar" });
                    $("[name='q-" + i + "']").focus();
                    return false;
                }
                // pula validação para os caso da pergunta 13 for não                        
                if (i == 13) {
                    var b = parseInt($("[name='q-" + i + "']:checked").val())
                    if (b == 2) {
                        i = i + 2;
                    }
                }
            }

            if (i == 52) {
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

            if (i == 52) {
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
                        tes.nomeDiretor = nome;
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
                resp_radio.nomeDiretor = nome;
                resp_radio.DataNascimento = dataNascimento;
                resp_radio.CodigoUsuario = usuario;
                resp_radio.DsResposta = "";
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

            // pula validação para os caso da pergunta 13 for não                        
            if (i == 13) {
                var b = parseInt($("[name='q-" + i + "']:checked").val())
                if (b == 2) {
                    i = i + 2;
                }
            }
        }

        return respostas;
    },

    salvar: function () {
        var valido = questionario.validar();
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
                            url: "/QuestoesDiretor/Salvar",
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
                                            setTimeout(function () { window.location = url, ''; }, 1000);
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

        //;
    },

    //politica: function () {
    //    $('#Diretor_Modal').modal();
    //}


     imprimirPDF: function (dados) {
        //debugger
        var config = {
            pageOrientation: "portrait",
            pageSize: "A4",
            pageMargins: [30, 80],
            title: "Questionario_Diretores"
        };

        sedPdfExporter.normalizeConfig(config);

        config.dados = dados;
        var qtdDados = dados.length;

        var textoResposta = '';
        var numCase = '';
        var idT = 0;
        var textoQuestao = '';

        config.nomeDiretor = dados[0].nomeDiretor;

        //Q1
        for (var i = 0; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 1) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Baixo desempenho.";
                        break;
                    case 2:
                        numCase = " Desmotivação dos alunos.";
                        break;
                    case 3:
                        numCase = "Falta de importância dada pelo aluno ao conteúdo escolar.";
                        break;
                    case 4:
                        numCase = " Muita ausência dos alunos por motivos de trabalho.";
                        break;
                    case 5:
                        numCase = " Muita ausência dos alunos por outros motivos.";
                        break;
                    case 6:
                        numCase = "Fragilidade no contexto familiar (desagregação, violência, gravidez, etc.).";
                        break;
                    case 7:
                        numCase = "Condições socioeconômicas da família.";
                        break;
                    case 8:
                        numCase = "Falta de interesse dos pais em relação ao aprendizado dos alunos.";
                        break;
                    case 9:
                        numCase = " Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                    case 10:
                        numCase = "Nesta escola quase não tem evasão.";
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q1 = textoResposta;
        };

        //Q2
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 2) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Média elevada de alunos por turma.";
                        break;
                    case 2:
                        numCase = "Turmas de alunos homogêneas.";
                        break;
                    case 3:
                        numCase = "Professores desmotivados.";
                        break;
                    case 4:
                        numCase = "Habilidade dos professores em transmitir o conteúdo das matérias.";
                        break;
                    case 5:
                        numCase = "Falta de diálogo entre professor e aluno.";
                        break;
                    case 6:
                        numCase = "Insuficiência de atividades de reforço ou de recuperação.";
                        break;
                    case 7:
                        numCase = "Indisciplina ou conflitos em sala de aula.";
                        break;
                    case 8:
                        numCase = "Falta de segurança escolar (ocorrência de brigas, furtos, etc.).";
                        break;
                    case 9:
                        numCase = "Falta de segurança no entorno da escola";
                        break;
                    case 10:
                        numCase = "Problemas de conservação da escola.";
                        break;
                    case 11:
                        numCase = "Escola não está aberta nos finais de semana.";
                        break;
                    case 12:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                    case 13:
                        numCase = "Nesta escola quase não tem evasão.";
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            config.Q2 = textoResposta;
        };

        //Q3
        idT++;
        switch (dados[idT].CodigoResposta) {
            case 1:
                config.Q3 = "Em três anos.";
                break;
            case 2:
                config.Q3 = "Em quatro anos.";
                break;
            case 3:
                config.Q3 = "Em cinco anos.";
                break;
            case 4:
                config.Q3 = "Em outras modalidades de ensino (Educação de Jovens e Alunos – EJA, supletivo).";
                break;
            case 5:
                config.Q3 = "Não irão concluir o ensino médio.";
                break;
            case 6:
                config.Q3 = "Não quer informar.";
                break;
        };

        //Q4
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 4) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Cursar ensino superior.";
                        break;
                    case 2:
                        numCase = "Frequentar curso profissionalizante em área técnica.";
                        break;
                    case 3:
                        numCase = "Fazer cursos livres de idiomas, computação, etc.";
                        break;
                    case 4:
                        numCase = "Inserir-se ou continuar no mercado de trabalho.";
                        break;
                    case 5:
                        numCase = "Somente cuidar da família ou parentes.";
                        break;
                    case 6:
                        numCase = "Descontinuar os estudos.";
                        break;
                    case 7:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q4 = textoResposta;
        };

        //Q5
        idT++;
        switch (dados[idT].CodigoResposta) {
            case 1:
                config.Q5 = "Ótima.";
                break;
            case 2:
                config.Q5 = "Boa.";
                break;
            case 3:
                config.Q5 = "Regular.";
                break;
            case 4:
                config.Q5 = "Ruim.";
                break;
            case 5:
                config.Q5 = "Péssima.";
                break;
            case 6:
                config.Q5 = "Não quer informar.";
                break;
        };


        //Q6...
        //tabela 1 - Q6-8
        var acessoComputador = [];
        acessoComputador.push([{ text: 'Com relação aos computadores da escola para acesso dos alunos, você diria que: ', style: 'tableHeader1' }, { text: 'Ótima.', style: 'tableHeader2' }, { text: 'Boa.', style: 'tableHeader2' }, { text: 'Regular.', style: 'tableHeader2' }, { text: 'Ruim.', style: 'tableHeader2' }, { text: 'Péssima.', style: 'tableHeader2' }, { text: 'Não quero informar.', style: 'tableHeader2' }]);
        textoQuestao = '06.A condição de acesso pelos alunos aos computadores (disponibilidade da sala de informática).';
        idT++;
        if (dados[idT].CodigoQuestao === 6) { acessoComputador.push(questionario.respostaTabela(textoQuestao, dados, idT, 6, 1, 6)) }
        textoQuestao = '07.O funcionamento e a conservação.';
        idT++;
        if (dados[idT].CodigoQuestao === 7) { acessoComputador.push(questionario.respostaTabela(textoQuestao, dados, idT, 7, 1, 6)) }
        textoQuestao = '08.A conexão à internet (velocidade).';
        idT++;
        if (dados[idT].CodigoQuestao === 8) { acessoComputador.push(questionario.respostaTabela(textoQuestao, dados, idT, 8, 1, 6)) }

        //tabela 2 Q9-11
        var outrosEquipamentos = [];
        outrosEquipamentos.push([{ text: 'Com relação a condição de acesso dos alunos a outros equipamentos e espaços da escola, você diria que: ', style: 'tableHeader1' }, { text: 'Ótima.', style: 'tableHeader2' }, { text: 'Boa.', style: 'tableHeader2' }, { text: 'Regular.', style: 'tableHeader2' }, { text: 'Ruim.', style: 'tableHeader2' }, { text: 'Péssima.', style: 'tableHeader2' }, { text: 'Não existe na escola.', style: 'tableHeader2' }, { text: 'Não quero informar.', style: 'tableHeader2' }]);
        textoQuestao = '09. Material pedagógico (TV, projetor, etc.).';
        idT++;
        if (dados[idT].CodigoQuestao === 9) { outrosEquipamentos.push(questionario.respostaTabela(textoQuestao, dados, idT, 9, 1, 7)) }
        textoQuestao = '10. Sala de leitura.';
        idT++;
        if (dados[idT].CodigoQuestao === 10) { outrosEquipamentos.push(questionario.respostaTabela(textoQuestao, dados, idT, 9, 1, 7)) }
        textoQuestao = '11. Material esportivo (bolas, redes, etc.).';
        idT++;
        if (dados[idT].CodigoQuestao === 11) { outrosEquipamentos.push(questionario.respostaTabela(textoQuestao, dados, idT, 9, 1, 7)) }


        //Q12
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 12) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Associação de Pais e Mestres (APM).";
                        break;
                    case 2:
                        numCase = "Grêmio Escolar.";
                        break;
                    case 3:
                        numCase = "Empresas ou comerciantes do bairro.";
                        break;
                    case 4:
                        numCase = "Outras. Quais?." + ' ' + dados[i].DsResposta;
                        break;
                    case 5:
                        numCase = "Não realizou ação em parceria.";
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q12 = textoResposta;
        };

        //Q13
        idT++;
        switch (dados[idT].CodigoResposta) {
            case 1:
                config.Q13 = "Sim. (siga 14)";
                break;
            case 2:
                config.Q13 = "Não. (passe para 16)";
                break;
        };

        //Q14
        if (dados[idT].CodigoResposta === 1) {
            idT++;
            textoResposta = '';
            numCase = '';
            for (var i = idT; i < qtdDados; i++) {
                if (dados[i].CodigoQuestao === 14) {
                    idT = i;

                    switch (dados[i].CodigoResposta) {
                        case 1:
                            numCase = "Federal.";
                            break;
                        case 2:
                            numCase = "Estadual.";
                            break;
                        case 3:
                            numCase = "Organizações não governamentais nacionais.";
                            break;
                        case 4:
                            numCase = "Organismos internacionais.";
                            break;
                        case 5:
                            numCase = "Associação de Pais e Mestres (APM).";
                            break;
                        case 6:
                            numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                            break;
                    };

                    textoResposta += numCase + ' \n';
                }
                else {
                    { break; }
                }
                config.Q14 = textoResposta;
            };


            //Q15
            idT++;
            switch (dados[idT].CodigoResposta) {
                case 1:
                    config.Q15 = "Sim.";
                    break;
                case 2:
                    config.Q15 = "Não.";
                    break;
            };
        }
        else {
            config.Q14 = '';
            config.Q15 = '';
        }

        //tabela 3 - Q16-20
        var apoioAcoes = [];
        apoioAcoes.push([{ text: 'Em que medida, as diferentes equipes desta escola tem apoiado suas ações na construção de um ambiente escolar favorável à aprendizagem?', style: 'tableHeader1' }, { text: 'Sempre.', style: 'tableHeader2' }, { text: 'Frequentemente.', style: 'tableHeader2' }, { text: 'Algumas vezes.', style: 'tableHeader2' }, { text: 'Raramente.', style: 'tableHeader2' }, { text: 'Nunca.', style: 'tableHeader2' }, { text: 'Não quero informar.', style: 'tableHeader2' }]);
        textoQuestao = '16.Equipe de Gestão Escolar (diretor, vice-diretor e coordenador pedagógico).';
        idT++;
        if (dados[idT].CodigoQuestao === 16) { apoioAcoes.push(questionario.respostaTabela(textoQuestao, dados, idT, 16, 1, 6)) }
        textoQuestao = '17.Professores.';
        idT++;
        if (dados[idT].CodigoQuestao === 17) { apoioAcoes.push(questionario.respostaTabela(textoQuestao, dados, idT, 17, 1, 6)) }
        textoQuestao = '18.Agente de Organização Escolar (apoio administrativo, GOE, etc.).';
        idT++;
        if (dados[idT].CodigoQuestao === 18) { apoioAcoes.push(questionario.respostaTabela(textoQuestao, dados, idT, 18, 1, 6)) }
        textoQuestao = '19.Agente de Serviços Escolares (caseiros, merendeiros e auxiliares de limpeza, etc.).';
        idT++;
        if (dados[idT].CodigoQuestao === 19) { apoioAcoes.push(questionario.respostaTabela(textoQuestao, dados, idT, 19, 1, 6)) }
        textoQuestao = '20.Conselho de Escola.';
        idT++;
        if (dados[idT].CodigoQuestao === 20) { apoioAcoes.push(questionario.respostaTabela(textoQuestao, dados, idT, 20, 1, 6)) }

        //tabela 4 - Q21-23
        var interecaoEquipe = [];
        interecaoEquipe.push([{ text: 'Como você avalia a integração das equipes escolares nos seguintes aspectos: ', style: 'tableHeader1' }, { text: 'Ótima.', style: 'tableHeader2' }, { text: 'Boa.', style: 'tableHeader2' }, { text: 'Regular.', style: 'tableHeader2' }, { text: 'Ruim.', style: 'tableHeader2' }, { text: 'Péssima.', style: 'tableHeader2' }, { text: 'Não quero informar.', style: 'tableHeader2' }]);
        textoQuestao = '21.Rotina de comunicação.';
        idT++;
        if (dados[idT].CodigoQuestao === 21) { interecaoEquipe.push(questionario.respostaTabela(textoQuestao, dados, idT, 21, 1, 6)) }
        textoQuestao = '22.Atuação conjunta.';
        idT++;
        if (dados[idT].CodigoQuestao === 22) { interecaoEquipe.push(questionario.respostaTabela(textoQuestao, dados, idT, 22, 1, 6)) }
        textoQuestao = '23.Implementação de mudanças.';
        idT++;
        if (dados[idT].CodigoQuestao === 23) { interecaoEquipe.push(questionario.respostaTabela(textoQuestao, dados, idT, 23, 1, 6)) }

        //Q24
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 24) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Equipe de Gestão Escolar (diretor, vice-diretor e coordenador pedagógico).";
                        break;
                    case 2:
                        numCase = "Professores.";
                        break;
                    case 3:
                        numCase = "Agente de Organização Escolar (apoio administrativo, GOE, etc.).";
                        break;
                    case 4:
                        numCase = "Agente de Serviços Escolares (caseiros, merendeiros e auxiliares de limpeza, etc.).";
                        break;
                    case 5:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                    case 6:
                        numCase = "Não indicaria nenhuma equipe.";
                        break;
                    case 7:
                        numCase = "Não sabe.";
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q24 = textoResposta;
        };


        //tabela 5 - 25-30
        var freqAtividades = [];
        freqAtividades.push([{ text: 'Com que frequência você participa das seguintes atividades com os alunos: ', style: 'tableHeader1' }, { text: 'Sempre.', style: 'tableHeader2' }, { text: 'Frequentemente.', style: 'tableHeader2' }, { text: 'Algumas vezes.', style: 'tableHeader2' }, { text: 'Raramente.', style: 'tableHeader2' }, { text: 'Nunca.', style: 'tableHeader2' }, { text: 'Não quero informar.', style: 'tableHeader2' }]);
        textoQuestao = '25.Eventos culturais na escola (show, festival de música, projeção de flmes, etc.).';
        idT++;
        if (dados[idT].CodigoQuestao === 25) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 25, 1, 6)) }

        textoQuestao = '26.Atividades esportivas na escola (jogos, campeonatos, etc.).';
        idT++;
        if (dados[idT].CodigoQuestao === 26) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 26, 1, 6)) }

        textoQuestao = '27.Festas, feiras, eventos e projetos temáticos realizados na escola.';
        idT++;
        if (dados[idT].CodigoQuestao === 27) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 27, 1, 6)) }

        textoQuestao = '28.Palestras e debates promovidos na escola.';
        idT++;
        if (dados[idT].CodigoQuestao === 28) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 28, 1, 6)) }

        textoQuestao = '29.Visitas a teatros, museus, parques, universidades, etc.';
        idT++;
        if (dados[idT].CodigoQuestao === 29) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 29, 1, 6)) }

        textoQuestao = '30.Olimpíadas de conhecimento.';
        idT++;
        if (dados[idT].CodigoQuestao === 30) { freqAtividades.push(questionario.respostaTabela(textoQuestao, dados, idT, 30, 1, 6)) }


        //Q31
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 31) {
                idT = i;

                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Sempre.";
                        break;
                    case 2:
                        numCase = "Frequentemente.";
                        break;
                    case 3:
                        numCase = "Algumas vezes.";
                        break;
                    case 4:
                        numCase = "Raramente.";
                        break;
                    case 5:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                    case 6:
                        numCase = "Nunca.";
                        break;
                    case 7:
                        numCase = "Não tem Grêmio na escola.";
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
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 32) {
                idT = i;
                switch (dados[idT].CodigoResposta) {
                    case 1:
                        numCase = "Equipe de Gestão Escolar (diretor, vice-diretor e coordenador pedagógico).";
                        break;
                    case 2:
                        numCase = "Professores.";
                        break;
                    case 3:
                        numCase = "Pais de alunos.";
                        break;
                    case 4:
                        numCase = "Alunos (representantes de sala, do Grêmio, etc.).";
                        break;
                    case 5:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q32 = textoResposta;
        };

        //Q33
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 33) {
                idT = i;

                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Orientações específicas/individualizadas para matérias com baixo desempenho em avaliações.";
                        break;
                    case 2:
                        numCase = "Promoção de horários diferenciados para apoio nas lições, tarefas ou estudos.";
                        break;
                    case 3:
                        numCase = "Cursos ou palestras extraclasse.";
                        break;
                    case 4:
                        numCase = "Solicitação de trabalhos temáticos.";
                        break;
                    case 5:
                        numCase = "Aplicação de outras avaliações.";
                        break;
                    case 6:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q33 = textoResposta;
        };

        //Q34
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 34) {
                idT = i;

                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Providencia professor substituto.";
                        break;
                    case 2:
                        numCase = "Realização de atividades extracurriculares.";
                        break;
                    case 3:
                        numCase = "Solicitação aos professores de prévia organização de conteúdo ou atividade substitutiva (vídeo aulas, filmes, trabalhos, etc.)";
                        break;
                    case 4:
                        numCase = "Solicitação de reposição dos conteúdos nos contra turnos ou nos finais de semana.";
                        break;
                    case 5:
                        numCase = "Adianta outras aulas da classe.";
                        break;
                    case 6:
                        numCase = "Redistribui os alunos em outras salas de aulas.";
                        break;
                    case 7:
                        numCase = "Organização de monitorias de alunos.";
                        break;
                    case 8:
                        numCase = "Ficam com aulas vagas.";
                        break;
                    case 9:
                        numCase = "Dispensa de alunos.";
                        break;
                    case 10:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                };

                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q34 = textoResposta;
        };

        //tabela 6 - 35-38
        var freqConflitos = [];
        freqConflitos.push([{ text: 'Nesta escola com que frequência costuma acontecer confitos do tipo: brigas, ameaças, indisciplinas ou intolerância? ', style: 'tableHeader1' }, { text: 'Quase não acontece.', style: 'tableHeader2' }, { text: 'De 1 a 2 vezes por semestre.', style: 'tableHeader2' }, { text: 'De 1 a 2 vezes por mês.', style: 'tableHeader2' }, { text: 'Quase toda semana.', style: 'tableHeader2' }, { text: 'Mais de 1 vez por semana.', style: 'tableHeader2' }]);
        textoQuestao = '35.Entre alunos.';
        idT++;
        if (dados[idT].CodigoQuestao === 35) { freqConflitos.push(questionario.respostaTabela(textoQuestao, dados, idT, 35, 1, 5)) }
        textoQuestao = '36.Entre alunos e professores.';
        idT++;
        if (dados[idT].CodigoQuestao === 36) { freqConflitos.push(questionario.respostaTabela(textoQuestao, dados, idT, 36, 1, 5)) }
        textoQuestao = '37.Entre alunos e direção.';
        idT++;
        if (dados[idT].CodigoQuestao === 37) { freqConflitos.push(questionario.respostaTabela(textoQuestao, dados, idT, 37, 1, 5)) }
        textoQuestao = '38.Entre alunos e outros funcionários.';
        idT++;
        if (dados[idT].CodigoQuestao === 38) { freqConflitos.push(questionario.respostaTabela(textoQuestao, dados, idT, 38, 1, 5)) }


        //Q39
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 39) {
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
                        numCase = "Discussão com o conselho escolar.";
                        break;
                    case 6:
                        numCase = "Inclusão dos alunos em atividades esportivas, culturais, etc.";
                        break;
                    case 7:
                        numCase = "Parcerias com projetos voltados à melhoria do ambiente escolar.";
                        break;
                    case 8:
                        numCase = "Advertências e suspenções.";
                        break;
                    case 9:
                        numCase = "Outras medidas disciplinares.";
                        break;
                    case 10:
                        numCase = "Ações articuladas com o Conselho Tutelar.";
                        break;
                    case 11:
                        numCase = "Outras ações. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q39 = textoResposta;
        };

        //Q40
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 40) {
                idT = i;

                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Mapeamento dos principais problemas relacionados à evasão";
                        break;
                    case 2:
                        numCase = "Monitoramento e avaliação do desempenho dos alunos.";
                        break;
                    case 3:
                        numCase = "Utilização das avaliações externas e internas no aprimoramento da proposta pedagógica.";
                        break;
                    case 4:
                        numCase = "Elaboração de atividades de apoio aos alunos com baixo desempenho.";
                        break;
                    case 5:
                        numCase = "Capacitação para os professores e demais funcionários.";
                        break;
                    case 6:
                        numCase = "Projetos integração (entre alunos, alunos e professores).";
                        break;
                    case 7:
                        numCase = "Maior controle de frequência.";
                        break;
                    case 8:
                        numCase = "Ampliação dos contatos com os pais de alunos (avisos de ausência, conversas sobre o aluno, etc.).";
                        break;
                    case 9:
                        numCase = "Maior participação da comunidade na vida escolar.";
                        break;
                    case 10:
                        numCase = "Parcerias no desenvolvimento de projetos para melhoria da escola.";
                        break;
                    case 11:
                        numCase = "Promoção de projetos (culturais, esportivos, etc.) para motivação dos alunos.";
                        break;
                    case 12:
                        numCase = "Ações articuladas com o Conselho de Escola, APM e Grêmio Escolar.";
                        break;
                    case 13:
                        numCase = "Abertura da escola nos finais de semana.";
                        break;
                    case 14:
                        numCase = "Outros. Quais?" + ' ' + dados[i].DsResposta;
                        break;
                    case 15:
                        numCase = "Nenhuma ação, pouca evasão do ensino médio.";
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            else {
                { break; }
            }
            config.Q40 = textoResposta;
        };

        //Q41
        idT++;
        switch (dados[idT].CodigoResposta) {
            case 1:
                config.Q41 = "Ótimo.";
                break;
            case 2:
                config.Q41 = "Bom.";
                break;
            case 3:
                config.Q41 = "Regular.";
                break;
            case 4:
                config.Q41 = "Ruim.";
                break;
            case 5:
                config.Q41 = "Péssimo.";
                break;
            case 6:
                config.Q41 = "Nesta escola não tem zeladoria.";
                break;
        };


        //tabela 7 - 42-43
        var proximidadesTem = [];
        proximidadesTem.push([{ text: 'Nas proximidades desta escola tem:  ', style: 'tableHeader1' }, { text: 'Sim.', style: 'tableHeader2' }, { text: ' Não.', style: 'tableHeader2' }, { text: 'Não sabe.', style: 'tableHeader2' }]);
        textoQuestao = '42.Posto policial ou base comunitária.';
        idT++;
        if (dados[idT].CodigoQuestao === 42) { proximidadesTem.push(questionario.respostaTabela(textoQuestao, dados, idT, 42, 1, 3)) }
        textoQuestao = '43.Ronda escolar.';
        idT++;
        if (dados[idT].CodigoQuestao === 43) { proximidadesTem.push(questionario.respostaTabela(textoQuestao, dados, idT, 43, 1, 3)) }

        //tabela 8 - 44-45
        var nivelSeguranca = [];
        nivelSeguranca.push([{ text: 'Você diria que o nível de segurança desta escola é: ', style: 'tableHeader1' }, { text: 'Muito seguro.', style: 'tableHeader2' }, { text: 'Seguro. ', style: 'tableHeader2' }, { text: 'Inseguro.', style: 'tableHeader2' }, { text: 'Muito inseguro.', style: 'tableHeader2' }]);
        textoQuestao = '44.Dentro da escola.';
        idT++;
        if (dados[idT].CodigoQuestao === 44) { nivelSeguranca.push(questionario.respostaTabela(textoQuestao, dados, idT, 44, 1, 4)) }
        textoQuestao = '45.No entorno da escola.';
        idT++;
        if (dados[idT].CodigoQuestao === 45) { nivelSeguranca.push(questionario.respostaTabela(textoQuestao, dados, idT, 45, 1, 4)) }

        //Q46
        idT++;
        switch (dados[idT].CodigoResposta) {
            case 1:
                config.Q46 = "Efetivo.";
                break;
            case 2:
                config.Q46 = "Designado.";
                break;
        };

        //Q47            
        idT++;
        switch (dados[idT].CodigoResposta) {
            case 1:
                config.Q47 = "Até 02 anos.";
                break;
            case 2:
                config.Q47 = "Mais de 02 até 05 anos.";
                break;
            case 3:
                config.Q47 = "Mais de 05 até 10 anos.";
                break;
            case 4:
                config.Q47 = "Mais de 10 até 15 anos.";
                break;
            case 5:
                config.Q47 = "Mais de 15 anos.";
                break;
        };

        //Q48
        idT++;
        switch (dados[idT].CodigoResposta) {
            case 1:
                config.Q48 = "Até 02 anos.";
                break;
            case 2:
                config.Q48 = "Mais de 02 até 05 anos.";
                break;
            case 3:
                config.Q48 = "Mais de 05 até 10 anos.";
                break;
            case 4:
                config.Q48 = "Mais de 10 anos.";
                break;
        };

        //Q49
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 49) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Manhã.";
                        break;
                    case 2:
                        numCase = "Tarde / Vespertino.";
                        break;
                    case 3:
                        numCase = "Noite.";
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            config.Q49 = textoResposta;
        }

        //Q50
        textoResposta = '';
        numCase = '';
        idT++;
        for (var i = idT; i < qtdDados; i++) {
            if (dados[i].CodigoQuestao === 50) {
                idT = i;
                switch (dados[i].CodigoResposta) {
                    case 1:
                        numCase = "Sim, promovido pela Secretaria Estadual de Educação.";
                        break;
                    case 2:
                        numCase = "Sim, promovido por outros órgãos, instituições ou entidades (Universidade, ONG's, Organismos Internacionais, etc.).";
                        break;
                    case 3:
                        numCase = "Não.";
                        break;
                };
                textoResposta += numCase + ' \n';
            }
            config.Q50 = textoResposta;
        }

        //Q51
        idT++;
        switch (dados[idT].CodigoResposta) {
            case 1:
                config.Q51 = "Sim.";
                break;
            case 2:
                config.Q51 = "Não.";
                break;
        };
        idT++;
        config.Q52 = dados[idT].DsResposta + '';

        config.acessoComputador = acessoComputador;
        config.outrosEquipamentos = outrosEquipamentos;
        config.apoioAcoes = apoioAcoes;
        config.interecaoEquipe = interecaoEquipe;
        config.freqAtividades = freqAtividades;
        config.freqConflitos = freqConflitos;
        config.proximidadesTem = proximidadesTem;
        config.nivelSeguranca = nivelSeguranca;

        config.docGenerator = function (config) {
            //debugger
            var doc = {
                pageMargins: [30, 100],
                header: config.sedHeader,
                footer: config.sedFooter,
                content: [
                            {
                                style: 'header',
                                text: "Questionário Diretores"
                            },
                            {
                                style: 'subheader',
                                text: [
                                        { text: "Diretor(a): ", bold: true },
                                        { text: config.nomeDiretor },
                                ],
                            },

        {
            text: '01.Na sua percepção, quais os principais aspectos relacionados à realidade dos alunos e da comunidade contribuem para evasão do ensino médio nesta escola?',
            style: 'pergunta'
        },
        { text: config.Q1, style: 'resposta' },

        {
            text: '02.Na sua opinião, quais os principais fatores do contexto desta escola estão relacionados à evasão no ensino médio?',
            style: 'pergunta'
        },
        { text: config.Q2, style: 'resposta' },

        {
            text: '03.Considerando a maioria dos alunos desta escola, sua expectativa é que eles irão concluir o ensino médio:',
            style: 'pergunta'
        },

        { text: config.Q3, style: 'resposta' },

        {
            text: '04.Na sua opinião, após a conclusão do ensino médio a maioria dos alunos da escola vai:',
            style: 'pergunta'
        },

        { text: config.Q4, style: 'resposta' },

        {
            text: '05.Como você avalia a conservação dos mobiliários nas salas de aula?',
            style: 'pergunta'
        },

        { text: config.Q5 + ' ', style: 'resposta' },

            //tabela1 - 
            {
                style: 'tableBody',
                table: {

                    dontBreakRows: true,
                    headerRows: 2,
                    keepWithHeaderRows: true,
                    widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: config.acessoComputador
                }
            },

            //tabela 2
            {
                style: 'tableBody',
                table: {

                    dontBreakRows: true,
                    headerRows: 2,
                    keepWithHeaderRows: true,
                    widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: config.outrosEquipamentos
                }
            },

        {
            text: '12.Nos últimos dois anos, para melhoria do ambiente físico desta escola foram realizadas ações em parceria com quais instituições:',
            style: 'pergunta'
        },
            { text: config.Q12, style: 'resposta' },
        {
            text: '13.Nos últimos dois anos, a escola captou recursos financeiros de programas para melhoria da estrutura física e/ou pedagógica?',
            style: 'pergunta'
        },
        { text: config.Q13, style: 'resposta' },
        {
            text: '14.Quais as origens dos recursos captados?',
            style: 'pergunta'
        },
        { text: config.Q14, style: 'resposta' },
        {
            text: '15.A escola utilizou ou está utilizando esses recursos?',
            style: 'pergunta'
        },
        { text: config.Q15, style: 'resposta' },

                //tabela 3
                {
                    style: 'tableBody',
                    table: {
                        dontBreakRows: true,
                        headerRows: 2,
                        keepWithHeaderRows: true,
                        widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                        body: config.apoioAcoes
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
                        body: config.interecaoEquipe
                    }
                },

            {
                text: '24.Para quais equipes você sente a necessidade de formação continuada?',
                style: 'pergunta'
            },
            { text: config.Q24, style: 'resposta' },

            //tabela 5
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

            {
                text: '31.Com que frequência você costuma participar de reuniões com o Grêmio Escolar?',
                style: 'pergunta'
            },
            { text: config.Q31, style: 'resposta' },

            {
                text: '32.Normalmente, quem participa das reuniões de Conselho de Classe/Ano/Série?',
                style: 'pergunta'
            },
            { text: config.Q32, style: 'resposta' },
            {
                text: '33.Quais atividades são normalmente desenvolvidas no reforço escolar ou na recuperação contínua?',
                style: 'pergunta'
            },
            { text: config.Q33, style: 'resposta' },
            {
                text: '34.Na rotina da escola, quais as providências adotadas para atenuar o transtorno com as ausências de professores?',
                style: 'pergunta'
            },
            {
                text: 'Considere as situações de: faltas, licenças, transferências de professores e não preenchimento de vagas. Questão de múltipla escolha.',
                style: 'observacao'
            },
            { text: config.Q34, style: 'resposta' },

                //tabela 6
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
            {
                text: '39.Quais são as principais ações adotadas pela escola para a solução desses confitos?',
                style: 'pergunta'
            },
            { text: config.Q39, style: 'resposta' },
            {
                text: '40.Assinale as alternativas que melhor expressam as ações que a escola vem desenvolvendo para minimizar a evasão dos alunos do ensino-médio:',
                style: 'pergunta'
            },
            { text: config.Q40, style: 'resposta' },
            {
                text: '41.Para você ter zeladoria nesta escola é:',
                style: 'pergunta'
            },
            { text: config.Q41, style: 'resposta' },

            //tabela 7
                {
                    style: 'tableBody',
                    table: {
                        dontBreakRows: true,
                        headerRows: 2,
                        keepWithHeaderRows: true,
                        widths: ['*', 'auto', 'auto', 'auto'],
                        body: config.proximidadesTem
                    }
                },
            //tabela 8
            {
                style: 'tableBody',
                table: {
                    dontBreakRows: true,
                    headerRows: 2,
                    keepWithHeaderRows: true,
                    widths: ['*', 'auto', 'auto', 'auto', 'auto'],
                    body: config.nivelSeguranca
                }
            },
            {
                text: '46.Nesta escola você é:',
                style: 'pergunta'
            },
            { text: config.Q46, style: 'resposta' },
            {
                text: '47.Quantos anos você trabalha nesta escola?',
                style: 'pergunta'
            },
            { text: config.Q47, style: 'resposta' },
            {
                text: '48.Quantos anos você exerce a função de diretor ou vice-diretor nesta escola?',
                style: 'pergunta'
            },
            { text: config.Q48, style: 'resposta' },
            {
                text: '49.Em quais períodos do dia se concentram sua maior permanência na escola?',
                style: 'pergunta'
            },
            { text: config.Q49, style: 'resposta' },
            {
                text: '50.Nos últimos cinco anos, você fez algum curso de formação voltado à gestão escolar?',
                style: 'pergunta'
            },

            { text: config.Q50, style: 'resposta' },
            {
                text: '51.Este questionário foi respondido com a participação de outras pessoas da escola?',
                style: 'pergunta'
            },
            { text: config.Q51, style: 'resposta' },
            {
                text: '52.Gostaria de deixar alguma sugestão, crítica ou comentário?',
                style: 'pergunta'
            },
            { text: config.Q52, style: 'resposta' },
                ],
                "styles": {
                    "header": {
                        "fontSize": 15,
                        "bold": true,
                        "margin": [0, 5, 10, 15],
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
                        "margin": [10, 0, 0, 2]
                    },
                    "respostaTab": {
                        "fontSize": 8,
                        "alignment": "center",
                        "margin": [0, 2, 0, 0]
                    },
                    "tableBody": {
                        "margin": [0, 10, 0, 8],
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
                        lineWidTh: 1,
                    }
                ],
            };
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