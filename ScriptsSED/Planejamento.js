//===================ANO LETIVO======================
var anoLetivoAnterior;
var mandeiFechar;
var VerificarMudancaAnoLetivo = function (AnoLetivoForm, Diretoria, Escola, TipoEnsino, Turma, Disciplina, Professor) {
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
                        Professor.empty();
                        Professor.html(conteudoLimpo);
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


/* ==================================================================================================================
=============================================   DOCUMENT READY ======================================================
================================================================================================================== */
$().ready(function () {
    //Atribui preenchimento automático aos combos
    PreenchimentoAutomaticoCombos();

    // Adiciona a funcionalidade do botão "Pesquisar" do filtro.
    $('#btnPesquisarPlanejamento').click(function (e) {
        e.preventDefault();
        if ($(".form").valid()) {
            ConsultarPlanejamento();
        }
    });

    // Adiciona a funcionalidade do botão "Pesquisar" do filtro.
    $('#btnPesquisar').click(function (e) {
        e.preventDefault();
        if ($(".form").valid()) {
            CarregarTurmasProfessorAnoLetivo();
        }
    });

    // Adiciona a funcionalidade do botão "Pesquisar" do filtro.
    $('#btnPesquisarTurmasProf').click(function (e) {
        e.preventDefault();
        if ($(".form").valid()) {
            CarregarTurmasProfessor();
        }
    });

    // Atribui a div a função de modal.
    $("#dialogDetalhe").dialog({
        autoOpen: false,
        //title: 'Planejamento de Aula',
        position: 'top',
        //height: 700,
        width: 835,
        resizable: false,
        modal: true,
        dragable: false,
        show: {
            effect: "blind",
            duration: 200,
        },
        beforeClose: function (event, ui) {
            $('#DataAula').datepicker('hide');

            if (mandeiFechar) {
                $('#DataAula').datepicker('hide');
                CarregarCalendario($('#hdfTurma').val(), $('#hdfDisciplina').val(), $('#hdfAnoAtual').val(), $('#hdfMesAtual').val());
                return true;
            }

            Mensagem.Alert({
                titulo: "Atenção!",
                mensagem: "Os dados inseridos não foram salvos. Deseja continuar?<br />Obs.: Para salvar os dados, clique no botão “Alterar” localizado no final da página!",
                tipo: "aviso",
                botoes: [
                    {
                        botao: "Sim",
                        callback: function () {
                            mandeiFechar = true;
                            $('#dialogDetalhe').dialog('close');
                            $.unblockUI();
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

            return false;
        }
    });
});

/* ==================================================================================================================
===============================================   FUNÇÕES   =========================================================
================================================================================================================== */

// Função genérica para tratar valores numéricos.
var TratarValorNumerico = function (valor) {
    if (valor == undefined) {
        return 0;
    }

    if (valor == '') {
        return 0;
    }

    if (isNaN(valor)) {
        return 0;
    }

    return parseInt(valor);
}

//Atribui preenchimento automático aos combos
var PreenchimentoAutomaticoCombos = function () {
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'txtAnoLetivo' }]);
    $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "CodigoEscola", CodigoTipoEnsino: "CodigoTipoEnsino", AnoLetivo: 'txtAnoLetivo' }]);
    $('#CodigoTurma').autoPreencher($('#CodigoDisciplina'), 'Disciplina', 'CarregarListaDisciplinas');
}

// Pesquisar Planejamentos
var ConsultarPlanejamento = function () {
    if (TratarValorNumerico($('#txtAnoLetivo').val()) <= 0 || TratarValorNumerico($('#CodigoDiretoria').val()) <= 0 || TratarValorNumerico($('#CodigoEscola').val()) <= 0 || TratarValorNumerico($('#CodigoTipoEnsino').val()) <= 0) {
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: "Preencha o filtro mínimo.",
            tipo: "Aviso",
            botao: "Fechar"
        });

        return;
    }

    AbrirMensagemCarregandoPagina();

    $.ajax({
        cache: false,
        // async: false,
        url: '/Planejamento/ConsultaPlanejamentoParcial',
        type: 'POST',
        datatype: 'html',
        data: {
            codigoDiretoria: TratarValorNumerico($('#CodigoDiretoria').val()),
            codigoEscola: TratarValorNumerico($('#CodigoEscola').val()),
            codigoTipoEnsino: TratarValorNumerico($('#CodigoTipoEnsino').val()),
            codigoTurma: TratarValorNumerico($('#CodigoTurma').val()),
            codigoDisciplina: TratarValorNumerico($('#CodigoDisciplina').val()),
            anoLetivo: TratarValorNumerico($('#txtAnoLetivo').val()),
        },
        success: function (data, textStatus, jqXHR) {
            $('.resultadoPesquisa').html(data);
            $("#tabelaDadosResultadoFiltro").sedDataTable();
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

var CarregarCalendario = function (turma, disciplina, aaAno, mmMes) {

    AbrirMensagemCarregandoPagina();

    if (TratarValorNumerico(mmMes) > 12) {
        aaAno = TratarValorNumerico(aaAno) + 1;
        mmMes = 1;
    }

    if (TratarValorNumerico(mmMes) < 1) {
        aaAno = TratarValorNumerico(aaAno) - 1;
        mmMes = 12;
    }

    $('#hdfMesAtual').val(mmMes)
    $('#hdfAnoAtual').val(aaAno)

    $.ajax({
        cache: false,
        // async: false,
        url: '/Planejamento/CarregarCalendario',
        type: 'POST',
        data: {
            codigoTurma: TratarValorNumerico(turma),
            codigoDisciplina: TratarValorNumerico(disciplina),
            ano: TratarValorNumerico(aaAno),
            mes: TratarValorNumerico(mmMes),
        },
        success: function (data, textStatus, jqXHR) {
            $('#calendario').html(data);
            $('#Mes').html(ObterMesAno(mmMes, aaAno));
            BloquearNavegacaoCalendario();
            LimparCalendario();
            VerificarDiasLetivosCalendario($('#dp_month'), $('#hdfDiretoria').val(), $('#hdfEscola').val(), $('#hdfAnoAtual').val(), $('#hdfMesAtual').val());
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

var LimparCalendario = function () {
    $.expr[':'].contentIs = function (el, idx, meta) {
        return $(el).text() === meta[3];
    };
    $(':contentIs(DEMO)').remove();

    // Altera os dias da semana para  forma abreviada.
    $('#dp_month').find('.month_blue_header_inner').each(function () {
        switch ($(this).html()) {
            case 'domingo':
                $(this).html('Domingo');
                break;
            case 'segunda-feira':
                $(this).html('Segunda-feira');
                break;
            case 'terça-feira':
                $(this).html('Terça-feira');
                break;
            case 'quarta-feira':
                $(this).html('Quarta-feira');
                break;
            case 'quinta-feira':
                $(this).html('Quinta-feira');
                break;
            case 'sexta-feira':
                $(this).html('Sexta-feira');
                break;
            case 'sábado':
                $(this).html('Sábado');
                break;
        }
    });
    // Altera o titulo do 1º dia do mês.
    $('#dp_month').each(function () {
        var item = $(this).find('.month_blue_cell_inner');
        for (var i = 0; i < item.length; i++) {
            var titulo = $(item[i]).find('.month_blue_cell_header').html();
            if (isNaN(titulo)) {
                $(item[i]).find('.month_blue_cell_header').html('1')
            }
        }
    });
    // bloqueia datas anteriores e posteriores.
    $('#dp_month').each(function () {
        var linhas = 0;

        var dias = $(this).find('.month_blue_cell_inner');
        var primeiroDia = parseInt($(dias).first().find('.month_blue_cell_header').html())

        for (var i = 0; i < dias.length; i++) {
            var diaAtual = parseInt($(dias[i]).find('.month_blue_cell_header').html());

            if ((primeiroDia + 1) == diaAtual || (diaAtual == 1 && diaAtual != primeiroDia)) {
                linhas = i;
                break;
            }
        }

        var encontrou = 0;

        for (var l = 0; l < linhas; l++) {
            for (var c = 0; c < 7; c++) {
                var i = c * linhas + l;
                var diaAtual = parseInt($(dias[i]).find('.month_blue_cell_header').html());

                if (diaAtual == 1) {
                    if (encontrou == 0) {
                        encontrou = 1;
                        if (c == 0 || c == 6) {
                            $(dias[i]).css('background-color', '#FFF0F0');
                        }
                    } else {
                        if (encontrou == 1) {
                            encontrou = 2;
                            $(dias[i]).find('.month_blue_cell_header').html('');
                            $(dias[i]).css('background-color', '#EEEEEE');
                        }
                    }
                } else {
                    if (encontrou == 0 || encontrou == 2) {
                        $(dias[i]).find('.month_blue_cell_header').html('');
                        $(dias[i]).css('background-color', '#EEEEEE');
                    } else {
                        if (c == 0 || c == 6) {
                            $(dias[i]).css('background-color', '#FFF0F0');
                        }
                    }
                }

            }
        }

        encontrou = 0;
    });
}

var ObterMesAno = function (mes, ano) {
    switch (TratarValorNumerico(mes)) {
        case "01":
        case 1:
            return "Janeiro/" + ano;
        case "02":
        case 2:
            return "Fevereiro/" + ano;
        case "03":
        case 3:
            return "Março/" + ano;
        case "04":
        case 4:
            return "Abril/" + ano;
        case "05":
        case 5:
            return "Maio/" + ano;
        case "06":
        case 6:
            return "Junho/" + ano;
        case "07":
        case 7:
            return "Julho/" + ano;
        case "08":
        case 8:
            return "Agosto/" + ano;
        case "09":
        case 9:
            return "Setembro/" + ano;
        case "10":
        case 10:
            return "Outubro/" + ano;
        case "11":
        case 11:
            return "Novembro/" + ano;
        case "12":
        case 12:
            return "Dezembro/" + ano;
        default:
            return "Indefinido";
    }
}

var DetalharPlanejamento = function (cdPlanejamento, cdTurma, cdDisciplina, dtAula, hrInicio, hrFim) {
    AbrirMensagemCarregandoPagina();

    $.ajax({
        cache: false,
        // async: false,
        url: '/Planejamento/DetalharPlanejamento',
        type: 'POST',
        data: {
            codigoPlanejamento: TratarValorNumerico(cdPlanejamento),
            codigoTurma: TratarValorNumerico(cdTurma),
            codigoDisciplina: TratarValorNumerico(cdDisciplina),
            dataAula: dtAula,
            horaInicio: hrInicio,
            horaFim: hrFim,
        },
        success: function (data, textStatus, jqXHR) {
            $('#dialogDetalhe').html(data);

            bimestre = parseInt($('#hdfBimestrePlan').val());

            if (bimestre < 1 || bimestre > 4) {
                $('#dialogDetalhe').html('');
                /*
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Não foi idenficado um bimestre válido para a sua unidade escolar.",
                    tipo: "Erro",
                    botao: "Fechar"
                });
                */
                return;
            }
            mandeiFechar = true;
            $('#dialogDetalhe').dialog('open');
            InicializarVisualizacaoPlanejamentoConteudo();
            ConfigurarBotaoEditar();
            ConfigurarBotaoRealizar();
            ExcluirPlanejamento();
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

var ConfigurarBotaoEditar = function () {
    AbrirMensagemCarregandoPagina();

    $('#btnEditar').click(function () {
        $.ajax({
            cache: false,
            // async: false,
            url: '/Planejamento/Editar',
            type: 'POST',
            data: {
            },
            success: function (data, textStatus, jqXHR) {
                $('#dialogDetalhe').html(data);

                InicializarPlanejamentoConteudo();
                RecuperarDisponibilidadeData();
                AplicarMascaras();

                $('#frmEditar').validate({
                    rules: {
                        DataAula: { required: true, dataValida: true },
                        HoraAula: { required: true }
                    }
                });

                mandeiFechar = false;


                $('#HoraAula').val($('#hdfHoraAula').val());

                $('#btnSalvar').click(function () {
                    if ($('#frmEditar').valid() == false) {
                        return;
                    }

                    if ($('#txtConteudoPlan').val() == '' && $('.conteudo:checked').length <= 0) {
                        Mensagem.Alert({
                            titulo: "Aviso",
                            mensagem: "Conteúdo para a aula não informado.",
                            tipo: "Aviso",
                            botao: "Fechar"
                        });

                        return;
                    }

                    $.ajax({
                        cache: false,
                        url: '/Planejamento/SalvarPlanejamento',
                        type: 'POST',
                        traditional: true,
                        data: {
                            codigoPlanejamento: TratarValorNumerico($('#hdfCodigoPlanejamento').val()),
                            codigoTurma: TratarValorNumerico($('#hdfCodigoTurma').val()),
                            codigoDisciplina: TratarValorNumerico($('#hdfCodigoDisciplina').val()),
                            dataAula: $('#DataAula').val(),
                            horaAula: $('#HoraAula').val(),
                            numBimestre: TratarValorNumerico($('#hdfBimestrePlan').val()),
                            descricaoConteudo: $('#txtConteudoPlan').val(),
                            conteudoCurriculo: RecuperarConteudoPlanejado(),
                        },
                        success: function (data) {
                            if (data > 0) {
                                mandeiFechar = true;

                                DetalharPlanejamento(data, TratarValorNumerico($('#hdfCodigoTurma').val()), TratarValorNumerico($('#hdfCodigoDisciplina').val()), $('#DataAula').val(), '', '');
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
    });
}

var ConfigurarBotaoRealizar = function () {
    AbrirMensagemCarregandoPagina();

    $('#btnRealizar').click(function () {
        $.ajax({
            cache: false,
            url: '/Planejamento/Realizar',
            type: 'POST',
            data: {
            },
            success: function (data, textStatus, jqXHR) {
                $('#dialogDetalhe').html(data);
                InicializarRealizacaoConteudo();
                mandeiFechar = false;
                $('#btnSalvar').click(function () {

                    if ($('#txtConteudoPlan').val() == '' && $('.conteudoRealizado').length <= 0) {
                        Mensagem.Alert({
                            titulo: "Aviso",
                            mensagem: "Conteúdo da aula não informado.",
                            tipo: "Aviso",
                            botao: "Fechar"
                        });

                        return;
                    }

                    $.ajax({
                        cache: false,
                        url: '/Planejamento/SalvarFechamento',
                        type: 'POST',
                        dataType: 'JSON',
                        traditional: true,
                        data: {
                            codigoPlanejamento: TratarValorNumerico($('#hdfCodigoPlanejamento').val()),
                            descricaoConteudo: $('#txtConteudoPlan').val(),
                            conteudoRealizado: RecuperarConteudoRealizado(),
                        },
                        success: function (data) {
                            if (data > 0) {
                                mandeiFechar = true;
                                DetalharPlanejamento(data, TratarValorNumerico($('#hdfCodigoTurma').val()), TratarValorNumerico($('#hdfCodigoDisciplina').val()), $('#hdfDataAulaPlan').val(), '', '');
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
    });
}

var BloquearNavegacaoCalendario = function () {
    var atual = (TratarValorNumerico($('#hdfAnoAtual').val()) * 100) + TratarValorNumerico($('#hdfMesAtual').val());
    var inicial = (TratarValorNumerico($('#hdfAnoInicio').val()) * 100) + TratarValorNumerico($('#hdfMesInicio').val());
    var final = (TratarValorNumerico($('#hdfAnoFim').val()) * 100) + TratarValorNumerico($('#hdfMesFim').val());

    if (atual <= inicial) {
        $('.navAnterior').remove();
    }

    if (atual >= final) {
        $('.navPosterior').remove();
    }
}

var CarregarTurmasProfessorAnoLetivo = function () {

    $.ajax({
        cache: false,
        url: '/Planejamento/ConsultarDetalheDisciplinaParcial',
        type: 'POST',
        data: {
            anoLetivo: TratarValorNumerico($('#txtAnoLetivo').val()),
        },
        success: function (data, textStatus, jqXHR) {
            $('#resultadoDisciplina').html(data);
            // Defina as data tables.
            $('#tabelaDadosTurma').sedDataTable();
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
};

var CarregarTurmasProfessor = function () {

    $.ajax({
        cache: false,
        url: '/Planejamento/ConsultarTurmasProfessor',
        type: 'POST',
        data: {
            anoLetivo: TratarValorNumerico($('#txtAnoLetivo').val()),
        },
        success: function (data, textStatus, jqXHR) {
            $('#resultadoDisciplina').html(data);
            // Defina as data tables.
            $('#tabelaDadosTurma').sedDataTable();
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
};

var VisualizarCalendarioPlanejamento = function (link) {
    var CodigoTurma = $(link).attr('CodigoTurma');
    var CodigoDisciplina = $(link).attr('CodigoDisciplina');

    $.ajax({
        cache: false,
        url: '/Planejamento/CalendarioAula',
        type: 'POST',
        data: {
            codigoTurma: TratarValorNumerico(CodigoTurma),
            codigoDisciplina: TratarValorNumerico(CodigoDisciplina)
        },
        success: function (data, textStatus, jqXHR) {
            $('#Filtro').hide();
            $('#CalendarioAula').show();
            $('#CalendarioAula').html(data);
            CarregarCalendario($('#hdfTurma').val(), $('#hdfDisciplina').val(), $('#hdfAno').val(), $('#hdfMes').val());

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

};

var VoltarFiltro = function () {
    $('#btnPesquisarPlanejamento').trigger('click');
    $('#btnPesquisar').trigger('click');
    $('#CalendarioAula').hide();
    $('#Filtro').show();
}

var DatasDisponiveis;

function VerificarDatasDisponiveis(date) {
    dmy = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    if ($.inArray(dmy, DatasDisponiveis) != -1) {
        return [true, "", "Available"];
    } else {
        return [false, "", "unAvailable"];
    }
}

var RecuperarDisponibilidadeData = function () {
    $.ajax({
        url: '/Planejamento/RecuperarDisponibilidadeData',
        type: 'POST',
        datatype: 'JSON',
        data: {
            codigoTurma: TratarValorNumerico($('#hdfTurma').val()),
            codigoDisciplina: TratarValorNumerico($('#hdfDisciplina').val()),
            dataAulaAtual: $('#hdfDataAula').val()
        },
        success: function (data, textStatus, jqXHR) {
            DatasDisponiveis = data.DataDisponivel;

            $('#DataAula').datepicker({
                beforeShowDay: VerificarDatasDisponiveis,
                onSelect: ValidarAlteracaoData
            }).mask('99/99/9999');

            $('#DataAula').keydown(function (e) {
                if (e.keyCode == 8 || e.keyCode == 46) {
                    return true;
                }

                return false;
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

var ValidarAlteracaoData = function () {
    var DataCalendario = $(this).val();

    $.ajax({
        url: '/Planejamento/RecuperarBimestre',
        type: 'POST',
        datatype: 'JSON',
        data: {
            dataAula: DataCalendario,
            bimestreAtual: $('#hdfBimestrePlan').val()
        },
        success: function (dataBimestre, textStatus, jqXHR) {
            if (dataBimestre.alterouBimetre == true) {
                if (dataBimestre.bimestre == 0) {
                    DataCalendario = $('#hdfDataAula').val()
                    var dtAula = $('#hdfDataAula').val().split('/');
                    $('#DataAula').datepicker("setDate", new Date(dtAula[2], dtAula[1] - 1, dtAula[0]));
                    $('#hdfBimestrePlan').val($('#hdfBimestreOrig').val());
                    $('#lblBimestre').html($('#hdfBimestreOrig').val() + '° Bimestre');

                    CarregarDadosEdicao(DataCalendario);
                }
                else {
                    $('#hdfBimestrePlan').val(dataBimestre.bimestre);
                    $('#lblBimestre').html(dataBimestre.bimestre + '° Bimestre');

                    CarregarDadosEdicao(DataCalendario);
                }
            } else {
                CarregarDadosEdicao(DataCalendario);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

var CarregarDadosEdicao = function (DataCalendario) {
    $.ajax({
        url: '/Planejamento/PlanejarCurriculoParcial',
        type: 'POST',
        datatype: 'HTML',
        data: {
            dataAula: DataCalendario,
            bimestre: $('#hdfBimestrePlan').val()
        },
        success: function (dataCurriculo, textStatus, jqXHR) {
            $('#curriculo').html(dataCurriculo);
            InicializarPlanejamentoConteudo();
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });

    $.ajax({
        url: '/Planejamento/RecuperarDisponibilidadeHorario',
        type: 'POST',
        datatype: 'JSON',
        data: {
            codigoTurma: TratarValorNumerico($('#hdfTurma').val()),
            codigoDisciplina: TratarValorNumerico($('#hdfDisciplina').val()),
            dataAula: DataCalendario,
            dataAulaAtual: $('#hdfDataAula').val(),
            horaAulaAtual: $('#hdfHoraAula').val()
        },
        success: function (data, textStatus, jqXHR) {
            $('#HoraAula').children().remove();
            $('#HoraAula').append('<option value="">Selecione...</option>');

            for (var i = 0; i < data.length; i++) {
                $('#HoraAula').append('<option value="' + data[i].value + '">' + data[i].text + '</option>');
            }

            if ($('#HoraAula').children().length == 2) {
                $('#HoraAula').children().last().attr('selected', 'selected');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
}

var ExcluirPlanejamento = function () {
    $('#btnExcluir').click(function () {
        Mensagem.Alert({
            titulo: "Atenção!",
            mensagem: 'Deseja excluir o planejamento de aula?',
            tipo: "aviso",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.ajax({
                            cache: false,
                            url: '/Planejamento/ExcluirPlanejamento',
                            type: 'POST',
                            datatype: 'JSON',
                            data: {
                                codigoPlanejamento: $('#hdfCodigoPlanejamento').val()
                            },
                            traditional: true,
                            success: function (data, textStatus, jqXHR) {
                                if (data == 1) {
                                    mandeiFechar = true;
                                    $('#dialogDetalhe').dialog('close');
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
}

var VerificarDiasLetivosCalendario = function (Calendario, CodigoDiretoria, CodigoEscola, AnoLetivo, Mes) {
    var dpmMonth;

    if (typeof (Calendario) == 'string') {
        dpmMonth = $('#' + Calendario);
    } else {
        dpmMonth = $(Calendario);
    }

    if (dpmMonth == null || dpmMonth == undefined) {
        return;
    }

    $.ajax({
        cache: false,
        url: '/CalendarioEscolar/ConsultarDiasLetivos',
        type: 'POST',
        datatype: 'JSON',
        data: {
            codigoDiretoria: CodigoDiretoria,
            codigoEscola: CodigoEscola,
            anoLetivo: AnoLetivo,
            mes: Mes
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $(dpmMonth).find('.month_blue_cell_inner').each(function () {
                var diaCalendario = parseInt($(this).find('.month_blue_cell_header').html());

                for (var i = 0; i < data.length; i++) {
                    var dia = parseInt(data[i].Dia);
                    if (dia == diaCalendario) {
                        if (data[i].Letivo == false) {
                            $(this).css('background-color', 'rgb(255, 240, 240)');
                        } else {
                            $(this).css('background-color', 'rgb(255, 255, 255)');
                        }

                        break;
                    }
                }
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

$.validator.addMethod("minTable", function (value, element) {

    var day = $("#dob_day").val();
    var month = $("#dob_month").val();
    var year = $("#dob_year").val();
    var age = 18;

    var mydate = new Date();
    mydate.setFullYear(year, month - 1, day);

    var currdate = new Date();
    currdate.setFullYear(currdate.getFullYear() - age);

    return currdate > mydate;

}, "Erro");


//Planejamento Aulas planejadas Realizadas (módulo)
$(document).ready(function () {
    $('.form').validate({
        rules: {
            txtAnoLetivo: "required",
            txtAulaPlanejada: "required",
            txtAulaRealizada: "required",
            CodigoDiretoria: "required",
            CodigoEscola: "required",
            CodigoTipoEnsino: "required",
            ddlListaBimestres: "required",
            CodigoTurma: { required: true },
            txtAnoLetivo: { minlength: 4 }
        },
        messages: {
            txtAnoLetivo: " Obrigatório",
            txtAulaRealizada: " Obrigatório",
            txtAulaPlanejada: " Obrigatório",
            CodigoDiretoria: " Obrigatório",
            CodigoEscola: " Obrigatório",
            CodigoTipoEnsino: " Obrigatório",
            ddlListaBimestres: " Obrigatório",
            CodigoTurma: " Obrigatório",
            txtAnoLetivo: " 4 dígitos mínimo"
        }
    });

    $('#txtAnoLetivo').mask('9999');
    $('#txtAnoLetivoProf').mask('9999');

    if ($("#txtAnoLetivoProf").val() != null || $("#txtAnoLetivoProf").val()) {
        $.ajax({
            url: '/Planejamento/ConsultarTurmasProfessor',
            type: 'Post',
            cache: false,
            datatype: 'html',
            data: { anoLetivo: $("#txtAnoLetivo").val() },
            success: function (data) {
                if (data == null || data == "")
                    return;
                $("div#resultadoDisciplina").html(data);
                $("#tableAulas").sedDataTable();
                $("#tabelaDadosTurma").sedDataTable();
            }
        });
    }
});


function fillCarregarLista() {
    var dto = {
        anoLetivo: parseInt($('#txtAnoLetivo').val()),
        codigoDiretoria: parseInt($('#CodigoDiretoria option:selected').val()),
        codigoEscola: parseInt($('#CodigoEscola option:selected').val()),
        codigoFechamento: parseInt($('#CodigoTipoEnsino option:selected').val()),
        codigoTurma: parseInt($('#CodigoTurma option:selected').val())
    }
    return JSON.stringify(dto);
}

function CarregarLista() {
    if ($('.form').valid()) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: '{ dto : ' + fillCarregarLista() + '}',
            contentType: "application/json; charset=utf-8",
            url: '/Planejamento/ListaPlanejamento',
            success: function (data, textStatus, jqXHR) {
                $('div#resultadoPesquisa').empty().html(data);
                $('#imgAtualizar').css("visibility", "visible");
                $('#table').sedDataTable();
            },
        });
    }
}

function fillPlanejamento() {
    var args = arguments[0];
    var dto = {
        cpfProfessor: $(args).data('cpfprofessor'),
        nomeProfessor: $(args).data('nomeprofessor'),
        codigoTipoEnsino: parseInt($(args).data('codigotipoensino')),
        tipoEnsino: $(args).data('tipoensino'),
        codigoTurma: parseInt($(args).data('codigoturma')),
        turma: $(args).data('turma'),
        codigoSubTurma: parseInt($(args).data('codigosubturma')),
        subturma: $(args).data('nomesubturma'),
        periodo: $(args).data('periodo'),
        codigoDisciplina: parseInt($(args).data('codigodisciplina')),
        disciplina: $(args).data('disciplina'),
        codigoEscola: parseInt($(args).data('codigoescola')),
        nomeEscola: $(args).data('nomeescola'),
        codigoDiretoria: parseInt($(args).data('codigodiretoria')),
        anoLetivo: parseInt($('#txtAnoLetivo').val())
    }
    return JSON.stringify(dto);
}

function AbrirPlanejamentoView(linha) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        contentType: "application/json; charset=utf-8",
        data: '{ view : ' + fillPlanejamento(linha) + '}',
        url: '/Planejamento/SelecionaBimestreView',
        success: function (data) {
            $('#dialog').html(data).dialog({
                // height: 700,
                width: 900,
                draggable: true,
                modal: true,
                resizable: false,
                position: 'top'
            });
        },

    });
}

function AbrirPlanejamento(linha) {
    var codigoSubTurma = parseInt($(linha).data('codigosubturma'));
    var anoLetivo = parseInt($('#txtAnoLetivo').val());

    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: {
            cpfProfessor: $(linha).data('cpfprofessor'),
            nomeProfessor: $(linha).data('nomeprofessor'),
            codigoTipoEnsino: parseInt($(linha).data('codigotipoensino')),
            tipoEnsino: $(linha).data('tipoensino'),
            codigoTurma: parseInt($(linha).data('codigoturma')),
            turma: $(linha).data('turma'),
            codigoSubTurma: codigoSubTurma,
            subturma: $(linha).data('nomesubturma'),
            periodo: $(linha).data('periodo'),
            codigoDisciplina: parseInt($(linha).data('codigodisciplina')),
            disciplina: $(linha).data('disciplina'),
            codigoEscola: parseInt($(linha).data('codigoescola')),
            nomeEscola: $(linha).data('nomeescola'),
            codigoDiretoria: parseInt($(linha).data('codigodiretoria')),
            anoLetivo: anoLetivo
        },
        url: '/Planejamento/SelecionaBimestre',
        success: function (data) {
            $('#dialog').html(data).dialog({
                // height: 700,
                width: 900,
                draggable: true,
                modal: true,
                resizable: false,
                position: 'top'
            });
        },

    });
}

function AbrirAula(linha) {
    var anoLetivo = parseInt($('#txtAnoLetivo').val());

    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: {
            cpfProfessor: $(linha).data('cpfprofessor'),
            codigoTipoEnsino: parseInt($(linha).data('codigotipoensino')),
            tipoEnsino: $(linha).data('tipoensino'),
            codigoTurma: parseInt($(linha).data('codigoturma')),
            turma: $(linha).data('turma'),
            periodo: $(linha).data('periodo'),
            codigoEscola: parseInt($(linha).data('codigoescola')),
            nomeEscola: $(linha).data('nomeescola'),
            codigoDiretoria: parseInt($(linha).data('codigodiretoria')),
            anoLetivo: anoLetivo
        },
        url: '/Planejamento/SelecionaBimestre',
        success: function (data) {
            $('#dialog').html(data).dialog({
                // height: 700,
                width: 900,
                draggable: true,
                modal: true,
                resizable: false,
                position: 'top'
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function CarregarAulas() {
    if ($("#ddlListaBimestres").val().length > 0) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: {
                codigoDiretoria: $('#txtCodigoDiretoria').val(),
                codigoEscola: $('#txtCodigoEscola').val(),
                codigoTurma: $('#txtCodigoTurma').val(),
                codigoEvento: TratarValorNumerico($('#ddlListaBimestres').val()),
                cpfProfessor: $('#txtCpfProfessor').val(),
                anoLetivo: parseInt($('#txtAnoLetivo').val()),
                CodigoFechamento: $("#ddlListaBimestres option:selected ").val()
            },
            url: '/Planejamento/AulaPlanejadaAulaDada',
            success: function(data) {
                $('#AulasDadasPlanejadas').html(data);
                // Defina as data tables.
                $('#tableAulas').sedDataTable();
            },
            error: function(jqXHR, textStatus, errorThrown) {

            }
        });
    }
};


function fillCarregarAulas() {
    var dto = {
        codigoDiretoria: $('#txtCodigoDiretoria').val(),
        codigoEscola: $('#txtCodigoEscola').val(),
        codigoTurma: $('#txtCodigoTurma').val(),
        codigoEvento: TratarValorNumerico($('#ddlListaBimestres').val()),
        cpfProfessor: $('#txtCpfProfessor').val(),
        anoLetivo: parseInt($('#txtAnoLetivo').val()),
        CodigoFechamento: $("#ddlListaBimestres option:selected ").val()
    }
    return JSON.stringify(dto);
}

var functionCarregarAulas = function () {
    var list = $("#ddlListaBimestres");
    if (list.val()) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            contentType: "application/json; charset=utf-8",
            data: '{ Aulas : ' + fillCarregarAulas() + '}',
            url: '/Planejamento/AulaPlanejadaAulaDadaView',
            success: function (data) {
                $('#AulasDadasPlanejadas').html(data);
                $('#tableAulas').sedDataTable();
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function CarregarAulas() {
    if ($("#ddlListaBimestres").val().length > 0) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: {
                codigoDiretoria: $('#txtCodigoDiretoria').val(),
                codigoEscola: $('#txtCodigoEscola').val(),
                codigoTurma: $('#txtCodigoTurma').val(),
                codigoEvento: TratarValorNumerico($('#ddlListaBimestres').val()),
                cpfProfessor: $('#txtCpfProfessor').val(),
                anoLetivo: parseInt($('#txtAnoLetivo').val()),
                CodigoFechamento: $("#ddlListaBimestres option:selected ").val()
            },
            url: '/Planejamento/AulaPlanejadaAulaDada',
            success: function (data) {
                $('#AulasDadasPlanejadas').html(data);
                // Defina as data tables.
                $('#tableAulas').sedDataTable();
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
};