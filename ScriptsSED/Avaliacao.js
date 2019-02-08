//===================ANO LETIVO======================
var calendarEventsInicio;
var calendarEventsFim;
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
};
//======================================================


$(document).ready(function () {
    calendarEventsInicio = null;
    calendarEventsFim = null;
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'AnoLetivo' }]);

    //Alterado em 11/06/2015 por Adilson, conforme item 471 do backlog (Lançamento de avaliação (AJUSTAR)) - CodigoTipoEnsino adicionado
    $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', ['CodigoEscola', 'CodigoTipoEnsino', 'AnoLetivo'], undefined);

    $('#CodigoTurma').autoPreencher($('#CodigoDisciplina'), 'Disciplina', 'ListaDisciplinasComParametrizacaoeQuebraAvaliacao', ['CodigoTurma', 'CodigoTipoEnsino', 'AnoLetivo'], undefined);
    $('#CodigoTurma').change(function () {
        var select = $("#CodigoSubTurma");
        select.empty();
        select.append(new Option("Selecione...", "0", true, true));

        var turma = $(this).val();
        if (turma > 0) {
            $.getJSON('/AtribuicaoAula/SubTurmas', { turma: turma }, function (myData) {
                $.each(myData, function (index, itemData) {
                    select.append($('<option/>', {
                        value: itemData.Value,
                        text: itemData.Text
                    }));
                });
            });
        }
    });

    $('#formPesquisar').validate({
        rules: {
            AnoLetivo: { required: true },
            CodigoDiretoria: { required: true },
            CodigoEscola: { required: true },
            CodigoTipoEnsino: { required: true },
            CodigoTurma: { required: true },
            CodigoDisciplina: { required: true }
        },
        messages: {
            AnoLetivo: { required: 'Obrigatório' },
            CodigoDiretoria: { required: 'Obrigatório' },
            CodigoEscola: { required: "Obrigatório" },
            CodigoTipoEnsino: { required: "Obrigatório" },
            CodigoTurma: { required: "Obrigatório" },
            CodigoDisciplina: { required: "Obrigatório" }
        }
    });

    $('#btnPesquisar').click(function (ev) {
        ev.preventDefault();
        if ($('#formPesquisar').valid()) {
            CarregarAtividades();
        }
    });
});

function CarregarTurmasProfessor() {
    var anoLetivo = parseInt($('#AnoLetivo').val());

    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            anoLetivo: anoLetivo
        }),
        url: '/Avaliacao/TurmasProfessor',
        success: function (data, textStatus, jqXHR) {
            $('#divTurmasProfessor').empty().html(data);
            $('#tabelaDados').sedDataTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

function ListaAtividadesContainer(codigoDisciplina, codigoTurma, codigoSubTurma, codigoEscola, acessoProfessor, elem, anoLetivo, codigoTipoEnsino) {
    if (acessoProfessor) {
        anoLetivo = $("#ddlAnoLetivo").val();
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
            anoletivo: parseInt(anoLetivo),
            codigoTipoEnsino: codigoTipoEnsino
        }),
        url: '/Avaliacao/ListaAtividadesContainer',
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

function ListarAtividadesBoletim(codigoDisciplina, codigoTurma, codigoSubTurma, codigoTipoEventoBimestre, codigoEscola, anoletivo, codigoTipoEnsino) {
    if (codigoTipoEventoBimestre > 0) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: ({
                codigoDisciplina: parseInt(codigoDisciplina),
                codigoTurma: parseInt(codigoTurma),
                codigoSubTurma: parseInt(codigoSubTurma),
                codigoTipoEventoBimestre: parseInt(codigoTipoEventoBimestre),
                codigoEscola: parseInt(codigoEscola),
                anoletivo: parseInt(anoletivo),
                codigoTipoEnsino:parseInt(codigoTipoEnsino)
            }),
            url: '/Avaliacao/ListaAtividades',
            success: function (data) {

                $('#ListaAtividades').empty().html(data);
                $('#ListaAtividades').find('.fg-toolbar').each(function () { $(this).hide(); });
                $('#serieTabs').tabs();

                var desabilitar = $('#hdnDesabilitar').val();

                if (desabilitar == 1) {
                    $('select').prop("disabled", "disabled");
                    $('#btnSalvar').hide();
                    $('.calendario').hide();
                    $('#ddlBimestre').prop("disabled", "");
                }
                else {
                    $('select').prop("disabled", "");
                    $('#btnSalvar').show();
                    $('.calendario').show();
                }

                var count = parseInt($('#hdnCountAtividade').val());

                $('.tblNotasAtividade').each(function () {

                    for (var i = 0; i < count; i++) {

                        var codigoAtividade = $(this).find('.' + i).val();
                        var obj = $('#id' + codigoAtividade);

                        $(this).find('label.' + codigoAtividade).autoPreencher($(this).find('.ddl' + codigoAtividade), 'Avaliacao', 'CarregarMencao', ["txtDataAvaliacaoRealizadaInicio", "txtDataAvaliacaoRealizadaFim"], null, obj);

                        $(this).find('label.' + codigoAtividade).trigger('change');

                        var dataInicio = obj.find('.txtDataAvaliacaoRealizadaInicio').val();

                        if (dataInicio.length > 0) {
                            $(this).find('.alunos').each(function () {
                                var dataFimMat = $(this).attr("dataFimMatricula");

                                var dataFimMatricula = dataFimMat.substring(6, 10) + "-" + dataFimMat.substring(3, 5) + "-" + dataFimMat.substring(0, 2);
                                var dataInicioAtividade = dataInicio.substring(6, 10) + "-" + dataInicio.substring(3, 5) + "-" + dataInicio.substring(0, 2);

                                if (dataFimMatricula.length > 0 && dataFimMatricula < dataInicioAtividade) {
                                    $(this).find("td." + codigoAtividade).find(".ddlMencao").hide();
                                    $(this).find("td." + codigoAtividade).append('<span>Matrícula Encerrada</span>');
                                }
                            });
                        }
                        else {
                            $(this).find('.alunos').each(function () {
                                $(this).find("td." + codigoAtividade).find(".ddlMencao").prop("disabled", "disabled");
                            });
                        }
                    }
                });

                $('.excluirAvaliacao').click(function () {
                    var CodigoAtividade = $(this).attr('codigoAtividade');
                    var NomeAtividade = $(this).attr('nomeAtividade');

                    Mensagem.Alert({
                        titulo: "Atenção!",
                        mensagem: 'Deseja apagar todos os lançamentos de menção para a atividade <br />"' + NomeAtividade + '"?',
                        tipo: "aviso",
                        botoes: [
                            {
                                botao: "Sim",
                                callback: function () {
                                    var DataAula = $("input[name='frequencias.DataDaAula']").val();

                                    $.ajax({
                                        cache: false,
                                        url: "/Avaliacao/ExcluirAvaliacao",
                                        type: 'POST',
                                        datatype: 'JSON',
                                        data: {
                                            codigoAtividade: CodigoAtividade,
                                            codigoTurma: codigoTurma,
                                            codigoSubturma: codigoSubTurma
                                        },
                                        success: function (data) {
                                            if (data.sucesso == true) {
                                                ListarAtividadesBoletim(codigoDisciplina, codigoTurma, codigoSubTurma, codigoTipoEventoBimestre, codigoEscola, anoletivo);
                                            }
                                        },
                                        error: function () {
                                            $.ajaxStop();
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
                    });
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(errorThrown);
                alert(textStatus);
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

function CarregarLista(codigoDisciplina, codigoTurma, codigoSubTurma, codigoEscola, anoletivo, codigoTipoEnsino) {

    var codigoTipoEvento = $('#ddlBimestre').val();

    ListarAtividadesBoletim(codigoDisciplina, codigoTurma, codigoSubTurma, codigoTipoEvento, codigoEscola, anoletivo, codigoTipoEnsino);
}

function CarregarAtividades() {
    var codigoDisciplina = $("#CodigoDisciplina").val();
    var codigoTurma = $("#CodigoTurma").val();
    var codigoSubTurma = $("#CodigoSubTurma").val();
    var codigoEscola = $("#CodigoEscola").val();
    var anoletivo = $("#AnoLetivo").val();
    var codigoTipoEnsino = $('#CodigoTipoEnsino').val();

    if (codigoDisciplina.length > 0)
        ListaAtividadesContainer(codigoDisciplina, codigoTurma, codigoSubTurma, codigoEscola, undefined, undefined, anoletivo, codigoTipoEnsino);
}

function AbrirDataRealizada(codigoAtividade, elem) {
    $('#hdnCodigoAtividade').val(codigoAtividade);

    $('.divRealizacao').find("#txtDialogInicioRealizada").mask('99/99/9999');
    $('.divRealizacao').find("#txtDialogFimRealizada").mask('99/99/9999');

    var hoje = new Date();
    var month = hoje.getMonth() + 1;
    var year = hoje.getFullYear();

    $("#txtDialogInicioRealizada").datepicker({
        maxDate: hoje,
        altField: "#txtDialogFimRealizada",
        onSelect: function (selected) {
            $('.divRealizacao').find("#txtDialogFimRealizada").datepicker("destroy");

            $("#txtDialogFimRealizada").datepicker({
                minDate: selected,
                maxDate: hoje,
                onChangeMonthYear: function (year, month, inst) {
                    VerificarDiasLetivosFim(codigoAtividade, year, month);
                },
                beforeShowDay: function (date) {
                    var day = date.getDate();

                    if (calendarEventsFim == null || calendarEventsFim == undefined) {
                        return [false];
                    }

                    for (var i = 0; i < calendarEventsFim.length; i++) {
                        if (calendarEventsFim[i].Dia == day) {
                            return [true];
                        }
                    }

                    return [false];
                }
            });

            var dataSelecionada = selected.split('/');

            VerificarDiasLetivosFim(codigoAtividade, dataSelecionada[2], dataSelecionada[1]);
        },
        onChangeMonthYear: function (year, month, inst) {
            VerificarDiasLetivosInicio(codigoAtividade, year, month);
        },
        beforeShowDay: function (date) {
            var day = date.getDate();

            if (calendarEventsInicio == null || calendarEventsInicio == undefined) {
                return [false];
            }

            for (var i = 0; i < calendarEventsInicio.length; i++) {
                if (calendarEventsInicio[i].Dia == day) {
                    return [true];
                }
            }

            return [false];
        }
    });

    VerificarDiasLetivosInicio(codigoAtividade, year, month);

    $('.divRealizacao').dialog({
        //title: "Realização da Avaliação",
        //height: 200,
        width: 600,
        draggable: false,
        modal: true,
        resizable: false,
        show: {
            //effect: "blind",
            //duration: 1000
        },
        position: "top",
        closeOnEscape: false,
        open: function () {
            $(".ui-dialog-titlebar-close").hide();
        }
    });
}

var VerificarDiasLetivosInicio = function (CodigoAtividade, AnoLetivo, Mes) {
    calendarEventsInicio = null;

    $.ajax({
        url: '/Avaliacao/RecuperarDiasLetivos',
        type: 'POST',
        dataType: 'JSON',
        data: {
            codigoAtividade: CodigoAtividade,
            anoLetivo: AnoLetivo,
            mes: Mes
        },
        success: function (data, textStatus, jqXHR) {
            calendarEventsInicio = data;
            $("#txtDialogInicioRealizada").datepicker("refresh");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop();
        }
    });
}

var VerificarDiasLetivosFim = function (CodigoAtividade, AnoLetivo, Mes) {
    calendarEventsFim = null;

    $.ajax({
        url: '/Avaliacao/RecuperarDiasLetivos',
        type: 'POST',
        dataType: 'JSON',
        data: {
            codigoAtividade: CodigoAtividade,
            anoLetivo: AnoLetivo,
            mes: Mes
        },
        success: function (data, textStatus, jqXHR) {
            calendarEventsFim = data;
            $("#txtDialogFimRealizada").datepicker("refresh");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop();
        }
    });
}

function CancelarRealizacao() {
    $('.divRealizacao').find("#txtDialogInicioRealizada").val("");
    $('.divRealizacao').find("#txtDialogFimRealizada").val("");

    $('.divRealizacao').find("#txtDialogInicioRealizada").datepicker("destroy");
    $('.divRealizacao').find("#txtDialogFimRealizada").datepicker("destroy");

    $('.divRealizacao').dialog('close');
}

function ConfirmaRealizacao() {
    var codigoAtividade = $('#hdnCodigoAtividade').val();

    var dataInicio = $(".divRealizacao").find("#txtDialogInicioRealizada").val();
    var dataFim = $(".divRealizacao").find("#txtDialogFimRealizada").val();

    regex = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;

    if ((dataInicio != "" && dataFim != "") &&
        (dataInicio.match(regex) && dataFim.match(regex))) {
        $("#id" + codigoAtividade).find(".txtDataAvaliacaoRealizadaInicio").val(dataInicio);
        $("#id" + codigoAtividade).find(".txtDataAvaliacaoRealizadaFim").val(dataFim);

        $('label.' + codigoAtividade).change(function () {
            $('.alunos').each(function () {
                var dataFimMat = $(this).attr("dataFimMatricula");

                var dataFimMatricula = dataFimMat.substring(6, 10) + "-" + dataFimMat.substring(3, 5) + "-" + dataFimMat.substring(0, 2);
                var dataInicioAtividade = dataInicio.substring(6, 10) + "-" + dataInicio.substring(3, 5) + "-" + dataInicio.substring(0, 2);
                var dataFimAtividade = dataFim.substring(6, 10) + "-" + dataFim.substring(3, 5) + "-" + dataFim.substring(0, 2);

                $(this).find("td." + codigoAtividade).find("span").remove();

                if (dataFimMatricula.length > 0 && dataFimMatricula < dataInicioAtividade) {
                    $(this).find("td." + codigoAtividade).find(".ddlMencao").hide();
                    $(this).find("td." + codigoAtividade).append('<span>Matrícula Encerrada</span>');
                } else {
                    var ddl = $(this).find("td." + codigoAtividade).find(".ddlMencao");
                    ddl.not('.comDispensa').show().prop("disabled", "");

                    if (ddl.hasClass('comDispensa')) {
                        //Todo: não desbloquear os ddls que possuem dispensa no período (período da dispensa maior que o período da realização da atividade)
                        var dispensaIni = ddl.data('dispensa_inicio').substring(6, 10) + '-' + ddl.data('dispensa_inicio').substring(3, 5) + '-' + ddl.data('dispensa_inicio').substring(0, 2);
                        var dispensaFim = ddl.data('dispensa_fim').substring(6, 10) + '-' + ddl.data('dispensa_fim').substring(3, 5) + '-' + ddl.data('dispensa_fim').substring(0, 2);
                        //console.log('dispensaIni: ' + dispensaIni + ' dispensaFim:' + dispensaFim);
                        //console.log('dataInicioAtividade: ' + dataInicioAtividade + ' dataFimAtividade: ' + dataFimAtividade);
                        //console.log('dispensaIni <= dataInicioAtividade: ' + (dispensaIni <= dataInicioAtividade) + '    dispensaFim >= dataFimAtividade: ' + (dispensaFim >= dataFimAtividade));
                        if (dispensaIni <= dataInicioAtividade && dispensaFim >= dataFimAtividade) {
                            //console.log('período de dispensa maior que o período da atividade');
                            //ddl.prop("disabled", true).after('<a class="selMotivoFalta"><i class="icone-tabela-mensagem" title="Dispensa: ' + tipoDispensa + '"></i></a>');
                            $(this).find("td." + codigoAtividade).find(".ddlMencao").hide();
                            //$(this).find("td." + codigoAtividade).append('<span>Dispensa: ' + ddl.data('dispensa_tipo') + '</span>');
                            $(this).find("td." + codigoAtividade).append('<span>Dispensa: ' + ddl.data('dispensa_tipo') + '</span>');

                        } else {
                            $(this).find("td." + codigoAtividade).find(".ddlMencao").show();
                            $(this).find("td." + codigoAtividade).find("span").remove();
                            ddl.show().prop("disabled", "");
                        }
                    }
                }

            });
        });

        $('label.' + codigoAtividade).html("De " + dataInicio + " até " + dataFim);
        $('label.' + codigoAtividade).trigger('change');

        $('.divRealizacao').dialog('close');
    }
    else {
        CancelarRealizacao();
    }
}

function SetarFlag(obj) {
    var flag = $(obj).attr("flag");

    if (flag.length == 0) {
        flag = 0;
    }

    flag = parseInt(flag);

    flag = flag + 1;

    $(obj).attr("flag", flag);
}

function Salvar() {
    var listaAvaliacaoAluno = [];
    $(".tblNotasAtividade tbody tr td").each(function () {
        var codAtividade = $(this).find(".ddlMencao").attr("codAtividade");

        if (codAtividade != undefined) {
            var dataInicio = $("#id" + codAtividade).find(".txtDataAvaliacaoRealizadaInicio").val();
            var dataFim = $("#id" + codAtividade).find(".txtDataAvaliacaoRealizadaFim").val();

            if ((dataInicio.length > 0 && dataInicio != undefined) && $(this).find(".ddlMencao").val() > 0) {
                listaAvaliacaoAluno.push({
                    cdAvaliacaoAluno: $(this).find(".ddlMencao").attr("codAvaliacao"),
                    cdMatriculaAluno: $(this).find(".ddlMencao").attr("codMatricula"),
                    cdAtividade: $(this).find(".ddlMencao").attr("codAtividade"),
                    cdMencao: $(this).find(".ddlMencao").val(),
                    cdEvento: $(this).find(".ddlMencao").attr("codEvento"),
                    flag: $(this).find(".ddlMencao").attr("flag"),
                    dataInicio: dataInicio,
                    dataFim: dataFim
                });
            }
        }
    });

    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            listaAvaliacaoAlunoJson: JSON.stringify(listaAvaliacaoAluno)
        }),
        url: '/Avaliacao/SalvarLancamento',
        success: function (data, textStatus, jqXHR) {
            $('#ddlBimestre').trigger('change');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar",
                });
            });
        },
    });
}

function VoltarTurmas() {
    $('select').prop('disabled', '');
    $('#SelecaoTurma').show();
    $('#divAnoLetivo').show();
    $('#Atividades').hide();
    $('#btnVoltar').css("visibility", "hidden");
}

function DataTable(tabela) {

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