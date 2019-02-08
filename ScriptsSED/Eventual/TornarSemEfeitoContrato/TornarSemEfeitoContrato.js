$(document).ready(function () {
    $("#formCadastro").validate({
        codigoMotivo:{
            required: true
        },
        submitHandler: function () {
            if ($("#codigoMotivo option:selected").val() == "") {
                $("#codigoMotivo").addClass("error");
                return;
            }
            $("#codigoMotivo").removeClass("error")
            carregarDados();
            return;
        }
    });
    $("#controleDeAbas").sedTabControl({ embutida: true });
    AplicarMascaras();
});

function carregarDados() {
    var dados = {};
    dados.CodigoEventual = parseInt($("#codigoEventual").val());
    dados.MotivoTornarSemEfeitoContrato = $("#codigoMotivo").val();
    dados.DataTornadoSemEfeito = $("#dataTornadoSemEfeito").val();

    var myObject = JSON.stringify(dados);

    SalvarDados(myObject);
}
function SalvarDados(dados) {
    $.ajax({
        url: "/Eventual/TornarSemEfeitoContrato",
        type: "POST",
        data: dados,
        contentType: "APPLICATION/JSON; CHARSET=UTF-8",
        success: function (data, textStatus, xhr) {
            if (data.TipoException == "sucesso") {
                $("#modalCadastrar").dialog("destroy");
                $("#formPesquisar").submit();
                Mensagem.Alert({
                    titulo: data.Title,
                    mensagem: data.Message,
                    tipo: "sucesso",
                    botao: "Fechar"
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
                escondido: jqXHR.responseJSON.Escondido,
                botao: "Fechar"
            });
        }
    });
}