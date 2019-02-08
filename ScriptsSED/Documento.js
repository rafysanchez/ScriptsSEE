$(document).ready(function () {
    $('#tabelaDocumento').sedDataTable();

    // Atribui a div a função de modal.
    $("#dialogDocumento").dialog({
        autoOpen: false,
        //title: 'Documento',
        position: 'top',
        //height: 370,
        width: 820,
        resizable: false,
        modal: true,
        dragable: false,
        show: {
            effect: "blind",
            duration: 200
        },
        beforeClose: function (event, ui) {
            ConsultarDocumento();
        }
    });

    Validacao();
    DetalharDocumento();
    EditarDocumento();
    ExcluirDocumento();

    $('#btnCadastrar').click(function (e) {
        e.preventDefault();

        if ($('.formCadastro').valid() == false) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Campos obrigatórios não informados.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $.ajax({
            cache: false,
            url: '/Documento/SalvarCadastro',
            type: 'POST',
            datatype: 'html',
            data: {
                nome: $('#Nome').val(),
                descricao: $('#Descricao').val(),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                window.location.href = "/Documento/Cadastro";
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
});

var DetalharDocumento = function () {
    $('.detalharDocumento').click(function () {

        var CodigoDocumento = $(this).children().first().val();

        $.ajax({
            cache: false,
            url: '/Documento/Detalhar',
            type: 'POST',
            datatype: 'html',
            data: {
                codigoDocumento: parseInt(CodigoDocumento),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogDocumento').html(data);

                $('#dialogDocumento div form fieldset input').each(function () {
                    $(this).attr('disabled', 'disabled');
                });

                $('#dialogDocumento div form fieldset textarea').each(function () {
                    $(this).attr('disabled', 'disabled');
                });

                $('#dialogDocumento').dialog("open");
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
}

var ExcluirDocumento = function () {

    $('.excluirDocumento').click(function () {

        var CodigoDocumento = $(this).children().first().val();

        Mensagem.Alert({
            titulo: "Atenção!",
            mensagem: "Deseja realmente excluir o Documento?",
            tipo: "aviso",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.ajax({
                            url: '/Documento/Excluir',
                            type: 'POST',
                            dataType: 'HTML',
                            async: true,
                            data: ({
                                codigoDocumento: parseInt(CodigoDocumento),
                            }),
                            success: function (data, textStatus, jqXHR) {
                                ConsultarDocumento();
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                Mensagem.CarregarMensagens("Fechar");
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
    });
}

var EditarDocumento = function () {
    $('.editarDocumento').click(function () {

        var CodigoDocumento = $(this).children().first().val();

        $.ajax({
            cache: false,
            url: '/Documento/Editar',
            type: 'POST',
            datatype: 'html',
            data: {
                codigoDocumento: parseInt(CodigoDocumento),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogDocumento').html(data);
                $('#dialogDocumento').dialog("open");
                Validacao();
                SalvarAlteracao();
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
}

var Validacao = function () {
    $('.formCadastro').validate({
        rules: {
            Nome: { required: true, },
            Descricao: { required: true, },
        },
        messages: {
            Nome: { required: 'Obrigatório', },
            Descricao: { required: 'Obrigatório', },
        },
    });
}

var SalvarAlteracao = function () {
    $('#btnAtualizar').click(function (e) {
        e.preventDefault();

        if ($('.formCadastro').valid() == false) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Campos obrigatórios não informados.",
                tipo: "Aviso",
                botao: "Fechar"
            });

            return;
        }

        $.ajax({
            cache: false,
            url: '/Documento/SalvarAlteracao',
            type: 'POST',
            datatype: 'html',
            data: {
                codigoDocumento: parseInt($('#Codigo').val()),
                nome: $('#Nome').val(),
                descricao: $('#Descricao').val(),
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                $('#dialogDocumento').dialog("close");
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
}

var ConsultarDocumento = function () {
    $.ajax({
        cache: false,
        url: '/Documento/ConsultarDocumento',
        type: 'POST',
        datatype: 'html',
        data: {},
        traditional: true,
        success: function (data, textStatus, jqXHR) {
            $('#gridDocumento').html(data);
            $('#tabelaDocumento').sedDataTable();
            DetalharDocumento();
            EditarDocumento();
            ExcluirDocumento();
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
}