
function preencherEscolas() {
    $("#CodigoEscola").html("");
    $("#CodigoEscola").append("<option>Selecione...</option>")
    for (var i = 0; i < dadosMatricula.length; i++) {
        var ma = dadosMatricula[i];
        var item = $("#CodigoEscola option[value='" + ma.CodigoEscola + "']");
        if (item.length == 0) {
            $("#CodigoEscola").append("<option value='" + ma.CodigoEscola + "'>" + ma.NomeEscola + "</option>");
        }
    }
}

function carregarListaTurmaPorAluno() {
    var codigoEscola = parseInt($('#CodigoEscola').val());

    $("#CodigoTurma").html("");
    $("#CodigoTurma").append("<option>Selecione...</option>")
    for (var i = 0; i < dadosMatricula.length; i++) {
        var ma = dadosMatricula[i];
        if (ma.CodigoEscola != codigoEscola) continue;
        var item = $("#CodigoTurma option[value='" + ma.CodigoMatriculaAluno + "']");
        if (item.length == 0) {
            $("#CodigoTurma").append("<option value='" + ma.CodigoMatriculaAluno + "'>" + ma.NomeTurma + "</option>");
        }
    }
}

$(document).ready(function () {

    $("#frmFiltroBoletim").validate({
        rules: {
            AnoLetivo: { required: true, number: true, max: new Date().getFullYear() },
            "RA.Numero": { required: true, number: true },
            "RA.UF": { required: true },
            "RA.DataNascimento": { required: true, dataValida: true }
        },
        messages: {
            RA_Numero: {
                number: "Somente números"
            },
            AnoLetivo: {
                max: "Informe um ano letivo igual ou menor que " + new Date().getFullYear(),
                number: "Somente números"
            },
        },
        submitHandler: function (form) {
            $.ajax({
                url: "/Boletim/BoletimAlunoInfo",
                type: "POST",
                data: $(form).serialize(),
                success: function (data) {
                    if (data == null || data == "") {
                        return;
                    }
                    $("<div></div>").html(data).dialog({
                        destroy: true,
                        title: "Dados do Aluno",
                        width: "md",
                        buttons: {
                            "Gerar Boletim": function () {
                                if ($("#CodigoTurma").val() == null || $("#CodigoTurma").val() == "" || $("#CodigoTurma").val() == "Selecione...") {
                                    return;
                                }
                                gerarBoletim();
                            },
                            "Voltar": function () {
                                $(this).dialog("destroy");
                        }
                        },
                        open: function () {
                            
                        },
                    });
                },
                
            });
            return;
        }
    });

    AplicarMascaras();
});


function gerarBoletim() {
    $.ajax({
        cache: false,
        url: "/Boletim/BoletimChatPdf",
        type: "POST",
        datatype: "JSON",
        data: {
            anoLetivo: $("#AnoLetivo").val(),
            codigoMatriculaAluno: $("#CodigoTurma").val()
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {

            if (data == "null") {

                Mensagem.IgnorarMensagensAutomaticas = true;
                Mensagem.Alert({
                    titulo: "Aviso",
                    mensagem: "Não foi encontrado informações para a geração do boletim",
                    tipo: "alerta",
                    botao: "Fechar",
                    callback: function () {
                        Mensagem.IgnorarMensagensAutomaticas = false;
                        Mensagem.Fechar();
                    }
                });
            } else {
                boletimPdf.gerar(JSON.parse(data));
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            Mensagem.Alert({
                                titulo: "Aviso",
                                mensagem: "Houve um erro ao processar o Boletim",
                                tipo: "Aviso",
                                botao: "Fechar"
                            });
        }
    });
};