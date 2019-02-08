$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    $("#formPesquisar").validate({
        rules: {
            anoExercicio: {
                required: true
            }
        },
        submitHandler: function (form) {
            var filtros = {
                anoExercicio: parseInt($("#anoExercicio").val()),
            };

            $.ajax({
                url: "/Eventual/ListarParametrizacoes",
                type: "POST",
                data: filtros,
                success: function (data, textStatus, xhr) {
                    $("#divResulta").html(data);
                    $("#resultadoPesquisa").sedDataTable({
                        columnDefs: [
                            { targets: [4, 5], orderable: false }
                        ],
                        nomeExportacao: "Parâmetros",
                        filtros: $("#fieldsetFiltro").sedDataTableFilter(),
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message);
                }
            });
            return;
        }
    });
    AplicarMascaras();
});


function adcionarParametrizacao() {
    $.ajax({
        url: "/Eventual/CadastrarParametrizacao",
        success: function (data, textStatus, xhr) {
            $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                title: "Cadastro de Parâmetro",
                destroy: true
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}

function visualizar(codigo) {
    $.ajax({
        url: "/Eventual/VisualizarParametrizacao",
        data: {
            codigo: parseInt(codigo),
            somenteVisualizacao: true
        },
        success: function (data, textStatus, xhr) {
            $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                title: "Visualizar Parâmetro",
                destroy: true,
                width: 700
            });
            $("#tabelaVagas").sedDataTable({
                width: 650,
                scrollX: false,
                botaoSelecionarColunas: false,
                botaoTelaCheia: false,
                embutida: true,
                botaoGerarPDF: false,
                botaoImprimir: false,
                botaoGerarCSV: false,
                bFilter: false,
                bPaginate: false,
                bInfoEmpty: false,
                bInfo: false,
                bSort: false,
                orderable: false
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });

}

function editarParametro(codigo) {
    $.ajax({
        url: "/Eventual/EditarParametrizacao",
        data: {
            codigo: parseInt(codigo),
            somenteVisualizacao: false
        },
        success: function (data, textStatus, xhr) {
            $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                title: "Editar Parâmetro",
                destroy: true,
                width: 700
            });
            $("#tabelaVagas").sedDataTable({
                width: 650,
                scrollX: false,
                botaoSelecionarColunas: false,
                botaoTelaCheia: false,
                embutida: true,
                botaoGerarPDF: false,
                botaoImprimir: false,
                botaoGerarCSV: false,
                bFilter: false,
                bPaginate: false,
                bInfoEmpty: false,
                bInfo: false,
                bSort: false,
                orderable: false
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}

function excluirParametro(codigo) {

    Mensagem.Alert({
        titulo: "Excluir Parâmetro",
        mensagem: $("<span>Deseja realmente excluir esse cadastro?</span>")[0],
        tipo: "Alerta",
        botoes: [
            {
                botao: "Cancelar"
            },
            {
                botao: "Confirmar",
                callback: function () {
                    $.ajax({
                        url: "/Eventual/ExcluirParametrizacao",
                        type: "POST",
                        dataType: "json",
                        data: {
                            codigo: parseInt(codigo)
                        },
                        success: function (data, textStatus, xhr) {
                            if (data.TipoException == "sucesso") {
                                Mensagem.Alert({
                                    titulo: data.Title,
                                    mensagem: data.Message,
                                    tipo: data.TipoException,
                                    botao: "Fechar"
                                });
                                $("#formPesquisar").submit();
                            } else {
                                Mensagem.Alert({
                                    titulo: data.Title,
                                    mensagem: data.Message,
                                    tipo: data.TipoException,
                                    botao: "Fechar"
                                });
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            Mensagem.Alert({
                                titulo: jqXHR.responseJSON.Title,
                                mensagem: jqXHR.responseJSON.Message,
                                tipo: jqXHR.responseJSON.TipoException,
                                botao: "Fechar"
                            });
                        }
                    });
                },
            }
        ]
    });
}
//SE PASSAR APENAS A MENSAGEM O RESTANTE É 
function mensagemAlert(msg, titulo, tipo, escondido) {
    Mensagem.Alert({
        mensagem: msg,
        titulo: titulo === undefined ? "Parâmetro" : titulo,
        tipo: tipo === undefined ? "Aviso" : tipo,
        escondido: escondido === undefined ? String.empty : "Detalhes: \n" + escondido,
        botao: "Fechar"
    });
}