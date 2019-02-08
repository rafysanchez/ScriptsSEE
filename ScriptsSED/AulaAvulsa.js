var ultimoValor;

$(document).ready(function () {
    ConfigurarModal();
    ConfigurarDropDownFiltro();
    ValidarFormularioFiltro();
    PesquisarAulaAvulsa();
    AbrirTelaCadastro();
    AplicarMascaras();
    ultimoValor = -1;
});

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

var ConfigurarDropDownCadastro = function () {
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino');
    $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', ["CodigoEscola", "CodigoTipoEnsino", "AnoLetivo"]);
    $('#CodigoTurma').autoPreencher($('#CodigoDisciplina'), 'Disciplina', 'CarregarDisciplinasPorCodigoTurma');

    $('#ddlTipoAula').change(function () {
        $('#AnoLetivo').val($('#txtDataAula').val().substring(6, 10))
        if (this.value == 4) {
            $('#AnoLetivo').val($('#txtDataAula').val().substring(6, 10));
            $("#ddlTempoAula").val(0);
            $("#txtHoraInicio").val("");
            $("#txtHoraFim").val("");
            $('#tabelaProfessor > tbody').html('<tr class="odd"><td valign="top" colspan="4" class="dataTables_empty">Não foram encontrados resultados</td></tr>');
            $("#txtCPFProfessor").val("");
            $("#aula-eventual").show();

            $("#txtCPFProfessor").rules('add', {
                required: true,
                messages: {
                    required: "Obrigatório"
                }
            });

            $("#ddlTempoAula").rules('remove', 'required');
            $("#txtHoraInicio").rules('remove', 'required');
            $("#txtHoraFim").rules('remove', 'required');

            $("#ddlTempoAula").attr("disabled", true);
            $("#txtHoraInicio").attr("readOnly", true);
            $("#txtHoraFim").attr("readOnly", true);

            $('#tabelaAulas > tbody').html('<tr class="odd"><td valign="top" colspan="4" class="dataTables_empty">Não foram encontrados resultados</td></tr>');
        } else {
            $("#txtCPFProfessor").val("");
            $('#tabelaProfessor > tbody').html('<tr class="odd"><td valign="top" colspan="4" class="dataTables_empty">Não foram encontrados resultados</td></tr>');
            $("#aula-eventual").hide();

            $("#txtCPFProfessor").rules('remove', 'required');

            $("#ddlTempoAula").rules('add', {
                required: true,
                messages: {
                    required: "Obrigatório"
                }
            });

            $("#txtHoraInicio").rules('add', {
                required: true,
                messages: {
                    required: "Obrigatório"
                }
            });

            $("#txtHoraFim").rules('add', {
                required: true,
                messages: {
                    required: "Obrigatório"
                }
            });

            $("#ddlTempoAula").attr("disabled", false);
            $("#txtHoraInicio").attr("readOnly", false);
            $("#txtHoraFim").attr("readOnly", false);

            $('#tabelaAulas > tbody').html('<tr class="odd"><td valign="top" colspan="4" class="dataTables_empty">Não foram encontrados resultados</td></tr>');
        }
    });

    $('#CodigoDisciplina').change(function () {

        var dataAula = $('#txtDataAula').val();
        var codigoDisciplina = TratarValorNumerico($('#CodigoDisciplina').val());
        var codigoTurma = TratarValorNumerico($('#CodigoTurma').val());
        var codigoTipoAula = TratarValorNumerico($('#ddlTipoAula').val());

        if (codigoDisciplina == 0 && ultimoValor == -1) {
            return;
        }
        else if (codigoDisciplina == 0 && ultimoValor != -1) {
            ultimoValor = -1;
        }

        ultimoValor = codigoDisciplina;

        if (codigoTipoAula == 4) {
            if (codigoDisciplina > 0)
                AtualizarListaAulaEventual(dataAula, codigoTurma, codigoDisciplina);
        } else {
            if (codigoDisciplina > 0)
                AtualizarListaProfessor(dataAula, codigoTurma, codigoDisciplina);
        }
    });

    $('#txtDataAula').change(function () {

        var dataAula = $('#txtDataAula').val();
        var codigoDisciplina = TratarValorNumerico($('#CodigoDisciplina').val());
        var codigoTurma = TratarValorNumerico($('#CodigoTurma').val());
        var codigoTipoAula = TratarValorNumerico($('#ddlTipoAula').val());

        if (codigoDisciplina == 0 && ultimoValor == -1) {
            return;
        }
        else if (codigoDisciplina == 0 && ultimoValor != -1) {
            ultimoValor = -1;
        }

        ultimoValor = codigoDisciplina;

        if (codigoTipoAula == 4) {
            if (codigoDisciplina > 0)
                AtualizarListaAulaEventual(dataAula, codigoTurma, codigoDisciplina);
        } else {
            if (codigoDisciplina > 0)
                AtualizarListaProfessor(dataAula, codigoTurma, codigoDisciplina);
        }
    });

    //$('#txtDataAula').blur(function () {
    //    if ($('#txtDataAula').val() == "") {
    //        $('#txtDataAula').focus();
    //    }
    //});
}

var ConfigurarModal = function () {
    //$("#dialog").dialog({
    //    autoOpen: false,
    //    title: '',
    //    position: 'top',
    //    //height: 750,
    //    width: 820,
    //    resizable: false,
    //    modal: true,
    //    dragable: false,
    //    show: {
    //        effect: "blind",
    //        duration: 200
    //    },
    //    beforeClose: function (event, ui) {
    //        if ($('#result').html() != '') {
    //            if ($('#txtAnoLetivoFiltro').val() != '' &&
    //                $('#CodigoDiretoriaFiltro').val() != '' &&
    //                $('#CodigoEscolaFiltro').val() != '') {
    //                ConsultarAulaAvulsa();
    //            }
    //        }
    //    }
    //});
}

var ValidarFormulario = function () {
    $('.form').validate({
        rules: {
            txtDataAula: {
                required: true,
                dataValida: true
            },
            ddlTempoAula: {
                required: true
            },
            txtHoraInicio: {
                required: true,
                horaValida: true
            },
            txtHoraFim: {
                required: true,
                horaValida: true
            },
            ddlTipoAula: {
                required: true
            },
            txtJustificativa: {
                required: true
            },
            CodigoDiretoria: {
                required: true
            },
            CodigoEscola: {
                required: true
            },
            CodigoTipoEnsino: {
                required: true
            },
            CodigoTurma: {
                required: true
            },
            CodigoDisciplina: {
                required: true
            }
        },
        messages: {
            txtDataAula: {
                required: "Obrigatório",
                dataValida: "Data inválida"
            },
            ddlTempoAula: {
                required: "Obrigatório"
            },
            txtHoraInicio: {
                required: "Obrigatório",
                horaValida: "Hora inválida"
            },
            txtHoraFim: {
                required: "Obrigatório",
                horaValida: "Hora inválida"
            },
            ddlTipoAula: {
                required: "Obrigatório"
            },
            txtJustificativa: {
                required: "Obrigatório"
            },
            CodigoDiretoria: {
                required: "Obrigatório"
            },
            CodigoEscola: {
                required: "Obrigatório"
            },
            CodigoTipoEnsino: {
                required: "Obrigatório"
            },
            CodigoTurma: {
                required: "Obrigatório"
            },
            CodigoDisciplina: {
                required: "Obrigatório"
            }
        }
    });
}

var AbrirTelaCadastro = function () {
    $('#btnCadastrar').click(function () {
        $.ajax({
            cache: false,
            url: '/AulaAvulsa/Cadastrar',
            type: 'POST',
            datatype: 'json',
            data: {
            },
            success: function (data, textStatus, jqXHR) {

                ultimoValor = -1;

                $('#dialog').html(data);

                ConfigurarDropDownCadastro();
                ValidarFormulario();
                SalvarCadastro();
                $('#tabelaProfessor').sedDataTable();
                $('#tabelaAulas').sedDataTable();

                AplicarMascaras();
                ConfigurarTempoAula();

                $('#txtDataAula').datepicker("option", {
                    onSelect: function () {
                        $('#ddlTipoAula').focus();
                    }
                });

                $("#txtDataAula").keypress(function (e) { return false; })

                $('#dialog').dialog({
                    width: 1000,
                    title: "Cadastrar Reposição de Aula",
                    draggable: false,
                    modal: true,
                    resizable: false,
                    position: 'top',
                    beforeClose: function (event, ui) {
                        if ($('#result').html() != '') {
                            if ($('#txtAnoLetivoFiltro').val() != '' &&
                                $('#CodigoDiretoriaFiltro').val() != '' &&
                                $('#CodigoEscolaFiltro').val() != '') {
                                ConsultarAulaAvulsa();
                            }
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
    });
}

var AtualizarListaProfessor = function (DataAula, CodigoTurma, CodigoDisciplina) {

    $.ajax({
        cache: false,
        url: '/AulaAvulsa/ConsultaProfessorPorTurmaDisciplina',
        type: 'POST',
        datatype: 'json',
        data: {
            dataAula: DataAula,
            codigoTurma: CodigoTurma,
            codigoDisciplina: CodigoDisciplina
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#dadosProfessor').html(data);
            $('#tabelaProfessor').sedDataTable();
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

var AtualizarListaProfessorEventual = function (CPF) {
    if (CPF.length == 14) {
        $.ajax({
            cache: false,
            url: '/AulaAvulsa/ConsultaProfessorEventualPorCPF/?cpf=' + CPF,
            type: 'POST',
            datatype: 'json',
            success: function (data) {
                $('#dadosProfessor').html(data);
                $('#tabelaProfessor').sedDataTable();
            }
        });
    }
}

var AtualizarListaAulaEventual = function (DataAula, CodigoTurma, CodigoDisciplina) {
    $.ajax({
        cache: false,
        url: '/AulaAvulsa/ConsultarAulas/',
        data: {
            datadaaula: DataAula,
            codigodaturma: CodigoTurma,
            codigodadisciplina: CodigoDisciplina
        },
        type: 'POST',
        datatype: 'json',
        success: function (data) {
            $('#aulasGV').html(data);
            $('#tabela-aulas').sedDataTable();
        }
    });
}

var SalvarCadastro = function () {
    $('#btnSalvarCadastro').click(function (e) {
        e.preventDefault();

        if ($('.form').valid() == false) {
            //$('#tituloData').focus();
            return;
        }

        var horaInicio = TratarValorNumerico($('#txtHoraInicio').val().replace(':', ''));
        var horaFim = TratarValorNumerico($('#txtHoraFim').val().replace(':', ''));
        var codigoTipoAula = TratarValorNumerico($('#ddlTipoAula').val());
        var dataAulaOriginal = $('#txtDataAulaOriginal').val();

        if (codigoTipoAula != 4 && horaInicio >= horaFim) {
            $('#txtHoraFim').focus();

            Mensagem.Alert({
                titulo: "Reposição de Aula",
                mensagem: "Informe um horário final de aula superior ao inicial.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }


        if ($('.rdlProfessor:checked').val() == undefined) {

            $('#dadosProfessor').focus();

            Mensagem.Alert({
                titulo: "Reposição de Aula",
                mensagem: "Selecione um professor.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        if ($("#ddlTipoAula").val() == 1)
            if ($('.rdlAulaOriginal:checked').val() == undefined) {

                $('#dadosAulas').focus();

                Mensagem.Alert({
                    titulo: "Reposição de Aula",
                    mensagem: "Selecione a aula original.",
                    tipo: "Aviso",
                    botao: "Fechar"
                });

                return;
            }

        var aulas = [];

        $("input[id=aulas]:checked").each(function () {
            var td = $(this).parent();

            aulas.push(TratarValorNumerico(td.find("#aulas").val()));
        });

        if (codigoTipoAula == 4 && aulas.length == 0) {
            Mensagem.Alert({
                titulo: "Reposição de Aula",
                mensagem: "Selecione uma Aula.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }
        
        $.ajax({
            cache: false,
            url: '/AulaAvulsa/SalvarCadastro',
            type: 'POST',
            datatype: 'HTML',
            data: {
                dataAula: $('#txtDataAula').val(),
                horaInicio: $('#txtHoraInicio').val(),
                horaFim: $('#txtHoraFim').val(),
                tipoAula: TratarValorNumerico($('#ddlTipoAula').val()),
                justificativa: $('#txtJustificativa').val(),
                codigoTurma: TratarValorNumerico($('#CodigoTurma').val()),
                codigoDisciplina: TratarValorNumerico($('#CodigoDisciplina').val()),
                cpfProfessor: $('.rdlProfessor:checked').val(),
                di: TratarValorNumerico($('.rdlProfessor:checked').attr('di')),
                duracaoAula: TratarValorNumerico($('#ddlTempoAula').val()),
                aulas: aulas,
                codigoDiretoria: $('#CodigoDiretoria').val(),
                codigoEscola: $('#CodigoEscola').val(),
                codigoAulaOriginal: ($("#ddlTipoAula").val() == 1 ? $('#rdlAula:checked').val() : 0),
                dataAulaOriginal: dataAulaOriginal
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == "1") {
                    $('#dialog').html('');
                    $('#dialog').dialog('close');
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
}

var ConfigurarDropDownFiltro = function () {
    $('#CodigoDiretoriaFiltro').autoPreencher($('#CodigoEscolaFiltro'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscolaFiltro').autoPreencher($('#CodigoTipoEnsinoFiltro'), 'TipoEnsino', 'CarregarListaTiposEnsino');
    $('#CodigoTipoEnsinoFiltro').autoPreencher($('#CodigoTurmaFiltro'), 'Turma', 'CarregarListaTurmaPorTipoEnsinoFiltro', ["CodigoEscolaFiltro", "CodigoTipoEnsinoFiltro", "txtAnoLetivoFiltro"]);
    $('#CodigoTurmaFiltro').autoPreencher($('#CodigoDisciplinaFiltro'), 'Disciplina', 'CarregarDisciplinasPorCodigoTurma');
    $('#CodigoDisciplinaFiltro').autoPreencher($('#CpfProfessorFiltro'), 'Professor', 'CarregarListaProfessoresTurmaDisciplinaFiltro', ["CodigoDiretoriaFiltro", "CodigoEscolaFiltro", "CodigoTurmaFiltro", "CodigoDisciplinaFiltro"]);
}

var ValidarFormularioFiltro = function () {
    $('.formFiltro').validate({
        rules: {
            txtAnoLetivoFiltro: {
                required: true
            },
            CodigoDiretoriaFiltro: {
                required: true
            },
            CodigoEscolaFiltro: {
                required: true
            }
        },
        messages: {
            txtAnoLetivoFiltro: {
                required: "Obrigatório"
            },
            CodigoDiretoriaFiltro: {
                required: "Obrigatório"
            },
            CodigoEscolaFiltro: {
                required: "Obrigatório"
            }
        }
    });
}

var PesquisarAulaAvulsa = function () {
    $('#btnPesquisar').click(function (e) {
        e.preventDefault();

        if ($('.formFiltro').valid() == false) {
            return;
        }

        ConsultarAulaAvulsa();
    });
}

var ConsultarAulaAvulsa = function () {
    $.ajax({
        cache: false,
        url: '/AulaAvulsa/ConsultarAulaAvulsa',
        type: 'POST',
        datatype: 'HTML',
        data: {
            anoLetivo: TratarValorNumerico($('#txtAnoLetivoFiltro').val()),
            codigoDiretoria: TratarValorNumerico($('#CodigoDiretoriaFiltro').val()),
            codigoEscola: TratarValorNumerico($('#CodigoEscolaFiltro').val()),
            codigoTipoEnsino: TratarValorNumerico($('#CodigoTipoEnsinoFiltro').val()),
            codigoTurma: TratarValorNumerico($('#CodigoTurmaFiltro').val()),
            codigoDisciplina: TratarValorNumerico($('#CodigoDisciplinaFiltro').val()),
            dataAula: $('#txtDataAulaFiltro').val(),
            tipoAula: TratarValorNumerico($('#ddlTipoAulaFiltro').val()),
            nomeProfessor: $('#txtNomeProfessor').val()
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#result').html(data);
            $('#tabelaDadosResultadoFiltro').sedDataTable({
                columnDefs: [
			        { targets: [5], orderable: false },
                ],
                nomeExportacao: "Reposição de Aula"
            });
            Detalhar();
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

var Detalhar = function () {
    $('.visualizar').click(function () {
        var Codigo = TratarValorNumerico($(this).children().first().val());

        $.ajax({
            cache: false,
            url: '/AulaAvulsa/Detalhar',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigo: Codigo
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialog').html(data);
                Editar();
                Excluir();
                $('#dialog').dialog({
                    width: 1000,
                    title: "Visualizar",
                    draggable: false,
                    modal: true,
                    resizable: false,
                    position: 'top'
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

var Editar = function () {
    $('#btnEditar').click(function () {
        var Codigo = TratarValorNumerico($('#hdfCodigoAulaAvulsa').val());
        $.ajax({
            cache: false,
            url: '/AulaAvulsa/Editar',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigo: Codigo
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialog').html(data);
                AplicarMascaras();
                ValidarFormulario();
                Voltar();
                SalvarEdicao();
                ConfigurarTempoAula();
                $('#ddlTempoAula').val($('#hdfTempoAula').val());
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

var Voltar = function () {
    $('#btnVoltar').click(function () {
        var Codigo = TratarValorNumerico($('#hdfCodigoAulaAvulsa').val());
        $.ajax({
            cache: false,
            url: '/AulaAvulsa/Detalhar',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigo: Codigo
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialog').html(data);
                Editar();
                Excluir();
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

var SalvarEdicao = function () {
    $('#btnSalvarEdicao').click(function (e) {
        e.preventDefault();

        if ($('.form').valid() == false) {
            //$('#tituloData').focus();
            return;
        }

        var horaInicio = TratarValorNumerico($('#txtHoraInicio').val().replace(':', ''));
        var horaFim = TratarValorNumerico($('#txtHoraFim').val().replace(':', ''));

        if (horaInicio >= horaFim) {
            $('#txtHoraFim').focus();

            Mensagem.Alert({
                titulo: "Reposição de Aula",
                mensagem: "Informe um horário final de aula superior ao inicial.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $.ajax({
            cache: false,
            url: '/AulaAvulsa/SalvarEdicao',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigo: TratarValorNumerico($('#hdfCodigoAulaAvulsa').val()),
                dataAula: $('#txtDataAula').val(),
                horaInicio: $('#txtHoraInicio').val(),
                horaFim: $('#txtHoraFim').val(),
                tipoAula: TratarValorNumerico($('#ddlTipoAula').val()),
                justificativa: $('#txtJustificativa').val(),
                duracaoAula: TratarValorNumerico($('#ddlTempoAula').val())
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                if (data == "1") {
                    $('#btnVoltar').trigger('click');
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
}

var Excluir = function () {
    $('#btnExcluir').click(function () {

        var Codigo = TratarValorNumerico($('#hdfCodigoAulaAvulsa').val());

        Mensagem.Alert({
            titulo: "Atenção!",
            mensagem: "Deseja realmente excluir a Reposição de Aula?",
            tipo: "aviso",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.ajax({
                            url: '/AulaAvulsa/Excluir',
                            type: 'POST',
                            dataType: 'HTML',
                            async: true,
                            data: ({
                                codigo: TratarValorNumerico(Codigo),
                            }),
                            success: function (data, textStatus, jqXHR) {
                                if (data == "1") {
                                    $('#dialog').dialog('close');
                                    $('#btnPesquisar').click();
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                Mensagem.CarregarMensagens("Fechar");
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

var ConfigurarTempoAula = function () {
    $('#txtHoraInicio').blur(function () { CalcularTempoAula(); });
    $('#ddlTempoAula').change(function () { CalcularTempoAula(); });
}

var CalcularTempoAula = function () {
    if ($('#txtHoraInicio').val() == '') {
        $('#txtHoraFim').val('');
        return;
    }

    if ($('#ddlTempoAula').val() == '') {
        return;
    }

    var horaInicio = $('#txtHoraInicio').val().split(':');

    var horaCalc = parseInt(horaInicio[0]);
    var minuCalc = parseInt(horaInicio[1]) + parseInt($('#ddlTempoAula').val());

    if (minuCalc > 59) {
        minuCalc = minuCalc - 60;
        horaCalc = horaCalc + 1;
    }

    if (horaCalc == 23) {
        if (minuCalc > 19) {
            $('#txtHoraFim').val('23:59');
            return;
        }
    } else if (horaCalc > 23) {
        $('#txtHoraFim').val('23:59');
        return;
    }

    horaCalc = (horaCalc < 10 ? "0" : "") + horaCalc.toString();
    minuCalc = (minuCalc < 10 ? "0" : "") + minuCalc.toString();

    $('#txtHoraFim').val(horaCalc + ':' + minuCalc);
},

BuscarAulas = function (cpfProfessor) {
    var dataAula = $('#txtDataAulaOriginal').val();

    if (dataAula != "") {
        var escola = $("#CodigoEscola").val();
        var turma = $("#CodigoTurma").val();
        var disciplina = $("#CodigoDisciplina").val();

        atualizarListaAulas(dataAula, escola, turma, disciplina, cpfProfessor);
    }
}


verificaProfessorMarcado = function () {
    if ($('.rdlProfessor:checked').val() != undefined) {
        $('#rdlProfessor').prop('checked', false);
    }
}

monstraAulaOriginal = function (id) {
    $(".DivDataAulaOriginal").hide();
    if (id == 1) {
        $(".DivDataAulaOriginal").show();
    }
}

var atualizarListaAulas = function (DataAula, CodigoEscola, CodigoTurma, CodigoDisciplina, cpfProfessor) {

    $.ajax({
        cache: false,
        url: '/AulaAvulsa/ConsultaAulasPorTurmaDisciplina',
        type: 'POST',
        datatype: 'json',
        data: {
            dataAula: DataAula,
            codigoEscola: CodigoEscola,
            codigoTurma: CodigoTurma,
            codigoDisciplina: CodigoDisciplina,
            cpfProfessor: cpfProfessor
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#dadosAulas').html(data);
            $('#tabelaAulas').sedDataTable();
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

