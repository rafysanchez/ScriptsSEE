    //===================ANO LETIVO======================
var anoLetivoAnterior;
var linkButton;
var VerificarMudancaAnoLetivo = function (AnoLetivoForm, Diretoria, Escola, TipoEnsino, Serie, Turma, Aluno, divEscola, divTipoEnsino, divSerie, divTurma, divAluno) {
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
        
    };
};
//======================================================


function AtualizarCalendario(codigoDiretoria, codigoEscola, filtroEscola, filtroDiretoria, filtroTodos, filtroEventosInativos, ano, mes) {
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

    if (((filtroDiretoria == 1 && codigoDiretoria > 0) || filtroDiretoria == 0)
        && ((filtroEscola == 1 && codigoEscola > 0) || filtroEscola == 0)) {
        $.ajax({
            type: "POST",
            cache: false,
            url: '/Calendario/FiltrarCalendario',
            data: { codigoDiretoria: codigoDiretoria, codigoEscola: codigoEscola, filtroEscola: filtroEscola, filtroDiretoria: filtroDiretoria, filtroTodos: filtroTodos, filtroEventosInativos: filtroEventosInativos, ano: ano, mes: mes },
            success: function (data) {
                $('#divCalendario').html(data).show();
                $('#Mes').html(ObterMes(mes, ano));
                $('#mesAtual').val(mes);
                $('#anoAtual').val(ano);
                LimparCalendario();
            }
        });
    }
}

function AtualizarCalendarioDireto(codigoDiretoria, codigoEscola, filtroEscola, filtroDiretoria, filtroTodos, filtroEventosInativos, ano, mes) {
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
        url: '/Calendario/FiltrarCalendario',
        data: { codigoDiretoria: codigoDiretoria, codigoEscola: codigoEscola, filtroEscola: filtroEscola, filtroDiretoria: filtroDiretoria, filtroTodos: filtroTodos, filtroEventosInativos: filtroEventosInativos, ano: ano, mes: mes },
        success: function (data) {
            $('#divCalendario').html(data).show();
            $('#Mes').html(ObterMes(mes, ano));
            $('#mesAtual').val(mes);
            $('#anoAtual').val(ano);
            LimparCalendario();
        }
    });
}

function LimparCalendario() {
    $.expr[':'].contentIs = function (el, idx, meta) {
        return $(el).text() === meta[3];
    };
    $(':contentIs(DEMO)').remove();

    ConfigurarCalendarioMes();
}


function ObterMes(mes, ano) {
    switch (mes) {
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


function Inserir(start, end) {
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/Calendario/Inserir?inicio=' + start + "&fim=" + end,
        success: function (data) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                title: "Cadastro de Evento",
                width: 820,
                draggable: true,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 200
                },
                position: "top"
            });

            $('#ListaDiretoria').autoPreencher($('#ListaEscola'), 'Escola', 'CarregarListaEscolas', undefined, undefined, undefined, true, PosCargaEscola);
            $('#ListaEscola').autoPreencher($('#ListaTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'AnoLetivo' }], undefined, undefined, true, PosCargaTipoEnsino);
            $('#ListaTipoEnsino').autoPreencher($('#ListaSerie'), 'TipoEnsino', 'CarregarListaSerie', undefined, undefined, undefined, true, PosCargaSerie);
            $('#ListaTipoEnsino').autoPreencher($('#ListaTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', ['CodigoTipoEnsino', 'CodigoEscola', 'AnoLetivo'], undefined, undefined, true, PosCargaTurma);
            $('#ListaSerie').autoPreencher($('#ListaTurma'), 'Turma', 'CarregaListaTurmaMultisseriadaPorSerie', ['CodigoTipoEnsino', 'CodigoEscola', 'Serie', 'AnoLetivo'], undefined, undefined, true, PosCargaTurma);
            $('#ListaTurma').autoPreencher($('#ListaAluno'), 'Aluno', 'CarregarListaAlunoPorTurma', undefined, undefined, undefined, true, PosCargaAluno);

            $('.ddlCampoAbrangencia').change(function () {
                if ($(this).val() != '') {
                    var container = $(this).parents('.selCampo');
                    container.next().show();

                    var index = $('.selCampo').index(container);

                    $('.selCampo').filter(function () {
                        return $('.selCampo').index($(this)) < index + 1;
                    }).show();

                    $('.selCampo').filter(function () {
                        return $('.selCampo').index($(this)) > index + 1;
                    }).hide();
                } else
                    AtualizarTexto($('.selCampo').filter(function () { return $(this).find('.ddlCampoAbrangencia').val() == ''; }).first().find('.ddlCampoAbrangencia'), true);

                AtualizarOptionLabels();
            });

            $('#ListaAluno').change(function () {
                if ($(this).val() != '')
                    AtualizarTexto();
            });

            IniciaTela();
            AplicarMascaras();
            AtualizarTexto();

            if ($('#perfilUsuario').val() == "Diretoria")
                $('#ListaDiretoria').addClass("required");

            if ($('#perfilUsuario').val() == "Escola" || $('#perfilUsuario').val() == "Professor") {
                $('#ListaDiretoria').addClass("required");
                $('#ListaEscola').addClass("required");
            }

            //validações do form
            $('#formInserir').validate({
                rules: {
                    NomeDoEvento: "required",
                    classificacao: "required",
                    DataDeInicioPlanejado: {
                        required: true,
                        dataValida: true
                    },
                    DataDeFimPlanejado: {
                        dataValida: true
                    },
                    DataDeInicioRealizado: {
                        dataValida: true
                    },
                    DataDeFimRealizado: {
                        dataValida: true
                    },
                    AnoLetivo: "required",
                    HoraDeInicioPlanejado: { horaValida: true },
                    HoraDeFimPlanejado: { horaValida: true },
                    HoraDeInicioRealizado: { horaValida: true },
                    HoraDeFimRealizado: { horaValida: true }
                },
                messages: {
                    NomeDoEvento: "Obrigatório",
                    classificacao: "Obrigatório",
                    DataDeInicioPlanejado: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    DataDeFimPlanejado: {
                        dataValida: "Data Inválida"
                    },
                    DataDeInicioRealizado: {
                        dataValida: "Data Inválida"
                    },
                    DataDeFimRealizado: {
                        dataValida: "Data Inválida"
                    },
                    AnoLetivo: "Obrigatório",
                    HoraDeInicioPlanejado: { horaValida: "Hora Inválida" },
                    HoraDeFimPlanejado: { horaValida: "Hora Inválida" },
                    HoraDeInicioRealizado: { horaValida: "Hora Inválida" },
                    HoraDeFimRealizado: { horaValida: "Hora Inválida" }
                }
            });

            $('#BotaoSalvar').click(function (e) {
                e.preventDefault();
                if ($("#formInserir").valid()) {
                    VerificaInserir("Inserir");
                }
                else {
                    return false;
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


function PosCargaEscola() {
    AtualizarTexto($('#ListaEscola'));

    if ($('#ListaEscola').children().length > 1) {
        $('#divEscola').css("visibility", "visible");
        $('#divTipoEnsino').css("visibility", "hidden");
        $('#divEscola').show();
        $('#divTipoEnsino').hide();
    } else {
        $('#divEscola').css("visibility", "hidden");
        $('#divTipoEnsino').css("visibility", "visible");
        $('#divEscola').hide();
        $('#divTipoEnsino').show();
    }
}


function PosCargaTipoEnsino() {
    AtualizarTexto($('#ListaTipoEnsino'));

    if ($('#ListaTipoEnsino').children().length > 1) {
        $('#divTipoEnsino').css("visibility", "visible");
        $('#divSerie').css("visibility", "hidden");
        $('#divTipoEnsino').show();
        $('#divSerie').hide();
    } else {
        $('#divTipoEnsino').css("visibility", "hidden");
        $('#divSerie').css("visibility", "visible");
        $('#divTipoEnsino').hide();
        $('#divSerie').show();
    }
}


function PosCargaSerie() {
    AtualizarTexto($('#ListaSerie'));

    if ($('#ListaSerie').children().length > 1) {
        $('#divSerie').css("visibility", "visible");
        $('#divTurma').css("visibility", "hidden");
        $('#divSerie').show();
        $('#divTurma').hide();
    } else {
        $('#divSerie').css("visibility", "hidden");
        $('#divTurma').css("visibility", "visible");
        $('#divSerie').hide();
        $('#divTurma').show();
    }
}


function PosCargaTurma() {
    AtualizarTexto($('#ListaTurma'));

    if ($('#ListaSerie').children().length > 1) {
        $('#divSerie').css("visibility", "visible");
        $('#divSerie').show();
        if ($('#ListaSerie').val() > 0) {
            $('#divTurma').css("visibility", "visible");
            $('#divTurma').show();
        }
    } else {
        $('#divSerie').css("visibility", "hidden");
        $('#divSerie').hide();
        $('#divTurma').css("visibility", "visible");
        $('#divTurma').show();
    }
}


function PosCargaAluno() {
    AtualizarTexto($('#ListaAluno'));

    if ($('#ListaSerie').val() == "") {
        $('#divSerie').css("visibility", "hidden");
        $('#divSerie').hide();
    }

    $('#ListaAluno').change(function () {
        if ($('#ListaSerie').val() == "") {
            $('#divSerie').css("visibility", "hidden");
            $('#divSerie').hide();
        }
    });
}


function AtualizarTexto(ultimo, editarVisualizar, obterValue) {
    var ultimoCampo;

    if (ultimo != undefined && ultimo.length > 0 && editarVisualizar != undefined && editarVisualizar)
        ultimoCampo = ultimo;
    else
        ultimoCampo = $('.ddlCampoAbrangencia:visible').last();

    var container = ultimoCampo.parents('.selCampo');
    var str;

    if (ultimoCampo.val() == '') {
        var txtTudoAtual = container.hasClass('selMasc') ? "todos os " : "todas as ";
        str = '* Esse evento será abrangente para ' + txtTudoAtual + container.find('.selNomePlural').val();

        $('#txtAbrangencia').html(IteracaoTexto(str, $('.selCampo').index(container), obterValue));
    }
    else {
        var txtArtigo = container.hasClass('selMasc') ? "o " : "a ";
        str = '* Esse evento será abrangente para ' + txtArtigo + container.find('.selNomeSingular').val() + ' <span class="bold">' + ultimoCampo.find('option:selected').text() + '</span>';

        $('#txtAbrangencia').html(IteracaoTexto(str, $('.selCampo').index(container), obterValue));
    }
}


function IteracaoTexto(str, index, obterValue) {
    $($('.selCampo').filter(function () { return $('.selCampo').index($(this)) < index; }).get().reverse()).each(function () {
        var containerAtual = $(this);
        var txtArtigoAtual = containerAtual.hasClass('selMasc') ? " do " : " da ";
        if (containerAtual.find('.ddlCampoAbrangencia').val() > 0) {
            str += txtArtigoAtual + containerAtual.find('.selNomeSingular').val() + ' <span class="bold">'.concat(obterValue != undefined && obterValue ? containerAtual.find('.ddlCampoAbrangencia').val() : containerAtual.find('.ddlCampoAbrangencia option:selected').text()) + '</span>';
        }
    });

    return str;
}


function AtualizarOptionLabels() {
    $('.selCampo').each(function () {
        var ddlCampoAbrangencia = $(this).find('.ddlCampoAbrangencia');
        if (ddlCampoAbrangencia.val() == '')
            ddlCampoAbrangencia.find('option:first').text($(this).hasClass('selMasc') ? "Todos" : "Todas");
    });
}


function Visualizar(codigo) {
    var codigoDiretoria = 0;
    var codigoEscola = 0;

    if ($('#PesquisaDiretoria').val() != undefined) {
        codigoDiretoria = $('#PesquisaDiretoria').val().length > 0 ? parseInt($('#PesquisaDiretoria').val()) : 0;
    }

    if ($('#PesquisaEscola').val() != undefined) {
        codigoEscola = $('#PesquisaEscola').val().length > 0 ? parseInt($('#PesquisaEscola').val()) : 0;
    }

    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/Calendario/Visualizar',
        data: {
            codigoEvento: parseInt(codigo),
            codigoDiretoria: codigoDiretoria,
            codigoEscola: codigoEscola
        },
        success: function (data) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                title: "Visualizar Evento",
                width: 820,
                draggable: true,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 200
                },
                position: "top"
            });

            AtualizarTexto($('.selCampo').filter(function () { return $(this).find('.ddlCampoAbrangencia').val() == ''; }).first().find('.ddlCampoAbrangencia'), true, true);
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


function Editar(codigo) {
    var codigoDiretoria = $('#PesquisaDiretoria').val().length > 0 ? parseInt($('#PesquisaDiretoria').val()) : 0;
    var codigoEscola = $('#PesquisaEscola').val().length > 0 ? parseInt($('#PesquisaEscola').val()) : 0;

    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: '/Calendario/Editar',
        data: {
            codigoEvento: parseInt(codigo),
            codigoDiretoria: codigoDiretoria,
            codigoEscola: codigoEscola
        },
        success: function (data) {
            $('#formDialog').html(data);

            $('#formDialog').dialog({
                //height: 600,
                width: 820,
                draggable: true,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 200
                },
                position: "top"
            });

            IniciaTela();
            AplicarMascaras();

            $('#ListaDiretoria').autoPreencher($('#ListaEscola'), 'Escola', 'CarregarListaEscolas', null, $('#selCodigoEscola').val(), $('#formEditar'), true, AtualizarTexto);
            $('#ListaEscola').autoPreencher($('#ListaTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'AnoLetivo' }], $('#selCodigoTipoEnsino').val(), undefined, true, AtualizarTexto);
            $('#ListaTipoEnsino').autoPreencher($('#ListaSerie'), 'TipoEnsino', 'CarregarListaSerie', null, $('#selSerie').val(), undefined, true, PosCargaSerie);
            $('#ListaTipoEnsino').autoPreencher($('#ListaTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', ['CodigoTipoEnsino', 'CodigoEscola', 'AnoLetivo'], $('#selSerie').val(), undefined, true, PosCargaTurma);
            $('#ListaSerie').autoPreencher($('#ListaTurma'), 'Turma', 'CarregaListaTurmaMultisseriadaPorSerie', ['CodigoTipoEnsino', 'CodigoEscola', 'Serie', 'AnoLetivo'], $('#selCodigoTurma').val(), undefined, true, PosCargaTurma);
            $('#ListaTurma').autoPreencher($('#ListaAluno'), 'Aluno', 'CarregarListaAlunoPorTurma', null, $('#selAluno').val(), undefined, true, PosCargaAluno);

            $('.ddlCampoAbrangencia').change(function () {
                if ($(this).val() != '') {
                    var container = $(this).parents('.selCampo');
                    container.next().show();

                    var index = $('.selCampo').index(container);
                    $('.selCampo').filter(function () {
                        return $('.selCampo').index($(this)) > index + 1;
                    }).hide();
                }

                AtualizarOptionLabels();
            });

            $('#ListaAluno').change(function () {
                if ($(this).val() != '')
                    AtualizarTexto();
            });

            if ($('#perfilUsuario').val() == "Diretoria")
                $('#ListaDiretoria').addClass("required");

            if ($('#perfilUsuario').val() == "Escola" || $('#perfilUsuario').val() == "Professor") {
                $('#ListaDiretoria').addClass("required");
                $('#ListaEscola').addClass("required");
            }

            if ($('#hiddenTipoEventoAtivo').val() == 0) {
                $("input#Ativo").prop('disabled', 'disabled');
                $("select#ListaTipoEvento").prop('disabled', 'disabled');
                $("input#NomeDoEvento").prop('disabled', 'disabled');
                $("#txtDescricaoEvento").prop('disabled', 'disabled');
                $("select#classificacao").prop('disabled', 'disabled');
                $("input#textboxPeriodoIniPlanejado").prop('disabled', 'disabled');
                $("input#textboxPeriodoFimPlanejado").prop('disabled', 'disabled');
                $("input#textboxHoraIniPlanejado").prop('disabled', 'disabled');
                $("input#textboxHoraFimPlanejado").prop('disabled', 'disabled');
                $("select#ListaDiretoria").prop('disabled', 'disabled');
                $("select#ListaEscola").prop('disabled', 'disabled');
                $("select#ListaTipoEnsino").prop('disabled', 'disabled');
                $("select#ListaSerie").prop('disabled', 'disabled');
                $("select#ListaTurma").prop('disabled', 'disabled');
                $("select#ListaAluno").prop('disabled', 'disabled');
                $("select#ListaPerfil").prop('disabled', 'disabled');
            }

            AtualizarTexto($('.selCampo').filter(function () { return $(this).find('.ddlCampoAbrangencia').val() == ''; }).first().find('.ddlCampoAbrangencia'), true);

            //validações do form
            $('#formEditar').validate({
                rules: {
                    NomeDoEvento: "required",
                    classificacao: "required",
                    DataDeInicioPlanejado: {
                        required: true,
                        dataValida: true
                    },
                    DataDeFimPlanejado: {
                        dataValida: true
                    },
                    DataDeInicioRealizado: {
                        dataValida: true
                    },
                    DataDeFimRealizado: {
                        dataValida: true
                    },
                    HoraDeInicioPlanejado: { horaValida: true },
                    HoraDeFimPlanejado: { horaValida: true },
                    HoraDeInicioRealizado: { horaValida: true },
                    HoraDeFimRealizado: { horaValida: true }
                },
                messages: {
                    NomeDoEvento: "Obrigatório",
                    classificacao: "Obrigatório",
                    DataDeInicioPlanejado: {
                        required: "Obrigatório",
                        dataValida: "Data Inválida"
                    },
                    DataDeFimPlanejado: {
                        dataValida: "Data Inválida"
                    },
                    DataDeInicioRealizado: {
                        dataValida: "Data Inválida"
                    },
                    DataDeFimRealizado: {
                        dataValida: "Data Inválida"
                    },
                    HoraDeInicioPlanejado: { horaValida: "Hora Inválida" },
                    HoraDeFimPlanejado: { horaValida: "Hora Inválida" },
                    HoraDeInicioRealizado: { horaValida: "Hora Inválida" },
                    HoraDeFimRealizado: { horaValida: "Hora Inválida" }
                }
            });

            $('#BotaoSalvar').click(function (e) {
                e.preventDefault();
                if ($("#formEditar").valid()) {
                    VerificaInserir("Editar");
                }
                else {
                    return false;
                }
            });

            if ($("select#ListaEscola").find('option').length == 1) {
                $('#ListaDiretoria').trigger("change");
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


function IniciaTela() {

    $('select#classificacao').val($('#Classificacao').val()).change();

    $("#textboxPeriodoIniPlanejado").datepicker({
        numberOfMonths: 1,
        onSelect: function (selected) {
            $("#textboxPeriodoFimPlanejado").datepicker("option", "minDate", selected);
            if ($("#textboxPeriodoFimPlanejado").val().length == 0)
                $("#textboxPeriodoFimPlanejado").val($("#textboxPeriodoIniPlanejado").val());
        }
    });

    $("#textboxPeriodoFimPlanejado").datepicker({
        numberOfMonths: 1,
        onSelect: function (selected) {
            $("#textboxPeriodoIniPlanejado").datepicker("option", "maxDate", selected);
        }
    });

    $("#textboxPeriodoIniRealizado").datepicker({
        numberOfMonths: 1,
        onSelect: function (selected) {
            $("#textboxPeriodoFimRealizado").datepicker("option", "minDate", selected);
            if ($("#textboxPeriodoFimRealizado").val().length == 0)
                $("#textboxPeriodoFimRealizado").val($("#textboxPeriodoIniRealizado").val());

        }
    });
    $("#textboxPeriodoFimRealizado").datepicker({
        numberOfMonths: 1,
        onSelect: function (selected) {
            $("#textboxPeriodoIniRealizado").datepicker("option", "maxDate", selected);
        }
    });

    // $('.hora').blur(function () { Verifica_Hora(this); ComparaHora(); });

    $('select#classificacao').change(function () {
        $('#Classificacao').val($(this).val());
    });
}


function VerificaInserir(form) {
    if (!VerificarComportamento())
        return false;

    var selCodigoPerfilLimite;

    if ($("select#ListaPerfil").val() > 0 && $("select#ListaPerfil").val() != "")
        selCodigoPerfilLimite = $("select#ListaPerfil").val();
    else
        selCodigoPerfilLimite = $("#selCodigoPerfil").val();

    var Cd_Tp_Evento_Calendario;
    if ($("#Flag_EventoEscola").val() == 1) {//evento escolar
        Cd_Tp_Evento_Calendario = $("#hdnCodigoTipoEventoCalendario").val();
    }
    else {//Flag_EventoEscola = 0 / evento não escolar
        Cd_Tp_Evento_Calendario = $("select#ListaTipoEvento").val();
    }

    var url = '/Calendario/VerificaInserir';
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            Ativo: $("input#Ativo").prop("checked"),
            CodigoEventoCalendario: $("#hiddenCodigoEvento").val(),
            CodigoTipoEventoCalendario: Cd_Tp_Evento_Calendario,
            NomeDoEvento: $("input#NomeDoEvento").val(),
            DescricaoEventos: $("#txtDescricaoEvento").val(),
            Classificacao: $("select#classificacao").val(),
            DataDeInicioPlanejado: $("input#textboxPeriodoIniPlanejado").val(),
            DataDeFimPlanejado: $("input#textboxPeriodoFimPlanejado").val(),
            DataDeInicioRealizado: $("input#textboxPeriodoIniRealizado").val(),
            DataDeFimRealizado: $("input#textboxPeriodoFimRealizado").val(),
            HoraDeInicioPlanejado: $("input#textboxHoraIniPlanejado").val(),
            HoraDeFimPlanejado: $("input#textboxHoraFimPlanejado").val(),
            HoraDeInicioRealizado: $("input#textboxHoraIniRealizado").val(),
            HoraDeFimRealizado: $("input#textboxHoraFimRealizado").val(),
            CodigoDiretoria: $("select#ListaDiretoria").val(),
            CodigoEscola: $("select#ListaEscola").val(),
            CodigoTipoEnsino: $("select#ListaTipoEnsino").val(),
            Serie: $("select#ListaSerie").val(),
            CodigoTurma: $("select#ListaTurma").val(),
            Aluno: $("select#ListaAluno").val(),
            CodigoPerfilLimite: parseInt(selCodigoPerfilLimite)
        },
        success: function (data) {
            if (data == true) {
                if (form == "Inserir") {
                    InserirCalendario();
                }
                else if (form == "Editar") {
                    EditarCalendario();
                }
            }
        }
    });
}


function InserirCalendario() {
    var url = '/Calendario/InserirCalendario';
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            Ativo: $("input#Ativo").prop("checked"),
            CodigoTipoEventoCalendario: $("select#ListaTipoEvento").val(),
            NomeDoEvento: $("input#NomeDoEvento").val(),
            DescricaoEventos: $("#txtDescricaoEvento").val(),
            Classificacao: $("select#classificacao").val(),
            DataDeInicioPlanejado: $("input#textboxPeriodoIniPlanejado").val(),
            DataDeFimPlanejado: $("input#textboxPeriodoFimPlanejado").val(),
            DataDeInicioRealizado: $("input#textboxPeriodoIniRealizado").val(),
            DataDeFimRealizado: $("input#textboxPeriodoFimRealizado").val(),
            HoraDeInicioPlanejado: $("input#textboxHoraIniPlanejado").val(),
            HoraDeFimPlanejado: $("input#textboxHoraFimPlanejado").val(),
            HoraDeInicioRealizado: $("input#textboxHoraIniRealizado").val(),
            HoraDeFimRealizado: $("input#textboxHoraFimRealizado").val(),
            CodigoDiretoria: $("select#ListaDiretoria").val(),
            CodigoEscola: $("select#ListaEscola").val(),
            CodigoTipoEnsino: $("select#ListaTipoEnsino").val(),
            Serie: $("select#ListaSerie").val(),
            CodigoTurma: $("select#ListaTurma").val(),
            Aluno: $("select#ListaAluno").val(),
            CodigoPerfilLimite: $("select#ListaPerfil").val(),
            AnoLetivo: $("input#AnoLetivo").val()
        },
        success: function (data) {
            $("#formDialog").dialog("close");

            if ($('#anoAtual').val() == undefined || $('#mesAtual').val() == undefined) {
                AtualizarCalendario($("#hiddenDiretoria").attr('value'), $("#hiddenEscola").attr('value'), $("#hiddenFiltroEscola").attr('value'), $("#hiddenFiltroDiretoria").attr('value'), $("#hiddenFiltroTodos").attr('value'), $("#hiddenFiltroEventosInativos").attr('value'));
            } else {
                AtualizarCalendario($("#hiddenDiretoria").attr('value'), $("#hiddenEscola").attr('value'), $("#hiddenFiltroEscola").attr('value'), $("#hiddenFiltroDiretoria").attr('value'), $("#hiddenFiltroTodos").attr('value'), $("#hiddenFiltroEventosInativos").attr('value'), parseInt($('#anoAtual').val()), parseInt($('#mesAtual').val()));
            }
        }
    });
}


function EditarCalendario() {
    var Cd_Tp_Evento_Calendario;

    var selCodigoPerfilLimite;

    if ($("select#ListaPerfil").val() > 0 && $("select#ListaPerfil").val() != "") {
        selCodigoPerfilLimite = $("select#ListaPerfil").val();
    } else {
        selCodigoPerfilLimite = $("#selCodigoPerfil").val();
    }

    if ($("#Flag_EventoEscola").val() == 1) {//evento escolar
        Cd_Tp_Evento_Calendario = $("#hdnCodigoTipoEventoCalendario").val();
    }
    else {//Flag_EventoEscola = 0 / evento não escolar
        Cd_Tp_Evento_Calendario = $("select#ListaTipoEvento").val();
    }

    var url = '/Calendario/EditarCalendario';
    $.ajax({
        url: url,
        type: 'POST',
        data: {
            CodigoEventoCalendario: $("#hiddenCodigoEvento").attr('value'),
            Ativo: $("input#Ativo").prop("checked"),
            CodigoTipoEventoCalendario: Cd_Tp_Evento_Calendario,
            NomeDoEvento: $("input#NomeDoEvento").val(),
            DescricaoEventos: $("#txtDescricaoEvento").val(),
            Classificacao: $("select#classificacao").val(),
            DataDeInicioPlanejado: $("input#textboxPeriodoIniPlanejado").val(),
            DataDeFimPlanejado: $("input#textboxPeriodoFimPlanejado").val(),
            DataDeInicioRealizado: $("input#textboxPeriodoIniRealizado").val(),
            DataDeFimRealizado: $("input#textboxPeriodoFimRealizado").val(),
            HoraDeInicioPlanejado: $("input#textboxHoraIniPlanejado").val(),
            HoraDeFimPlanejado: $("input#textboxHoraFimPlanejado").val(),
            HoraDeInicioRealizado: $("input#textboxHoraIniRealizado").val(),
            HoraDeFimRealizado: $("input#textboxHoraFimRealizado").val(),
            CodigoDiretoria: $("select#ListaDiretoria").val(),
            CodigoEscola: $("select#ListaEscola").val(),
            CodigoTipoEnsino: $("select#ListaTipoEnsino").val(),
            Serie: $("select#ListaSerie").val(),
            CodigoTurma: $("select#ListaTurma").val(),
            Aluno: $("select#ListaAluno").val(),
            CodigoPerfilLimite: parseInt(selCodigoPerfilLimite),
            AnoLetivo: $("input#AnoLetivo").val()
        },
        success: function (data) {
            $("#formDialog").dialog("close");

            if ($('#anoAtual').val() == undefined || $('#mesAtual').val() == undefined) {
                AtualizarCalendario($("#hiddenDiretoria").attr('value'), $("#hiddenEscola").attr('value'), $("#hiddenFiltroEscola").attr('value'), $("#hiddenFiltroDiretoria").attr('value'), $("#hiddenFiltroTodos").attr('value'), $("#hiddenFiltroEventosInativos").attr('value'));
            } else {
                AtualizarCalendario($("#hiddenDiretoria").attr('value'), $("#hiddenEscola").attr('value'), $("#hiddenFiltroEscola").attr('value'), $("#hiddenFiltroDiretoria").attr('value'), $("#hiddenFiltroTodos").attr('value'), $("#hiddenFiltroEventosInativos").attr('value'), parseInt($('#anoAtual').val()), parseInt($('#mesAtual').val()));
            }
        }
    });
}


function DeletarCalendario(id) {
    if (confirm('Tem certeza que deseja excluir esse Evento?')) {
        $.ajax({
            type: 'POST',
            data: ({
                id: id
            }),
            url: '/Calendario/Deletar/',
            success: function (data) {
                $("#formDialog").dialog("close");

                if ($('#anoAtual').val() == undefined || $('#mesAtual').val() == undefined) {
                    AtualizarCalendario($("#hiddenDiretoria").attr('value'), $("#hiddenEscola").attr('value'), $("#hiddenFiltroEscola").attr('value'), $("#hiddenFiltroDiretoria").attr('value'), $("#hiddenFiltroTodos").attr('value'), $("#hiddenFiltroEventosInativos").attr('value'));
                } else {
                    AtualizarCalendario($("#hiddenDiretoria").attr('value'), $("#hiddenEscola").attr('value'), $("#hiddenFiltroEscola").attr('value'), $("#hiddenFiltroDiretoria").attr('value'), $("#hiddenFiltroTodos").attr('value'), $("#hiddenFiltroEventosInativos").attr('value'), parseInt($('#anoAtual').val()), parseInt($('#mesAtual').val()));
                }
            }
        });
    }
}


function Verifica_Hora(campo) {
    var vCampo = campo.value;
    if (vCampo.length == 5 && vCampo.substring(2, 3) == ":") {
        var retorno = false;
        var Hora = parseInt(vCampo.substring(0, 2));
        var Minuto = parseInt(vCampo.substring(3, 5));
        retorno = ((Hora >= 0 && Hora <= 23) && (Minuto >= 0 && Minuto <= 59));
        if (!retorno) {
            retorno
            campo.value = "";
        }
    }
    else {
        return false;
        campo.value = "";
    }
}


function ComparaHora() {

    var horaIni = $("#textboxHoraIniPlanejado").val().replace(':', '');
    var horaFim = $("#textboxHoraFimPlanejado").val().replace(':', '');

    if (horaIni > horaFim) {
        $("#textboxHoraFimPlanejado").val("");
    }

    horaIni = $("#textboxHoraIniRealizado").val().replace(':', '');
    horaFim = $("#textboxHoraFimRealizado").val().replace(':', '');

    if (horaIni > horaFim) {
        $("#textboxHoraFimRealizado").val("");
    }
}


function VerificarComportamento() {
    switch ($('#Comportamento').val()) {
        case "Administrador":
            if ($('#ListaDiretoria').val() == "") {
                alert("Para o perfil Administrador, informe no mínimo a Diretoria.");
                return false;
            }
            break;
        case "Diretoria":
            if ($('#ListaDiretoria').val() == "") {
                alert("Para o perfil Diretoria o campo Diretoria é obrigatório.");
                return false;
            }
            break;
        case "Escola":
        case "Professor":
            if ($('#ListaDiretoria').val() == "" || $('#ListaEscola').val() == "") {
                alert("Para os perfis Escola e Professor os campos Diretoria e Escola são obrigatórios.");
                return false;
            }
            break;
    }

    return true;
}

var ConfigurarCalendarioMes = function () {
    // Altera os dias da semana para  forma abreviada.
    $('#dpm').find('.month_blue_header_inner').each(function () {
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
    $('#dpm').each(function () {
        var item = $(this).find('.month_blue_cell_inner');
        for (var i = 0; i < item.length; i++) {
            var titulo = $(item[i]).find('.month_blue_cell_header').html();
            if (isNaN(titulo)) {
                $(item[i]).find('.month_blue_cell_header').html('1')
            }
        }
    });
    // bloqueia datas anteriores e posteriores.
    $('#dpm').each(function () {
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