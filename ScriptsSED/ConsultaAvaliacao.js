//===================ANO LETIVO======================
var anoLetivoAnterior;
var linkButton;
var VerificarMudancaAnoLetivo = function (AnoLetivoForm, Diretoria, Escola, TipoEnsino, Turma, Disciplina) {
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
            titulo: "Aten&ccedil;&atilde;o!",
            mensagem: "Ao alterar o valor do ano letivo, todos os dados informados no formul&aacuterio ser&atilde;o perdidos. Deseja continuar?",
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
                    botao: "N&atilde;o",
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
//======================================================


//Administrador/Diretoria/Escola/Professor
function CarregarAtividades() {

    var codigoDisciplina = $("#CodigoDisciplina").val();
    var codigoTurma = $("#CodigoTurma").val();
    var codigoSubTurma = $("#CodigoSubTurma").val();
    var codigoTipoEnsino = $("#CodigoTipoEnsino").val();
    var codigoEscola = $("#CodigoEscola").val();
    var anoletivo = $("#AnoLetivo").val();

    if (codigoDisciplina.length > 0)
        ListaAtividadesContainer(codigoDisciplina, codigoTurma, codigoSubTurma, codigoEscola, undefined, undefined, anoletivo, codigoTipoEnsino);
}

function ListaAtividadesContainer(codigoDisciplina, codigoTurma, codigoSubTurma, codigoEscola, acessoProfessor, elem, anoletivo, codigoTipoEnsino) {
    if (acessoProfessor) {
        anoletivo = $("#ddlAnoLetivo").val();
    }

    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoDisciplina: codigoDisciplina,
            codigoTurma: codigoTurma,
            codigoSubTurma: codigoSubTurma,
            codigoEscola: codigoEscola,
            anoletivo: parseInt(anoletivo),
            codigoTipoEnsino:codigoTipoEnsino
        }),
        url: '/ConsultaAvaliacao/ListaAtividadesContainer',
        success: function (data, textStatus, jqXHR) {
            $('#SelecaoTurma').hide();
            $('#divAnoLetivo').hide();
            $('#Atividades').empty().html(data);
            $('#Atividades').show();
            $('#btnVoltar').css("visibility", "visible");

            // Se for acesso professor, obtém da tabela. Senão, dos dropdowns de filtro
            if (acessoProfessor != undefined && acessoProfessor) {
                var container = elem.parents('tr');
                $('.txtEscola').text(container.find('.selNomeEscola').text());
                $('.txtTipoEnsino').text(container.find('.selTipoEnsino').text());
                $('.txtTurma').text(container.find('.selNomeTurma').text());
                $('.txtSubTurma').text(container.find('.selNomeSubTurma').text());
                $('.txtDisciplina').text(container.find('.selNomeDisciplina').text());
            } else {
                $('.txtEscola').text($('#CodigoEscola option:selected').text());
                $('.txtTipoEnsino').text($('#CodigoTipoEnsino option:selected').text());
                $('.txtTurma').text($('#CodigoTurma option:selected').text());
                $('.txtSubTurma').text($('#CodigoSubTurma option:selected').text());
                $('.txtDisciplina').text($('#CodigoDisciplina option:selected').text());
            }

        },
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
    });
}

function CarregarTurmasProfessor() {
    var anoLetivo = parseInt($('#ddlAnoLetivo').val());

    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            anoLetivo: anoLetivo
        }),
        url: '/ConsultaAvaliacao/TurmasProfessor',
        success: function (data, textStatus, jqXHR) {
            $('#divTurmasProfessor').empty().html(data);
            $('#tabelaDados').sedDataTable();
        },
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
    });
}

function VoltarTurmas() {
    $('select').prop('disabled', '');
    $('#SelecaoTurma').show();
    $('#divAnoLetivo').show();
    $('#Atividades').hide();
    $('#btnVoltar').css("visibility", "hidden");
}

function CarregarLista(codigoDisciplina, codigoTurma, codigoSubTurma, codigoEscola, anoletivo) {
    var codigoTipoEvento = $('#ddlBimestre').val();

    ListarAtividadesBoletim(codigoDisciplina, codigoTurma, codigoSubTurma, codigoTipoEvento, codigoEscola, anoletivo);
}

function ListarAtividadesBoletim(codigoDisciplina, codigoTurma, codigoSubTurma, codigoTipoEvento, codigoEscola, anoletivo) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoDisciplina: codigoDisciplina,
            codigoTurma: codigoTurma,
            codigoSubTurma: codigoSubTurma,
            codigoTipoEventoBimestre: codigoTipoEvento,
            codigoEscola: codigoEscola,
            anoletivo: anoletivo
        }),
        url: '/ConsultaAvaliacao/ListaAtividades',
        success: function (data, textStatus, jqXHR) {

            $('#ListaAtividades').empty().html(data);
            $('#ListaAtividades').find('.fg-toolbar').each(function () { $(this).hide(); });

            $('#serieTabs').tabs();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.Alert({
                titulo: "Erro",
                mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                tipo: "Erro",
                botao: "Fechar"
            });
        }
    });
}


function ConsultaGraficoAluno(codigoAluno, codigoAtividade, possuiNota) {
    if (possuiNota) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: ({
                codigoAluno: codigoAluno,
                codigoAtividade: codigoAtividade
            }),
            url: '/ConsultaAvaliacao/ConsultaGraficoAluno',
            success: function (data, textStatus, jqXHR) {
                $("#grafico").empty().html(data);

                DesenharGrafico();

                $("#grafico").dialog({
                    height: 670,
                    width: 830,
                    draggable: false,
                    modal: true,
                    resizable: false,
                    show: {
                        effect: "blind",
                        duration: 1000
                    },
                    position: "top"
                });
            },
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
        });
    }
}

var chart;
var data;
var options;

function DesenharGrafico() {
    var nomeAtividade = $('#hdnNomeAtividade').val();
    var nota = parseInt($('#hdnNota').val());
    var mediaTurma = parseInt($('#hdnMediaTurma').val());;
    var corNota;
    var corMedia;

    if (nota >= mediaTurma) {
        corNota = 'green';
        corMedia = 'blue';
    }
    else if (nota < mediaTurma) {
        corNota = 'red';
        corMedia = 'blue';
    }

    data = google.visualization.arrayToDataTable([
      ['Atividade', 'Sua Nota', 'Media da Sala'],
      [nomeAtividade, nota, mediaTurma]
    ]);

    options = {
        hAxis: { title: 'Atividade', titleTextStyle: { color: 'red' } },
        colors: [corNota, corMedia],
        "pointSize": 5,
        animation: { duration: 1000, easing: 'out' },
        chartArea: { left: 150, top: 0, width: "60%", height: "80%" },
        height: 300,
        width: 750
    };

    // Create and draw the visualization.
    //if (!chart) {
    chart = new google.visualization.BarChart(document.getElementById('divGrafico'));
    //}
    chart.draw(data, options);

    //var chart = new google.visualization.ColumnChart(document.getElementById('divGrafico'));
    //chart.draw(data, options);
}

// Responsavel/Aluno
function CarregarTurmasAluno() {
    var anoLetivo = parseInt($('#ddlAnoLetivo').val());

    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            anoLetivo: anoLetivo
        }),
        url: '/ConsultaAvaliacao/TurmasAluno',
        success: function (data, textStatus, jqXHR) {
            $('#turmasAluno').empty().html(data);
            $('#tabelaDados').sedDataTable({
                nomeExportacao: "Avaliações do Aluno",
                columnDefs: [
                         { targets: [3, 4], orderable: false },
                ]
            });
        },
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
    });
}

function GerarBoletim(codigoAluno, codigoTurma) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoAluno: codigoAluno,
            codigoTurma: codigoTurma,
            codigoEscola: 0,
            anoLetivo: parseInt($('#ddlAnoLetivo').val())
        }),
        url: '/ConsultaAvaliacao/Boletim',
        success: function (data, textStatus, jqXHR) {
            $('#SelecaoTurma').hide();
            $('#Boletim').html(data);
            $('#Boletim').show();
            $('#tabelaAvaliacao').sedDataTable({ nomeExportacao: "Lista de Avaliações", embutida: true });

            $('#divAnoLetivo').hide();
        },
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
    });
}

function ConsultarAvaliacaoAluno(codigoAluno, codigoTurma) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoAluno: codigoAluno,
            codigoTurma: codigoTurma,
            dtAvaliacao: parseInt($('#ddlAnoLetivo').val()),
            codigoDisciplina: $('#CodigoDisciplina').val(),
            bimestre: $('#bimestre').val()
        }),
        url: '/ConsultaAvaliacao/ConsultarDadosAvaliacaoAluno',
        success: function (data, textStatus, jqXHR) {
            $('#SelecaoTurma').hide();
            $('#ConsultarDadosAvaliacaoAluno').html(data);
            $('#ConsultarDadosAvaliacaoAluno').show();
            $('#divAnoLetivo').hide();

        },
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
    });
}


function VoltarTurmasResponsavel() {
    $('#SelecaoTurma').show();
    $('#Boletim').hide();
    $('#ConsultarDadosAvaliacaoAluno').hide();
    $('#btnVoltar').css("visibility", "hidden");
    $('#divAnoLetivo').show();
}

function ListarAtividades(codigoEscola, codigoTipoEnsino, codigoTipoEvento, codigoTurma, codigoDisciplina, codigoAluno) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoEscola: codigoEscola,
            codigoTipoEnsino: codigoTipoEnsino,
            codigoTipoEvento: codigoTipoEvento,
            codigoTurma: codigoTurma,
            codigoDisciplina: codigoDisciplina,
            codigoAluno: codigoAluno
        }),
        url: '/ConsultaAvaliacao/ListaNotas',
        success: function (data, textStatus, jqXHR) {
            $("#divListaAtividadeNota").html(data);

            $("#table").sedDataTable();

            $('#divListaAtividadeNota').dialog({
                title: "Resumo",
                height: 770,
                width: 850,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top"
            });

            $('.abrir_grafico').click(function () {
                var nomeAtividade = $(this).attr('atividade');
                var nota = parseInt($(this).attr('nota'));
                var mediaTurma = parseInt($(this).attr('media'));
                var corNota;
                var corMedia;

                if (nota >= mediaTurma) {
                    corNota = 'green';
                    corMedia = 'blue';
                }
                else if (nota < mediaTurma) {
                    corNota = 'red';
                    corMedia = 'blue';
                }

                var data = google.visualization.arrayToDataTable([
                  ['Atividade', 'Sua Nota', 'M\u00e9dia da Sala'],
                  [nomeAtividade, nota, mediaTurma]
                ]);

                var options = {
                    hAxis: { title: 'Atividade', titleTextStyle: { color: 'red' } },
                    colors: [corNota, corMedia],
                    chartArea: { left: 0, top: 10, width: "77%", height: "80%" },
                    height: 220,
                    width: 440
                };

                var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
                chart.draw(data, options);

                $('#dialog').dialog({
                    modal: true,
                    height: 280,
                    width: 475,
                    resizable: false,
                    title: 'Gr\u00e1fico'
                });
            });
        },
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
    });
}

function ZeraTurma() {
    $('#CodigoTurma option').each(function () {
        if ($(this).val() != '') {
            $(this).remove();
        }
    });

    $("#CodigoTipoEnsino option[value='']").attr("selected", "selected");

    $("#CodigoDisciplina option[value='']").attr("selected", "selected")
}



