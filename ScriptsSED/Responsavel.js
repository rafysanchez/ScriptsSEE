$(document).ready(function () {
    AplicarMascaras();
});

var somenteNumeros = function (num) {
    var regex = /^[0-9]*$/gi;
    if (!num.value.match(regex)) {
        num.value = "";
    }
};

function pesquisarResponsavel() {
    $('.formPesquisar').validate({
        rules: {

            txtCpf: {
                cpf: true
            },
            txtRgUf: {
                letras: true
            },
            txtRg: {
                RG: true
            }
        },
        messages: {
            txtNome: {
                letras: "Caracter inválido."
            },
            txtCpf: {
                numeros: "Informe apenas números.",
                cpf: "CPF inválido"
            },
            txtRgUf: {
                letras: "Informa apenas letras."
            },
            txtRg: {
                RG: "Carácter inválido"
            }

        }
    });
    if ($(".formPesquisar").valid()) {
        ValidarPesquisa();
    }
};

function Novo() {
    $.ajax({
        type: 'GET',
        cache: false,
        dataType: 'html',
        url: '/Responsavel/Cadastrar',
        success: function (data, textStatus, jqXHR) {
            $('#VisualizarResponsavel').empty();
            $('#EditarResponsavel').empty();
            $('#NovoResponsavel').empty().html(data);

            var original = $('#NovoResponsavel')[0];
            var clone = $(original).clone().attr('id', 'NovoResponsavelClone');
            var saveHtml = $(original).html();
            $(original).html('');
            $(clone).dialog({
                title: 'Cadastrar',
                width: "920",
                open: function () {
                    $('#btnExcluir').remove();
                    $('#btnAlterar').remove();

                    $('#NomeResponsavel').prop("disabled", "");
                    $('#Sexo').prop("disabled", "");
                    $('#EstadoCivil').prop("disabled", "");
                    $('#CpfResponsavel').prop("disabled", "");
                    $('#RgResponsavel').prop("disabled", "");
                    $('#DigRgResponsavel').prop("disabled", "");
                    $('#SiglaUFRG').prop("disabled", "");
                    $('#EmailResponsavel').prop("disabled", "");
                    $('#DataNascimento').prop("disabled", "");
                    $('#CidadeNascimento').prop("disabled", "");
                    $('#SiglaUFNascimento').prop("disabled", "");
                    $('#NomePaisNascimento').prop("disabled", "");
                    $('#EnderecoResponsavel').prop("disabled", "");
                    $('#NumeroEndereco').prop("disabled", "");
                    $('#ComplementoEndereco').prop("disabled", "");
                    $('#NomeBairro').prop("disabled", "");
                    $('#Cep').prop("disabled", "");
                    $('#Cidade').prop("disabled", "");
                    $('#SiglaUF').prop("disabled", "");

                    $('#btnSalvar').prop("disabled", "");
                    $('#titulo').empty().html('Cadastro de Responsável');
                    $('#btnSalvar').prop("value", "Cadastrar Responsável");

                    //controle cpf / rne / cidade / uf
                    if ($("#TipoOrigem").val() == "1") {//nacional
                        $("#RNE").prop("disabled", true);
                        $("#RgResponsavel").prop("disabled", false);
                        $("#DigRgResponsavel").prop("disabled", false);
                        $("#SiglaUFRG").prop("disabled", false);
                        $("#CidadeNascimento").prop("disabled", false);
                        $("#SiglaUFNascimento").prop("disabled", false);
                    }
                    else {//estrangeiro
                        $("#RNE").prop("disabled", false);
                        $("#RgResponsavel").prop("disabled", true);
                        $("#DigRgResponsavel").prop("disabled", true);
                        $("#SiglaUFRG").prop("disabled", true);
                        $("#CidadeNascimento").prop("disabled", true);
                        $("#SiglaUFNascimento").prop("disabled", true);
                    }

                    $("#TipoOrigem").change(function () {
                        if ($("#TipoOrigem").val() == "1") {//nacional
                            $("#RNE").prop("disabled", true);
                            $("#RgResponsavel").prop("disabled", false);
                            $("#DigRgResponsavel").prop("disabled", false);
                            $("#SiglaUFRG").prop("disabled", false);
                            $("#CidadeNascimento").prop("disabled", false);
                            $("#SiglaUFNascimento").prop("disabled", false);
                            $("#RNE").val("");
                        }
                        else {//estrangeiro
                            $("#RNE").prop("disabled", false);
                            $("#RgResponsavel").prop("disabled", true);
                            $("#DigRgResponsavel").prop("disabled", true);
                            $("#SiglaUFRG").prop("disabled", true);
                            $("#CidadeNascimento").prop("disabled", true);
                            $("#SiglaUFNascimento").prop("disabled", true);
                            $("#RgResponsavel").val("");
                            $("#DigRgResponsavel").val("");
                            $("#SiglaUFRG").val("");
                            $("#CidadeNascimento").val("");
                            $("#SiglaUFNascimento").val("");
                        }
                    });
                    //=============================


                    $('#btnAdicionarTelefone').click(function () {
                        var nomeTipo = $('#ddlTipoTelefone option:selected').text();
                        var tipo = $('#ddlTipoTelefone').val();
                        var ddd = $('#txtDDD').val();
                        var numero = $('#txtNumTelefone').val();
                        var complemento = $('#txtComplTelefone').val();

                        if (tipo.length > 0 && ddd.length > 1 && numero.length > 7) {
                            AdicionarTelefone(nomeTipo, tipo, ddd, numero, complemento);
                        }
                        else {
                            Mensagem.Alert({
                                titulo: "Aviso",
                                mensagem: "Para cadastrar um novo telefone informe o tipo, DDD e número corretamente.",
                                tipo: "Aviso",
                                botao: "Fechar"
                            });
                        }
                    });

                    $('#btnCopiarEndereco').click(function () {
                        $('#pesqEndereco').show();
                        $('#btnCopiarEnderecoAluno').show();
                    });


                    $('#btnCopiarEnderecoAluno').click(function () {
                        $('#TipoLogradouro').val($('#cLogradouro').val()).attr("selected", "selected");
                        $('#EnderecoResponsavel').val($('#cEndereco').val());
                        $('#NumeroEndereco').val($('#cNumero').val());
                        $('#ComplementoEndereco').val($('#cComplemento').val());
                        $('#NomeBairro').val($('#cBairro').val());
                        $('#Cep').val($('#cCep').val());
                        $("#Cidade option:selected").text($('#cCidade').val());
                        $('#SiglaUF').val($('#cUf').val()).attr("selected", "selected");
                        $('#Latitude').val($('#cLatitude').val());
                        $('#Longitude').val($('#cLongitude').val());

                        $('#pesqEndereco').hide();
                        $('#btnCopiarEnderecoAluno').hide();
                    });

                    $('#btnBuscarEndereco').click(function () {
                        $.ajax({
                            type: 'POST',
                            async: true,
                            dataType: 'html',
                            data: ({
                                //nomeAluno: $('#NomeAluno').val(),
                                ra: $('#raAluno').val(),
                                digRa: $('#digRaAluno').val(),
                                ufRa: $('#ufRa').val()
                            }),
                            url: '/Aluno/BuscaAluno',
                            success: function (data, textStatus, jqXHR) {
                                $('#tabelaDados').html(data);
                                $("#tabelaDados").sedDataTable({
                                    botaoSelecionarColunas: false,
                                    botaoTelaCheia: false,
                                    embutida: true,
                                    botaoGerarPDF: false,
                                    botaoImprimir: false,
                                    botaoGerarCSV: false,
                                    bFilter: false,
                                    bPaginate: false,
                                    bInfoEmpty: false,
                                    bInfo: false,
                                    bSort: false,
                                    columnDefs: [
                                            { targets: [0], orderable: false },
                                    ],
                                });
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                $(document).ajaxStop(function () {
                                    Mensagem.Alert({
                                        titulo: "Erro",
                                        mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                                        tipo: "Erro",
                                        botao: "Fechar"
                                    });
                                });
                            }
                        });
                    });
                },
                close: function () {
                    $(clone).remove();
                    $(original).empty();
                }
            });

            AplicarMascaras();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
};

function Editar(codigoResponsavel) {
    $.ajax({
        type: 'POST',
        cache: false,
        dataType: 'html',
        data: ({
            Id: codigoResponsavel
        }),
        url: '/Responsavel/Editar',
        success: function (data, textStatus, jqXHR) {
            if ($(".ui-dialog").is(":visible") == true) {
                $('#VisualizarResponsavelClone').dialog('close');
            }

            $('#NovoResponsavel').empty();
            $('#VisualizarResponsavel').empty();
            $('#EditarResponsavel').empty().html(data);

            var original = $('#EditarResponsavel')[0];
            var clone = $(original).clone().attr('id', 'EditarResponsavelClone');
            var saveHtml = $(original).html();
            $(original).html('');
            $(clone).dialog({
                title: 'Alterar',
                width: 820,
                open: function () {
                    //$('#btnExcluir').remove();
                    //$('#btnAlterar').remove();
                    $('#btnExcluir').prop("display", "none");
                    $('#btnAlterar').prop("display", "none");

                    $('#NomeResponsavel').prop("disabled", "");
                    $('#Sexo').prop("disabled", "");
                    $('#EstadoCivil').prop("disabled", "");
                    $('#CpfResponsavel').prop("disabled", "");
                    $('#RgResponsavel').prop("disabled", "");
                    $('#DigRgResponsavel').prop("disabled", "");
                    $('#SiglaUFRG').prop("disabled", "");
                    $('#EmailResponsavel').prop("disabled", "");
                    $('#DataNascimento').prop("disabled", "");
                    $('#CidadeNascimento').prop("disabled", "");
                    $('#SiglaUFNascimento').prop("disabled", "");
                    $('#NomePaisNascimento').prop("disabled", "");
                    $('#EnderecoResponsavel').prop("disabled", "");
                    $('#NumeroEndereco').prop("disabled", "");
                    $('#ComplementoEndereco').prop("disabled", "");
                    $('#NomeBairro').prop("disabled", "");
                    $('#Cep').prop("disabled", "");
                    $('#Cidade').prop("disabled", "");
                    $('#SiglaUF').prop("disabled", "");
                    $("#TipoOrigem").prop("readonly", "readonly");

                    $("#CidadeNascimento option:selected").text($('#edtCidadeNascimento').val());
                    $("#SiglaUFNascimento option:selected").text($('#edtUfNascimento').val());
                    $("#Cidade option:selected").text($('#edtCidade').val());
                    $("#SiglaUF option:selected").text($('#edtUf').val());
                    $("#NomePaisNascimento option:selected").text($('#edtPais').val());
                    $('#TipoLogradouro').val($('#edtLogradouro').val()).attr("selected", "selected");

                    //controle cpf / rne / cidade / uf
                    if ($("#TipoOrigem").val() == "1") {//nacional
                        $("#RNE").prop("disabled", true);
                        $("#RgResponsavel").prop("disabled", false);
                        $("#DigRgResponsavel").prop("disabled", false);
                        $("#SiglaUFRG").prop("disabled", false);
                        $("#CidadeNascimento").prop("disabled", false);
                        $("#SiglaUFNascimento").prop("disabled", false);
                    }
                    else {//estrangeiro
                        $("#RNE").prop("disabled", false);
                        $("#RgResponsavel").prop("disabled", true);
                        $("#DigRgResponsavel").prop("disabled", true);
                        $("#SiglaUFRG").prop("disabled", true);
                        $("#CidadeNascimento").prop("disabled", true);
                        $("#SiglaUFNascimento").prop("disabled", true);
                    }

                    $("#TipoOrigem").change(function () {
                        if ($("#TipoOrigem").val() == "1") {//nacional
                            $("#RNE").prop("disabled", true);
                            $("#RgResponsavel").prop("disabled", false);
                            $("#DigRgResponsavel").prop("disabled", false);
                            $("#SiglaUFRG").prop("disabled", false);
                            $("#CidadeNascimento").prop("disabled", false);
                            $("#SiglaUFNascimento").prop("disabled", false);
                            $("#RNE").val("");
                        }
                        else {//estrangeiro
                            $("#RNE").prop("disabled", false);
                            $("#RgResponsavel").prop("disabled", true);
                            $("#DigRgResponsavel").prop("disabled", true);
                            $("#SiglaUFRG").prop("disabled", true);
                            $("#CidadeNascimento").prop("disabled", true);
                            $("#SiglaUFNascimento").prop("disabled", true);
                            $("#RgResponsavel").val("");
                            $("#DigRgResponsavel").val("");
                            $("#SiglaUFRG").val("");
                            $("#CidadeNascimento").val("");
                            $("#SiglaUFNascimento").val("");
                        }
                    });
                    //===================================

                    $('#btnSalvar').prop("disabled", "");
                    $('#titulo').empty().html('Edição de Responsável');
                    $('#btnSalvar').prop("value", "Alterar Responsável");

                    $('#tbTelefone').sedDataTable();

                    //controla a visualização do tipo do telefone do responsável
                    $('#tbTelefone tbody tr').each(function () {
                        switch ($(this).find("td").first().text()) {
                            case "1":
                                $(this).find("td").first().text("Residencial");
                                break;
                            case "2":
                                $(this).find("td").first().text("Comercial");
                                break;
                            case "3":
                                $(this).find("td").first().text("Celular");
                                break;
                            case "4":
                                $(this).find("td").first().text("Recado");
                                break;
                            default:
                                break;
                        }
                    });
                    //====================

                    $('#btnAdicionarTelefone').click(function () {
                        var nomeTipo = $('#ddlTipoTelefone option:selected').text();
                        var tipo = $('#ddlTipoTelefone').val();
                        var ddd = $('#txtDDD').val();
                        var numero = $('#txtNumTelefone').val();
                        var complemento = $('#txtComplTelefone').val();

                        if (tipo.length > 0 && ddd.length > 0 && numero.length > 0) {
                            AdicionarTelefone(nomeTipo, tipo, ddd, numero, complemento);
                        }
                        else {
                            Mensagem.Alert({
                                titulo: "Aviso",
                                mensagem: "Para cadastrar um novo telefone informe o tipo, DDD e número corretamente.",
                                tipo: "Aviso",
                                botao: "Fechar"
                            });
                        }
                    });

                    $("#frmResponsavel").validate({
                        rules: {
                            NomeResponsavel: {
                                nome: true,
                                required: true
                            },
                            Sexo: {
                                required: true
                            },
                            CpfResponsavel: {
                                cpf: true,
                                required: {
                                    depends: function (element) {
                                        return $("#TipoOrigem").val() == "1";
                                    }
                                }
                            },
                            RgResponsavel: {
                                required: true,
                                //VerificaQuantidadeLetraRG: true,
                                RG: true
                            },
                            DigRgResponsavel: {
                                digRG: true
                            },
                            SiglaUFRG: {
                                required: true
                            },

                            EmailResponsavel: {
                                required: true,
                                email: true
                            },
                            EnderecoResponsavel: {
                                endereco: true
                            },
                            ComplementoEndereco: {
                                endereco: true
                            },
                            NomeBairro: {
                                nome: true
                            },
                            Cep: {
                                cep: true
                            },
                            DataNascimento: {
                                dataValida: true,
                                required: true
                            },
                            txtDDD: {
                                number: true
                            },
                            txtNumTelefone: {
                                number: true
                            }
                        },
                        messages: {
                            NomeResponsavel: {
                                nome: "Carácter inválido",
                                required: "Obrigatório"
                            },
                            Sexo: {
                                required: "Obrigatório"
                            },
                            CpfResponsavel: {
                                cpf: "CPF inválido",
                                required: "Obrigatório"
                            },
                            RgResponsavel: {
                                required: "Digite o RG",
                                RG: "Carácter inválido"
                            },
                            DigRgResponsavel: {
                                digRG: "Carácter inválido"
                            },
                            SiglaUFRG: {
                                required: "Obrigatório"
                            },
                            EmailResponsavel: {
                                required: "Obrigatório",
                                email: "E-mail inválido"
                            },
                            EnderecoResponsavel: {
                                endereco: "Carácter inválido"
                            },
                            ComplementoEndereco: {
                                endereco: "Carácter inválido"
                            },
                            NomeBairro: {
                                nome: "Carácter inválido"
                            },
                            Cep: {
                                cep: "Carácter inválido"
                            },
                            DataNascimento: {
                                dataValida: "Data Inválida",
                                required: "Obrigatório"
                            },
                            txtDDD: {
                                number: "Informe apenas números"
                            },
                            txtNumTelefone: {
                                number: "Informe apenas números"
                            }
                        }
                    });

                    $("#btnSalvar").click(function (e) {

                        e.preventDefault();
                        if ($("#frmResponsavel").valid()) {
                            Cadastrar();
                            Visualizar(codigoResponsavel, true)
                        } else {
                            return false;
                        }
                    });
                },
                close: function () {
                    $(clone).remove();
                    $(original).empty();
                    $('#btnExcluir').prop("display", "");
                    $('#btnAlterar').prop("display", "");
                }
            });

            AplicarMascaras();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
};

function Visualizar(codigoResponsavel, editar) {
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        dataType: 'html',
        data: ({
            Id: codigoResponsavel
        }),
        url: '/Responsavel/Visualizar',
        success: function (data, textStatus, jqXHR) {
            if (editar) {
                $('#VisualizarResponsavelClone').empty().html(data);
                return false;
            }
            $('#NovoResponsavel').empty();
            $('#EditarResponsavel').empty();
            $('#VisualizarResponsavel').empty().html(data);
            var original = $('#VisualizarResponsavel')[0];
            var clone = $(original).clone().attr('id', 'VisualizarResponsavelClone');
            var saveHtml = $(original).html();
            $(original).html('');
            $(clone).dialog({
                //height: 770,
                title: 'Consulta de Responsável',
                width: 850,
                draggable: false,
                modal: true,
                resizable: false,
                show: {
                    effect: "blind",
                    duration: 1000
                },
                position: "top",
                open: function () {

                    var editar = '@ViewBag.Editar';
                    var excluir = '@ViewBag.Deletar';

                    if (editar == 'False') {
                        $('#frmResponsavel').find('#btnAlterar').remove();
                    }

                    if (excluir == 'False') {
                        $('#frmResponsavel').find('#btnExcluir').remove();
                    }

                    $("#tbTelefoneVisualizar").sedDataTable();

                    //controla a visualização do tipo do telefone do responsável
                    $('#tbTelefone tbody tr').each(function () {
                        switch ($(this).find("td").first().text()) {
                            case "1":
                                $(this).find("td").first().text("Residencial");
                                break;
                            case "2":
                                $(this).find("td").first().text("Comercial");
                                break;
                            case "3":
                                $(this).find("td").first().text("Celular");
                                break;
                            case "4":
                                $(this).find("td").first().text("Recado");
                                break;
                            default:
                                break;
                        }
                    });
                    //====================
                },
                close: function () {
                    $(clone).remove();
                    $(original).empty();
                }
            });

            AplicarMascaras();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
};

function Cadastrar() {
    var controller = {
        CodigoResponsavel: $('#hdnCodigo').val(),
        NomeResponsavel: $('#NomeResponsavel').val(),
        Sexo: $('#Sexo').val(),
        CpfResponsavel: $('#CpfResponsavel').val(),
        RgResponsavel: $('#RgResponsavel').val(),
        DigRgResponsavel: $('#DigRgResponsavel').val(),
        SiglaUFRG: $('#SiglaUFRG').val(),
        EmailResponsavel: $('#EmailResponsavel').val(),
        EnderecoResponsavel: $('#EnderecoResponsavel').val(),
        NumeroEndereco: $('#NumeroEndereco').val(),
        ComplementoEndereco: $('#ComplementoEndereco').val(),
        NomeBairro: $('#NomeBairro').val(),
        Cep: $('#Cep').val(),
        Cidade: $('#Cidade').val(),
        SiglaUF: $('#SiglaUF').val(),
        DataNascimento: $('#DataNascimento').val(),
        CidadeNascimento: $('#CidadeNascimento').val(),
        SiglaUFNascimento: $('#SiglaUFNascimento').val(),
        NomePaisNascimento: $('#NomePaisNascimento').val(),
        EstadoCivil: $('#EstadoCivil').val(),
        telefone: $('#tbTelefone tbody tr').find('.sorting_1').val(),
        RNE: $("#RNE").val(),
        tipoOrigem: $("#TipoOrigem option:selected").val(),
        EnvioSMS: $("#EnvioSMS").is(":checked")
    };
    if (controller.telefone == undefined && (controller.EmailResponsavel != undefined && controller.EmailResponsavel.length == 0)) {
        $("<label class='error'>Obrigatório</label>").appendTo(".EmailResponsavel");
        $("<label class='error'>Obrigatório</label>").appendTo("#divTelefone");

        Mensagem.Alert({
            titulo: "Responsável",
            mensagem: "Informe um endereço de e-mail ou telefone.",
            tipo: "Erro",
            botao: "Fechar"
        });

        return;
    }
    else {
        $.ajax({
            type: 'POST',
            async: true,
            cache: false,
            dataType: 'json',
            data: JSON.stringify(controller),
            url: '/Responsavel/Cadastrar',
            success: function (data, textStatus, jqXHR) {

                //Mensagem.AdicionarCallback(function (msg) {
                //    msg.find('.mensagem_botao .direita button').click(function () {

                //        if (msg.find('.mensagem').hasClass('sucesso'))
                //            if (CodigoResponsavel == 0) {
                //                $('#NovoResponsavelClone').dialog('close');
                //                $('#VisualizarResponsavel').dialog('close');

                //            }
                //            else {
                //                var tr = $('.selCodigoResponsavelLista[value=' + CodigoResponsavel + ']').parents('tr');
                //                tr.find('.selNomeResponsavel').text(NomeResponsavel);
                //                tr.find('.selCpfResponsavel').text(CpfResponsavel);
                //                tr.find('.selRgResponsavel').text(RgResponsavel);
                //                tr.find('.selDigRgResponsavel').text(DigRgResponsavel);
                //                $('#EditarResponsavelClone').dialog('close');
                //                $('#VisualizarResponsavel').dialog('close');
                //            }
                //    });
                //});
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    }
};
function CadastrarResponsavel() {
    var form = $('#frmResponsavel').serialize();
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        dataType: 'json',
        url: '/Responsavel/CadastrarResponsavel/',
        data: form,
        success: function (data, textStatus, jqXHR) {
            return false;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
};
function Alunos(codigoResponsavel) {
    var n = new Date();
    var ano = n.getFullYear();
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        dataType: 'html',
        data: ({
            Id: codigoResponsavel,
            anoLetivo: ano
        }),
        url: '/ResponsavelAluno/Index',
        success: function (data, textStatus, jqXHR) {
            if (data == "") {
                return false;
            }
            $('#Alunos').empty().html(data);

            var original = $('#Alunos')[0];
            var clone = $(original).clone().attr('id', 'AlunosClone');
            var saveHtml = $(original).html();
            $(original).html('');
            $(clone).dialog({
                //height: 770,
                width: 850,
                title: 'Alunos do Responsável',
                open: function () {
                    var editar = '@ViewBag.Editar';
                    var excluir = '@ViewBag.Deletar';

                    if (editar == 'False') {
                        $('#ddlTipo').prop("disabled", "disabled");
                    }

                    if (excluir == 'False') {
                        $(".excluir").remove();
                    }

                    $('#tbAlunos').sedDataTable({
                        columnDefs: [
                            { targets: [6, 7], orderable: false },
                        ],
                        nomeExportacao: "Lista de Alunos",
                    });
                },
                close: function () {
                    $(clone).remove();
                    $(original).empty();
                }
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop(function () {
                Mensagem.Alert({
                    titulo: "Erro",
                    mensagem: "Ocorreu um erro durante o processo: " + errorThrown,
                    tipo: "Erro",
                    botao: "Fechar"
                });
            });
        }
    });
};

function ValidarPesquisa() {
    var cpf = $('#txtCpf').val();
    var rg = $('#txtRg').val();
    var digRg = $('#txtRgDig').val();
    var ufRg = $('#txtRgUf').val();
    var nome = $('#txtNome').val();
    var rne = $('#txtRne').val();


    //if (cpf != "" || (rg != "" && digRg != "" && ufRg != "") || nome != "") {
    if (cpf != "" || (rg != "" && ufRg != "") || nome != "" || rne != "") {
        Pesquisar(cpf, rg, digRg, ufRg, rne, nome);
    }
    else {
        var msg = "Preencha o filtro mínimo.";
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: msg,
            tipo: "Aviso",
            botao: "Fechar"
        });
    }
};

function Pesquisar(cpf, rg, digRg, ufRg, rne, nome) {
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        dataType: 'html',
        data: ({
            cpf: cpf,
            rg: rg,
            digRg: digRg,
            ufRg: ufRg,
            rne: rne,
            nome: nome
        }),
        url: '/Responsavel/ListaParcial',
        success: function (data, textStatus, jqXHR) {
            $('#listaResponsaveis').html(data);
            $("#tabela").sedDataTable({
                columnDefs: [
			        { targets: [5, 6], orderable: false },
                ],
                nomeExportacao: "Lista de Responsáveis",
                tituloFiltro: " "
            });
            AplicarMascaras();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.href = "Index";
        }
    });
};

function ExcluirResponsavel(codigo) {

    Mensagem.Alert({
        titulo: "Responsável",
        mensagem: "Deseja realmente excluir o Responsável?",
        tipo: "aviso",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    $.ajax({
                        type: 'POST',
                        async: true,
                        cache: false,
                        data: ({
                            codigoResponsavel: codigo
                        }),
                        url: '/Responsavel/Excluir',
                        success: function (data, textStatus, jqXHR) {
                            $('#VisualizarResponsavelClone').dialog('close');
                            ValidarPesquisa();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                        }
                    });
                }
            },
            {
                botao: "Não",
                callback: function () {
                    $.unblockUI();
                }
            }
        ]
    });
};

function AdicionarTelefone(nomeTipo, tipo, ddd, numero, complemento) {
    //verifica se o telefone já foi inserido para o responsável
    if ($("#tbTelefone").html().indexOf(numero) != -1) {
        Mensagem.Alert({
            titulo: "Aviso",
            mensagem: "Este telefone já foi incluído para o responsável.",
            tipo: "Aviso",
            botao: "Fechar"
        });
        return false;
    }
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        data: ({
            tipo: tipo,
            ddd: ddd,
            numero: numero,
            complemento: complemento
        }),
        url: '/Responsavel/AdicionarTelefone',
        success: function (data, textStatus, jqXHR) {

            //$('#tbTelefone').dataTable().fnDestroy();

            var tabela = $('#tbTelefone');

            tabela.append(
                '<tr id="' + ddd + numero + '" tipoFone="' + tipo + '">' +
                    '<td style="text-align: center">' + nomeTipo + '</td>' +
                    '<td style="text-align: center">' + ddd + '</td>' +
                    '<td style="text-align: center">' + numero + '</td>' +
                    '<td style="text-align: center">' + complemento + '</td>' +
                    "<td style='text-align: center'><a href='javascript:void(0)' onclick='RemoverTelefoneDaGrid(" + ddd + numero + "," + numero + ");'><i class='icone-tabela-excluir' title='Deletar'></i></a></td>" +
                '</tr>');
            tabela.sedDataTable();

            $('#ddlTipoTelefone').val("");
            $('#txtDDD').val("");
            $('#txtNumTelefone').val("");
            $('#txtComplTelefone').val("");
            $('.edicao').css("text-align", "center");
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
};

function ExcluirTelefone(codigoTelefone) {
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        data: ({
            codigoTelefone: codigoTelefone
        }),
        url: '/Responsavel/ExcluirTelefone',
        success: function (data, textStatus, jqXHR) {

            $('#' + codigoTelefone).remove();
            VerificaQuantidadeCelular()
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
};

function RemoverTelefoneDaGrid(id, numero) {
    $.ajax({
        type: 'POST',
        async: true,
        cache: false,
        data: ({
            telefone: numero
        }),
        url: '/Responsavel/RemoveTelefone',
        success: function (data, textStatus, jqXHR) {
            $('#' + id).remove();

            VerificaQuantidadeCelular()
        },
        error: function (jqXHR, textStatus, errorThrown) {
        }
    });
};

function VerificaQuantidadeCelular() {
    var qtdeCelular = 0;

    $('#tbTelefone > tbody > tr').each(function () {

        if ($(this).attr('tipoFone') == 3) {
            qtdeCelular++;
        }
    });

    if (qtdeCelular == 0) {
        $("#EnvioSMS").prop('checked', false);
    }
};