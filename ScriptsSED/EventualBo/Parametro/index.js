﻿$(document).ready(function () {
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
                url: "/EventualBo/ListarParametro",
                type: "POST",
                data: filtros,
                success: function (data, textStatus, xhr) {
                    $("#divResultado").html(data);
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


function adicionarParametro() {
    $.ajax({
        url: "/EventualBo/CadastrarParametro",
        type: "POST",
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
function editarParametro(codigo) {
    $.ajax({
        url: "/EventualBo/EditarParametro",
        type: "POST",
        data: {
            codigo: parseInt(codigo)
        },
        success: function (data, textStatus, xhr) {
            $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                title: "Editar Parâmetro",
                destroy: true
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
                botao: "Confirmar",
                callback: function () {
                    $.ajax({
                        url: "/EventualBo/ExcluirParametro",
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
            },
            {
                botao: "Cancelar"
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
function mostrarAjudaPesquisa() {
    Mensagem.Alert({
        titulo: "Ajuda",
        mensagem: $("<span>1º Cadastre o(s) período(s) que pode(m) conter substituição do professor por eventual no ano informado</span>")[0],
        tipo: "aviso",
        botao: "Fechar"
    });
}