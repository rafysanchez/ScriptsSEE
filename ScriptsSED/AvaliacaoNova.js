var ex = {
    num: function (valor) {
        if (valor == undefined || valor == '' || isNaN(valor))
            return 0;
        return parseInt(valor);
    },

    // Formata a data do jeito que o datepicker do jquery gosta
    ymd: function (dt) {
        var dia = ("0000" + dt.getDate()).slice(-2);
        var mes = ("0000" + (dt.getMonth() + 1)).slice(-2);
        var ano = ("0000" + dt.getFullYear()).slice(-4);
        var str = ano + "-" + mes + "-" + dia;
        return str;
    },

    dmy: function (dt) {
        var dia = ("0000" + dt.getDate()).slice(-2);
        var mes = ("0000" + (dt.getMonth() + 1)).slice(-2);
        var ano = ("0000" + dt.getFullYear()).slice(-4);
        var str = dia + "/" + mes + "/" + ano;
        return str;
    },

    // Data do C# para data do JS
    csdate: function (str) {
        return new Date(parseInt(/-?\d+/.exec(str)[0]))
    },

    ajax: function (url, dt, callback) {

        var ajaxObj = {
            cache: false,
            url: url,
            type: 'POST',
            data: dt,
            success: callback,
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop(function () {
                    Mensagem.Alert({
                        titulo: "Erro",
                        mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                        tipo: "Erro",
                        botao: "Fechar"
                    });
                });
            }
        };

        if (url.indexOf("Salvar") > -1) {
            ajaxObj.data = { str: JSON.stringify(dt) };
            ajaxObj.dataType = "json";
        }

        $.ajax(ajaxObj);
    },

    combos: function () {
        $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
        $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'txtAnoLetivo' }]);
        $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "CodigoEscola", CodigoTipoEnsino: "CodigoTipoEnsino", AnoLetivo: 'txtAnoLetivo' }]);
        $('#CodigoTurma').autoPreencher($('#CodigoDisciplina'), 'Disciplina', 'ListaDisciplinasComParametrizacaoeQuebraAvaliacao', [{ CodigoTurma: "CodigoTurma", CodigoTipoEnsino: "CodigoTipoEnsino", AnoLetivo: 'txtAnoLetivo' }]);
    },

    erro: function (msg, tipo) {
        if (tipo == null)
            tipo = "Erro";

        Mensagem.Alert({
            titulo: "Erro",
            mensagem: msg,
            tipo: tipo,
            botao: "Fechar"
        });
    },

    warn: function (msg) {
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: msg,
            tipo: "Alerta",
            botao: "Fechar"
        });
    },
}

var avaliacao = {
    dados: null,
    disciplina: null,
    turma: null,
    mencao: null,
    consultarTurmas: function () {
        ex.ajax("/AvaliacaoNova/ConsultarDetalheDisciplinaParcial",
        { anoLetivo: ex.num($('#txtAnoLetivo').val()) },
        function (data, textStatus, jqXHR) {
            $('#resultadoDisciplina').html(data);
            $('#tabelaDadosTurma').sedDataTable({
                columnDefs: [
			        { targets: [4], orderable: false }
                ]
            });
        });
    },

    consultarTurmasGoe: function () {
        ex.ajax("/AvaliacaoNova/CarregarTurmasGoe",
        {
            anoLetivo: ex.num($('#txtAnoLetivo').val()),
            codigoTurma: ex.num($("#CodigoTurma").val()),
            codigoDiretoria: ex.num($("#CodigoDiretoria").val()),
            codigoEscola: ex.num($("#CodigoEscola").val()),
            codigoTipoEnsino: ex.num($("#CodigoTipoEnsino").val()),
            codigoDisciplina: ex.num($("#CodigoDisciplina").val())
        },
        function (data, textStatus, jqXHR) {
            $('.resultadoPesquisa').html(data);
            $('#tabelaDadosTurma').sedDataTable();
        });
    },

    editar: function (link) {
        
        

        if ($(link).attr("codigo")) {
            avaliacao.editarAvaliacao($(link).attr("codigo"));
            return;
        }

        var postData = {
            codigoTurma: $(link).attr('CodigoTurma'),
            codigoDisciplina: $(link).attr('CodigoDisciplina')
        }
        ex.ajax("/AvaliacaoNova/Editar", postData,
            function (data, textStatus, jqXHR) {

                if (data == null || data == "") {
                    Mensagem.IgnorarMensagensAutomaticas = false;
                }
                else {
                    $(".dialog").html(data);
                    var opt = { autoOpen: true, modal: true, width: 850, title: "Avaliação" };
                    $(".dialog").dialog(opt);
                    Mensagem.IgnorarMensagensAutomaticas = true;
                }
            });
    },
    consultarTipoAvaliacao: function (codigoTurma, codigoDisciplina, visualizar) {
        var postData = {
            codigoTurma: codigoTurma,
            codigoDisciplina: codigoDisciplina,
            visualizar: visualizar == undefined ? false : visualizar,
            codigoTipoAvaliacao: $("#tipoAvaliacao").val(),
            bimestrePesquisado: $("#codigoBimestre").val()
        }

        avaliacao.disciplina = codigoDisciplina;
        avaliacao.turma = codigoTurma;
        avaliacao.codigoAvaliacao = postData.codigoTipoAvaliacao;
        avaliacao.CodigoBimestre = postData.bimestrePesquisado;
        ex.ajax("/AvaliacaoNova/ConsultarDadosAvaliacao", postData,
            function (data, textStatus, jqXHR) {


                $(".dialog").html(data);
                $("#tabelaAlunos").sedDataTable();
                //if (change) {
                //    var opt = {
                //        autoOpen: true,
                //        modal: true,
                //        width: 850,
                //        title: "Avaliações"
                //    };
                //    $(".dialog").dialog(opt);
                //}


                tela.configurarCamposNota();
                if (avaliacao.codigoAvaliacao != "") {
                    $("#tipoAvaliacao").val(avaliacao.codigoAvaliacao);
                }
                if (avaliacao.CodigoBimestre != "") {
                    $("#codigoBimestre").val(avaliacao.CodigoBimestre);
                }

                if ($("#codigoBimestre option:selected").val() == "Todos") {
                    $("#btnCalcularMedia").hide()
                }


            });
    },

    consultar: function (link, el) {
        var postData = {
            codigoTurma: $(link).attr('CodigoTurma'),
            codigoDisciplina: $(link).attr('CodigoDisciplina'),
            visualizar: $(link).attr('visualizar') == "true"

        }

        avaliacao.disciplina = $(link).attr('CodigoDisciplina');
        avaliacao.turma = $(link).attr('CodigoTurma');


        ex.ajax("/AvaliacaoNova/VerificarBimestre", postData,
            function (retorno, textStatus, jqXHR) {

                if (retorno == "") {
                    ex.ajax("/AvaliacaoNova/ConsultarDadosAvaliacao", postData,
                        function (data, textStatus, jqXHR) {
                            
                            $(".dialog").html(data);
                            var opt = {
                                autoOpen: true, modal: true, width: 850, title: "Avaliações"
                            };
                            $(".dialog").dialog(opt);
                            $("#tabelaAlunos").sedDataTable();

                            if ($("#codigoBimestre option:selected").val() == "Todos") {
                                $("#btnCalcularMedia").hide();
                            }

                            ex.ajax("/AvaliacaoNova/ListaMencao", null, function (data) {
                                
                                avaliacao.mencao = data;
                                tela.configurarCamposNota();
                            });
                        });
                }
                else {
                    Mensagem.IgnorarMensagensAutomaticas = true;
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: retorno,
                        tipo: "Alerta",
                        botao: "Fechar"
                    });
                }
            });

    },

    atualizarConsultaAvaliacoes: function () {
        var postData = {
            codigoTurma: avaliacao.dados.CodigoTurma,
            codigoDisciplina: avaliacao.dados.CodigoDisciplina,
            visualizar: false,
            bimestrePesquisado: avaliacao.dados.BimestreAtual.Numero

        }
        
        ex.ajax("/AvaliacaoNova/ConsultarDadosAvaliacao", postData,
            function (data, textStatus, jqXHR) {
                $(".dialog").html(data);

                tela.configurarCamposNota();
            });
    },

    editarAvaliacao: function (codigo) {
        var postData = {
            codigo: codigo
        }

        ex.ajax("/AvaliacaoNova/EditarAvaliacao", postData,
            function (data, textStatus, jqXHR) {
                $(".dialogDetalhes").html(data);
                var opt = {
                    autoOpen: true, modal: true, width: 850, title: "Editar Avaliação",
                };
                $(".dialogDetalhes").dialog(opt);
                tela.configurarCamposNota();
            });
    },

    carregar: function (turma, disciplina, codigo) {
        var postData = {
            codigoTurma: turma,
            codigoDisciplina: disciplina,
            codigo: codigo,
            data: $("#data").val(),
            bimestre : $("#bimestre").val()
        }
        ex.ajax("/AvaliacaoNova/ConsultarDados", postData,
            function (data, textStatus, jqXHR) {
                
                avaliacao.dados = data;
                if (avaliacao.dados.Erro != null && avaliacao.dados.Erro.length > 0) {

                    $(".dialog").dialog("close");

                    Mensagem.Alert({
                        titulo: "Erro",
                        mensagem: avaliacao.dados.Erro,
                        tipo: "Alerta",
                        botao: "Fechar"
                    });
                }
                else {
                    $("#bimestre").val(avaliacao.dados.BimestreAtual.Numero);
                    
                    tela.configurarDatePicker();
                    tela.configurarLancamentoNotas();

                    if (codigo > 0)
                        avaliacao.preencherFormulario();

                    //avaliacao.preencherAlunos();

                    //necessario a chamada novamente por causa da data do configurarDatePicker..
                    var postData2 = {
                        codigoTurma: turma,
                        codigoDisciplina: disciplina,
                        codigo: codigo,
                        data: $("#data").val(),
                        bimestre: $("#bimestre").val()
                    }
                    ex.ajax("/AvaliacaoNova/ConsultarDados", postData2,
                        function (data, textStatus, jqXHR) {
                            avaliacao.dados = data;
                            avaliacao.preencherAlunos();
                        });
                }
            });
    },

    aulasSemana: function () {
        if (avaliacao.dados == null) return null;
        var semana = [];
        for (i = 0; i < avaliacao.dados.Aulas.length; i++) {
            var aula = avaliacao.dados.Aulas[i];
            if (semana.indexOf(aula.DiaSemana) == -1)
                semana.push(aula.DiaSemana);
        }

        return semana;
    },

    diasRemovidos: function () {
        
        var removidos = [];
        var dataInicial = ex.csdate(avaliacao.dados.BimestreAtual.InicioVigencia);
        var dataFinal = ex.csdate(avaliacao.dados.BimestreAtual.FimVigencia);
        var dataFinalBimestre = ex.csdate(avaliacao.dados.BimestreAtual.Fim);
        
        var menorInicio = null;
        var maiorFim = null;
        debugger
        // Delimitando inicio e fim das aulas baseado nas atribuições, e não no bimestre.
        $(avaliacao.dados.Aulas).each(function (i, r) {
            if (menorInicio == null)
                menorInicio = ex.csdate(r.DataInicio);
            else {
                if (menorInicio > ex.csdate(r.DataInicio)) {
                    menorInicio = ex.csdate(r.DataInicio);
                }
            }
        });
        
        if (dataInicial < menorInicio)
            dataInicial = menorInicio;

        $(avaliacao.dados.Aulas).each(function (i, r) {
            if (maiorFim == null)
                maiorFim = ex.csdate(r.DataFim);
            else {
                if (maiorFim < ex.csdate(r.DataFim)) {
                    maiorFim = ex.csdate(r.DataFim);
                }
            }
        });

        //if (dataFinal > maiorFim)
        //    dataFinal = maiorFim;

        //var dataAtual = new Date(dataInicial.getFullYear(), 00, 01);
        
        //var dataAtual = new Date(dataInicial.getFullYear(), 00, 00);
        var dataAtual = dataInicial;
        var diasDeAula = avaliacao.aulasSemana();
        var diasFeriados = avaliacao.dados.Feriados;
        var anoLetivo = parseInt($("#txtAnoLetivo").val());
        
        while (dataAtual <= dataFinal) {
            var dia = dataAtual.getDate();
            var mes = (dataAtual.getMonth() + 1);
            var ano = dataAtual.getFullYear();
            dataAtual = new Date(ano, (mes - 1), dia);


            if (dataAtual >= dataFinal) {
                removidos.push(ex.ymd(dataAtual));
                dataAtual.setDate(dataAtual.getDate() + 1);
                continue;
            }

            if (dataAtual < dataInicial) {
                removidos.push(ex.ymd(dataAtual));
                dataAtual.setDate(dataAtual.getDate() + 1);
                continue;
            }
           
            //Remove os Feriados --------------------------------
            //var datasValidas = diasFeriados;
            for (var i = 0; i < diasFeriados.length; i++) {
                var dtInicio = ex.csdate(diasFeriados[i].DataInicio);
                var dtFim = ex.csdate(diasFeriados[i].DataFim);
                if (dataAtual >= dtInicio && dataAtual <= dtFim) {
                    removidos.push(ex.ymd(dataAtual));
                    //dataAtual.setDate(dataAtual.getDate() + 1);
                }

                //if (ex.csdate(diasFeriados[i].DataInicio) < dataAtual && ex.csdate(diasFeriados[i].DataFim) < dataAtual)
                //    datasValidas.splice(i, 1);
            }
            //diasFeriados = datasValidas;
            //----------------------------------------------------

            if (diasDeAula.indexOf(dataAtual.getDay()) == -1) {
                removidos.push(ex.ymd(dataAtual));
                dataAtual.setDate(dataAtual.getDate() + 1);
                continue;
            }
            
            //se a data atual for maior que a data final do bimestre 
            //Nao deixa lancar
            //if (dataAtual > dataFinalBimestre) {
            //    removidos.push(ex.ymd(dataAtual));
            //    dataAtual.setDate(dataAtual.getDate() + 1);
            //    continue;
            //}
            //-----------------------------------------------------
            if (dataAtual.getFullYear() > anoLetivo) {
                removidos.push(ex.ymd(dataAtual));
                dataAtual.setDate(dataAtual.getDate() +1);
                continue;
            }
        

            dataAtual.setDate(dataAtual.getDate() + 1);
        }
        
        if (dataAtual.getFullYear() > anoLetivo) {
            removidos.push(ex.ymd(dataAtual));
        }


        return removidos;
    },

    preencherFormulario: function () {
        if (avaliacao.dados == null) return;
        //$("#detalhes-edicao #bimestre").val(avaliacao.dados.Valores.Bimestre);
        $("#detalhes-edicao #bimestre").val(avaliacao.dados.BimestreAtual.Numero);
        $("#detalhes-edicao #tipo").val(avaliacao.dados.Valores.CodigoTipoAtividade);
        $("#detalhes-edicao #nome").val(avaliacao.dados.Valores.Nome);
        $("#detalhes-edicao #valeNota").prop("checked", avaliacao.dados.Valores.ValeNota);
        $("#detalhes-edicao #data").val(avaliacao.dados.Valores.Data);
        if (avaliacao.dados.Valores.ValeNota)
            tela.lancarNotas(0);

        $("#btnExcluirAv").show();
    },

    preencherAlunos: function () {
        if (avaliacao.dados == null) return;
        if (avaliacao.dados.Alunos == null) return;
        $(".linhasAlunos").html("");
        var dtSelect = $("#data").datepicker("getDate");
        for (var i = 0; i < avaliacao.dados.Alunos.length; i++) {
            var nota;
            var aluno = avaliacao.dados.Alunos[i];
            var tr = $("<tr class='size'></tr>")
            .append("<td style='text-align: center; font-size: 12px'>" + aluno.Numero + "</td>")
            .append("<td style='text-align: center; font-size: 12px'>" + aluno.Situacao + "</td>")
            .append("<td class='size'>" + aluno.Nome + "</td>");
            
            //var nota = $("<td class='size'></td>")
            //        .append("<input type='text' codigo='" + aluno.Codigo + "' placeholder='S/N' class='form-control nota' />");

            if (aluno.lstDispensaLicencaAluno == "-1") {
                var disabled;
                if (dtSelect <= new Date())
                    disabled = "";
                else
                    disabled = "disabled= 'disabled'";

                if (avaliacao.dados.CodigoTipoMencao < 3) {
                    nota = $("<td class='size'></td>")
                        .append("<input type='text' codigo='" + aluno.Codigo + "' onblur='ValidaBotaoSalvar()' placeholder='S/N' " + disabled + " class='form-control nota' />");
                }
                else
                {
                    nota = $("<td class='size'></td>")
                        .append("<input type='text' codigo='" + aluno.Codigo + "' onblur='ValidaBotaoSalvar()' placeholder='S/N' " + disabled + "  style='text-transform:uppercase;' class='form-control nota' />");
                }
                    
            }
            else {
                if (avaliacao.dados.CodigoTipoMencao < 3) {
                    nota = $("<td class='size'></td>")
                         .append("<input type='text' codigo='" + aluno.Codigo + "' placeholder='" + aluno.lstDispensaLicencaAluno + "' class='form-control nota' disabled title='Dispensa/Licença'/>");
                }
                else
                {
                    nota = $("<td class='size'></td>")
                     .append("<input type='text' codigo='" + aluno.Codigo + "' placeholder='" + aluno.lstDispensaLicencaAluno + "'  style='text-transform:uppercase;' class='form-control nota' disabled title='Dispensa/Licença'/>");
                }

            }
            
            //$(nota).children("input").val(aluno.Nota > -1 ? aluno.Nota.toString() : "");
            $(nota).children("input").val(aluno.NotaAlfa == '' || aluno.NotaAlfa == null || aluno.NotaAlfa == undefined ? (aluno.Nota > -1 ? aluno.Nota.toString() : "") : aluno.NotaAlfa);
            //if (!aluno.Habilitado)
            //    $(nota).children("input").attr("disabled", "disabled");
            tr.append(nota);
            $(".linhasAlunos").append(tr);
                        
        }

        tela.configurarCamposNota();

        if (!$("#valeNota").is(":checked"))
            $("#fAlunos").hide();
    },

    excluir: function () {
        Mensagem.Alert({
            titulo: "Excluir avaliação",
            mensagem: "Ao excluir a avaliação, todos os seus dados e lançamento de notas serão desconsiderados. Deseja continuar?",
            tipo: "Alerta",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        var postData = {
                            codigo: avaliacao.dados.Valores.Codigo
                        };
                        ex.ajax("/AvaliacaoNova/Excluir", postData,
                            function (data, textStatus, jqXHR) {
                                Mensagem.Alert({
                                    titulo: "Sucesso",
                                    mensagem: "Avaliação excluída com sucesso.",
                                    tipo: "Sucesso",
                                    botoes: [
                                        {
                                            botao: "OK",
                                            callback: function () {
                                                $.unblockUI();
                                                location.reload();
                                            }
                                        }
                                    ]
                                });
                            });
                        //
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

    salvar: function () {
        
        if (avaliacao.dados == null) return;
        var notas = [];
        var valido = true;
        var cod = avaliacao.dados.Valores != null ? avaliacao.dados.Valores.Codigo : 0;
        $("#tabelaAlunos[codigo=" + cod + "] .nota").each(function (w, n) {
            
            if ($(n).val().length > 0) {
                var matricula = $(n).attr("codigo");

                var strnota = $(n).val().replace(",", ".");
                if (valido)
                    valido = avaliacao.regraNota(strnota);

                if (matricula == null) {
                    Mensagem.Alert({
                        titulo: "Erro",
                        mensagem: "Erro interno. Matricula não informada.",
                        tipo: "Erro",
                        botao: "Fechar"
                    });
                }

                if (!valido) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "Uma ou mais notas foram lançadas de forma inválida.",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }

                var nota = 0;
                var notaAlfa = "";
                if ($.isNumeric(strnota)) {
                    nota = parseFloat(strnota);
                    if (isNaN(nota)) nota = 0;
                }
                else
                    notaAlfa = strnota.toUpperCase();
                
                var obj = {
                    CodigoMatriculaAluno: ex.num(matricula),
                    Nota: nota,
                    NotaAlfa: notaAlfa
                };

                notas.push(obj);
            }
        });

        var vm = [{
            CodigoTurma: avaliacao.dados.CodigoTurma,
            CodigoDisciplina: avaliacao.dados.CodigoDisciplina,
            CodigoTipoAtividade: ex.num($("#tipo").val()),
            Nome: $("#nome").val(),
            Data: $("#data").val(),
            ValeNota: $("#valeNota").is(":checked"),
            Bimestre: ex.num($("#bimestre").val()),
            Notas: notas,
            Codigo: cod
        }];

        if (avaliacao.dados.Valores.Codigo > 0)
            vm.Codigo = avaliacao.dados.Valores.Codigo;
        $("#btnSalvarCadastro").attr("disabled", "disabled");
        if (valido) {
            ex.ajax("/AvaliacaoNova/Salvar", vm,
               function (data, textStatus, jqXHR) {
                   Mensagem.Alert({
                       titulo: "Sucesso",
                       mensagem: "Avaliação salva com sucesso!",
                       tipo: "Sucesso",
                       botoes: [
                           {
                               botao: "OK", callback: function () {
                                   $.unblockUI();
                                   $("#btnSalvarCadastro").attr("disabled", "false");
                                   avaliacao.atualizarConsultaAvaliacoes();
                               }
                           }
                       ]
                   });
               });
        }
    },

    salvarEmLote: function () {
        var codigosAvaliacoes = $('.colAvaliacao').map(function () { return $(this).attr("codigo"); }).get();
        var avaliacoes = [];
        for (var i = 0; i < codigosAvaliacoes.length; i++) {
            var notas = [];
            $(".nota[avaliacao=" + codigosAvaliacoes[i] + "]").each(function (w, n) {
                if ($(n).val().length > 0) {
                    var matricula = $(n).attr("matricula");
                    var nota = parseFloat($(n).val().replace(",", "."));
                    if (isNaN(nota)) nota = 0;
                    var obj = {
                        CodigoMatriculaAluno: ex.num(matricula),
                        Nota: nota
                    };

                    notas.push(obj);
                }
            });

            var vm = {
                Codigo: ex.num(codigosAvaliacoes[i]),
                Notas: notas
            };
            avaliacoes.push(vm);
        }

        ex.ajax("/AvaliacaoNova/Salvar", avaliacoes,
            function (data, textStatus, jqXHR) {
                Mensagem.Alert({
                    titulo: "Sucesso",
                    mensagem: "Avaliações salvas com sucesso!",
                    tipo: "Sucesso",
                    botao: "Fechar"
                });
            });
    },

    regraNota: function (str) {

        var valido = true;
        if ($.isNumeric(str)) {
            if (str.length == 0)
                return true;

            var nota = parseFloat(str.replace(",", "."));
        
            if (isNaN(nota) || nota > 10)
                valido = false;

            var e = str.replace(".", ",");
            if (e.indexOf(",") > 0)
                if (e.split(",")[1].length > 2)
                    valido = false;
        }
        
        return valido;
    },

    AtualizaDispensa: function () {
        var postData = {
            codigoTurma: $("#hdnCodigoTurma").val(),
            codigoDisciplina: $("#hdnCodigoDisciplina").val(),
            codigo: $("#hdnCodigo").val(),
            data: $("#data").val(),
            bimestre : $("#bimestre").val()
        }
        ex.ajax("/AvaliacaoNova/ConsultarDados", postData,
            function (data, textStatus, jqXHR) {
                avaliacao.dados = data;
                avaliacao.preencherAlunos();
            });

    },
}

var tela = {
    configurarLancamentoNotas: function () {
        $("#valeNota").change(function () {
            
            var dtSelect = $("#data").datepicker("getDate");
            
            if ($(this).is(":checked"))
                if(dtSelect <= new Date())
                    $("#btnLancarNotas").show();
                else
                    $("#btnLancarNotas").hide();
            else {
                $("#btnLancarNotas").hide();
                if ($("#fAlunos").is(":visible"))
                    $("#fAlunos").slideUp(200);
            }
        });
    },

    configurarDatePicker: function () {
        var array = avaliacao.diasRemovidos();
        var primeiroDia = new Date();
        
        while (array.indexOf(ex.ymd(primeiroDia)) > -1) {
            primeiroDia.setDate(primeiroDia.getDate() + 1);
        }
        
        
        $('.datepicker').datepicker("destroy");
        
        $('.datepicker').datepicker({
            
            minDate: ex.csdate(avaliacao.dados.BimestreAtual.Inicio),
            maxDate: ex.csdate(avaliacao.dados.BimestreAtual.Fim),
            changeYear: false,
            defaultDate: primeiroDia,
            onSelect: function (dateText, inst) {
                $("#data").val(ex.dmy($.datepicker.parseDate("dd/mm/yy", dateText)));
                avaliacao.AtualizaDispensa();

                var dtSelect = $(this).datepicker("getDate");

                if ($("#valeNota").is(":checked"))
                    if (dtSelect <= new Date())
                        $("#btnLancarNotas").show();
                    else
                        $("#btnLancarNotas").hide();
            },

            beforeShowDay: function (date) {
                
                var string = $.datepicker.formatDate('yy-mm-dd', date);
                var x = array.indexOf(string);
                //return [array.indexOf(string) == -1];
                debugger
                var diasFeriados = avaliacao.dados.Feriados;
                var nome;
                if (array.indexOf(string) > -1) {
                    for (var i = 0; i < diasFeriados.length; i++) {
                        var incio = ex.csdate(diasFeriados[i].DataInicio);
                        var fim = ex.csdate(diasFeriados[i].DataFim)
                        var data = new Date(parseInt(string.split("-")[0]), parseInt(string.split("-")[1]) - 1, parseInt(string.split("-")[2]));

                        if (data >= incio && data <= fim)
                        {
                            nome = diasFeriados[i].Nome;
                            return [false, 'datepicker-nao-letivo-color', nome];
                            break;
                        }
                        else if (data.getDate() == incio.getDate() &&
                                    data.getMonth() == incio.getMonth() &&
                                    data.getFullYear() == incio.getFullYear())
                        {
                            
                            nome = diasFeriados[i].Nome;
                            return [false, 'datepicker-nao-letivo-color', nome];
                            break;
                        }
                    }
                    return [false, ""];
                }
                return [true, ''];
                
            }
        });
        AplicarMascaras();
        $("#data").val(ex.dmy(primeiroDia));
        $(".calendar-icon").click(function () {
            var offset = $(this).offset();
            //$(".datepicker").toggle();
        });
    },

    configurarCamposNota: function () {
        
        var codigoMencao = $("#hdCodigoMensao");
        var listaMencao = avaliacao.mencao == null ? avaliacao.dados.ListaMensao : avaliacao.mencao;


        $(".nota").blur(function (e) {
            //Valida mencao -------------
        
            var campo = $(this);
            var caractervalido = false;
            $.each(avaliacao.dados.ListaMensao, function () {
        
                //if (e.key.toUpperCase() == this.NomeSimbolo.toUpperCase() || e.keyCode == 8)
                if (campo.val().toUpperCase() == this.NomeSimbolo.toUpperCase() || campo.val() == '')
                    caractervalido = true;
            })

            if (caractervalido == false)
                caractervalido = false;

            if (caractervalido)
                campo.removeClass("invalid");
            else
                campo.addClass("invalid");

            //---------------------------------------------
        });

        $(".nota").keypress(function (e) {

            if(codigoMencao.val() == 1)
            {
                if ($(this).val().length < 5) {
                    if (codigoMencao.val() == 1)
                        return tela.mascaraDecimal(this, '.', ',', event);
                }
                else
                    return false;
            }
        });

        $(".nota").keydown(function (e) {
            
            //Valida mencao -------------
            //var caractervalido = false;
            //$.each(avaliacao.dados.ListaMensao, function () {
                
            //    if (e.key.toUpperCase() == this.NomeSimbolo.toUpperCase() || e.keyCode == 8)
            //        caractervalido = true;
            //})

            //if (caractervalido == false)
            //    return false;
            //---------------------------------------------
            
            if (codigoMencao.val() <= 2) {
                if ($.inArray(e.keyCode, [188, 108, 46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                    (e.keyCode == 65 && (e.ctrlkey === true || e.metakey === true)) ||
                    (e.keyCode >= 35 && e.keyCode <= 40)) {
                    return;
                }

                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }

                var valorFuturo = $(this).val() + String.fromCharCode((96 <= e.keyCode && e.keyCode <= 105) ? e.keyCode - 48 : e.keyCode);
            }
            else
            {
                //var valor = String.fromCharCode(e.keyCode);
                //$(this).val(valor.toUpperCase());
                return ;
            }
        });

        $(".nota").keyup(function (e) {
            
            $(this).val($(this).val().replace('.', ','));
            if (e.which == 38 || e.which == 40) {
                switch (e.which) {
                    case 40:
                        $(document.activeElement).parent().parent().next("tr").find("input[avaliacao=" +
                            $(document.activeElement).attr("avaliacao") + "]").focus();
                        break;

                    case 38:
                        $(document.activeElement).parent().parent().prev("tr").find("input[avaliacao=" +
                            $(document.activeElement).attr("avaliacao") + "]").focus();
                        break;
                }
            }
            else {
                tela.validarNota($(this));
            }
        });
    },

    validarNota: function (el) {
        var str = $(el).val();
        var valido = true; //avaliacao.regraNota(str);
        if (valido)
            $(el).removeClass("invalid");
        else
            $(el).addClass("invalid");
    },

    mascaraDecimal: function (objTextBox, SeparadorMilesimo, SeparadorDecimal, e) {

        var sep = 0;
        var key = '';
        var i = j = 0;
        var len = len2 = 0;
        var strCheck = '0123456789';
        var aux = aux2 = '';
        var whichCode = (window.Event) ? e.which : e.keyCode;
        if ((whichCode == 13) || (whichCode == 0) || (whichCode == 8)) return true;
        key = String.fromCharCode(whichCode); // Valor para o código da Chave
        if (strCheck.indexOf(key) == -1) return false; // Chave inválida
        len = objTextBox.value.length;
        for (i = 0; i < len; i++)
            if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
        aux = '';
        for (; i < len; i++)
            if (strCheck.indexOf(objTextBox.value.charAt(i)) != -1) aux += objTextBox.value.charAt(i);
        aux += key;
        len = aux.length;
        if (len == 0) objTextBox.value = '';
        if (len == 1) objTextBox.value = '0' + SeparadorDecimal + '0' + aux;
        if (len == 2) objTextBox.value = '0' + SeparadorDecimal + aux;
        if (len > 2) {
            aux2 = '';
            for (j = 0, i = len - 3; i >= 0; i--) {
                if (j == 3) {
                    aux2 += SeparadorMilesimo;
                    j = 0;
                }
                aux2 += aux.charAt(i);
                j++;
            }
            objTextBox.value = '';
            len2 = aux2.length;
            for (i = len2 - 1; i >= 0; i--)
                objTextBox.value += aux2.charAt(i);
            objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
        }
        return false;
    },

    lancarNotas: function (timer) {
        $("#btnLancarNotas").fadeOut(200);
        $("#fAlunos").slideDown(timer);
    },

    configurarAnoLetivo: function (AnoLetivoForm, Diretoria, Escola, TipoEnsino, Turma, Disciplina) {

        if (AnoLetivoForm.length == 0) {
            return;
        }

        if (AnoLetivoForm.get(0).tagName == "INPUT") {// Tratamento para ano letivo no textbox

            AnoLetivoForm.focus(function () {
                anoLetivoAnterior = AnoLetivoForm.val();//captura o valor anterior do ano letivo

                $(document).keypress(function (e) {
                    if (e.which == 13) {
                        return false;
                    }
                });
            });

            AnoLetivoForm.blur(function () {
                var anoLetivoAtual = $(this).val();
                if (anoLetivoAtual != anoLetivoAnterior) {
                    MensagemConfirmacaoAnoLetivo($(this), anoLetivoAnterior);
                }
            });
        }
        else if (AnoLetivoForm.get(0).tagName == "SELECT") {// Tratamento para ano letivo no dropdownlist

            AnoLetivoForm.click(function () {
                anoLetivoAnterior = AnoLetivoForm.val();//captura o valor anterior do ano letivo
            });

            AnoLetivoForm.change(function () {
                MensagemConfirmacaoAnoLetivo($(this), anoLetivoAnterior);
            });
        }

        var MensagemConfirmacaoAnoLetivo = function (obj, valorAnterior) {
            Mensagem.Alert({
                titulo: "Atenção!",
                mensagem: "Ao alterar o valor do ano letivo, todos os dados informados no formulário serão perdidos. Deseja continuar?",
                tipo: "aviso",
                botoes: [
                    {
                        botao: "Sim",
                        callback: function () {
                            var conteudoLimpo = "<option value=''>Selecione...</option>";
                            Diretoria.attr("selected", "selected");
                            Escola.empty();
                            Escola.html(conteudoLimpo);
                            TipoEnsino.empty();
                            TipoEnsino.html(conteudoLimpo);
                            Turma.empty();
                            Turma.html(conteudoLimpo);
                            Disciplina.empty();
                            Disciplina.html(conteudoLimpo);
                            AnoLetivoAnterior = $(obj).val();
                            $.unblockUI();
                        }
                    },
                    {
                        botao: "Não",
                        callback: function () {
                            $(obj).val(valorAnterior);
                            $.unblockUI();
                            $(obj).focus();
                        }
                    }
                ]
            });
        };
    }
}

var media = {
    modal: function () {
        ex.ajax("/AvaliacaoNova/Medias", {
        },
        function (data, textStatus, jqXHR) {
            $('#dialogMedias').html(data);
            var opt = {
                autoOpen: true, modal: true, width: 300, title: "Calcular Médias"
            };
            $("#dialogMedias").dialog(opt);
        });
    },

    salvar: function () {
        var resultado = new Array();
        var alunos = $("#tabelaAlunos").DataTable().rows().data();
        var r = [];
        for (var i = 0; i < alunos.length; i++) {
            var aluno = $($("#tabelaAlunos").DataTable().row(i).node());
            var codigo = ex.num(aluno.attr("codigo"));
            var valor = aluno.children("td.aluno-media").children("input").val();

            var turma = ex.num(avaliacao.turma);
            var disciplina = ex.num(avaliacao.disciplina);

            if (turma == 0)
                turma = ex.num($("#hdTurma").val());

            if (disciplina == 0)
                disciplina = ex.num($("#hdDisciplina").val());

            if (turma == 0 || disciplina == 0) {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "A turma / disciplina não foi encontrada.",
                    tipo: "Aviso",
                    botao: "Fechar"
                });
                return;
            }

            
            var nota = 0;
            var notaAlfa = "";
            if ($.isNumeric(strnota)) {
                if (isNaN(parseFloat(valor))) {
                        valor = "-1";
                }
                nota = parseFloat(valor);
            }
            else
                notaAlfa = valor.toUpperCase();


            //if (isNaN(parseFloat(valor))) {
            //    valor = "-1";
            //}
            //var nota = parseFloat(valor);

            
            //if (nota % 1 > 0) {
            //    Mensagem.Alert({
            //        titulo: "Erro",
            //        mensagem: "As médias não podem ser decimais. Corrija manualmente os valores e tente novamente.",
            //        tipo: "Aviso",
            //        botao: "Fechar"
            //    });
            //    return;
            //}

            //if (nota > 10) {
            if (nota > 10 && $.isNumeric(strnota)) {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "As médias não podem ser maiores que 10.",
                    tipo: "Aviso",
                    botao: "Fechar"
                });
                return;
            }

            resultado.push({ CodigoMatriculaAluno: codigo, Nota: nota, NotaAlfa: notaAlfa });
        }



        ex.ajax("/AvaliacaoNova/SalvarMedias", {
            CodigoTurma: turma, CodigoDisciplina: disciplina, Notas: resultado
        },
            function (data) {
                if (data[0] === "1") {

                    Mensagem.Alert({
                        titulo: "Sucesso",
                        mensagem: "Médias salvas com sucesso!",
                        tipo: "Sucesso",
                        botao: "Fechar"
                    });

                    return;
                } else {
                    Mensagem.Alert({
                        titulo: "Erro",
                        mensagem: "As médias não foram salvas. \n Motivo: " + data[1] + " \n stacktrace: " + data[2],
                        tipo: "Erro",
                        botao: "Fechar"
                    });
                }
            });
    },

    calcular: function (tipo) {
        var qtd = $(".colAvaliacao a[vn=1]").length;
        if (qtd < 2) {
            Mensagem.Alert({
                titulo: "Atenção",
                mensagem: "Devem haver pelo menos duas avaliações que valem nota cadastradas para que haja o cálculo de médias.",
                tipo: "Alerta",
                botoes: [
                    {
                        botao: "Ok", callback: function () {
                            $.unblockUI();
                        }
                    }
                ]
            });
            return;
        }
        var resultado;
        switch (tipo) {
            case 1:
                resultado = media.aritmetica(qtd, null);
                break;
            case 2:
                media.ponderada();
                return;
                break;
            case 3:
                resultado = media.soma();
                break;
        }
        media.render(resultado);
        Mensagem.Alert({
            titulo: "Médias calculadas com sucesso!",
            mensagem: "Verifique na última coluna as médias calculadas.",
            tipo: "Sucesso",
            botoes: [
                {
                    botao: "OK", callback: function () {
                        $.unblockUI();
                        $("#tabelaAlunos tr .aluno-media input:first").focus();
                    }
                }
            ]
        });
        $("#btnSalvarMedias").show();
        $("#dialogMedias").dialog("close");

    },

    aritmetica: function (divisor, pesos) {
        var somas = pesos != null ? media.soma(pesos) : media.soma();
        for (var i = 0; i < somas.length; i++) {
            var somaAluno = somas[i];
            somaAluno.nota = (somaAluno.nota / divisor);
        }
        return somas;
    },

    calcPonderada: function () {
        var resultPesos = [];
        var inputPesos = $(".peso");
        var divisor = 0;
        for (var i = 0; i < inputPesos.length; i++) {
            var pesoAv = ex.num(inputPesos.eq(i).val());
            divisor += pesoAv;
            resultPesos.push({ avaliacao: inputPesos.eq(i).attr("avaliacao"), peso: pesoAv });
        }
        var rr = media.aritmetica(divisor, resultPesos);
        media.render(rr);
        $("#dialogMedias").dialog("close");
        Mensagem.Alert({
            titulo: "Médias calculadas com sucesso!",
            mensagem: "Verifique na última coluna as médias calculadas.",
            tipo: "Sucesso",
            botoes: [
                {
                    botao: "OK", callback: function () {
                        $.unblockUI();
                        $("#tabelaAlunos tr .aluno-media input:first").focus();
                    }
                }
            ]
        });
        $("#btnSalvarMedias").show();
    },

    ponderada: function () {
        var pesos = $("#pesos");
        var parent = $("#pesos").parent().parent();
        if (parent.is(":visible")) {
            parent.slideUp(200);
            return;
        }
        var avaliacoes = $(".colAvaliacao a[vn=1]");

        pesos.html("");
        for (var i = 0; i < avaliacoes.length; i++) {
            var av = avaliacoes[i];
            pesos.append("<div class='form-group'><label>" + av.innerHTML.split("<br>")[0].trim() +
                ": </label><div><input value='1' avaliacao='" + av.getAttribute("codigo") + "' type='number' style='font-size:12px;' class='form-control peso' min='1' max='100'></div></div>");
        }
        pesos.append("<br /><div class='rodape-botao'><input type='button' onclick='media.calcPonderada()' value='Calcular Média Ponderada' class='btn btn-info'></div>")
        parent.slideDown(200);
    },

    soma: function (pesos) {
        var avaliacoes = $(".colAvaliacao a[vn=1]");
        //var alunos = $(".linhasAlunosConsulta tr");
        var alunos = $("#tabelaAlunos").DataTable().rows().data();
        var r = [];
        for (var i = 0; i < alunos.length; i++) {
            var soma = 0;
            var aluno = $($("#tabelaAlunos").DataTable().row(i).node());
            for (var j = 0; j < avaliacoes.length; j++) {
                var av = avaliacoes.eq(j);
                var inputs = aluno.children().children();
                for (var k = 0; k < inputs.length; k++) {
                    var input = inputs.eq(k);

                    if (av.attr("codigo") == input.attr("avaliacao")) {
                        var vl = input.val().replace(",", ".");
                        if (vl == "")
                            vl = 0;
                        if (pesos == null)
                            soma += parseFloat(vl);
                        else {
                            for (var l = 0; l < pesos.length; l++) {
                                if (pesos[l].avaliacao == av.attr("codigo"))
                                    soma += parseFloat(vl) * pesos[l].peso;
                            }
                        }
                    }
                }
            }
            r.push({ aluno: aluno.attr("codigo"), nota: soma });
        }
        return r;
    },

    render: function (resultados) {
        $(".aluno-media").remove();
        var linhas = $("#tabelaAlunos").DataTable().rows().data();
        for (var i = 0; i < linhas.length; i++) {
            $($("#tabelaAlunos").DataTable().row(i).node()).find('.aluno-media').remove();

            //linha insere cabeçalho
            if (i == 0) {
                var cab = $("#tabelaAlunos tr").eq(0);
                cab.append("<th class='aluno-media' style='font-size:12px'>Nota Bimestral</th>");
            }

            var linha = $($("#tabelaAlunos").DataTable().row(i).node());
            var resultado = "";
            for (var j = 0; j < resultados.length; j++) {
                if (linha.attr("codigo") == resultados[j].aluno) {
                    resultado = resultados[j].nota.toFixed(2);
                    break;
                }
            }

            linha.append("<td class='aluno-media' style='font-size:12px'>" +
                "<input type='number' min='0' max='10' style='width:100%' class='form-control nota' placeholder='S/N' value='" +
                 resultado + "' /></td>");
        }
    }
}

var VerificarMudancaAnoLetivo = function (AnoLetivoForm, Diretoria, Escola, TipoEnsino, Turma, Disciplina) {

    if (AnoLetivoForm.length == 0) {
        return;
    }

    if (AnoLetivoForm.get(0).tagName == "INPUT") {// Tratamento para ano letivo no textbox

        AnoLetivoForm.focus(function () {
            anoLetivoAnterior = AnoLetivoForm.val();//captura o valor anterior do ano letivo

            $(document).keypress(function (e) {
                if (e.which == 13) {
                    return false;
                }
            });
        });

        AnoLetivoForm.blur(function () {
            var anoLetivoAtual = $(this).val();
            if (anoLetivoAtual != anoLetivoAnterior) {
                MensagemConfirmacaoAnoLetivo($(this), anoLetivoAnterior);
            }
        });
    }
    else if (AnoLetivoForm.get(0).tagName == "SELECT") {// Tratamento para ano letivo no dropdownlist

        AnoLetivoForm.click(function () {
            anoLetivoAnterior = AnoLetivoForm.val();//captura o valor anterior do ano letivo
        });

        AnoLetivoForm.change(function () {
            MensagemConfirmacaoAnoLetivo($(this), anoLetivoAnterior);
        });
    }

    var MensagemConfirmacaoAnoLetivo = function (obj, valorAnterior) {
        Mensagem.Alert({
            titulo: "Atenção!",
            mensagem: "Ao alterar o valor do ano letivo, todos os dados informados no formulário serão perdidos. Deseja continuar?",
            tipo: "aviso",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        var conteudoLimpo = "<option value=''>Selecione...</option>";
                        //Diretoria.attr("selected", "selected");
                        $("select#CodigoDiretoria").prop('selectedIndex', 0);
                        Escola.empty();
                        Escola.html(conteudoLimpo);
                        TipoEnsino.empty();
                        TipoEnsino.html(conteudoLimpo);
                        Turma.empty();
                        Turma.html(conteudoLimpo);
                        Disciplina.empty();
                        Disciplina.html(conteudoLimpo);
                        AnoLetivoAnterior = $(obj).val();
                        $.unblockUI();
                    }
                },
                {
                    botao: "Não",
                    callback: function () {
                        $(obj).val(valorAnterior);
                        $.unblockUI();
                        $(obj).focus();
                    }
                }
            ]
        });
    };
};


$().ready(function () {
    $('#btnPesquisar').click(function (e) {
        e.preventDefault();
        if ($(".form").valid()) {
            avaliacao.consultarTurmas();
        }
    });

    $('#btnPesquisarGoe').click(function (e) {
        e.preventDefault();
        if ($(".form").valid()) {
            avaliacao.consultarTurmasGoe();
        }
    });
    $("#tipoAvaliacao").change(function () {
        var tipoAvaliacao = ("#detalhes-edicao #tipo").val();
    });
    ex.combos();

    Mensagem.IgnorarMensagensAutomaticas = true;
});