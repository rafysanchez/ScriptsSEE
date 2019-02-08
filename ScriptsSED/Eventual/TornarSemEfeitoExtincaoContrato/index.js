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
                url: "/Eventual/PesquisarTornarSemEfeitoExtincaoContrato",
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
function tornarSemEfeito(anoExercicio, cpf) {
    $.ajax({
        url: "/Eventual/TornarSemEfeitoExtincaoContratoEventual",
        type: "GET",
        data: {
            anoExercicio: parseInt(anoExercicio),
            cpf: cpf
        },
        success: function (data, textStatus, xhr) {
            $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                title: "Tornar sem efeito extinção",
                destroy: true
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}
function visualizar(anoExercicio, cpf) {
    $.ajax({
        url: "/Eventual/VisualizarTornarSemEfeitoExtincaoContratoEventual",
        type: "POST",
        data: {
            anoExercicio: parseInt(anoExercicio),
            cpf: cpf
        },
        success: function (data, textStatus, xhr) {
            $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                title: "Tornar sem efeito extinção",
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