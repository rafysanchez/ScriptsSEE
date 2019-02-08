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

    MensagemAviso: function (_mensagem) {
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: _mensagem,
            tipo: "Aviso",
            botao: "Fechar"
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
            $("#txtAnoLetivo").change(function () {
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
        $("#txtAnoLetivo").verificarAnoLetivo($("#CodigoDiretoria"), "Diretoria", "CarregarListaDiretorias");
        $("#CodigoDiretoria").autoPreencher($("#CodigoEscola"), "Escola", "CarregarListaEscolas");
        $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: "'CodigoEscola'", AnoLetivo: "'txtAnoLetivo'" }]);


        $("#CodigoTipoEnsino").autoPreencher($("#CodigoTurma"), "Turma", "CarregarListaTurmaPorTipoEnsino", [{ CodigoEscola: "'CodigoEscola'", CodigoTipoEnsino: "'CodigoTipoEnsino'", AnoLetivo: "'txtAnoLetivo'" }]);
        $("#CodigoTurma").change(function () { $("#TextoTurma").val($(this).find("option:selected").text()); });

    },

    RetornarParametrosPorPerfil: function (linha) {
        var parametrosControllerUtils;
        if (linha == undefined) {
            parametrosControllerUtils =
            {
                codigoTipoEnsino: parseInt($("#txtCodigoTipoEnsino").val()),
                tipoEnsino: $("#txtTipoEnsino").val(),
                codigoTurma: parseInt($("#txtCodigoTurma").val()),
                turma: $("#txtTurma").val(),
                periodo: $("#txtPeriodo").val(),
                codigoDiretoria: $("#txtCodigoDiretoria").val(),
                nomeDiretoria: $("#txtNomeDiretoria").val(),
                codigoEscola: parseInt($("#txtCodigoEscola").val()),
                nomeEscola: $("#txtNomeEscola").val(),
                anoLetivo: $("#txtAnoLetivo").val(),
                disciplina: $(linha).data("disciplina"),
            }
        } else {
            parametrosControllerUtils =
            {
                codigoTipoEnsino: parseInt($("#CodigoTipoEnsino").val()),
                tipoEnsino: $("#CodigoTipoEnsino option:selected").text(),
                codigoTurma: parseInt($("#CodigoTurma").val()),
                turma: $("#CodigoTurma option:selected").text(),
                periodo: $("#txtAnoLetivo").val(),
                codigoDiretoria: $("#CodigoDiretoria").val(),
                nomeDiretoria: $("#CodigoDiretoria option:selected").text(),
                codigoEscola: parseInt($("#CodigoEscola").val()),
                nomeEscola: $("#CodigoEscola option:selected").text(),
                anoLetivo: $("#txtAnoLetivo").val(),
                disciplina: $(linha).data("disciplina"),
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
    }
}


controller = {

    CarregarTurmasEscola: function () {

        $(".form").validate({
            rules: {
                txtAnoLetivo: "required",
                CodigoDiretoria: "required",
                CodigoEscola: "required",
                CodigoTipoEnsino: "required",
                CodigoTurma: "required"
            },
            messages: {
                txtAnoLetivo: "Obrigatório",
                CodigoDiretoria: "Obrigatório",
                CodigoEscola: "Obrigatório",
                CodigoTipoEnsino: "Obrigatório"
            }
        });

        if (!$(".form").valid()) {
            return false;
        }


        var parametrosController = {
            tipoEnsino: $("#CodigoTipoEnsino option:selected").text(),
            codigotipoEnsino: $("#CodigoTipoEnsino option:selected").val(),
            nomeTurma: $("#CodigoTurma option:selected").text(),
            codigoTurma: parseInt($("#CodigoTurma").val()),
            codigoDisciplina: parseInt($("#CodigoTurma").val()),
            anoLetivo: $("#txtAnoLetivo").val() == undefined ? 0 : $("#txtAnoLetivo").val()
        };


        if (parametrosController.codigoEscola <= 0 || parametrosController.codigoEscola === 0)
            return false;

        utils.ajax("/DispensaLicenca/ListarTurmasEscola",
            parametrosController,
            function (data) {
                $("#divListaParcial").empty().html(data);
                $("#table").sedDataTable(
                        {
                            columnDefs: [
                                { targets: [3], orderable: false }

                            ],
                            nomeExportacao: "Lançamento de Licença e Dispensa"
                        }
                    );
            });
        return true;
    },

    CarregarAluno: function (linha) {
        var tipoPesquisa = $("#hdntipoPesquisa").val();

        if (tipoPesquisa == "RA") {
            if ($("#txtRa").val() == "") {
                utils.MensagemAviso("Por favor informe o RA.");
                return;
            }
            if ($("#txtDigRa").val() == "") {
                utils.MensagemAviso("Por favor informe o digito do RA.");
                return;
            }
            if ($("#txtUfRa").val() == "") {
                utils.MensagemAviso("Por favor informe o UF do RA.");
                return;
            }
        }
        else if (tipoPesquisa == "Diretoria") {
            if ($("#CodigoDiretoria").val() == "") {
                utils.MensagemAviso("Por favor informe a Diretoria.");
                return;
            }
            if ($("#CodigoEscola").val() == "") {
                utils.MensagemAviso("Por favor informe a Escola.");
                return;
            }
            if ($("#CodigoTipoEnsino").val() == "") {
                utils.MensagemAviso("Por favor informe o Tipo de Ensino.");
                return;
            }
            if ($("#CodigoTurma").val() == "") {
                utils.MensagemAviso("Por favor informe a Turma.");
                return;
            }
        }
        else {
            utils.MensagemAviso("Por favor selecione uma turma ou informe o RA.");
            return;
        }

        if (linha) {
            var parametrosController = utils.RetornarParametrosPorPerfil(linha);
        }
        else {
            var parametrosController = {
                codigoTipoEnsino: parseInt($("#CodigoTipoEnsino").val()),
                codigoTurma: parseInt($("#CodigoTurma").val()),
                codigoDiretoria: !$("#CodigoDiretoria").val() ? 0 : $("#CodigoDiretoria").val(),
                codigoEscola: parseInt($("#CodigoEscola").val()),
                anoLetivo: $("#txtAnoLetivo").val(),
                turma: $("#TextoTurma").val(),
                nrRa: $("#txtRa").val(),
                digRa: $("#txtDigRa").val(),
                ufRa: $("#txtUfRa").val()
            };
        }
        utils.ajax("/DispensaLicenca/CarregarAluno",
           parametrosController,
           function (data) {
               $("#divListaParcial").empty().html(data);
               //$('#SelecaoTurma').hide();
               $('#btnVoltar').css("visibility", "visible");

               $('#tab_ls_aluno').sedDataTable({
                   columnDefs: [
                       { targets: [3], orderable: false },
                       { targets: [4], orderable: false },
                   ],
                   nomeExportacao: 'Lista de Alunos'
               });


           });
    },

    PesquisarRA: function () {

        var parametrosController = { RA: $("#txtRa").val(), DigRa: $("#txtDigRa").val(), UfRa: $("#txtUfRa").val() }

        utils.ajax("/DispensaLicenca/PesquisarRA",
           parametrosController,
           function (data) {
               $('#SelecaoTurma').hide();
               $("#divListaParcial").empty().html(data);
               $('#btnVoltar').css("visibility", "visible");

               $('#tab_ls_aluno').sedDataTable({
                   columnDefs: [
                       { targets: [3], orderable: false },
                   ],
                   nomeExportacao: 'Lista de Alunos'
               });
           });
    },

    Pesquisar: function () {
        if ($('#txtRa').val() == "" && $('#txtDigRa').val() == "" && $('#txtUfRa').val() == "") {
            controller.CarregarTurmasEscola();
        } else {
            controller.PesquisarRA();
        }

        $("#divListaParcial").html("");

        $('#txtAnoLetivo').removeAttr('disabled');
        $('#CodigoDiretoria').removeAttr('disabled');
        $('#CodigoEscola').removeAttr('disabled');
        $('#CodigoTipoEnsino').removeAttr('disabled');
        $('#CodigoTurma').removeAttr('disabled');

        $('#txtRa').removeAttr('disabled');
        $('#txtDigRa').removeAttr('disabled');
        $('#txtUfRa').removeAttr('disabled');
        $('#txtRa').val("");
        $('#txtDigRa').val("");
        $('#txtUfRa').val("");
    },

    VoltarTurmas: function () {

        $('#SelecaoTurma').show();
        $('#btnVoltar').css("visibility", "hidden");
        $("#divListaParcial").empty().html("");

        controller.LimpaCampos();
    },

    BloqueiaRA: function () {
        if ($('#CodigoDiretoria').val() == "") {
            $('#txtRa').removeAttr('disabled');
            $('#txtDigRa').removeAttr('disabled');
            $('#txtUfRa').removeAttr('disabled');
            $("#hdntipoPesquisa").val("");
        }
        else {
            $('#txtRa').attr('disabled', 'disabled');
            $('#txtDigRa').attr('disabled', 'disabled');
            $('#txtUfRa').attr('disabled', 'disabled');
            $('#hdntipoPesquisa').val("Diretoria");
        }

        $('#txtRa').val("");
        $('#txtDigRa').val("");
        $('#txtUfRa').val("");
        $("#divListaParcial").empty().html("");
        $("#divListaTurma").empty().html("");
    },

    Bloqueia: function () {
        if ($('#txtRa').val() == "" && $('#txtDigRa').val() == "" && $('#txtUfRa').val() == "") {
            $('#txtAnoLetivo').removeAttr('disabled');
            $('#CodigoDiretoria').removeAttr('disabled');
            $('#CodigoEscola').removeAttr('disabled');
            $('#CodigoTipoEnsino').removeAttr('disabled');
            $('#CodigoTurma').removeAttr('disabled');
            $("#hdntipoPesquisa").val("");
        }
        else {
            $('#txtAnoLetivo').attr('disabled', 'disabled');
            $('#CodigoDiretoria').attr('disabled', 'disabled');
            $('#CodigoEscola').attr('disabled', 'disabled');
            $('#CodigoTipoEnsino').attr('disabled', 'disabled');
            $('#CodigoTurma').attr('disabled', 'disabled');
            $('#hdntipoPesquisa').val("RA");
        }

        $('#CodigoDiretoria').val("");
        $('#CodigoEscola').val("");
        $('#CodigoTipoEnsino').val("");
        $('#CodigoTurma').val("");

        $('#CodigoEscola').empty().append('<option value=0>Selecione...</option>');
        $('#CodigoTipoEnsino').empty().append('<option value=0>Selecione...</option>');
        $('#CodigoTurma').empty().append('<option value=0>Selecione...</option>');

        //$("#divListaParcial").empty().html("");
        //$("#divListaTurma").empty().html("");
    },

    LimpaCampos: function () {

        $("#divListaParcial").html("");

        $('#txtAnoLetivo').removeAttr('disabled');
        $('#CodigoDiretoria').removeAttr('disabled');
        $('#CodigoEscola').removeAttr('disabled');
        $('#CodigoTipoEnsino').removeAttr('disabled');
        $('#CodigoTurma').removeAttr('disabled');

        $('#txtRa').removeAttr('disabled');
        $('#txtDigRa').removeAttr('disabled');
        $('#txtUfRa').removeAttr('disabled');
        $('#txtRa').val("");
        $('#txtDigRa').val("");
        $('#txtUfRa').val("");

        $('#CodigoDiretoria').val("");
        $('#CodigoEscola').val("");
        $('#CodigoTipoEnsino').val("");
        $('#CodigoTurma').val("");

        $('#CodigoEscola').empty();
        $("#CodigoEscola").append('<option value=0>Selecione...</option>');
        $('#CodigoTipoEnsino').empty();
        $("#CodigoTipoEnsino").append('<option value=0>Selecione...</option>');
        $('#CodigoTurma').empty();
        $("#CodigoTurma").append('<option value=0>Selecione...</option>');
    },

    MarcarDispenasLicencas: function (id, CodAluno, codigoTurma) {

        if (id > 0) {
            var parametrosController = { CodigoAluno: CodAluno, CodigoTipoDispensaLicenca: id, codigoTurma: codigoTurma }


            utils.ajax("/DispensaLicenca/MarcarDispenasLicencas",
            parametrosController,
            function (data) {

                $("#divDispenasLicencas").html(data).dialog({
                    title: "Lançamento de Licença e Dispensa",
                    width: "md"
                });
            });
        }
    },

    GravarDispensaLincenca: function (CodAluno, CodTurma) {
        $(".ZeratipoDispensaLicenca").val("0");

        var parametrosController = {
            CodigoTipoDispensaLicenca: $("#hdnCodigoTipoDispensaLicenca").val(),
            lstCodigoDisciplina: $("#slcDisciplina").multiselect("getCheckedValues"),
            Justificativa: $("#Justificativa").val(),
            Inicio: $("#DataInicio").val(),
            Fim: $("#DataFim").val(),
            CodigoAluno: CodAluno,
            CodigoTurma: CodTurma,
            Bimestre1: $('#bimestre_1').is(':checked'),
            Bimestre2: $('#bimestre_2').is(':checked'),
            Bimestre3: $('#bimestre_3').is(':checked'),
            Bimestre4: $('#bimestre_4').is(':checked')
        }


        if (parametrosController.lstCodigoDisciplina.length == 0) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Por favor informe a disciplina.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        if (parametrosController.Inicio == "" || parametrosController.Fim == "") {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Por favor informe as datas inicial e final.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }
        if (parametrosController.Justificativa == "") {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Por favor informe a justificativa.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }


        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: "Deseja realmente gravar " + $("#hdnDescricaoDispensa").val() + ", para o aluno " + $("#HiddenNomeAluno" + CodAluno).val() + " ?",
            tipo: "Aviso",
            botoes: [{
                botao: "Sim",
                callback: function () {

                    utils.ajax("/DispensaLicenca/GravarDispensaLincenca",
                         { model: JSON.stringify(parametrosController) },
                        function (data) {

                            Mensagem.IgnorarMensagensAutomaticas = true;

                            if (data == "sucesso") {
                                Mensagem.Alert({
                                    titulo: "Aviso",
                                    mensagem: "Dispensa/Licença salva com sucesso.",
                                    tipo: "Sucesso",
                                    botoes: [
                                    //    {
                                    //    botao: "Sim",
                                    //    callback: function () {
                                    //        $("#slcDisciplina").val("0");
                                    //        $.unblockUI();
                                    //    }
                                    //},
                                    {
                                        botao: "Fechar",
                                        callback: function () {
                                            $.unblockUI();
                                            $("#divDispenasLicencas").html("").dialog("close");
                                            Mensagem.IgnorarMensagensAutomaticas = false;
                                        }
                                    }]
                                });
                            }
                            else {
                                Mensagem.Alert({
                                    titulo: "Aviso",
                                    mensagem: data,
                                    tipo: "Aviso",
                                    botao: "Fechar"
                                });
                            }
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
            //botao: "Fechar",
            //callback: function () {

            //    utils.ajax("/DispensaLicenca/GravarDispensaLincenca",
            //    parametrosController,
            //    function (data) {

            //    });
            //}
        });

    },

    VisualizarLançamentos: function (CodigoAluno, codigoTurma) {

        var parametrosController = { CodigoAluno: CodigoAluno, codigoTurma: codigoTurma, NomeDiretoria: $("#CodigoDiretoria option:selected").text(), NomeEscola: $("#CodigoEscola option:selected").text(), Turma: $("#CodigoTurma option:selected").text() }

        utils.ajax("/DispensaLicenca/VisualizarLançamentos",
        parametrosController,
        function (data) {
            if (data)
                $("#divVisualizarLançamentos").html(data).dialog({
                    title: "Lançamento de Licença e Dispensa",
                    width: "1050"
                });
        });
    },

    Excluir: function (codigo) {
        var parametrosController = { codigo: codigo }

        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: "Deseja realmente excluir esta Licença/dispensa?",
            tipo: "Aviso",
            botoes: [{
                botao: "Sim",
                callback: function () {

                    utils.ajax("/DispensaLicenca/Excluir",
                    parametrosController,
                    function (data) {

                        var tr = $("#trDispensa_" + codigo).closest('tr');
                        tr.fadeOut(400, function () {
                            tr.remove();
                        });
                    });
                }
            },
            {
                botao: "Não",
                callback: function () {
                    $.unblockUI();
                }
            }]
        });
    },

    Editar: function (codigo, codigoAluno) {

        var parametrosController = { codigoDispensa: codigo, codigoAluno: codigoAluno }
        utils.ajax("/DispensaLicenca/EditarLancamento",
        parametrosController,
        function (data) {
            $("#divDispenasLicencas").html(data).dialog({
                title: "Editar Licença e Dispensa",
                width: "md"
            });
        });
    },

    SalvarEdicao: function (codigo, codigoAluno) {
        //Mensagem.IgnorarMensagensAutomaticas = true;
        var parametrosController = {
            codigoDispensa: codigo,
            dataInicial: $("#DataInicio").val(),
            dataFinal: $("#DataFim").val(),
            bimestre1: $("#bimestre_1").is(':checked'),
            bimestre2: $("#bimestre_2").is(':checked'),
            bimestre3: $("#bimestre_3").is(':checked'),
            bimestre4: $("#bimestre_4").is(':checked'),
            justificativa: $("#Justificativa").val(),
        }
        utils.ajax("/DispensaLicenca/SalvarEdicao",
        parametrosController,
        function (retorno) {
            $("#divDispenasLicencas").dialog('close');
            var codigoTurma = $("#HiddenCodigoTurma").val();
            var parametrosController = { CodigoAluno: codigoAluno, codigoTurma: codigoTurma, NomeDiretoria: $("#CodigoDiretoria option:selected").text(), NomeEscola: $("#CodigoEscola option:selected").text(), Turma: $("#CodigoTurma option:selected").text() }

            utils.ajax("/DispensaLicenca/VisualizarLançamentos",
            parametrosController,
            function (data) {
                if (data)
                    $("#divVisualizarLançamentos").html(data);
            });
        });
    }
}

$(document).ready(function () {

    utils.CarregarCombos();
    AplicarMascaras();
});
