var fecharMensagemDialogPesquisa = false;
$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
    $("#modalPesquisa").on("focusin", function () {
        if (fecharMensagemDialogPesquisa) {
            $("#modalPesquisa").dialog("destroy");
            fecharMensagemDialogPesquisa = false;
        }
    });
    $("#formPesquisarPessoalEventual").validate({
        rules: {
            pesquisaAnoExercicio: {
                required: true
            },
            cadastroCpf: {
                required: true,
                cpf: true
            }
        },
        submitHandler: function (form) {
            var ano = $("#pesquisaAnoExercicio").val();
            $.ajax({
                url: "/Eventual/ListarParametrizacoesJson",
                type: "POST",
                data: {
                    anoExercicio: parseInt(ano),
                    ativo: true
                },
                success: function (data, textStatus, xhr) {
                    $("#pesquisaAnoExercicio").removeClass("error");
                    $.ajax({
                        url: "/Eventual/ValidarCadastroEventual",
                        type: "POST",
                        data: {
                            anoExercicio: ano,
                            cpf: $("#cadastroCpf").val().replace(/\./g, '').replace(/\-/g, '')
                        },
                        success: function (data, textStatus, xhr) {
                            if (data.length > 200) {
                                $("#modalPesquisa").dialog("destroy");
                                $("<div id='modalCadastrar'>" + data + "</div>").dialog({
                                    title: "Cadastro de Eventual",
                                    destroy: true,
                                    width: 700
                                });
                            } else {
                                Mensagem.Alert({
                                    mensagem: data.Message,
                                    titulo: data.Title,
                                    tipo: data.TipoException,
                                    botao: "Fechar"
                                });
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            Mensagem.Alert({
                                mensagem: jqXHR.responseJSON.Message,
                                titulo: jqXHR.responseJSON.Title,
                                tipo: jqXHR.responseJSON.TipoException,
                                Escondido: jqXHR.responseJSON.Escondido,
                                botao: "Fechar"
                            });
                        }
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Mensagem.Alert({
                        mensagem: jqXHR.responseJSON.Message,
                        titulo: jqXHR.responseJSON.Title,
                        tipo: jqXHR.responseJSON.TipoException,
                        botao: "Fechar"
                    });
                    $("#pesquisaAnoExercicio").focus();
                    $("#pesquisaAnoExercicio").addClass("error");
                }
            });
            return;
        }
    });
    AplicarMascaras();
});