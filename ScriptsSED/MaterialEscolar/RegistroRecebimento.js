var recebido = recebido || {};

$(function () {
    recebido.Instance();
    AplicarMascaras();
});

recebido.Instance = function () {

    var self = recebido;

    $("#CodigoDiretoria").autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $("#CodigoEscola").autoPreencher($('#CodigoTipoEnsino'), 'Caderno', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'AnoLetivo' }]);
    $("#CodigoTipoEnsino").autoPreencher($('#CodigoDisciplina'), "Disciplina", 'CarregarListaDisciplinasPorTipoEnsino', [{ ddlEscola: 'CodigoEscola', ddlTipoEnsino: 'CodigoTipoEnsino' }], undefined, undefined, undefined);
    //$("#CodigoDisciplina").change(function () {
    //    recebido.LoadGridRecebimento();
    //});

    $("#btnPesquisarRegistro").click(function () {
        if (!$('#form').valid()) return;

        recebido.LoadGridRecebimento();
    });

    $("#CodigoTipoEnsino").change(function () {
        var grid = $("#divGrid");
        grid.empty();
    })
    //$('#CodigoTipoEnsino').autoPreencher($('#CodigoTurma'), 'MaterialEscolar', 'CarregarListaTurmaPorTipoEnsino', ['CodigoEscola', 'CodigoTipoEnsino', 'AnoLetivo'], undefined, undefined, undefined);

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
            txtQuantidade: { required: true, maxlength: 5 },
            CodigoSemestre: { required: true }
        },
        messages:
        {
            AnoLetivo: { required: 'Obrigatório', minlength: 'Ano inválido' },
            CodigoDiretoria: { required: 'Obrigatório' },
            CodigoEscola: { required: 'Obrigatório' },
            CodigoTipoEnsino: { required: 'Obrigatório' },
            CodigoDisciplina: { required: 'Obrigatório' },
            txtQuantidade: { required: 'Obrigatório' },
            CodigoSemestre: { required: 'Obrigatório' }
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
            }
        });
    });
}

recebido.CarregarGridPesquisar = function (data) {
    $("#divResultado").empty().html(data);
    $('#tblResultado').sedDataTable({
        columnDefs: [
			{ targets: [5], orderable: false },
        ],
        nomeExportacao: "Histórico de Materiais Recebidos"
    });
};

recebido.Editar = function () {

    $(".detalhar").click(function () {
        var value = $(this).attr('codigo');
        window.location.href = "/MaterialEscolar/Editar/" + value;
    })
}

recebido.Excluir = function () {
    $(".excluir").on('click', function () {
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
                                $("#btnPesquisar").click();
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

function Excluir(obj) {
    var value = $(obj).attr('codigo');

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
                            $("#btnPesquisar").click();
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

recebido.LoadGridRecebimento = function () {

    if ($("#CodigoDisciplina").val() === "") return;

    $.get("/MaterialEscolar/GridMateriais", {
        codigoDisciplina: $("#CodigoDisciplina").val(),
        codigoEscola: $("#CodigoEscola").val(),
        codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
        anoLetivo: $("#AnoLetivo").val(),
        codigoSemestre: $("#CodigoSemestre").val()
    }).done(function (data) {
        recebido.CarregarGrid(data);
    });
}

recebido.CarregarGrid = function (data) {
    var grid = $("#divGrid");
    grid.empty().html(data);
}
