$(document).ready(function () {
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'AnoLetivo' }]);
    $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', ['CodigoEscola', 'CodigoTipoEnsino', 'AnoLetivo'], undefined);
});

utils = {
    ajax: function (url, parametrosController, retorno, dataType) {
        var ajaxExecucao = {
            cache: false,
            async: true,
            url: url,
            data: parametrosController,
            type: "POST",
            dataType: dataType != undefined ? dataType : "HTML",
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
    }
}
controller = {
    ConsultarFichaIndividualAluno: function () {

        var codigoDiretoria = $('#CodigoDiretoria').val();
        var codigoEscola = $('#CodigoEscola').val();
        var codigoTurma = $('#CodigoTurma').val();
        var CodigoTipoEnsino = $('#CodigoTipoEnsino').val();
        var AnoLetivo = $('#AnoLetivo').val();

        if (codigoDiretoria == null || codigoDiretoria.length == 0) {
            codigoDiretoria = 0;
        }
        if (codigoEscola == null || codigoEscola.length == 0) {
            codigoEscola = 0;
        }
        if (CodigoTipoEnsino == null || CodigoTipoEnsino.length == 0) {
            CodigoTipoEnsino = 0;
        }
        if (codigoTurma == null || codigoTurma.length == 0) {
            codigoTurma = 0;
        }
        if (AnoLetivo.length == 0) {
            AnoLetivo = 0;
        }

        var parametrosController = {
            CodigoDiretoria: codigoDiretoria,
            CodigoEscola: codigoEscola,
            CodigoTurma: codigoTurma,
            CodigoTipoEnsino: CodigoTipoEnsino,
            AnoLetivo: AnoLetivo,
            'RA.Numero': $("#RA_Numero").val(),
            'RA.Digito': $("#RA_Digito").val(),
            'RA.UF': $("#RA_UF").val(),
            'RA.DataNascimento': $("#RA_DataNascimento").val()
        };
        if (parametrosController.CodigoDiretoria == 0 && parametrosController.CodigoEscola == 0 && parametrosController.CodigoTurma == 0) {
            $("#frmFichaIndividualAluno").validate({
                rules: {
                    AnoLetivo: { required: true, number: true, min: 2014, max: new Date().getFullYear() },
                    'RA.Numero': { required: true, number: true },
                    'RA.UF': { required: true }
                },
                messages: {
                    RA_Numero: {
                        number: 'Somente números'
                    },
                    AnoLetivo: {
                        min: 'Informe um ano letivo igual ou maior a 2014',
                        max: 'Informe um ano letivo igual ou menor que ' + new Date().getFullYear(),
                        number: 'Somente números'
                    },
                }
            });
        } else {
            $("#frmFichaIndividualAluno").validate({
                rules: {
                    'CodigoDiretoria': { required: true, number: true },
                    'CodigoEscola': { required: true, number: true },
                    'CodigoTurma': { required: true, number: true },
                    'CodigoTipoEnsino': { required: true, number: true },
                    AnoLetivo: { required: true, number: true, min: 2014, max: new Date().getFullYear() }
                },
                messages: {
                    CodigoDiretoria: {
                        required: ' Obrigatório'
                    },
                    CodigoEscola: {
                        required: ' Obrigatório'
                    },
                    CodigoTurma: {
                        required: ' Obrigatório'
                    },
                    codigoTipoEnsino: {
                        required: ' Obrigatório'
                    },
                    AnoLetivo: {
                        min: 'Informe um ano letivo igual ou maior a 2014',
                        max: 'Informe um ano letivo igual ou menor que ' + new Date().getFullYear(),
                        number: 'Somente números'
                    }
                }
            });
        }
        if (!$("#frmFichaIndividualAluno").valid()) return false;

        utils.ajax('/FichaIndividual/ConsultarFichaIndividualAluno', parametrosController,// $("#frmFichaIndividualAluno").serialize(),
            function (data) {
                if (data == null || data == "") {
                    return;
                }
                $("#divResultado").empty().html(data);
                $("#tabelaDados").sedDataTable({ columnDefs: [{ targets: [6], orderable: false }], nomeExportacao: "Ficha Individual Aluno" });
            });
    },

    //Processo que gera a ficha individual do aluno em pdf
    GerarFichaIndividualAlunoPdf: function (codigoAluno) {
        controller.GerarFichaIndividualAlunoLotePdf(codigoAluno);
        //window.open('/FichaIndividual/GerarFichaIndividualAlunoPDF/?CodigoAluno=' + codigoAluno, '_self');
        //$("#resultado #btnGerarFichaIndividual").attr("disabled", true);
    },
    HabilitaPDF: function () {
        if ($("#CodigoTurma").val())
            $("#btnGerarLotePDF").show();
        else
            $("#btnGerarLotePDF").hide();
    },
    GerarFichaIndividualAlunoLotePdf: function (codigoAluno) {
        
        if (codigoAluno == undefined)
            codigoAluno = 0;
        $.ajax({
            cache: false,
            url: '/FichaIndividual/GerarFichaIndividualAlunoLotePDF',
            type: 'POST',
            datatype: 'JSON',
            data: {
                codigoTurma: $("#CodigoTurma").val() != "" ? $("#CodigoTurma").val() : 0,
                codigoAluno: codigoAluno,
                anoLetivo: $("#AnoLetivo").val(),
                fl_ano: $("#chkAnoLetivo:checked").length
            },
            success: function (data, textStatus, jqXHR) {
                if (data.acessoNegado) {
                    Mensagem.Alert({
                        titulo: "Erro",
                        mensagem: data.msg,
                        tipo: "Erro",
                        botao: "Fechar"
                    });
                    return;
                }
                var config = {
                    pageOrientation: "landscape",
                    pageSize: "A3",
                    pageMargins: [5, 80, 5, 110],
                    title: "Ficha Individual"
                };
                sedPdfExporter.normalizeConfig(config);
                //config.debug = true;
                config.data = data;
                config.docGenerator = function (config) {
                    var content = [];

                    for (var i = 0; i < config.data.length; i++) {
                        var fechamentos = config.data[i].Fechamento;
                        var disciplinas = config.data[i].Disciplinas;

                        content.push({
                            style: 'info',
                            table: {
                                widths: ['*', '*', '*', '*', '*'],
                                body: [
                                    [{ text: "Escola:", style: 'h2', colSpan: 5, alignment: 'center' }, {}, {}, {}, {}],
                                    [{ text: config.data[i].Escola, style: 'h2', colSpan: 5, alignment: 'center' }, {}, {}, {}, {}],
                                    [{ text: "Nome: " + config.data[i].NomeAluno, style: 'h2' }, { text: "Data Nasc: " + config.data[i].DtNascimento, style: 'h2' }, { text: "Sexo: " + config.data[i].Sexo, style: 'h2' },
                                    { text: "RA: " + config.data[i].RA, style: 'h2' }, { text: "RM: _______________________", style: 'h2' }],
                                ]
                            },
                            layout: {
                                hLineWidth: function (i, node) { return 0; },
                                vLineWidth: function (i, node) { return 0; }
                            }
                        });

                        var cabecalho = [];
                        cabecalho.push({
                            style: 'tabelaSed',
                            table: {
                                widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', '*', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
                                body: [
                                    [{ text: "Ano:", alignment: 'center' }, { text: "Curso/Habilitação:", colSpan: 7, alignment: 'center' }, {}, {}, {}, {}, {}, {}, { text: "Cursa a série pela (  ) vez", colSpan: 6, alignment: 'center' }, {}, {}, {}, {}, {}],
                                    [{ text: config.data[i].AnoLetivo.toString(), rowSpan: 2, alignment: 'center' }, { text: "Classe(s)", rowSpan: 2, alignment: 'center' }, { text: "T", alignment: 'center' }, { text: config.data[i].DescTpEnsino.substring(7, 8), alignment: 'center' }, { text: "S", alignment: 'center' }, { text: "t", alignment: 'center' }, { text: "Nº Ch.", alignment: 'center' }, { text: config.data[i].DescTpEnsino.toString(), alignment: 'center' }, { text: "COMPONENTE", alignment: 'center' }, { text: "T", alignment: 'center' }, { text: config.data[i].DescTpEnsino.substring(7, 8), alignment: 'center' }, { text: "S", alignment: 'center' }, { text: "t", alignment: 'center' }, { text: "Nº Ch.", alignment: 'center' }],
                                    [{}, {}, { text: config.data[i].Turno == null ? '' : config.data[i].Turno.toString(), alignment: 'center' }, { text: config.data[i].Grau.toString(), alignment: 'center' }, { text: config.data[i].Serie.toString(), alignment: 'center' }, { text: config.data[i].IdTurma == null ? '' : config.data[i].IdTurma, alignment: 'center' }, { text: config.data[i].NrChamada.toString(), alignment: 'center' }, { text: "_______________________________", alignment: 'center' }, { text: "", alignment: 'center' }, { text: "", alignment: 'center' }, { text: "", alignment: 'center' }, { text: "", alignment: 'center' }, { text: "", alignment: 'center' }, { text: "", alignment: 'center' }],
                                ]
                            },
                            layout: {
                                hLineColor: function () { return "#CCC" },
                                vLineColor: function () { return "#CCC" }
                            }
                        });
                        content.push(cabecalho);
                        var ficha = [];
                        var w = [];
                        //cabecalho da ficha
                        var cabecalho_disciplinas = [];
                        cabecalho_disciplinas.push({ text: "COMPONENTE CURRICULAR", colSpan: 3, rowSpan: 2, style: "titulos" }, {}, {})
                        w.push('auto', 'auto', 'auto');
                        for (var j = 0; j < disciplinas.length; j++) {
                            cabecalho_disciplinas.push({ text: disciplinas[j].Nome == null ? fechamentos[j].NomeDisciplina : disciplinas[j].Nome, rowSpan: 2, style: "titulos" });
                            //if (disciplinas[j].Nome == "ARTE")
                            //    w.push('*');
                            //else
                                w.push('auto');
                        }
                        cabecalho_disciplinas.push({ text: config.data[i].DescTpEnsino, style: "titulos" });
                        w.push('*');
                        cabecalho_disciplinas.push({ text: "TOTAIS", style: "titulos" });
                        w.push('auto');
                        ficha.push(cabecalho_disciplinas);
                        var linha = [];
                        linha.push({}, {}, {})
                        for (var j = 0; j < disciplinas.length; j++) {
                            linha.push({});
                        }
                        linha.push({ text: "DEPEND.", style: "titulos" });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //primeiro bimestre ASSIDUIDADE
                        linha = [];
                        linha.push({ text: "ASSIDUIDADE", rowSpan: 8, style: "titulos" }, { text: "FALTAS BIMESTRAIS", rowSpan: 4, style: "titulos" }, { text: "1º", style: "titulos" });
                        for (var d = 0; d < disciplinas.length; d++) {
                            var bimestre = '';
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina && fechamentos[j].TipoFechamento == 5)
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina && fechamentos[j].TipoFechamento == 5)
                                    bimestre = fechamentos[j].Faltas.toString();
                            }
                            linha.push({ text: bimestre, style: 'nota' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //segundo bimestre ASSIDUIDADE
                        linha = [];
                        linha.push({}, {}, { text: "2º", style: "titulos" });
                        for (var d = 0; d < disciplinas.length; d++) {
                            var bimestre = '';
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina && fechamentos[j].TipoFechamento == 6)
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina && fechamentos[j].TipoFechamento == 6)
                                    bimestre = fechamentos[j].Faltas.toString();
                            }
                            linha.push({ text: bimestre, style: 'nota' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //terceiro bimestre ASSIDUIDADE
                        linha = [];
                        linha.push({}, {}, { text: "3º", style: "titulos" });
                        for (var d = 0; d < disciplinas.length; d++) {
                            var bimestre = '';
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina && fechamentos[j].TipoFechamento == 7)
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina && fechamentos[j].TipoFechamento == 7)
                                    bimestre = fechamentos[j].Faltas.toString();
                            }
                            linha.push({ text: bimestre, style: 'nota' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //quarto bimestre ASSIDUIDADE
                        linha = [];
                        linha.push({}, {}, { text: "4º", style: "titulos" });
                        for (var d = 0; d < disciplinas.length; d++) {
                            var bimestre = '';
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina && fechamentos[j].TipoFechamento == 8)
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina && fechamentos[j].TipoFechamento == 8)
                                    bimestre = fechamentos[j].Faltas.toString();
                            }
                            linha.push({ text: bimestre, style: 'nota' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //ausencia compensada ASSIDUIDADE
                        linha = [];
                        var falta_compensada = 0;
                        linha.push({}, { text: "Aus. Comp.", colSpan: 2, style: "titulos" }, {});
                        for (var d = 0; d < disciplinas.length; d++) {
                            falta_compensada = 0;
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina)
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina)
                                    falta_compensada = fechamentos[j].FaltasCompensadas.toString();
                            }
                            linha.push({ text: falta_compensada, style: 'nota' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //total faltas ASSIDUIDADE
                        linha = [];
                        var faltas = 0;
                        var faltasTotais = 0;
                        linha.push({}, { text: "Total Faltas", colSpan: 2, style: "titulos" }, {});
                        for (var d = 0; d < disciplinas.length; d++) {
                            faltas = 0;
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina) {
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina) {
                                    faltas = fechamentos[j].TotalFaltas.toString();
                                }
                            }
                            linha.push({ text: faltas, style: 'nota' });
                            if (disciplinas[d].Codigo == 1000) {
                                faltasTotais = 0; //Anos iniciais considerar somente a primeira desconsiderar as demais.
                                faltasTotais += parseInt(faltas);
                            }
                            else
                                faltasTotais += parseInt(faltas);
                        }
                        linha.push({ text: '' });
                        linha.push({ text: faltasTotais == 0 ? '' : faltasTotais.toString(), style: 'nota' });
                        ficha.push(linha);
                        //aulas dadas ASSIDUIDADE
                        linha = [];
                        var aulas = 0;
                        var totaisAulas = 0;
                        linha.push({}, { text: "Aulas Dadas", colSpan: 2, style: "titulos" }, {});
                        for (var d = 0; d < disciplinas.length; d++) {
                            aulas = 0;
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina)
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina)
                                    aulas = fechamentos[j].AulasRealizadas.toString();
                            }
                            linha.push({ text: aulas, style: 'nota' });
                            if (disciplinas[d].Codigo === 1000) {
                                totaisAulas = 0; //Anos iniciais considerar somente a primeira desconsiderar as demais.
                                totaisAulas += parseInt(aulas);
                            } else
                                totaisAulas += parseInt(aulas);

                        }
                        linha.push({ text: '' });
                        linha.push({ text: totaisAulas == 0 ? '' : totaisAulas.toString(), style: 'nota' });
                        ficha.push(linha);
                        //% Inf. a 75% ASSIDUIDADE
                        var totalAulas = 0;
                        var totalFaltas = 0;
                        linha = [];
                        linha.push({}, { text: "% Inf. a 75%", colSpan: 2, style: "titulos" }, {});
                        for (var d = 0; d < disciplinas.length; d++) {
                            aulas = 0;
                            faltas = 0;
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina) {
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina) {
                                    aulas = fechamentos[j].AulasRealizadas;
                                    faltas += fechamentos[j].Faltas;
                                }
                            }
                            linha.push({ style: 'nota', text: aulas == 0 ? '' : (((aulas - faltas) / aulas) * 100).toFixed(2).toString() + '%' });
                            if (disciplinas[d].Codigo === 1000) {
                                totalAulas = 0;
                                totalFaltas = 0;
                                totalAulas += parseInt(aulas);
                                totalFaltas += parseInt(faltas);
                            } else {
                                totalAulas += parseInt(aulas);
                                totalFaltas += parseInt(faltas);
                            }

                        }
                        linha.push({ text: '' });
                        if (disciplinas[0].Codigo != 1000)
                            linha.push({ text: totalAulas == 0 ? '' : Math.round((((totaisAulas - totalFaltas) / totaisAulas) * 100)).toString() + '%', style: 'nota' });
                        else
                            linha.push({ text: faltasTotais.toString() + "/" + totaisAulas.toString(), style: 'nota' });
                        ficha.push(linha);
                        
                        //primeiro bimestre AVALIAÇÃO
                        linha = [];
                        linha.push({ text: "AVALIAÇÃO", rowSpan: 9, style: "titulos" }, { text: "BIMESTRES", rowSpan: 4, style: "titulos" }, { text: "1º" });
                        for (var d = 0; d < disciplinas.length; d++) {
                            var bimestre = '';
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina && fechamentos[j].TipoFechamento == 5)
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina && fechamentos[j].TipoFechamento == 5)
                                    bimestre = fechamentos[j].Nota == null ? '' : fechamentos[j].Nota.toString();
                            }
                            linha.push({ text: bimestre, style: 'nota' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //segundo bimestre AVALIAÇÃO
                        linha = [];
                        linha.push({}, {}, { text: "2º", style: "titulos" });
                        for (var d = 0; d < disciplinas.length; d++) {
                            var bimestre = '';
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina && fechamentos[j].TipoFechamento == 6)
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina && fechamentos[j].TipoFechamento == 6)
                                    bimestre = fechamentos[j].Nota == null ? '' : fechamentos[j].Nota.toString();
                            }
                            linha.push({ text: bimestre, style: "nota" });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //terceiro bimestre AVALIAÇÃO
                        linha = [];
                        linha.push({}, {}, { text: "3º", style: "titulos" });
                        for (var d = 0; d < disciplinas.length; d++) {
                            var bimestre = '';
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina && fechamentos[j].TipoFechamento == 7)
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina && fechamentos[j].TipoFechamento == 7)
                                    bimestre = fechamentos[j].Nota == null ? '' : fechamentos[j].Nota.toString();
                            }
                            linha.push({ text: bimestre, style: 'nota' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //quarto bimestre AVALIAÇÃO
                        linha = [];
                        linha.push({}, {}, { text: "4º", style: "titulos" });
                        for (var d = 0; d < disciplinas.length; d++) {
                            var bimestre = '';
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina && fechamentos[j].TipoFechamento == 8)
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina && fechamentos[j].TipoFechamento == 8)
                                    bimestre = fechamentos[j].Nota == null ? '' : fechamentos[j].Nota.toString();
                            }
                            linha.push({ text: bimestre, style: 'nota' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //media final AVALIAÇÃO
                        linha = [];
                        var media_final = 0;
                        linha.push({}, { text: "M. FINAL(5ª.)", colSpan: 2, style: "titulos" }, {});
                        for (var d = 0; d < disciplinas.length; d++) {
                            media_final = 0;
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina && fechamentos[j].TipoFechamento == 10)
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina && fechamentos[j].TipoFechamento == 10)
                                    media_final = fechamentos[j].Nota == null ? '' : fechamentos[j].Nota.toString();
                            }
                            linha.push({ text: media_final, style: 'nota' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //1º conselho AVALIAÇÃO
                        linha = [];
                        linha.push({}, { text: "1º CONSELHO", colSpan: 2, style: "titulos" }, {});
                        for (var d = 0; d < disciplinas.length; d++) {
                            linha.push({ text: '' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //recuperação AVALIAÇÃO
                        linha = [];
                        linha.push({}, { text: "RECUPERAÇÃO", colSpan: 2, style: "titulos" }, {});
                        for (var d = 0; d < disciplinas.length; d++) {
                            linha.push({ text: '' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //2º conselho AVALIAÇÃO
                        linha = [];
                        linha.push({}, { text: "2º CONSELHO", colSpan: 2, style: "titulos" }, {});
                        for (var d = 0; d < disciplinas.length; d++) {
                            linha.push({ text: '' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //conselho final AVALIAÇÃO
                        linha = [];
                        var media_final = 0;
                        linha.push({}, { text: "CONC. FINAL", colSpan: 2, style: "titulos" }, {});
                        for (var d = 0; d < disciplinas.length; d++) {
                            media_final = 0;
                            for (var j = 0; j < fechamentos.length; j++) {
                                //if (disciplinas[d].Codigo == fechamentos[j].CodDisciplina &&
                                if ((disciplinas[d].Codigo == fechamentos[j].CodDisciplina || disciplinas[d].CodigoQuebra == fechamentos[j].CodDisciplina) &&
                                    disciplinas[d].NomeCompleto == fechamentos[j].NomeDisciplina && fechamentos[j].TipoFechamento == 10)
                                    bimestre = fechamentos[j].Nota == null ? '' : fechamentos[j].Nota.toString();
                            }
                            linha.push({ text: media_final, style: 'nota' });
                        }
                        linha.push({ text: '' });
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //resultado final
                        linha = [];
                        linha.push({ text: "RESULTADO FINAL", colSpan: 3, style: "titulos" }, {}, {});
                        linha.push({ text: "(" + config.data[i].ReprovadoDescricao + ") " + "O ALUNO ESTÁ APTO A CURSAR A (   )º SÉRIE DO "  + config.data[i].DescTpEnsino, colSpan: disciplinas.length +1, style: "titulos"
                    });
                        for (var d = 0; d < disciplinas.length; d++) {
                            linha.push({});
                        }
                        linha.push({ text: '' });
                        ficha.push(linha);
                        //legenda
                        linha = [];
                        linha.push({ text: "LEGENDA", colSpan: 3, style: "titulos" }, {}, {});
                        linha.push({ text: "Observações", colSpan: disciplinas.length + 2, style: "titulos" });
                        for (var d = 0; d < disciplinas.length; d++) {
                            linha.push({});
                        }
                        linha.push({ text: '' });
                        ficha.push(linha);
                        linha = [];
                        var half = disciplinas.length == 1 ? 0 : Math.round(disciplinas.length / 2);
                        linha.push({ text: "1 - Aprovado(a)", colSpan: 3, style: "titulos" }, {}, {});
                        linha.push({
                            canvas: [
                               {
                                   type: 'line',
                                   x1: 300, y1: 25,
                                   x2: 70, y2: 25,
                                   lineWidth: 1
                               }], colSpan: disciplinas.length, rowSpan: 3, colSpan: half + 1
                        });
                        for (var d = 0; d < half; d++) {
                            linha.push({});
                        }
                        linha.push({
                            canvas: [
                                {
                                    type: 'line',
                                    x1: 250, y1: 25,
                                    x2: 40, y2: 25,
                                    lineWidth: 1
                                }], colSpan: disciplinas.length, rowSpan: 3, colSpan: disciplinas.length - half + 1
                        });
                        for (var d = 0; d < disciplinas.length - half - 1; d++) {
                            linha.push({});
                        }
                        linha.push({ text: '' });
                        ficha.push(linha);
                        linha = [];
                        linha.push({ text: "3 - Retido(a) por Frequência Insuficiente", colSpan: 3, style: "titulos" }, {}, {});
                        for (var d = 0; d < disciplinas.length + 1; d++) {
                            linha.push({});
                        }
                        linha.push({ text: '' });
                        ficha.push(linha);
                        linha = [];
                        linha.push({ text: "4 - Retido(a) por Rendimento Insuficiente", colSpan: 3, style: "titulos" }, {}, {});
                        for (var d = 0; d < disciplinas.length + 1; d++) {
                            linha.push({});
                        }
                        linha.push({ text: '' });
                        ficha.push(linha);

                        linha = [];
                        linha.push({ text: "5 - Aprovado pelo Conselho", colSpan: 3, style: "titulos" }, {}, {});
                        linha.push({ text: "GERENTE DE ORG. ESCOLAR", colSpan: disciplinas.length, colSpan: half + 1, style: "titulos" });
                        for (var d = 0; d < half; d++) {
                            linha.push({});
                        }

                        linha.push({ text: "DIRETOR DE ESCOLA", colSpan: disciplinas.length, colSpan: disciplinas.length - half + 1, style: "titulos" });
                        for (var d = 0; d < disciplinas.length - half - 1; d++) {
                            linha.push({});
                        }
                        linha.push({ text: '' });
                        ficha.push(linha);


                        content.push(
                            {
                                style: 'fichaSed',
                                table: {
                                    widths: w,
                                    body: ficha,
                                },
                                layout: {
                                    hLineColor: function () { return "#CCC" },
                                    vLineColor: function () { return "#CCC" }
                                },
                                pageBreak: (i % 1 == 0 && i < config.data.length - 1 ? 'after' : '')
                            });


                    }

                    var doc = {
                        content: content,
                        header: config.sedHeader,
                        footer: config.sedFooter,
                        styles: {
                            h2: {
                                bold: true,
                            },
                            titulos: {
                                fontSize: 7
                            },
                            info: {
                                margin: [0, 5, 0, 15],
                                fontSize: 8,
                            },
                            nota: {
                                fontSize: 7
                            },
                            tabelaSed: {
                                margin: [0, 5, 0, 15],
                                fontSize: 9,
                                alignment: 'center',
                            },
                            fichaSed: {
                                margin: [0, 5, 0, 15],
                                fontSize: 5,
                                alignment: 'center',
                            },
                            h: {
                                bold: true,
                                fontSize: 9,
                                fillColor: '#459ad6',
                                color: 'white',
                            }
                        }
                    };
                    return doc;
                };
                sedPdfExporter.exportPdf(config);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
}

