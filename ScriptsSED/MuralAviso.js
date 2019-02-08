$(document).ready(function () {
    Mensagem.IgnorarMensagensAutomaticas = true;
});

function InserirMensagem(CodigoMensagem) {
    $.ajax(
    {
        cache: false,
        url: '/MuralAviso/Cadastrar/',
        type: 'GET',
        dataType: 'html',
        data: { codigo: CodigoMensagem },
        success: function (data) {
            $('#formDialog').html(data).dialog({
                width: 900,
                title: 'Cadastrar Nova Mensagem'
            });

            CarregarValidacoes($("#FormCadastro"));
            $("#hdncodigoMensagem").val(CodigoMensagem);

            if (CodigoMensagem > 0) {
                $('#tabPerfis').show();
            }

            $('#btnAdicionarPerfil').click(function () {
                var count = $("#contListaPerfis").val() == undefined ? 0 : $("#contListaPerfis").val();
                count++;

                if ($('#Perfis').find('option:selected').text() == "Selecione...") return;

                if ($('#tabPerfis tr[codigoPerfil="' + $('#Perfis').find('option:selected').val() + '"]').length > 0) {
                    alert("Perfil já foi adicionado");
                    return;
                }
                $('#tabPerfis').show();
                $('#tabPerfis tbody').append('<tr codigoPerfil=' + $('#Perfis').find('option:selected').val() + '>' +

                    '<td style="text-align: left;">' + $('#Perfis').find('option:selected').text() + '</td>' +
                    '<td style="text-align: center;"><a onclick="$(this).parent().parent().remove();"><i class="icone-tabela-excluir" title="Excluir"></i></a></td>' +
                '</tr>');

                $("#contListaPerfis").val(count);
            });
        }
    });
}

function Salvar() {
    var codMensagem = $('#formDialog #hdncodigoMensagem').val();
    var dsMensagem = $('#formDialog #DescricaoMensagem').val();
    var dtIni = $('#formDialog #DataInicio').val();
    var dtFim = $('#formDialog #DataFim').val();
    var perf = RecuperarPerfis();

    $.ajax({
        cache: false,
        url: '/MuralAviso/Salvar',
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data:
            JSON.stringify({
                CodigoMensagem: codMensagem,
                DescricaoMensagem: dsMensagem,
                DataInicio: dtIni,
                DataFim: dtFim,
                Perfis: perf
            }),
        success: function (data) {
            if (data.sucesso) {
                $('#formDialog').dialog("close");
                Mensagem.Alert({
                    titulo: "Mural Aviso",
                    mensagem: data.mensagem,
                    tipo: data.tipo,
                    botoes: [
                        {
                            botao: "Fechar",
                            callback: function () {
                                Mensagem.Fechar();
                                window.location.reload();
                            }
                        },
                    ]
                });
            } else {
                Mensagem.Alert({
                    titulo: "Perfil",
                    mensagem: data.mensagem,
                    tipo: data.tipo,
                    escondido: data.escondido,
                    botao: "Fechar"
                });
            }
        },
    });
}

function RecuperarPerfis() {
    var Grade = [];
    var j = 0;

    $('#tabPerfis tbody tr').each(function (i, e) {
        var CodigoPerfil = $(e).attr('codigoperfil');
        Grade[j] = {
            codigoPerfil: CodigoPerfil
        };
        j += 1;
    });

    return Grade;
}

function CarregarValidacoes(form) {
    form.validate({
        rules: {
            DescricaoMensagem: "required",
            DataInicio: "required",
            DataFim: "required"
        },
        messages: {
            DescricaoMensagem: "Obrigatório.",
            DataInicio: "Obrigatório.",
            DataFim: "Obrigatório."
        }
    });
}

function ExcluirMensagem(codigoMensagem) {
    if (codigoMensagem > 0) {
        Mensagem.Alert({
            titulo: "Excluir Mensagem",
            mensagem: "Tem certeza que deseja excluir essa mensagem?",
            tipo: "alerta",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.ajax({
                            url: '/MuralAviso/DeletarMensagem',
                            data: { id: codigoMensagem },
                            type: 'POST',
                            success: function (data) {
                                if (data.sucesso) {
                                    Mensagem.Alert({
                                        titulo: "Mural Aviso",
                                        mensagem: "Registro excluído com sucesso!",
                                        tipo: "sucesso",
                                        botoes: [
                                            {
                                                botao: "Fechar",
                                                callback: function () {
                                                    Mensagem.Fechar();
                                                    window.location.reload();
                                                }
                                            },
                                        ]
                                    });
                                }
                            }
                        });
                    }
                },
                {
                    botao: "Não"
                }
            ]
        });
    }
}