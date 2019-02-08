var saldo = saldo || {};

$(function () {
    saldo.Instance();
    saldo.Pesquisar();
});

saldo.Instance = function () {

    var self = saldo;

    $("#CodigoDiretoria").autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $("#CodigoEscola").autoPreencher($('#CodigoTipoEnsino'), 'Caderno', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'AnoLetivo' }]);
    $("#CodigoEscola").change(function () {
        $("#divGrid").empty();
    });
}

saldo.Pesquisar = function () {
    $('#btnPesquisar').click(function () {
        if (!$("#form").valid()) {
            return;
        }

        if ($("#CodigoTipoEnsino").val() === "" || $("#CodigoTipoEnsino").val() === "0") {
            return;
        };

        $.ajax({
            cache: false,
            url: '/MaterialEscolar/PesquisarSaldoMaterial',
            type: 'POST',
            datatype: 'html',
            data: {
                codigoEscola: $('#CodigoEscola').val(),
                codigoTipoEnsino: $("#CodigoTipoEnsino").val(),
                anoLetivo: $("#AnoLetivo").val(),
                codigoSemestre: $("#CodigoSemestre").val()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {
                saldo.CarregarGridPesquisar(data);
            }
        });
    });
};

saldo.CarregarGridPesquisar = function (data) {
    var grid = $("#divGrid");

    grid.empty().html(data);

    $('#tblResultado').sedDataTable({ nomeExportacao: "Saldo Material Escolar" });
}