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
                } else if ((i > 10) && (i < 17)) {
                    $("[name='grupo-2']").css('border', '2px solid red');
                } else if ((i > 16) && (i < 22)) {
                    $("[name='grupo-3']").css('border', '2px solid red');
                } else if ((i > 26) && (i < 32)) {
                    $("[name='grupo-4']").css('border', '2px solid red');
                } else if ((i > 34) && (i < 42)) {
                    $("[name='grupo-5']").css('border', '2px solid red');
                } else if ((i > 42) && (i < 50)) {
                    $("[name='grupo-6']").css('border', '2px solid red');
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

            respostas.push(resposta);
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
                            url: "/SarespQuestoesAlunos/Salvar",
                            type: "POST",
                            //                            data: JSON.stringify({ respostas: respostas }),
                            data: JSON.stringify({ respostas: respostas, codigoAlunoResponsavel: $("#aluno").val() == null ? 0 : $("#aluno").val() }),
                            contentType: "application/json",
                            success: function (data) {
                                Mensagem.Alert({
                                    titulo: "Sucesso", tipo: "Sucesso",
                                    mensagem: "Questionário enviado com sucesso.",
                                    botoes: [{
                                        botao: "Fechar",
                                        callback: function () {
                                            location.href = "/Inicio/Index";
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
    }
};

Mensagem.IgnorarMensagensAutomaticas = true;