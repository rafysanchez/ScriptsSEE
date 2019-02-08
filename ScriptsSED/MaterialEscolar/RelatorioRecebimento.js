var relatorio = relatorio || {};

$(function () {
    relatorio.Instance();
});


relatorio.Instance = function () {
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoEscola').autoPreencher($('#CodigoTipoEnsino'), 'Caderno', 'CarregarListaTiposEnsino', [{ id: 'CodigoEscola', AnoLetivo: 'AnoLetivo' }]);

    relatorio.Pesquisar();
    relatorio.Validacao();
    relatorio.GerarExcel();
    relatorio.GerarPDF();
}

relatorio.Pesquisar = function () {
    $("#btnPesquisar").click(function () {
        if (!$('#form').valid()) return;

        $.ajax({
            cache: false,
            url: '/MaterialEscolar/RelatorioResult',
            type: 'GET',
            datatype: 'html',
            data: {
                codigoDiretoria: $('#CodigoDiretoria').val(),
                codigoEscola: $("#CodigoEscola").val() === "" ? 0 : $("#CodigoEscola").val(),
                anoLetivo: $('#AnoLetivo').val(),
                codigoParametro: $("#CodigoSemestre").val() === "" ? 0 : $("#CodigoSemestre").val()
            },
            traditional: true,
            success: function (data, textStatus, jqXHR) {

                $("#divResultado").empty().html(data);
                $('#tblResultado').sedDataTable({ embutida: true });
                
            }
        });
    });

};

relatorio.CarregarGrid = function (data) {
    $("#divResultado").empty().html(data);

    $('#tblResultado').sedDataTable({
        'sScrollX': '100%'
    });
};

relatorio.GerarExcel = function () {
    $("#btnGerarExcel").click(function () {

        if (!$("#form").valid()) return;
        var escola = $("#CodigoEscola").val();

        if (escola === "" && $("#idPerfil >strong:contains('Escola')").length === 1) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Por favor, selecione sua escola.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        var url = '/MaterialEscolar/ExportarExcel?';
        var params = "codigoDiretoria=" + $("#CodigoDiretoria").val() + "&codigoEscola=" + ($("#CodigoEscola").val() === "" ? "0" : $("#CodigoEscola").val()) + "&codigoParametro=" + ($("#CodigoSemestre").val() === "" ? "0" : $("#CodigoSemestre").val());
        window.open(url + params);
    });
};

relatorio.GerarPDF = function () {
    $("#btnGerarPDF").click(function () {

        if (!$("#form").valid()) return;
        var escola = $("#CodigoEscola").val();

        if (escola === "" && $("#idPerfil >strong:contains('Escola')").length === 1) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Por favor, selecione sua escola.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        var url = '/MaterialEscolar/ExportarPDF?';
        var params = "codigoDiretoria=" + $("#CodigoDiretoria").val() + "&codigoEscola=" + ($("#CodigoEscola").val() === "" ? "0" : $("#CodigoEscola").val()) + "&codigoParametro=" + ($("#CodigoSemestre").val() === "" ? "0" : $("#CodigoSemestre").val());
        window.open(url + params);
    });
}

relatorio.Validacao = function () {
    $("#form").validate({
        rules: {
            AnoLetivo: { required: true, minlength: 4 },
            CodigoDiretoria: { required: true },
            CodigoSemestre: { required: true }
        },
        messages:
        {
            AnoLetivo: { required: 'Obrigatório', minlength: 'Ano inválido' },
            CodigoDiretoria: { required: 'Obrigatório' },
            CodigoSemestre: { required: 'Obrigatório' }
        }
    });
};