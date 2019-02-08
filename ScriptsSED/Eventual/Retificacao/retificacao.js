var primeiraVez = true;
$(document).ready(function () {    
    $("#formCadastro").validate({
        ignore: true,
        rules: {
            "Retificacao.CodigoDiretoria": {
                required: true
            },
            codigoEscolaNovaUA: {
                required: true
            },
            'Retificacao.DataInicio': {
                required: true,
                dataMenorOuIgual: new Date()
            },
        },
        submitHandler: function () {
            carregarDados();
        }
    });
    $("#controleDeAbas").sedTabControl({ embutida: true });
    $("#codigoDiretoriaNovaUA").on("change", function () {
        //carregarCompleteUA();
        listarEscola();
    });
    $("#codigoEscolaNovaUA").on("change", function () {
        var codigoUA = $("#codigoEscolaNovaUA option:selected").val();
        obterUA(codigoUA);

    });
    AplicarMascaras();
});

//function carregarCompleteUA()
//{
//    debugger;
//    if (!this.selectedIndex && this.length > 1) return;
//    var codigoDiretoria = $("#codigoDiretoriaNovaUA option:selected").val() == "0" || $("#codigoDiretoriaNovaUA option:selected").val() == "" || $("#codigoDiretoriaNovaUA option:selected").val() == undefined ? 0 : parseInt($("#codigoDiretoriaNovaUA option:selected").val());
//    if (!primeiraVez)
//    {
//        $("input#codigoUANova").val("");
//        $("input#codigoUANova").data("codigo", "");
//        $("input#codigoUANova").data("nome", "");
//        $("#codigoMunicipioUANova").val("");
//        $("#codigoMunicipioUANova").data("codigo", "");
//        $("#codigoMunicipioUANova").data("nome", "");
//    }
//    else {
//        primeiraVez = false;
//    }
//    $.ajax({
//        url: "/Eventual/ListarEscolas",
//        type: "GET",
//        data: {
//            codigoDiretoria: codigoDiretoria
//        },
//        dataType: "json",
//        success: function (data) {
//            $("input#codigoUANova").autocomplete({
//                source: data,
//                minLength: 1,
//                select: function (event, ui) {//corrige o valor que aparece no textbox após a seleção da pessoa
//                    obterUA(ui.item.value);
//                    $("input#codigoUANova").val(ui.item.label);
//                    $("input#codigoUANova").data("codigo", ui.item.value);
//                    $("input#codigoUANova").data("nome", ui.item.label);
//                    return false;
//                }
//            });
//        }
//    });  
//}
function carregarDados() {
    var Retificacao = {
        CodigoUAAnterior: parseInt($("input#codigoUA").val()),
        CodigoMunicipioAnterior: parseInt($("#codigoMunicipioUA").val()),
        DataInicioUA: $("#dataInicioNovaUA").val(),
        CodigoDiretoria: parseInt($("#codigoDiretoriaNovaUA").val()),
        NomeDiretoria: $("#codigoDiretoriaNovaUA option:selected").text(),
       // CodigoUA: parseInt($("#codigoUANova").val()),
        CodigoUA: $("#formCadastro select#codigoEscolaNovaUA option:selected").val(),
        CodigoMunicipioDne: parseInt($("#codigoMunicipioUANova").data('codigo')),
        NomeMunicipio: $("#codigoMunicipioUANova").data("nome"),
        DataRetificacao: $("#DataRetificacao").val()
    };

    var dados = {};
    dados.CodigoUA = parseInt($("input#codigoUA").data("codigo"));
    dados.NomeUA = $("input#codigoUA").data("nome");
    dados.Cpf = $("#cpfCadastro").val().replace(/\./g, '').replace(/\-/g, '');
    dados.AnoExercicio = JSON.parse($("#dataExercicio").val().split("/")[2]);
    dados.CodigoDiretoria = $("#codigoDiretoria").val();

    dados.Retificacao = Retificacao;

    var myObject = JSON.stringify(dados);

    SalvarDados(myObject);
}
function SalvarDados(dados) {
    $.ajax({
        url: action,
        type: "POST",
        data: dados,
        dataType: "JSON",
        contentType: "APPLICATION/JSON; CHARSET=UTF-8",
        success: function (data, textStatus, xhr) {
            if (data.TipoException == "sucesso") {
                $("#modalCadastrar").dialog("destroy");
                $("#formPesquisar").submit();
            }
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
}
function obterUA(codigoUA) {
    $("#codigoMunicipioUANova").val("");
    $("#codigoMunicipioUANova").data("codigo", "");
    $("#codigoMunicipioUANova").data("nome", "");
    if (codigoUA > 0) {
        $.ajax({
            url: "/Eventual/ObterUA",
            type: "GET",
            data: {
                codigoUA: codigoUA
            },
            contentType: "APPLICATION/JSON; CHARSET=UTF-8",
            success: function (data, textStatus, xhr) {
                $("#codigoMunicipioUANova").val(data.CodigoMunicipio + " - " + data.NomeMunicipio);
                $("#codigoMunicipioUANova").data("codigo", data.CodigoMunicipio);
                $("#codigoMunicipioUANova").data("nome", data.NomeMunicipio);
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
    }    
}
function listarEscola() {
    var select = "";
    var CodigoDiretoria = "";
    select = $("#formCadastro select#codigoEscolaNovaUA");
    select.empty();
    CodigoDiretoria = $("#codigoDiretoriaNovaUA option:selected").val();
    if (CodigoDiretoria != "") {
        $.ajax({
            url: '/Eventual/ListarEscolas',
            type: "GET",
            data: {
                codigoDiretoria: parseInt(CodigoDiretoria)
            },
            success: function (data) {
                if (data.length == 0 || data.length > 1) {
                    select.append($('<option/>', {
                        value: "",
                        text: "Selecione..."
                    }));
                }
                $.each(data, function (index, itemData) {
                    select.append($("<option/>", {
                        value: itemData.value,
                        text: itemData.text
                    }));
                });
                select.trigger("change");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            }
        });
    }
}