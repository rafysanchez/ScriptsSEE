
function obterPesquisaPrecoFdeApm(input, idLancamentoRepasseAssociado)
{
    $.ajax({
        cache: false,
        dataType: 'JSON',
        url: urlAbsoluta + 'NotaFiscalFDEAPM/ObterPesquisaPrecoFdeApm',
        type: 'POST',
        data: { idNotaFiscal: input, idLancamentoRepasseAssociado: idLancamentoRepasseAssociado },
        success: function (data)
        {
            gerarPdfPesquisaPreco(data);
        },
        error: function (jqXHR, txtStatus, errorThrown)
        {
            mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + errorThrown);
        }
    });
}

function gerarPdfPesquisaPreco(dados) {

    var config = {
        pageSize: "A4",
        title: "Pesquisa de Preço",
    };

    sedPdfExporter.normalizeConfig(config);

    try {
        config.RazaoSocialAPM = dados.APM.Nome;
        config.Diretoria = dados.Diretoria.NmDiretoria; 
        config.ObjRepasse = dados.Programa.Nome;
        config.RazaoSocialProponenteA = dados.RazaoSocialProponenteA;
        config.RazaoSocialProponenteB = dados.RazaoSocialProponenteB;
        config.RazaoSocialProponenteC = dados.RazaoSocialProponenteC;

        config.CNPJProponenteA = dados.CnpjProponenteA;

        config.CNPJProponenteB = dados.CnpjProponenteB;

        config.CNPJProponenteC = dados.CnpjProponenteC;

        config.NmContatoProponenteA = dados.ContatoVencedor;

        config.NmContatoProponenteB = dados.ContatoProponenteB;

        config.NmContatoProponenteC = dados.ContatoProponenteC;

        config.PrazoEntregaProponenteA = dados.PrazoEntregaVencedor;

        config.PrazoEntregaProponenteB = dados.PrazoEntregaProponenteB;

        config.PrazoEntregaProponenteC = dados.PrazoEntregaProponenteC;

        config.PrazoPagamentoProponenteA = dados.PrazaPagamentoVencedor;
        config.PrazoPagamentoProponenteB = dados.PrazaPagamentoProponenteB;
        config.PrazoPagamentoProponenteC = dados.PrazaPagamentoProponenteC;


        config.DtPesquisaProponenteA = dados.DtPesquisaVencedor;
        config.DtPesquisaProponenteB = dados.DtPesquisaProponenteB;
        config.DtPesquisaProponenteC = dados.DtPesquisaProponenteC;
        
        config.TotalNotaProponenteA = dados.TotalProponenteA;

        config.TotalNotaProponenteB = dados.TotalProponenteB;
        config.TotalNotaProponenteC = dados.TotalProponenteC;
        config.NrNotaFiscal = dados.NrNotaFiscal;


    } catch (e) {
        mensagemAlerta.ErroAjax('Ocorreu um erro durante o processo' + e.message);
        return false;
    }


    var tabItens = [
        [
            { text: 'ITEM', alignment: 'center' },
            { text: 'DISCRIMINAÇÃO', alignment: 'center' },
            { text: 'QUANT.', alignment: 'center' },
            { text: 'UNID.', alignment: 'center' },
            { text: 'PREÇO UNITARIO', alignment: 'center', noWrap: true },
            { text: 'TOTAL', alignment: 'center' },
            { text: 'PREÇO UNITARIO', alignment: 'center', noWrap: true },
            { text: 'TOTAL', alignment: 'center' },
            { text: 'PREÇO UNITARIO', alignment: 'center', noWrap: true },
            { text: 'TOTAL', alignment: 'center' },
        ]
    ];

    var aux = 1;
        for (var i = 0; i < dados.NotaFiscal.Itens.length; i++) {
            tabItens.push(
                    [
                       
                        { text: "" + aux + "", alignment: 'center' },
                        { text: dados.NotaFiscal.Itens[i].DsItem },

                        { text: "" + dados.NotaFiscal.Itens[i].Quantidade, alignment: 'center' },
                        { text: dados.NotaFiscal.Itens[i].DsUnidadeAbrev },

                           { text: "" + dados.NotaFiscal.Itens[i].PrecoUnitarioVencedor + "", alignment: 'center' },
                        { text: "" + dados.NotaFiscal.Itens[i].TotalFornecedorA + "", alignment: 'center' },
                       
                        { text: "" + dados.NotaFiscal.Itens[i].PrecoUnitarioFornecedorB + "", alignment: 'center' },
                        { text: "" + dados.NotaFiscal.Itens[i].TotalItensFornecedorB + "", alignment: 'center' },

                       
                        { text: "" + dados.NotaFiscal.Itens[i].PrecoUnitarioFornecedorC + "", alignment: 'center' },
                        { text: "" + dados.NotaFiscal.Itens[i].TotalItensFornecedorC + "", alignment: 'center' },


                    ]); aux++;
        }
 

    tabItens.push([
                    { text: "", colSpan: 4 }, {}, {}, {},
                    { text: "Total" },
                    { text: "" + dados.TotalProponenteA + "", alignment: 'center' },
                    { text: "Total" },
                    { text: "" + dados.TotalProponenteB + "", alignment: 'center' },
                    { text: "Total" },
                    { text: "" + dados.TotalProponenteC + "", alignment: 'center' },
    ]);

    config.Itens = tabItens;

    config.docGenerator = function (config) {
        var doc = {
            pageOrientation: 'landscape',
            content: [
                {
                    table: {
                        widths: ["10%", "24%", "22%", "22%", "22%"],
                        body: [
                            [
                                {
                                    image: 'data:image/jpeg;base64,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',
                                    width: 40,
                                    margin: [10, 0, 0, 5],
                                    border: [false]
                                },
                                {
                                   
                                    colSpan: 4,
                                    alignment: 'center',
                                    margin: [-50, -5, 0, 0],
                                    border: [false, false],
                                    text: [
                                        { text: 'SECRETARIA DE ESTADO DA EDUCAÇÃO\n', bold: true, fontSize: 11 },
                                        { text: config.RazaoSocialAPM + '\n', fontSize: 9 },
                                        { text: 'DIRETORIA DE ENSINO DE ' + config.Diretoria + '\n', fontSize: 9 },
                                        { text: 'PESQUISA DE PREÇOS POR ITEM - DECRETO 34.350/91\n', fontSize: 9 }
                                    ]
                                }, {}, {}, {}
                            ],
                            [{ text: 'Objeto de repasse:', noWrap: true, alignment: 'right' }, config.ObjRepasse, 'EMPRESA: ' + config.RazaoSocialProponenteA, 'EMPRESA: ' + config.RazaoSocialProponenteB, 'EMPRESA: ' + config.RazaoSocialProponenteC],
                            [{ text: 'Valor da Nota:', alignment: 'right' }, config.TotalNotaProponenteA, 'CNPJ: ' + config.CNPJProponenteA, 'CNPJ: ' + config.CNPJProponenteB, 'CNPJ: ' + config.CNPJProponenteC],
                            [{ text: 'Nº da Nota Fiscal:', alignment: 'right' }, config.NrNotaFiscal, 'CONTATO: ' + config.NmContatoProponenteA, 'CONTATO: ' + config.NmContatoProponenteB, 'CONTATO: ' + config.NmContatoProponenteC],
                            [
                                { text: 'Observação:', rowSpan: 3, alignment: 'right' },
                                { text: '', rowSpan: 3, margin: [150, 10, 20, 0], },
                                { text: 'PRAZO DE ENTREGA: ' + config.PrazoEntregaProponenteA },
                                { text: 'PRAZO DE ENTREGA: ' + config.PrazoEntregaProponenteB },
                                { text: 'PRAZO DE ENTREGA: ' + config.PrazoEntregaProponenteC },
                            ],
                            [
                                {}, {},
                                { text: 'PRAZO DE PAGAMENTO: ' + config.PrazoPagamentoProponenteA },
                                { text: 'PRAZO DE PAGAMENTO: ' + config.PrazoPagamentoProponenteB },
                                { text: 'PRAZO DE PAGAMENTO: ' + config.PrazoPagamentoProponenteC },

                            ],
                            [
                                {}, {},
                                { text: 'DATA DA PESQUISA: ' + config.DtPesquisaProponenteA },
                                { text: 'DATA DA PESQUISA: ' + config.DtPesquisaProponenteB },
                                { text: 'DATA DA PESQUISA: ' + config.DtPesquisaProponenteC }
                            ],
                            [
                                {
                                    table: {
                                        widths: ["5%", "18.8%", "5%", "5%", "11%", "11.3%", "11%", "11.3%", "11%", "11%"],
                                        body: config.Itens
                                    },
                                    colSpan: 5,
                                    widths: ["*","*","*","*","*"],
                                    margin: [-5, -3, 0, 0],
                                },
                                {},
                                {},
                                {},
                                {},
                            ],
                            [{
                                table: {
                                    widths: ["5%", "10%", "10%", "35%", "15%", "25%"],
                                    body: [
                                            [
                                                { "text": "Data:" },
                                                { "text": "" },
                                                { "text": "Responsável\n pela Pesquisa:" },
                                                { "text": "" },
                                                { "text": "Assinatura Diretor\n Executivo/Financeiro" },
                                                { "text": "" },
                                            ],
                                    ]
                                },
                                colSpan: 5,
                                margin: [-5, -3, 0, 0]
                            }]
                        ]

                    }, fontSize: 8
                },
            ],
        }
        return doc;
    };
    sedPdfExporter.exportPdf(config);
}
