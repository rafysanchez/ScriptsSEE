function InserirEditar() {
    if ($('.selIdUsuario').length > 0)
        CarregarDados();

    $('div.perfis > div.perfil').click(function () {
        var checkbox = $(this).find('.checkboxs');
        var codigoPerfil = $(this).find('.codigoPerfil').val();

        // Se não checado
        if (!checkbox.hasClass('checked')) {
            checkbox.addClass('checked');
            var index = GerarIndice();
            $(this).append('<input type="hidden" class="hdnValores" name="Usuario.Perfis.Index" value="' + index + '" />' +
                '<input type="hidden" class="hdnValores" name="Usuario.Perfis[' + index + '].CodigoPerfil" value="' + codigoPerfil + '" />');
        } else {
            checkbox.removeClass('checked');
            $(this).find('.hdnValores').remove();

            if ($(this).next().hasClass('conteudoExpansivel'))
                $(this).next().find('.associacoes tbody tr').remove();
        }

        if ($(this).next().hasClass('conteudoExpansivel'))
            $(this).next().slideToggle();
    });

    $('#Diretoria').each(function () {
        $(this).autoPreencher($('#Escola'), 'Escola', 'CarregarListaEscolas');
    });

    $("#ddl-perfil").change(function () {
        var comportamento = parseInt($("#ddl-perfil option:selected").val().split("-")[1]);
        switch (comportamento) {
            case 2:
                $(".group-diretoria").show();
                $(".group-escola").hide();
                $("#Diretoria").val("");
                $("#Escola").val("");
                $("#inserirPerfil").attr("disabled", "disabled");
                break;
            case 3:
                $(".group-diretoria").show();
                $(".group-escola").show();
                $("#Diretoria").val("");
                $("#Escola").val("");
                $("#inserirPerfil").attr("disabled", "disabled");
                break;
            default:
                $(".group-escola").hide();
                $(".group-diretoria").hide();
                $("#Diretoria").val("");
                $("#Escola").val("");
                if ($("#ddl-perfil").val() != "") {
                    $("#inserirPerfil").removeAttr("disabled");
                }
                else {
                    $("#inserirPerfil").attr("disabled", "disabled");
                }
                break;
        }
    });

    $('#Diretoria').change(function () {
        var comportamento = parseInt($("#ddl-perfil option:selected").val().split("-")[1]);
        if (comportamento == 2 && $("#Diretoria").val() != "") {
            $("#inserirPerfil").removeAttr("disabled");
        }
        else {
            $("#inserirPerfil").attr("disabled", "disabled");
        }
    });

    $("#Escola").change(function () {
        var comportamento = parseInt($("#ddl-perfil option:selected").val().split("-")[1]);
        if (comportamento == 3 && $("#Escola").val() != "") {
            $("#inserirPerfil").removeAttr("disabled");
        }
        else {
            $("#inserirPerfil").attr("disabled", "disabled");
        }
    });

    $("#inserirPerfil").click(function () {
        var comportamento = parseInt($("#ddl-perfil").val().split("-")[1]);

        if ($("#p_" + $("#ddl-perfil option:selected").val()).length > 0) {
            if (comportamento == 3) {
                if ($("#p_" + $("#ddl-perfil option:selected").val()).attr("data-diretoria") == $("#Diretoria").val() &&
                    $("#p_" + $("#ddl-perfil option:selected").val()).attr("data-escola") == $("#Escola").val()) {
                    Mensagem.Alert({ titulo: "Perfis", tipo: "Alerta", mensagem: "Esse perfil já foi adicionado", botao: "Fechar" });
                    return;
                }
            }
            else if (comportamento == 2) {
                if ($("#p_" + $("#ddl-perfil option:selected").val()).attr("data-diretoria") == $("#Diretoria").val()) {
                    Mensagem.Alert({ titulo: "Perfis", tipo: "Alerta", mensagem: "Esse perfil já foi adicionado", botao: "Fechar" });
                    return;
                }
            }
            else {
                Mensagem.Alert({ titulo: "Perfis", tipo: "Alerta", mensagem: "Esse perfil já foi adicionado", botao: "Fechar" });
                return;
            }
        }

        var tr = $("<tr id='p_"
            + $("#ddl-perfil option:selected").val()
            + "' data-diretoria='"
            + $("#Diretoria").val()
            + "' data-escola='"
            + $("#Escola").val() + "'></tr>");

        tr.append("<td>" + $("#ddl-perfil option:selected").html() + "</td>");

        if (comportamento > 1)
            tr.append("<td>" + $("#Diretoria option:selected").html() + "</td>");
        else
            tr.append("<td>&nbsp;</td>");

        if (comportamento == 3)
            tr.append("<td>" + $("#Escola option:selected").html() + "</td>");
        else
            tr.append("<td>&nbsp;</td>");

        tr.append("<td style='text-align:center;'><a onclick='excluirPerfil(this)' href='javascript:void(0)'><i class='icone-tabela-excluir' title='Excluir'></i></a></td>");

        $("#perfisCadastrados tbody").append(tr);
    });

    CarregarMascaras();

    $("#tabs").sedTabControl();

    $('#formUsuario').validate({
        rules: {
            'Usuario.nomeUsuario': "required",
            'Usuario.loginUsuario': "required",
            'Usuario.senhaUsuario': {
                required: {
                    // Campo de senha é obrigatório se for novo cadastro
                    depends: function (element) {
                        return $('.selIdUsuario').length == 0;
                    }
                },
                minlength: 8
            },
            'Usuario.rgUsuario': {
                required: true,
                number: true,
            },
            'Usuario.digitoRgUsuario': {
                digRG: true
            },
            'Usuario.UfRgUsuario': "required",
            'Usuario.cpfUsuario': "required",
            'Usuario.emailUsuario': "required"
        },
        messages: {
            'Usuario.nomeUsuario': "Obrigatório",
            'Usuario.loginUsuario': "Obrigatório",
            'Usuario.senhaUsuario': { required: "Obrigatório", minlength: "Senha curta" },
            'Usuario.rgUsuario': {
                required: "Obrigatório",
                number: "Somente números"
            },
            'Usuario.digitoRgUsuario': {
                digRG: "Caractere inválido"
            },
            'Usuario.UfRgUsuario': "Obrigatório",
            'Usuario.cpfUsuario': "Obrigatório",
            'Usuario.emailUsuario': "Obrigatório"
        }
    });

    $('input[type="text"]').focus(function () {
        $(this).addClass("focus");
    });

    $('input[type="text"]').blur(function () {
        $(this).removeClass("focus");
    });

    $('#btnUsuario').click(function (e) {
        e.preventDefault();
        var action = $(".selIdUsuario").val() > 0 ? "Editar" : "Inserir";
        var form = $('#formUsuario');
        var ser = $("#formUsuario").serializeArray();
        $("#perfisCadastrados tr").each(function (i, e) {
            if (i > 0) {
                var perfilid = $(e).attr("id").replace("p_", "").split("-");
                var id = perfilid[0];
                var comportamento = perfilid[1];

                ser.push({
                    name: "Usuario.Perfis[" + (i - 1).toString() + "].CodigoPerfil",
                    value: id
                });

                ser.push({
                    name: "Usuario.listaDiretoriaEscola[" + (i - 1).toString() + "].CodigoPerfil",
                    value: id
                });

                ser.push({
                    name: "Usuario.listaDiretoriaEscola[" + (i - 1).toString() + "].CodigoDiretoria",
                    value: $(e).attr("data-diretoria")
                });

                ser.push({
                    name: "Usuario.listaDiretoriaEscola[" + (i - 1).toString() + "].CodigoEscola",
                    value: $(e).attr("data-escola")
                });
            }
        });

        $.ajax({
            url: "/Usuario/" + action,
            method: "post",
            data: ser
        });
    });
}

function SomenteLetras(e) {
    var tecla = (window.event) ? event.keyCode : e.which;
    if ((tecla > 65 && tecla < 90) || (tecla > 97 && tecla < 122)) return true;
    else {
        if (tecla != 8) return false;
        else return true;
    }
}

function CarregarMascaras() {
    $("#rneUsuarioExtrangeiro").VerificaNumero();
    $("#rgUsuario").VerificaNumero();
    $("#cpfUsuario").VerificaNumero();
    $("#tituloEleitoralUsuario").VerificaNumero();
    $("#telefoneResidencialUsuario").VerificaNumero();
    $("#telefoneComercialUsuario").VerificaNumero();
    $("#telefoneCelularUsuario").VerificaNumero();
}

function CarregarDados() {
    CarregarPerfis();

    $('.txtNomeDiretoria').each(function () {
        var codigo = $(this).siblings('.cdDiretoria').val();
        $(this).text($('.diretoria.' + codigo).val());
    });

    $('.txtNomeEscola').each(function () {
        var codigo = $(this).siblings('.selCodigoEscola').val();
        $(this).text($('.escola.' + codigo).val());
    });

    $('.conteudoExpansivel').prev().each(function () {
        if ($(this).find('.codigoPerfil').siblings('.checkboxs').hasClass('checked'))
            $(this).next().show().find('table.associacoes').show();
    });
}

function CarregarPerfis() {
    $('.hdnCodigoPerfil').each(function () {
        var hdnCodigo = $('div.perfil .codigoPerfil[value=' + $(this).val() + ']');
        hdnCodigo.siblings('.checkboxs').addClass('checked');

        var index = GerarIndice();
        hdnCodigo.parent().append('<input type="hidden" class="hdnValores" name="Usuario.Perfis.Index" value="' + index + '" />' +
                '<input type="hidden" class="hdnValores" name="Usuario.Perfis[' + index + '].CodigoPerfil" value="' + $(this).val() + '" />');
    });
}

function FecharDialog(data) {
    if (data.responseJSON && data.responseJSON.Sucesso) {
        $('#dialog').dialog("close");
    }
}

function ClickBotaoPerfis(sender) {
    $.ajax({
        cache: false,
        url: '/Usuario/ListarPerfis/',
        data: {
            login: $(sender).parents('tr').find('.loginUsuario').html()
        },
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            $('#dialog').html(data).dialog({
                title: "Perfis do usuário",
                width: 820,
                draggable: false,
                modal: true,
                resizable: false,
                position: 'top'
            });

            //InserirEditar();
        }
    });
}

function ClickBotaoPerfisUsuarioReset(sender) {
    $.ajax({
        cache: false,
        url: '/UsuarioReset/ListarPerfis/',
        data: {
            login: $(sender).parents('tr').find('.loginUsuario').html()
        },
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            $('#dialog').html(data).dialog({
                title: "Perfis do Usuário"
            });
            $("#tbPerfis").sedDataTable({ tituloFiltro: "", nomeExportacao: "Perfis do Usuário" });
        }
    });
}

function ClickBotaoEditar(sender) {
    $.ajax({
        cache: false,
        url: '/Usuario/Editar/' + $(sender).parents('tr').find('.itemId').val(),
        type: 'GET',
        dataType: 'html',
        success: function (data) {
            $('#dialog').html(data).dialog({
                title: "Editar Usuário",
                width: 820,
                draggable: false,
                modal: true,
                resizable: false,
                position: 'top'
            });

            InserirEditar();
        }
    });
}

function ClickBotaoExcluir(sender) {
    if (confirm('Deseja excluir este Usuário?')) {
        $.ajax({
            url: '/Usuario/Deletar/' + $(sender).parents('tr').find('.itemId').val(),
            type: 'POST',
            success: function (data) {
                if (data && data.Sucesso)
                    $('#carregarUsuarios').trigger('click');
            }
        });
    }
}

function ClickBotaoReiniciarSenhaUsuario(sender) {
    Mensagem.Alert({
        titulo: "Reiniciar Senha Usuário",
        mensagem: "Deseja reiniciar a senha deste usuário?",
        tipo: "alerta",
        botoes: [
            {
                botao: "Sim",
                callback: function () {
                    AbrirMensagemCarregandoPagina();
                    $.ajax({
                        url: '/Conta/ReiniciarSenhaUsuario/' + $(sender).parents('tr').find('.itemId').val(),
                        type: 'POST',
                        success: function (data) {
                            if (data && data.Sucesso)
                                $('#carregarUsuarios').trigger('click');
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
}

function excluirPerfil(e) {
    $(e).parent().parent().remove();
}


$(document).ready(function () {
    AplicarMascaras();
})