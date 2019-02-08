


function gerarPDFMotivoGlosaFdeApm(data) {
    var config = {
        pageSize: "A4",
        title: "Motivo de Glosa",
    };

    try {
       
        sedPdfExporter.normalizeConfig(config);

        config.data = data;

        config = montarCabecalho(config);
        config.notaFiscal = montarGridNotaFiscal(config);
        config.colunasNotaFiscal = formatarColunasGridNotaFiscal(config);

        config.devolucao = montarGridDevolucaoRecursos(config);
        config.colunasDevolucao = formatarColunasGridDevolucao(config);

        config.outrasEntradas = montarGridOutrasEntradas(config);
        config.colunasOutrasEntradas = formatarColunasGridOutrasEntradas(config);

        config.outrasSaidas = montarGridOutrasSaidas(config);
        config.colunasOutrasSaidas = formatarColunasGridOutrasSaidas(config);

        config.docs = montarGridDocs(config);
        config.colunasDocs = formatarColunasGridDocs(config);


        config.tableNF = {
            headerRows: 2,
            widths: config.colunasNotaFiscal,
            body: config.notaFiscal
        }

        config.tbDevolucaoRec = {
            headerRows: 2,
            widths: config.colunasDevolucao,
            body: config.devolucao

        }

        config.tbOutrasEntradas = {
            headerRows: 2,
            widths: config.colunasOutrasEntradas,
            body: config.outrasEntradas

        }

        config.tbOutrasSaidas = {
            headerRows: 2,
            widths: config.colunasOutrasSaidas,
            body: config.outrasSaidas

        }

        config.tbDocsExig = {
            headerRows: 2,
            widths: config.colunasDocs,
            body: config.docs

        }


        config.bodys = [[{ text: '', style: '', alignment: '' }], ];

     
        if (config.data.NotasFiscaisGlosadasFdeApm.length > 0)
            config.bodys.push([{ table: config.tableNF }]);

        if (config.data.DevolucaoGlosadasFdeApm.length > 0)
            config.bodys.push([{ table: config.tbDevolucaoRec }, ]);

        if (config.data.OutrasEntrandasGlosadasFdeApm.length > 0)
            config.bodys.push([{ table: config.tbOutrasEntradas }, ]);

        if (config.data.OutrasSaidasGlosadasFdeApm.length > 0)
            config.bodys.push([{ table: config.tbOutrasSaidas }, ]);

        if (config.data.DocumentosGlosados.length > 0)
            config.bodys.push([{ table: config.tbDocsExig }, ]);

  

    } catch (e) {
        console.log(e.message);
    }


    config.docGenerator = function (config) {
        config.pageMargins = [20, 100, 20, 110];

        var doc = {
            header: config.sedHeader,
            footer: config.sedFooter,
            content: [
                {
                    text: "Motivos de Glosa",
                    style: 'header'
                },
                { text: "\n" },
                { text: [{ text: "Exercício: ", style: "lbl" }, config.exercicio], style: 'content' },
                { text: [{ text: "Grupo de Repasse: ", style: "lbl" }, 'FDE/APM'], style: 'content' },
                { text: [{ text: "Objeto de Repasse: ", style: "lbl" }, config.objetoRepasse], style: 'content' },
                { text: [{ text: "Diretoria: ", style: "lbl" }, config.diretoria], style: 'content' },
                { text: [{ text: "Escola: ", style: "lbl" }, config.escola], style: 'content' },
                { text: [{ text: "CIE: ", style: "lbl" }, config.CIE], style: 'content' },
                  { text: "\n" },

                      {
                          style: 'tabela',
                          table: {
                              headerRows: 1,
                              widths: ['*'],
                              body: config.bodys

                          },
                          layout: {
                              defaultBorder: false,
                          }
                      },

            ],
            styles: {
                header: {
                    fontSize: 14,
                    bold: true,
                    fillColor: '#459ad6',
                    color: '#fff'
                },
                headerColuns: {
                    fontSize: 12,
                    bold: true,
                    fillColor: '#459ad6',
                    color: '#fff'
                },
                lbl: {
                    fontSize: 10,
                    bold: true
                },
                content: {
                    fontSize: 10,
                    bold: false
                },
   
            }
        };
        return doc;
    };

    // Passo 4: gerar e exportar o PDF
    sedPdfExporter.exportPdf(config);
}

function montarCabecalho(config) {
   
    debugger;
    config.diretoria = config.data.CabecalhoRelatorio.Diretoria;
    config.escola = config.data.CabecalhoRelatorio.Escola;
    config.objetoRepasse = config.data.CabecalhoRelatorio.Programa;
    config.exercicio = config.data.CabecalhoRelatorio.Exercicio;
    config.CIE = config.data.CabecalhoRelatorio.CIE;
    return config;
}


function montarGridNotaFiscal(config) {
    var tbNotaFiscal = [];

    var tbFinal = [];
    var tbFde = [{ text: 'Nota Fiscal', style: 'header', colSpan: 7, alignment: 'center' }, {}, {}, {}, {}, {}, {}];
    var tbEscola = [{ text: 'Nota Fiscal', style: 'header', colSpan: 6, alignment: 'center' }, {}, {}, {}, {}, {}];
    tbNotaFiscal.push(
     [

         { text: "Número NF", alignment: 'center', style: 'headerColuns' },
         { text: "Data Emissão", alignment: 'center', style: 'headerColuns' },
         { text: "Nr. Cheque", alignment: 'center', style: 'headerColuns' },
         { text: "Valor", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.NotasFiscaisGlosadasFdeApm.length; i++) {
        var notaFiscal = config.data.NotasFiscaisGlosadasFdeApm[i];
        tbNotaFiscal.push(
            [
                { text: notaFiscal.NotaFiscalFDEAPM.NrNotaFiscal, alignment: 'left', style: 'content' },
                { text: notaFiscal.NotaFiscalFDEAPM.DataEmissao, alignment: 'left', style: 'content' },
                { text: notaFiscal.NotaFiscalFDEAPM.NrCheque, alignment: 'left', style: 'content' },
                { text: notaFiscal.NotaFiscalFDEAPM.StrVlTotalNf, alignment: 'left', style: 'content' },
                { text: notaFiscal.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: notaFiscal.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: notaFiscal.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.NotasFiscaisGlosadasFdeApm.length; i++) {
            tbNotaFiscal[i].pop();

        }
        tbFinal.push(tbEscola);
    }
    else {
        tbFinal.push(tbFde);
    }

    for (var i = 0; i <= tbNotaFiscal.length; i++) {
        tbFinal.push(tbNotaFiscal[i]);;
    }

    if (tbFinal.length > 0) {
        tbFinal.pop();
    }

    return tbFinal;
}

function formatarColunasGridNotaFiscal(config) {
    var _tamanhoColunaMotivoGlosa;
    if (config.data.PerfilEscola)
        _tamanhoColunaMotivoGlosa = 400;
    else _tamanhoColunaMotivoGlosa = 300;
    var tamanhoColunas = [60, 60, 60, 60, _tamanhoColunaMotivoGlosa, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

function montarGridDevolucaoRecursos(config) {
    var tbDevolucao = [];

    var tbFinal = [];
    var tbFde = [{ text: 'DEVOLUÇÃO DE RECURSOS', style: 'header', colSpan: 5, alignment: 'center' }, {}, {}, {}, {}];
    var tbEscola = [{ text: 'DEVOLUÇÃO DE RECURSOS', style: 'header', colSpan: 4, alignment: 'center' }, {}, {}, {}];

    tbDevolucao.push(
     [
         { text: "Data", alignment: 'center', style: 'headerColuns' },
         { text: "Valor", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.DevolucaoGlosadasFdeApm.length; i++) {
        var item = config.data.DevolucaoGlosadasFdeApm[i];
        tbDevolucao.push(
            [
                { text: item.DevolucaoRecursosFDEAPM.StrDtDevolucao, alignment: 'left', style: 'content' },
                { text: item.DevolucaoRecursosFDEAPM.StrValorDevolucao, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },
            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.DevolucaoGlosadasFdeApm.length; i++) {
            tbDevolucao[i].pop();
        }
        tbFinal.push(tbEscola);
    } else {
        tbFinal.push(tbFde);
    }
    for (var i = 0; i <= tbDevolucao.length; i++) {
        tbFinal.push(tbDevolucao[i]);;
    }

    if (tbDevolucao.length > 0) {
        tbFinal.pop();
    }
    return tbFinal;
}

function formatarColunasGridDevolucao(config) {
    var _tamanhoColunaMotivoGlosa;
    var tamanhoColunas = [60, 60, 400, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

function montarGridOutrasEntradas(config) {
    var tbOutrasEntradas = [];
    var tbFinal = [];
    var tbFde = [{ text: 'OUTRAS ENTRADAS', style: 'header', colSpan: 5, alignment: 'center' }, {}, {}, {}, {}];
    var tbEscola = [{ text: 'OUTRAS ENTRADAS', style: 'header', colSpan: 4, alignment: 'center' }, {}, {}, {}];

    tbOutrasEntradas.push(
     [
         { text: "Tipo", alignment: 'center', style: 'headerColuns' },
         { text: "Valor", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.OutrasEntrandasGlosadasFdeApm.length; i++) {
        var item = config.data.OutrasEntrandasGlosadasFdeApm[i];
        tbOutrasEntradas.push(
            [
                { text: item.OutrasEntradasFDEAPM.DsTipo, alignment: 'left', style: 'content' },
                { text: item.OutrasEntradasFDEAPM.StrVlOutrasEntradas, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.OutrasEntrandasGlosadasFdeApm.length; i++) {
            tbOutrasEntradas[i].pop();
        }
        tbFinal.push(tbEscola);
    }
    else { tbFinal.push(tbFde);}

    for (var i = 0; i <= tbOutrasEntradas.length; i++) {
        tbFinal.push(tbOutrasEntradas[i]);;
    }

    if (tbOutrasEntradas.length > 0) {
        tbFinal.pop();
    }
    return tbFinal;
}

function formatarColunasGridOutrasEntradas(config) {
    var _tamanhoColunaMotivoGlosa;
    var tamanhoColunas = [150, 60, 400, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

function montarGridOutrasSaidas(config) {
    var tbOutrasSaidas = [];
    var tbFinal = [];
    var tbFde = [{ text: 'OUTRAS SAÍDAS', style: 'header', colSpan: 7, alignment: 'center' }, {}, {}, {}, {}, {}, {}];
    var tbEscola = [{ text: 'OUTRAS SAÍDAS', style: 'header', colSpan: 6, alignment: 'center' }, {}, {}, {}, {}, {}];

    tbOutrasSaidas.push(
     [
         { text: "Tipo", alignment: 'center', style: 'headerColuns' },
         { text: "Nr. Cheque", alignment: 'center', style: 'headerColuns' },
         { text: "Data do Cheque", alignment: 'center', style: 'headerColuns' },
         { text: "Valor", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.OutrasSaidasGlosadasFdeApm.length; i++) {
        var item = config.data.OutrasSaidasGlosadasFdeApm[i];
        tbOutrasSaidas.push(
            [
                { text: item.OutrasSaidasFDEAPM.DsTipo, alignment: 'left', style: 'content' },
                { text: item.OutrasSaidasFDEAPM.NrCheque, alignment: 'left', style: 'content' },
                { text: item.OutrasSaidasFDEAPM.DataCheque, alignment: 'left', style: 'content' },
                { text: item.OutrasSaidasFDEAPM.StrVlOutrasSaidas, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.OutrasSaidasGlosadasFdeApm.length; i++) {
            tbOutrasSaidas[i].pop();
        }
        tbFinal.push(tbEscola);
    }
    else {
        tbFinal.push(tbFde);
    }
    for (var i = 0; i <= tbOutrasSaidas.length; i++) {
        tbFinal.push(tbOutrasSaidas[i]);;
    }

    if (tbOutrasSaidas.length > 0) {
        tbFinal.pop();
    }
    return tbFinal;
}

function formatarColunasGridOutrasSaidas(config) {
    var _tamanhoColunaMotivoGlosa;
    var tamanhoColunas = [60, 60, 60,  60, 300, '*', '*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}

function montarGridDocs(config) {
    var tbDocs = [];
    var tbFinal = [];
    var tbFde = [{ text: 'DOCUMENTOS EXIGIDOS', style: 'header', colSpan: 4, alignment: 'center' }, {}, {}, {}];
    var tbEscola = [{ text: 'DOCUMENTOS EXIGIDOS', style: 'header', colSpan: 3, alignment: 'center' }, {}, {}];

    tbDocs.push(
     [
         { text: "Documento", alignment: 'center', style: 'headerColuns' },
         { text: "Motivo de Glosa", alignment: 'center', style: 'headerColuns' },
         { text: "Data da Análise", alignment: 'center', style: 'headerColuns' },
         { text: "Analista", alignment: 'center', style: 'headerColuns' }
     ]

 );

    for (var i = 0; i < config.data.DocumentosGlosados.length; i++) {
        var item = config.data.DocumentosGlosados[i];
        tbDocs.push(
            [
                { text: item.DocumentosExigidos.DocumentosExigidos.Documento.NmDocumento, alignment: 'left', style: 'content' },
                { text: item.TipoGlosa.NmTipoGlosa, alignment: 'left', style: 'content' },
                { text: item.StrDtReprovacao, alignment: 'left', style: 'content' },
                { text: item.NmUsuario, alignment: 'left', style: 'content' },

            ]
        );
    }
    if (config.data.PerfilEscola) {
        for (var i = 0; i <= config.data.DocumentosGlosados.length; i++) {
            tbDocs[i].pop();
        }
        tbFinal.push(tbEscola);
    }
    else {
        tbFinal.push(tbFde);

    }
    for (var i = 0; i <= tbDocs.length; i++) {
        tbFinal.push(tbDocs[i]);;
    }

    if (tbDocs.length > 0) {
        tbFinal.pop();
    }
    return tbFinal;
    
}

function formatarColunasGridDocs(config) {
    var _tamanhoColunaMotivoGlosa;
    var tamanhoColunas = [200, 350, '*','*'];
    if (config.data.PerfilEscola) {
        tamanhoColunas.pop();
    }
    return tamanhoColunas;
}