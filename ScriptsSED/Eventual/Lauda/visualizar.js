$(document).ready(function () {
    $("#controleDeAbas").sedTabControl({ 
        embutida: true
    });
    $("#tabelaInclusao").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });
    $("#tabelaRetificacaoUA").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });
    $("#tabelaExtincao").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });
    $("#tabelaSemEfeitoInclusao").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });
    $("#tabelaSemEfeitoExtincao").sedDataTable({
        embutida: true,
        botaoSelecionarColunas: false,
        botaoImprimir: false,
        botaoGerarCSV: false,
        botaoGerarPDF: false
    });
    AplicarMascaras();
});