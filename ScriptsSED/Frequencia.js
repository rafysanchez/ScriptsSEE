//===================ANO LETIVO======================
var anoLetivoAnterior;
var jacadastrado = true;
var diaAnterior;

var VerificarMudancaAnoLetivo = function (AnoLetivoForm, Diretoria, Escola, TipoEnsino, Turma, Disciplina) {

    if (AnoLetivoForm.length == 0) {
        return;
    }

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

;

var aula = 0;
//Captura a aula da presença atribuida
function titulo() {
    $('.tip').click(function () {
        $(".ui-button-text").parent().hide();
        aula = $(this).attr("aula");
        $(function () {
            $("#dialog-modal").dialog({
                height: 280,
                width: 490,
                modal: true,
                position: { my: "center", at: "top", of: ".tabela" },
                show: {
                    effect: "slide",
                    duration: 500,
                    position: { top: 500 },
                },
                hide: {
                    effect: "fold",
                    duration: 500
                },
                close: function () {
                    aula = 0;
                }
            });
        });
    });
}

//Carrega dropdownlists
$().ready(function () {
    diaAnterior = '';

    //$('#frequencias_CodigoDiretoria').autoPreencher($('#frequencias_CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    //$('#frequencias_CodigoEscola').autoPreencher($('#frequencias_CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ 'id': "'frequencias.CodigoEscola'", 'AnoLetivo': 'DataFrequencia_Anual' }]);
    //$('#frequencias_CodigoTipoEnsino').autoPreencher($('#frequencias_CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ 'CodigoEscola': "'frequencias.CodigoEscola'", 'CodigoTipoEnsino': "'frequencias.CodigoTipoEnsino'", 'AnoLetivo': "'DataFrequencia_Anual'" }]);
    //$('#frequencias_CodigoTurma').autoPreencher($('#frequencias_CodigoDisciplina'), 'Disciplina', 'CarregarDisciplinasFrequencia', [{ 'TipoEnsino': "'frequencias.CodigoTipoEnsino'", 'CodigoTurma': "'frequencias.CodigoTurma'", 'AnoLetivo': "'DataFrequencia_Anual'" }]);
    $('#frequencias_DataDaAula').change(function () {
        //$("#frequencias_CodigoTipoEnsino option:selected").attr("selected", null);
        //$("#frequencias_CodigoTurma option:selected").attr("selected", null);
        //$("#frequencias_CodigoDisciplina option:selected").attr("selected", null);

        $("#filt-tipoEnsino option:selected").attr("selected", null);
        $("#filt-turma option:selected").attr("selected", null);
        $("#filt-disciplina option:selected").attr("selected", null);

    });

    //$('#frequencias_CodigoTurma').change(function () {
    //    fct_CarregarSubTurmas($(this).val());
    //});


    $('#tabelaInfo').sedDataTable();

    //$("filt-escola").change(function () {
    //    CarregaTipoEnsino();
    //})

});

function fct_CarregarSubTurmas(turma) {
    //var select = $("#frequencias_CodigoSubTurma");
    var select = $("#filt-subTurma");
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

var CarregaTipoEnsino = function () {
    var param = {
        id: $("#filt-escola").val(),
        AnoLetivo: $("filt-anoLetivo").val()
    }

    $.ajax({
        cache: false,
        url: "/Frequencia/CarregarListaTiposEnsinoT",
        type: 'POST',
        dataType: 'html',
        data: param,
        contentType: 'application/json',
        success: function (data) {

        }
    });
}


//Bloqueia as colunas quando selecionado presenca coletiva
function bloqueiaColunaPresenca() {
    $(".iPhoneCheckContainer").find(".presente").each(function () {
        if ($(this).attr('bloqueado') != 'bloqueado') {
            $(this).prop("disabled", false);
        }
    });

    //$("div#motivoOk").fadeOut('slow');
    $("input#btnOk").fadeOut('slow');
    $('.on_off .presente[aula = ' + aula + ']').each(function () {
        if ($(this).attr('bloqueado') != 'bloqueado') {
            if (!$(this).is(':checked')) {
                $(this).prop('checked', true).trigger("change");
                $(this).parent().next().toggle();
                $(".selMotivoFaltaV").hide();
                $(".selMotivoFalta").hide();
            }

            var hasValue = $("#frequencias_CodigoMotivoFrequencia").has('[selected]');
            if (hasValue) {
                $("#frequencias_CodigoMotivoFrequencia").each(function () {
                    $(this).find("option[value= 1]").prop("selected", false);
                    $(this).find("option[value= 2]").prop("selected", false);
                    $(this).find("option[value= 3]").prop("selected", false);
                    $(this).find("option[value= 4]").prop("selected", false);
                    $(this).find("option[value= 5]").prop("selected", false);
                    $(this).find("option[value= 6]").prop("selected", false);
                });
                $("#frequencias_CodigoMotivoFrequencia").find("option[value=1]").prev().attr("selected", true)

            }
            $("#frequencias_CodigoMotivoFrequencia").each(function () {
                $(this).find("option[value= 0]").show()
                $(this).find("option[value= 1]").show()
                $(this).find("option[value= 2]").show()
                $(this).find("option[value= 3]").show()
                $(this).find("option[value= 4]").show()
                $(this).find("option[value= 5]").hide()
                $(this).find("option[value= 6]").hide()
            });
        }
    });
    $(".iPhoneCheckContainer").find(".presente").each(function () {
        if ($(this).attr('bloqueado') != 'bloqueado') {
            $(this).prop("disabled", true);
        }
    });
    displayModel();
}

//Desbloqueia as colunas quando selecionado presenca unica
function LiberaColuna() {
    $("div#motivoDiv").fadeOut('slow');
    $("input#btnOk").fadeIn('slow');
    $("inputv#btnOk").fadeIn('slow');
    $(".iPhoneCheckContainer").find(".presente").each(function () {
        if ($(this).attr('bloqueado') != 'bloqueado') {
            $(this).prop("disabled", false);
        }
    });
}

//Bloqueia as colunas quando selecionado ausencia coletiva
function bloqueiaColunaAusencia() {
    $(".iPhoneCheckContainer").find(".presente").each(function () {
        if ($(this).attr('bloqueado') != 'bloqueado') {
            $(this).prop("disabled", false);
        }
    });

    $("input#btnOk").fadeOut('slow');
    $('.on_off .presente[aula = ' + aula + ']').each(function () {
        if ($(this).attr('bloqueado') != 'bloqueado') {
            if ($(this).is(':checked')) {
                $(this).prop('checked', false).trigger("change");
                $(this).parent().next().toggle();

            }

            var hasValue = $("#frequencias_CodigoMotivoFrequencia").has('[selected]');
            if (hasValue) {
                $("#frequencias_CodigoMotivoFrequencia").each(function () {
                    $(this).find("option[value= 1]").prop("selected", false);
                    $(this).find("option[value= 2]").prop("selected", false);
                    $(this).find("option[value= 3]").prop("selected", false);
                    $(this).find("option[value= 4]").prop("selected", false);
                    $(this).find("option[value= 5]").prop("selected", false);
                    $(this).find("option[value= 6]").prop("selected", false);
                });
                $("#frequencias_CodigoMotivoFrequencia").find("option[value=1]").prev().attr("selected", true)

            }

            $("#frequencias_CodigoMotivoFrequencia").each(function () {
                $(this).find("option[value= 0]").show()
                $(this).find("option[value= 1]").show()
                $(this).find("option[value= 2]").show()
                $(this).find("option[value= 3]").hide()
                $(this).find("option[value= 4]").hide()
                $(this).find("option[value= 5]").show()
                $(this).find("option[value= 6]").show()
            });
        }
    });
    $(".iPhoneCheckContainer").find(".presente").each(function () {
        if ($(this).attr('bloqueado') != 'bloqueado') {
            $(this).prop("disabled", true);
        }
    });
    displayModel();
}

//Display para selecionar o motivo da presença coletiva
function displayModel() {
    $("div#motivoDiv").fadeIn('slow');
}

//Display botão OK depois de selecionar um motivo
function displayOk() {
    if ($("#frequencias_CodigoMotivoFrequencia").is("option[value= 0]")) {
        //$("div#motivoOk").hide();
        $("input#btnOk").hide();
        alert("Selecione uma opção");
    } else {
        //$("div#motivoOk").fadeIn('slow');
        $("input#btnOk").fadeIn('slow');
    }
}
//Inclui preseça no banco de dados
function IncluirPresenca() {
    var lista = [];
    for (var i = 0; i < $("input[name='presenca']").length; i++) {
        if ($("input[name='presenca']").eq(i).attr('bloqueado') != 'bloqueado') {
            lista.push({
                DataDaAula: $(".datepicker").val(),
                CodigoMatriculaAluno: $("input[name='presenca']").eq(i).val(),
                Presenca: $("input[name='presenca']").eq(i).prop("checked"),
                CodigoMotivoFrequencia: $("#frequencias_CodigoMotivoFrequencia").val(),
                CodigoDaAula: $("input[name='presenca']").eq(i).attr("aula"),
                CodigoDisciplina: $("input[name='frequencias.CodigoDisciplina']").val(),
                CodigoTipoEnsino: $("input[name='frequencias.CodigoTipoEnsino']").val(),
                CodigoTurma: $("input[name='frequencias.CodigoTurma']").val(),
                
                Justificativa: $("input[name='presenca']").eq(i).parent().siblings(".selecionado").val(),
                DispensaLicenca: $("input[name='presenca']").eq(i).attr("dispensa"),
                //Bloqueado: $("input[name='presenca']").eq(i).attr('bloqueado')
                EhAulaAvulsa: $("input[name='presenca']").eq(i).attr("aula_avulsa"),
            });
        }
    }

    debugger

    $.ajax({
        cache: false,
        url: "/Frequencia/IncluirPresenca",
        type: 'POST',
        dataType: 'html',
        data: JSON.stringify(lista),
        contentType: 'application/json',
        success: function (data) {
            jacadastrado = true;
            var date = $("input[name='frequencias.DataDaAula']").datepicker('getDate');
            var month = date.getMonth() + 1;
            var year = date.getFullYear();
            ChangeAula();
            getEvents(month, year);
        }
    });

}

//Obtem as presenças atribuidas anteriormente
function AulaOnChange() {
    /*$('#frequencias_DataDaAula').change(function () {
        ChangeAula();
    });*/
}

function ChangeAula() {
    $("div#listaFrequencias").hide();
    var dtFreq = Date.parse($("#frequencias_DataDaAula").val().substr(0, 10).split('/').reverse().join('-'));

    if (isNaN(dtFreq)) {
        Mensagem.IgnorarMensagensAutomaticas = false;
        Mensagem.Alert({
            titulo: "Atenção",
            mensagem: "Data Inválida.",
            tipo: "aviso", // aviso, erro, sucesso, alerta
            botao: "Fechar"
        });
        Mensagem.IgnorarMensagensAutomaticas = true;
        return;
    }

    $.ajax({
        cache: false,
        url: "/Frequencia/FrequenciaParcial",
        type: 'POST',
        datatype: 'html',
        data: {
            'data': $("#frequencias_DataDaAula").val(),
            'disciplina': $("#hdnDisciplina").val(),
            'turma': $("#hdnTurma").val(),
            'subturma': $("#hdnSubTurma").val(),
            'escola': $("#hdnEscola").val()
        },
        success: function (data) {
            if (data.TipoException != "sucesso" && data.TipoException != undefined) {
                Mensagem.IgnorarMensagensAutomaticas = false;
                Mensagem.Alert({
                    titulo: data.Title,
                    mensagem: data.Message,
                    tipo: data.TipoException, // aviso, erro, sucesso, alerta
                    botao: "Fechar"
                });
                Mensagem.IgnorarMensagensAutomaticas = true;
                $("div#listaFrequencias").hide();
                return;
            }

            //preenche DIV
            $("div#listaFrequencias").html(data);
            $("div#listaFrequencias").show();
            //aplica chave do iphone
            $('.on_off :checkbox').iphoneStyle();
            $('.disabled :checkbox').iphoneStyle();
            $('.css_sized_container :checkbox').iphoneStyle({ resizeContainer: false, resizeHandle: false });
            $('.long_tiny :checkbox').iphoneStyle({ checkedLabel: 'Very Long Text', uncheckedLabel: 'Tiny' });
            var onchange_checkbox = ($('.onchange :checkbox')).iphoneStyle({
                onChange: function (elem, value) {
                    $('span#status').html(value.toString());
                }
            });
            setInterval(function () {
                onchange_checkbox.prop('checked', !onchange_checkbox.is(':checked')).iphoneStyle("refresh");
                return;
            }, 2500);
            //aplica datatable sem paginação
            $('.tabela').sedDataTable({
                embutida: true,
                nomeExportacao: "Lançamento de Frequências",
                tituloFiltro: " ",
                "paging": false,
                "bJQueryUI": true,
                "bFilter": false,
                "bSort": true,
                "bInfoEmpty": false,
                "bInfo": false,
                "bLengthMenu": false,
                "bPaginate": false,
                "oLanguage": {
                    "sProcessing": "Processando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "Não foram encontrados resultados",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
                    "sInfoFiltered": "",
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
            $('.tip').tooltip({ html: true });
            $('.iPhoneCheckContainer').each(function () {
                $(this).trigger('click');
            });

            $('#btnExcluirFrequencia').click(function () {
                Mensagem.Alert({
                    titulo: "Atenção!",
                    mensagem: 'Deseja apagar todos os lançamentos de frequência para a data informada?',
                    tipo: "aviso",
                    botoes: [
                        {
                            botao: "Sim",
                            callback: function () {
                                var DataAula = $("input[name='frequencias.DataDaAula']").val();

                                $.ajax({
                                    cache: false,
                                    url: "/Frequencia/ExcluirFrequencia",
                                    type: 'POST',
                                    datatype: 'html',
                                    data: {
                                        dataAula: DataAula,
                                        codigoTurma: $('#hdnTurma').val(),
                                        codigoSubturma: $('#hdnSubTurma').val()
                                    },
                                    success: function (data) {
                                        if (data.sucesso == true) {
                                            var date = $("input[name='frequencias.DataDaAula']").datepicker('getDate');
                                            var month = date.getMonth() + 1;
                                            var year = date.getFullYear();
                                            ChangeAula();
                                            getEvents(month, year);
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
            jacadastrado = true;
        },
        error: function (jqXHR, textStatus, errorThrown) {

            Mensagem.Alert({
                titulo: jqXHR.Title,
                mensagem: jqXHR.Message,
                tipo: jqXHR.TipoException,
                escondido: jqXHR.Escondido,
                botao: "Fechar"
            });
        }
    });
}

//Repete as presenças para todas as colunas
function repetirPresencas() {
    if ($("input[name='repetirpresenca']").is(':checked')) {
        $('.tabela tbody tr').each(function () {
            var checkado = $(this).find('.presente:first').prop('checked');
            $(this).find('.presente').prop('checked', checkado).trigger('change');

            var justificativa = $(this).find('.selecionado').val();

            var motivosFalta = $(this).find('.selMotivoFalta');
            checkado ? motivosFalta.hide() : motivosFalta.show();

        });
    }
}

//Repete as presenças por linha quando o atributo repetirpresença esta checado
$(document).on('click', '.iPhoneCheckContainer', function () {
    jacadastrado = false;
    if ($("input[name='repetirpresenca']").is(':checked')) {
        var tr = $(this).parent().parent();
        var c = $(this).find('.presente').prop('checked');
        tr.find('.presente')
            .each(function () {
                $(this).prop('checked', c).trigger('change');

            });
    }
});
var teste;
//Abre a diolog de Justificativa
function abreMotivoFalta(obj) {
    $(".ui-button-text").parent().hide();
    $("textarea#frequencias_Justificativa").val($(obj).next().val());
    $("#descricaoMotivo").dialog({
        autoOpen: true,
        height: 375,
        cache: false,
        width: 380,
        modal: true,
        closeOnEscape: false,
        position: { my: "center", at: "top", of: ".tabela" },
        show: {
            effect: "slide",
            duration: 500,
            position: { top: 500 },
        },
        hide: {
            effect: "fold",
            duration: 500
        },
        buttons: {
            "Ok": function () {
                $(obj).siblings('.selecionado').val($("textarea#frequencias_Justificativa").val());

                fecharJustificativa(obj);

                $(this).dialog('close');
            }
        },
        open: function () {
            $("textarea#frequencias_Justificativa").val($(obj).siblings('.selecionado').val());

            $(".ui-dialog-buttonset").css({
                "float": "none",
                "text-align": "center"
            });

            $(".ui-dialog-buttonpane").css({ "border-width": "0 0 0 0" });

            $(document).find(".ui-dialog-buttonpane").find("button").each(function (a, b) {
                $(this).removeClass();
                $(this).addClass("btn btn-info");

                $(this).mouseover(function () {
                    $(b).removeClass("ui-state-hover");
                });
            });
        },
        close: function () {
            $(obj).siblings('.selecionado').val($("textarea#frequencias_Justificativa").val());
            fecharJustificativa(obj);
            //$("#descricaoMotivo").dialog('close');
        }
    });
}

function fecharJustificativa(obj) {
    if ($("textarea#frequencias_Justificativa").val() != '') {
        if ($(obj).hasClass('selMotivoFalta')) {
            $(obj).hide();
            $(obj).next().show();
        }
    } else {
        if ($(obj).hasClass('selMotivoFaltaV')) {
            $(obj).hide();
            $(obj).prev().show();
        }
    }

}

//fecha a div de dialog
function fechar() {
    $("div#descricaoMotivo").dialog('close');
}
// fecha div dialog motivo
function closedialog() {
    $("div#dialog-modal").dialog('close');
}

//evita clicks duplos
$(".iPhoneCheckContainer").click(function (evento) {
    evento.stopImmediatePropagation();
});

//evita problemas de mousehover
$(".iPhoneCheckContainer").mousemove(function (evento) {
    evento.stopImmediatePropagation();
});

//Mostra o icone do motivo somente para F  abre tela para preencher a justificativa
$(document).on('click', '.iPhoneCheckContainer', function (evento) {
    evento.preventDefault();
    var tr = $(this).parent().parent();

    if ($(this).children().is(":checked")) {
        if ($("input[name='repetirpresenca']").is(':checked')) {
            tr.find('.iPhoneCheckContainer').each(function () {
                $(this).next().hide();
                $(this).next().next().hide();
            });
        }
        else {
            $(this).next().hide();
            $(this).next().next().hide();
        }
    }
    else {
        var justif = $(this).next().next().next().val();

        if (justif == " " || justif == "" || justif == 'não há justificativas') {
            $(this).next().show();
            $(this).next().next().hide();
        }
        else {
            $(this).next().hide();
            $(this).next().next().show();
        }
        if ($("input[name='repetirpresenca']").is(':checked')) {
            tr.find('.iPhoneCheckContainer').each(function () {
                var jus = $(this).next().next().next().val();

                if (jus == " " || jus == "" || jus == 'não há justificativas') {
                    $(this).next().show();
                    $(this).next().next().hide();
                }
                else {
                    $(this).next().hide();
                    $(this).next().next().show();
                }
            });
        }
    }
});

//Cria a tabela de turmas para os logins de aluno e responsavel
$(document).ready(function () {
    $('#tableTurma').sedDataTable();

    $("#dsTurma #dsEscola").click(function () {
        var cpfProfessor = $("#hdnCfpProfessor").val();
        var nomeProfessor = $("#hdnNomeProfessor").val();
        var cdEscola = $(this).find("#hdnCdEscola").val();
        var cdTurma = $(this).find("#hdnCdTurma").val();
        var cdDiretoria = $(this).find("#hdnCdDiretoria").val();


        window.SelecionarFrequenciaProfessor(cpfProfessor, nomeProfessor, cdEscola, cdTurma, cdDiretoria);
    });
});

function Lancamentos(diretoria, escola, turma, subturma, disciplina, nomeDisciplina, tipoEnsino) {
    $.ajax({
        url: "/Frequencia/InserirPartial",
        cache: false,
        data: {
            "frequencias.CodigoDiretoria": diretoria,
            "frequencias.CodigoEscola": escola,
            "frequencias.CodigoTurma": turma,
            "frequencias.CodigoTipoEnsino": tipoEnsino,
            "frequencias.CodigoSubTurma": subturma,
            "frequencias.CodigoDisciplina": disciplina,
            "frequencias.NomeDisciplina": nomeDisciplina
        },
        type: 'POST',
        datatype: 'html',
        success: function (data) {

            if (data == "") {
                return;
            }

            $('#divSelecaoDados').hide(250);
            $("#ListaPersonal").hide(250);
            $("#divDados").html(data);
            $("#divDados").show(250);

            AulaOnChange();
            $("input[name='frequencias.DataDaAula']").datepicker(
                              {
                                  showOtherMonths: true,
                                  selectOtherMonths: true,
                                  maxDate: 0,
                                  autoSize: true,
                              });

            $("input[name='frequencias.DataDaAula']").keypress(function (e) { return false; })

            $("#btnVoltarIndex").click(function () {
                // Perguntar aqui
                if ($('#listaFrequencias').html() == '' || jacadastrado == true) {
                    // $("#DataFrequencia").val('');
                    $("#divDados").html("").empty();
                    $("#divSelecaoDados").show(350);
                } else {

                    Mensagem.Alert({
                        titulo: "Atenção!",
                        mensagem: 'Os dados inseridos não foram salvos. Deseja continuar? OBS.: Para salvar os dados, clique no botão "Cadastrar" localizado no final da página!',
                        tipo: "aviso",
                        botoes: [
                            {
                                botao: "Sim",
                                callback: function () {
                                    // $("#DataFrequencia").val('');
                                    diaAnterior = '';
                                    $("#divDados").html("").empty();
                                    $("#divSelecaoDados").show(350);
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

                }
            });

        },
    });
}

//Carrega a view de frequencia parcial para alunos e responsaveis
//function Lancamentos(diretoria, escola, turma, subturma, disciplina, tipoEnsino) {
//    $.ajax({
//        url: "/Frequencia/InserirPartial",
//        cache: false,
//        data: {
//            "frequencias.CodigoDiretoria": diretoria,
//            "frequencias.CodigoEscola": escola,
//            "frequencias.CodigoTurma": turma,
//            "frequencias.CodigoTipoEnsino": tipoEnsino,
//            "frequencias.CodigoSubTurma": subturma,
//            "frequencias.CodigoDisciplina": disciplina
//        },
//        type: 'POST',
//        datatype: 'html',
//        success: function (data) {

//            if (data == "") {
//                return;
//            }

//            $('#divSelecaoDados').hide(250);
//            $("#divDados").hide();
//            $("#divDados").html(data);
//            $("#divDados").show(250);

//            AulaOnChange();
//            $("input[name='frequencias.DataDaAula']").datepicker(
//                              {
//                                  showOtherMonths: true,
//                                  selectOtherMonths: true,
//                                  maxDate: 0,
//                                  autoSize: true,
//                              });

//            $("input[name='frequencias.DataDaAula']").keypress(function (e) { return false; })

//            $("#btnVoltarIndex").click(function () {
//                // Perguntar aqui
//                if ($('#listaFrequencias').html() == '' || jacadastrado == true) {
//                    // $("#DataFrequencia").val('');
//                    $("#divDados").html("").empty();
//                    $("#divSelecaoDados").show(350);
//                } else {

//                    Mensagem.Alert({
//                        titulo: "Atenção!",
//                        mensagem: 'Os dados inseridos não foram salvos. Deseja continuar?<br />OBS.: Para salvar os dados, clique no botão "Cadastrar" localizado no final da página!',
//                        tipo: "aviso",
//                        botoes: [
//                            {
//                                botao: "Sim",
//                                callback: function () {
//                                    // $("#DataFrequencia").val('');
//                                    diaAnterior = '';
//                                    $("#divDados").html("").empty();
//                                    $("#divSelecaoDados").show(350);
//                                    $.unblockUI();
//                                }
//                            },
//                            {
//                                botao: "Não",
//                                callback: function () {
//                                    $.unblockUI();
//                                }
//                            }
//                        ]
//                    });
//                }
//            });

//        },
//    });
//}

//Carrega lançamentos de consulta
function LancamentosConsulta(diretoria, escola, turma, subturma, disciplina, dataAtr) {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = $("#DataFrequenciaProfessor option:selected").val();
    var output = (('' + day).length < 1 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + year;
    $.ajax({
        url: "/Frequencia/ConsultarTabelaPartial",
        cache: false,
        data: {
            "frequencias.CodigoDiretoria": diretoria,
            "frequencias.CodigoEscola": escola,
            "frequencias.CodigoTurma": turma,
            "frequencias.CodigoSubTurma": subturma,
            "frequencias.CodigoDisciplina": disciplina,
            "frequencias.DataDaAula": output
        },
        type: 'POST',
        datatype: 'html',
        success: function (data) {

            if (data == "") {
                return;
            }

            $('#divSelecaoDados').hide(250);
            $("#ListaPersonal").hide(250);
            $("#divDados").html(data);
            $('#tab').sedDataTable({
                "paging": false,
                nomeExportacao: "Consultas de Frequências",
                tituloFiltro: " ",
                filtros: [
                    { nome: "Ano Letivo", valor: $("#DataFrequenciaProfessor option:selected").val() },
                ]
            });
            //var oTable = $('#tab').dataTable({
            //sDom: '<"H"T<"cl">lfr>t<"F"ip>',
            //oTableTools: {
            //    aButtons:
            //        [{
            //            "sExtends": "print",
            //            "sButtonText": "Imprimir",
            //            "aButtons": ["print"],
            //            "sInfo": "<h6>Visualização de Impressão</h6><p>Para imprimir, utilize a opção de impressão do navegador. Pressione ESC para terminar.</p>"
            //        }]
            //},
            //    "sScrollX": "150%",
            //    "bScrollCollapse": true,
            //    "bJQueryUI": true,
            //    "bPaginate": false,
            //    "oLanguage": {
            //        "sProcessing": "Processando...",
            //        "sLengthMenu": "Mostrar _MENU_ registros",
            //        "sZeroRecords": "Não foram encontrados resultados",
            //        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            //        "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
            //        "sInfoFiltered": "",
            //        "sInfoPostFix": "",
            //        "sSearch": "Buscar:",
            //        "sUrl": "",
            //        "oPaginate": {
            //            "sFirst": "Primeiro",
            //            "sPrevious": "Anterior",
            //            "sNext": "Seguinte",
            //            "sLast": "Último"
            //        },
            //    },
            //});
            //new FixedColumns(oTable, {
            //    "iLeftColumns": 2,
            //    "iRightColumns": 0
            //});

            $("#btnVoltarIndex").one("click", function () {
                $("#tabelaFrequencia").hide();
                $("#tabelaFrequencia").html('').empty();
                $("#divSelecaoDados").show(350)
                $("#ListaPersonal").show(350)
                $("#responsavelProfessor").find("#tabelaInfo_wrapper").show(250);
            });

        },
    });
}

//Carrega as Turmas por aluno
function CarregarTurmasAluno() {
    var anoLetivo = parseInt($('#ddlAnoLetivo').val());

    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        dataType: 'html',
        data: ({
            anoLetivo: anoLetivo
        }),
        url: '/Frequencia/TurmasAluno',
        success: function (data) {
            $('#turmasAluno').empty().html(data);
            $('#tabelaDados').sedDataTable();
        },
    });
}

//Carrega consulta de disciplinas
function ConsultarDisciplinas(codigoTurma, codigoAluno, anoLetivo) {
    $.ajax({
        type: 'POST',
        cache: false,
        async: true,
        dataType: 'html',
        data: ({
            codigoTurma: codigoTurma,
            codigoAluno: codigoAluno,
            anoLetivo: anoLetivo
        }),
        url: '/Frequencia/ConsultarDisciplinas',
        success: function (data) {
            $('#SelecaoTurma').hide();
            $('#divFrequencia').html(data);
            $('#divFrequencia').show();
            $('#btnVoltar').css("visibility", "visible");
            $('#divAnoLetivo').hide();

            //var oTable $('.tabela').dataTable({
            //    "sScrollX": "150%",
            //    "bScrollCollapse": true,
            //    "bJQueryUI": true,
            //    "bPaginate": false,
            //    "bRetrieve": true,
            //    "oLanguage": {
            //        "sProcessing": "Processando...",
            //        "sLengthMenu": "Mostrar _MENU_ registros",
            //        "sZeroRecords": "Não foram encontrados resultados",
            //        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            //        "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
            //        "sInfoFiltered": "",
            //        "sInfoPostFix": "",
            //        "sSearch": "Buscar:",
            //        "sUrl": "",
            //        "oPaginate": {
            //            "sFirst": "Primeiro",
            //            "sPrevious": "Anterior",
            //            "sNext": "Seguinte",
            //            "sLast": "Último",
            //            "sScrollX": "100%", 
            //            "sScrollXInner": "110%", 
            //            "bScrollCollapse": true
            //        },
            //    }
            //});
            //new FixedColumns(oTable, {
            //    "iLeftColumns": 1,
            //    "iRightColumns": 0
            //});
        }
    });
}

//Tratamento para "esconder" ou "aparecer" as turmas no menu
function VoltarTurmas() {
    $('#SelecaoTurma').show();
    $('#divFrequencia').hide();
    $('#btnVoltar').css("visibility", "hidden");
    $('#divAnoLetivo').show();
}

//Fecha a tela de preenchimento de motivo de falta
function FecharTelaMotivo() {
    $("#dialog-modal").dialog("close");
}

//Fecha a tela de preencimento de justificativa de falta
function closedialogjustificativa() {
    $("#descricaoMotivo").dialog('close');
}

//Tratamento pós click no botão "Consultar" da frequencia
$(document).ready(function () {
    $("#btnConsultaProximo").click(function (e) {
        e.preventDefault();
        if ($("#frmFiltros").valid() == false) {
            return;
        }
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        //var year = $("#DataFrequencia").val();
        var year = $("#filt-anoLetivo").val();
        var output = (('' + day).length < 1 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + year;
        $.ajax({
            cache: false,
            url: "/Frequencia/ConsultarTabela",
            type: "POST",
            data:
            {
                //"frequencias.CodigoDiretoria": $("#frequencias_CodigoDiretoria").val(),
                "frequencias.CodigoDiretoria": $("#filt-diretoria").val(),
                //"frequencias.CodigoEscola": $("#frequencias_CodigoEscola").val(),
                "frequencias.CodigoEscola": $("#filt-escola").val(),
                //"frequencias.CodigoTipoEnsino": $("#frequencias_CodigoTipoEnsino").val(),
                "frequencias.CodigoTipoEnsino": $("#filt-tipoEnsino").val(),
                //"frequencias.CodigoTurma": $("#frequencias_CodigoTurma").val(),
                "frequencias.CodigoTurma": $("#filt-turma").val(),
                //"frequencias.CodigoSubTurma": $("#frequencias_CodigoSubTurma").val(),
                "frequencias.CodigoSubTurma": $("#filt-subTurma").val(),
                //"frequencias.CodigoDisciplina": $("#frequencias_CodigoDisciplina").val(),
                "frequencias.CodigoDisciplina": $("#filt-disciplina").val(),
                "frequencias.DataDaAula": output
            },
            success: function (data) {
                $("#divFiltroConsulta").hide(250);
                $("#divDados").html(data);

                $(document).ready(function () {
                    $('#tab').sedDataTable({
                        "paging": false,
                        nomeExportacao: "Consultas de Frequências",
                        tituloFiltro: " ",
                        filtros: [
                            //{ nome: "Ano Letivo", valor: $("#DataFrequencia").val() },
                            { nome: "Ano Letivo", valor: $("#filt-anoLetivo").val() },
                            //{ nome: "Diretoria", valor: $("#frequencias_CodigoDiretoria option:selected").text() },
                            { nome: "Diretoria", valor: $("#filt-diretoria option:selected").text() },
                            //{ nome: "Escola", valor: $("#frequencias_CodigoEscola option:selected").text() },
                            { nome: "Escola", valor: $("#filt-escola option:selected").text() },
                            //{ nome: "Tipo de Ensino", valor: $("#frequencias_CodigoTipoEnsino option:selected").text() },
                            { nome: "Tipo de Ensino", valor: $("#filt-tipoEnsino option:selected").text() },
                            //{ nome: "Turma", valor: $("#frequencias_CodigoTurma option:selected").text() },
                            { nome: "Turma", valor: $("#filt-turma option:selected").text() },
                            //{ nome: "Sub Turma", valor: ($("#frequencias_CodigoSubTurma option:selected").text() != "Selecione..." ? $("#frequencias_CodigoSubTurma option:selected").text() : "") },
                            { nome: "Sub Turma", valor: ($("#filt-subTurma option:selected").text() != "Selecione..." ? $("#filt-subTurma option:selected").text() : "") },
                            //{ nome: "Disciplina", valor: $("#frequencias_CodigoDisciplina option:selected").text() }
                            { nome: "Disciplina", valor: $("#filt-disciplina option:selected").text() }
                        ]
                    });


                    //var oTable = $('#tab').dataTable({
                    //    //sDom: '<"H"T<"cl">lfr>t<"F"ip>',
                    //    //oTableTools: {
                    //    //    aButtons:
                    //    //        [{
                    //    //            "sExtends": "print",
                    //    //            "sButtonText": "Imprimir",
                    //    //            "aButtons": ["print"],
                    //    //            "sInfo": "<h6>Visualização de Impressão</h6><p>Para imprimir, utilize a opção de impressão do navegador. Pressione ESC para terminar.</p>"
                    //    //        }]
                    //    //},
                    //    "sScrollX": "765px",
                    //    "bScrollCollapse": true,
                    //    "bJQueryUI": true,
                    //    "bPaginate": false,
                    //    "bFilter": true,
                    //    "oLanguage": {
                    //        "sProcessing": "Processando...",
                    //        "sLengthMenu": "Mostrar _MENU_ registros",
                    //        "sZeroRecords": "Não foram encontrados resultados",
                    //        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    //        "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
                    //        "sInfoFiltered": "",
                    //        "sInfoPostFix": "",
                    //        "sSearch": "Buscar:",
                    //        "sUrl": "",
                    //        "oPaginate": {
                    //            "sFirst": "Primeiro",
                    //            "sPrevious": "Anterior",
                    //            "sNext": "Seguinte",
                    //            "sLast": "Último"
                    //        },
                    //    }
                    //});
                    ////new FixedColumns(oTable, {
                    ////    "iLeftColumns": 2,
                    ////    "iRightColumns": 0
                    ////});
                });
                $("#btnVoltarIndex").one("click", function () {
                    // $("#DataFrequencia").val('');
                    $("#divDados").html("").empty();
                    $("#divFiltroConsulta").show(250);
                });
            }

        });
    })
});

//Tratamento pós click do botão pesquisar
$(document).ready(function () {
    $("#btnProximo").click(function (e) {
        e.preventDefault();

        if ($("#frmFiltros").valid() == false) {
            return;
        }
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        //var year = $("#DataFrequencia").val();
        var year = $("#filt-anoLetivo").val();
        var output = (('' + day).length < 1 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + year;
        $.ajax({
            cache: false,
            url: "/Frequencia/Inserir",
            type: "POST",
            datatype: 'HTML',
            data:
            {
                //"frequencias.CodigoDiretoria": $("#frequencias_CodigoDiretoria").val(),
                //"frequencias.CodigoEscola": $("#frequencias_CodigoEscola").val(),
                //"frequencias.CodigoTipoEnsino": $("#frequencias_CodigoTipoEnsino").val(),
                //"frequencias.CodigoTurma": $("#frequencias_CodigoTurma").val(),
                //"frequencias.CodigoSubTurma": $("#frequencias_CodigoSubTurma").val(),
                //"frequencias.CodigoDisciplina": $("#frequencias_CodigoDisciplina").val(),
                //"frequencias.DataDaAula": output
                "frequencias.CodigoDiretoria": $("#filt-diretoria").val(),
                "frequencias.CodigoEscola": $("#filt-escola").val(),
                "frequencias.CodigoTipoEnsino": $("#filt-tipoEnsino").val(),
                "frequencias.CodigoTurma": $("#filt-turma").val(),
                "frequencias.CodigoSubTurma": $("#filt-subTurma").val(),
                "frequencias.CodigoDisciplina": $("#filt-disciplina").val(),
                "frequencias.CodigoRedeEnsino": $("#filt-redeEnsino").val(),
                "frequencias.DataDaAula": output

            },
            success: function (data) {

                if (data == '') {
                    return;
                }

                $("#divSelecaoDados").hide(250);
                $("#divDados").append(data);
                $("#frequ input[type = checkbox]").click(function () {
                    alert($(this).attr("id_aluno"));
                });

                AulaOnChange();
                $("input[name='frequencias.DataDaAula']").datepicker(
                {
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    maxDate: 0,
                    autoSize: true,
                });
                $("#btnVoltarIndex").click(function () {
                    // Perguntar aqui
                    if ($('#listaFrequencias').html() == '' || jacadastrado == true) {
                        // $("#DataFrequencia").val('');
                        $("#divDados").html("").empty();
                        $("#divSelecaoDados").show(350);
                    } else {
                        debugger
                        if ($("#hdFreqBloq").val().toLowerCase() == 'true') {
                            Mensagem.Alert({
                                titulo: "Atenção!",
                                mensagem: 'Os dados inseridos não foram salvos. Deseja continuar? OBS.: Para salvar os dados, clique no botão "Cadastrar" localizado no final da página!',
                                tipo: "aviso",
                                botoes: [
                                    {
                                        botao: "Sim",
                                        callback: function () {
                                            diaAnterior = '';
                                            // $("#DataFrequencia").val('');
                                            $("#divDados").html("").empty();
                                            $("#divSelecaoDados").show(350);
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
                        }
                        else {
                            $("#divDados").html("").empty();
                            $("#divSelecaoDados").show(350);
                        }
                    }
                });
            }
        });
    });
});
//Tratamento ao clicar no label "mês" da tela de consulta para trazer os dados por dia/mês
function ConsultaPresencaParcial(objeto) {

    //var AnoLetivo = $("#DataFrequencia").val();
    var AnoLetivo = $("#filt-anoLetivo").val();
    var filtros = [];
    if (AnoLetivo == null || AnoLetivo == 0) {
        AnoLetivo = $("#DataFrequenciaProfessor option:selected").val();
    }
    else {
        filtros.push(
            //{ nome: "Ano Letivo", valor: $("#DataFrequencia").val() },
            { nome: "Ano Letivo", valor: $("#filt-anoLetivo").val() },
            //{ nome: "Diretoria", valor: $("#frequencias_CodigoDiretoria option:selected").text() },
            { nome: "Diretoria", valor: $("#filt-diretoria option:selected").text() },
            //{ nome: "Escola", valor: $("#frequencias_CodigoEscola option:selected").text() },
            { nome: "Escola", valor: $("#filt-escola option:selected").text() },
            //{ nome: "Tipo de Ensino", valor: $("#frequencias_CodigoTipoEnsino option:selected").text() },
            { nome: "Tipo de Ensino", valor: $("#filt-tipoEnsino option:selected").text() },
            //{ nome: "Turma", valor: $("#frequencias_CodigoTurma option:selected").text() },
            { nome: "Turma", valor: $("#filt-turma option:selected").text() },
            //{ nome: "Sub Turma", valor: ($("#frequencias_CodigoSubTurma option:selected").text() != "Selecione..." ? $("#frequencias_CodigoSubTurma option:selected").text() : "") },
            { nome: "Sub Turma", valor: ($("#filt-subTurma option:selected").text() != "Selecione..." ? $("#filt-subTurma option:selected").text() : "") },
            //{ nome: "Disciplina", valor: $("#frequencias_CodigoDisciplina option:selected").text() },
            { nome: "Disciplina", valor: $("#filt-disciplina option:selected").text() },
            { nome: "Mês", valor: $(objeto).attr("idMes") });
    }

    $.ajax({
        cache: false,
        url: "/Frequencia/ConsultaFrequenciaDetalhesParcial",
        type: 'POST',
        datatype: 'html',
        data: { turma: $("input[name = 'cd_turma']").val(), subturma: $("input[name = 'cd_sub_turma']").val(), Mes: $(objeto).attr("idMes"), disciplina: $("input[name = 'disciplina']").val(), AnoLetivo: AnoLetivo },
        success: function (data) {
            $("#detalhes").html(data);
            $("#tabelaFrequencia").hide();

            //var oTable =  
            $('#tabDetalhes').sedDataTable({
                "paging": false,
                nomeExportacao: "Consultas de Frequências",
                tituloFiltro: " ",
                filtros: filtros
            });

            //correção do alinhamento das colunas da tabela
            $(".tabela thead tr th div").css({ 'padding-right': '0px', 'text-align': 'center' });
            $(".tabela thead tr th div").first().css({ 'padding-right': '0px', 'text-align': 'center' });
            $(".tabela thead tr th:nth-child(2) div").css({ 'padding-right': '0px', 'text-align': 'center' });
            //

            $("#btnVoltarIndex").one("click", function () {
                // $("#DataFrequencia").val('');
                $("#divSelecaoDados").show(350)
                fecharJanela();
            });
        }
    });
}

//Tratamento do "AulaOnChange" quando se altera o mês no lançamento da frequencia
$("#frequencias_DataDaAula").change(function () {
    AulaOnChange();
});

//Fecha a tela de consulta por dia/mes e retorna a anterior
function fecharJanela() {
    $("#detalhesFrequenciaProf").html('').empty();
    $("#tabelaFrequencia").show(250);
}

//Abre a tela de preenchimento da Justificativa
function AbreJustif(obj) {
    $("#descricaoMotivo").dialog({
        autoOpen: true,
        height: 390,
        width: 460,
        modal: true,
        cache: false,
        position: { my: "center", at: "top", of: ".tabela" },
        show: {
            effect: "slide",
            duration: 500,
            position: { top: 500 },
        },
        hide: {
            effect: "fold",
            duration: 500
        },
        open: function () {
            $("textarea#frequencias_Justificativa").val($(obj).siblings('.selecionado').val());
        },
        close: function () {
            $(obj).siblings('.selecionado').val($("textarea#frequencias_Justificativa").val());
        }
    });

}
