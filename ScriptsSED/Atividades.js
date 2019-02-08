//===================ANO LETIVO======================
var anoLetivoAnterior;
var linkButton;
var mandeiFechar;
var VerificarMudancaAnoLetivo = function (AnoLetivoForm, Diretoria, Escola, TipoEnsino, Turma, Bimestre, Serie, Disciplina) {
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
                        Bimestre.empty();
                        Bimestre.html(conteudoLimpo);
                        Disciplina.empty();
                        Disciplina.html(conteudoLimpo);
                        Serie.empty();
                        Serie.html(conteudoLimpo);
                        AnoLetivoAnterior = $(obj).val();
                        $("#dadosAtividade").empty();
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

var divEsconde;
var divEsconde1;
function ClickRadio(radio) {
    if (divEsconde == undefined) {
        $(radio).parents("div:first").parents("div:first").children('#divHabilidade' + radio.val()).show();
        divEsconde = radio;
    } else {
        if ($(divEsconde).parents("div:first").parents("div:first").parents("div:first").attr('id') == $(radio).parents("div:first").parents("div:first").parents("div:first").attr('id')) {
            $(divEsconde).parents("div:first").parents("div:first").children('#divHabilidade' + divEsconde.val()).hide();
            $(radio).parents("div:first").parents("div:first").children('#divHabilidade' + radio.val()).show();
            divEsconde = radio;
        } else {
            $(radio).parents("div:first").parents("div:first").children('#divHabilidade' + radio.val()).show();
            $(divEsconde1).parents("div:first").parents("div:first").children('#divHabilidade' + divEsconde1.val()).hide();
            divEsconde1 = radio;
        }

    }

}


function RecuperaNomeTipoAtividade_ExtraiSerie_VerificaBimestre(TipoForm) {
    //Recupera o Nome do Tipo de Atividade

    var NomeTipoAtividade = $("#CodigoTipoAtividade option:selected").text();
    $("#NomeTipoAtividade").attr('value', NomeTipoAtividade);
    //

    //extrai o valor da série de dentro do valor da turma
    var serie = $("#ListaTurmaEditar option:selected").text().substring(0, 1);
    $('input[name="serie"]').attr('value', serie);
    //

    //verifica se a data da atividade está dentro de um bimestre válido (tela de inserção)
    var url = '/Atividade/VerificaDataBimestreValido';

    //tratamento para a data, sem isso, ela chega com o dia e o mês invertido no repositório
    var DtPrevInicio;
    var DtPrevFim;
    var NumeroBimestre;

    if (TipoForm == "Editar") {
        DtPrevInicio = $("input#DataPrevInicioEditar").val().substring(6, 10) + "-" + $("input#DataPrevInicioEditar").val().substring(3, 5) + "-" + $("input#DataPrevInicioEditar").val().substring(0, 2);
        DtPrevFim = $("input#DataPrevFimEditar").val().substring(6, 10) + "-" + $("input#DataPrevFimEditar").val().substring(3, 5) + "-" + $("input#DataPrevFimEditar").val().substring(0, 2);
        NumeroBimestre = $('.selBimestre').val();
    }
    else {//Inserir
        DtPrevInicio = $("input#DataPrevInicio").val().substring(6, 10) + "-" + $("input#DataPrevInicio").val().substring(3, 5) + "-" + $("input#DataPrevInicio").val().substring(0, 2);
        DtPrevFim = $("input#DataPrevFim").val().substring(6, 10) + "-" + $("input#DataPrevFim").val().substring(3, 5) + "-" + $("input#DataPrevFim").val().substring(0, 2);
        NumeroBimestre = $('#ListaBimestreInserir').val();
    }

    var codigoDiretoria = $('#Form' + TipoForm).find('[name=CodigoDiretoria]').val();
    var codigoEscola = $('#Form' + TipoForm).find('[name=CodigoEscola]').val();

    $.ajax({
        url: url,
        type: 'GET',
        data: {
            CodigoDiretoria: codigoDiretoria,
            CodigoEscola: codigoEscola,
            DataPrevInicio: DtPrevInicio,
            DataPrevFim: DtPrevFim,
            NumeroBimestre: NumeroBimestre
        },
        success: function (data) {
            if (data == true) {
                if (ValidarSelecoes(TipoForm)) {
                    MontarHiddenCurriculo();
                    var olaPOST = RecuperarConteudoPlanejado();

                    $('#PreCurriculo').val(olaPOST);

                    if (TipoForm == "Editar")
                        $("#FormEditar").submit();
                    else
                        $("#FormInserir").submit();
                }
            }
            else {
                Mensagem.CarregarMensagens("Fechar");
                return false;
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
    //
}

function ValidarSelecoes(tipoForm) {
    var form = tipoForm == "Editar" ? $("#FormEditar") : $("#FormInserir");

    if ((form.find('.conteudo:checked').length === 0 || form.find('.habilidade:checked').length === 0) && $('.selDescricaoAtividade').val() === "") {
        alert('É obrigatória a seleção de um conteúdo e habilidade ou preencher a descrição da atividade');
        return false;
    }

    return true;
}

function PesquisarAtividade() {
    var url = '/Atividade/PesquisarAtividadeParcial';
    var codigoTurma;
    var codigoSubTurma;
    var codigoDisciplina;
    var codigoProfessor;

    //tratamento para a data, sem isso, ela chega com o dia e o mês invertido no repositório

    var anoPrevistoInicio = $("input#DataPrevistaI").val().substring(6, 10);
    var anoPrevistoFim = $("input#DataPrevistaF").val().substring(6, 10);
    var anoRealizadoInicio = $("input#DataRealizacaoI").val().substring(6, 10);
    var anoRealizadoFim = $("input#DataRealizacaoF").val().substring(6, 10);
    var serie = $('#ddlSerie').val();

    var anoLetivo = $('#AnoLetivo').val();

    if (Date.parse(new Date(anoLetivo, 0, 1)) == NaN) {
        alert('O ano letivo informado não é válido');
        return;
    }

    if ((anoPrevistoInicio != "" && anoPrevistoInicio != anoLetivo) || (anoPrevistoFim != "" && anoPrevistoFim != anoLetivo)
    || (anoRealizadoInicio != "" && anoRealizadoInicio != anoLetivo) || (anoRealizadoFim != "" && anoRealizadoFim != anoLetivo)) {
        alert('As datas selecionadas devem pertencer ao ano letivo informado');
        return;
    }

    var DtPrevInicio = anoPrevistoInicio + "-" + $("input#DataPrevistaI").val().substring(3, 5) + "-" + $("input#DataPrevistaI").val().substring(0, 2);
    var DtPrevFim = anoPrevistoFim + "-" + $("input#DataPrevistaF").val().substring(3, 5) + "-" + $("input#DataPrevistaF").val().substring(0, 2);

    var DtRealizadoInicio = anoRealizadoInicio + "-" + $("input#DataRealizacaoI").val().substring(3, 5) + "-" + $("input#DataRealizacaoI").val().substring(0, 2);
    var DtRealizadoFim = anoRealizadoFim + "-" + $("input#DataRealizacaoF").val().substring(3, 5) + "-" + $("input#DataRealizacaoF").val().substring(0, 2);
    //

    if ($("select#CodigoTurma").val() == "") { codigoTurma = -1; } else { codigoTurma = $("select#CodigoTurma").val(); }
    if ($("select#CodigoSubTurma").val() == "") { codigoSubTurma = 0; } else { codigoSubTurma = $("select#CodigoSubTurma").val(); }
    if ($("select#CodigoDisciplina").val() == null) { codigoDisciplina = -1; } else { codigoDisciplina = $("select#CodigoDisciplina").val(); }
    if ($("select#CPF").val() == null) { codigoProfessor = ""; } else { codigoProfessor = $("select#CPF").val(); }

    $.ajax({
        url: url,
        type: 'GET',
        data: {
            CodigoDiretoria: $("select#CodigoDiretoria").val(),
            CodigoEscola: $("select#CodigoEscola").val(),
            CodigoTurma: codigoTurma,
            CodigoSubTurma: codigoSubTurma,
            CodigoDisciplina: codigoDisciplina,
            CodigoTipoEnsino: $("select#CodigoTipoEnsino").val(),
            CPF: codigoProfessor,
            DataPrevInicio: DtPrevInicio,
            DataPrevFim: DtPrevFim,
            HoraPrevInicio: $("input#HoraPrevistaI").val(),
            HoraPrevFim: $("input#HoraPrevistaF").val(),
            DataRealizadoInicio: DtRealizadoInicio,
            DataRealizadoFim: DtRealizadoFim,
            HoraRealizadoInicio: $("input#HoraRealizacaoI").val(),
            HoraRealizadoFim: $("input#HoraRealizacaoF").val(),
            AnoLetivo: anoLetivo,
            NumeroBimestre: $('#NumeroBimestre').val(),
            serie: serie
        },
        success: function (data) {
            $("div#dadosAtividade").html(data);
            $("#tabelaDados").dataTable({
                "sScrollX": "200%",
                bJQueryUI: true,
                "oLanguage": {
                    "sProcessing": "Carregando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "Não foram encontrados resultados",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
                    "sInfoFiltered": "(filtrado de _MAX_ registros no total)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "Primeiro",
                        "sPrevious": "Anterior",
                        "sNext": "Seguinte",
                        "sLast": "Último"
                    }
                }
            });
        }
    });
}

function MudaStatus(Objeto) {
    var cdAtividade = Objeto.id;
    var status = $(Objeto).is(':checked');

    $.ajax({
        url: "/Atividade/MudaStatus",
        type: "GET",
        data: {
            cdAtividade: cdAtividade,
            status: status
        },
        sucess: function (data) {
            if (data == false) {
                Mensagem.CarregarMensagens("Fechar");
            }
        }
    });
}

function FormularioConsultarAtividade(CodigoAtividade, CodigoDiretoria, CodigoEscola, CodigoTurma, CodigoDisciplina, MostrarBotoes) {
    $.ajax({
        type: 'POST',
        dataType: 'html',
        data: { cdAtividade: CodigoAtividade, cdEscola: CodigoEscola },
        url: '/Atividade/ConsultarAtividade',
        success: function (data, textStatus, jqXHR) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 600,
                width: 830,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                close: function (ev, ui) { $('#formDialog').html(""); }
            });

            AplicarMascaras();

            $('#pesoNota').mask('99');

            if (MostrarBotoes != undefined && MostrarBotoes)
                $('nav#btnsContainer').show();

            CarregarEdicao();

            $('.selDisciplinaSelecionada, .selCurriculoSelecionado').attr('disabled', 'disabled');
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

function FormularioEditarAtividade(CodigoAtividade, CodigoDiretoria, CodigoEscola, CodigoTurma, CodigoDisciplina, TipoEnsino) {
    $.ajax({
        type: 'POST',
        dataType: 'html',
        data: { cdAtividade: CodigoAtividade, cdEscola: CodigoEscola },
        url: '/Atividade/EditarAtividade',
        success: function (data, textStatus, jqXHR) {
            $('#formDialog').html(data);
            mandeiFechar = false;
            $('#formDialog').dialog({
                //height: 600,
                width: 830,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                close: function (ev, ui) {
                    $('#formDialog').html("");
                    $('#formDialog').dialog("close");//Necessário pois o dialog permanecia aberto e em branco mesmo após clicar no botão close (x)
                    AtualizarCalendario();
                }
                ,
                beforeClose: function (event, ui) {
                    //return confirm("Os dados inseridos não foram salvos. Deseja continuar?\r\nOBS: Para salvar os dados, por favor role até o final da página.");

                    if (mandeiFechar) {
                        return true;
                    }

                    Mensagem.Alert({
                        titulo: "Atenção!",
                        mensagem: 'Os dados inseridos não foram salvos. Deseja continuar?<br />OBS.: Para salvar os dados, clique no botão "Cadastrar" localizado no final da página!',
                        tipo: "aviso",
                        botoes: [
                            {
                                botao: "Sim",
                                callback: function () {
                                    mandeiFechar = true;
                                    $('#formDialog').dialog('close');
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

            InicializarPlanejamentoConteudo();

            $('#ListaTipoEnsinoEditar').autoPreencher($('#ListaTurmaEditar'), 'Turma', 'CarregarListaTodasTurmasPorTipoEnsino', ['CodigoEscola', 'CodigoTipoEnsino'], null, $('#FormEditar'), false);

            AplicarMascaras();

            if ($('#selNotaEditar').val() == 1) {
                $('select#valeNota').val(1);
                $('input#pesoNota').prop('disabled', false);
            }
            else {
                $('input#pesoNota').val(0).prop('disabled', true);
            }

            if ($('#selValeNotaEditar').val() == "False") {
                $('#valeNota').prop('disabled', true);
                $("#divPesoNotaEditar").hide();
            }

            $('#pesoNota').mask('99');

            //seta as datas minima e máxima dos datepickers da data prevista
            $("#DataPrevInicioEditar")
                .datepicker("option", "numberOfMonths", 1)
                .datepicker("option", "onSelect", function (selected) {
                    $("#DataPrevFimEditar").datepicker("option", "minDate", selected);
                });

            $("#DataPrevFimEditar")
                .datepicker("option", "numberOfMonths", 1)
                .datepicker("option", "onSelect", function (selected) {
                    $("#DataPrevInicioEditar").datepicker("option", "maxDate", selected);
                });
            //

            //Seta as datas minima e máxima dos datepickers da data de realização
            $("#DataRealizadoInicioEditar")
                .datepicker("option", "numberOfMonths", 1)
                .datepicker("option", "onSelect", function (selected) {
                    $("#DataRealizadoFimEditar").datepicker("option", "minDate", selected);
                });

            $("#DataRealizadoFimEditar")
                .datepicker("option", "numberOfMonths", 1)
                .datepicker("option", "onSelect", function (selected) {
                    $("#DataRealizadoInicioEditar").datepicker("option", "maxDate", selected);
                });
            //

            //validações do form
            $('#FormEditar').validate({
                rules: {
                    CodigoTipoAtividade: "required",
                    NomeEventoCalendario: "required",
                    Apelido: "required",
                    NumeroBimestre: "required",
                    ValeNota: "required",
                    PesoNota: "required",
                    CodigoDiretoria: "required",
                    CodigoEscola: "required",
                    CodigoTipoEnsino: "required",
                    CodigoTurma: "required",
                    CodigoDisciplina: {
                        required: {
                            depends: function (element) {
                                return !$('.selMultidisciplinar').prop('checked');
                            }
                        }
                    },
                    DataPrevInicio: {
                        required: true,
                        dataValida: true
                    },
                    DataPrevFim: {
                        required: true,
                        dataValida: true
                    },
                    DataRealizadoInicio: {
                        dataValida: true
                    },
                    DataRealizadoFim: {
                        dataValida: true
                    },
                    HoraPrevInicio: {
                        horaValida: true
                    },
                    HoraPrevFim: {
                        horaValida: true
                    },
                    HoraRealizadoInicio: {
                        horaValida: true
                    },
                    HoraRealizadoFim: {
                        horaValida: true
                    }
                },
                messages: {
                    CodigoTipoAtividade: "Obrigatório",
                    NomeEventoCalendario: "Obrigatório",
                    Apelido: "Obrigatório",
                    NumeroBimestre: "Obrigatório",
                    ValeNota: "Obrigatório",
                    PesoNota: "Obrigatório",
                    CodigoDiretoria: "Obrigatório",
                    CodigoEscola: "Obrigatório",
                    CodigoTipoEnsino: "Obrigatório",
                    CodigoTurma: "Obrigatório",
                    CodigoDisciplina: "Obrigatório",
                    DataPrevInicio: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    DataPrevFim: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    DataRealizadoInicio: "Data Inválida",
                    DataRealizadoFim: "Data Inválida",
                    HoraPrevInicio: "Hora Inválida",
                    HoraPrevFim: "Hora Inválida",
                    HoraRealizadoInicio: "Hora Inválida",
                    HoraRealizadoFim: "Hora Inválida"
                }
            });
            //
            ChangeValeNota();

            $('#BotaoSalvar').click(function (e) {
                e.preventDefault();
                if ($("#FormEditar").valid()) {
                    mandeiFechar = true;
                    RecuperaNomeTipoAtividade_ExtraiSerie_VerificaBimestre("Editar");
                    //$('#formDialog').dialog('close');
                }
                else {
                    return false;
                }
            });

            CarregarEdicao();
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

function FormularioInserirAtividade(dtInicio, dtFim) {
    var url = '/Atividade/InserirAtividade';

    var cdDiretoria = 0, cdEscola = 0, cdTurma = 0, cdSubTurma = 0;
    var container = $('.selIdsContainer');

    var professor = container.length > 0;

    if (professor) {
        cdDiretoria = container.find('.selCodigoDiretoria').val();
        cdEscola = container.find('.selCodigoEscola').val();
        cdTurma = container.find('.selCodigoTurma').val();
        cdSubTurma = container.find('.selCodigoSubTurma').val();
    }

    $.post(url, { cdturma: cdTurma, cdEscola: cdEscola, dtInicio: dtInicio }, function (form) {
        $('#formDialog').html(form);
        mandeiFechar = false;
        $('#formDialog').dialog({
            //height: 600,
            width: 830,
            draggable: false,
            modal: true,
            resizable: false,
            show: {
                effect: "blind",
                duration: 1000
            },
            position: "top",
            close: function (ev, ui) {
                $('#formDialog').html("");
                $('#formDialog').dialog("close");
                AtualizarCalendario();
            },
            beforeClose: function (event, ui) {
                //return confirm("Os dados inseridos não foram salvos. Deseja continuar?\r\nOBS: Para salvar os dados, por favor role até o final da página.");

                if (mandeiFechar) {
                    return true;
                }

                Mensagem.Alert({
                    titulo: "Atenção!",
                    mensagem: 'Os dados inseridos não foram salvos. Deseja continuar?<br />OBS.: Para salvar os dados, clique no botão "Cadastrar" localizado no final da página!',
                    tipo: "aviso",
                    botoes: [
                        {
                            botao: "Sim",
                            callback: function () {
                                mandeiFechar = true;
                                $('#formDialog').dialog('close');
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

        VerificarMudancaAnoLetivo($("#dropdownlistAnoLetivo"), $("#ListaDiretoriaInserir option[value='']"), $("#ListaEscolaInserir"), $("#ListaTipoEnsinoInserir"), $("#ListaTurmaInserir"), $("#ListaBimestreInserir"), $("#ddlSerieInserir2"), $("#ListaDisciplinaInserir"));

        ValidacoesInserir();

        if (dtInicio != undefined && dtFim != undefined) {
            $('input#DataPrevInicio').val(dtInicio);
            $('input#DataPrevFim').val(dtFim);
        }

        $('#ListaDisciplinaInserir').change(function () {
            if ($(this).find('option:selected').text() != "Selecione...") {
                var turmaCorrente = cdTurma;
                if (turmaCorrente == 0)
                    turmaCorrente = $('#ListaTurmaInserir').val();
                ObterCurriculos(turmaCorrente, $(this).val());

                VerificarValeNota($(this).val());
            }
        });

        if (professor) {
            $('.selCdDiretoria').val(cdDiretoria);
            $('.selCdEscola').val(cdEscola);
            $('.selCdTurma').val(cdTurma);
            $('.selCdSubTurma').val(cdSubTurma);

            var item = $('.selIdTurma[value=' + cdTurma + '][sub=' + cdSubTurma + ']').parents('tr');
            $('.selNomeTurma').val(item.find('.selNomeTurma').text());
            $('.selNomeSubTurma').val(item.find('.selNomeSubTurma').text());
            $('#ListaTipoEnsinoInserir').val(item.find('.selCodigoTipoEnsino').val());
        } else {
            $('#ListaDiretoriaInserir').autoPreencher($('#ListaEscolaInserir'), 'Escola', 'CarregarListaEscolas', undefined, undefined, undefined, undefined, escondeCurriculos);
            $('#ListaEscolaInserir').autoPreencher($('#ListaTipoEnsinoInserir'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'AnoLetivo' }], null, $('#FormInserir'), undefined, escondeCurriculos);
            $('#ListaTipoEnsinoInserir').autoPreencher($('#ListaTurmaInserir'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', ['CodigoEscola', 'CodigoTipoEnsino', 'AnoLetivo'], undefined, $('#FormInserir'), undefined, escondeCurriculos);
            $('#ListaTurmaInserir').change(function () {
                CarregarSubTurmas($(this).val());
            });
            $('#ListaTurmaInserir').autoPreencher($('#ListaBimestreInserir'), 'Bimestre', 'CarregarListaBimestres', ['CodigoTurma'], undefined, $('#abrangencia'));
            $('#ListaTurmaInserir').autoPreencher($('#ListaDisciplinaInserir'), 'Disciplina', 'CarregarListaDisciplinasComQuebras', ['CodigoTurma'], undefined, $('#abrangencia'), undefined, resetarListaDisciplinaInserir);
            $('#ListaTurmaInserir').autoPreencher($('#ddlSerieInserir2'), 'Serie', 'ListaSerieMultisseriada', undefined, undefined, undefined, undefined, function () {
                if ($('#ddlSerieInserir2 option').length > 1) {
                    $('#pSerieNome').show();
                    $('#pSerie').show();
                } else {
                    $('#pSerieNome').hide();
                    $('#pSerie').hide();
                }
            });
        }

        $('#ListaBimestreInserir').change(function () {
            if ($(this).val() != "") {
                $('#ddlSerieInserir2, #ListaDisciplinaInserir').prop('disabled', false);

                if ($('#ListaDisciplinaInserir').val() != "")
                    $('#ListaDisciplinaInserir').trigger('change');
            } else {
                $('#ddlSerieInserir2 > option:first, #ListaDisciplinaInserir > option:first').prop('selected', true);
                $('#ddlSerieInserir2, #ListaDisciplinaInserir').prop('disabled', true);
                escondeCurriculos();
            }
        });

        //$('#ddlSerieInserir2').change(VerificaSerie);
        $('#ddlSerieInserir2').change(function () {
            VerificaSerie();
            $('#ListaDisciplinaInserir').trigger("change");
        });

    });
}

function CarregarSubTurmas(turma) {
    var select = $("#FormInserir").find("#CodigoSubTurma");
    select.empty();
    select.append(new Option("Selecione...", "", true, true));
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
}

function escondeCurriculos() {
    $('#tabsCurriculo').empty();
}

function resetarListaDisciplinaInserir() {
    $("#ListaDisciplinaInserir").val("");
    escondeCurriculos();
}

function VerificaSerie() {
    var serie = $('#ddlSerieInserir2').val();

    $('.abas#curriculo').tabs("enable");

    if (serie == undefined || serie == "")
        return;

    serie = parseInt(serie);

    var series = [];

    $('.abas#curriculo > ul > li > a').each(function () {
        series.push(parseInt(($(this).text()).substr(0, 1)));
    });

    var index = $.inArray(serie, series);
    $('.abas#curriculo').tabs("option", "active", index);

    for (var i in series) {
        if (parseInt(i) != index) {
            // Obtém a tab e deseleciona todos os checkboxes
            var idTab = $('.abas#curriculo > ul > li > a').eq(i).attr('href');
            $(idTab).find('.conteudo, .habilidade').prop('checked', false);

            $('.abas#curriculo').tabs("disable", parseInt(i));
        }
    }
}

function ValidacoesInserir() {
    AplicarMascaras();
    $('#pesoNota').mask('99');

    //Impede que os datepickers da data prevista selecionem datas anteriores ao dia atual e seta as datas minima e máxima de ambos
    //$("#DataPrevInicio")
    //        .datepicker("option", "minDate", new Date())
    //        .datepicker("option", "numberOfMonths", 1)
    //        .datepicker("option", "onSelect", function (selected) {
    //            $("#DataPrevFim").datepicker("option", "minDate", selected);
    //        });

    //$("#DataPrevFim")
    //        .datepicker("option", "minDate", new Date())
    //        .datepicker("option", "numberOfMonths", 1)
    //        .datepicker("option", "onSelect", function (selected) {
    //            $("#DataPrevInicio").datepicker("option", "maxDate", selected);
    //        });


    $("#DataPrevInicio")
        .datepicker("option", "numberOfMonths", 1)
        .datepicker("option", "onSelect", function (selected) {
            $("#DataPrevFim").datepicker("option", "minDate", selected);

            var dtInicio = $('#DataPrevInicio').val();
            if (dtInicio.length == 10) {
                var cdTurma = $('.selCdTurma').val();
                $.post('CarregaDisciplinaPorAtribuicao', { cdTurma: cdTurma, dtInicio: dtInicio }, function (data) {
                    $('#ListaDisciplinaInserir').empty();
                    $('#ListaDisciplinaInserir').append('<option>Selecione...</option>');
                    if (data.length > 0) {
                        $(data).each(function () {
                            $('#ListaDisciplinaInserir').append('<option value="' + this.value + '">' + this.text + '</option>');
                        });
                        $('#ListaBimestreInserir').attr('disabled', false);
                    } else {
                        $('#ListaBimestreInserir option')[0].selected = true;
                        $('#ListaBimestreInserir').attr('disabled', 'disabled');
                    }
                });
            }
        });

    $("#DataPrevFim")
        .datepicker("option", "numberOfMonths", 1)
        .datepicker("option", "onSelect", function (selected) {
            $("#DataPrevInicio").datepicker("option", "maxDate", selected)
        });

    //validações do form
    $('#FormInserir').validate({
        rules: {
            CodigoTipoAtividade: "required",
            NomeEventoCalendario: "required",
            Apelido: "required",
            NumeroBimestre: "required",
            ValeNota: "required",
            PesoNota: "required",
            CodigoDiretoria: "required",
            CodigoEscola: "required",
            CodigoTipoEnsino: "required",
            CodigoTurma: "required",
            CodigoDisciplina: {
                required: {
                    depends: function (element) {
                        return !$('.selMultidisciplinar').prop('checked');
                    }
                }
            },
            DataPrevInicio: {
                required: true,
                dataValida: true
            },
            DataPrevFim: {
                required: true,
                dataValida: true
            },
            DataRealizadoInicio: {
                dataValida: true
            },
            DataRealizadoFim: {
                dataValida: true
            },
            HoraPrevInicio: { horaValida: true },
            HoraPrevFim: { horaValida: true }
        },
        messages: {
            CodigoTipoAtividade: "Obrigatório",
            NomeEventoCalendario: "Obrigatório",
            Apelido: "Obrigatório",
            NumeroBimestre: "Obrigatório",
            ValeNota: "Obrigatório",
            PesoNota: "Obrigatório",
            CodigoDiretoria: "Obrigatório",
            CodigoEscola: "Obrigatório",
            CodigoTipoEnsino: "Obrigatório",
            CodigoTurma: "Obrigatório",
            CodigoDisciplina: "Obrigatório",
            DataPrevInicio: {
                required: "Obrigatório",
                dataValida: "Data Inválida"
            },
            DataPrevFim: {
                required: "Obrigatório",
                dataValida: "Data Inválida"
            },
            DataRealizadoInicio: "Data Inválida",
            DataRealizadoFim: "Data Inválida",
            HoraPrevInicio: "Hora Inválida",
            HoraPrevFim: "Hora Inválida"
        }
    });

    //esse bloco se faz necessário já que a página faz o post via ajax; sem isso, as validações não funcionam
    $("#BotaoSalvar").click(function (e) {
        e.preventDefault();
        if ($("#FormInserir").valid()) {
            mandeiFechar = true;
            RecuperaNomeTipoAtividade_ExtraiSerie_VerificaBimestre("Inserir");
        } else {
            $('.error').first().focus();
        }
    });
}

function AbrirCalendario(turmaId, subTurmaId, ano, mes, linkB) {

    linkButton = linkB;

    if (ano == undefined && mes == undefined) {
        ano = new Date().getFullYear();
        mes = ("0" + (new Date().getMonth() + 1)).slice(-2);
    }

    if (mes == 0) {
        ano = ano - 1;
        mes = 12;
    }
    if (mes == 13) {
        ano = ano + 1;
        mes = 1;
    }

    $.ajax({
        type: "POST",
        cache: false,
        url: '/Atividade/CalendarioTurma',
        data: { turmaId: turmaId, subTurmaId: subTurmaId, ano: ano, mes: mes },
        success: function (data) {
            $('#calendarioAtividades').html(data).show();
            $('fieldset.fieldset').hide();
            $('#Mes').html(ObterMes(mes));
            LimparCalendario();
        }
    });
}

function LimparCalendario() {
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

function FecharCalendario() {
    $('#calendarioAtividades').hide();
    $('fieldset.fieldset').show();
}

function ClonePrevista() {
    $('#DataPrevInicio').keyup(function () {
        var txtClone = $(this).val();
        $('#DataPrevFim').val(txtClone);
    });

};


function CloneRealizado() {
    $('#DataRealizadoInicio').click(function () {

        if ($("#DataPrevInicio").val() == $("#DataPrevFim").val()) {
            $('#DataRealizadoInicio').keyup(function () {
                ListaBimestreInserir
                var txtClone = $(this).val();
                $('#DataRealizadoFim').val(txtClone);

            });
        }
    });
};

function AbrirAtividade(cdAtividade) {
    var codigos = ObterCodigos(cdAtividade);
    FormularioConsultarAtividade(cdAtividade, codigos.cdDiretoria, codigos.cdEscola, codigos.cdTurma, codigos.cdDisciplina, true);
}

function EditarAtividade(cdAtividade) {
    var codigos = ObterCodigos(cdAtividade);
    FormularioEditarAtividade(cdAtividade, codigos.cdDiretoria, codigos.cdEscola, codigos.cdTurma, codigos.cdDisciplina, codigos.tipoEnsino);
}

function ExcluirAtividade(cdAtividade) {
    Mensagem.Alert({
        titulo: "Atenção!",
        mensagem: "Deseja realmente excluir a Atividade?",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        type: "POST",
                        url: "/Atividade/DeletaAtividade",
                        data: { cdAtividade: cdAtividade },
                        success: function (data) {
                            $('#formDialog').dialog("close");
                            $(".ui-dialog-content").dialog("close");
                            $(".ui-dialog-content").html('');
                            $('#formDialog').html('');
                            $('#formDialog').empty();
                            $(linkButton).click();
                            AtualizarCalendario();
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
}

function CriarAtividade(inicio, fim) {
    //var dtInicio = ("0" + inicio.d.getDate() + 1)).slice(-2) + "/" + ("0" + (inicio.d.getMonth() + 1)).slice(-2) + "/" + inicio.d.getFullYear();
    var dtInicio;
    if (inicio.getDay() <= 9)
    {
        if (inicio.getMonth() + 1 <= 9) {
            dtInicio = ("0" + inicio.getDay()) + "/" + ("0" + (inicio.getMonth() + 1)) + "/" + inicio.getYear();
        }
        else {
            dtInicio = (inicio.getDay()) + "/" + ((inicio.getMonth() + 1)) + "/" + inicio.getYear();
        }
    }
    if (inicio.getDay() > 9) {
        if (inicio.getMonth() + 1 <= 9) {
            dtInicio = (inicio.getDay()) + "/" + ("0" + (inicio.getMonth() + 1)) + "/" + inicio.getYear();
        }
        else {
            dtInicio = (inicio.getDay()) + "/" + ((inicio.getMonth() + 1)) + "/" + inicio.getYear();
        }
    }
    
    var dtFim = ("0" + (fim.d.getDate())).slice(-2) + "/" + ("0" + (fim.d.getMonth() + 1)).slice(-2) + "/" + fim.d.getFullYear();

    $.ajax({
        cache: false,
        global: false,
        url: '/Atividade/ValidarPeriodoAtividade',
        type: 'POST',
        datatype: 'JSON',
        data: {
            codigoDiretoria: $('.selCodigoDiretoria').val(),
            codigoEscola: $('.selCodigoEscola').val(),
            dataInicio: dtInicio,
            dataFim: dtFim
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            if (data == true) {
                FormularioInserirAtividade(dtInicio, dtFim);
            } else {
                Mensagem.CarregarMensagens("Fechar");
            }
        }
    });

    //Solicitado Kanban 370, Ocorrência 7, que pudessem ser feitas seleções de dias consecutivos (período de mais de um dia).
    //if (dtInicio != dtFim) {
    //dtInicio = dtFim; 
    //}


}

function ObterCodigos(cdAtividade) {
    var container = $('.selCodigoAtividade[value=' + cdAtividade + ']').parent();
    var cdDiretoria = container.find('.selCodigoDiretoria').val();
    var cdEscola = container.find('.selCodigoEscola').val();
    var cdTurma = container.find('.selCodigoTurma').val();
    var cdDisciplina = container.find('.selCodigoDisciplina').val();
    var tipoEnsino = container.find('.selTipoEnsino').val();

    return {
        cdAtividade: cdAtividade,
        cdDiretoria: cdDiretoria,
        cdEscola: cdEscola,
        cdTurma: cdTurma,
        cdDisciplina: cdDisciplina,
        tipoEnsino: tipoEnsino
    };
}

function ObterMes(mes) {
    switch (mes) {
        case "01":
        case 1:
            return "Janeiro";
        case "02":
        case 2:
            return "Fevereiro";
        case "03":
        case 3:
            return "Março";
        case "04":
        case 4:
            return "Abril";
        case "05":
        case 5:
            return "Maio";
        case "06":
        case 6:
            return "Junho";
        case "07":
        case 7:
            return "Julho";
        case "08":
        case 8:
            return "Agosto";
        case "09":
        case 9:
            return "Setembro";
        case "10":
        case 10:
            return "Outubro";
        case "11":
        case 11:
            return "Novembro";
        case "12":
        case 12:
            return "Dezembro";
        default:
            return "Indefinido";
    }
}

function ObterDisciplinas(idTurma) {
    $.ajax({
        type: "GET",
        cache: false,
        async: false,
        url: '/Disciplina/CarregarListaDisciplinasComQuebras',
        data: ({
            CodigoTurma: idTurma,
            AnoLetivo: parseInt($('#DataPrevInicio').val().substr(6, 4))
        }),
        success: function (data) {
            $(data).each(function () {
                if ($('.selTabelaDisciplinas .selDisciplinaId[value=' + this.value + ']').length === 0) {
                    $('.selTabelaDisciplinas tbody').append('<tr>' +
                        '<td class="botao_atividade"><input type="hidden" value="' + this.value + '" class="selDisciplinaId" />' +
                        '<input type="hidden" value="' + idTurma + '" class="selTurmaId" />' +
                        '<input type="checkbox" class="selDisciplinaSelecionada" /></td>' +
                        '<td class="ellipsis">' + this.text + '</td></tr>');
                }
            });

            $('.selDisciplinaSelecionada').off('change').on('change', function () {
                var elem = $(this).parent();

                if ($(this).prop('checked'))
                    ObterCurriculos(elem.find('.selTurmaId').val(), elem.find('.selDisciplinaId').val());
                else
                    $('.selDisciplinaAssociadaId[value=' + elem.find('.selDisciplinaId').val() + ']').parents('tr').remove();
            });
        }
    });
}

function RemoverTurma(elem) {
    if (!confirm('Deseja Excluir Abrangência da Atividade?')) {
        return false;
    } else {
        var turmaId = elem.find('.selTurmaId').val();
        elem.remove();
        $('.selTabelaDisciplinas').find('.selTurmaId[value=' + turmaId + ']').parents('tr').remove();
        return true;
    }
}

function MontarHiddenCurriculo() {
    //var idsSerie = [];
    //$('#tabs ul li').each(function () {
    //    idsSerie.push($(this).attr('id').substring(2));
    //});
    //
    //$('#tabs div.selDivSerie').each(function (key, value) {
    //    idsSerie.each(function () {
    //        if ($(value.attr('id')).substring(8) == this) {
    //            $(value.find('div')).each(function () {
    //            });
    //        }
    //    });
    //});


    $('.selDivSerie').each(function () {

        var index = GerarIndice();

        $('#hdnCurriculos').append('<input type="hidden" name="Curriculos.Index" value="' + index + '" />' +
            '<input type="hidden" name="Curriculos[' + index + '].NrSerie" value="' + $(this).find('.selSerie').val() + '" />');

        $(this).find('.selHabilidade:checked').each(function () {
            var indexHabilidade = GerarIndice();
            $('#hdnCurriculos').append('<input type="hidden" name="Curriculos[' + index + '].ListaHabilidadeCurriculo.Index" value="' + indexHabilidade + '" />' +
                '<input type="hidden" name="Curriculos[' + index + '].ListaHabilidadeCurriculo[' + indexHabilidade + '].CodigoConteudo" value="' + $(this).parent().siblings('.selCodigoConteudo').val() + '" />' +
                '<input type="hidden" name="Curriculos[' + index + '].ListaHabilidadeCurriculo[' + indexHabilidade + '].CodigoHabilidade" value="' + $(this).val() + '" />');
        });
    });
}

function MontarHiddensDisciplinasCurriculos() {
    var disciplinaIds = $('.selDisciplinaSelecionada:checked').siblings('.selDisciplinaId');
    disciplinaIds.each(function () {
        var index = GerarIndice();
        $('.selTabelaDisciplinas').siblings('.selHiddensContainer').append('<input type="hidden" name="Disciplinas.Index" value="' + index + '" />' +
            '<input type="hidden" name="Disciplinas[' + index + '].CD_DISCIPLINA" value="' + $(this).val() + '" />');
    });

    var curriculoIds = $('.selCurriculoSelecionado:checked').siblings('.selCurriculoId');
    curriculoIds.each(function () {
        var index = GerarIndice();
        $('.selTabelaCurriculos').siblings('.selHiddensContainer').append('<input type="hidden" name="Curriculos.Index" value="' + index + '" />' +
            '<input type="hidden" name="Curriculos[' + index + '].Cod_Curriculo_Item" value="' + $(this).val() + '" />');
    });
}

function CarregarEdicao() {
    CarregarCurriculos();
}

function CarregarCurriculos() {
    $('.selTabelaDisciplinas .selDisciplinaSelecionada:checked').siblings('.selDisciplinaId').each(function () {
        ObterCurriculos($(this).siblings('.selTurmaId').val(), $(this).val());
    });

    $('.selHiddensCurriculos .selCurriculoId').each(function () {
        $('.selTabelaCurriculos .selCurriculoId[value=' + $(this).val() + ']').siblings('.selCurriculoSelecionado').prop('checked', true);
    });
}

function ObterCurriculos(cdTurma, cdDisciplina) {
    var AnoLetivo = $('#dropdownlistAnoLetivo').val();
    var Bimestre = $('#ListaBimestreInserir').val();
    var CD_TIPO_ENSINO = $('#ListaTipoEnsinoInserir').val();
    var serie = $('#ddlSerieInserir2').val() == "" ? 0 : parseInt($('#ddlSerieInserir2').val());
    listaDisciplina = [];
    listaTurma = [];
    listaCurriculo2 = [];
    listaDisciplina.push({ Disciplina: { CD_DISCIPLINA: cdDisciplina } });
    listaTurma.push({ Turma: { CD_TURMA: cdTurma } });
    listaCurriculo2.push({ Curriculo: { AnoLetivo: AnoLetivo, Bimestre: Bimestre, CD_TIPO_ENSINO: CD_TIPO_ENSINO } });

    $.ajax({
        type: "POST",
        url: '/Atividade/CurriculoParcial',
        data: { listaTurma: JSON.stringify(listaTurma), listaDisciplina: JSON.stringify(listaDisciplina), curriculo: JSON.stringify(listaCurriculo2), serie: serie },
        success: function (data) {
            $(data).each(function (key, curriculo) {
                $('#tabsCurriculo').empty();
                $('#tabsCurriculo').html(data);
                InicializarPlanejamentoConteudo();
                VerificaSerie();
            });
        }
    });
}

function FecharDialog(data) {
    if (data != undefined) {
        if (data.Sucesso == true) {
            $('#formDialog').dialog("close");
            $(".ui-dialog-content").dialog("close");
            $(".ui-dialog-content").html('');
            $('#formDialog').html('');
            $('#formDialog').empty();
            $(linkButton).click();
        }
    }
}

function FecharDialogAtualizar(data) {
    FecharDialog(data);
    PesquisarAtividade();
}

function HabilitaAdicionar(ddl) {
    if ($(ddl).val().length > 0) {
        $('.selAddTurma').prop("disabled", "");
    }
    else {
        $('.selAddTurma').prop("disabled", "disabled");
    }
}

function VerificarValeNota(cdDisciplina) {

    var serie = $('#ddlSerieInserir2').val();
    if (serie === undefined || serie === "")
        serie = 0;

    $.ajax({
        type: "POST",
        url: '/Atividade/VerificarValeNota',
        data: { cdTipoEnsino: $('#ListaTipoEnsinoInserir').val(), cdDisciplina: cdDisciplina, anoLetivo: $('#dropdownlistAnoLetivo').val(), serie: serie },
        success: function (data) {
            if (data.ValeNota) {
                $('#valeNota').prop('disabled', false);
                $('#divPesoNota').show();
            } else {
                $('#valeNota').prop('disabled', true);
                $('#pesoNota').val(0);
                $('#divPesoNota').hide();
            }

            if ($('#valeNota').val() == '0') {
                $('#pesoNota').val('0');
                $('#pesoNota').attr('disabled', 'disabled');
            } else {
                $('#pesoNota').removeAttr('disabled');
            }
        }
    });
}

function ChangeValeNota() {
    if ($('#valeNota').val() == "0")
        $('#pesoNota').val(0).prop('disabled', true);
    else
        $('#pesoNota').prop('disabled', false);
}

var AtualizarCalendario = function () {

    if ($('#hdfAnoCalendario').val() == undefined ||
        $('#hdfMesCalendario').val() == undefined ||
        $('#hdfTurmaCalendario').val() == undefined) {
        return;
    }

    mes = $('#hdfMesCalendario').val();

    if (mes < 10) {
        mes = "0" + mes.toString();
    }

    $.ajax({
        type: "POST",
        cache: false,
        url: '/Atividade/CalendarioTurma',
        data: {
            turmaId: $('#hdfTurmaCalendario').val(),
            ano: $('#hdfAnoCalendario').val(),
            mes: $('#hdfMesCalendario').val()
        },
        success: function (data) {
            $('#calendarioAtividades').html(data)
            // $('fieldset.fieldset').hide();
            $('#Mes').html(ObterMes(mes));
            LimparCalendario();
        }
    });
}

var DeletarAtividade = function (id) {
    var result = confirm('Tem certeza que deseja excluir essa atividade?');

    if (result) {
        $.ajax({
            url: '/Atividade/DeletaAtividade',
            type: 'POST',
            data: {
                cdAtividade: id
            },
            success: function (data) {
                if (data) {
                    PesquisarAtividade();
                }
            }
        });
    }
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