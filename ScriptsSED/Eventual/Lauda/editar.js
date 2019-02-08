$(document).ready(function () {
    $.validator.addMethod("validarNovaData", function (value, element) {
        var dataArray = $("#dataPublicacao").val().split("/");
        var dataPublicacao = new Date(dataArray[2], dataArray[1] - 1, dataArray[0]);
        var dataPublicacaoAtualizada = $("#dataPublicacaoAtualizada").datepicker("getDate");
        if (dataPublicacaoAtualizada <= dataPublicacao) {
            return false;
        }
        else {
            return true;
        }
    }, "A nova data de publicação deve ser maior que a atual.");
    $.validator.addMethod("validarAno", function (value, element) {
        if (value != "") {
            var dataArray = value.split("/");
            var ano = parseInt(dataArray[2]);
            var anoLauda = parseInt($("#anoExercicioLauda").val());
            if (ano != anoLauda) {
                return;
            }
        }
        return true;
    }, "A data da publicação não pode ser aos domingos e segundas.");
    $.validator.addMethod("validarFimDeSemana", function (value, element) {
        var diaDaSemana = $("#dataPublicacaoAtualizada").datepicker("getDate").getDay();
        if (diaDaSemana == 0 || diaDaSemana == 1) {
            return false;
        }
        else {
            return true;
        }
    }, "O dia de publicação não pode ser domingo e segunda.");
    $("#formLauda").validate({
        rules: {
            dataPublicacaoAtualizada: {
                required: true,
                validarNovaData: true,
                validarFimDeSemana: true,
                validarAno: true
            }
        },
        submitHandler: function () {
            var dados = {
                codigoLauda: parseInt($("#codigo").val()),
                dataPublicacaoAtualizada: $("#dataPublicacaoAtualizada").val()
            };
            var myObject = JSON.stringify(dados);

            $.ajax({
                url: "/Eventual/AtualizarDataPublicacao",
                type: "POST",
                data: myObject,
                contentType: "application/json; charset=utf-8",
                success: function (data, textStatus, xhr) {
                    if (data.TipoException == "sucesso") {
                        $("#modalLauda").dialog("destroy");
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
                    mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
                }
            });
            return;
        }
    });

    $("#controleDeAbas").sedTabControl({
        embutida: true
    });
    $("#tabelaInclusao").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });
    $("#tabelaRetificacaoUA").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });
    $("#tabelaExtincao").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });
    $("#tabelaSemEfeitoInclusao").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });
    $("#tabelaSemEfeitoExtincao").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });
    $("#tabelaDispensa").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });
    AplicarMascaras();
});
function gerarLaudaGeral() {
    $.ajax({
        url: "/Eventual/GerarArquivoLauda",
        type: "POST",
        success: function (data, textStatus, xhr) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}
function alterarDataPublicacao() {
    var dados = {};
    dados.codigoLauda = parseInt($("#codigo").val());
    dados.AnoExercicio = $("#dataPublicacaoAtualizada").val();

    var myObject = JSON.stringify(dados);

    $.ajax({
        url: "/Eventual/AtualizarDataPublicacao",
        type: "POST",
        data: dados,
        contentType: "application/json; charset=utf-8",
        success: function (data, textStatus, xhr) {
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensagemAlert("Ocorreu um erro durante o processamento!", jqXHR.responseJSON.Title, jqXHR.responseJSON.TipoException, jqXHR.responseJSON.Message)
        }
    });
}