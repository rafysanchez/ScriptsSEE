// Responsavel/Aluno

function CarregarTurmasAluno() {
    var anoLetivo = parseInt($('#ddlAnoLetivo').val());

    if (parseInt($("#ddlAnoLetivo").val()) !== 0 && parseInt($("#ddlAnoLetivo").val()) !== undefined && parseInt($("#ddlAnoLetivo").val()) > 2015) {
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
        data: ({
            anoLetivo: anoLetivo
        }),
        url: '/ConsultaFechamento/TurmasAluno',
        success: function (data, textStatus, jqXHR) {
            $('#turmasAluno').empty().html(data);
            $('#tabelaDados').sedDataTable({
                nomeExportacao: "Consulta de Fechamento",
                tituloFiltro: " ",
                order: [[0, "asc"]]
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
            codigoEscola: 0
        }),
        url: '/ConsultaFechamento/Boletim',
        success: function (data, textStatus, jqXHR) {
            $('#SelecaoTurma').hide();
            $('#Boletim').html(data);
            $('#Boletim').show();
            $('#tabelaAvaliacao').sedDataTable({
                nomeExportacao: "Consulta de Fechamento",
                tituloFiltro: " ",
                order: [[0, "asc"]]
            });
            $('#btnVoltar').css("visibility", "visible");
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

function VoltarTurmas() {
    $('#SelecaoTurma').show();
    $('#Boletim').hide();
    $('#btnVoltar').css("visibility", "hidden");
    $('#divAnoLetivo').show();
}

// Diretoria/Escola
function CarregarEscolaTurma() {

    if (parseInt($("#txtAnoLetivo").val()) !== 0 && parseInt($("#txtAnoLetivo").val()) !== undefined && parseInt($("#txtAnoLetivo").val()) > 2015) {
        Mensagem.Alert({
            titulo: "Pesquisa Inválida!",
            mensagem: "A funcionalidade está disponível para o ano letivo até 2015. Para o Fechamento de anos posteriores utilize o menu: Fechamento(Novo) > Consulta",
            tipo: "Aviso",
            botao: "Fechar"
        });
        return false;
    }

    var anoLetivo = $('#txtAnoLetivo').val();
    var codigoEscola = $('#CodigoEscola').val();

    if (codigoEscola.length > 0) {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'html',
            data: ({
                id: parseInt(codigoEscola),
                anoLetivo: parseInt(anoLetivo)
            }),
            url: '/ConsultaFechamento/ListaEscolaTurmaProfessor',
            success: function (data, textStatus, jqXHR) {
                $("#divListaEscolaTurmaProfessor").empty().html(data);
                $('#imgAtualizar').css("visibility", "visible");

                $("#table").sedDataTable({
                    columnDefs: [
                                   { targets: [5], orderable: false },
                    ],
                    nomeExportacao: "Consulta de Fechamento",
                    tituloFiltro: " ",
                    order: [[0, "asc"]]
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


//Professor
function CarregarTurmasProfessor() {

    if (parseInt($("#ddlAnoLetivo").val()) !== 0 && parseInt($("#ddlAnoLetivo").val()) !== undefined && parseInt($("#ddlAnoLetivo").val()) > 2015) {
        Mensagem.Alert({
            titulo: "Pesquisa Inválida!",
            mensagem: "A funcionalidade está disponível para o ano letivo até 2015. Para o Fechamento de anos posteriores utilize o menu: Fechamento(Novo) > Consulta",
            tipo: "Aviso",
            botao: "Fechar"
        });
        return false;
    }

    var anoLetivo = parseInt($('#ddlAnoLetivo').val());

    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            anoLetivo: anoLetivo
        }),
        url: '/ConsultaFechamento/TurmasProfessor',
        success: function (data, textStatus, jqXHR) {
            $('#turmasProfessor').empty().html(data);
            $('#tabelaDados').sedDataTable({
                nomeExportacao: "Consulta de Fechamento",
                tituloFiltro: " ",
                order: [[0, "asc"]]
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

function BoletimAlunos(codigoTurma, codigoSubTurma, codigoDisciplina) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'html',
        data: ({
            codigoTurma: codigoTurma,
            codigoSubTurma: codigoSubTurma,
            codigoDisciplina: codigoDisciplina
        }),
        url: '/ConsultaFechamento/BoletimAlunos',
        success: function (data, textStatus, jqXHR) {
            $('#SelecaoTurma').hide();
            $('#Atividades').html(data);
            $('#Atividades').show();
            $('#btnVoltar').css("visibility", "visible");
            $('#tabelaAvaliacao').sedDataTable({
                nomeExportacao: "Consulta de Fechamento",
                tituloFiltro: " ",
                order: [[0, "asc"]]
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

function VoltarTurmasProfessor() {
    $('#SelecaoTurma').show();
    $('#Atividades').hide();
    $('#btnVoltar').css("visibility", "hidden");
    $('#divAnoLetivo').show();
}


$(document).ready(function() {
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $("#table").sedDataTable();
    AplicarMascaras();
});