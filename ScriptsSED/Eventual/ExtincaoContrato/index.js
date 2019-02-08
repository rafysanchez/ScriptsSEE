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
            //rgDigito: {
            //    required: function () {
            //        var rgNumero = $("#rgNumero").val();
            //        var rgUf = $("#rgUf").val();
            //        if (rgNumero != "" || rgUf != "") {
            //            return true;
            //        }
            //        return false;
            //    }
            //},
            rgUf: {
                required: function () {
                    var rgDigito = $("#rgDigito").val();
                    var rgNumero = $("#rgNumero").val();
                    if (rgNumero != "" || rgDigito != "") {
                        return true;
                    }
                    return false;
                }
            }
        },
        submitHandler: function (form) {

            var filtros = {
                anoExercicio: $("#anoExercicio").val(),
                codigoDiretoria: $("#codigoDiretoria").val(),
                codigoUA: $("#codigoUA").val(),
                cpf: $("#cpf").val().replace(/\./g, '').replace(/\-/g, ''),
                rgNumero: $("#rgNumero").val(),
                rgDigito: $("#rgDigito").val(),
                rgUf: $("#rgUf").val()
            };

            if (filtros.anoExercicio == "" || filtros.anoExercicio == undefined) {
                $("#anoExercicio").addClass("error");
                return;
            }

            filtros.codigoDiretoria = filtros.codigoDiretoria == "" || filtros.codigoDiretoria == undefined ? 0 : filtros.codigoDiretoria;
            filtros.codigoUA = filtros.codigoUA == "" || filtros.codigoUA == undefined ? 0 : filtros.codigoUA;

            $.ajax({
                url: "/Eventual/PesquisarExtincaoContrato",
                type: "GET",
                data: filtros,
                success: function (data, textStatus, xhr) {
                    $("#divResulta").html(data);
                    $("#resultadoPesquisa").sedDataTable({
                        columnDefs: [{
                            targets: "nosort",
                            orderable: false,
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
function extinguir(anoExercicio, cpf) {
    $.ajax({
        url: "/Eventual/ExtincaoContratoEventual",
        type: "POST",
        data: {
            anoExercicio: parseInt(anoExercicio),
            cpf: cpf
        },
        success: function (data, textStatus, xhr) {
            if (data.TipoException != undefined ) {
                Mensagem.Alert({
                    mensagem: data.Message,
                    titulo: data.Title,
                    tipo: data.TipoException,
                    botao: "Fechar"
                });
            } else {
                $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                    title: "Extinguir contrato",
                    destroy: true
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}
function homologar(anoExercicio, cpf) {
    Mensagem.Alert({
        titulo: "Homologar",
        mensagem: $("<span>Deseja realmente homologar essa extinção de contrato/dispensa?</span>")[0],
        tipo: "Alerta",
        botoes: [
            {
                botao: "Confirmar",
                callback: function () {
                    $.ajax({
                        url: "/Eventual/HomologarExtincaoContrato",
                        type: "POST",
                        dataType: "json",
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
                        url: "/Eventual/HomologarExtincaoContrato",
                        type: "POST",
                        dataType: "json",
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

function devolver(anoExercicio, cpf) {
    var data = "<div class='form-group'><label>Motivo de Devolução:</label><div><textarea  id='txtObservacao' cols='40' rows='5' class='form-control' maxlength='300'/></div></div><div class='modal-footer embutido'><button type='submit' class='btn btn-info' onclick='salvarDevolver(" + anoExercicio + ",\"" + cpf + "\");'>Salvar</button><button type='button' class='btn btn-info' onclick=\"$('#modalMotivoDevolucao').dialog('destroy')\">Voltar</button></div>";
    $("<div id='modalMotivoDevolucao'>" + data + "</div>").dialog({
        title: "Motivo",
        focusElement: "txtObservacao",
        destroy: true
    });
}
function salvarDevolver(anoExercicio, cpf) {
    Mensagem.Alert({
        titulo: "Devolver extinção de contrato/dispensa",
        mensagem: $("<span>Deseja realmente devolver essa extinção de contrato/dispensa?</span>")[0],
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
                        return;
                    }
                    $.ajax({
                        url: "/Eventual/DevolverExtincaoContrato",
                        type: "POST",
                        dataType: "json",
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
                                    botoes: [{
                                        botao: "Fechar",
                                        callback: function () {
                                            $("#formPesquisar").submit();
                                            $("#modalMotivoDevolucao").dialog('destroy');
                                        }
                                    }]
                                });
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

function visualizar(anoExercicio, cpf) {
    $.ajax({
        url: "/Eventual/VisualizarExtincaoContratoEventual",
        type: "POST",
        data: {
            anoExercicio: parseInt(anoExercicio),
            cpf: cpf
        },
        success: function (data, textStatus, xhr) {
            $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                title: "Extinção de contrato/dispensa",
                width: 800,
                destroy: true
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}
function removerClassError() {
    $("#codigoDiretoria").removeClass("error");
    $("#codigoUA").removeClass("error");
    $("#cpf").removeClass("error");
    $("#rgNumero").removeClass("error");
    $("#rgDigito").removeClass("error");
    $("#rgUf").removeClass("error");
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
