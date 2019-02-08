$(document).ready(function () {
    $("#formCadastro").validate({
        ignore: true,
        submitHandler: function () {
            carregarDados();
            return;
        }
    });
    $("#controleDeAbas").sedTabControl({ embutida: true });
    $("#codigoMotivoDispensa").change(function () {
        if ($(this).find("option:selected").val() == "5") {
            $("#divDataFalecimento").show("slow");
        } else {
            $("#divDataFalecimento").hide("slow");
            $("#dataFalecimento").focus();
        }
    });
    AplicarMascaras();
});

function carregarDados() {
    var dados = {};
    dados.AnoExercicio = parseInt($("#anoExercicioCadastro").val());
    dados.Cpf = $("#cpfCadastro").val().replace(/\./g, '').replace(/\-/g, '');
    dados.DataTornadoSemEfeitoExtincao = $("#dataTornadoSemEfeito").val();

    var myObject = JSON.stringify(dados);

    SalvarDados(myObject);
}

function SalvarDados(dados) {
    $.ajax({
        url: "/Eventual/TornarSemEfeitoExtincaoContrato",
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