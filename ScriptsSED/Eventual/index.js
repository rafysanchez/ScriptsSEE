$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    $("#formPesquisar").validate({
        rules: {
            
            anoExercicio: {
                required: true
            },
            codigoDiretoria: {
                required: function () {
                    var rgNumero = $("#rgNumero").val();
                    var rgDigito = $("#rgDigito").val();
                    var rgUf = $("#rgUf").val();
                    var cpf = $("#cpf").val().replace(/\./g, '').replace(/\-/g, '');
                    if (CEPAG && (rgNumero != "" || rgDigito != "" || rgUf != "" || cpf != "")) {
                        return false;
                    } else {
                        return true;
                    }
                }
            },

            codigoUA: {
                required: function () {
                    if (diretoria == false) {
                        var rgNumero = $("#rgNumero").val();
                        var rgDigito = $("#rgDigito").val();
                        var rgUf = $("#rgUf").val();
                        var cpf = $("#cpf").val().replace(/\./g, '').replace(/\-/g, '');

                        if ((CEPAG || diretoria) && ((cpf != "") || (rgNumero != "" || rgDigito != "" || rgUf != ""))) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
            },

            rgNumero: {
                required: function () {
                    var rgDigito = $("#rgDigito").val();
                    var rgUf = $("#rgUf").val();
                    if (rgDigito != "" || rgUf != "") {
                        return true;
                    }
                    return false;
                }
            },
        },
        submitHandler: function (form) {
            
            var filtros = {
                anoExercicio: $("#anoExercicio").val(),
                codigoDiretoria: $("#codigoDiretoria").val(),
                codigoUA: $("#codigoUA").val(),
                cpf: $("#cpf").val().replace(/\./g, '').replace(/\-/g, ''),
                rgNumero: $("#rgNumero").val(),
                rgDigito: $("#rgDigito").val(),
                rgUf: $("#rgUf").val(),
                codigoStatus: $("#codigoStatus").val()
            };

            if (filtros.anoExercicio == "" || filtros.anoExercicio == undefined) {
                $("#anoExercicio").addClass("error");
                return;
            }

            filtros.codigoDiretoria = filtros.codigoDiretoria == "" || filtros.codigoDiretoria == undefined ? 0 : filtros.codigoDiretoria;
            filtros.codigoUA = filtros.codigoUA == "" || filtros.codigoUA == undefined ? 0 : filtros.codigoUA;
            filtros.codigoStatus = filtros.codigoStatus == "" || filtros.codigoStatus == undefined ? 0 : parseInt(filtros.codigoStatus);

            $.ajax({
                url: "/Eventual/Pesquisar",
                type: "POST",
                data: filtros,
                success: function (data, textStatus, xhr) {
                    $("#divResulta").html(data);
                    $("#resultadoPesquisa").sedDataTable({
                        columnDefs: [{
                            targets: "nosort",
                            orderable: false
                        }]
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
    $("#codigoDiretoria").autoPreencher($("#codigoUA"), "Escola", "CarregarListaEscolasUA");

    var rgNumero = $("#rgNumero").val();
    var rgDigito = $("#rgDigito").val();
    var rgUf = $("#rgUf").val();
    var cpf = $("#cpf").val().replace(/\./g, '').replace(/\-/g, '');

    $("#rgNumero").on("change", function () {
        limparCampo("cpf");
    });
    $("#rgDigito").on("change", function () {
        limparCampo("cpf");
    });
    $("#rgUf").on("change", function () {
        limparCampo("cpf");
    });
    $("#cpf").on("change", function () {
        limparCampo("rgNumero");
        limparCampo("rgDigito");
        limparCampo("rgUf");
        $("#rgUf option[value=]").attr("selected", true);
    });


});
function limparCampo(nomeCampo) {
    $("#" + nomeCampo + "-error").remove();
    $("#" + nomeCampo).removeClass("error");
    $("#" + nomeCampo).val("");
}
function adcionarEventual() {
    $.ajax({
        url: "/Eventual/Cadastrar",
        success: function (data, textStatus, xhr) {
            $("<div id='modalPesquisa'>" + data + "</div>").dialog({
                title: "Cadastro de Eventual",
                focusElement: "cadastroCpf",
                destroy: true
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}
function visualizarEventual(anoExercicio, cpf) {
    $.ajax({
        url: "/Eventual/VisualizarEventual",
        type: "POST",
        data: {
            anoExercicio: parseInt(anoExercicio),
            cpf: cpf
        },
        success: function (data, textStatus, xhr) {
            $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                title: "Cadastro de Eventual",
                destroy: true,
                width: 700
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}

function editarEventual(nrAno, nrCpf, lDBanco) {
    $.ajax({
        url: "/Eventual/EditarEventual",
        type: "POST",
        data: {
            nrAno: parseInt(nrAno),
            nrCpf: nrCpf,
            lDBanco: lDBanco
        },
        success: function (data) {
            $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                title: "Cadastro de Eventual",
                focusElement: "cadastroCpf",
                destroy: true,
                width: 700,
                open: function() {
                    if (lDBanco)
                        fncLDBanco();
                }
            });
        },
        error: function (jqXhr) { mensagemAlert("Ocorreu um erro durante o processamento!", jqXhr.responseJSON.Title, jqXhr.responseJSON.TipoException, jqXhr.responseJSON.Message) }
    });
}

function fncLDBanco() {
    $("#modalCadastrar").data("ALTERAR_APENAS_DADOS_BANCARIOS", 1);
    $("#abaContabancaria input, #abaContabancaria select").removeProp("disabled").removeProp("readonly");
}

function homologar(anoExercicio, cpf) {
    Mensagem.Alert({
        titulo: "Homologar",
        mensagem: $("<span>Deseja realmente homologar esse cadastro?</span>")[0],
        tipo: "Alerta",
        botoes: [
            {
                botao: "Confirmar",
                callback: function () {
                    $.ajax({
                        url: "/Eventual/Homologar",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            anoExercicio: parseInt(anoExercicio),
                            cpf: cpf
                        },
                        success: function (data, textStatus, xhr) {
                            $("#formPesquisar").submit();
                            Mensagem.Alert({
                                titulo: data.Title,
                                mensagem: data.Message,
                                tipo: data.TipoException, // aviso, erro, sucesso, alerta
                                botao: "Fechar"
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            Mensagem.Alert({
                                titulo: jqXHR.responseJSON.Title,
                                mensagem: jqXHR.responseJSON.Message,
                                tipo: jqXHR.responseJSON.TipoException,
                                escondido: jqXHR.responseJSON.Escondido,
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
function cancelarHomologacao(anoExercicio, cpf) {
    Mensagem.Alert({
        titulo: "Cancelar homologação",
        mensagem: $("<span>Deseja realmente cancelar essa homologação?</span>")[0],
        tipo: "Alerta",
        botoes: [
            {
                botao: "Confirmar",
                callback: function () {
                    $.ajax({
                        url: "/Eventual/Homologar",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            anoExercicio: parseInt(anoExercicio),
                            cpf: cpf,
                            cancelarHomologacao: true
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
                                    tipo: data.TipoException, // aviso, erro, sucesso, alerta
                                    botao: "Fechar"
                                });
                            }

                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            Mensagem.Alert({
                                titulo: jqXHR.responseJSON.Title,
                                mensagem: jqXHR.responseJSON.Message,
                                tipo: jqXHR.responseJSON.TipoException,
                                escondido: jqXHR.responseJSON.Escondido,
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
function salvarDevolver(anoExercicio, cpf) {
    Mensagem.Alert({
        titulo: "Devolver cadastro",
        mensagem: $("<span>Deseja realmente devolver esse cadastro?</span>")[0],
        tipo: "Alerta",
        botoes: [
            {
                botao: "Confirmar",
                callback: function () {
                    var msgObservacao = $("#txtObservacao").val();
                    if (msgObservacao.trim().length <= 0) {
                        Mensagem.Alert({
                            titulo: "Campos Obrigatórios",
                            mensagem: "Preencha o motivo de devolução",
                            tipo: "alerta",
                            botao: "Fechar"
                        });
                    }
                    $.ajax({
                        url: "/Eventual/Devolver",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            anoExercicio: parseInt(anoExercicio),
                            cpf: cpf,
                            msgObservacao: msgObservacao
                        },
                        success: function (data, textStatus, xhr) {
                            if (data.TipoException == "sucesso") {
                                Mensagem.Alert({
                                    titulo: data.Title,
                                    mensagem: data.Message,
                                    tipo: data.TipoException,
                                    botao: "Fechar"
                                });
                                $("#modalMotivoDevolucao").dialog("destroy");
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
function devolver(anoExercicio, cpf) {
    var data = "<div class='form-group'><label>Motivo de Devolução:</label><div><textarea  id='txtObservacao' cols='40' rows='5' class='form-control' maxlength='300'/></div></div><div class='modal-footer embutido'><button type='submit' class='btn btn-info' onclick='salvarDevolver(" + anoExercicio + "," + cpf + ");'>Salvar</button><button type='button' class='btn btn-info' onclick=\"$('#modalMotivoDevolucao').dialog('destroy')\">Voltar</button></div>";
    $("<div id='modalMotivoDevolucao'>" + data + "</div>").dialog({
        title: "Motivo",
        focusElement: "txtObservacao",
        destroy: true
    });
}
function excluir(anoExercicio, cpf) {
    Mensagem.Alert({
        titulo: "Excluir cadastro",
        mensagem: $("<span>Deseja realmente excluir esse cadastro?</span>")[0],
        tipo: "Alerta",
        botoes: [
            {
                botao: "Confirmar",
                callback: function () {
                    $.ajax({
                        url: "/Eventual/Excluir",
                        type: "POST",
                        dataType: "JSON",
                        data: {
                            anoExercicio: parseInt(anoExercicio),
                            cpf: cpf
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
        titulo: titulo === undefined ? "Eventual" : titulo,
        tipo: tipo === undefined ? "Aviso" : tipo,
        escondido: escondido === undefined ? undefined : "Detalhes: \n" + escondido,
        botao: "Fechar"
    });
}