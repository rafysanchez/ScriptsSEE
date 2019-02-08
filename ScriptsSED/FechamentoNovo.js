utils = {
    ajax: function (url, parametrosController, retorno, dataType) {
        var ajaxExecucao = {
            cache: false,
            async: true,
            url: url,
            data: parametrosController,
            type: "POST",
            dataType: dataType != undefined ? dataType : "html",
            success: retorno,
            error: utils.ajaxErro
        };
        $.ajax(ajaxExecucao);
    },

    ajaxErro: function (erro) {
        $(document).ajaxStop(function () {
            Mensagem.Alert({
                titulo: "Erro",
                mensagem: "Ocorreu um erro durante o processo: Detalhes: " + erro,
                tipo: "Erro",
                botao: "Fechar"
            });
        });
    },

    somenteNumeros: function (num) {
        var regex = /^[0-9]*$/gi;
        if (!num.value.match(regex)) {
            num.value = "";
        }
    },

    somenteNumerosPontoVirgula: function (num) {
        var er = '[-@!#$%¨&*+_´`^~;:?áÁéÉíÍóÓúÚãÃçÇ|\?/{}"<>()A-Za-z]';
        if (num.value.match(er)) {
            num.value = "";
        }

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
        for(i = 0; i < len; i++)
            if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
        aux = '';
        for(; i < len; i++)
            if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
        aux += key;
        len = aux.length;
        if (len == 0) objTextBox.value = '';
        if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;
        if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;
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

    FormatarTabela: function (tabela) {
        $(tabela).dataTable({
            "bPaginate": false,
            "bJQueryUI": true,
            "bFilter": true,
            "bInfoEmpty": true,
            "bInfo": true,
            "iDisplayLength": -1,
            "bRetrieve": true,
            "bDestroy": true,
            "draggable": true,
            "modal": true,
            "resizable": false,
            "position": "center",
            "iCookieDuration": 60,
            "aaSorting": [[1, 'asc']],
            "fnInitComplete": function () {
                this.css("visibility", "visible");
            },
            oLanguage: {
                sProcessing: "Processando...",
                sZeroRecords: "Não foram encontrados resultados",
                sSearch: "Buscar:"
            }
        });

    },

    CarregarCombos: function () {

        var diretoria = $("#CodigoDiretoria").val();
        if (diretoria == undefined) {
            $("#filt-anoLetivo").change(function () {
                controller.CarregarTurmasProfessor();
            });
            $("#table").sedDataTable(
                     {
                         columnDefs: [
                             { targets: [4], orderable: false }

                         ],
                         nomeExportacao: "Lançamento de Fechamento"
                     }
                 );
            return;
        }

        //PERFIS: GOE/ESCOLA/DIRETORIA
        $("#filt-anoLetivo").verificarAnoLetivo($("#CodigoDiretoria"), "Diretoria", "CarregarListaDiretorias");
        $("#CodigoDiretoria").autoPreencher($("#CodigoEscola"), "Escola", "CarregarListaEscolas");
        $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: "'CodigoEscola'", AnoLetivo: "'filt-anoLetivo'" }]);


        $("#CodigoTipoEnsino").autoPreencher($("#CodigoTurma"), "Turma", "CarregarListaTurmaPorTipoEnsino", [{ CodigoEscola: "'CodigoEscola'", CodigoTipoEnsino: "'CodigoTipoEnsino'", AnoLetivo: "'filt-anoLetivo'" }]);
        $("#CodigoTurma").change(function () { $("#TextoTurma").val($(this).find("option:selected").text()); });

        $("#CodigoTurma").autoPreencher($("#CodigoTipoFechamento"), "Mapao", "CarregarListaTipoFechamentoConselho", [{ TextoTurma: "'TextoTurma'" }]);
    },

    CarregarComboTipoFechamento: function (Texto) {
        
        var parametrosController = { TextoTurma: Texto };
        utils.ajax("/FechamentoNovo/CarregarListaTipoFechamentoConselho", parametrosController,
            function (data) {
                $("#CodigoTipoFechamento").empty();

                if (data == null || data == undefined) {
                    return;
                }
                $("#CodigoTipoFechamento").append("<option value>SELECIONE...</option>");
                $.each(data, function (index, item) {
                
                    $("#CodigoTipoFechamento").append("<option value=" + item.value + ">" + item.text + "</option>");
                })
               
            }, "json");
    },

    RetornarParametrosFechamentoPorPerfil: function (linha) {
        var parametrosControllerUtils;
        if (linha == undefined) {
            parametrosControllerUtils =
            {
                cpfProfessor: $("#txtCpfProfessor").val(),
                nomeProfessor: $("#txtNomeProfessor").val(),
                codigoTipoEnsino: parseInt($("#txtCodigoTipoEnsino").val()),
                tipoEnsino: $("#txtTipoEnsino").val(),
                codigoTurma: parseInt($("#txtCodigoTurma").val()),
                turma: $("#txtTurma").val(),
                codigoSubTurma: parseInt($("#txtCodigoSubTurma").val()),
                subturma: $("#txtSubTurma").val(),
                periodo: $("#txtPeriodo").val(),
                codigoDisciplina: parseInt($("#txtCodigoDisciplina").val()),
                codigodisciplinaQuebra: parseInt($("#txtCodigoDisciplinaQuebra").val()),
                disciplina: $("#txtDisciplina").val(),
                nomeDiretoria: $("#txtNomeDiretoria").val(),
                codigoEscola: parseInt($("#txtCodigoEscola").val()),
                nomeEscola: $("#txtNomeEscola").val(),
                codTipoFechamento: $("#CodigoTipoFechamento").val(),
                codigoDiretoria: $("#txtCodigoDiretoria").val(),
                tipoFechamento: $("#CodigoTipoFechamento option:selected").text(),
                codigoDuracao: $("#txtCodigoDuracao").val(),
                anoLetivo: $("#filt-anoLetivo").val(),
                numeroSerie: $("#txtNumeroSerie").val()
            }
        } else {
            parametrosControllerUtils =
            {
                cpfProfessor: $("#txtCpfProfessor").val(),
                nomeProfessor: $("#txtNomeProfessor").val(),
                //codigoTipoEnsino: parseInt($("#CodigoTipoEnsino").val()),
                codigoTipoEnsino: parseInt($("#filt-tipoEnsino").val()),
                //tipoEnsino: $("#CodigoTipoEnsino option:selected").text(),
                tipoEnsino: $("#filt-tipoEnsino option:selected").text(),
                //codigoTurma: parseInt($("#CodigoTurma").val()),
                //turma: $("#CodigoTurma option:selected").text(),
                codigoTurma: parseInt($("#filt-turma").val()),
                turma: $("#filt-turma option:selected").text(),
                codigoSubTurma: 0,
                subturma: "",
                //periodo: $("#txtAnoLetivo").val(),
                periodo: $("#filt-anoLetivo").val(),
                codigoDisciplina: 0,
                codigodisciplinaQuebra: 0,
                disciplina: "",
                //codigoEscola: parseInt($("#CodigoEscola").val()),
                //nomeEscola: $("#CodigoEscola option:selected").text(),
                codigoEscola: parseInt($("#filt-escola").val()),
                nomeEscola: $("#filt-escola option:selected").text(),
                codTipoFechamento: $("#CodigoTipoFechamento").val(),
                
                //codigoDiretoria: $("#CodigoDiretoria").val(),
                //nomeDiretoria: $("#CodigoDiretoria option:selected").text(),

                codigoDiretoria: $("#filt-diretoria").val(),
                nomeDiretoria: $("#filt-diretoria option:selected").text(),

                tipoFechamento: $("#CodigoTipoFechamento option:selected").text(),

                //codigoDuracao: $("#txtAnoLetivo").val(),
                //anoLetivo: $("#txtAnoLetivo").val(),

                codigoDuracao: $("#filt-anoLetivo").val(),
                anoLetivo: $("#filt-anoLetivo").val(),

                numeroSerie: linha === "hasValue" ? parseInt($("#hdnSerieEscolhida").val()) : parseInt($(linha).data("serie"))
            }
        }
        return parametrosControllerUtils;
    },

    zeroFill: function (n) {
        if ((n + '').length == 1)
            return '0' + n;

        return n;
    },

    formatDate: function (dados) {
        var d = new Date(dados);
        var s = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
        s += ' ' + d.getHours() + ':' + utils.zeroFill(d.getMinutes()) + ':' + utils.zeroFill(d.getSeconds());
        return s;
    },

    configurarAtalhos: function () {
        $(".tabLancamentoFechamentoAvaliacoes input[type=text]").keyup(function (e) {

            if (e.which == 38 || e.which == 40) {
                var atual = parseInt($(e.target).closest("tr").attr("data-indice"));
                if (e.which == 40) {
                    var proximo = $(e.target).closest("table").find("tr[data-indice=" + (atual + 1) + "] input[type=text]#" + $(e.target).attr('id'));
                    proximo.focus();
                }
                else if (e.which == 38) {
                    var anterior = $(e.target).closest("table").find("tr[data-indice=" + (atual - 1) + "] input[type=text]#" + $(e.target).attr('id'));
                    if (atual == 0) return;
                    anterior.focus();
                }
            }
        });
    }

}

controller = {

    CarregarTurmasEscola: function () {

        $(".form").validate({
            rules: {
                //txtAnoLetivo: "required",
                //CodigoDiretoria: "required",
                //CodigoEscola: "required",
                //CodigoTipoEnsino: "required",
                //CodigoTurma: "required",
                //CodigoTipoFechamento: "required"
                'filt-anoLetivo': { required: true },
                'filt-redeEnsino': { required: true },
                'filt-diretoria': { required: true },
                'filt-municipio': { required: true },
                'filt-situacaoEscola': { required: true },
                'filt-escola': { required: true },
                'filt-tipoEnsino': { required: true },
                'filt-turma': { required: true },
                'CodigoTipoFechamento': { required: true},

            },
            messages: {
                //txtAnoLetivo: "Obrigatório",
                //CodigoDiretoria: "Obrigatório",
                //CodigoEscola: "Obrigatório",
                //CodigoTipoEnsino: "Obrigatório",
                //CodigoTipoFechamento: "Obrigatório"
                'filt-anoLetivo': "Obrigatório",
                'filt-redeEnsino': "Obrigatório",
                'filt-diretoria': "Obrigatório",
                'filt-municipio': "Obrigatório",
                'filt-situacaoEscola': "Obrigatório",
                'filt-escola': "Obrigatório",
                'filt-tipoEnsino': "Obrigatório",
                'filt-turma': "Obrigatório",
                'CodigoTipoFechamento': "Obrigatório",
            }
        });

        if (!$(".form").valid()) {
            return false;
        }

        //if (parseInt($("#txtAnoLetivo").val()) !== 0 && parseInt($("#txtAnoLetivo").val()) !== undefined && parseInt($("#txtAnoLetivo").val()) < 2016) {
        if (parseInt($("#filt-anoLetivo").val()) !== 0 && parseInt($("#filt-anoLetivo").val()) !== undefined && parseInt($("#filt-anoLetivo").val()) < 2016) {
            Mensagem.Alert({
                titulo: "Pesquisa Inválida!",
                mensagem: "A funcionalidade está disponível para o ano letivo à partir de 2016. Para o Fechamento de anos anteriores utilize o menu: Fechamento > Consulta.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return false;
        }
        var parametrosController = {
            //tipoEnsino: $("#CodigoTipoEnsino option:selected").text(),
            //codigotipoEnsino: $("#CodigoTipoEnsino option:selected").val(),
            //nomeTurma: $("#CodigoTurma option:selected").text(),
            //tipoFechamento: $("#CodigoTipoFechamento option:selected").text(),
            //codigoTurma: parseInt($("#CodigoTurma").val()),
            //codigoDisciplina: parseInt($("#CodigoTurma").val()),
            //codigoTipoFechamento: parseInt($("#CodigoTipoFechamento").val()),
            //anoLetivo: $("#txtAnoLetivo").val() == undefined ? 0 : $("#txtAnoLetivo").val()

            tipoEnsino: $("#filt-tipoEnsino option:selected").text(),
            codigotipoEnsino: $("#filt-tipoEnsino option:selected").val(),
            nomeTurma: $("#filt-turma option:selected").text(),
            tipoFechamento: $("#CodigoTipoFechamento option:selected").text(),
            codigoTurma: parseInt($("#filt-turma").val()),
            codigoDisciplina: parseInt($("#filt-turma").val()),
            codigoTipoFechamento: parseInt($("#CodigoTipoFechamento").val()),
            anoLetivo: $("#filt-tipoEnsino").val() == undefined ? 0 : $("#filt-tipoEnsino").val()

        };


        if (parametrosController.codigoEscola <= 0 || parametrosController.codigoEscola === 0)
            return false;

        $("#Fechamentos").empty().html("");

        utils.ajax("/FechamentoNovo/ListarTurmasEscola",
            parametrosController,
            function (data) {
                $("#divListaParcial").empty().html(data);
                $("#table").sedDataTable(
                        {
                            columnDefs: [
                                { targets: [3], orderable: false }

                            ],
                            nomeExportacao: "Lançamento de Fechamento"
                        }
                    );
            });
        return true;
    },

    CarregarTurmasProfessor: function () {
        $(".form").validate({
            rules: {
                txtAnoLetivo: "required"
            },
            messages: {
                txtAnoLetivo: "Obrigatório"
            }
        });
        if (!$(".form").valid()) {
            return false;
        }

        var parametrosController = {
            anoLetivo: $("#filt-anoLetivo").val() == undefined ? 0 : $("#filt-anoLetivo").val()
        };

        if (parseInt($("#filt-anoLetivo").val()) !== 0 && parseInt($("#filt-anoLetivo").val()) !== undefined && parseInt($("#filt-anoLetivo").val()) < 2016) {
        
            Mensagem.Alert({
                titulo: "Pesquisa Inválida!",
                mensagem: "A funcionalidade está disponível para o ano letivo à partir de 2016. Para o Fechamento de anos anteriores utilize o menu: Fechamento > Consulta.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return false;
        }

        $("#Fechamentos").empty().html("");

        utils.ajax("/FechamentoNovo/ListarTurmasProfessor",
            parametrosController,
            function (data) {
                $("#divListaParcial").empty().html(data);
                $("#table").sedDataTable(
                   {
                       columnDefs: [
                           { targets: [4], orderable: false }

                       ],
                       nomeExportacao: "Lançamento de Fechamento"
                   }
               );
            });
        return true;
    },

    ExibirTipoFechamentoTurma: function (linha) {
        var nrAnoLetivo = $("#filt-anoLetivo").val();

        if (isNaN(nrAnoLetivo) || nrAnoLetivo === null || parseInt(nrAnoLetivo) < 2016) {
            Mensagem.Alert({
                titulo: "Pesquisa Inválida!",
                mensagem: "A funcionalidade está disponível para o ano letivo à partir de 2016. Para o Fechamento de anos anteriores utilize o menu: Fechamento > Consulta.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return false;
        }

        var validacao = {
            existeAvaliacao: parseInt($(linha).data("existeavaliacao")),
            existeFrequencia: parseInt($(linha).data("existefrequencia"))
        }

        var parametrosController = {
            cpfProfessor: $(linha).data("cpfprofessor"),
            nomeProfessor: $(linha).data("nomeprofessor"),
            codigoTipoEnsino: parseInt($(linha).data("codigotipoensino")),
            tipoEnsino: $(linha).data("tipoensino"),
            codigoTurma: parseInt($(linha).data("codigoturma")),
            turma: $(linha).data("turma"),
            codigoSubTurma: parseInt($(linha).data("codigosubturma")),
            subturma: $(linha).data("nomesubturma"),
            periodo: $(linha).data("periodo"),
            codigoDisciplina: parseInt($(linha).data("codigodisciplina")),
            codigodisciplinaQuebra: parseInt($(linha).data("codigodisciplinaquebra")),
            disciplina: $(linha).data("disciplina"),
            codigoEscola: parseInt($(linha).data("codigoescola")),
            nomeEscola: $(linha).data("nomeescola"),
            codigoDiretoria: parseInt($(linha).data("codigodiretoria")),
            anoLetivo: parseInt($("#filt-anoLetivo").val()),


            numeroSerie: parseInt($(linha).data("numeroserie")),
            codigoDuracao: parseInt($(linha).data("duracao")),
        }

        utils.ajax("/FechamentoNovo/ListarTipoFechamentos",
            parametrosController,
            function (data) {
                if (data == null) {
                    return false;
                }
                $("#dialog").html(data).dialog({
                    title: "Lançamento do Fechamento",
                    width: "980px"
                });
                $("#txtExisteAvaliacao").val(validacao.existeAvaliacao);
                $("#txtExisteFrequencia").val(validacao.existeFrequencia);
            });
    },
    ParametrosSelecionado: "",
    CarregarFechamentoTurma: function (linha, codigoSerieDisciplina, divDialogAberto) {
        debugger
        var parametrosController = utils.RetornarParametrosFechamentoPorPerfil(linha);
        ParametrosSelecionado = parametrosController;

        if (codigoSerieDisciplina !== undefined)
            parametrosController.novaPesquisa = codigoSerieDisciplina;
        else
            parametrosController.novaPesquisa = true;

        if (parametrosController.codTipoFechamento === "" || parametrosController.codTipoFechamento === null)
            return false;

        utils.ajax("/FechamentoNovo/ListarFechamentoTurma",
            parametrosController,
            function (data) {
                if (data == null) {
                    return false;
                }
                controller.CarregarResultadoFechamentoTurma(data, linha, divDialogAberto);
                var item = 0;
                $(".tab-pane").each(function () {

                    //Filtros utilizados no pdf do perfil GOE
                    var filtros;
                    if (linha != undefined) {
                        filtros = [
                            { nome: "Diretoria", valor: parametrosController.nomeDiretoria },
                            { nome: "Escola", valor: parametrosController.nomeEscola },
                            { nome: "Disciplina", valor: $(".cabecalhoDisciplina")[item].innerHTML },
                            { nome: "Turma", valor: parametrosController.turma }
                        ];
                    } else { //filtros utilizados no pdf do perfil Professor
                        filtros = [
                            { nome: "Escola", valor: parametrosController.nomeEscola },
                            { nome: "Professor", valor: parametrosController.nomeProfessor == "" ? "SEM PROFESSOR ATRIBUIDO" : parametrosController.nomeProfessor },
                            { nome: "Disciplina", valor: $(".cabecalhoDisciplina")[item].innerHTML },
                            { nome: "Turma", valor: $(".cabecalhoTurma")[item].innerHTML }
                        ];
                    }
                    //var columnDefs;
                    //if ($("#tabLancamentoFechamentoAvaliacoes" + this.id + " th").length > 6) {
                    //    columnDefs = [0];
                    //} else {
                    //    columnDefs = [6];
                    //}
                    $("#tabLancamentoFechamentoAvaliacoes" + this.id).sedDataTable({
                        //columnDefs: [
                        //    {
                        //        targets: columnDefs, orderable: false
                        //    }
                        //],
                        order: [[1, "asc"]],
                        bPaginate: false,
                        nomeExportacao: "Lançamento de Fechamento",
                        tituloFiltro: "Informações da Turma",
                        filtros: filtros
                    });
                    if (item == 0) {
                        if (codigoSerieDisciplina !== undefined) {
                            $("#fechamentoTabs").sedTabControl("atual", codigoSerieDisciplina);
                        } else {
                            $("#fechamentoTabs").sedTabControl("atual", this.id);
                        }
                    }
                    item += 1;
                });
            });
        return true;
    },

    CarregarResultadoFechamentoTurma: function (data, linha, divDialogAberto) {
        //SE FOR PERFIL != PROFESSOR - ABRE UM MODAL
        if (linha != undefined) {
            $("#dialog").empty();
            if (data == null) {
                return false;
            }
            if (divDialogAberto) {
                $("#dialog").html(data);
            } else {
                $("#dialog").html(data).dialog({
                    width: 980,
                    title: "Lançamento do Fechamento"
                });
            }
        }
            // SE FOR PERFIL PROFESSOR - ABRE ABAIXO DO TIPO DE FECHAMENTO SELECIONADO PELO PROFESSOR
        else {
            $("#fechamentoTabs").empty();
            $("#Fechamentos").html(data);
        }
        $("#fechamentoTabs").sedTabControl();

        
        $(".nrNota").bind('keypress change', function () {
            var codigoMencao = $("#hdCodigoMencao");
            if ($(this).val().length < 5) {
                if (codigoMencao.val() == 1)
                    return utils.mascaraDecimal(this, '.', ',', event);
            }
            else
                return false;
        });

        $(".nrNota").bind('keyup change', function () {
            
            var codigoMencao = $("#hdCodigoMencao");
            debugger
            if (codigoMencao.val() <= 2) {
                
                if (codigoMencao.val() == 2) {
                    utils.somenteNumeros(this)

                    if ($(this).val() > 10 || $(this).val() < 0) {
                        $(this).val(0);
                        Mensagem.Alert({
                            titulo: "Nota Inválida",
                            mensagem: "A nota informada deve ser entre 0 e 10!",
                            tipo: "Aviso",
                            botao: "Fechar"
                        });
                        return;
                    }
                }
            }
            else
            {
                var valor = $(this).val();
                $(this).val(valor.toUpperCase());
            }

            var tr = $(this).parent().parent();
            if (tr.find(".hdnHasChanged").val() === "true") {
                tr.parent().parent().parent().parent().parent().parent().parent().find(".txtJustificativaTurma").css("border-color", "red").attr("readonly", false);
            }
            tr.find(".hdnHasChanged").val("true");
        });

        $(".txtAulasPlanejadas").bind('keyup change', function () {
            utils.somenteNumeros(this);
            if ($(this).val() > 100 || $(this).val() < 0) {
                $(this).val(0);
                Mensagem.Alert({
                    titulo: "Quantidade Inválida",
                    mensagem: "A quantidade informada deve estar entre 0 e 100!",
                    tipo: "Aviso",
                    botao: "Fechar"
                });
                return;
            }
        });

        $(".txtAulasRealizadas").bind('keyup change', function () {
            utils.somenteNumeros(this);
            if ($(this).val() > 100 || $(this).val() < 0) {
                $(this).val(0);
                Mensagem.Alert({
                    titulo: "Quantidade Inválida",
                    mensagem: "A quantidade informada deve estar entre 0 e 100!",
                    tipo: "Aviso",
                    botao: "Fechar"
                });
                return;
            }
        });

        $(".nrFaltas").bind('keyup change', function () {
            utils.somenteNumeros(this);

            var tr = $(this).parent().parent();
            var txtNrFaltas = $(this).val() === "" ? 0 : parseInt($(this).val());

            if ($(this).val() === "")
                $(this).val(0);

            if (txtNrFaltas < 0 || txtNrFaltas > 100) {
                $(this).val(0);
                Mensagem.Alert({ titulo: "Quantidade Inválida", mensagem: "A quantidade informada deve estar entre 0 e 100!", tipo: "Aviso", botao: "Fechar" });
            } else {
                var hdnBaseAcumuladas = parseInt(ParametrosSelecionado.codTipoFechamento) === 5 ? 0 : parseInt(tr.find(".hdnBaseAcumuladas").val());
                var txtNrFaltasCompensadas = parseInt(tr.find(".faltas-compensadas").val());
                var resultado = (txtNrFaltas + hdnBaseAcumuladas) - txtNrFaltasCompensadas;

                tr.find(".txtFaltasAcumuladasBimestres:eq(0)").val(resultado < 0 ? 0 : resultado);
            }
        });

        $(".faltas-compensadas").bind('keyup change', function (e, alterouFaltas) {
            utils.somenteNumeros(this);

            var tr = $(this).parent().parent();
            var txtNrFaltas = parseInt(tr.find(".nrFaltas").val());
            var hdnBaseAcumuladas = parseInt(ParametrosSelecionado.codTipoFechamento) === 5 ? 0 : parseInt(tr.find(".hdnBaseAcumuladas").val());
            var txtNrFaltasCompensadas = $(this).val() === "" ? 0 : parseInt($(this).val());

            if ($(this).val() === "")
                $(this).val(0);

            if (txtNrFaltasCompensadas > (txtNrFaltas + hdnBaseAcumuladas)) {
                txtNrFaltasCompensadas = 0;
                $(this).val(0);
            }

            if (txtNrFaltasCompensadas < 0 || txtNrFaltasCompensadas > 100) {
                $(this).val(0);
                Mensagem.Alert({ titulo: "Quantidade Inválida", mensagem: "A quantidade informada deve estar entre 0 e 100!", tipo: "Aviso", botao: "Fechar" });
            } else {
                var resultado = (txtNrFaltas + hdnBaseAcumuladas) - txtNrFaltasCompensadas;

                //if (alterouFaltas !== "true" && !tr.find(".txtNumeroFaltas").is("[readonly]"))//???
                tr.find(".txtFaltasAcumuladasBimestres:eq(0)").val(resultado);
            }
        }).trigger("keyup");

        utils.configurarAtalhos();
    },

    SalvarFechamentoTurmaProfessor: function () {
        debugger
        var parametrosController = {
            CodigosFechamento: "",
            CodigosMatriculaAluno: "",
            NotasMediaBimestral: "",
            NumerosFaltas: "",
            NumerosFaltasCompensadas: "",
            Justificativas: "",
            NotasMediaFinal: "",
            SituacoesAlunoFechamento: "",


            data: [],

            IsCicloI: false,
            valido: true,
            validoJustificativa: true,
            faltas: 0,
            faltasCompensadas: 0,
            faltasAcumuladas: 0,
            //CodigoDisciplina: $("#txtCodigoDisciplina").val(),
            CodigoDisciplina: $("#txtCodigoDisciplina").val() !== undefined ? ($("#txtCodigoDisciplina").val().indexOf(',') > 0 ? $("#txtCodigoDisciplina").val().substring(0, $("#txtCodigoDisciplina").val().indexOf(',')) : $("#txtCodigoDisciplina").val()) : 0,
            CodigoEventoCalendario: $("#txtCodigoEventoCalendario").val(),
            codigoDisciplinaQuebra: $("#txtCodigoDisciplinaQuebra").val(),
            numeroSerie: parseInt($("#fechamentoTabs li.active a").attr("data-serietermo")),
            CodigoTurma: parseInt($("#txtCodigoTurma").val()),
            //CodigoEscola: parseInt($("#txtCodigoEscola").val()),
            //anoLetivo: $("#txtAnoLetivo").val(),
            CodigoEscola: $("#filt-escola").val() == undefined ? 0 : parseInt($("#filt-escola").val()),
            anoLetivo: $("#filt-anoLetivo").val() == undefined ? parseInt($("#txtAnoLetivo").val()) : parseInt($("#filt-anoLetivo").val()),
            CodigoTipoFechamento: $("#CodigoTipoFechamento").val(),
            codTipoFechamento: $("#CodigoTipoFechamento").val(),
            JustificativaTurma: $(".txtJustificativaTurma").val(),
            AulasPlanejadas: $(".txtAulasPlanejadas").val(),
            AulasRealizadas: $(".txtAulasRealizadas").val(),
            ano: parseInt($("#filt-anoLetivo").val()),
            CdDisciplina: $("#txtCodigoDisciplina").val() !== undefined ? ($("#txtCodigoDisciplina").val().indexOf(',') > 0 ? $("#txtCodigoDisciplina").val().substring(0, $("#txtCodigoDisciplina").val().indexOf(',')) : $("#txtCodigoDisciplina").val()) : 0,
            CodigoMencao: $("#hdCodigoMencao").val()

        }

        if ($(".txtJustificativaTurma").attr("readonly") !== "readonly" && $(".txtJustificativaTurma").val() === "") {
            parametrosController.validoJustificativa = false;
        }

        var PermitirLancNotas = false;
        $("#tabLancamentoFechamentoAvaliacoes" + parametrosController.numeroSerie + " .bodyFechto>tr").each(function () {

            parametrosController.CodigosFechamento += $(this).find(".tdCodigoFechamento").text() === "" ? "0|" : $(this).find(".tdCodigoFechamento").text() + "|";
            parametrosController.CodigosMatriculaAluno += $(this).find(".tdCodigoMatricula").html() + "|";
            parametrosController.NotasMediaBimestral += ($(this).find(".txtNota").val() == undefined ? "S/N" : $(this).find(".txtNota").val()) + "|";

            if ($(this).find(".txtNota").attr("readonly") !== "readonly") {
                PermitirLancNotas = true;
            }

            parametrosController.NumerosFaltas += $(this).find(".nrFaltas").val() == "" ? "0|" : $(this).find(".nrFaltas").val() + "|";
            parametrosController.NumerosFaltasCompensadas += $(this).find(".faltas-compensadas").val() + "|";
            parametrosController.Justificativas += $(this).find("input.fechamento_Justificativa").val().replace("|", "") + "|";
            parametrosController.NotasMediaFinal += "0|";
            parametrosController.SituacoesAlunoFechamento += "0|";
            parametrosController.faltas = $(this).find(".nrFaltas").val();
            parametrosController.faltasCompensadas = $(this).find(".faltas-compensadas").val();
            parametrosController.faltasAcumuladas = $(this).find(".txtFaltasAcumuladasBimestres").val();

            if (isNaN(parametrosController.faltasAcumuladas) || parametrosController.faltasAcumuladas === "") {
                if (parametrosController.faltasAcumuladas < 0) {
                    $(this).find(".faltas-compensadas").css("border-color", "red");
                    parametrosController.valido = false;
                }
            }

            if (isNaN(parametrosController.faltasCompensadas) || parametrosController.faltasCompensadas === "") {
                $(this).find(".faltas-compensadas").css("border-color", "red");
                parametrosController.valido = false;
            } else {
                if (parseInt(parametrosController.faltasAcumuladas) < 0 || parseInt(parametrosController.faltasCompensadas) < 0) {
                    $(this).find(".faltas-compensadas").css("border-color", "red");
                    parametrosController.valido = false;
                }
            }
        });

        var listafaltaAluno = parametrosController.NumerosFaltas.split("|");
        for (var i = 0; i < listafaltaAluno.length; i++) {
            if (parseInt(listafaltaAluno[i]) > 0) {
                if (parseInt(listafaltaAluno[i]) > parametrosController.AulasRealizadas) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "A quantidade de faltas do Aluno é superior a quantidade de Aulas Realizadas. Corrija e tente novamente",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }
            }
        }

        if (parametrosController.validoJustificativa === false) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "A justificativa é obrigatória para as alterações efetuadas. Preencha e tente novamente",
                tipo: "Aviso",
                botao: "Fechar"

            });
            return;
        }
        //SE PERMITIR O LANÇAMENTO DE NOTAS, VERIFICAR SE PELO MENOS UMA FOI INFORMADA.
        if (PermitirLancNotas) {
            var mediaInformada = false;
            var nota = parametrosController.NotasMediaBimestral.split("|");
            for (var i = 0; i < nota.length; i++) {
                nota[i] = nota[i].replace(",", ".");
                if (parseFloat(nota[i]) > 0) {
                    if (!mediaInformada)
                        mediaInformada = true;
                }
                if (parseFloat(nota[i]) % 1 > 0) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "A nota não pode ser decimal. Corrija os valores e tente novamente.",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }

                if (parseFloat(nota[i]) < 0 && parseFloat(nota[i]) > 10) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "A nota não pode ser decimal. Digite valores entre 0 e 10",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }
            }

            if (!mediaInformada) {
                Mensagem.Alert({
                    titulo: "Aviso",
                    mensagem: "Informe pelo menos uma nota.",
                    tipo: "Aviso",
                    botao: "Fechar"
                });
                return;
            }
        }



        var realizadas = parseInt(parametrosController.AulasRealizadas);
        var planejadas = parseInt(parametrosController.AulasPlanejadas);

        if (realizadas > planejadas) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "A quantidade de Aulas Realizadas não pode ser maior que a quantidade de Aulas Planejadas.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        if (!parametrosController.valido) {
            Mensagem.Alert({
                titulo: "Fechamento",
                mensagem: "O valor das Faltas Compensadas deve ser numérico, positivo e menor ou igual o número de faltas acumuladas do aluno.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }


        var codigoTipoEnsino = $("#txtCodigoTipoEnsino").val();
        if (codigoTipoEnsino === 14 && (parametrosController.numeroSerie === 1 || parametrosController.numeroSerie === 2 || parametrosController.numeroSerie === 3 || parametrosController.numeroSerie === 4 || parametrosController.numeroSerie === 5)) {
            parametrosController.IsCicloI = true;
        }


        if (parametrosController.codigoDisciplinaQuebra !== 0)
            parametrosController.codigoDisciplina = parametrosController.codigoDisciplinaQuebra;

        if (!parametrosController.valido) {
            Mensagem.Alert({
                titulo: "Fechamento",
                mensagem: "O valor das Faltas Compensadas devem ser numéricos e positivos. Verifique os campos indicados.",
                tipo: "Erro",
                botao: "Fechar"
            });
        }

        if (parametrosController.CodigoDisciplina.indexOf(',') > 0)
        { 
            parametrosController.CodigoDisciplina = parametrosController.CdDisciplina;
        }
        

        $(".btn-info").prop("disabled", true);
        $(".SalvarFechamentos").hide();
        utils.ajax("/FechamentoNovo/SalvarFechamentos",
            parametrosController,
            function (data) {
                if (data != "Erro" && data.length > 0) {
                    $(".btn-info").prop("disabled", false);
                    if (data != null) {
                        for (var i = 0; i < data.length; i++) {
                            $(".tdCodigoMatricula").each(function (x, e) {
                                if ($(e).html().toString() == data[i].CodigoMatriculaAluno.toString()) {
                                    $(".tdCodigoMatricula").eq(x).parent().find(".tdCodigoFechamento").html(data[i].CodigoFechamento.toString());
                                }
                            });
                        }
                    }
                }
                $(".SalvarFechamentos").show();
            }, "json");
    },

    SalvarFechamentoTurma: function (codigoDisciplina) {
        debugger


        $("#tabLancamentoFechamentoAvaliacoes1900 .nota").each(function (w, n) {
            debugger
            if ($(n).val().length > 0) {

            }
        })



        var parametrosController = {
            CodigosFechamento: "",
            CodigosMatriculaAluno: "",
            NotasMediaBimestral: "",
            NumerosFaltas: "",
            NumerosFaltasCompensadas: "",
            Justificativas: "",
            NotasMediaFinal: "",
            SituacoesAlunoFechamento: "",

            data: [],

            IsCicloI: false,
            valido: true,
            validoJustificativa: true,
            faltas: 0,
            faltasCompensadas: 0,
            faltasAcumuladas: 0,
            CodigoDisciplina: $("#txtCodigoDisciplina").val() !== undefined ? $("#txtCodigoDisciplina").val() : 0,
            CodigoEventoCalendario: $("#txtCodigoEventoCalendario").val(),
            numeroSerie: $("#txtNumeroSerie").val(),
            CodigoTurma: parseInt($("#txtCodigoTurma").val()),
            //CodigoEscola: parseInt($("#txtCodigoEscola").val()),
            CodigoEscola: parseInt($("#filt-escola").val()),
            //anoLetivo: $("#txtAnoLetivo").val(),
            anoLetivo: $("#filt-anoLetivo").val(),
            CodigoTipoFechamento: $("#CodigoTipoFechamento").val(),
            codTipoFechamento: $("#CodigoTipoFechamento").val(),
            JustificativaTurma: $("div " + codigoDisciplina + " .colJustificativaTurmaDisciplina").val(),
            AulasPlanejadas: $("div " + codigoDisciplina + " .txtAulasPlanejadas").val(),
            AulasRealizadas: $("div " + codigoDisciplina + " .txtAulasRealizadas").val(),
            CodigoMencao: $("#hdCodigoMencao").val(),
            ano: parseInt($("#filt-anoLetivo").val())
        }

        if (parametrosController.CodigoDisciplina === 0) {
            parametrosController.CodigoDisciplina = codigoDisciplina;
        }
        parametrosController.CodigoDisciplina = parametrosController.CodigoDisciplina.replace("#", "");

        if ($(".divJustificativaPrincipal[id='" + parametrosController.CodigoDisciplina + "']").find(".txtJustificativaTurma").attr("readonly") !== "readonly" && $(".divJustificativaPrincipal[id='" + parametrosController.CodigoDisciplina + "']").find(".txtJustificativaTurma").val() === "") {

            parametrosController.validoJustificativa = false;
        }

        var permitirLancNotas = false;
        $("div " + codigoDisciplina + " #tabLancamentoFechamentoAvaliacoes" + parametrosController.CodigoDisciplina + " .bodyFechto>tr").each(function () {

            parametrosController.CodigosFechamento += $(this).find(".tdCodigoFechamento").text() === "" ? "0|" : $(this).find(".tdCodigoFechamento").text() + "|";
            parametrosController.CodigosMatriculaAluno += $(this).find(".tdCodigoMatricula").html() + "|";
            parametrosController.NotasMediaBimestral += ($(this).find(".txtNota").val() == undefined ? "S/N" : $(this).find(".txtNota").val()) + "|";


            if ($(this).find(".txtNota").attr("readonly") !== "readonly") {
                permitirLancNotas = true;
            }

            parametrosController.NumerosFaltas += $(this).find(".nrFaltas").val() == "" ? "0|" : $(this).find(".nrFaltas").val() + "|";
            parametrosController.NumerosFaltasCompensadas += $(this).find(".faltas-compensadas").val() + "|";
            parametrosController.Justificativas += $(this).find("input.fechamento_Justificativa").val().replace("|", "") + "|";
            parametrosController.NotasMediaFinal += "0|";
            parametrosController.SituacoesAlunoFechamento += "0|";

            parametrosController.faltas = $(this).find(".nrFaltas").val();
            parametrosController.faltasCompensadas = $(this).find(".faltas-compensadas").val();
            parametrosController.faltasAcumuladas = $(this).find(".txtFaltasAcumuladasBimestres").val();

            if (isNaN(parametrosController.faltasAcumuladas) || parametrosController.faltasAcumuladas === "") {
                if (parametrosController.faltasAcumuladas < 0) {
                    $(this).find(".faltas-compensadas").css("border-color", "red");
                    parametrosController.valido = false;
                }
            }

            if (isNaN(parametrosController.faltasCompensadas) || parametrosController.faltasCompensadas === "") {
                $(this).find(".faltas-compensadas").css("border-color", "red");
                parametrosController.valido = false;
            } else {
                if (parseInt(parametrosController.faltasAcumuladas) < 0 || parseInt(parametrosController.faltasCompensadas) < 0) {
                    $(this).find(".faltas-compensadas").css("border-color", "red");
                    parametrosController.valido = false;
                }
            }
        });

        var listafaltaAluno = parametrosController.NumerosFaltas.split("|");
        for (var i = 0; i < listafaltaAluno.length; i++) {
            if (parseInt(listafaltaAluno[i]) > 0) {
                if (parseInt(listafaltaAluno[i]) > parametrosController.AulasRealizadas) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "A quantidade de faltas do Aluno é superior a quantidade de Aulas Realizadas. Corrija e tente novamente",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }
            }
        }


        var codigoFechamento = parametrosController.CodigosFechamento.split("|");
        for (var i = 0; i < codigoFechamento.length; i++) {
            if (parseInt(codigoFechamento[i]) > 0) {
                if (parametrosController.validoJustificativa === false) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "A justificativa principal é obrigatória para as alterações efetuadas. Preencha e tente novamente",
                        tipo: "Aviso",
                        botao: "Fechar"

                    });
                    return;
                }
            }
        }

        var realizadas = parseInt(parametrosController.AulasRealizadas);
        var planejadas = parseInt(parametrosController.AulasPlanejadas);
        if (realizadas > planejadas) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "A quantidade de Aulas Realizadas não pode ser maior que a quantidade de Aulas Planejadas.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        if (permitirLancNotas) {
            var mediaInformada = false;
            var nota = parametrosController.NotasMediaBimestral.split("|");
            for (var i = 0; i < nota.length; i++) {
                nota[i] = nota[i].replace(",", ".");
                debugger
                //if (parseFloat(nota[i]) > 0) {
                if (nota[i] != "") {
                    if (!mediaInformada)
                        mediaInformada = true;
                }
                if (parseFloat(nota[i]) % 1 > 0) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "A nota não pode ser decimal. Corrija os valores e tente novamente.",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }

                if (parseFloat(nota[i]) < 0 && parseFloat(nota[i]) > 10) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "A nota não pode ser decimal. Digite valores entre 0 e 10",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }
            }

            if (!mediaInformada) {
                Mensagem.Alert({
                    titulo: "Aviso",
                    mensagem: "Informe pelo menos uma nota.",
                    tipo: "Aviso",
                    botao: "Fechar"
                });
                return;
            }
        }
        var faltaInteiro = false;
        var falta = parametrosController.NumerosFaltas.split("|");
        for (var i = 0; i < falta.length; i++) {
            falta[i] = falta[i].replace(",", ".");

            if (parseFloat(falta[i]) > 0) {
                if (!faltaInteiro)
                    faltaInteiro = true;
            }
            if (parseFloat(falta[i]) % 1 > 0) {
                Mensagem.Alert({
                    titulo: "Aviso",
                    mensagem: "A quantidade de faltas não pode ser decimal. Corrija os valores e tente novamente.",
                    tipo: "Aviso",
                    botao: "Fechar"
                });
                return;
            }

            if (parseFloat(falta[i]) < 0 && parseFloat(falta[i]) > 100) {
                Mensagem.Alert({
                    titulo: "Aviso",
                    mensagem: "A nota não pode ser decimal. Digite valores entre 0 e 10",
                    tipo: "Aviso",
                    botao: "Fechar"
                });
                return;
            }
        }


        var codigoTipoEnsino = $("#txtCodigoTipoEnsino").val();
        if (codigoTipoEnsino === 14 && (parametrosController.numeroSerie === 1 || parametrosController.numeroSerie === 2 || parametrosController.numeroSerie === 3 || parametrosController.numeroSerie === 4 || parametrosController.numeroSerie === 5)) {
            parametrosController.IsCicloI = true;
        }


        if (parametrosController.codigoDisciplinaQuebra !== 0)
            parametrosController.codigoDisciplina = parametrosController.codigoDisciplinaQuebra;

        if (!parametrosController.valido) {
            Mensagem.Alert({
                titulo: "Fechamento",
                mensagem: "O valor das Faltas Compensadas deve ser numérico, positivo e menor ou igual o número de faltas acumuladas do aluno.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        $(".btn-info").prop("disabled", true);
        $(".SalvarFechamentos").hide();
        utils.ajax("/FechamentoNovo/SalvarFechamentos",
            parametrosController,
            function (data) {
                if (data != "Erro" && data.length > 0) {
                    $(".btn-info").prop("disabled", false);
                    if (data.length > 0) {
                        $('.divUltimaAlteracao.' + data[0].CodigoDisciplina).empty();
                        var dataAlteracaoInclusao = Date(parseInt(data[0].DataAlteracao == null ? data[0].DataInclusao.replace('/Date(', '') : data[0].DataAlteracao.replace('/Date(', '')));
                        dataAlteracaoInclusao = utils.formatDate(dataAlteracaoInclusao);
                        $('.divUltimaAlteracao.' + data[0].CodigoDisciplina).append("Perfil: " + data[0].NomePerfil + "<br /> Último Lançamento: " + dataAlteracaoInclusao);
                        $('#fechamentoTabs div#' + data[0].CodigoDisciplina + ' tbody>tr').each(function () {
                            parametrosController.CodigosMatriculaAluno = $(this).find(".tdCodigoMatricula").html();
                            var itemArray = $.grep(data, function (e) { return e.CodigoMatriculaAluno === parseInt(parametrosController.CodigosMatriculaAluno); });
                            if (itemArray.length > 0)
                                $(this).find(".tdCodigoFechamento").text(parseInt(itemArray[0].CodigoFechamento) > 0 ? itemArray[0].CodigoFechamento : 0);
                        });
                    }
                }
                $(".SalvarFechamentos").show();
            }, "JSON");
    },

    SalvarFechamentoTurmaConselhoFinal: function (codigoDisciplina) {
        var parametrosController = {
            CodigosFechamento: "",
            CodigosMatriculaAluno: "",
            NotasMediaFinal: "",
            SituacoesAlunoFechamento: "",

            data: [],

            IsCicloI: false,
            CodigoDisciplina: $("#txtCodigoDisciplina").val() !== undefined ? $("#txtCodigoDisciplina").val() : 0,
            CodigoEventoCalendario: $("#txtCodigoEventoCalendario").val(),
            numeroSerie: $("#txtNumeroSerie").val(),
            CodigoTurma: parseInt($("#txtCodigoTurma").val()),
            CodigoEscola: parseInt($("#filt-escola").val()), //parseInt($("#txtCodigoEscola").val()),
            anoLetivo: $("#filt-anoLetivo").val(), //$("#txtAnoLetivo").val(),
            CodigoTipoFechamento: $("#CodigoTipoFechamento").val(),
            codTipoFechamento: $("#CodigoTipoFechamento").val(),
            ano : parseInt($("#filt-anoLetivo").val())
        }

        if (parametrosController.CodigoDisciplina === 0) {
            parametrosController.CodigoDisciplina = codigoDisciplina;
        }
        parametrosController.CodigoDisciplina = parametrosController.CodigoDisciplina.replace("#", "");
        var permitirLancNotas = false;
        $("div " + codigoDisciplina + " table>tbody>tr").each(function () {

            parametrosController.CodigosFechamento += $(this).find(".tdCodigoFechamento").text() === "" ? "0|" : $(this).find(".tdCodigoFechamento").text() + "|";
            parametrosController.CodigosMatriculaAluno += $(this).find(".tdCodigoMatricula").html() + "|";
            parametrosController.NotasMediaFinal += ($(this).find('.txtNotaMediaFinal').val() == undefined ? "S/N" : $(this).find('.txtNotaMediaFinal').val()) + "|";

            if ($(this).find(".txtNotaMediaFinal").attr("readonly") !== "readonly") {
                permitirLancNotas = true;
            }

            parametrosController.SituacoesAlunoFechamento += ($(this).find('.ddlSituacaoAlunoFechto').val() == undefined ? "" : $(this).find('.ddlSituacaoAlunoFechto').val()) + "|";
        });


        if (permitirLancNotas) {
            var mediaInformada = false;
            var nota = parametrosController.NotasMediaFinal.split("|");
            var sit = parametrosController.SituacoesAlunoFechamento.split("|");
            for (var i = 0; i < nota.length; i++) {
                nota[i] = nota[i].replace(",", ".");
                if (parseFloat(nota[i]) > 0) {
                    if (!mediaInformada)
                        mediaInformada = true;
                }

                if (parseFloat(nota[i]) >= 0 && (sit[i] == "" || sit[i] == "0")) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "Informe a Situação Fechamento dos alunos com notas lançadas.",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }
                if (parseFloat(nota[i]) % 1 > 0) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "A nota não pode ser decimal. Corrija os valores e tente novamente.",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }
                if (parseFloat(nota[i]) < 0 && parseFloat(nota[i]) > 10) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "A nota não pode ser decimal. Digite valores entre 0 e 10",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }
            }

            if (!mediaInformada) {
                Mensagem.Alert({
                    titulo: "Aviso",
                    mensagem: "Informe pelo menos uma nota.",
                    tipo: "Aviso",
                    botao: "Fechar"
                });
                return;
            }
        }

        var codigoTipoEnsino = $("#txtCodigoTipoEnsino").val();
        if (codigoTipoEnsino === 14 && (parametrosController.numeroSerie === 1 || parametrosController.numeroSerie === 2 || parametrosController.numeroSerie === 3 || parametrosController.numeroSerie === 4 || parametrosController.numeroSerie === 5)) {
            parametrosController.IsCicloI = true;
        }

        $(".btn-info").prop("disabled", true);
        $(".SalvarFechamentos").hide();
        utils.ajax("/FechamentoNovo/SalvarFechamentos",
            parametrosController,
            function (data) {
                if (data != "Erro" && data.length > 0) {
                    $(".btn-info").prop("disabled", false);

                    if (data != null) {
                        for (var i = 0; i < data.length; i++) {
                            $(".tdCodigoMatricula").each(function (x, e) {
                                if ($(e).html().toString() == data[i].CodigoMatriculaAluno.toString()) {
                                    $(".tdCodigoMatricula").eq(x).parent().find(".tdCodigoFechamento").html(data[i].CodigoFechamento.toString());
                                }
                            });
                        }
                    }
                }
                $(".SalvarFechamentos").show();
            }, "json");
    },

    SalvarFechamentoTurmaConselhoFinalProfessor: function (codigoDisciplina) {
        var parametrosController = {
            CodigosFechamento: "",
            CodigosMatriculaAluno: "",
            NotasMediaFinal: "",
            SituacoesAlunoFechamento: "",

            data: [],

            IsCicloI: false,
            CodigoDisciplina: $("#txtCodigoDisciplina").val() !== undefined ? ($("#txtCodigoDisciplina").val().indexOf(',') > 0 ? $("#txtCodigoDisciplina").val().substring(0, $("#txtCodigoDisciplina").val().indexOf(',')) : $("#txtCodigoDisciplina").val()) : 0,
            CodigoEventoCalendario: $("#txtCodigoEventoCalendario").val(),
            numeroSerie: $("#fechamentoTabs li.active a").attr("data-serietermo"),
            CodigoTurma: parseInt($("#txtCodigoTurma").val()),
            //CodigoEscola: parseInt($("#txtCodigoEscola").val()),
            //anoLetivo: $("#txtAnoLetivo").val(),
            CodigoEscola: $("#filt-escola").val() == undefined ? 0 : parseInt($("#filt-escola").val()), //parseInt($("#txtCodigoEscola").val()),
            anoLetivo: $("#filt-anoLetivo").val() == undefined ? parseInt($("#txtAnoLetivo").val()) : parseInt($("#filt-anoLetivo").val()), //$("#txtAnoLetivo").val(),
            CodigoTipoFechamento: $("#CodigoTipoFechamento").val(),
            codTipoFechamento: $("#CodigoTipoFechamento").val(),
            ano: parseInt($("#filt-anoLetivo").val()),
            CdDisciplina: $("#txtCodigoDisciplina").val() !== undefined ? ($("#txtCodigoDisciplina").val().indexOf(',') > 0 ? $("#txtCodigoDisciplina").val().substring(0, $("#txtCodigoDisciplina").val().indexOf(',')) : $("#txtCodigoDisciplina").val()) : 0
        }

        if (parametrosController.CodigoDisciplina === 0) {
            parametrosController.CodigoDisciplina = codigoDisciplina;
        }
        parametrosController.CodigoDisciplina = parametrosController.CodigoDisciplina.replace("#", "");

        //-------------------------------------------------------------------------------------------
        var cdDisc = parametrosController.CodigoDisciplina;
        if (cdDisc.indexOf(',') > 0)
            parametrosController.CodigoDisciplina = cdDisc.substring(0, cdDisc.val().indexOf(','));
        //-------------------------------------------------------------------------------------------


        var permitirLancNotas = false;
        $("#tabLancamentoFechamentoAvaliacoes" + parametrosController.numeroSerie + " .bodyFechto>tr").each(function () {

            parametrosController.CodigosFechamento += $(this).find(".tdCodigoFechamento").text() === "" ? "0|" : $(this).find(".tdCodigoFechamento").text() + "|";
            parametrosController.CodigosMatriculaAluno += $(this).find(".tdCodigoMatricula").html() + "|";
            parametrosController.NotasMediaFinal += ($(this).find('.txtNotaMediaFinal').val() == undefined ? "S/N" : $(this).find('.txtNotaMediaFinal').val()) + "|";

            if ($(this).find('.txtNotaMediaFinal').attr("readonly") !== "readonly") {
                permitirLancNotas = true;
            }

            parametrosController.SituacoesAlunoFechamento += ($(this).find('.ddlSituacaoAlunoFechto').val() == undefined ? "" : $(this).find('.ddlSituacaoAlunoFechto').val()) + "|";
        });


        if (permitirLancNotas) {
            var mediaInformada = false;
            var nota = parametrosController.NotasMediaFinal.split("|");
            var sit = parametrosController.SituacoesAlunoFechamento.split("|");
            for (var i = 0; i < nota.length; i++) {
                nota[i] = nota[i].replace(",", ".");
                if (parseFloat(nota[i]) > 0) {
                    if (!mediaInformada)
                        mediaInformada = true;
                }

                if (parseFloat(nota[i]) >= 0 && (sit[i] == "" || sit[i] == "0")) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "Informe a Situação Fechamento dos alunos com notas lançadas.",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }
                if (parseFloat(nota[i]) % 1 > 0) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "A nota não pode ser decimal. Corrija os valores e tente novamente.",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }
                if (parseFloat(nota[i]) < 0 && parseFloat(nota[i]) > 10) {
                    Mensagem.Alert({
                        titulo: "Aviso",
                        mensagem: "A nota não pode ser decimal. Digite valores entre 0 e 10",
                        tipo: "Aviso",
                        botao: "Fechar"
                    });
                    return;
                }
            }

            if (!mediaInformada) {
                Mensagem.Alert({
                    titulo: "Aviso",
                    mensagem: "Informe pelo menos uma nota.",
                    tipo: "Aviso",
                    botao: "Fechar"
                });
                return;
            }
        }

        var codigoTipoEnsino = $("#txtCodigoTipoEnsino").val();
        if (codigoTipoEnsino === 14 && (parametrosController.numeroSerie === 1 || parametrosController.numeroSerie === 2 || parametrosController.numeroSerie === 3 || parametrosController.numeroSerie === 4 || parametrosController.numeroSerie === 5)) {
            parametrosController.IsCicloI = true;
        }

        $(".btn-info").prop("disabled", true);
        $(".SalvarFechamentos").hide();
        utils.ajax("/FechamentoNovo/SalvarFechamentos",
            parametrosController,
            function (data) {
                if (data != "Erro" && data.length > 0) {
                    $(".btn-info").prop("disabled", false);
                    if (data != null) {
                        for (var i = 0; i < data.length; i++) {
                            $(".tdCodigoMatricula").each(function (x, e) {
                                if ($(e).html().toString() == data[i].CodigoMatriculaAluno.toString()) {
                                    $(".tdCodigoMatricula").eq(x).parent().find(".tdCodigoFechamento").html(data[i].CodigoFechamento.toString());
                                }
                            });
                        }
                    }
                    $(".SalvarFechamentos").show();
                }
            }, "json");
    }
}

$(document).ready(function () {
    setTimeout(function () { utils.CarregarCombos(); }, 1);

   
});
