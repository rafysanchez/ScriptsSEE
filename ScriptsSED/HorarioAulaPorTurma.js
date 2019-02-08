$(document).ready(function () {
    PreenchimentoAutomatico();
    ValidarFiltro();
    Pesquisar();
    $("#AnoLetivo").change();
    AplicarMascaras();
});

var PreenchimentoAutomatico = function () {
    $('#AnoLetivo').autoPreencher($('#CodigoDiretoria'), 'Diretoria', 'CarregarListaDiretorias');
    $('#CodigoDiretoria').autoPreencher($('#CodigoEscola'), 'Escola', 'CarregarListaEscolas');
    $('#CodigoTurma').change(function () { $('#TextoTurma').val($(this).find('option:selected').text()); });
    $('#CodigoEscola').autoPreencher($('#CodigoTurno'), 'Turno', 'CarregarTurnoPorEscola', [{ CodigoEscola: "'CodigoEscola'" }]);
}

var ValidarFiltro = function () {
    $('#frmFiltro').validate({
        rules: {
            AnoLetivo: {
                required: true
            },
            CodigoDiretoria: {
                required: true
            },
            CodigoEscola: {
                required: true
            },
            CodigoTurno: {
                required: true
            }
        }
    });
}

var Pesquisar = function () {
    $('#btnPesquisar').click(function () {
        if ($('#frmFiltro').valid() == false) {
            return;
        }

        $.ajax({
            cache: false,
            url: '/HorarioAulaPorTurma/Pesquisar',
            type: 'POST',
            datatype: 'HTML',
            data: {
                codigoDiretoria: $('#CodigoDiretoria').val(),
                codigoEscola: $('#CodigoEscola').val(),
                anoLetivo: $('#AnoLetivo').val(),
                codigoTurno: $('#CodigoTurno').val()
            },
            success: function (data) {
                $('#resultado').empty().html(data);
            }
        });
    });
}

function AbirPdf() {
    if ($('#frmFiltro').valid() == false) {
        return;
    }

    AbrirMensagemCarregandoPagina();
    $('#frmFiltro').submit();
    FecharMensagemCarregandoPagina();
}

//function AbirXls() {
//    if ($('#frmFiltro').valid() == false) {
//        return;
//    }
//    window.open('../../HorarioAulaPorTurma/GerarExcel?codigoDiretoria=' + $('#CodigoDiretoria').val() + '&codigoEscola=' + $('#CodigoEscola').val() + '&codigoTipoEnsino=' + $('#CodigoTipoEnsino').val() + '&codigoTurma=' + $('#CodigoTurma').val() + '&anoLetivo=' + $('#AnoLetivo').val(), '_blanck');
//}




function gerarHorarioAula() {

    $.ajax({
        cache: false,
        url: '/HorarioAulaPorTurma/GerarGradePDF',
        type: 'POST',
        datatype: 'json',
        data: {
            codigoDiretoria: $('#CodigoDiretoria').val(),
            codigoEscola: $('#CodigoEscola').val(),
            anoLetivo: $('#AnoLetivo').val(),
            codigoTurno: $('#CodigoTurno').val()
        },
        traditional: true,
        success: function (data, textStatus, jqXHR) {

            $('#GerarPDF').html(data);
            if (data != "")
            {
                //Filtros a ser inserido no PDF
                filtros = [
                            { nome: "Ano Letivo", valor: $("#AnoLetivo").val() },
                            { nome: "Diretoria", valor: $("#CodigoDiretoria option:selected").text() },
                            { nome: "Escola:", valor: $("#CodigoEscola option:selected").text() },
                            { nome: "Turno", valor: $("#CodigoTurno option:selected").text() },
                ];

                EscrevePDF(filtros, tabela);
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $(document).ajaxStop();
        }
    });
};
function EscrevePDF(filtros, tabelaOrigem) {

    //Configurações
    var config = {
        pageOrientation: "landscape",
        pageSize: "A3",
        pageMargins: [30, 5, 30, 0],
        title: "Horário de Aula",
        filename: "Horario_aula.pdf",
        filters: filtros,
        tabela: tabelaOrigem
    };

    config.footerWidth = ((config.pageOrientation === "portrait") ? 555 : 805);
    config.tabela = tabelaOrigem;

    sedPdfExporter.normalizeConfig(config);
    //config.debug = true;
    config.docGenerator = function (config) {

        //Filtros
        var filters;
        if (!config.filters || !config.filters.length) {
            filters = [{ text: "Nenhum filtro informado\n", bold: true }];
        } else {
            filters = [];
            for (i = 0; i < config.filters.length; i++) {
                filters.push({ text: config.filters[i].nome.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + ": ", bold: true });
                filters.push({ text: config.filters[i].valor.replace(config.regex1, "").replace(config.regex2, " ").replace(config.regex3, "") + "\n" });
            }
        }
        filters.push({ text: " \n" });

        //Cabeçalho
        //Titulo
        //Filtros
        var content = [

            {
                table: {
                    widths: ["*", (config.pageOrientation == "portrait") ? 175 : 200],
                    body: [[{
                        image: "cabecalho",
                        width: (config.pageOrientation == "portrait") ? 350 : 450
                    }]]
                },
                layout: "noBorders",
                margin: [15, 5, 20, 20]
            },

            {
                text: config.title,
                style: "title",
                margin: [0, 5]
            },
			{
			    text: filters,
			    margin: [0, 0, 0, 0]
			}
        ];
        
        content.push({
            margin: [0, 20, 0, 0],
            table: {
                body: config.tabela,
            }
        });
        
        //Rodape
        content.push({
            image: "rodape",
            width: config.footerWidth - 2,
            style: "centro",
            margin: [0, 10, 0, 30]
        });

        var doc = {
            content: content,
            styles: {
                assinatura: {
                    bold: true,
                    color: "#000",
                    alignment: "right",
                    fontSize: 14,
                    margin: [0, -50, 0, 0]
                },
                assinaturatexto: {
                    bold: true,
                    color: "#000",
                    alignment: "right",
                    fontSize: 14,
                    margin: [0, 0, 0, 0]
                },
                tableHeader: {
                    bold: true,
                    color: "#fff",
                    fontSize: 8,
                    fillColor: "#459ad6",
                    alignment: "center"
                },
                tableHeaderSeparador: {
                    color: "#fff",
                    fontSize: 5,
                    fillColor: "#fff",
                    alignment: "center"
                },
                tableBodyEven: {},
                tableBodyOdd: {
                    fillColor: "#e2efff"
                },
                title: {
                    bold: true,
                    color: "#459ad6",
                    alignment: "center",
                    fontSize: 20
                },
                centro: {
                    alignment: "center"
                },
                cabecalho: {
                    alignment: "right",
                    fontSize: 12,
                    bold: true
                },
                filtroTitle: {
                    fontSize: 10,
                    bold: true,
                    color: "#459ad6",
                }
            },
            defaultStyle: {
                fontSize: 7
            },
            images: {
                cabecalho: config.sedHeaderImage,
                rodape: config.sedFooterImage
            }
        }

        return doc;
    };

    sedPdfExporter.exportPdf(config);
}