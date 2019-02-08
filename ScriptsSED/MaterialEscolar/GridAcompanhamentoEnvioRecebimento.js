grid.Instance = function () {

    recebido.GerarPDF();
}

recebido.GerarPDF = function () {
    $("#btnGerarPDF").click(function () {
        alert('pau');
        if (!$("#form").valid()) return;
        var diretoria = $("#CodigoDiretoria").val();

        if (diretoria === "" && $("#idPerfil >strong:contains('Diretoria')").length === 1) {
            Mensagem.Alert({
                titulo: "Aviso",
                mensagem: "Por favor, selecione sua diretoria.",
                tipo: "Aviso",
                botao: "Fechar"
            });
            return;
        }

        var url = '/MaterialEscolar/ExportarRelatorio_AcompanhamentoEnvioRecebimento_PDF?';
        var params = "codigoDiretoria=" + $("#CodigoDiretoria").val();
        window.open(url + params);
    });
}