$(document).ready(function () {

    $.ajax({
        url: "/Eventual/ListarCargos",
        type: "GET",
        dataType: "json",
        success: function (data) {
            $("#codigoCargoAcumulacao").autocomplete({
                source: data,
                minLength: 2,
                select: function (event, ui) {//corrige o valor que aparece no textbox após a seleção da pessoa
                    $("#codigoCargoAcumulacao").val(ui.item.label);
                    $("#codigoCargoAcumulacao").data("codigo", ui.item.value);
                    return false;
                }
            });
        }
    });
    $.ajax({
        url: "/Eventual/ListarMunicipios",
        type: 'GET',
        dataType: "json",
        success: function (data) {
            $("#codigoMunicipioAcumulacao").autocomplete({
                source: data,
                minLength: 1,
                select: function (event, ui) {//corrige o valor que aparece no textbox após a seleção da pessoa
                    $("#codigoMunicipioAcumulacao").val(ui.item.label);
                    $("#codigoMunicipioAcumulacao").data("codigo", ui.item.value);
                    $("#codigoMunicipioAcumulacao").data("nome", ui.item.label);
                    return false;
                }
            });
        }
    });

    $.validator.addMethod("valdiarInicioExercicio", function (value, element) {
        var split = $("#dataInicioExercicio").val().split('/');
        if (split.length == 0) {
            return false;
        } else if (split[2] < $("#anoExercicioCadastro").val()) {
            return false;
        }
        return true;
    }, "Ano do início de exercício deve ser maior ou igual ao ano de exercício");
    $("#formCadastro").validate({
        ignore: true,
        rules: {
            anoExercicioCadastro: {
                required: true
            },
            cadastroCpf: {
                required: true,
                cpf: true
            },
            codigoBanco: {
                required: true
            },
            codigoAgencia: {
                required: true
            },
            numeroConta: {
                required: true
            },
            digitoConta: {
                required: true
            },
            anoDecisorio: {
                required: true
            },
            numeroDecisorio: {
                required: true
            },
            dataDoeDecisorio: {
                required: true
            },
            dataInicioExercicio: {
                required: true,
                valdiarInicioExercicio: true
            },
            CodigoDiretoria: {
                required: true
            },
            codigoUA: {
                required: true
            },
            codigoMunicipioAcumulacao: {
                required: true
            },
            "Acumulacao.CodigoLocal": {
                required: true
            },
            codigoDenominacao: {
                required: true
            },
            "Acumulacao.CodigoAcumulacao": {
                required: true
            },
            dataPublicacaoDoe: {
                required: true
            }
        },
        submitHandler: function () {

            $.ajax({
                url: "/Eventual/ValidarDataExercicio",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ dataExercicio: $("#dataInicioExercicio").val() }),
                success: function (data, textStatus, xhr) {
                    carregarDados();
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

            return;
        }
    });
    $("#controleDeAbas").sedTabControl({ embutida: true });
    $("#controleDeAbas2").sedTabControl({ embutida: true });
    //$("#codigoDiretoriaCadastro").autoPreencher($("#codigoEscolaCadastro"), "Eventual", "ListarEscolasUA");

    $("#codigoDiretoriaCadastro").on("change", function () {
        if (!this.selectedIndex && this.length > 1) return;
        var codigoDiretoria = $("#codigoDiretoriaCadastro option:selected").val() == "0" || $("#codigoDiretoriaCadastro option:selected").val() == "" || $("#codigoDiretoriaCadastro option:selected").val() == undefined ? 0 : parseInt($("#codigoDiretoriaCadastro option:selected").val());
        //$("#codigoUA").autocomplete("destroy");
        $("input#codigoUA").val("");
        $("input#codigoUA").data("codigo", "");
        $("input#codigoUA").data("nome", "");
        $.ajax({
            url: "/Eventual/ListarEscolas",
            type: "GET",
            data: {
                codigoDiretoria: codigoDiretoria
            },
            dataType: "json",
            success: function (data) {
                $("input#codigoUA").autocomplete({
                    source: data,
                    minLength: 1,
                    select: function (event, ui) {//corrige o valor que aparece no textbox após a seleção da pessoa
                        obterUA(ui.item.value);
                        $("input#codigoUA").val(ui.item.label);
                        $("input#codigoUA").data("codigo", ui.item.value);
                        $("input#codigoUA").data("nome", ui.item.label);
                        return false;
                    }
                });
            }
        });

    });

    $("#codigoDenominacao").on("change", function () {
        var codigo = $(this).val();
        codigo = codigo == "" || codigo == undefined ? 0 : parseInt(codigo);
        var cpf = $("#cpfCadastro").val().replace(/\./g, '').replace(/\-/g, '');
        if (codigo == 1) {
            $("#codigoCargoAcumulacao").val("");
            $("#codigoCargoAcumulacao").data("codigo", "");
            $.ajax({
                url: "/Eventual/ObterCargoAtivo",
                type: "GET",
                data: {
                    cpf: cpf
                },
                dataType: "json",
                success: function (data) {
                    if (data == "") {
                        $("#codigoCargoAcumulacao").val("Cargo não encontrado");
                        $("#codigoCargoAcumulacao").data("codigo", "");
                    } else {
                        $("#codigoCargoAcumulacao").val(data.Nome);
                        $("#codigoCargoAcumulacao").data("codigo", data.Codigo);
                    }
                }
            });
        } else {
            $("#codigoCargoAcumulacao").val("");
            $("#codigoCargoAcumulacao").data("codigo", "");
        }
    });

    AplicarMascaras();
});

function validarConteudoAbas() {
    $("#formCadastro").valid();
    $("#abaDadosDocenteEventualPai").removeClass("error");
    $("#abaDadosPessoaisPai").removeClass("error");
    $("#abaDadosFuncionaisPai").removeClass("error");
    $("#abaAcumulacaoPai").removeClass("error");
    $("#abaAtodecisorioPai").removeClass("error");
    $("#abaContabancariaPai").removeClass("error");

    if ($("#fieldsetabaDadosFuncionais input.error").length > 0) {
        $("#controleDeAbas").sedTabControl("atual", "abaDadosFuncionais");
        $("#abaDadosFuncionaisPai").addClass("error");

        if ($("#abaContabancaria input.error").length > 0) {
            $("#controleDeAbas2").sedTabControl("atual", "abaContabancaria");
            $("#abaContabancariaPai").addClass("error");
        }
        if ($("#abaAtodecisorio input.error").length > 0) {
            $("#controleDeAbas2").sedTabControl("atual", "abaAtodecisorio");
            $("#abaAtodecisorioPai").addClass("error");
        }
        if ($("#abaAcumulacao select.error").length > 0) {
            $("#controleDeAbas2").sedTabControl("atual", "abaAcumulacao");
            $("#abaAcumulacaoPai").addClass("error");
        }
    }
    if ($("#fieldsetabaDadosPessoais input.error").length > 0) {
        $("#controleDeAbas").sedTabControl("atual", "abaDadosPessoais");
        $("#abaDadosPessoaisPai").addClass("error");
    }
    if ($("#abaDadosDocenteEventual input.error").length > 0 || $("#abaDadosDocenteEventual select.error").length) {
        $("#controleDeAbas").sedTabControl("atual", "abaDadosDocenteEventual");
        $("#abaDadosDocenteEventualPai").addClass("error");
    }
}

function carregarDados() {
    var ContaBancaria = {
        CodigoBanco: "1",
        CodigoAgencia: $("#codigoAgencia").val().replace(/\./g, '').replace(/\-/g, ''),
        NumeroConta: $("#numeroConta").val().replace(/\./g, '').replace(/\-/g, ''),
        DigitoConta: parseInt($("#digitoConta").val().replace(/\./g, '').replace(/\-/g, ''))
    };

    if (!validar_conta(ContaBancaria.CodigoBanco, ContaBancaria.NumeroConta, ContaBancaria.DigitoConta)) {
        Mensagem.Alert({
            titulo: "Conta Bancária",
            mensagem: "Dados inválidos!",
            tipo: "alerta",
            botao: "Fechar"
        });
        $("#abaDadosFuncionaisPai").addClass("error");
        $("#abaContabancariaPai").addClass("error");
        $("#controleDeAbas").sedTabControl("atual", "abaDadosFuncionais");
        $("#controleDeAbas2").sedTabControl("atual", "abaContabancaria");
        return;
    }

    var AtoDecisorio = {
        DataDoe: $("#dataDoeDecisorio").val(),
        Codigo: parseInt($("#numeroDecisorio").val()),
        Ano: parseInt($("#anoDecisorio").val())
    };
    var Acumulacao = {
        CodigoAcumulacao: parseInt($("#codigoDenominacao").val()),
        CodigoLocal: parseInt($("#codigoLocal").val()),
        CodigoMunicipio: parseInt($("#codigoMunicipioAcumulacao").data("codigo")),
        CodigoCargo: parseInt($("#codigoCargoAcumulacao").data("codigo"))
    };

    var dados = {};
    dados.Nome = $("#NomeDocente").val();
    dados.AnoExercicio = parseInt($("#anoExercicioCadastro").val());
    dados.CodigoDiretoria = parseInt($("#codigoDiretoriaCadastro").val());
    dados.Cpf = $("#cpfCadastro").val().replace(/\./g, '').replace(/\-/g, '');
    dados.RgNumero = $("#rgNumeroCadastro").val().replace(/\./g, '').replace(/\-/g, '');
    dados.RgDigito = $("#rgDigitoCadastro").val();
    dados.RgUf = $("#rgUfCadastro").val();
    dados.CodigoUA = parseInt($("input#codigoUA").data("codigo"));
    dados.DataPublicacaoDoe = $("#dataDoeDecisorio").val();
    dados.DataNascimento = $("#dataNascimento").val();
    dados.DataInicioExercicio = $("#dataInicioExercicio").val();

    dados.Acumulacao = Acumulacao;
    dados.AtoDecisorio = AtoDecisorio;
    dados.ContaBancaria = ContaBancaria;

    var myObject = JSON.stringify(dados);

    SalvarDados(myObject);
}

function SalvarDados(dados) {
    $.ajax({
        url: action,
        type: "POST",
        data: dados,
        contentType: "application/json; charset=utf-8",
        success: function (data, textStatus, xhr) {
            $("#modalCadastrar").dialog("destroy");
            $("#formPesquisar").submit();
            Mensagem.Alert({
                titulo: data.Title,
                mensagem: data.Message,
                tipo: "sucesso", // aviso, erro, sucesso, alerta
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
    $("#codigoMunicipioCadastro").val("");
    $("#codigoMunicipioCadastro").data("codigo", "");
    $("#codigoMunicipioCadastro").data("nome", "");
    $.ajax({
        url: "/Eventual/ObterUA",
        type: "GET",
        data: {
            codigoUA: codigoUA
        },
        contentType: "application/json; charset=utf-8",
        success: function (data, textStatus, xhr) {
            $("#codigoMunicipioCadastro").val(data.CodigoMunicipio + " - " + data.NomeMunicipio);
            $("#codigoMunicipioCadastro").data("codigo", data.CodigoMunicipio);
            $("#codigoMunicipioCadastro").data("nome", data.NomeMunicipio);
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