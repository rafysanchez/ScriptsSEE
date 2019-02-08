var primeiraVez = true;
$(document).ready(function () {

    $.validator.addMethod("dataMaiorOuIgual", function (value, element, params) {

        if ($(params).val() != '' && value != '') {
            return value >= $(params).val();
        }
        return true;

    }, 'Deve ser maior ou igual a data Início Exercício ');
    $.validator.addMethod("validarDataInicioExercicio", function (value, element) {
        var split = $("#dataInicioExercicio").val().split('/');
        if (split.length == 0) {
            return false;
        } else if (split[2] < $("#anoExercicioCadastro").val()) {
            return false;
        }
        return true;
    }, "O ano da Data Início de exercício deve ser maior ou igual ao ano de exercício");
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
            dataInicioExercicio: {
                required: true,
                validarDataInicioExercicio: true
            },
            codigoDiretoriaCadastro: {
                required: true
            },
            codigoUACadastro: {
                required: true
            },
            codigoDenominacao: {
                required: function () {

                    var codigoLocal = $("#codigoLocal").val();
                    return codigoLocal.length > 0;
                }
            },
            codigoMunicipioAcumulacao: {
                required: function () {
                    var codigoLocal = $("#codigoLocal").val();
                    return codigoLocal.length > 0;
                }
            },
            'Acumulacao.NomeCargo': {
                required: function () {
                    var codigoLocal = $("#codigoLocal").val();
                    return codigoLocal.length > 0;
                }
            },
            anoDecisorio: {
                required: function () {
                    var codigoLocal = $("#codigoLocal").val();
                    return codigoLocal.length > 0;
                },
                minlength: 4
            },
            dataDoeDecisorio: {
                dataMenorOuIgual: dataInicioExercicio
            }
        },
        submitHandler: function () {
            $.ajax({
                url: "/Eventual/ValidarDataExercicio",
                type: "POST",
                contentType: "APPLICATION/JSON; CHARSET=UTF-8",
                data: JSON.stringify({ dataExercicio: $("#dataInicioExercicio").val() }),
                success: function (data, textStatus, xhr) {
                    if (data.TipoException != "sucesso") {
                        Mensagem.Alert({
                            titulo: data.Title,
                            mensagem: data.Message,
                            tipo: "aviso",
                            botao: "Fechar"
                        });
                        return;
                    }
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
    $("#codigoDiretoriaCadastro").on("change", function () {listarEscola();});
    $("#codigoUACadastro").on("change", function() {obterUA($("#codigoUACadastro option:selected").val());});

    AplicarMascaras();
    if (primeiraVez) {
        if ($("#codigoDiretoriaCadastro option").size() == 2) {
            $("#codigoDiretoriaCadastro").prop('selectedIndex', 1);
            listarEscola();
            $("#codigoDiretoriaCadastro").attr('readonly', true);
        }
    }
    else { primeiraVez = false; }
    ObterAcumulacao();
});


function listarEscola() {
    var select = "";
    $("#codigoMunicipioCadastro").val("");
    $("#codigoMunicipioCadastro").data("codigo", "");
    $("#codigoMunicipioCadastro").data("nome", "");

    select = $("#formCadastro select#codigoUACadastro");
    select.empty();
    var CodigoDiretoria = $("#codigoDiretoriaCadastro option:selected").val() == "0" || $("#codigoDiretoriaCadastro option:selected").val() == "" || $("#codigoDiretoriaCadastro option:selected").val() == undefined ? 0 : parseInt($("#codigoDiretoriaCadastro option:selected").val());
    if (CodigoDiretoria != "") {
        $.ajax({
            url: '/Eventual/ListarEscolas',
            type: "GET",
            data: {
                codigoDiretoria: parseInt(CodigoDiretoria)
            },
            success: function (data) {
                if (data != null) {
                    if (data.length == 0 || data.length > 1) {
                        select.append($('<option/>', {
                            value: "",
                            text: "Selecione..."
                        }));
                    }
                    $.each(data, function (index, itemData) {
                        select.append($('<option/>', {
                            value: itemData.value,
                            text: itemData.text
                        }));
                    });
                    if (data.length == 1) {
                        obterUA(data[0].CodUnidAdm);
                        $("#codigoUACadastro").attr('readonly', true);
                    }
                    select.trigger("change");
                }
            },
            error: function (jqXHR) {
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
function ObterAcumulacao() {
    if ($("#codigoLocal").val() == 1) {
        return;
    }
    $.ajax({
        url: "/Eventual/ObterAcumulacao",
        type: 'GET',
        dataType: "JSON",
        data: {
            cpf: $("#cpfCadastro").val().replace(/\./g, '').replace(/\-/g, '')
        },
        success: function (data) {

            if (data.TipoException != "sucesso") {

                $("#codigoLocal option[value='1']").remove();

                if (!pLDBanco) {
                    $("#codigoLocal").removeAttr("disabled");
                    $("#codigoMunicipioAcumulacao").removeAttr("disabled");
                    $("#codigoCargoAcumulacao").removeAttr("disabled");
                }
            }
            else {
                if (data.acumulacao != null) {
                    $("#codigoLocal").val(1);

                    $("#codigoMunicipioAcumulacao").val(data.acumulacao.CodigoMunicipioDne);


                    $("#codigoCargoAcumulacao").data("codigo", data.acumulacao.CodigoCargo);
                    $("#codigoCargoAcumulacao").val(data.acumulacao.NomeCargo);
                    $("#codigoCargoAcumulacao").data("descricao", data.acumulacao.NomeCargo);
                }
                else {
                    $("#codigoLocal option[value='1']").remove();
                    $("#codigoCargoAcumulacao").removeAttr('disabled');
                }
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
};
function validarConteudoAbas() {
    $("#formCadastro").valid();
    $("#abaDadosDocenteEventualPai").removeClass("error");
    $("#abaDadosPessoaisPai").removeClass("error");
    $("#abaDadosFuncionaisPai").removeClass("error");
    $("#abaAcumulacaoPai").removeClass("error");
    $("#abaContabancariaPai").removeClass("error");

    if ($("#fieldsetabaDadosFuncionais input.error").length > 0) {
        $("#controleDeAbas").sedTabControl("atual", "abaDadosFuncionais");
        $("#abaDadosFuncionaisPai").addClass("error");

        if ($("#abaContabancaria input.error").length > 0) {
            $("#controleDeAbas2").sedTabControl("atual", "abaContabancaria");
            $("#abaContabancariaPai").addClass("error");
        }
        if ($("#abaAcumulacao input.error").length > 0) {
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

function carregarCompleteUA() {
    if (!this.selectedIndex && this.length > 1) return;
    var codigoDiretoria = $("#codigoDiretoriaCadastro option:selected").val() == "0" || $("#codigoDiretoriaCadastro option:selected").val() == "" || $("#codigoDiretoriaCadastro option:selected").val() == undefined ? 0 : parseInt($("#codigoDiretoriaCadastro option:selected").val());
    if (!primeiraVez) {
        $("input#codigoUA").val("");
        $("input#codigoUA").data("codigo", "");
        $("input#codigoUA").data("nome", "");
    }

    $.ajax({
        url: "/Eventual/ListarEscolas",
        type: "GET",
        data: {
            codigoDiretoria: codigoDiretoria
        },
        dataType: "JSON",
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
};
function carregarDados() {
    var ContaBancaria = {
        CodigoBanco: "1",
        CodigoAgencia: $("#codigoAgencia").val().replace(/\./g, '').replace(/\-/g, ''),
        NumeroConta: $("#numeroConta").val().replace(/\./g, '').replace(/\-/g, ''),
        DigitoConta: $("#digitoConta").val().replace(/\./g, '').replace(/\-/g, '').toUpperCase()
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
    
    var codigoCargoAcum = parseInt($("#codigoCargoAcumulacao").data("codigo"));
    var nomeCargoAcum = '';
    if (codigoCargoAcum == 0) {
        nomeCargoAcum = $("#codigoCargoAcumulacao").val();
    }
    else {
        nomeCargoAcum = $("#codigoCargoAcumulacao").data("descricao");
    }
    var Acumulacao = {
        CodigoAcumulacao: parseInt($("#codigoDenominacao").val()),
        CodigoLocal: parseInt($("#codigoLocal").val()),
        CodigoMunicipioDne: parseInt($("#codigoMunicipioAcumulacao").val()),
        CodigoCargo: codigoCargoAcum,
        NomeCargo: nomeCargoAcum
    };

    var dados = {};
    dados.Nome = $("#NomeDocente").val();
    dados.AnoExercicio = parseInt($("#anoExercicioCadastro").val());
    dados.CodigoDiretoria = parseInt($("#codigoDiretoriaCadastro").val());
    dados.Cpf = $("#cpfCadastro").val().replace(/\./g, '').replace(/\-/g, '');
    dados.RgNumero = $("#rgNumeroCadastro").val().replace(/\./g, '').replace(/\-/g, '');
    dados.RgDigito = $("#rgDigitoCadastro").val();
    dados.RgUf = $("#rgUfCadastro").val();
    dados.CodigoUA = parseInt($("#codigoUACadastro option:selected").val());
    dados.DataNascimento = $("#dataNascimento").val();
    dados.DataInicioExercicio = $("#dataInicioExercicio").val();

    dados.Acumulacao = Acumulacao;
    dados.AtoDecisorio = AtoDecisorio;
    dados.ContaBancaria = ContaBancaria;
    dados.CodigoCargo = $("#codigoCargo").val();
    dados.CodigoCategoria = $("#codigoCategoria").val();
    dados.AlterarApenasDadosBancarios = parseInt($("#modalCadastrar").data("ALTERAR_APENAS_DADOS_BANCARIOS")) === 1 ? 1 : 0;

    dados.DataPublicacaoDoe = $("#dataPublicacaoDoe").val();
    dados.DataFimContrato = $("#dataFimContrato").val();
    dados.DataRetificaoVigencia = $("#dataPublicacaoRetVigencia").val();
    dados.StatusCodigo = parseInt($("#statusContratualEditar").val());
    dados.DataPublRetifVigencia = $("#dataPublicacaoRetificacao").val();

    console.log(dados.DataRetificaoVigencia);

    var myObject = JSON.stringify(dados);

    SalvarDados(myObject);
}

function SalvarDados(dados) {

    $.ajax({
        url: action,
        type: "POST",
        data: dados,
        contentType: "APPLICATION/JSON; CHARSET=UTF-8",
        success: function (data, textStatus, xhr) {
            if (data.TipoException == "sucesso") {
                $("#modalCadastrar").dialog("destroy");
                $("#formPesquisar").submit();
                fecharMensagemDialogPesquisa = true;
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
    if (codigoUA == '')
        return;

    $("#codigoMunicipioCadastro").val("");
    $("#codigoMunicipioCadastro").data("codigo", "");
    $("#codigoMunicipioCadastro").data("nome", "");
    if (codigoUA > 0) {
        $.ajax({
            url: "/Eventual/ObterUA",
            type: "GET",
            data: {
                codigoUA: codigoUA
            },
            contentType: "APPLICATION/JSON; CHARSET=UTF-8",
            success: function (data, textStatus, xhr) {
                $("#codigoMunicipioCadastro").val(data.NomeMunicipio);
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

}

