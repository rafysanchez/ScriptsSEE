$(document).ready(function () {
    $('#ddlDiretoria').autoPreencher($('#ddlEscola'), 'Escola', 'CarregarListaEscolas');
    //if (!isNaN(parseInt($("#ddlDiretoria").val()))) {
    //    $("#ddlDiretoria").prop("disabled", "disabled");
    //    CarregarComboEscola();
    //}
    //else {
    //    $("#ddlEscola").prop("disabled", "disabled");
    //}

    //Goe
    //$('#AnoLetivo').verificarAnoLetivo($('#CodigoDiretoria'), 'Diretoria', 'CarregarListaDiretorias');
    $("#CodigoDiretoria").autoPreencher($("#ddlEscola"), "Escola", "CarregarListaEscolas");

    $('#ddlEscola').autoPreencher($('#CodigoTipoEnsino'), 'TipoEnsino', 'CarregarListaTiposEnsino', [{ id: "'CodigoEscola'", AnoLetivo: "'AnoLetivo'" }]);
    $('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'Turma', 'CarregarListaTurmaPorTipoEnsino', [{ CodigoEscola: "'CodigoEscola'", CodigoTipoEnsino: "'CodigoTipoEnsino'", AnoLetivo: "'AnoLetivo'" }]);
    $('#CodigoTurma').autoPreencher($('#CodigoSubTurma'), 'SubTurma', 'CarregarListaSubTurma', [{ CodigoTurma: "'CodigoTurma'" }]);
    // Preenchendo hidden com o texto da turma selecionada
    $('#CodigoTurma').change(function () { $('#TextoTurma').val($(this).find('option:selected').text()); });
    // Remontar o DDL de tipos de Fechamentos conforme Kanban #1824 para as turmas EJA. Para os outros tipos de turmas são os tipos de fechamentos tradicionais
    $('#CodigoTurma').autoPreencher($('#CodigoTipoFechamento'), 'Mapao', 'CarregarListaTipoFechamento', [{ TextoTurma: "'TextoTurma'" }]);
});
var tbTurma;
function preveMencaoFechamento() {
    var mencoesalunos = $(".tableTurma").children("tbody").children("tr");
    if ($("#txtMencoes").val() != undefined) {
        var listamencoes = $("#txtMencoes").val().split("|");
        //prepara as arrays
        for (i = 0; i < listamencoes.length - 1 ; i++) {
            var mencoes = new Array();
            mencoes = listamencoes[i].split("-");
            listamencoes[i] = mencoes;
        }
    }
    //confere aluno por aluno
    for (var i = 0; i < mencoesalunos.length; i++) {

        //verifica se a nota já está salva
        //se já estiver ele pula o aluno e não prevê a nota
        if ($("select option[selected=selected]", mencoesalunos).val() != 0) {
            continue;
        }

        var media = $(".tbMediaPrevista", mencoesalunos[i]).html();

        //aproxima a nota e escolhe o combo
        for (var j = 0; j < listamencoes.length - 1; j++) {
            //se a média for maior que o "nr_nota_maior"
            if (media > listamencoes[j][1]) {
                if (listamencoes.length - 1 > j) {
                    //e a lista tiver uma próxima nota
                    $(".ddlMencao", mencoesalunos[i]).val(listamencoes[j + 1][0]);
                } else {
                    //se for nota máxima ele seleciona o ultimo item no array
                    $(".ddlMencao", mencoesalunos[i]).val(listamencoes[j][0]);
                }
            }
        }
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 44 && charCode != 115 && charCode != 83 && charCode != 47 && charCode != 110 & charCode != 78) {
        evt.preventDefault();
        return false;
    }
    else {
        var len = document.getElementById("txtNotaMediaFinal").value.length;
        var index = document.getElementById("txtNotaMediaFinal").value.indexOf('.');

        if (index > 0 && charCode == 44) {
            evt.preventDefault();
            return false;
        }
        if (index > 0) {
            var CharAfterdot = (len + 1) - index;
            if (CharAfterdot > 3) {
                evt.preventDefault();
                return false;
            }
        }

    }
    return true;
}

function salvarFechamentosQuintoConceito() {

    var codigosFechamentos = "";
    var codigosMatriculas = "";
    var codigosMencoes = "";
    var numerosFaltas = "0";
    var numerosFaltasCompensadas = "";
    var justificativas = "";
    var codigosSitAlunoFechto = "";
    var notasMediaFinal = "";

    var data = [];
    var valido = true;
    var numero = true;
    var faltas = 0;
    var faltasCompensadas = 0;
    var faltasAcumuladas = 0;

    var cod_disciplina = 0;

    $('#tabLancamentoFechamentoAvaliacoes .bodyFechto>tr').each(function () {
        codigosFechamentos += $(this).find(".tdCodigoFechamento").data('codigo-fechamento') + "|";
        codigosMatriculas += $(this).find(".tdCodigoMatricula").html() + "|";
        codigosMencoes += ($(this).find('.ddlMencao').val() == undefined ? "0" : $(this).find('.ddlMencao').val()) + "|";
        numerosFaltas += $(this).find('.tdFaltas').html() + "|";
        numerosFaltasCompensadas += $(this).find('.fechamento_FaltasCompensadas').val() + "|";
        justificativas += $(this).find('.fechamento_Justificativa').val().replace("|", "") + "|";
        justificativas += $(this).find('.fechamento_Justificativa').val().replace("|", "") + "|";
        notasMediaFinal += ($(this).find('#txtNotaMediaFinal').val() == undefined ? "" : $(this).find('#txtNotaMediaFinal').val()) + "|";
        codigosSitAlunoFechto += ($(this).find('.ddlSituacaoAlunoFechto').val() == undefined ? "" : $(this).find('.ddlSituacaoAlunoFechto').val()) + "|";

        faltas = $(this).find('.nrFaltas').val();
        debugger

        faltasCompensadas = $(this).find('.fechamento_FaltasCompensadas').val();
        faltasAcumuladas = $(this).find('.preview-acumuladas').html();

        if (isNaN(faltasCompensadas) || faltasCompensadas == "") {
            $(this).find('.fechamento_FaltasCompensadas').css("border-color", "red");
            valido = true;
        }
        else {
            if (parseInt(faltasAcumuladas) < 0 || parseInt(faltasCompensadas) < 0) {
                $(this).find('.fechamento_FaltasCompensadas').css("border-color", "red");
                valido = false;
            }
        }
    });

    if ($("#txtCodigoDisciplinaQuebra").val() != 0) {
        cod_disciplina = $("#txtCodigoDisciplinaQuebra").val();
    }
    else {
        cod_disciplina = $("#txtCodigoDisciplina").val();
    }

    var nota = notasMediaFinal.split("|");
    for (var i = 0; i < nota.length; i++) {
        if (parseFloat(nota[i].replace(',', '.')) % 1 > 0) {
            Mensagem.Alert({
                titulo: "Erro",
                mensagem: "A nota não pode ser decimal. Corrija os valores e tente novamente.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }
    }

    if (valido) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'json',
            data: {
                "CodigosFechamento": codigosFechamentos,
                "CodigosMatriculaAluno": codigosMatriculas,
                "Mencoes": codigosMencoes,
                "NumerosFaltas": numerosFaltas,
                "NumerosFaltasCompensadas": numerosFaltasCompensadas,
                "Justificativas": justificativas,
                "NotasMediaFinal": notasMediaFinal,
                "SituacoesAlunoFechamento": codigosSitAlunoFechto,

                "CodigoDisciplina": cod_disciplina,
                "CodigoEventoCalendario": $("#txtCodigoEventoCalendario").val(),
                "CodigoTipoFechamento": $("#ddlTipoFechamento").val(),
                "CodigoBanca": $("#CodigoBanca").val(),
                "CodigoTurma": parseInt($("#txtCodigoTurma").val()),
                "CodigoEscola": parseInt($("#txtCodigoEscola").val()),
                anoLetivo: $("#txtAnoLetivo").val(),
                codTipoFechamento: $("#ddlTipoFechamento").val()
            },
            url: '/Fechamento/GravarFechamentos',
            success: function (data) {
                CarregarFechamentos();
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
    else {
        Mensagem.Alert({
            titulo: "Fechamento",
            mensagem: "O valor das Faltas Compensadas deve ser numérico, positivo e menor ou igual o número de faltas do aluno.",
            tipo: "Erro",
            botao: "Fechar"
        });
    }
}

function salvarFechamentosQuintoConceitoGoe(linha) {

    var serie = parseInt($(linha).data('serie'));
    var migrar = parseInt($(linha).data('migrar'));

    var codigosFechamentos = "";
    var codigosDisciplinas = "";
    var codigosMigrados = "";
    var codigosMatriculas = "";
    var codigosMencoes = "";
    var numerosFaltas = "";
    var numerosFaltasCompensadas = "";
    var justificativas = "";
    var codigosSitAlunoFechto = "";
    var notasMediaFinal = "";

    var data = [];
    var valido = true;
    var numero = true;
    var faltas = 0;
    var faltasCompensadas = 0;
    var faltasAcumuladas = 0;

    $('#tabLancamentoFechamentoAvaliacoes').sedDataTable({
        "sScrollX": "70%",
        "sScrollXInner": "100%",
        "bFilter": true,
        "bSort": true,
        "bInfoEmpty": false,
        "bInfo": false,
        "bLengthMenu": false,
        "bPaginate": false,
        "aaSorting": [[1, 'asc']]
    });

    $('#tabLancamentoFechamentoAvaliacoes .bodyFechto>tr').each(function () {

        codigosFechamentos += $(this).find(".tdCodigoFechamento").data('codigo-fechamento') + "|";

        codigosDisciplinas += $(this).find(".tdCodigoFechamento").data('codigo-disciplina') + "|";

        codigosMigrados += $(this).find(".tdCodigoFechamento").data('codigo-migrado') + "|";

        codigosMatriculas += $(this).find(".tdCodigoMatricula").html() + "|";
        codigosMencoes += ($(this).find('.ddlMencao').val() == undefined ? "0" : $(this).find('.ddlMencao').val()) + "|";
        numerosFaltas += $(this).find('.tdFaltas').html() + "|";
        numerosFaltasCompensadas += $(this).find('.fechamento_FaltasCompensadas').val() + "|";
        justificativas += $(this).find('.fechamento_Justificativa').val().replace("|", "") + "|";
        justificativas += $(this).find('.fechamento_Justificativa').val().replace("|", "") + "|";
        notasMediaFinal += ($(this).find('#txtNotaMediaFinal').val() == undefined ? "" : $(this).find('#txtNotaMediaFinal').val()) + "|";
        codigosSitAlunoFechto += ($(this).find('.ddlSituacaoAlunoFechto').val() == undefined ? "" : $(this).find('.ddlSituacaoAlunoFechto').val()) + "|";

        faltas = $(this).find('.txtNumeroFaltas').val();
        faltasCompensadas = $(this).find('.fechamento_FaltasCompensadas').val();
        faltasAcumuladas = $(this).find('.preview-acumuladas').html();

        if (isNaN(faltasCompensadas) || faltasCompensadas == "") {
            $(this).find('.fechamento_FaltasCompensadas').css("border-color", "red");
            valido = false;
        }
        else {
            if (parseInt(faltasAcumuladas) < 0 || parseInt(faltasCompensadas) < 0) {
                $(this).find('.fechamento_FaltasCompensadas').css("border-color", "red");
                valido = false;
            }
        }
    });

    if (valido) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'json',
            data: {
                "CodigosFechamento": codigosFechamentos,
                "CodigosMatriculaAluno": codigosMatriculas,
                "Mencoes": codigosMencoes,
                "NumerosFaltas": numerosFaltas,
                "NumerosFaltasCompensadas": numerosFaltasCompensadas,
                "Justificativas": justificativas,
                "NotasMediaFinal": notasMediaFinal,
                "SituacoesAlunoFechamento": codigosSitAlunoFechto,
                "CodigosDisciplinas": codigosDisciplinas,
                "CodigosMigrados": codigosMigrados,

                "CodigoEventoCalendario": $("#txtCodigoEventoCalendario").val(),
                "CodigoTipoFechamento": $("#CodigoTipoFechamento").val(),
                "CodigoBanca": $("#CodigoBanca").val(),
                "CodigoTurma": parseInt($("#CodigoTurma").val()),
                "CodigoEscola": parseInt($("#CodigoEscola").val()),
                anoLetivo: $("#AnoLetivo").val(),
                codTipoFechamento: $("#CodigoTipoFechamento").val(),
                serieEscolhida: serie,
                migrar: migrar
            },
            url: '/Fechamento/GravarFechamentosGoe',
            success: function (data) {
                CarregarFechamentosGoe(linha);
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }
    else {
        Mensagem.Alert({
            titulo: "Fechamento",
            mensagem: "O valor das Faltas Compensadas deve ser numérico, positivo e menor ou igual o número de faltas do aluno.",
            tipo: "Erro",
            botao: "Fechar"
        });
    }
}

function salvarFechamentos() {
    var codigosFechamentos = "";
    var codigosMatriculas = "";
    var codigosMencoes = "";
    var numerosFaltas = "";
    var numerosFaltasCompensadas = "";
    var justificativas = "";
    var codigosSitAlunoFechto = "";
    var notasMediaFinal = "";

    var data = [];
    var valido = true;
    var numero = true;
    var faltas = 0;
    var faltasCompensadas = 0;
    var faltasAcumuladas = 0;
    var codigoDisciplina = 0;
    var codigoDisciplinaQuebra = 0;
    var codigoTipoEnsino = 0;
    var numeroSerie = 0;
    var isCicloI = false;

    $('.btn-info').prop('disabled', true);

    $("#SalvarFechamentos").hide();

    $('#tabLancamentoFechamentoAvaliacoes .bodyFechto>tr').each(function () {
        codigosFechamentos += $(this).find(".tdCodigoFechamento").data('codigo-fechamento') + "|";
        codigosMatriculas += $(this).find(".tdCodigoMatricula").html() + "|";
        codigosMencoes += ($(this).find('.ddlMencao').val() == undefined ? "0" : $(this).find('.ddlMencao').val()) + "|";
        numerosFaltas += $(this).find('.txtNumeroFaltas').val() + "|";
        numerosFaltasCompensadas += $(this).find('.fechamento_FaltasCompensadas').val() + "|";
        justificativas += $(this).find('.fechamento_Justificativa').val().replace("|", "") + "|";
        justificativas += $(this).find('.fechamento_Justificativa').val().replace("|", "") + "|";
        notasMediaFinal += "|";
        codigosSitAlunoFechto += "0|";

        faltas = $(this).find('.txtNumeroFaltas').val();
        faltasCompensadas = $(this).find('.fechamento_FaltasCompensadas').val();
        faltasAcumuladas = $(this).find('.preview-acumuladas').html();

        if (isNaN(faltasCompensadas) || faltasCompensadas == "") {
            $(this).find('.fechamento_FaltasCompensadas').val("0");
        }
        else {
            if (parseInt(faltasAcumuladas) < 0 || parseInt(faltasCompensadas) < 0) {
                $(this).find('.fechamento_FaltasCompensadas').css("border-color", "red");
                valido = false;
            }
        }
    });

    codigoDisciplina = $("#txtCodigoDisciplina").val();
    codigoDisciplinaQuebra = $("#txtCodigoDisciplinaQuebra").val();
    codigoTipoEnsino = $('#txtCodigoTipoEnsino').val();
    numeroSerie = $('#txtNumeroSerie').val();
    if (codigoTipoEnsino == 14 && (numeroSerie == 1 || numeroSerie == 2 || numeroSerie == 3 || numeroSerie == 4 || numeroSerie == 5)) {
        isCicloI = true;
    }
    else {
        isCicloI = false;
    }

    if (codigoDisciplinaQuebra != 0)
        codigoDisciplina = codigoDisciplinaQuebra;


    
    if (valido) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'json',
            data: {
                "IsCicloI": isCicloI,
                "CodigosFechamento": codigosFechamentos,
                "CodigosMatriculaAluno": codigosMatriculas,
                "Mencoes": codigosMencoes,
                "NumerosFaltas": numerosFaltas,
                "NumerosFaltasCompensadas": numerosFaltasCompensadas,
                "Justificativas": justificativas,
                "NotasMediaFinal": notasMediaFinal,
                "SituacoesAlunoFechamento": codigosSitAlunoFechto,

                "CodigoDisciplina": codigoDisciplina,
                "CodigoEventoCalendario": $("#txtCodigoEventoCalendario").val(),
                "CodigoTipoFechamento": $("#ddlTipoFechamento").val(),
                "CodigoBanca": $("#CodigoBanca").val(),
                "CodigoTurma": parseInt($("#txtCodigoTurma").val()),
                "CodigoEscola": parseInt($("#txtCodigoEscola").val()),
                anoLetivo: $("#txtAnoLetivo").val(),
                codTipoFechamento: $("#ddlTipoFechamento").val()
            },
            url: '/Fechamento/GravarFechamentos',
            success: function (data) {
                CarregarFechamentos();
                $('.btn-info').prop('disabled', false);
                $("#SalvarFechamentos").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('.btn-info').prop('disabled', true);
                $("#SalvarFechamentos").hide();
            }
        });
    }
    else {
        Mensagem.Alert({
            titulo: "Fechamento",
            mensagem: "O valor das Faltas Compensadas deve ser numérico, positivo e menor ou igual o número de faltas do aluno.",
            tipo: "Erro",
            botao: "Fechar"
        });
    }
}

function salvarFechamentosGoe(linha) {

    var serie = parseInt($(linha).data('serie'));
    var migrar = parseInt($(linha).data('migrar'));

    var codigosFechamentos = "";
    var codigosDisciplinas = "";
    var codigosMigrados = "";
    var codigosMatriculas = "";
    var codigosMencoes = "";
    var numerosFaltas = "";
    var numerosFaltasCompensadas = "";
    var justificativas = "";
    var codigosSitAlunoFechto = "";
    var notasMediaFinal = "";

    var data = [];
    var valido = true;
    var numero = true;
    var faltas = 0;
    var faltasCompensadas = 0;
    var faltasAcumuladas = 0;

    $('.btn-info').prop('disabled', true);
    $('#tabLancamentoFechamentoAvaliacoes .bodyFechto>tr').each(function () {

        codigosFechamentos += $(this).find(".tdCodigoFechamento").data('codigo-fechamento') + "|";

        codigosDisciplinas += $(this).find(".tdCodigoFechamento").data('codigo-disciplina') + "|";

        codigosMigrados += $(this).find(".tdCodigoFechamento").data('codigo-migrado') + "|";

        codigosMatriculas += $(this).find(".tdCodigoMatricula").html() + "|";
        codigosMencoes += ($(this).find('.ddlMencao').val() == undefined ? "0" : $(this).find('.ddlMencao').val()) + "|";
        numerosFaltas += $(this).find('.txtNumeroFaltas').val() + "|";
        numerosFaltasCompensadas += $(this).find('.fechamento_FaltasCompensadas').val() + "|";
        justificativas += $(this).find('.fechamento_Justificativa').val().replace("|", "") + "|";
        justificativas += $(this).find('.fechamento_Justificativa').val().replace("|", "") + "|";
        notasMediaFinal += "|";
        codigosSitAlunoFechto += "0|";

        faltas = $(this).find('.txtNumeroFaltas').val();
        faltasCompensadas = $(this).find('.fechamento_FaltasCompensadas').val();
        faltasAcumuladas = $(this).find('.preview-acumuladas').html();

        if (isNaN(faltasCompensadas) || faltasCompensadas == "") {
            $(this).find('.fechamento_FaltasCompensadas').css("border-color", "red");
            valido = false;
        }
        else {
            if (parseInt(faltasAcumuladas) < 0 || parseInt(faltasCompensadas) < 0) {
                $(this).find('.fechamento_FaltasCompensadas').css("border-color", "red");
                valido = false;
            }
        }
    });
    if (valido) {

        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'json',
            data: {
                "CodigosFechamento": codigosFechamentos,
                "CodigosMatriculaAluno": codigosMatriculas,
                "Mencoes": codigosMencoes,
                "NumerosFaltas": numerosFaltas,
                "NumerosFaltasCompensadas": numerosFaltasCompensadas,
                "Justificativas": justificativas,
                "NotasMediaFinal": notasMediaFinal,
                "SituacoesAlunoFechamento": codigosSitAlunoFechto,
                "CodigosDisciplinas": codigosDisciplinas,
                "CodigosMigrados": codigosMigrados,

                "CodigoEventoCalendario": $("#txtCodigoEventoCalendario").val(),
                "CodigoTipoFechamento": $("#CodigoTipoFechamento").val(),
                "CodigoBanca": $("#CodigoBanca").val(),
                "CodigoTurma": parseInt($("#CodigoTurma").val()),
                "CodigoEscola": parseInt($("#CodigoEscola").val()),
                anoLetivo: $("#AnoLetivo").val(),
                codTipoFechamento: $("#CodigoTipoFechamento").val(),
                serieEscolhida: serie,
                migrar: migrar
            },
            url: '/Fechamento/GravarFechamentosGoe',
            success: function (data) {
                CarregarFechamentosGoe(linha);
                $('.btn-info').prop('disabled', false);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('.btn-info').prop('disabled', true);
            }
        });
    }
    else {
        Mensagem.Alert({
            titulo: "Fechamento",
            mensagem: "O valor das Faltas Compensadas deve ser numérico, positivo e menor ou igual o número de faltas do aluno.",
            tipo: "Erro",
            botao: "Fechar"
        });
    }
}

function bindAtividades() {
    $(document).ready(function () {

        $(".btAtividades").each(
            function () {
                $(this).click(function () {
                    AbrirAtividades($(this).parent().parent().find(".Atividades"));
                })
            }
        );
    });
}

function AbrirAtividades(elemento) {
    $('#atividadesDialog').html(elemento.clone().show()).dialog({
        //height: 400,
        width: 600,
        draggable: true,
        modal: true,
        resizable: false,
        position: 'center',
        //title: 'Atividades'
    });
}


function CarregarLista() {
    console.log();



    if (parseInt($("#AnoLetivo").val()) !== 0 && parseInt($("#AnoLetivo").val()) !== undefined && parseInt($("#AnoLetivo").val()) > 2015) {
        Mensagem.Alert({
            titulo: "Pesquisa Inválida!",
            mensagem: "A funcionalidade está disponível para o ano letivo até 2015. Para o Fechamento de anos posteriores utilize o menu: Fechamento(Novo) > Consulta",
            tipo: "Aviso",
            botao: "Fechar"
        });
        return false;
    }


    var anoLetivo = ($('#AnoLetivo').val() == undefined ? '0' : $('#AnoLetivo').val());
    var codigoEscola = ($('#ddlEscola').val() == undefined ? '0' : $('#ddlEscola').val());
    var perfilUsuario = $('#hdnPerfilUsuario').val();
    $('#Fechamentos').empty().html('');

    // No perfil Professor, somente é exibido o campo Ano Letivo, não tornando necessário
    // utilizar como filtro o código da escola, já que o combo não é exibido. No caso abaixo,
    // quando o perfil é diferente de Professor, a rotina de consulta de atualização somente
    // será executada se houver escola selecionada, o que melhora a performance da mesma. 
    if (perfilUsuario != 'Professor') {
        if (codigoEscola.length > 0) {
            if (codigoEscola > 0) {
                $.ajax({
                    type: 'POST',
                    async: true,
                    dataType: 'html',
                    data: ({
                        codigoEscola: parseInt(codigoEscola),
                        anoLetivo: parseInt(anoLetivo)
                    }),
                    url: '/Fechamento/ListaParcial',
                    success: function (data, textStatus, jqXHR) {
                        $('#divListaParcial').empty().html(data);

                        $('#imgAtualizar').css("visibility", "visible");

                        $('#table').sedDataTable();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                    }
                });
            }
        }
    }
    else {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: ({
                codigoEscola: parseInt(codigoEscola),
                anoLetivo: parseInt(anoLetivo)
            }),
            url: '/Fechamento/ListaParcial',
            success: function (data, textStatus, jqXHR) {
                $('#divListaParcial').empty().html(data);

                $('#imgAtualizar').css("visibility", "visible");

                $('#table').sedDataTable();
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function CarregarListaGoe() {

    var codigoTipoFechamento = $('#CodigoTipoFechamento').val();

    if (codigoTipoFechamento.length > 0) {
        if (codigoTipoFechamento > 0) {
            $.ajax({
                type: 'POST',
                async: true,
                dataType: 'html',
                data: ({
                    tipoEnsino: $("#CodigoTipoEnsino option:selected").text(),
                    nomeTurma: $("#CodigoTurma option:selected").text(),
                    tipoFechamento: $("#CodigoTipoFechamento option:selected").text(),
                    codigoTurma: parseInt($("#CodigoTurma").val()),
                    codigoDisciplina: parseInt($("#CodigoTurma").val()),
                    codigoTipoFechamento: parseInt($("#CodigoTipoFechamento").val())
                }),
                url: '/Fechamento/ListaParcialGoe',
                success: function (data, textStatus, jqXHR) {
                    $('#divListaParcial').empty().html(data);

                    $('#table').sedDataTable();
                },
                error: function (jqXHR, textStatus, errorThrown) {

                }
            });
        }
    }
}

function AbrirFechamento(linha) {
    var existeAvaliacao = parseInt($(linha).data('existeavaliacao'));
    var existeFrequencia = parseInt($(linha).data('existefrequencia'));
    var codigoSubTurma = parseInt($(linha).data('codigosubturma'));
    var anoLetivo = parseInt($('#AnoLetivo').val());

    if (parseInt($("#txtAnoLetivo").val()) !== 0 && parseInt($("#txtAnoLetivo").val()) !== undefined && parseInt($("#txtAnoLetivo").val()) > 2015) {
        Mensagem.Alert({
            titulo: "Pesquisa Inválida!",
            mensagem: "A funcionalidade está disponível para o ano letivo até 2015. Para o Fechamento de anos posteriores utilize o menu: Fechamento(Novo) > Consulta",
            tipo: "Aviso",
            botao: "Fechar"
        });
        return false;
    }

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
            codigodisciplinaQuebra: parseInt($(linha).data('codigodisciplinaquebra')),
            disciplina: $(linha).data('disciplina'),
            codigoEscola: parseInt($(linha).data('codigoescola')),
            nomeEscola: $(linha).data('nomeescola'),
            codigoDiretoria: parseInt($(linha).data('codigodiretoria')),
            anoLetivo: anoLetivo,
            numeroSerie: parseInt($(linha).data('numeroserie'))
        },
        url: '/Fechamento/SelecionaTipoFechamento',
        success: function (data) {
            $('#dialog').html(data).dialog({
                // height: 700,
                title: "Visualizar Fechamento de Turma",
                width: 900,
                draggable: true,
                modal: true,
                resizable: false,
                position: 'top'
            });

            $('#txtExisteAvaliacao').val(existeAvaliacao);
            $('#txtExisteFrequencia').val(existeFrequencia);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function CarregarFechamentos() {
    if ($("#ddlTipoFechamento").val().length > 0) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: {
                cpfProfessor: $('#txtCpfProfessor').val(),
                nomeProfessor: $('#txtNomeProfessor').val(),
                codigoTipoEnsino: parseInt($('#txtCodigoTipoEnsino').val()),
                tipoEnsino: $('#txtTipoEnsino').val(),
                codigoTurma: parseInt($('#txtCodigoTurma').val()),
                turma: $('#txtTurma').val(),
                codigoSubTurma: parseInt($('#txtCodigoSubTurma').val()),
                subturma: $('#txtSubTurma').val(),
                periodo: $('#txtPeriodo').val(),
                codigoDisciplina: parseInt($('#txtCodigoDisciplina').val()),
                codigodisciplinaQuebra: parseInt($('#txtCodigoDisciplinaQuebra').val()),
                disciplina: $('#txtDisciplina').val(),
                codigoEscola: parseInt($('#txtCodigoEscola').val()),
                nomeEscola: $('#txtNomeEscola').val(),
                codTipoFechamento: $("#ddlTipoFechamento").val(),
                codigoDiretoria: $("#txtCodigoDiretoria").val(),
                tipoFechamento: $("#ddlTipoFechamento option:selected").text(),
                codigoDuracao: $("#txtCodigoDuracao").val(),
                anoLetivo: $("#txtAnoLetivo").val(),
                numeroSerie: $('#txtNumeroSerie').val(),
                comportamentoEscolaOuAdmin: $("#hdnComportamentoEscolaOuAdmin").val()
            },
            url: '/Fechamento/Fechamento',
            success: function (data) {                
                $('#Fechamentos').html(data);                    
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
}

function CarregarFechamentosGoe(linha) {

    var serieEscolhida = parseInt($(linha).data('serie'));
    var migrar = parseInt($(linha).data('migrar'));

    if ($("#CodigoTipoFechamento").val().length > 0) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: {
                cpfProfessor: $('#AnoLetivo').val(),
                nomeProfessor: $('#AnoLetivo').val(),
                codigoTipoEnsino: parseInt($('#CodigoTipoEnsino').val()),
                tipoEnsino: $("#CodigoTipoEnsino option:selected").text(),
                codigoTurma: parseInt($('#CodigoTurma').val()),
                turma: $("#CodigoTurma option:selected").text,
                codigoSubTurma: 0,
                subturma: "",
                periodo: $('#AnoLetivo').val(),
                codigoDisciplina: 0,
                disciplina: "",
                codigoEscola: parseInt($('#CodigoEscola').val()),
                nomeEscola: $("#CodigoEscola option:selected").text(),
                codTipoFechamento: $("#CodigoTipoFechamento").val(),
                codigoDiretoria: $("#CodigoDiretoria").val(),
                tipoFechamento: $("#CodigoTipoFechamento option:selected").text(),
                codigoDuracao: $("#AnoLetivo").val(),
                anoLetivo: $("#AnoLetivo").val(),
                serie: serieEscolhida,
                migrar: migrar
            },
            url: '/Fechamento/FechamentoGoe',
            success: function (data) {

                $('#dialog').empty();

                $('#dialog').html(data).dialog({
                    // height: 700,
                    width: 900,
                    draggable: true,
                    modal: true,
                    resizable: false,
                    position: 'top'
                });

                $('#txtExisteAvaliacao').val(existeAvaliacao);
                $('#txtExisteFrequencia').val(existeFrequencia);

                $('#Fechamentos').html(data);

                $('.tabelaFechamento').sedDataTable({
                    "sScrollX": "70%",
                    "sScrollXInner": "100%",
                    "bFilter": true,
                    "bSort": true,
                    "bInfoEmpty": false,
                    "bInfo": false,
                    "bLengthMenu": false,
                    "bPaginate": false,
                    "width": "800px",
                    "aaSorting": [[1, 'asc']]
                });

                $('#fechamentoTabs').tabs({
                    beforeActivate: function (event, ui) {
                        var id = ui.newPanel.attr("id");

                        //$('#' + id).find('.tableTurma').dataTable().fnDestroy();
                        $('#' + id).find('.tableTurma').dataTable();

                        DataTable($('#' + id).find('.tableTurma'));


                        var oTable = $('#' + id).find('.tableTurma').dataTable();
                        if (oTable.length > 0) {
                            oTable.fnAdjustColumnSizing();
                        }
                    }
                });

                DataTable($('.tableTurma'));

                tbTurma = $(".tableTurma").sedDataTable({
                    "sScrollX": "100%",
                    //    "sScrollXInner": "150%",
                    //    "bPaginate": false,
                    //    "bSort": false
                });

                //new FixedColumns(tbTurma, {
                //    "iLeftColumns": 2,
                //    "iRightColumns": 0
                //}); 

                bindAtividades();

                if ($('#Fechamentos div.aviso').length == 0) {
                    //se for cadastro ele prevê a nota, se for edição ele deixa os "S/N" mesmo
                    preveMencaoFechamento();
                }

                var existeAvaliacao = parseInt($('#txtExisteAvaliacao').val());
                var existeFrequencia = parseInt($('#txtExisteFrequencia').val());

                //if (existeAvaliacao != 1) {
                //    $('.ddlMencao').prop("disabled", "disabled");
                //}
                //if (existeFrequencia != 1) {
                //    $('input.fechamento_FaltasCompensadas').each(function () { $(this).prop("disabled", "disabled") });
                //    $('input.fechamento_Justificativa2').each(function () { $(this).prop("disabled", "disabled") });
                //}
                //else {
                //    $('input.fechamento_FaltasCompensadas').each(function () { $(this).prop("disabled", "") });
                //    $('input.fechamento_Justificativa2').each(function () { $(this).prop("disabled", "") });
                //}
                $('.nrFaltas').keyup(function () {
                    var tr = $(this).parent().parent();
                    var faltas = (tr.find('.hdnBaseAcumuladas').val() * 1) + ($(this).val() * 1);
                    tr.find('.faltasAcumuladas').val(faltas);
                    tr.find('.total-acumuladas').html(faltas);

                    tr.find('.faltas-compensadas').trigger('keyup');
                });
                $('.faltas-compensadas').keyup(function () {
                    var preview = $(this).next().find('.preview-acumuladas');
                    var total = $(this).next().find('.total-acumuladas');

                    var compensadas = $(this).val();
                    if (!compensadas)
                        compensadas = 0
                    if (((total.html() * 1) - compensadas) < 0) {
                        $(this).piscar(2).val((total.html() * 1) - (preview.html() * 1));
                        return false;
                    }
                    preview.html((total.html() * 1) - compensadas);
                }).trigger('keyup');
            },
            error: function (jqXHR, textStatus, errorThrown) {
            }
        });
    }
}

function VisualizarMembrosBanca() {
    $.ajax({
        type: 'POST',
        dataType: 'html',
        data: {
            "CodigoBanca": $("#CodigoBanca").val()
        },
        url: '/Fechamento/Banca',
        success: function (data) {
            $('#atividadesDialog').html(data).dialog({
                //height: 400,
                width: 400,
                draggable: true,
                modal: true,
                resizable: false,
                position: 'center',
                title: 'Membros do Conselho'
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function DataTableImprimir(table) {
    $(table).dataTable({
        //"bScrollCollapse": true,
        "bPaginate": false,
        "bSort": true,
        "bJQueryUI": true,
        "bFilter": true,
        "bInfoEmpty": true,
        "bInfo": true,
        "iDisplayLength": -1,
        "iCookieDuration": 60,
        "bStateSave": false,
        "bAutoWidth": false,
        "bScrollAutoCss": true,
        "bProcessing": true,
        "bRetrieve": true,
        "bDestroy": true,
        sDom: '<"H"T<"cl">lfr>t<"F"ip>',
        oTableTools: {
            aButtons:
                [{
                    "sExtends": "print",
                    "sButtonText": "Imprimir",
                    "aButtons": ["print"],
                    "sInfo": "<h6>Visualização de Impressão</h6><p>Para imprimir, utilize a opção de impressão do navegador. Pressione ESC para terminar.</p>"
                }]
        },
        "aLengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]],
        "sScrollXInner": "110%",
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
}

function DataTable(table) {
    $(table).dataTable({
        //"bScrollCollapse": true,
        "bPaginate": false,
        "bSort": true,
        "bJQueryUI": true,
        "bFilter": true,
        "bInfoEmpty": true,
        "bInfo": true,
        "iDisplayLength": -1,
        "iCookieDuration": 60,
        //"bStateSave": false,
        //"bAutoWidth": false,
        //"bScrollAutoCss": true,
        //"bProcessing": true,
        "bRetrieve": true,
        "bDestroy": true,
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
        "aLengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]],
        "sScrollXInner": "110%",
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
}


