var recebido = recebido || {};

$(function () {
    recebido.Instance();
});

recebido.Instance = function () {

    var self = recebido;

    $('.tabela').sedDataTable({
        'sScrollX': '100%',
        'bSort': false
    });

    $("#CodigoDiretoria").autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    /*$("#CodigoEscola").change(function () {
        recebido.LoadGridRecebimento();
    });
    */

    $("#btnPesquisarRegistro").click(function () {
        if (!$('#form').valid()) return;

        recebido.LoadGridRecebimento();
    });
    self.Validacao();
    self.Pesquisar();
    self.AdicionarRecebimento();
}

recebido.AdicionarRecebimento = function () {
    $("#btnAdicionar").click(function () { window.location = "/MaterialEscolar/RegistroRecebido"; });
}

recebido.Validacao = function () {
    $('#form').validate({
        rules: {
            AnoLetivo: { required: true, minlength: 4 },
            CodigoDiretoria: { required: true },
            CodigoEscola: { required: true },
            CodigoTipoEnsino: { required: true },
            CodigoDisciplina: { required: true },
            txtQuantidade: { required: true, maxlength: 5 }
        },
        messages:
        {
            AnoLetivo: { required: 'Obrigatório', minlength: 'Ano inválido' },
            CodigoDiretoria: { required: 'Obrigatório' },
            CodigoEscola: { required: 'Obrigatório' },
            CodigoTipoEnsino: { required: 'Obrigatório' },
            CodigoDisciplina: { required: 'Obrigatório' },
            txtQuantidade: { required: 'Obrigatório' }
        }
    });
};

recebido.Limpar = function () {
    //$("#CodigoTipoEnsino").val('');
    //$("#CodigoDisciplina").val('');
    //$("#txtQuantidade").val('');
}

recebido.Pesquisar = function () {
    $("#btnPesquisar").click(function () {
        if (!$('#form').valid()) return;

        $.ajax({
            cache: false,
            url: '/MaterialEscolar/Pesquisar',
            type: 'POST',
            datatype: 'html',
            data: {
                codigoDiretoria: $('#CodigoDiretoria').val(),
                codigoEscola: $("#CodigoEscola").val(),
                codigoSemestre: $("#CodigoSemestre").val(),
                anoLetivo: $('#AnoLetivo').val()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                recebido.CarregarGridPesquisar(data);
                recebido.Editar();
                recebido.Excluir();
                recebido.Editar();
            }
        });
    });
}

recebido.CarregarGridPesquisar = function (data) {
    $("#divResultado").empty().html(data);

    $('#tblResultado').sedDataTable({ });
};

recebido.Editar = function () {
    $(".detalhar").click(function () {
        var value = $(this).attr('codigo');
        window.location.href = "/MaterialEscolar/Editar/" + value;
    })
}

recebido.Excluir = function () {
    $(".excluir").click(function () {
        var value = $(this).attr('codigo');

        Mensagem.Alert({
            titulo: "Atenção!",
            mensagem: "Deseja realmente excluir este registro?",
            tipo: "aviso",
            botoes: [
                {
                    botao: "Sim",
                    callback: function () {
                        $.post("/MaterialEscolar/Excluir", { id: value })
                            .done(function () {

                                Mensagem.Alert({
                                    titulo: "Sucesso",
                                    mensagem: "Exlcuído com sucesso.",
                                    tipo: "Sucesso",
                                    botoes: [{
                                        botao: "Fechar",
                                        callback: function () { $("#btnPesquisar").click(); }
                                    }]
                                });
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

recebido.LoadGridRecebimento = function () {

    var CodigoEscola = $("#CodigoEscola").val();

    if (CodigoEscola > 0) {
        $.get("/Materialescolar/GridAcompanhamentoEnvio", {
            codigoDiretoria: $("#CodigoDiretoria").val(),
            codigoEscola: $("#CodigoEscola").val(),
            anoLetivo: $("#AnoLetivo").val(),
            codigoSemestre: $("#CodigoSemestre").val()
        }).done(function (data) {
            recebido.CarregarGrid(data);
        });
    }
}

recebido.CarregarGrid = function (data) {
    var grid = $("#divGrid");
    grid.empty().html(data);
}
