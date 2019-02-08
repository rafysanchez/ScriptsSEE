$(document).ready(function () {
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'AnoLetivo' }]);
    $("#CodigoTipoEnsino").autoPreencher($("#CodigoTurma"), "Turma", "CarregarListaTurmaPorTipoEnsino", [{ CodigoEscola: "'CodigoEscola'", CodigoTipoEnsino: "'CodigoTipoEnsino'", AnoLetivo: "'txtAnoLetivo'" }]);
});

controller = {
    Pesquisar: function () {
        var codigoDiretoria = $('#CodigoDiretoria').val();
        var codigoEscola = $('#CodigoEscola').val();
        var codigoTurma = $('#CodigoTurma').val();
        var tipoEnsino = $('#CodigoTipoEnsino').val();
        var anoLetivo = $('#AnoLetivo').val();
        var nrRa = $('#RA_Numero').val();
        var digRa = $('#RA_Digito').val();
        var ufRa = $('#RA_UF').val();

        if (codigoDiretoria == 0 && codigoEscola == 0 && codigoTurma == 0 && tipoEnsino == 0 && nrRa == '' && ufRa == undefined)
            return false;

        if (codigoDiretoria == 0 && codigoEscola == 0 && codigoTurma == 0 && tipoEnsino == 0) {
            $("#frmConselhoTutelar").validate({
                rules: {
                    AnoLetivo: { required: true, number: true },
                    'RA.Numero': { required: true, number: true },
                    'RA.UF': { required: true }
                },
                messages: {
                    RA_Numero: {
                        number: 'Somente números'
                    },
                    AnoLetivo: {
                        number: 'Somente números'
                    },
                }
            });
        } else {
            $("#frmConselhoTutelar").validate({
                rules: {
                    'CodigoDiretoria': { required: true, number: true },
                    'CodigoEscola': { required: true, number: true },
                    'CodigoTurma': { required: true, number: true },
                    'CodigoTipoEnsino': { required: true, number: true },
                    AnoLetivo: { required: true, number: true }
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
                    CodigoTipoEnsino: {
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


        if (!$("#frmConselhoTutelar").valid()) return false;

        $.ajax({
            cache: false,
            url: '/ConselhoTutelar/ListaAlunoParcial',
            type: 'POST',
            datatype: 'html',
            data: {
                anoLetivo: anoLetivo,
                codigoDiretoria: codigoDiretoria,
                codigoEscola: codigoEscola,
                tipoEnsino: tipoEnsino,
                codigoTurma: codigoTurma,
                nrRa: nrRa,
                digRa: digRa,
                ufRa: ufRa
            },
            success: function (data, textStatus, jqXHR) {
                //gerarPdf(data);
                $("#divResultado").html(data);
                $("#tabelaDados").sedDataTable();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
    Visualizar: function (id, codigoTurma) {
        $.ajax({
            cache: false,
            url: '/ConselhoTutelar/FichaAlunoParcial',
            type: 'POST',
            datatype: 'html',
            data: {
                codigo: id,
                codigoTurma: codigoTurma
            },
            success: function (data, textStatus, jqXHR) {
                $("#alunoDialog").html(data).dialog({
                    title: "Ficha Conselho Tutelar",
                    width: "980px"
                });

                $('#alunoDialog input[type="text"].form-control:not([readonly])').each(function (i, v) {
                    if (
                            $(v).val() != ""
                            && $(v).attr("id") != "NomeProfessor"
                            && $(v).attr("id") != "Oficio"

                            && $(v).attr("id") != "NomeMediador"
                            && $(v).attr("id") != "NomeResponsavel"
                            && $(v).attr("id") != "ComplementoEndereco"
                            && $(v).attr("id") != "PontoReferencia"
                            && $(v).attr("id") != "OutraReferencia"
                            && $(v).attr("id") != "ObservacaoProfessor"
                            && $(v).attr("id") != "ProvidenciasEquipeDiretiva"
                            && $(v).attr("id") != "ProcedimentoEscola"

                        )
                            $(v).prop("readonly", true);

                });

                //$('#alunoDialog textarea.form-control:not([readonly])').each(function (i, v) {
                //    if ($(v).val() != "")
                //        $(v).prop("readonly", true);
                //});
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
    HabilitarOutros: function (check) {
        if (check.checked)
            $("#MotivoOutros").prop("readonly", false);
        else {
            $("#MotivoOutros").prop("readonly", true);
            $("#MotivoOutros").val("");
        }
    },
    Salvar: function (finalizar) {
        var validacao = "";
        var continua = true;

        //validacao
        if ($("#CodigoDisciplina").val() == "") {
            validacao = "Selecione uma disciplina."
        }
        if (validacao == "" && $("#NomeProfessor").val() == "") {
            validacao = "Preencha o campo Nome do Professor."
        }
        if (validacao == "" && $("#ObservacaoProfessor").val() == "") {
            validacao = "Preencha o campo Observação do Professor."
        }
        if (validacao == "" && $("#ProvidenciasEquipeDiretiva").val() == "") {
            validacao = "Preencha o campo Contato com a Familia."
        }
        if (validacao == "" && $("#ProcedimentoEscola").val() == "") {
            validacao = "Preencha o campo Procedimentos da Escola."
        }

        var motivos = [];
        $("#divMotivos .form-control").each(function (i, v) {
            if ($(v)[0].checked) {
                motivos.push(parseInt($(v).val()));
            }
        });
        if (validacao == "" && motivos.length == 0) {
            validacao = "Selecione o(s) motivo(s)."
        }


        var ficha = {};
        $("#alunoDialog .form-control").each(function (i, v) {
            var nome = $(v).attr("id");
            var valor = $(v).val();
            if (
                    ( 
                        nome == "CodigoDisciplina" ||
                        nome == "Oficio" ||
                        nome == "Faltas" ||
                        nome == "PerncetualFaltas" 
                    ) && valor == "")
                ficha[nome] = 0;
            else
                ficha[nome] = valor;

        });

        ficha["Resultado"] = $("input[name='rdResultado']:checked").val()

        if (validacao == "" && $("input[name='rdResultado']:checked").length == 0) {
            validacao = "Selecione um opção em Resultados Obtidos."
        }

        var arq_responsaveis = [];
        $("#bodyResponsaveis .form-control").each(function (i, v) {
            arq_responsaveis.push({ Codigo: $(v).val() });
        });

        var arq_providencias = [];
        $("#bodyProvidencias .form-control").each(function (i, v) {
            arq_providencias.push({ Codigo: $(v).val() });
        });

        var arq_responsaveis_ass = [];
        $("#bodyResponsaveisAss .form-control").each(function (i, v) {
            arq_responsaveis_ass.push({ Codigo: $(v).val() });
        });

        if (validacao != "") {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: validacao,
                tipo: "aviso",
                botao: "Fechar"
            });
            return;
        }
        var fd = new FormData();
        if ($("#input-upload-irmao").length > 0)
            fd.append("ArquivoIrmao", $("#input-upload-irmao")[0].files[0]);
        else
            fd.append("codigoArquivoIrmao", $("#CodigoArquivoIrmao").val());

        fd.append("finalizar", finalizar);
        fd.append("codigo", $("#CodigoFicha").val());
        fd.append("ficha", JSON.stringify(ficha));
        fd.append("motivos", JSON.stringify(motivos));
        fd.append("arquivosResponsaveis", JSON.stringify(arq_responsaveis));
        fd.append("arquivosProvidencias", JSON.stringify(arq_providencias));
        fd.append("arquivosResponsaveisAss", JSON.stringify(arq_responsaveis_ass));

        if (parseInt($("#Finalizado").val()) == 1) {
            Mensagem.Alert({
                titulo: "Confirmação",
                mensagem: "Encaminhamento finalizado, deseja salvar?",
                tipo: "alerta",
                botoes: [
                    {
                        botao: "Sim",
                        callback: function () {
                            Mensagem.Fechar();

                            $.ajax({
                                type: 'POST',
                                data: fd,
                                datatype: 'json',
                                contentType: false,
                                processData: false,
                                url: '/ConselhoTutelar/Salvar',
                                success: function (data) {
                                    Mensagem.IgnorarMensagensAutomaticas = true
                                    Mensagem.Alert({
                                        titulo: data.titulo,
                                        mensagem: data.mensagem,
                                        tipo: data.tipo,
                                        botao: "Fechar"
                                    });
                                    if (data.sucesso)
                                        $("#alunoDialog").html(data).dialog("close");
                                },
                            });
                        }
                    },
                    {
                        botao: "Não",
                        callback: function () {
                            Mensagem.Fechar();
                            return;
                        }
                    }
                ]
            });

            return;
        } else {

            $.ajax({
                type: 'POST',
                data: fd,
                datatype: 'json',
                contentType: false,
                processData: false,
                url: '/ConselhoTutelar/Salvar',
                success: function (data) {
                    Mensagem.IgnorarMensagensAutomaticas = true
                    Mensagem.Alert({
                        titulo: data.titulo,
                        mensagem: data.mensagem,
                        tipo: data.tipo,
                        botao: "Fechar"
                    });
                    if (data.sucesso)
                        $("#alunoDialog").html(data).dialog("close");
                },
            });
        }
    },
    CarregaFaltas: function () {
        if ($("#CodigoDisciplina").val() == "")
            return;

        $.ajax({
            type: 'POST',
            data: {
                matricula: $("#CodigoMatriculaAluno").val(),
                disciplina: $("#CodigoDisciplina").val(),
                bimestre: $("#CodigoBimestre").val(),
                codigoDiretoria: $('#CodigoDiretoria').val(),
                codigoEscola: $('#CodigoEscola').val(),
                anoLetivo: $('#AnoLetivo').val()
            },
            datatype: 'json',
            url: '/ConselhoTutelar/CarregarFaltas',
            success: function (data) {
                if (data.sucesso) {

                    if (data.Faltas == -1)
                        $("#Faltas").val("");
                    else
                        $("#Faltas").val(data.Faltas);

                    $("#NomeProfessor").val(data.NomeProfessor);

                    if (data.Faltas == -1) {
                        $("#PerncetualFaltas").val("");
                    }
                    else {
                        var percentual = (parseFloat(data.Faltas) / parseFloat(data.TotalAulas)) * 100;
                        if (!isNaN(percentual))
                            $("#PerncetualFaltas").val(percentual.toFixed(0));
                        else
                            $("#PerncetualFaltas").val(0);
                    }
                }
                else {
                    Mensagem.IgnorarMensagensAutomaticas = true
                    Mensagem.Alert({
                        titulo: data.titulo,
                        mensagem: data.mensagem,
                        tipo: data.tipo,
                        botao: "Fechar"
                    });

                }
            },
        });
    },
    PDF: function (id, codigoTurma) {
        $.ajax({
            cache: false,
            url: '/ConselhoTutelar/PDF',
            type: 'GET',
            datatype: 'json',
            data: {
                codigo: id,
                codigoTurma: codigoTurma
            },
            success: function (data, textStatus, jqXHR) {
                GerarPDF(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
}

arquivo = {
    Download: function (id) {
        window.location.href = "/ConselhoTutelar/DownloadArquivo?codigo=" + id;
    },
    ExcluirResponsavel: function (id) {
        $.ajax({
            cache: false,
            url: '/ConselhoTutelar/ExcluirArquivo',
            type: 'POST',
            data: { codigo: id },
            datatype: 'json',
            success: function (data) {
                Mensagem.IgnorarMensagensAutomaticas = true
                if (data.sucesso) {
                    var tabela = document.getElementById("bodyResponsaveis");
                    for (var i = 0; i < tabela.rows.length; i++) {
                        if (data.id == $(tabela.rows[i]).find("input").val())
                            document.getElementById("bodyResponsaveis").removeChild(tabela.rows[i]);
                    }

                }
                Mensagem.Alert({
                    titulo: data.titulo,
                    mensagem: data.mensagem,
                    tipo: data.tipo,
                    botao: "Fechar"
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
    ExcluirProvidencias: function (id) {
        $.ajax({
            cache: false,
            url: '/ConselhoTutelar/ExcluirArquivo',
            type: 'POST',
            data: { codigo: id },
            datatype: 'json',
            success: function (data) {
                Mensagem.IgnorarMensagensAutomaticas = true
                if (data.sucesso) {
                    var tabela = document.getElementById("bodyProvidencias");
                    for (var i = 0; i < tabela.rows.length; i++) {
                        if (data.id == $(tabela.rows[i]).find("input").val())
                            document.getElementById("bodyProvidencias").removeChild(tabela.rows[i]);
                    }

                }
                Mensagem.Alert({
                    titulo: data.titulo,
                    mensagem: data.mensagem,
                    tipo: data.tipo,
                    botao: "Fechar"
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
    ExcluirResponsavelAss: function (id) {
        $.ajax({
            cache: false,
            url: '/ConselhoTutelar/ExcluirArquivo',
            type: 'POST',
            data: { codigo: id },
            datatype: 'json',
            success: function (data) {
                Mensagem.IgnorarMensagensAutomaticas = true
                if (data.sucesso) {
                    var tabela = document.getElementById("bodyResponsaveisAss");
                    for (var i = 0; i < tabela.rows.length; i++) {
                        if (data.id == $(tabela.rows[i]).find("input").val())
                            document.getElementById("bodyResponsaveisAss").removeChild(tabela.rows[i]);
                    }

                }
                Mensagem.Alert({
                    titulo: data.titulo,
                    mensagem: data.mensagem,
                    tipo: data.tipo,
                    botao: "Fechar"
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    },
    Adicionar: function (form, tipo) {
        if ($("#" + form + " input[type='file']")[0].files.length == 0) {
            Mensagem.Alert({
                titulo: "Arquivo Inválido",
                mensagem: "Selecione um arquivo para inserir.",
                tipo: "alerta",
                botao: "Fechar"
            });
            return;
        }
        var fd = new FormData();
        fd.append("arquivo", $("#" + form + " input[type='file']")[0].files[0]);
        fd.append("tipoArquivo", tipo);

        $.ajax({
            cache: false,
            url: '/ConselhoTutelar/UploadArquivo',
            type: 'POST',
            data: fd,
            datatype: 'json',
            contentType: false,
            processData: false,
            success: function (data) {
                Mensagem.IgnorarMensagensAutomaticas = true
                if (data.sucesso) {
                    var tabela;
                    if (data.tipo == 1)
                        tabela = document.getElementById("bodyResponsaveis");
                    else if (data.tipo == 2)
                        tabela = document.getElementById("bodyProvidencias");
                    else if (data.tipo == 3)
                        tabela = document.getElementById("bodyResponsaveisAss");

                    var row = tabela.insertRow(tabela.rows.length);
                    var arquivo = row.insertCell(0);
                    var download = row.insertCell(1);
                    var excluir = row.insertCell(2);

                    arquivo.innerHTML = '<input type="hidden" id="hdnCodigoArquivoResp" value="' + data.id + '" class="form-control"/>' + data.nome;
                    download.innerHTML = '<td style="text-align: center;"><a href="javascript:void(0)" onclick="arquivo.Download(' + data.id + ')"><i class="icone-tabela-download" title="Excluir"></i></a></td>';
                    //excluir.innerHTML = '<td style="text-align: center;"><a href="javascript:void(0)" onclick="arquivo.Excluir(' + data.id + ')"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>';
                    if (data.tipo == 1)
                        excluir.innerHTML = '<td style="text-align: center;"><a href="javascript:void(0)" onclick="arquivo.ExcluirResponsavel(' + data.id + ')"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>';
                    else if (data.tipo == 2)
                        excluir.innerHTML = '<td style="text-align: center;"><a href="javascript:void(0)" onclick="arquivo.ExcluirProvidencias(' + data.id + ')"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>';
                    else if (data.tipo == 3)
                        excluir.innerHTML = '<td style="text-align: center;"><a href="javascript:void(0)" onclick="arquivo.ExcluirResponsavelAss(' + data.id + ')"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>';

                    Mensagem.Alert({
                        titulo: "Arquivo",
                        mensagem: "Arquivo enviado com sucesso.",
                        tipo: "sucesso",
                        botao: "Fechar"
                    });
                }
                else {
                    Mensagem.Alert({
                        titulo: data.titulo,
                        mensagem: data.mensagem,
                        tipo: data.tipo,
                        botao: "Fechar"
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(document).ajaxStop();
            }
        });
    }
}

function GerarPDF(data) {
    var config = {
        pageOrientation: "portrait",
        pageSize: "A4",
        pageMargins: [30, 10, 30, 0],
        title: "Conselho Tutelar"
    };

    config.Model = data;
    sedPdfExporter.normalizeConfig(config);

    config.docGenerator = function (config) {
        var contentGeral = [];
        var doc = {
            content: [
                            {
                                table: {
                                    widths: [40, 430],
                                    body: [
                                        [
                                            { width: 50, alignment: 'left', image: 'data:image/jpeg;base64,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' },
                                            { alignment: 'center', text: 'Secretaria de Estado Da Educação\nDiretoria Regional de Ensino', style: { fontSize: 16, bold: true, } },
                                        ],
                                    ]
                                },
                                layout: {
                                    hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                    vLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                }
                            },
                            {
                                text: 'INSTRUMENTAL DE ENCAMINHAMENTO AO CONSELHO TUTELAR\n(Elaborada de acordo com o Artigo 56 inciso II do Estatuto da Criança e do Adolescente)',
                                style: { alignment: 'center' }
                            },
                            {
                                text: '1. ESCOLA',
                                style: 'header',
                            },
                            {
                                lineHeight: 1.4,
                                text: [

                                        { text: 'Nome: ', style: 'textoNegrito' },
                                        { text: config.Model.NOME_ESCOLA + '\n', style: 'texto' },

                                        { text: 'Endereço: ', style: 'textoNegrito' },
                                        { text: config.Model.LogradouroEscola + '\n', style: 'texto' },

                                ]
                            },
                            {
                                margin: [-4, 0, 0, 0],
                                lineHeight: 1.4,
                                table: {
                                    widths: [62, 220, 55, 75],
                                    body: [
                                        [{ text: 'Município:', style: 'textoNegrito' },
                                         { text: config.Model.MunicipioEscola, style: 'textoTabela' },
                                         { text: 'Telefone:', style: 'textoNegrito' },
                                         { text: config.Model.TelefoneEscola, style: 'textoTabela' }]
                                    ]
                                },
                                layout: {
                                    hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                    vLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                }
                            },
                            {
                                text: [
                                        { text: 'Professor Mediador (A) / C.P: ', style: 'textoNegrito' },
                                        { text: config.Model.NomeMediador == null ? "" : config.Model.NomeMediador + '\n', style: 'texto' },
                                ]
                            },
                            {
                                text: '1. ALUNO (A)',
                                style: 'header',
                            },
                            {
                                lineHeight: 1.4,
                                text: [

                                        { text: 'Nome: ', style: 'textoNegrito' },
                                        { text: config.Model.NomeAluno + '\n', style: 'texto' },

                                        { text: 'Data de Nascimento: ', style: 'textoNegrito' },
                                        { text: config.Model.DtNascimento + '\n', style: 'texto' },

                                ]
                            },
                            {
                                margin: [-4, 0, 0, 0],
                                lineHeight: 1.4,
                                table: {
                                    widths: [50, 237, 10, 230],
                                    body: [
                                            [
                                                { text: 'Filiação:', style: 'textoNegrito' },
                                                { text: config.Model.NomePai, style: 'textoTabela' },
                                                { text: 'E', style: 'textoNegrito' },
                                                { text: config.Model.NomeMae, style: 'textoTabela' }]
                                    ]
                                },
                                layout: {
                                    hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                    vLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                }
                            },
                            {
                                text: [
                                        { text: 'Responsável: ', style: 'textoNegrito' },
                                        { text: config.Model.NomeResponsavel == null ? "" : config.Model.NomeResponsavel + '\n', style: 'texto' },
                                ]
                            },
                            {
                                margin: [-4, 8, 0, 0],
                                lineHeight: 1.4,
                                table: {
                                    widths: [58, 231, 90, 100],
                                    body: [
                                            [
                                                { text: 'Endereço:', style: 'textoNegrito' },
                                                { text: config.Model.EnderecoAluno, style: 'textoTabela' },
                                                { text: 'Complemento', style: 'textoNegrito' },
                                                { text: config.Model.EnderecoComplemento == null ? "" : config.Model.EnderecoComplemento, style: 'textoTabela' }]
                                    ]
                                },
                                layout: {
                                    hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                    vLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                }
                            },
                            {
                                margin: [-4, 0, 0, 0],
                                lineHeight: 1.4,
                                table: {
                                    widths: [40, 250, 25, 100],
                                    body: [
                                            [
                                                { text: 'Bairro:', style: 'textoNegrito' },
                                                { text: config.Model.EnderecoBairro, style: 'textoTabela' },
                                                { text: 'CEP', style: 'textoNegrito' },
                                                { text: config.Model.EnderecoCEP, style: 'textoTabela' }]
                                    ]
                                },
                                layout: {
                                    hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                    vLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                }
                            },
                            {
                                margin: [-4, 0, 0, 0],
                                table: {
                                    widths: [65, 225, 60, 80],
                                    body: [
                                            [
                                                { text: 'Município:', style: 'textoNegrito' },
                                                { text: config.Model.EnderecoCidade, style: 'textoTabela' },
                                                { text: 'Telefone', style: 'textoNegrito' },
                                                { text: config.Model.TelefoneAluno, style: 'textoTabela' }]
                                    ]
                                },
                                layout: {
                                    hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                    vLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                }
                            },
                            {
                                lineHeight: 1.4,
                                margin: [0, 5, 0, 0],
                                text: [
                                        { text: 'Ponto de Referência: ', style: 'textoNegrito' },
                                        { text: config.Model.PontoReferencia == null ? "" : config.Model.PontoReferencia + '\n', style: 'texto' },
                                ]
                            },
                            {
                                lineHeight: 1.4,
                                text: [
                                        { text: 'Nome e Telefone de outra referência: ', style: 'textoNegrito' },
                                        { text: config.Model.OutraReferencia == null ? "" : config.Model.OutraReferencia + '\n', style: 'texto' },
                                ]
                            },
                            {
                                lineHeight: 1.4,
                                text: [
                                        { text: 'Possui irmãos na mesma U.E? Se sim, enviar relatório anexo', style: 'textoNegrito' }
                                ]
                            },
                            {
                                text: '3. O ALUNO (A) NO CONTEXTO ESCOLA',
                                style: 'header',
                            },
                            {
                                text: '3.1 Na sala de Aula',
                                style: 'subheader',
                            },
                            {
                                lineHeight: 1.4,
                                text: [
                                        { text: 'Série/Turno/Turma: ', style: 'textoNegrito' },
                                        { text: config.Model.SerieTurnoTurma + '\n', style: 'texto' },
                                ]
                            },
                            {
                                margin: [-4, 0, 0, 0],
                                lineHeight: 1.4,
                                table: {
                                    widths: [50, 250, 60, 80],
                                    body: [
                                            [
                                                { text: 'Faltas:', style: 'textoNegrito' },
                                                { text: config.Model.Faltas, style: 'textoTabela' },
                                                { text: '( ) BIM', style: 'textoTabela' },
                                                { text: '( ) SEM', style: 'textoTabela' }]
                                    ]
                                },
                                layout: {
                                    hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                    vLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                }
                            },
                            {
                                lineHeight: 1.4,
                                text: [
                                        { text: 'Percentual de Faltas: ', style: 'textoNegrito' },
                                        { text: config.Model.PerncetualFaltas + '\n', style: 'texto' },
                                ]
                            },
                            {
                                lineHeight: 1.4,
                                text: [
                                        { text: 'Nome do Professor/Matéria: ', style: 'textoNegrito' },
                                        { text: config.Model.NomeProfessor == null ? "" : config.Model.NomeProfessor + '\n', style: 'texto' },
                                ]
                            },
                            {
                                lineHeight: 1.4,
                                text: [
                                        { text: 'Observações do Professor (interação do aluno com a turma, com o professor, hipóteses para as faltas): ', style: 'textoNegrito' },
                                        { text: config.Model.ObservacaoProfessor == null ? "" : config.Model.ObservacaoProfessor + '\n', style: 'texto' },
                                ]
                            },
                            {
                                pageBreak: 'before',
                                text: '3.1 Providências da Equipe Diretiva',
                                style: 'subheader',
                            },
                            {
                                lineHeight: 1.4,
                                text: [
                                        { text: 'Contato com a família (data, instrumentos utilizados, recados, telefonema, visita domiciliar, entrevista domicilar, entrevista na escola, outros - responsável pelo contato): ', style: 'textoNegrito' },
                                        { text: config.Model.ProvidenciasEquipeDiretiva == null ? "" : config.Model.ProvidenciasEquipeDiretiva + '\n', style: 'texto' },
                                ]
                            },
                            {
                                text: '4. MOTIVOS IDENTIFICADOS PARA AS FALTAS',
                                style: 'header',
                            },
                            {
                                lineHeight: 1.4,
                                text: [
                                        { text: (config.Model.Motivos.includes(1) == true ? "(X" : "( ") + ') Dificuldade Aprendizagem\n', style: 'texto' },
                                        { text: (config.Model.Motivos.includes(2) == true ? "(X" : "( ") + ') Está trabalhando\n', style: 'texto' },
                                        { text: (config.Model.Motivos.includes(3) == true ? "(X" : "( ") + ') Envolvimento com Drogas\n', style: 'texto' },
                                        { text: (config.Model.Motivos.includes(4) == true ? "(X" : "( ") + ') Falta de transporte\n', style: 'texto' },
                                        { text: (config.Model.Motivos.includes(5) == true ? "(X" : "( ") + ') Resistência do aluno\n', style: 'texto' },
                                        { text: (config.Model.Motivos.includes(6) == true ? "(X" : "( ") + ') Doença\n', style: 'texto' },
                                        { text: (config.Model.Motivos.includes(7) == true ? "(X" : "( ") + ') Problema de relacionamento escolar\n', style: 'texto' },
                                        { text: (config.Model.Motivos.includes(8) == true ? "(X" : "( ") + ') Distorção idade/série\n', style: 'texto' },
                                        { text: (config.Model.Motivos.includes(9) == true ? "(X" : "( ") + ') Carência material\n', style: 'texto' },

                                        { text: 'Outros: ', style: 'textoNegrito' },
                                        { text: config.Model.MotivoOutros == null ? "" : config.Model.MotivoOutros + '\n', style: 'texto' },
                                ]

                            },
                            {
                                text: '5. PROCEDIMENTOS DA ESCOLA FRENTE AOS MOTIVOS IDENTIFICADOS',
                                style: 'header',
                            },
                            {
                                text: [
                                 { text: '(entrevista com os familiares, encaminhamentos para a rede de atendimento, plano de recuperação de frequência e aproveitamento, dentro outros )' },
                                 { text: config.Model.ProcedimentoEscola == null ? "" : config.Model.ProcedimentoEscola + '\n', style: 'texto' },
                                ]
                            },
                            {
                                margin: [0, 10, 0, 5],
                                text: '6. Relação dos documentos que foram enviados aos responsáveis ( ANEXAS CÓPIAS )',
                                style: { fontSize: 16, bold: true, alignment: 'left' },
                            },
                            {
                                margin: [0, 10, 0, 0],
                                text: '7. Outras providências tomadas pela Unidade Escolar ( ANEXAR CÓPIAS )',
                                style: { fontSize: 16, bold: true, alignment: 'left' },
                            },
                            {
                                margin: [0, 10, 0, 0],
                                text: '8. Documentos assinados pelos pais ou responsáveis de comparecimento da Unidade Escolar ( ANEXAR COPIAS )',
                                style: { fontSize: 16, bold: true, alignment: 'left' },
                            },
                            {
                                margin: [-4, 15, 0, 0],
                                table: {
                                    widths: [150, 150, 150],
                                    body: [
                                            [
                                                { text: 'Resultados Obtidos:', style: 'textoNegrito' },
                                                { text: (config.Model.Resultado == 1 ? "(X" : "( ") + ') Satisfatórios', style: 'textoNegrito' },
                                                { text: (config.Model.Resultado == 0 ? "(X" : "( ") + ') NÃO Satisfatórios', style: 'textoNegrito' },
                                            ]
                                    ]
                                },
                                layout: {
                                    hLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                    vLineWidth: function (i, node) { return (i === 1 || i === 3) ? 0 : 0; },
                                }
                            },
                            {
                                text: '\nSe NÃO satisfatórios encaminhar ao Conselho Tutelar.',
                                style: 'subheader',
                            },
                            {
                                lineHeight: 1.4,
                                text: [
                                        { text: 'Ofício: ', style: 'textoNegrito' },
                                        { text: config.Model.Oficio + '\n', style: 'texto' },
                                ]
                            },
                            {
                                lineHeight: 1.4,
                                text: [
                                        { text: 'Data de Encaminhamento ao Conselho Tutelar: ', style: 'textoNegrito' },
                                        { text: config.Model.DataFinalizacao + '\n', style: 'texto' },
                                ]
                            },
                            {
                                lineHeight: 1.4,
                                style: { alignment: 'right' },
                                text: [
                                        { text: '_________________________________\n ', style: 'textoNegrito' },
                                        { text: 'Assinatura e carimbo do Diretor', style: 'texto' },
                                ]
                            },

            ],
            styles: {
                header: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'left',
                    margin: [0, 20, 0, 15],
                },
                subheader: {
                    fontSize: 14,
                    margin: [0, 0, 0, 15],
                    bold: true
                },
                superMargin: {
                    margin: [20, 0, 40, 0],
                    fontSize: 15,
                },
                textoNegrito: {
                    fontSize: 13,
                    bold: true,
                    margin: [0, 0, 0, 0]
                },
                texto: {
                    fontSize: 13
                },
                textoTabela: {
                    fontSize: 13,
                    margin: [-5, 0, 0, 0]
                }

            }
        }

        return doc;
    };

    sedPdfExporter.exportPdf(config);
}